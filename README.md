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

- `npm run build`: Membuat build production menggunakan Webpack.
- `npm run dev`: Menjalankan server development menggunakan Webpack Dev Server.
- `npm run preview`: Menjalankan server HTTP untuk build yang sudah dibuat.
- `npm run prettier`: Memeriksa format kode menggunakan Prettier.
- `npm run prettier:write`: Memformat ulang kode menggunakan Prettier.

## Struktur Proyek

```plaintext
sakaloka-frontend
├── package.json            # Informasi dependensi proyek
├── package-lock.json       # File lock untuk dependensi
├── README.md               # Dokumentasi proyek
├── vite.config.base.js     # Konfigurasi Vite (umum)
├── vite.config.dev.js      # Konfigurasi Vite (development)
├── vite.config.prod.js     # Konfigurasi Vite (production)
└── src                     # Direktori utama untuk kode sumber
    ├── index.html          # Berkas HTML utama
    ├── public              # Direktori aset publik
    │   ├── favicon.ico     # Ikon situs
    │   └── images          # Gambar yang digunakan dalam proyek
    ├── scripts             # Direktori untuk kode JavaScript
    │   ├── data            # Folder untuk API atau sumber data
    │   ├── pages           # Halaman-halaman utama
    │   ├── routes          # Pengaturan routing
    │   ├── utils           # Helper dan utilitas
    │   ├── templates.js    # Template HTML dinamis
    │   ├── config.js       # Konfigurasi proyek
    │   └── index.js        # Entry point aplikasi
    └── styles              # File CSS
        ├── responsives.css # Gaya untuk responsivitas
        └── styles.css      # Gaya umum
```