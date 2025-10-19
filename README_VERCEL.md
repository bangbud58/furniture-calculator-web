# Furniture Price Generator - Vercel Deployment

## 🚀 Live Demo
[https://mapan-price-calculator.vercel.app](https://mapan-price-calculator.vercel.app)

## 📱 Multi-Platform Furniture Price Calculator

Advanced furniture pricing system for **PT. Enigma Prisma Delapan** with three versions:

### 🖥️ **Desktop Version** (PyQt5)
- Native Windows application
- Compact 80px logo header
- Real-time input validation
- Excel export with company branding
- Keyboard shortcuts (Ctrl+S, Ctrl+O, etc.)

### 🌐 **Web Version** (Flask) - **DEPLOYED ON VERCEL**
- Browser-based application
- Responsive Bootstrap design
- Same functionality as desktop
- Cross-platform compatibility
- No installation required

### 📱 **Mobile Version** (Tkinter Simulator)
- Mobile-optimized interface
- Touch-friendly 400×800 resolution
- Preview of mobile functionality

## 💰 **Pricing System**

### HPL 3-Level Pricing:
- **Tacosheet**: Rp 2,300,000/m² (Ekonomis)
- **HPL Low**: Rp 2,300,000/m² (Motif terbatas)
- **HPL Mid**: Rp 2,800,000/m² (Motif standar)
- **HPL High**: Rp 3,200,000/m² (Full HPL, semua motif)
- **Duco**: Rp 5,500,000/m² (Premium finishing)
- **Kombinasi**: Rp 4,700,000/m² (HPL + Duco)

### Furniture Categories:
- Kitchen Set (KB/KA)
- Wardrobe
- Bed Frame
- Backdrop Panel
- Credenza
- Multi Cabinet
- Custom Furniture

## 📊 **Features**

### Core Functionality:
- ✅ Real-time price calculation
- ✅ Volume-based pricing (P×L×T)
- ✅ Material descriptions & info
- ✅ Customer information management
- ✅ Discount & tax calculations
- ✅ Save/load projects (JSON)
- ✅ Excel export with company logo

### Advanced Features:
- 🎨 Company branding integration
- 📋 Material finishing descriptions
- 💾 Project data persistence
- 📈 Automatic calculations
- 🖨️ Professional invoicing
- 📱 Cross-device compatibility

## 🏢 **Company Information**

**PT. ENIGMA PRISMA DELAPAN**
- Address: Jl. Raya H. Abdullah No.56, Pakulonan Barat, Tangerang
- Phone: 0821 1213 4258
- Website: interiormapan.com
- Social: mapan.interiorr

## 🛠️ **Technical Stack**

### Web Version (Vercel):
- **Backend**: Flask (Python)
- **Frontend**: Bootstrap 5.1.3, Font Awesome 6.0.0
- **Styling**: Custom CSS with animations
- **JavaScript**: Vanilla JS with AJAX
- **Export**: openpyxl for Excel generation
- **Deployment**: Vercel serverless

### Desktop Version:
- **Framework**: PyQt5 5.15.11
- **UI**: QWidget, QLabel, QPushButton, etc.
- **Validation**: QDoubleValidator
- **Export**: openpyxl + PIL for logo integration
- **Build**: PyInstaller for .exe

### Mobile Simulator:
- **Framework**: Tkinter
- **Resolution**: 400×800 mobile simulation
- **UI**: Touch-optimized interface

## 📁 **Project Structure**

```
mapan-price-calculator/
├── index.py                    # Vercel entry point
├── vercel.json                 # Vercel configuration
├── requirements.txt            # Python dependencies
├── furniture_price_generator.py # Desktop app (PyQt5)
├── mobile_simulator.py         # Mobile simulator (Tkinter)
├── web_version/               # Web application (Flask)
│   ├── app.py                # Flask backend
│   ├── templates/index.html  # Bootstrap frontend
│   ├── static/               # CSS, JS, images
│   └── requirements.txt      # Web dependencies
├── logo.png                   # Company logo
├── illustrations/             # Measurement guides
└── docs/                     # Documentation
```

## 🚀 **Getting Started**

### Web Version (Live):
1. Visit: https://mapan-price-calculator.vercel.app
2. Select furniture category
3. Input dimensions (P×L×T)
4. Choose finishing type
5. Calculate and export to Excel

### Desktop Version:
1. Download `furniture_price_generator.exe`
2. Run application
3. Same interface as web version
4. Offline functionality

### Development:
```bash
# Clone repository
git clone https://github.com/bangbud58/mapan-price-calculator.git

# Web version
cd web_version
pip install -r requirements.txt
python app.py

# Desktop version
pip install -r requirements-build.txt
python furniture_price_generator.py
```

## 📈 **Calculation Formula**

```
Volume = Panjang (m) × Lebar (m) × Tinggi (m)
Base Price = Volume × Harga per m³ (sesuai finishing)
Subtotal = Sum of all items
Discount = Subtotal × Discount %
After Discount = Subtotal - Discount
Tax = After Discount × Tax % (default 11% PPN)
Grand Total = After Discount + Tax
```

## 📞 **Support**

For technical support or business inquiries:
- **Phone**: 0821 1213 4258
- **Email**: info@enigmaprisma.com
- **Website**: interiormapan.com

---
**© 2025 PT. Enigma Prisma Delapan - Professional Furniture Pricing Solutions**