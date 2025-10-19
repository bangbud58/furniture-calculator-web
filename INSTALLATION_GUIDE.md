# Furniture Price Generator - Installation Guide

## 📦 WINDOWS - Install sebagai .exe (Standalone)

### Cara 1: Build sendiri dari source code

1. **Install PyInstaller** (sekali saja):
```powershell
pip install pyinstaller
```

2. **Build .exe**:
```powershell
python build_windows.py
```

3. **Hasil**:
   - File `.exe` akan ada di folder `dist/FurniturePriceGenerator.exe`
   - Copy file ini ke komputer manapun dan langsung double-click untuk jalankan
   - **TIDAK PERLU install Python atau library!**

### Cara 2: Manual build dengan PyInstaller

```powershell
pyinstaller --name=FurniturePriceGenerator --windowed --onefile --add-data="material_descriptions.py;." --add-data="info_combo.py;." --hidden-import=openpyxl --hidden-import=PyQt5 furniture_price_generator.py
```

File .exe akan ada di folder `dist/`

---

## 📱 ANDROID - Install sebagai .apk

### ⚠️ CATATAN PENTING
PyQt5 **TIDAK SUPPORT Android**. Ada 2 pilihan:

### Pilihan 1: Konversi ke Kivy (Recommended)
Kivy adalah framework Python yang support Android.

**Langkah:**
1. Install Kivy:
```bash
pip install kivy kivymd buildozer
```

2. Saya akan buatkan versi Kivy dari aplikasi ini (UI akan sedikit berbeda tapi fungsi sama)

3. Build .apk dengan Buildozer (di Linux/WSL):
```bash
buildozer android debug
```

**Kelebihan:** Gratis, open source, bisa build sendiri  
**Kekurangan:** UI harus diredesign, proses build agak lama

### Pilihan 2: Menggunakan BeeWare Toga
BeeWare bisa convert Python app ke native mobile app.

```bash
pip install briefcase
briefcase create android
briefcase build android
briefcase package android
```

**Kelebihan:** Lebih native look  
**Kekurangan:** Masih kurang mature, dokumentasi terbatas

### Pilihan 3: Web App (Paling Mudah!)
Convert ke web app dengan Flask/Streamlit, lalu akses dari browser Android.

**Keuntungan:**
- 1 kode untuk semua platform (Windows, Android, iOS, Mac)
- Tidak perlu install apapun, buka di browser
- Bisa di-host online atau jalankan lokal

---

## 🚀 REKOMENDASI SAYA

### Untuk Windows:
✅ **Gunakan PyInstaller** (sudah saya buatkan `build_windows.py`)
   - Paling mudah dan cepat
   - Hasil .exe langsung bisa dipakai tanpa install apapun
   - Size sekitar 50-80 MB

### Untuk Android:
✅ **Konversi ke Web App dengan Streamlit**
   - Paling praktis dan cepat
   - Bisa diakses dari browser Android/iOS
   - Bisa di-host online (Streamlit Cloud gratis) atau jalankan lokal
   - Saya bisa buatkan versi Streamlit yang tampilannya bagus dan responsif

**Atau** bisa saya buatkan versi Kivy jika Anda mau .apk yang bisa diinstall offline.

---

## 📝 Mau saya lanjutkan yang mana?

1. **Build Windows .exe sekarang** → Saya jalankan `build_windows.py`
2. **Buat versi Streamlit (Web App)** → 1 kode untuk semua device
3. **Buat versi Kivy (Android .apk)** → Native Android app
4. **Semua di atas** → Complete multi-platform solution

Pilih nomor yang Anda inginkan!
