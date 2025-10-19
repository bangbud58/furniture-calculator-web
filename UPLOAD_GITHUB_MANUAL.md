# 📤 Panduan Upload ke GitHub (Manual - Tanpa Git)

## 🌟 Cara Termudah: Upload Lewat Browser

Tidak perlu install Git! Langsung upload lewat website GitHub.

---

## 📝 Langkah-Langkah:

### 1️⃣ Buat Akun GitHub

1. Buka: https://github.com/signup
2. Isi email, username, password
3. Verifikasi email
4. ✅ Selesai!

---

### 2️⃣ Buat Repository Baru

1. Login ke GitHub
2. Klik tombol **"+"** (kanan atas) → **"New repository"**
3. Isi form:
   - **Repository name**: `furniture-price-generator` (atau nama lain)
   - **Description**: `Aplikasi kalkulator harga furniture`
   - **Public** (centang)
   - ⚠️ **JANGAN centang** "Add a README file"
   - Klik **"Create repository"**

---

### 3️⃣ Upload Files

Setelah repository dibuat, akan muncul halaman kosong:

1. Klik **"uploading an existing file"** (ada di tengah halaman)

2. **Drag & drop** atau klik "choose your files", lalu pilih **5 file ini**:
   ```
   ✅ streamlit_app.py
   ✅ material_descriptions.py
   ✅ requirements-streamlit.txt
   ✅ README.md
   ✅ QUICKSTART_STREAMLIT.md
   ```

3. Tunggu upload selesai

4. Di bagian bawah, isi:
   - **Commit message**: `Initial commit: Furniture Price Generator`
   - Klik **"Commit changes"**

5. ✅ **Selesai!** File sudah di GitHub

---

### 4️⃣ Deploy ke Streamlit Cloud

1. **Buka**: https://streamlit.io/cloud

2. **Sign in with GitHub**:
   - Klik "Sign in with GitHub"
   - Authorize Streamlit

3. **New App**:
   - Klik tombol **"New app"**

4. **Isi Form**:
   - **Repository**: Pilih `your-username/furniture-price-generator`
   - **Branch**: `main`
   - **Main file path**: `streamlit_app.py`

5. **Deploy**:
   - Klik **"Deploy"**
   - Tunggu 2-3 menit
   - ✅ Aplikasi online!

6. **URL Aplikasi**:
   - Akan dapat URL: `https://furniture-price-generator.streamlit.app`
   - Atau custom: `https://your-custom-name.streamlit.app`

---

## 🎯 File yang Wajib Diupload

| File | Deskripsi |
|------|-----------|
| `streamlit_app.py` | Aplikasi utama (WAJIB) |
| `material_descriptions.py` | Database material (WAJIB) |
| `requirements-streamlit.txt` | Dependencies (WAJIB) |
| `README.md` | Dokumentasi project |
| `QUICKSTART_STREAMLIT.md` | Quick start guide |

---

## 📱 Setelah Deploy

### Share ke Orang Lain:
Tinggal kasih link URL aplikasi!

### Install as App di HP:

**Android:**
1. Buka URL di Chrome
2. Menu (⋮) → "Add to Home screen"

**iPhone:**
1. Buka URL di Safari
2. Share → "Add to Home Screen"

---

## 🔄 Update Aplikasi

Kalau mau update kode:

1. Buka repository di GitHub
2. Klik file yang mau diedit (misal: `streamlit_app.py`)
3. Klik icon **pensil** (edit)
4. Edit kode
5. Scroll ke bawah, klik **"Commit changes"**
6. ⏱️ Tunggu 1-2 menit
7. ✅ Aplikasi otomatis update!

---

## ❓ Troubleshooting

### "Repository not found"
→ Pastikan repository dibuat dengan benar

### "Main file not found"
→ Pastikan `streamlit_app.py` sudah diupload

### "Requirements error"
→ Pastikan `requirements-streamlit.txt` sudah diupload

### Aplikasi error setelah deploy
→ Cek logs di Streamlit Cloud dashboard

---

## 🎉 Selesai!

Sekarang aplikasi Anda:
- ✅ Online 24/7
- ✅ Bisa diakses dari mana saja
- ✅ Gratis selamanya
- ✅ Auto update saat edit code

**Selamat! 🚀**
