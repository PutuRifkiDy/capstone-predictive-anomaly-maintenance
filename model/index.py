# Install library eksternal
# pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cu118 -q
# pip install pytorch-tabnet -q

# Import Library
import os
import sys
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
sns.set(style="whitegrid")

# Pra-pemrosesan & split data
from sklearn.preprocessing import LabelEncoder, StandardScaler
from sklearn.model_selection import train_test_split, StratifiedKFold
from sklearn.utils.class_weight import compute_sample_weight
from imblearn.over_sampling import SMOTE

# Model klasik & tuning
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import GridSearchCV
from sklearn.calibration import CalibratedClassifierCV

# Evaluasi
from sklearn.metrics import (
    classification_report,
    confusion_matrix,
    roc_auc_score,
    accuracy_score,
    recall_score,
    precision_recall_curve,
    precision_score,
    f1_score,
    average_precision_score
)

# Utility
import joblib

# XGBoost
import xgboost as xgb

# Deep learning (Keras)
import tensorflow as tf
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense, Dropout, BatchNormalization
from tensorflow.keras.callbacks import EarlyStopping, ReduceLROnPlateau

# TabNet
import torch
from pytorch_tabnet.tab_model import TabNetClassifier

"""# Loading Dataset"""

# --- Load Dataset dari Google Drive ---
path = '/predictive_maintenance.csv'
df = pd.read_csv(path)

print(f"Jumlah baris & kolom: {df.shape}")
display(df.head())

print("\nInformasi dataset:")
print(df.info())

print("\nJumlah missing value:")
print(df.isnull().sum())

"""#Preprocessing"""

#PREPROCESSING
df['Product_ID_orig'] = df['Product ID'].astype(str)

# Label Encoding
le_product = LabelEncoder()
le_type = LabelEncoder()

df['Product_ID_enc'] = le_product.fit_transform(df['Product ID'])
df['Type_enc'] = le_type.fit_transform(df['Type'])

# Feature selection
feature_cols = [
    'Product_ID_enc', 'Type_enc', 'Air temperature [K]', 'Process temperature [K]',
    'Rotational speed [rpm]', 'Torque [Nm]', 'Tool wear [min]'
]

X = df[feature_cols]
y = df['Target']

# Scaling
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)
X_scaled_df = pd.DataFrame(X_scaled, columns=feature_cols)


FEATURE_COLS = feature_cols

# Pastikan target dalam bentuk integer 0/1
y_raw = y.copy()
if y_raw.dtype == object:
    y_raw = y_raw.map({'No Failure':0, 'Failure':1})
y_raw = y_raw.fillna(0).astype(int).values

# Split sebelum scaling (X_scaled_df sudah ready)
X_train_scaled, X_test_scaled, y_train, y_test = train_test_split(
    X_scaled_df.values, y_raw,
    test_size=0.2, stratify=y_raw, random_state=42
)

# SMOTE pada training data
sm = SMOTE(random_state=42)
X_res, y_res = sm.fit_resample(X_train_scaled, y_train)

# Buat X_full_scaled untuk mapping hasil prediksi ke df
X_full_scaled = X_scaled_df.values

print("Tambahan preprocessing selesai:")
print("Train shape:", X_train_scaled.shape, "Test shape:", X_test_scaled.shape)
print("Train positives:", int(y_train.sum()), " | Test positives:", int(y_test.sum()))
print("After SMOTE:", X_res.shape, "positives:", (y_res==1).sum())

print("Preprocessing selesai ✓")
display(X_scaled_df.head())

"""#Anomaly Detection"""

SAVE_PREFIX = "tabnet_anomaly"
MODEL_FILE = f"{SAVE_PREFIX}_model.zip"
DEVICE = 'cuda' if torch.cuda.is_available() else 'cpu'
print("Device:", DEVICE)

# -- Ensure required variables exist --
required = ['X_test_scaled','y_test','scaler','df','FEATURE_COLS']
for v in required:
    if v not in globals():
        raise RuntimeError(f"Variable '{v}' not found. Jalankan cell preprocessing terlebih dahulu.")

