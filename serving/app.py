# app.py
import os
import traceback
from typing import List, Optional, Dict, Any
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import joblib
import numpy as np
import pandas as pd

# models
import torch
from pytorch_tabnet.tab_model import TabNetClassifier
import xgboost as xgb

# --- Config: paths (sesuaikan jika perlu) ---
MODELS_DIR = os.getenv("MODELS_DIR", "models")
TABNET_MODEL_FILE = os.path.join(MODELS_DIR, "tabnet_anomaly_model.zip")
TABNET_PREPROC_FILE = os.path.join(MODELS_DIR, "tabnet_anomaly_preproc.joblib")
TABNET_META_FILE = os.path.join(MODELS_DIR, "tabnet_anomaly_meta.joblib")

SCALER_FE_FILE = os.path.join(MODELS_DIR, "scaler_fe.joblib")
LE_TYPE_FILE = os.path.join(MODELS_DIR, "le_type.joblib")
LE_PRODUCT_FILE = os.path.join(MODELS_DIR, "le_product.joblib")
LE_FAILTYPE_FILE = os.path.join(MODELS_DIR, "le_failtype.joblib")

# OVR models naming: ovr_model_{class_idx}.joblib
OVR_MODEL_PATTERN = os.path.join(MODELS_DIR, "ovr_model_{}.joblib")

# Which features are expected for each service
FEATURE_COLS_TABNET = [
    'Product_ID_enc', 'Type_enc', 'Air temperature [K]', 'Process temperature [K]',
    'Rotational speed [rpm]', 'Torque [Nm]', 'Tool wear [min]'
]

# For failure-type (feature-engineered) service use same list used at training
FEATURE_COLS_FE = [
    "Air temperature [K]",
    "Process temperature [K]",
    "Rotational speed [rpm]",
    "Torque [Nm]",
    "Tool wear [min]",
    "Type_Encoded",
    "Temp_Diff",
    "Torque_Speed_Product",
    "Energy",
    "Load_Factor",
    "Temp_Ratio",
    "Air temperature [K]_Outlier",
    "Process temperature [K]_Outlier",
    "Rotational speed [rpm]_Outlier",
    "Torque [Nm]_Outlier",
    "Tool wear [min]_Outlier"
]

# thresholds / boost used same as training
FAILURE_BOOST_MAP = {
    "Random Failures": 50,
    "Tool Wear Failure": 40
}
FAILURE_THRESHOLDS = {
    "Random Failures": 0.003,
    "Tool Wear Failure": 0.0045
}

# --- FastAPI init ---
app = FastAPI(title="Predictive Maintenance Serving API")

# --- Pydantic schemas ---
class SingleRecord(BaseModel):
    # Accept either raw Product ID and Type strings and numeric features, or encoded values.
    Product_ID: Optional[str] = None
    Type: Optional[str] = None
    Product_ID_enc: Optional[int] = None
    Type_enc: Optional[int] = None
    Air_temperature: Optional[float] = None  # permit friendly keys
    Process_temperature: Optional[float] = None
    Rotational_speed: Optional[float] = None
    Torque: Optional[float] = None
    Tool_wear: Optional[float] = None
    # allow additional fields
    extra: Optional[Dict[str, Any]] = None

class BatchRequest(BaseModel):
    records: List[Dict[str, Any]]

# --- Globals for loaded artifacts ---
_artifacts = {
    "tabnet": None,
    "tabnet_meta": None,
    "tabnet_preproc": None,
    "scaler_fe": None,
    "le_type": None,
    "le_product": None,
    "le_failtype": None,
    "ovr_models": {}
}

# --- Helper load function ---
def load_artifacts():
    # TabNet model
    try:
        if os.path.exists(TABNET_MODEL_FILE):
            classifier = TabNetClassifier()
            classifier.load_model(TABNET_MODEL_FILE)
            _artifacts["tabnet"] = classifier
        else:
            print("WARNING: TabNet model file not found at", TABNET_MODEL_FILE)
    except Exception as e:
        print("Failed loading TabNet:", e, traceback.format_exc())

    # TabNet preproc & meta (scaler, threshold)
    for path, key in [(TABNET_PREPROC_FILE, "tabnet_preproc"), (TABNET_META_FILE, "tabnet_meta")]:
        if os.path.exists(path):
            _artifacts[key] = joblib.load(path)
        else:
            print("Warning: missing", path)

    # FE scaler
    if os.path.exists(SCALER_FE_FILE):
        _artifacts["scaler_fe"] = joblib.load(SCALER_FE_FILE)
    else:
        print("Warning: missing", SCALER_FE_FILE)

    # label encoders
    for p, k in [(LE_TYPE_FILE, "le_type"), (LE_PRODUCT_FILE, "le_product"), (LE_FAILTYPE_FILE, "le_failtype")]:
        if os.path.exists(p):
            _artifacts[k] = joblib.load(p)
        else:
            print("Warning: missing", p)

    # try load OVR models iteratively until not found
    if _artifacts.get("le_failtype") is not None:
        n_classes = len(_artifacts["le_failtype"].classes_)
        for i in range(n_classes):
            p = OVR_MODEL_PATTERN.format(i)
            if os.path.exists(p):
                _artifacts["ovr_models"][i] = joblib.load(p)
            else:
                print("Warning: missing OVR model file:", p)

