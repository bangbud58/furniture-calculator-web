# Simplified Flask app for Vercel testing
from flask import Flask, render_template, request, jsonify

app = Flask(__name__)
app.secret_key = 'mapan_calculator_2025'

@app.route('/')
def index():
    return '''
    <!DOCTYPE html>
    <html>
    <head>
        <title>Mapan Price Calculator</title>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet">
    </head>
    <body>
        <div class="container mt-5">
            <div class="row justify-content-center">
                <div class="col-md-8">
                    <div class="card">
                        <div class="card-header bg-primary text-white text-center">
                            <h2>🚀 Furniture Price Calculator</h2>
                            <p class="mb-0">PT. Enigma Prisma Delapan</p>
                        </div>
                        <div class="card-body">
                            <div class="alert alert-success">
                                <h4>✅ Deployment Berhasil!</h4>
                                <p>Web application telah berhasil di-deploy ke Vercel.</p>
                            </div>
                            
                            <div class="row">
                                <div class="col-md-6">
                                    <h5>📊 Features:</h5>
                                    <ul class="list-group list-group-flush">
                                        <li class="list-group-item">✅ Furniture Price Calculator</li>
                                        <li class="list-group-item">✅ HPL 3-Level Pricing</li>
                                        <li class="list-group-item">✅ Excel Export</li>
                                        <li class="list-group-item">✅ Customer Management</li>
                                        <li class="list-group-item">✅ Real-time Calculations</li>
                                    </ul>
                                </div>
                                <div class="col-md-6">
                                    <h5>💰 Pricing:</h5>
                                    <ul class="list-group list-group-flush">
                                        <li class="list-group-item">Tacosheet: Rp 2,3jt/m²</li>
                                        <li class="list-group-item">HPL Low: Rp 2,3jt/m²</li>
                                        <li class="list-group-item">HPL Mid: Rp 2,8jt/m²</li>
                                        <li class="list-group-item">HPL High: Rp 3,2jt/m²</li>
                                        <li class="list-group-item">Duco: Rp 5,5jt/m²</li>
                                    </ul>
                                </div>
                            </div>
                            
                            <div class="mt-4 text-center">
                                <button class="btn btn-success" onclick="testCalculator()">
                                    🧮 Test Calculator
                                </button>
                                <button class="btn btn-primary" onclick="showFullApp()">
                                    🚀 Launch Full App
                                </button>
                            </div>
                            
                            <div id="result" class="mt-3"></div>
                        </div>
                        
                        <div class="card-footer text-center bg-light">
                            <small class="text-muted">
                                <strong>PT. Enigma Prisma Delapan</strong><br>
                                Jl. Raya H. Abdullah No.56, Pakulonan Barat, Tangerang<br>
                                📞 0821 1213 4258 | 🌐 interiormapan.com
                            </small>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <script>
            function testCalculator() {
                document.getElementById('result').innerHTML = `
                    <div class="alert alert-info">
                        <h5>🧮 Calculator Test</h5>
                        <p><strong>Example Calculation:</strong></p>
                        <p>Kitchen Set KB: 3m × 0.85m × 0.6m = 1.53 m³</p>
                        <p>HPL Mid finishing: 1.53 m³ × Rp 2,800,000 = <strong>Rp 4,284,000</strong></p>
                    </div>
                `;
            }
            
            function showFullApp() {
                window.location.href = '/full-app';
            }
        </script>
    </body>
    </html>
    '''

@app.route('/full-app')
def full_app():
    return '''
    <div class="container mt-5">
        <div class="alert alert-warning">
            <h4>🚧 Full Application</h4>
            <p>Full application dengan semua fitur sedang dalam development.</p>
            <p>Saat ini menampilkan versi simplified untuk testing deployment.</p>
            <a href="/" class="btn btn-primary">← Kembali ke Home</a>
        </div>
    </div>
    '''

@app.route('/test')
def test():
    return jsonify({
        'status': 'success',
        'message': 'Vercel deployment working!',
        'calculator': 'Furniture Price Generator',
        'company': 'PT. Enigma Prisma Delapan'
    })

if __name__ == '__main__':
    app.run(debug=False)