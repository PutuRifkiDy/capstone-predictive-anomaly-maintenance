# PREVO 
Prevo adalah solusi predictive maintenance yang menggabungkan keakuratan model Hybrid dengan kecerdasan Agentic AI. Berbeda dengan sistem konvensional, Prevo tidak hanya memprediksi kerusakan dari data historis, tetapi secara otonom menjadwalkan tiket perbaikan. Inovasi ini menutup celah antara prediksi dan eksekusi, bertujuan mencegah unplanned downtime serta mengoptimalkan efisiensi biaya operasional industri secara signifikan

## Link Projek Machine Learning
- Google Collab, Dataset, Model, Requirements, dan README.md ML
[[Projek Machine Learning](https://drive.google.com/drive/folders/1eH9gXOpAeVmALYfMZHib-uPmzX3Qsgej?usp=sharing)]

## Prasyarat
Adapun beberap prasyarat untuk menjalankan program ini yaitu:
- Node.js dan npm
[[Download Node.js dan npm](https://nodejs.org/en)]

- PostgreSQL
[[Download PostgreSQL](https://www.postgresql.org/)]

## Instalasi
Ikuti langkah-langkah di bawah ini untuk menginstal dan menjalankan proyek di mesin lokal Anda.

### 1. Clone Repository
Clone repository ini ke direktori lokal Anda dengan menggunakan perintah berikut:
```
$ git clone https://github.com/PutuRifkiDy/capstone-predictive-anomaly-maintenance.git
```

### 2. Instal Dependency
### Back-End
Masuk ke direktori `backend` dan instal dependencies menggunakan npm
```
cd .\backend\
npm install
```

### Front-End
Masuk ke direktori `frontend` dan instal dependencies menggunakan npm
```
cd .\frontend\
npm install
```

### 3. Konfigurasi Database
#### a. Buat database PostgreSQL
Masuk ke PostgreSQL dan buat database baru dengan perintah:
```
CREATE DATABASE capstone_prevo
```

#### b. Konfigurasi Koneksi Database
Buat file `.env` di direktori `backend` dan tambahkan konfigurasi database :
```
# konfigurasi aplikasi
PORT=3000

# konfigurasi database
PGUSER=youruser
PGHOST=localhost
PGPASSWORD=yourpassword
PGDATABASE=capstone_prevo
PGPORT=5432

# JWT Configuration
ACCESS_TOKEN_SECRET=your_access_token_secret_key_here_make_it_long_and_secure
REFRESH_TOKEN_SECRET=your_refresh_token_secret_key_here_make_it_different_and_secure
```

#### c. Jalankan migrations
Masuk ke direktori `backend` dan jalankan migrations dengan perintah berikut:
```
npm run migrate up
```

### 4. Menjalankan Aplikasi
### Back-End
Masuk ke direktori `backend` dan jalankan server Express:
```
cd .\backend\
npm start
```
Server Back-End akan berjalan di `http://localhost:3000`

### Front-End
Masuk ke direktori `frontend` dan jalankan aplikasi React:
```
cd .\frontend\
npm run dev
```
Aplikasi Front-End akan berjalan di `http://localhost:5173`


### 5. Mengakses Aplikasi
Buka browser Anda dan akses `http://localhost:5173` untuk melihat aplikasi berjalan.

## Struktur Proyek
Berikut adalah struktur direktori dari proyek ini:
```
project-name/
├── backend/
│   ├── api/
│   ├── migrations/
│   ├── node_modules/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middlewares/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── utils/
│   │   ├── validators/
│   │   └── app.js
│   ├── server.js
│   └── ...
│
├── frontend/
│   ├── node_modules/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── hooks/
│   │   ├── lib/
│   │   ├── pages/
│   │   ├── utils/
│   │   ├── App.jsx
│   │   └── index.jsx
│   ├── .gitignore
│   └── ...
│
├── machine_learning/
│   ├── __Pycache__/
│   ├── data/
│   ├── ml_engine/
│   ├── models/
│   ├── main.py
│   └── requirements.txt
│
└── README.md
```