# -- If model file exists, load it; else instantiate and train --
if os.path.exists(MODEL_FILE):
    print("Loading existing model:", MODEL_FILE)
    clf_tabnet = TabNetClassifier()   # dummy instance to call load_model
    clf_tabnet.load_model(MODEL_FILE)
else:
    print("No saved model found — creating and training TabNet.")
    # instantiate
    clf_tabnet = TabNetClassifier(device_name=DEVICE, n_d=8, n_a=8, n_steps=3, gamma=1.3, seed=42)
    # pick training data: prefer X_res (SMOTE) if available, else X_train_scaled
    if 'X_res' in globals() and 'y_res' in globals():
        X_train_for_fit = X_res.astype(np.float32)
        y_train_for_fit = y_res.astype(np.int64)
    else:
        X_train_for_fit = X_train_scaled.astype(np.float32)
        y_train_for_fit = y_train.astype(np.int64)
    # fit (safe args)
    clf_tabnet.fit(
        X_train_for_fit, y_train_for_fit,
        eval_set=[(X_test_scaled.astype(np.float32), y_test.astype(np.int64))],
        eval_metric=['auc','accuracy'],
        max_epochs=100,
        patience=30,
        batch_size=128,
        virtual_batch_size=32,
        num_workers=0,
        drop_last=False
    )
    clf_tabnet.save_model(MODEL_FILE)
    print("Model trained and saved:", MODEL_FILE)

# -- Predict on test and choose threshold prioritizing recall >= RECALL_TARGET --
RECALL_TARGET = 0.70
probs_test = clf_tabnet.predict_proba(X_test_scaled.astype(np.float32))[:,1]
precisions, recalls, thresholds = precision_recall_curve(y_test, probs_test)

chosen_threshold = None
best_prec = -1
for p, r, t in zip(precisions[:-1], recalls[:-1], thresholds):
    if r >= RECALL_TARGET and p > best_prec:
        best_prec = p
        chosen_threshold = t
if chosen_threshold is None:
    f1_scores = 2 * (precisions * recalls) / (precisions + recalls + 1e-12)
    best_idx = np.nanargmax(f1_scores)
    chosen_threshold = thresholds[best_idx] if best_idx < len(thresholds) else 0.5

# -- Eval --
y_pred_test = (probs_test >= chosen_threshold).astype(int)
print("Chosen threshold:", float(chosen_threshold))
print("Confusion matrix (test):\n", confusion_matrix(y_test, y_pred_test))
print("\nClassification report (test):\n", classification_report(y_test, y_pred_test, digits=4))
print("ROC AUC:", roc_auc_score(y_test, probs_test))
print("PR AUC:", average_precision_score(y_test, probs_test))

# -- Map probabilities to full df and save artifacts --
X_full = df[FEATURE_COLS].astype(float)
X_full_scaled = scaler.transform(X_full)
probs_full = clf_tabnet.predict_proba(X_full_scaled.astype(np.float32))[:,1]
df['failure_prob_raw'] = probs_full
df['failure_prob'] = np.round(probs_full, 3)
df['is_anomaly'] = (df['failure_prob_raw'] >= chosen_threshold).astype(int)

joblib.dump({'scaler': scaler}, f"{SAVE_PREFIX}_preproc.joblib")
joblib.dump({'threshold': float(chosen_threshold), 'recall_target': RECALL_TARGET}, f"{SAVE_PREFIX}_meta.joblib")

print("Overall ROC AUC:", roc_auc_score(df['Target'].map({'No Failure':0,'Failure':1}) if df['Target'].dtype==object else df['Target'], probs_full))
print("Total anomalies flagged:", int(df['is_anomaly'].sum()), "/", len(df))
display(df.sort_values('failure_prob_raw', ascending=False).head(20)[['UDI','Product ID','failure_prob_raw','failure_prob','is_anomaly']])

# -- Feature importances --
try:
    fi = clf_tabnet.feature_importances_
    import pandas as pd
    fi_df = pd.DataFrame({'feature': FEATURE_COLS, 'importance': fi}).sort_values('importance', ascending=False)
    print("Feature importances:")
    display(fi_df)
