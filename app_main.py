from flask import Flask

app = Flask(__name__)

@app.route('/')
def home():
    return '''
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Furniture Price Calculator - PT. Enigma Prisma Delapan</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { 
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
        }
        .container {
            background: white;
            border-radius: 20px;
            box-shadow: 0 20px 60px rgba(0,0,0,0.1);
            padding: 40px;
            max-width: 800px;
            width: 100%;
            text-align: center;
        }
        .header {
            margin-bottom: 30px;
        }
        .logo {
            width: 80px;
            height: 80px;
            background: #c0392b;
            border-radius: 50%;
            margin: 0 auto 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 30px;
            font-weight: bold;
        }
        h1 {
            color: #2c3e50;
            font-size: 2.5em;
            margin-bottom: 10px;
        }
        h2 {
            color: #c0392b;
            font-size: 1.5em;
            margin-bottom: 20px;
        }
        .success {
            background: linear-gradient(135deg, #4CAF50, #45a049);
            color: white;
            padding: 20px;
            border-radius: 15px;
            margin: 20px 0;
            font-size: 1.2em;
            font-weight: bold;
        }
        .company-info {
            background: #f8f9fa;
            padding: 25px;
            border-radius: 15px;
            margin: 20px 0;
            border-left: 5px solid #c0392b;
        }
        .pricing-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 15px;
            margin: 30px 0;
        }
        .price-card {
            background: linear-gradient(135deg, #ff9a9e 0%, #fecfef 50%, #fecfef 100%);
            padding: 20px;
            border-radius: 15px;
            color: #2c3e50;
            font-weight: bold;
        }
        .price-card h4 {
            font-size: 1.2em;
            margin-bottom: 10px;
            color: #c0392b;
        }
        .price {
            font-size: 1.4em;
            color: #27ae60;
        }
        .features {
            text-align: left;
            margin: 20px 0;
        }
        .feature-item {
            background: #e8f5e8;
            margin: 5px 0;
            padding: 15px;
            border-radius: 10px;
            border-left: 4px solid #27ae60;
        }
        .status {
            background: linear-gradient(135deg, #00c6fb 0%, #005bea 100%);
            color: white;
            padding: 20px;
            border-radius: 15px;
            margin-top: 30px;
            font-size: 1.1em;
        }
        @media (max-width: 600px) {
            .container { padding: 20px; }
            h1 { font-size: 2em; }
            .pricing-grid { grid-template-columns: 1fr; }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <div class="logo">🪑</div>
            <h1>FURNITURE PRICE CALCULATOR</h1>
            <h2>PT. ENIGMA PRISMA DELAPAN</h2>
        </div>
        
        <div class="success">
            🎉 WEBSITE BERHASIL ONLINE DI VERCEL!
        </div>
        
        <div class="company-info">
            <h3>🏢 Informasi Perusahaan</h3>
            <p><strong>PT. Enigma Prisma Delapan</strong></p>
            <p>📍 Jl. Raya H. Abdullah No.56, Pakulonan Barat, Tangerang</p>
            <p>📞 0821 1213 4258</p>
            <p>🌐 interiormapan.com</p>
        </div>
        
        <h3>💰 Sistem Pricing</h3>
        <div class="pricing-grid">
            <div class="price-card">
                <h4>Tacosheet</h4>
                <div class="price">Rp 2.300.000/m²</div>
                <p>Ekonomis</p>
            </div>
            <div class="price-card">
                <h4>HPL Low</h4>
                <div class="price">Rp 2.300.000/m²</div>
                <p>Motif Terbatas</p>
            </div>
            <div class="price-card">
                <h4>HPL Mid</h4>
                <div class="price">Rp 2.800.000/m²</div>
                <p>Motif Standar</p>
            </div>
            <div class="price-card">
                <h4>HPL High</h4>
                <div class="price">Rp 3.200.000/m²</div>
                <p>Full HPL</p>
            </div>
            <div class="price-card">
                <h4>Duco</h4>
                <div class="price">Rp 5.500.000/m²</div>
                <p>Premium Finishing</p>
            </div>
            <div class="price-card">
                <h4>Kombinasi</h4>
                <div class="price">Rp 4.700.000/m²</div>
                <p>HPL + Duco</p>
            </div>
        </div>
        
        <h3>🚀 Fitur Aplikasi</h3>
        <div class="features">
            <div class="feature-item">✅ Kalkulasi Harga Real-time</div>
            <div class="feature-item">✅ Multiple Kategori Furniture</div>
            <div class="feature-item">✅ Management Data Customer</div>
            <div class="feature-item">✅ Export Excel dengan Logo</div>
            <div class="feature-item">✅ Save/Load Project (JSON)</div>
            <div class="feature-item">✅ Kalkulasi Discount & Tax</div>
        </div>
        
        <div class="status">
            <p><strong>🌐 Status Website:</strong> ONLINE & WORKING</p>
            <p><strong>📅 Last Updated:</strong> October 20, 2025</p>
            <p><strong>⚡ Platform:</strong> Vercel Serverless</p>
        </div>
    </div>
</body>
</html>
    '''

@app.route('/test')
def test():
    return "WORKING! Calculator is online!"

@app.route('/api/test')
def api_test():
    return {
        "status": "success",
        "message": "Calculator API Working!",
        "company": "PT. Enigma Prisma Delapan",
        "timestamp": "2025-10-20",
        "pricing": {
            "Tacosheet": 2300000,
            "HPL_Low": 2300000,
            "HPL_Mid": 2800000,
            "HPL_High": 3200000,
            "Duco": 5500000,
            "Kombinasi": 4700000
        }
    }

if __name__ == '__main__':
    app.run()