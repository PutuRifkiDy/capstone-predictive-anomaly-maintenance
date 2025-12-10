from fastapi import FastAPI
from typing import Optional
import json

app = FastAPI(
    title="Predictive Maintenance API",
    description="API untuk membaca hasil prediksi ML dari file JSON.",
    version="1.0",
)

# -------------------------
# Load JSON saat startup
# -------------------------
with open("predictive_maintenance_results.json", "r") as f:
    MACHINES = json.load(f)


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