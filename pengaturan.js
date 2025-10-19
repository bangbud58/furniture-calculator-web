// Default values
const defaultSettings = {
    hargaKayu: 5000000,
    hargaMDF: 250000,
    hargaPlywood: 300000,
    biayaTenagaKerja: 30,
    biayaOverhead: 15,
    marginKeuntungan: 25,
    hargaCat: 50000,
    hargaMelamine: 75000,
    hargaDuco: 100000
};

// Load settings when page loads
window.addEventListener('DOMContentLoaded', function() {
    muatPengaturan();
});

// Load settings from localStorage
function muatPengaturan() {
    const settings = JSON.parse(localStorage.getItem('furnitureSettings')) || defaultSettings;
    
    document.getElementById('hargaKayu').value = settings.hargaKayu;
    document.getElementById('hargaMDF').value = settings.hargaMDF;
    document.getElementById('hargaPlywood').value = settings.hargaPlywood;
    document.getElementById('biayaTenagaKerja').value = settings.biayaTenagaKerja;
    document.getElementById('biayaOverhead').value = settings.biayaOverhead;
    document.getElementById('marginKeuntungan').value = settings.marginKeuntungan;
    document.getElementById('hargaCat').value = settings.hargaCat;
    document.getElementById('hargaMelamine').value = settings.hargaMelamine;
    document.getElementById('hargaDuco').value = settings.hargaDuco;
}

// Save settings to localStorage
function simpanPengaturan() {
    const settings = {
        hargaKayu: parseFloat(document.getElementById('hargaKayu').value) || defaultSettings.hargaKayu,
        hargaMDF: parseFloat(document.getElementById('hargaMDF').value) || defaultSettings.hargaMDF,
        hargaPlywood: parseFloat(document.getElementById('hargaPlywood').value) || defaultSettings.hargaPlywood,
        biayaTenagaKerja: parseFloat(document.getElementById('biayaTenagaKerja').value) || defaultSettings.biayaTenagaKerja,
        biayaOverhead: parseFloat(document.getElementById('biayaOverhead').value) || defaultSettings.biayaOverhead,
        marginKeuntungan: parseFloat(document.getElementById('marginKeuntungan').value) || defaultSettings.marginKeuntungan,
        hargaCat: parseFloat(document.getElementById('hargaCat').value) || defaultSettings.hargaCat,
        hargaMelamine: parseFloat(document.getElementById('hargaMelamine').value) || defaultSettings.hargaMelamine,
        hargaDuco: parseFloat(document.getElementById('hargaDuco').value) || defaultSettings.hargaDuco
    };
    
    localStorage.setItem('furnitureSettings', JSON.stringify(settings));
    
    alert('Pengaturan berhasil disimpan!');
}

// Reset to default settings
function resetPengaturan() {
    if (confirm('Apakah Anda yakin ingin mereset ke pengaturan default?')) {
        localStorage.setItem('furnitureSettings', JSON.stringify(defaultSettings));
        muatPengaturan();
        alert('Pengaturan berhasil direset ke default!');
    }
}
