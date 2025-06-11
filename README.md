# 🌏 SakaLoka — Culture-Based Smart Map

## Deskripsi

SakaLoka adalah platform peta pintar berbasis AI yang menghadirkan rekomendasi acara budaya dan destinasi wisata lokal di Indonesia secara personal dan interaktif. Tidak hanya menampilkan lokasi acara, SakaLoka juga menawarkan fitur sistem rekomendasi berbasis Machine Learning, kalender budaya, ulasan pengguna, serta sistem notifikasi dan bookmark.

## Fitur

🗺️ Peta Interaktif: Tampilkan lokasi event & tempat wisata budaya terdekat secara real-time  
🔍 Sistem Rekomendasi AI: Rekomendasi berbasis minat & lokasi pengguna dengan Content-Based dan Collaborative Filtering (Scikit-Learn)  
📅 Kalender Budaya: Informasi jadwal acara dari berbagai wilayah di Indonesia  
✍️ Ulasan & Cerita: Pengguna dapat menulis review dan berbagi pengalaman  
📌 Bookmark & Notifikasi: Simpan event favorit dan dapatkan pengingat otomatis

## Prasyarat

- Node.js (disarankan versi terbaru)
- npm atau yarn

## Instalasi

- Unduh starter project (https://github.com/sakaloka/sakaloka-frontend/archive/refs/heads/main.zip).
- Unzip berkas ZIP yang telah diunduh. Bisa pakai perintah berikut untuk Linux:

  ```bash
  unzip ./sakaloka-frontend-main.zip
  ```

- Masuk ke direktori proyek:

  ```bash
  cd sakaloka-frontend
  ```

- Pasang seluruh dependensi:
  ```bash
  npm i
  ```

## Scripts

- `npm run build`: Membuat build production menggunakan Vite.
- `npm run dev`: Menjalankan server development menggunakan Vite Dev Server.
- `npm run preview`: Menjalankan server HTTP untuk build yang sudah dibuat.
- `npm run prettier`: Memeriksa format kode menggunakan Prettier.
- `npm run prettier:write`: Memformat ulang kode menggunakan Prettier.

## Struktur Proyek

```plaintext
sakaloka-frontend
├── package.json            # Informasi dependensi proyek
├── package-lock.json       # File lock untuk dependensi
├── README.md               # Dokumentasi proyek
├── vite.config.js          # Konfigurasi Vite
└── src                     # Direktori utama untuk kode sumber
    ├── public              # Direktori aset publik
    │   └── images          # Gambar yang digunakan dalam proyek
    │   └── _redirects      # Berkas untuk redirect deployment
    │   └── favicon.ico     # Icon utama aplikasi
    ├── components          # Direktori komponen JavaScript
    │   └── utils           # Helper dan utilitas
    ├── constants           # Direktori fetch API 
    ├── pages               # Halaman-halaman utama
    ├── routes              # Pengaturan routing
    ├── config.js           # Konfigurasi proyek
    ├── index.html          # Berkas HTML utama
    ├── main.js             # Berkas JavaScript utama
    └── style.css           # Gaya CSS umum
    └── sw.js               # Berkas Service Worker
```
