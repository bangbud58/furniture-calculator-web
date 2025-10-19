# 🌐 Furniture Price Generator - Web Version (Streamlit)

## ✨ Keunggulan Versi Web

✅ **Universal** - Buka di browser apapun (Chrome, Safari, Firefox, Edge)  
✅ **Cross-Platform** - Windows, Android, iOS, Mac, Linux, Tablet  
✅ **Tidak Perlu Install** - Langsung buka URL  
✅ **Auto Update** - Tidak perlu download ulang  
✅ **Responsive** - Otomatis menyesuaikan ukuran layar  
✅ **Gratis Deploy** - Bisa host online gratis di Streamlit Cloud  

---

## 🚀 Cara 1: Jalankan Lokal (di Komputer Sendiri)

### Install Dependencies

```powershell
pip install -r requirements-streamlit.txt
```

### Jalankan Aplikasi

```powershell
streamlit run streamlit_app.py
```

Aplikasi akan otomatis terbuka di browser di `http://localhost:8501`

### Akses dari HP/Tablet (dalam jaringan WiFi yang sama)

1. Lihat IP address komputer Anda:
   ```powershell
   ipconfig
   ```
   Cari IPv4 Address (contoh: 192.168.1.100)

2. Jalankan Streamlit dengan network option:
   ```powershell
   streamlit run streamlit_app.py --server.address 0.0.0.0
   ```

3. Dari HP/Tablet, buka browser dan ketik:
   ```
   http://192.168.1.100:8501
   ```
   (ganti dengan IP address komputer Anda)

---

## ☁️ Cara 2: Deploy Online (GRATIS) - Akses dari Mana Saja

### Deploy ke Streamlit Cloud (Recommended)

1. **Buat akun GitHub** (jika belum punya):
   - Daftar di https://github.com

2. **Upload kode ke GitHub**:
   - Buat repository baru
   - Upload file:
     - `streamlit_app.py`
     - `material_descriptions.py`
     - `requirements-streamlit.txt`

3. **Deploy ke Streamlit Cloud**:
   - Buka https://streamlit.io/cloud
   - Sign in dengan akun GitHub
   - Klik "New app"
   - Pilih repository Anda
   - Main file: `streamlit_app.py`
   - Klik "Deploy"

4. **Selesai!**
   - Anda akan dapat URL publik (contoh: `https://yourapp.streamlit.app`)
   - URL bisa dibuka dari device manapun, kapanpun
   - Gratis selamanya!

### Deploy ke Platform Lain (Alternatif)

#### Hugging Face Spaces (Gratis)
```bash
# Upload ke Hugging Face Spaces
# Gratis, tidak perlu kartu kredit
```

#### Railway.app (Gratis tier available)
```bash
# Deploy dengan 1 klik
# Gratis $5/bulan kredit
```

#### Render (Gratis)
```bash
# Deploy web app gratis
# Sleep setelah 15 menit tidak digunakan
```

---

## 📱 Cara Pakai di HP/Tablet

### Android:
1. Buka Chrome/Firefox
2. Ketik URL aplikasi
3. Bookmark untuk akses cepat
4. **Install as App**: Buka menu (⋮) → "Add to Home screen"
   - Aplikasi akan muncul seperti app native!

### iOS (iPhone/iPad):
1. Buka Safari
2. Ketik URL aplikasi
3. Tap tombol Share (kotak dengan panah)
4. Pilih "Add to Home Screen"
   - Aplikasi akan muncul di home screen!

---

## 🎨 Fitur Versi Streamlit

✅ Semua 7 kategori furniture (Kitchen Set, Wardrobe, Bed, dll)  
✅ Kabinet Bawah & Atas dengan finishing terpisah  
✅ Deskripsi material lengkap  
✅ Export ke Excel dengan download langsung  
✅ Diskon slider (0-50%)  
✅ Total harga real-time  
✅ Hapus item individual atau semua sekaligus  
✅ Tema warna merah (matching dengan versi PyQt5)  
✅ Info button untuk setiap material/finishing  

---

## 🆚 Perbandingan: PyQt5 vs Streamlit

| Fitur | PyQt5 (.exe) | Streamlit (Web) |
|-------|-------------|----------------|
| Platform | Windows only | Semua (Win/Android/iOS/Mac) |
| Install | Download .exe (~80MB) | Buka URL langsung |
| Update | Download ulang | Auto update |
| Akses | Lokal saja | Dari mana saja (internet) |
| Size | 50-80 MB | Tidak ada download |
| Offline | ✅ Ya | ❌ Perlu internet |
| Speed | ⚡ Super cepat | 🚀 Cukup cepat |
| UI | Native Windows | Modern Web UI |

---

## 💡 Rekomendasi Penggunaan

### Pakai PyQt5 (.exe) jika:
- Hanya untuk 1 komputer Windows
- Sering offline
- Butuh performa maksimal

### Pakai Streamlit (Web) jika:
- Perlu akses dari banyak device
- Mau pakai di HP/Tablet/Mac
- Mau share dengan tim/client
- Mau akses dari mana saja
- Tidak mau ribet install

---

## 🛠️ Troubleshooting

### Port sudah dipakai
```powershell
streamlit run streamlit_app.py --server.port 8502
```

### Tidak bisa akses dari HP
- Pastikan komputer dan HP di WiFi yang sama
- Matikan firewall Windows sementara
- Gunakan IP yang benar (cek dengan `ipconfig`)

### Error saat deploy
- Pastikan `requirements-streamlit.txt` ada
- Pastikan semua file ter-upload ke GitHub
- Cek logs di Streamlit Cloud dashboard

---

## 📞 Support

Jika ada masalah:
1. Cek error message di terminal
2. Restart aplikasi
3. Clear browser cache
4. Reinstall dependencies

---

## 🎉 Selamat Mencoba!

Versi Streamlit ini memberikan fleksibilitas maksimal - akses dari device manapun, kapanpun, di manapun!

**Mau deploy online sekarang?** Ikuti langkah-langkah di atas atau tanyakan ke saya!
