# 🚀 PANDUAN LENGKAP - Upload ke GitHub & Deploy Streamlit

## 📥 STEP 1: Install Git (5 menit)

### Download Git:
✅ Browser sudah terbuka otomatis!

Jika belum terbuka, klik: https://git-scm.com/download/win

### Install Git:
1. Download file `Git-xxx-64-bit.exe`
2. Double-click file yang didownload
3. Klik **Next** terus (pakai setting default)
4. Tunggu sampai selesai
5. Klik **Finish**
6. ✅ **RESTART Terminal PowerShell** (tutup dan buka lagi)

---

## 📝 STEP 2: Buat Akun GitHub (3 menit)

1. **Buka**: https://github.com/signup

2. **Isi form**:
   - Email: (email Anda)
   - Password: (password kuat)
   - Username: (nama unik, misal: mapanfurniture)

3. **Verifikasi**:
   - Solve puzzle CAPTCHA
   - Klik email konfirmasi
   - ✅ Akun siap!

---

## 🏗️ STEP 3: Buat Repository (2 menit)

1. **Login GitHub**

2. **Klik tombol "+"** (pojok kanan atas)

3. **Pilih "New repository"**

4. **Isi form**:
   ```
   Repository name: furniture-price-generator
   Description: Aplikasi Kalkulator Harga Furniture
   Public: ✅ (centang)
   Add a README: ❌ (JANGAN centang!)
   ```

5. **Klik "Create repository"**

6. ✅ **Repository siap!**
   - URL akan jadi: `https://github.com/USERNAME/furniture-price-generator`
   - Simpan USERNAME Anda!

---

## 📤 STEP 4: Upload ke GitHub (OTOMATIS)

### Setelah Git terinstall dan terminal direstart:

1. **Buka terminal PowerShell baru** (tutup yang lama)

2. **Pindah ke folder project**:
   ```powershell
   cd 'd:\PROGRAM PROJECT\FURNITURE PRICE GENERATOR'
   ```

3. **Jalankan script upload**:
   ```powershell
   python upload_to_github.py
   ```

4. **Ikuti instruksi di layar**:
   - Masukkan nama repository: `furniture-price-generator`
   - Masukkan username GitHub: `USERNAME_ANDA`
   - Ketik `yes` untuk konfirmasi
   - Login GitHub saat diminta

5. ✅ **Upload selesai!**

---

## 🌐 STEP 5: Deploy ke Streamlit Cloud (3 menit)

1. **Buka**: https://streamlit.io/cloud

2. **Klik "Sign in with GitHub"**
   - Authorize Streamlit (klik "Authorize")
   - ✅ Login berhasil

3. **Klik "New app"** (tombol merah)

4. **Isi form**:
   ```
   Repository: USERNAME/furniture-price-generator
   Branch: main
   Main file path: streamlit_app.py
   ```

5. **Klik "Deploy!"**

6. **Tunggu 2-3 menit...**
   - Loading bar akan jalan
   - Build app...
   - ✅ **Aplikasi online!**

7. **URL Aplikasi**:
   - Akan dapat URL seperti: `https://furniture-price-generator.streamlit.app`
   - SIMPAN URL ini!

---

## 📱 STEP 6: Install as App di HP (Optional)

### Android (Chrome):
1. Buka URL aplikasi di Chrome
2. Menu (⋮) → "Add to Home screen"
3. Klik "Add"
4. ✅ Icon muncul di home screen

### iPhone (Safari):
1. Buka URL aplikasi di Safari
2. Tombol Share (kotak + panah)
3. Scroll → "Add to Home Screen"
4. Klik "Add"
5. ✅ Icon muncul di home screen

---

## 🎉 SELESAI!

### Anda Sekarang Punya:

✅ Repository GitHub: `https://github.com/USERNAME/furniture-price-generator`
✅ Aplikasi Online: `https://furniture-price-generator.streamlit.app`
✅ Bisa diakses dari semua device (Windows/Android/iOS/Mac)
✅ **Gratis selamanya!**

---

## 🔄 Cara Update Aplikasi

### Method 1: Edit Langsung di GitHub
1. Buka repository di GitHub
2. Klik file yang mau diedit
3. Klik icon pensil ✏️
4. Edit code
5. Klik "Commit changes"
6. Tunggu 1-2 menit → Auto update!

### Method 2: Upload File Baru
1. Buka repository di GitHub
2. Klik file yang mau diganti
3. Klik icon delete 🗑️
4. Upload file baru (drag & drop)
5. Commit changes
6. Tunggu 1-2 menit → Auto update!

---

## ❓ Troubleshooting

### Git command not found
→ Restart terminal setelah install Git

### Repository not found
→ Pastikan repository sudah dibuat di GitHub

### Deploy error di Streamlit
→ Cek:
  - File `streamlit_app.py` ada?
  - File `material_descriptions.py` ada?
  - File `requirements-streamlit.txt` ada?

### Aplikasi error setelah deploy
→ Klik "Manage app" → "Logs" untuk lihat error

---

## 📞 Bantuan Lebih Lanjut

Jika ada masalah:
1. Cek error message di terminal
2. Screenshot error
3. Tanya saya!

---

## 🎊 Bonus Tips

### Share Aplikasi:
- Tinggal kasih link URL ke teman/client!
- Bisa embed di website
- Bisa share di social media

### Monitoring:
- Cek berapa orang akses di Streamlit dashboard
- Lihat logs untuk debug

### Custom Domain (Advanced):
- Bisa pakai domain sendiri (misal: furniture.mapan.com)
- Setting di Streamlit Cloud

---

**Selamat! Aplikasi Anda sudah online! 🚀**

Made with ❤️ by Mapan
