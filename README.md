# 🛋️ Furniture Price Generator

Aplikasi kalkulator harga furniture custom berbasis web dengan Streamlit. Mendukung 7 kategori furniture dengan perhitungan otomatis dan export ke Excel.

## ✨ Fitur

- ✅ **7 Kategori Furniture**: Kitchen Set, Wardrobe, Bed, Backdrop, Credenza, Multi Cabinet, Custom
- ✅ **Kitchen Set Lengkap**: Kabinet Bawah, Kabinet Atas (finishing terpisah), Top Table, Backsplash
- ✅ **Info Material**: Deskripsi lengkap untuk setiap material/finishing
- ✅ **Export Excel**: Download langsung dengan format rapi
- ✅ **Diskon Fleksibel**: Slider 0-50%
- ✅ **Responsive**: Otomatis menyesuaikan ukuran layar
- ✅ **Multi-Platform**: Windows, Android, iOS, Mac - semua bisa!

## 🚀 Live Demo

Aplikasi ini sudah di-deploy dan bisa langsung diakses:

👉 **[Klik di sini untuk membuka aplikasi](https://your-app-url.streamlit.app)** _(update setelah deploy)_

## 📱 Install as Mobile App

### Android (Chrome):
1. Buka aplikasi di browser
2. Menu (⋮) → "Add to Home screen"
3. Selesai! Icon muncul di home screen

### iOS (Safari):
1. Buka aplikasi di browser
2. Share button → "Add to Home Screen"
3. Selesai! Icon muncul di home screen

## 🎨 Screenshot

_(Tambahkan screenshot aplikasi di sini)_

## 💻 Teknologi

- **Framework**: [Streamlit](https://streamlit.io/)
- **Excel Export**: [openpyxl](https://openpyxl.readthedocs.io/)
- **Language**: Python 3.11+

## 🛠️ Development

### Prasyarat

- Python 3.11 atau 3.12
- pip

### Instalasi Lokal

```bash
# Clone repository
git clone https://github.com/YOUR_USERNAME/furniture-price-generator.git
cd furniture-price-generator

# Install dependencies
pip install -r requirements-streamlit.txt

# Run aplikasi
streamlit run streamlit_app.py
```

Aplikasi akan terbuka di `http://localhost:8501`

## 📦 File Structure

```
furniture-price-generator/
├── streamlit_app.py              # Aplikasi utama
├── material_descriptions.py       # Database material & finishing
├── requirements-streamlit.txt     # Dependencies
├── README_STREAMLIT.md           # Dokumentasi lengkap
└── QUICKSTART_STREAMLIT.md       # Quick start guide
```

## 📝 Cara Deploy ke Streamlit Cloud

1. **Fork repository ini** (klik tombol Fork di atas)
2. **Buka Streamlit Cloud**: https://streamlit.io/cloud
3. **Sign in** dengan akun GitHub
4. **Klik "New app"**
5. **Pilih repository** yang sudah di-fork
6. **Main file path**: `streamlit_app.py`
7. **Klik "Deploy"**
8. **Tunggu 2-3 menit** - Selesai!

## 🎯 Harga & Kalkulasi

### Finishing (Kabinet):
- **HPL**: Rp 1,800,000/m² (Kitchen Set Bawah), Rp 1,600,000/m² (Wardrobe)
- **Duco**: Rp 2,200,000/m² (Kitchen Set Bawah), Rp 2,000,000/m² (Wardrobe)
- **Kombinasi**: Rp 2,000,000/m² (Kitchen Set Bawah), Rp 1,800,000/m² (Wardrobe)

### Material (Top Table & Backsplash):
- **Solid Surface**: Rp 2,500,000/m²
- **Granit Alam**: Rp 1,800,000/m²
- **Marmer**: Rp 3,500,000/m²
- **Mirror Clear**: Rp 1,200,000/m²
- **Bronze Mirror**: Rp 1,300,000/m²
- **Keramik**: Rp 800,000/m²

### Material (Bed):
- **Synthetic Leather**: Rp 1,800,000/m²
- **Fabric**: Rp 1,200,000/m²

**Catatan**: 
- Kabinet minimum 100x100 cm
- Ketebalan ≥ 3cm = harga x 1.5

## 🤝 Kontribusi

Pull requests welcome! Untuk perubahan besar, buka issue dulu untuk diskusi.

## 📄 Lisensi

MIT License - Bebas digunakan untuk personal maupun komersial.

## 👨‍💻 Author

**Mapan Furniture**

## 🙏 Acknowledgments

- Streamlit team untuk framework yang luar biasa
- Komunitas Python Indonesia
