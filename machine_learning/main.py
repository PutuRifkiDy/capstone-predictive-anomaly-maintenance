from fastapi import FastAPI
from pydantic import BaseModel
import joblib
import numpy as np
from pytorch_tabnet.tab_model import TabNetClassifier

app = FastAPI()

# -------------------------------------------------------
# LOAD TABNET ANOMALY MODEL
# -------------------------------------------------------

tabnet = TabNetClassifier()
tabnet.load_model("models/tabnet_anomaly_model.zip")

preproc_tabnet = joblib.load("models/tabnet_anomaly_preproc.joblib")
meta_tabnet = joblib.load("models/tabnet_anomaly_meta.joblib")

scaler_tabnet = preproc_tabnet["scaler"]
threshold_anomaly = meta_tabnet["threshold"]

# -------------------------------------------------------
# LOAD SINGLE XGB MULTICLASS MODEL
# -------------------------------------------------------

xgb_model = joblib.load("models/xgb_ovr_fe.joblib")  # hanya 1 file model
scaler_fe = joblib.load("models/scaler_fe.joblib")
le_failtype = joblib.load("models/label_failtype.joblib")

# -------------------------------------------------------
# INPUT SCHEMA
# -------------------------------------------------------

class InputData(BaseModel):
    air_temp: float
    process_temp: float
    rot_speed: float
    torque: float
    tool_wear: float
    type_encoded: int

# -------------------------------------------------------
# FEATURE ENGINEERING
# -------------------------------------------------------

def feature_engineering(data: InputData):
    d = data

    features = {
        "Air temperature [K]": d.air_temp,
        "Process temperature [K]": d.process_temp,
        "Rotational speed [rpm]": d.rot_speed,
        "Torque [Nm]": d.torque,
        "Tool wear [min]": d.tool_wear,
        "Type_Encoded": d.type_encoded,
        "Temp_Diff": d.process_temp - d.air_temp,
        "Torque_Speed_Product": d.torque * d.rot_speed,
        "Energy": d.torque * d.rot_speed * d.process_temp,
        "Load_Factor": d.torque / (d.rot_speed + 1),
        "Temp_Ratio": d.process_temp / (d.air_temp + 1),
        "Air temperature [K]_Outlier": 0,
        "Process temperature [K]_Outlier": 0,
        "Rotational speed [rpm]_Outlier": 0,
        "Torque [Nm]_Outlier": 0,
        "Tool wear [min]_Outlier": 0
    }

    return np.array(list(features.values())).reshape(1, -1)

# -------------------------------------------------------
# ENDPOINT: FAILURE TYPE (1 MODEL SAJA)
# -------------------------------------------------------

@app.post("/predict/failure_type")
def predict_failure_type(data: InputData):
    X = feature_engineering(data)
    X_scaled = scaler_fe.transform(X)

    # Multi-class model → predict_proba: [ [p0, p1, p2, ...] ]
    proba = xgb_model.predict_proba(X_scaled)[0]

    idx = int(np.argmax(proba))
    class_name = le_failtype.inverse_transform([idx])[0]

    return {
        "failure_type": class_name,
        "probabilities": dict(zip(le_failtype.classes_, proba.tolist()))
    }


# -------------------------------------------------------
# ENDPOINT: COMBINED PREDICTION
# -------------------------------------------------------

@app.post("/predict/all")
def predict_all(data: InputData):
    # anomaly
    X_tabnet = np.array([
        [
            data.air_temp,
            data.process_temp,
            data.rot_speed,
            data.torque,
            data.tool_wear,
            data.type_encoded,
        ]
    ])
    X_tabnet_scaled = scaler_tabnet.transform(X_tabnet)
    prob = tabnet.predict_proba(X_tabnet_scaled.astype(np.float32))[0][1]
    anomaly = int(prob >= threshold_anomaly)

    # failure type
    ftype = predict_failure_type(data)

    recommendations = {
        "No Failure": "Tidak perlu tindakan.",
        "Heat Dissipation Failure": "Periksa cooling system.",
        "Power Failure": "Cek sumber daya.",
        "Overstrain Failure": "Kurangi beban mesin.",
        "Random Failures": "Lakukan inspeksi menyeluruh.",
        "Tool Wear Failure": "Ganti atau perbaiki tool."
    }

    return {
        "anomaly_detection": {
            "probability": float(prob),
            "is_anomaly": anomaly
        },
        "failure_type_prediction": ftype,
        "recommendation": recommendations.get(ftype["failure_type"], "Cek manual.")
    }