except Exception:
    pass

"""#Prediksi Resiko"""

# Copy dataframe
df_fe = df.copy()

# Encode kolom Type jika ada
if "Type" in df_fe.columns:
    le_type = LabelEncoder()
    df_fe["Type_Encoded"] = le_type.fit_transform(df_fe["Type"])
else:
    df_fe["Type_Encoded"] = 0

# Feature engineering
df_fe["Temp_Diff"] = df_fe["Process temperature [K]"] - df_fe["Air temperature [K]"]
df_fe["Torque_Speed_Product"] = df_fe["Torque [Nm]"] * df_fe["Rotational speed [rpm]"]
df_fe["Energy"] = df_fe["Torque [Nm]"] * df_fe["Rotational speed [rpm]"] * df_fe["Process temperature [K]"]
df_fe["Load_Factor"] = df_fe["Torque [Nm]"] / (df_fe["Rotational speed [rpm]"] + 1)
df_fe["Temp_Ratio"] = df_fe["Process temperature [K]"] / (df_fe["Air temperature [K]"] + 1)

for col in [
    "Air temperature [K]",
    "Process temperature [K]",
    "Rotational speed [rpm]",
    "Torque [Nm]",
    "Tool wear [min]"
]:
    Q1 = df_fe[col].quantile(0.25)
    Q3 = df_fe[col].quantile(0.75)
    IQR = Q3 - Q1
    df_fe[col + "_Outlier"] = ((df_fe[col] < Q1 - 1.5 * IQR) | (df_fe[col] > Q3 + 1.5 * IQR)).astype(int)

feature_cols = [
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

X_fe = df_fe[feature_cols].copy()

# Scaling
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X_fe)
joblib.dump(scaler, "scaler_fe.joblib")

X_ft = X_scaled
le_failtype = LabelEncoder()
df_fe["FailureType_enc"] = le_failtype.fit_transform(df_fe["Failure Type"])
y_ft = df_fe["FailureType_enc"].values

print("Kelas:", le_failtype.classes_)
unique, counts = np.unique(y_ft, return_counts=True)
print("Distribusi awal:", dict(zip(unique, counts)))

# Split train-test sekali (tanpa augment)
X_train, X_test, y_train, y_test = train_test_split(
    X_ft,
    y_ft,
    test_size=0.2,
    stratify=y_ft,
    random_state=42
)

print("Distribusi y_train:", np.bincount(y_train))
print("Distribusi y_test :", np.bincount(y_test))

# OVR training
models_ovr = {}
n_classes = len(le_failtype.classes_)

for class_idx, class_name in enumerate(le_failtype.classes_):
    print(f"\nMelatih model OVR untuk kelas: {class_name} (index {class_idx})")

    y_train_bin = (y_train == class_idx).astype(int)
    pos = y_train_bin.sum()
    neg = len(y_train_bin) - pos

    if pos == 0:
        print("  Tidak ada positif di train untuk kelas ini, dilewati.")
        continue

    scale_pos_weight = neg / pos if pos > 0 else 1.0
    print(f"  Pos: {pos}, Neg: {neg}, scale_pos_weight: {scale_pos_weight:.2f}")

    model = xgb.XGBClassifier(
        n_estimators=500,
        learning_rate=0.03,
        max_depth=6,
        subsample=0.9,
        colsample_bytree=0.9,
        objective="binary:logistic",
        eval_metric="logloss",
        tree_method="hist",
        random_state=42,
        n_jobs=-1,
        scale_pos_weight=scale_pos_weight
    )

    model.fit(X_train, y_train_bin)
    models_ovr[class_idx] = model

# PROBABILITAS TEST SEMUA KELAS (proba_stack)
proba_list = []
for class_idx in range(n_classes):
    model = models_ovr.get(class_idx)
    if model is None:
        # jika tidak ada model utk kelas ini, isi 0
        proba_list.append(np.zeros((X_test.shape[0], 1)))
        continue
    proba = model.predict_proba(X_test)[:, 1].reshape(-1, 1)
    proba_list.append(proba)

