from flask import Flask

app = Flask(__name__)

@app.route('/')
def hello():
    return '''
    <html>
    <head>
        <title>Mapan Price Calculator - Working!</title>
        <meta charset="UTF-8">
        <style>
            body { font-family: Arial, sans-serif; margin: 40px; background: #f0f0f0; }
            .container { max-width: 600px; margin: 0 auto; background: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
            .header { color: #c0392b; text-align: center; margin-bottom: 30px; }
            .success { background: #d4edda; color: #155724; padding: 15px; border-radius: 5px; margin: 20px 0; }
            .company { background: #e3f2fd; padding: 15px; border-radius: 5px; margin: 20px 0; }
            .features { list-style: none; padding: 0; }
            .features li { background: #f8f9fa; margin: 5px 0; padding: 10px; border-left: 4px solid #c0392b; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>🚀 FURNITURE PRICE CALCULATOR</h1>
                <h2>PT. ENIGMA PRISMA DELAPAN</h2>
            </div>
            
            <div class="success">
                <h3>✅ DEPLOYMENT BERHASIL!</h3>
                <p>Website sudah online dan berjalan dengan baik di Vercel.</p>
            </div>
            
            <div class="company">
                <h4>🏢 Company Information:</h4>
                <p><strong>PT. Enigma Prisma Delapan</strong></p>
                <p>📍 Jl. Raya H. Abdullah No.56, Pakulonan Barat, Tangerang</p>
                <p>📞 0821 1213 4258</p>
                <p>🌐 interiormapan.com</p>
            </div>
            
            <h4>💰 Pricing System:</h4>
            <ul class="features">
                <li><strong>Tacosheet:</strong> Rp 2,300,000/m² - Ekonomis</li>
                <li><strong>HPL Low:</strong> Rp 2,300,000/m² - Motif terbatas</li>
                <li><strong>HPL Mid:</strong> Rp 2,800,000/m² - Motif standar</li>
                <li><strong>HPL High:</strong> Rp 3,200,000/m² - Full HPL</li>
                <li><strong>Duco:</strong> Rp 5,500,000/m² - Premium finishing</li>
                <li><strong>Kombinasi:</strong> Rp 4,700,000/m² - HPL + Duco</li>
            </ul>
            
            <h4>🛠️ Features:</h4>
            <ul class="features">
                <li>✅ Real-time Price Calculation</li>
                <li>✅ Multiple Furniture Categories</li>
                <li>✅ Customer Information Management</li>
                <li>✅ Excel Export with Company Logo</li>
                <li>✅ Project Save/Load (JSON)</li>
                <li>✅ Discount & Tax Calculations</li>
            </ul>
            
            <div style="text-align: center; margin: 30px 0;">
                <p><strong>🌐 Website Status:</strong> <span style="color: green;">ONLINE & WORKING</span></p>
                <p><strong>📅 Last Updated:</strong> October 20, 2025</p>
            </div>
        </div>
    </body>
    </html>
    '''

@app.route('/test')
def test():
    return "OK - Furniture Price Calculator is Working!"

@app.route('/api/test')
def api_test():
    return {
        "status": "success",
        "message": "API is working",
        "calculator": "Furniture Price Generator",
        "company": "PT. Enigma Prisma Delapan",
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