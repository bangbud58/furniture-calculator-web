"""
Script untuk build aplikasi menjadi .exe menggunakan PyInstaller
Jalankan: python build_windows.py
"""
import os
import subprocess
import sys

def install_pyinstaller():
    """Install PyInstaller jika belum ada"""
    try:
        import PyInstaller
        print("✓ PyInstaller sudah terinstall")
    except ImportError:
        print("Installing PyInstaller...")
        subprocess.check_call([sys.executable, "-m", "pip", "install", "pyinstaller"])
        print("✓ PyInstaller berhasil diinstall")

def build_exe():
    """Build aplikasi menjadi .exe"""
    print("\n=== Building Furniture Price Generator ===\n")
    
    # Perintah PyInstaller menggunakan python -m
    cmd = [
        sys.executable, "-m", "PyInstaller",
        "--name=FurniturePriceGenerator",
        "--windowed",  # Tidak muncul console window
        "--onefile",   # Single .exe file
        "--icon=NONE",  # Bisa ditambah icon .ico nanti
        "--add-data=material_descriptions.py;.",
        "--add-data=info_combo.py;.",
        "--hidden-import=openpyxl",
        "--hidden-import=PyQt5",
        "furniture_price_generator.py"
    ]
    
    try:
        subprocess.check_call(cmd)
        print("\n✓ Build berhasil!")
        print(f"\nFile .exe ada di: {os.path.join(os.getcwd(), 'dist', 'FurniturePriceGenerator.exe')}")
        print("\nAnda bisa copy file .exe ini ke komputer lain dan langsung jalankan")
        print("Tidak perlu install Python atau library apapun!")
    except subprocess.CalledProcessError as e:
        print(f"\n✗ Build gagal: {e}")
        sys.exit(1)

if __name__ == "__main__":
    install_pyinstaller()
    build_exe()