proba_stack = np.hstack(proba_list)  # shape: (n_test, n_classes)

# Tahap 1: boosting
proba_boosted = proba_stack.copy()
for class_idx, cls_name in enumerate(le_failtype.classes_):
    if cls_name == "Random Failures":
        proba_boosted[:, class_idx] *= 50
    if cls_name == "Tool Wear Failure":
        proba_boosted[:, class_idx] *= 40

# Tahap 2: per-class threshold override (safety rule)
thresholds = {
    "Random Failures": 0.003,
    "Tool Wear Failure": 0.0045
}

proba_override = proba_boosted.copy()

for i in range(len(proba_override)):
    for class_idx, cls_name in enumerate(le_failtype.classes_):
        if cls_name in thresholds:
            # PENTING: pakai proba_stack asli untuk cek threshold
            if proba_stack[i, class_idx] > thresholds[cls_name]:
                proba_override[i, class_idx] = 9999   # paksa jadi yang tertinggi

# Prediksi final
y_pred_final = np.argmax(proba_override, axis=1)

print("\nEvaluasi")
print("Accuracy:", accuracy_score(y_test, y_pred_final))
print("\nConfusion Matrix:\n", confusion_matrix(y_test, y_pred_final))
print("\nClassification Report:\n",
      classification_report(y_test, y_pred_final, target_names=le_failtype.classes_))

# Prediksi seluruh data df untuk rekomendasi
X_all = scaler.transform(df_fe[feature_cols].values)
proba_list_all = []
for class_idx in range(n_classes):
    model = models_ovr.get(class_idx)
    if model is None:
        proba_list_all.append(np.zeros((X_all.shape[0], 1)))
        continue
    proba = model.predict_proba(X_all)[:, 1].reshape(-1, 1)
    proba_list_all.append(proba)

proba_stack_all = np.hstack(proba_list_all)
y_pred_all_ovr = np.argmax(proba_stack_all, axis=1)

df["pred_failure_type_ovr_fe_enc"] = y_pred_all_ovr
df["pred_failure_type_ovr_fe"] = le_failtype.inverse_transform(
    df["pred_failure_type_ovr_fe_enc"].astype(int)
)

rekom_map_ovr_fe = {
    "No Failure": "Tidak perlu tindakan. Jadwalkan pemeliharaan rutin sesuai SOP.",
    "Heat Dissipation Failure": "Periksa sistem pendingin/ventilasi, bersihkan kipas dan saluran udara, cek thermal paste/junction; turunkan beban kerja sementara.",
    "Power Failure": "Periksa suplai listrik dan konektor, cek stabilizer/UPS, periksa fuse dan sambungan grounding.",
    "Overstrain Failure": "Kurangi beban operasional, periksa beban mekanis, lakukan pengecekan komponen yang bekerja berlebih dan lakukan balancing.",
    "Random Failures": "Lakukan inspeksi menyeluruh; cek log operasi dan sensor; tingkatkan monitoring, kalau perlu gantikan komponen yang sering error.",
    "Tool Wear Failure": "Ganti atau asah tool; cek parameter pemotongan; tinjau jadwal penggantian tool lebih sering."
}

for cls in le_failtype.classes_:
    if cls not in rekom_map_ovr_fe:
        rekom_map_ovr_fe[cls] = "Lakukan inspeksi manual dan cek log untuk diagnosa lebih lanjut."

df["recommendation_ovr_fe"] = df["pred_failure_type_ovr_fe"].map(rekom_map_ovr_fe)

def show_recommendations_ovr_fe(df, n=10, random_state=42):
    cols = [
        "Product_ID_orig",
        "Type",
        "Air temperature [K]",
        "Process temperature [K]",
        "Rotational speed [rpm]",
        "Torque [Nm]",
        "Tool wear [min]",
        "Failure Type",
        "pred_failure_type_ovr_fe",
        "recommendation_ovr_fe"
    ]
    display(df[cols].sample(n, random_state=random_state))

show_recommendations_ovr_fe(df, n=10, random_state=42)

"""#Rekomendasi Maintenance"""