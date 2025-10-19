# Panduan Build APK Android

## Prerequisites

1. **Install Python** (sudah ada)
2. **Install Java JDK 8 atau 11**
3. **Install Android SDK** 
4. **Install Buildozer**

## Setup Environment

### 1. Install Buildozer
```bash
pip install buildozer
pip install cython
```

### 2. Install Android SDK (jika belum ada)
- Download Android Studio atau Android SDK tools
- Set environment variable ANDROID_HOME
- Add to PATH: %ANDROID_HOME%/tools, %ANDROID_HOME%/platform-tools

### 3. Install Java JDK
- Download Java JDK 8 atau 11
- Set JAVA_HOME environment variable

## Build Process

### 1. Test Android App Locally (dengan Kivy)
```bash
cd "d:\PROGRAM PROJECT\FURNITURE PRICE GENERATOR"
pip install kivy[base,media]
python android_app.py
```

### 2. Build APK (memerlukan Linux/WSL atau VM)
**Note: Buildozer hanya bekerja di Linux. Untuk Windows perlu WSL atau VM.**

#### Opsi A: Menggunakan WSL (Windows Subsystem for Linux)
```bash
# Install WSL terlebih dahulu
wsl --install

# Di dalam WSL:
sudo apt update
sudo apt install -y git zip unzip openjdk-8-jdk python3-pip autoconf libtool pkg-config zlib1g-dev libncurses5-dev libncursesw5-dev libtinfo5 cmake libffi-dev libssl-dev

pip3 install --upgrade buildozer cython

# Copy project ke WSL dan build
cd /mnt/d/PROGRAM\ PROJECT/FURNITURE\ PRICE\ GENERATOR/
buildozer android debug
```

#### Opsi B: Menggunakan Docker
```bash
# Menggunakan Docker container
docker run --rm -v "%cd%":/home/user/app kivy/buildozer buildozer android debug
```

#### Opsi C: Menggunakan GitHub Actions (Otomatis)
Buat file `.github/workflows/build-android.yml` untuk auto-build.

## Alternatif: Menggunakan BeeWare Briefcase

### 1. Install Briefcase
```bash
pip install briefcase
```

### 2. Setup Project Structure
```bash
briefcase new
# Ikuti wizard, pilih:
# - Formal Name: Furniture Price Generator
# - App Name: furniturepriceapp
# - Bundle: com.mapan
# - Application Template: Kivy
```

### 3. Build APK
```bash
briefcase create android
briefcase build android
briefcase package android
```

## File Yang Dibutuhkan

1. **android_app.py** - Main aplikasi Android (sudah dibuat)
2. **buildozer.spec** - Konfigurasi build (sudah dibuat)
3. **requirements-android.txt** - Dependencies (sudah dibuat)
4. **info_combo.py** - Module data (sudah ada)
5. **material_descriptions.py** - Module data (sudah ada)
6. **logo.png** - Icon aplikasi (sudah ada)

## Fitur Android App

✅ **UI Mobile-Friendly**
- Layout responsive untuk layar phone
- Touch-friendly buttons
- Scroll view untuk daftar item

✅ **Core Features**
- Tambah/hapus item furniture
- Kategori dan finishing selection
- Perhitungan harga otomatis
- Customer info management
- Diskon & pajak settings

✅ **Data Persistence**
- Save/Load project ke JSON
- Format filename: MPN(tahun)(bulan romawi)(urut)-(customer)

✅ **Mobile Optimizations**
- Popup dialogs untuk input
- Optimized untuk portrait orientation
- Touch gestures support

## Output APK Location
```
bin/furniturepriceapp-1.0-debug.apk
```

## Testing
1. Install APK di Android device/emulator
2. Test semua fitur (add item, calculate, save/load)
3. Verify file save/load di storage internal

## Distribution
- **Debug APK**: Untuk testing internal
- **Release APK**: Perlu signing certificate untuk PlayStore
- **AAB**: Format untuk Google Play Store

## Troubleshooting

**Error: "Command failed: ./gradlew assembleDebug"**
- Update Android SDK/NDK version di buildozer.spec

**Error: "Java not found"**
- Set JAVA_HOME environment variable

**Error: "SDK not found"**
- Set ANDROID_HOME dan update PATH

**Error: "Permission denied"**
- Check file permissions di Linux/WSL