# load on startup
load_artifacts()

# --- Utilities ---
def ensure_tabnet_ready():
    if _artifacts["tabnet"] is None or _artifacts["tabnet_preproc"] is None:
        raise HTTPException(status_code=500, detail="TabNet model or preproc not loaded")

def prepare_tabnet_input_from_record(rec: Dict[str,Any]):
    """
    Return numpy array shaped (n_features,) in the tabnet feature order.
    rec can contain either encoded columns Product_ID_enc/Type_enc or raw Product_ID/Type.
    """
    vals = []
    # Product_ID_enc
    if rec.get("Product_ID_enc") is not None:
        pid_enc = int(rec["Product_ID_enc"])
    else:
        pid = rec.get("Product_ID") or rec.get("Product ID")
        if pid is None:
            raise ValueError("missing Product_ID or Product_ID_enc")
        if _artifacts["le_product"] is None:
            raise ValueError("le_product not available to encode Product ID")
        pid_enc = int(_artifacts["le_product"].transform([str(pid)])[0])
    vals.append(pid_enc)

    # Type_enc
    if rec.get("Type_enc") is not None:
        type_enc = int(rec["Type_enc"])
    else:
        t = rec.get("Type")
        if t is None:
            raise ValueError("missing Type or Type_enc")
        if _artifacts["le_type"] is None:
            raise ValueError("le_type not available to encode Type")
        type_enc = int(_artifacts["le_type"].transform([str(t)])[0])
    vals.append(type_enc)

    # numeric features
    # accept multiple key names (friendly)
    mapping = {
        'Air temperature [K]': ['Air_temperature','Air temperature [K]','Air temperature','air_temp'],
        'Process temperature [K]': ['Process_temperature','Process temperature [K]','process_temp'],
        'Rotational speed [rpm]': ['Rotational_speed','Rotational speed [rpm]','rot_speed'],
        'Torque [Nm]': ['Torque','Torque [Nm]'],
        'Tool wear [min]': ['Tool_wear','Tool wear [min]']
    }
    for canonical, keys in mapping.items():
        v = None
        for k in keys:
            if k in rec and rec[k] is not None:
                v = float(rec[k])
                break
        if v is None:
            raise ValueError(f"missing numeric field for {canonical} (tried keys: {keys})")
        vals.append(v)
    return np.array(vals, dtype=np.float32)

# --- Endpoints ---
@app.get("/health")
def health():
    loaded = {k: (None if _artifacts.get(k) is None else True) for k in ["tabnet","tabnet_preproc","tabnet_meta","scaler_fe","le_type","le_product","le_failtype"]}
    return {"status":"ok","loaded":loaded}

@app.post("/anomaly/predict")
def anomaly_predict(payload: BatchRequest):
    """
    Accepts payload.records: list of dict records. Each record must contain the features required by TabNet service.
    Returns: for each record: probability (failure_prob_raw), failure_prob (rounded), is_anomaly (0/1)
    """
    try:
        ensure_tabnet_ready()
        meta = _artifacts["tabnet_meta"] or {}
        threshold = float(meta.get("threshold", 0.5))
        tabnet = _artifacts["tabnet"]
        preproc_job = _artifacts["tabnet_preproc"]  # may contain scaler etc.
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

    records = payload.records
    results = []
    X_list = []
    for rec in records:
        try:
            arr = prepare_tabnet_input_from_record(rec)
            X_list.append(arr)
        except Exception as e:
            raise HTTPException(status_code=400, detail=f"Bad record: {e}")

    X_np = np.vstack(X_list).astype(np.float32)
    # if you saved a scaler externally in tabnet_preproc, use it:
    if isinstance(preproc_job, dict) and "scaler" in preproc_job:
        scaler = preproc_job["scaler"]
        # prepare from original raw features -> but our prepare_tabnet_input already gives numeric encoded+raw
        # apply scaler expect same order as FEATURE_COLS_TABNET
        X_scaled = scaler.transform(X_np)
    else:
        # assume supplied X_np already scaled (less ideal)
        X_scaled = X_np

    probs = tabnet.predict_proba(X_scaled)[:,1]
    for i, p in enumerate(probs):
        is_anom = int(p >= threshold)
        results.append({
            "index": i,
            "failure_prob_raw": float(p),
            "failure_prob": round(float(p), 4),
            "is_anomaly": is_anom,
            "threshold": threshold
        })
    return {"count": len(results), "threshold": threshold, "results": results}

