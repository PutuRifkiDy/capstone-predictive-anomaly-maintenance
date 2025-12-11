import os
import shutil
import json
from fastapi import FastAPI, UploadFile, File, HTTPException
from typing import Optional
from fastapi.middleware.cors import CORSMiddleware

# import predictor.py
from ml_engine.predictor import run_and_save_api

app = FastAPI(
    title="Predictive Maintenance API",
    description="API untuk Upload CSV, Run Model, dan Baca Hasil Prediksi.",
    version="2.0",
)

# CORS, kasi akses frontend nya
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -------------------------
# Konfigurasi Path
# -------------------------
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATA_DIR = os.path.join(BASE_DIR, "data")
MODELS_DIR = os.path.join(BASE_DIR, "models")

# Path file
CSV_PATH = os.path.join(DATA_DIR, "predictive_maintenance.csv")
JSON_PATH = os.path.join(DATA_DIR, "predictive_maintenance_results.json")

# Variabel Global untuk simpan di memori
MACHINES = []


def load_data_to_memory():
    """Fungsi helper untuk memuat/refresh data JSON ke variabel global"""
    global MACHINES
    if os.path.exists(JSON_PATH):
        try:
            with open(JSON_PATH, "r", encoding="utf-8") as f:
                MACHINES = json.load(f)
            print(f"[INFO] Data loaded: {len(MACHINES)} records.")
        except Exception as e:
            print(f"[ERROR] Failed to load JSON: {e}")
            MACHINES = []
    else:
        print("[WARN] JSON file not found. Waiting for model run.")
        MACHINES = []


# Load data saat aplikasi pertama kali jalan
@app.on_event("startup")
async def startup_event():
    # Pastikan folder data ada
    os.makedirs(DATA_DIR, exist_ok=True)
    load_data_to_memory()


# -------------------------
# Load JSON saat startup
# -------------------------
# with open("predictive_maintenance_results.json", "r") as f:
#     MACHINES = json.load(f)


# -------------------------
#   API UPLOAD DATASET
# -------------------------
@app.post("/dataset/upload")
async def upload_dataset(file: UploadFile = File(...)):
    if not file.filename.endswith(".csv"):
        raise HTTPException(status_code=400, detail="Only CSV files are allowed.")

    try:
        # Simpan file ke folder data (overwrite yang lama)
        with open(CSV_PATH, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)

        return {
            "status": "success",
            "message": f"File '{file.filename}' uploaded successfully.",
            "path": CSV_PATH,
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to upload file: {str(e)}")


# -------------------------
#   API RUN MODEL
# -------------------------
@app.post("/model/run")
async def trigger_model():
    # Cek apakah CSV dan Model ada
    if not os.path.exists(CSV_PATH):
        raise HTTPException(
            status_code=404, detail="Dataset CSV not found. Please upload first."
        )

    if not os.path.exists(MODELS_DIR):
        raise HTTPException(status_code=500, detail="Models directory not found.")

    try:
        # Jalankan fungsi ML (dari predictor.py)
        # Ini akan membaca CSV -> Proses ML -> Tulis JSON
        count = run_and_save_api(
            input_csv=CSV_PATH, output_json=JSON_PATH, model_dir=MODELS_DIR
        )

        # Refresh data di memori agar endpoint GET /machines/all langsung dapat data baru
        load_data_to_memory()

        return {
            "status": "success",
            "message": "Model executed successfully.",
            "processed_records": count,
        }
    except Exception as e:
        import traceback

        traceback.print_exc()
        raise HTTPException(status_code=500, detail=f"Model execution failed: {str(e)}")


# -------------------------
# GET: Semua mesin
# -------------------------
@app.get("/machines/all")
def get_all():
    return MACHINES


# -------------------------
# GET: Mesin risiko tertinggi (top-1)
# -------------------------
@app.get("/machines/highest_risk")
def highest_risk():
    sorted_data = sorted(MACHINES, key=lambda x: x["anomaly_probability"], reverse=True)
    return sorted_data[0]


# -------------------------
# GET: Top N mesin paling berisiko
# -------------------------
@app.get("/machines/top/{n}")
def get_top_n(n: int = 5):
    sorted_data = sorted(MACHINES, key=lambda x: x["anomaly_probability"], reverse=True)
    return sorted_data[:n]


# -------------------------
# GET: Top N mesin resiko paling rendah
# -------------------------
@app.get("/machines/bottom/{n}")
def get_bottom_n(n: int = 5):
    sorted_data = sorted(MACHINES, key=lambda x: x["anomaly_probability"])
    return sorted_data[:n]


# -------------------------
# GET: Cari berdasarkan failure type / machine type
# -------------------------
@app.get("/machines/search")
def search(failure_type: Optional[str] = None, machine_type: Optional[str] = None):
    result = MACHINES

    if failure_type:
        result = [
            m
            for m in result
            if failure_type.lower() in m["predicted_failure_type"].lower()
        ]

    if machine_type:
        result = [
            m for m in result if m["machine_type"].lower() == machine_type.lower()
        ]

    return result


# -------------------------
# GET: Detail satu mesin
# -------------------------
@app.get("/machines/{product_id}")
def get_machine(product_id: str):
    for m in MACHINES:
        if m["product_id"] == product_id:
            return m
    return {"error": "Machine not found"}