@app.post("/failure_type/predict")
def failure_type_predict(payload: BatchRequest):
    """
    Predict failure type using OVR models and the FE scaler.
    Expects records containing raw features used to construct FE columns (see doc).
    """
    if _artifacts["scaler_fe"] is None or _artifacts["le_failtype"] is None:
        raise HTTPException(status_code=500, detail="FE scaler or le_failtype not loaded")

    scaler_fe = _artifacts["scaler_fe"]
    le_failtype = _artifacts["le_failtype"]
    ovr_models = _artifacts["ovr_models"]

    recs = payload.records
    # Build FE rows for each record in the same order as FEATURE_COLS_FE
    feat_matrix = []
    for rec in recs:
        # require original base features:
        try:
            air = float(rec.get("Air temperature [K]") or rec.get("Air_temperature"))
            proc = float(rec.get("Process temperature [K]") or rec.get("Process_temperature"))
            rot = float(rec.get("Rotational speed [rpm]") or rec.get("Rotational_speed"))
            torque = float(rec.get("Torque [Nm]") or rec.get("Torque"))
            tool = float(rec.get("Tool wear [min]") or rec.get("Tool_wear"))
            t_raw = rec.get("Type")
            if t_raw is None:
                raise ValueError("Type is required for failure_type prediction")
            if _artifacts["le_type"] is None:
                raise ValueError("le_type missing to encode Type")
            type_encoded = int(_artifacts["le_type"].transform([str(t_raw)])[0])

            # engineered features
            temp_diff = proc - air
            torque_speed = torque * rot
            energy = torque * rot * proc
            load_factor = torque / (rot + 1)
            temp_ratio = proc / (air + 1)

            # outlier flags (IQR) - in serving we cannot recompute training IQR easily.
            # We'll approximate by using simple z-like check relative to training scaler
            # But safer: require that outlier flags are precomputed or skip. We'll compute using training scaler quantiles if present.
            # For now, compute simple rule: 0 outlier (serving can't recompute training IQR reliably)
            out_air = 0
            out_proc = 0
            out_rot = 0
            out_torque = 0
            out_tool = 0

            row = [
                air, proc, rot, torque, tool,
                type_encoded, temp_diff, torque_speed, energy, load_factor, temp_ratio,
                out_air, out_proc, out_rot, out_torque, out_tool
            ]
            feat_matrix.append(row)
        except Exception as e:
            raise HTTPException(status_code=400, detail=f"Bad record: {e}")

    Xfe = np.array(feat_matrix, dtype=np.float32)
    Xfe_scaled = scaler_fe.transform(Xfe)
    n_classes = len(le_failtype.classes_)
    # collect per-class probabilities
    proba_list = []
    for i in range(n_classes):
        model = ovr_models.get(i)
        if model is None:
            proba_list.append(np.zeros((Xfe_scaled.shape[0],1)))
            continue
        # model is likely xgboost or sklearn
        try:
            proba = model.predict_proba(Xfe_scaled)[:,1].reshape(-1,1)
        except Exception:
            # fallback: predict
            preds = model.predict(Xfe_scaled)
            proba = preds.reshape(-1,1)
        proba_list.append(proba)
    proba_stack = np.hstack(proba_list)  # n_samples x n_classes

    # apply boosting and threshold override as in training
    proba_boosted = proba_stack.copy()
    for cls_idx, cls_name in enumerate(le_failtype.classes_):
        boost = FAILURE_BOOST_MAP.get(cls_name, 1)
        proba_boosted[:, cls_idx] *= boost

    proba_override = proba_boosted.copy()
    for i in range(proba_override.shape[0]):
        for cls_idx, cls_name in enumerate(le_failtype.classes_):
            thr = FAILURE_THRESHOLDS.get(cls_name)
            if thr is not None and proba_stack[i, cls_idx] > thr:
                proba_override[i, cls_idx] = 9999

    y_pred = np.argmax(proba_override, axis=1)
    results = []
    for i in range(Xfe_scaled.shape[0]):
        pred_idx = int(y_pred[i])
        pred_label = le_failtype.inverse_transform([pred_idx])[0]
        # return raw stacked probs per class (use proba_stack for true probabilities)
        probs_dict = {le_failtype.inverse_transform([j])[0]: float(proba_stack[i,j]) for j in range(proba_stack.shape[1])}
        recommendation = {
            # map recommendations same as training or load from file if saved
            "No Failure":"Tidak perlu tindakan. Jadwalkan pemeliharaan rutin sesuai SOP.",
            "Heat Dissipation Failure":"Periksa sistem pendingin/ventilasi, bersihkan kipas dan saluran udara, cek thermal paste/junction; turunkan beban kerja sementara.",
            "Power Failure":"Periksa suplai listrik dan konektor, cek stabilizer/UPS, periksa fuse dan sambungan grounding.",
            "Overstrain Failure":"Kurangi beban operasional, periksa beban mekanis, lakukan pengecekan komponen yang bekerja berlebih dan lakukan balancing.",
            "Random Failures":"Lakukan inspeksi menyeluruh; cek log operasi dan sensor; tingkatkan monitoring, kalau perlu gantikan komponen yang sering error.",
            "Tool Wear Failure":"Ganti atau asah tool; cek parameter pemotongan; tinjau jadwal penggantian tool lebih sering."
        }.get(pred_label, "Lakukan inspeksi manual dan cek log untuk diagnosa lebih lanjut.")
        results.append({
            "index": i,
            "pred_failure_type_enc": pred_idx,
            "pred_failure_type": pred_label,
            "probs_per_class": probs_dict,
            "recommendation": recommendation
        })
    return {"count": len(results), "results": results}
