// Mobile-optimized functions for the new template

// Global variables
let itemsData = [];
let isMobile = window.innerWidth <= 768;

// Category management
function showCategory() {
    const selectedCategory = document.getElementById('kategoriSelect').value;
    
    // Hide all category forms
    document.querySelectorAll('.category-form').forEach(form => {
        form.style.display = 'none';
    });
    
    // Show selected category form
    const targetForm = document.getElementById(selectedCategory);
    if (targetForm) {
        targetForm.style.display = 'block';
        
        // Mobile: scroll to form
        if (isMobile) {
            setTimeout(() => {
                targetForm.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }, 100);
        }
    }
}

// Kitchen Set items
function addKitchenItem(type) {
    try {
        let item = {};
        
        if (type === 'kb') {
            // Kabinet Bawah - persis seperti desktop!
            const panjang = parseFloat(document.getElementById('kb_panjang').value);
            const tinggi = parseFloat(document.getElementById('kb_tinggi').value);
            const tebal = parseFloat(document.getElementById('kb_tebal').value);
            const finishing = document.getElementById('kb_finishing').value;
            
            if (!panjang || !tinggi || !tebal) {
                showMobileToast('Mohon isi semua field Kabinet Bawah', true);
                return;
            }
            
            // Perhitungan desktop: min 100cm, area calculation, multiplier untuk tebal > 60
            const panjang_min = Math.max(panjang, 100);
            const tinggi_min = Math.max(tinggi, 100);
            const area = (panjang_min / 100) * (tinggi_min / 100);
            const basePrice = getFinishingPrice(finishing);
            const multiplier = tebal > 60 ? 1.2 : 1.0;
            const total = area * basePrice * multiplier;
            
            item = {
                nama_item: 'Kitchen Set - Kabinet Bawah',
                finishing: finishing,
                dimensi: `${panjang_min}x${tinggi_min}x${tebal}cm`,
                area: area,
                harga_satuan: basePrice * multiplier,
                jumlah: total
            };
            
            // Clear inputs
            document.getElementById('kb_panjang').value = '';
            document.getElementById('kb_tinggi').value = '';
            document.getElementById('kb_tebal').value = '';
            
        } else if (type === 'ka') {
            // Kabinet Atas - persis seperti desktop!
            const panjang = parseFloat(document.getElementById('ka_panjang').value);
            const tinggi = parseFloat(document.getElementById('ka_tinggi').value);
            const tebal = parseFloat(document.getElementById('ka_tebal').value);
            const finishing = document.getElementById('ka_finishing').value;
            
            if (!panjang || !tinggi || !tebal) {
                showMobileToast('Mohon isi semua field Kabinet Atas', true);
                return;
            }
            
            // Perhitungan desktop: min 100cm, area calculation, multiplier untuk tebal > 60
            const panjang_min = Math.max(panjang, 100);
            const tinggi_min = Math.max(tinggi, 100);
            const area = (panjang_min / 100) * (tinggi_min / 100);
            const basePrice = getFinishingPrice(finishing);
            const multiplier = tebal > 60 ? 1.2 : 1.0;
            const total = area * basePrice * multiplier;
            
            item = {
                nama_item: 'Kitchen Set - Kabinet Atas',
                finishing: finishing,
                dimensi: `${panjang_min}x${tinggi_min}x${tebal}cm`,
                area: area,
                harga_satuan: basePrice * multiplier,
                jumlah: total
            };
            
            // Clear inputs
            document.getElementById('ka_panjang').value = '';
            document.getElementById('ka_tinggi').value = '';
            document.getElementById('ka_tebal').value = '';
            
        } else if (type === 'tt') {
            // Top Table - METER LARI (seperti desktop!)
            const panjang = parseFloat(document.getElementById('tt_panjang').value);
            const lebar = parseFloat(document.getElementById('tt_lebar').value);
            const material = document.getElementById('tt_material').value;
            
            if (!panjang || !lebar) {
                showMobileToast('Mohon isi panjang dan lebar Top Table', true);
                return;
            }
            
            // Perhitungan METER LARI seperti desktop: panjang / 100
            const meter_lari = panjang / 100;
            const materialPrices = {
                'Solid Surface': 2000000,
                'Granit Alam': 2500000,
                'Marmer': 3500000
            };
            const basePrice = materialPrices[material] || 2000000;
            const total = meter_lari * basePrice;
            
            item = {
                nama_item: 'Kitchen Set - Top Table',
                finishing: material,
                dimensi: `${panjang}x${lebar}cm`,
                area: meter_lari,
                harga_satuan: basePrice,
                jumlah: total
            };
            
            // Clear inputs
            document.getElementById('tt_panjang').value = '';
            document.getElementById('tt_lebar').value = '';
            
        } else if (type === 'bs') {
            // Backsplash - METER LARI (seperti desktop!)
            const panjang = parseFloat(document.getElementById('bs_panjang').value);
            const tinggi = parseFloat(document.getElementById('bs_tinggi').value);
            const material = document.getElementById('bs_material').value;
            
            if (!panjang || !tinggi) {
                showMobileToast('Mohon isi panjang dan tinggi Backsplash', true);
                return;
            }
            
            // Perhitungan METER LARI seperti desktop: panjang / 100
            const meter_lari = panjang / 100;
            const materialPrices = {
                'Solid Surface': 2000000,
                'Granit Alam': 2500000,
                'Marmer': 3500000,
                'Mirror Clear': 1500000,
                'Bronze Mirror': 2000000,
                'Keramik': 850000
            };
            const basePrice = materialPrices[material] || 850000;
            const total = meter_lari * basePrice;
            
            item = {
                nama_item: 'Kitchen Set - Backsplash',
                finishing: material,
                dimensi: `${panjang}x${tinggi}cm`,
                area: meter_lari,
                harga_satuan: basePrice,
                jumlah: total
            };
            
            // Clear inputs
            document.getElementById('bs_panjang').value = '';
            document.getElementById('bs_tinggi').value = '';
        }
        
        // Add item to list
        itemsData.push(item);
        updateItemsList();
        updateTotal();
        
        showMobileToast(`${item.nama_item} berhasil ditambahkan!`);
        
    } catch (error) {
        console.error('Error adding kitchen item:', error);
        showMobileToast('Terjadi kesalahan saat menambah item', true);
    }
}

// Wardrobe
function addWardrobe() {
    try {
        const panjang = parseFloat(document.getElementById('wr_panjang').value);
        const tinggi = parseFloat(document.getElementById('wr_tinggi').value);
        const tebal = parseFloat(document.getElementById('wr_lebar').value); // di form namanya wr_lebar tapi sebenarnya tebal
        const finishing = document.getElementById('wr_finishing').value;
        
        if (!panjang || !tinggi || !tebal) {
            showMobileToast('Mohon isi semua field Wardrobe', true);
            return;
        }
        
        // Perhitungan sama dengan cabinet - sesuai desktop!
        const panjang_min = Math.max(panjang, 100);
        const tinggi_min = Math.max(tinggi, 100);
        const area = (panjang_min / 100) * (tinggi_min / 100);
        const basePrice = getFinishingPrice(finishing);
        const multiplier = tebal > 60 ? 1.2 : 1.0;
        const total = area * basePrice * multiplier;
        
        const item = {
            nama_item: 'Wardrobe',
            finishing: finishing,
            dimensi: `${panjang_min}x${tinggi_min}x${tebal}cm`,
            area: area,
            harga_satuan: basePrice * multiplier,
            jumlah: total
        };
        
        itemsData.push(item);
        updateItemsList();
        updateTotal();
        
        // Clear inputs
        document.getElementById('wr_panjang').value = '';
        document.getElementById('wr_tinggi').value = '';
        document.getElementById('wr_lebar').value = '';
        
        showMobileToast('Wardrobe berhasil ditambahkan!');
        
    } catch (error) {
        console.error('Error adding wardrobe:', error);
        showMobileToast('Terjadi kesalahan saat menambah wardrobe', true);
    }
}

// Bed - sesuai desktop version
function addBed() {
    try {
        const panjang = parseFloat(document.getElementById('bed_panjang').value);
        const lebar = parseFloat(document.getElementById('bed_lebar').value);
        const tinggi = parseFloat(document.getElementById('bed_tinggi').value);
        const finishing = document.getElementById('bed_finishing').value;
        
        if (!panjang || !lebar || !tinggi) {
            showMobileToast('Mohon isi semua field Bed', true);
            return;
        }
        // Sesuai desktop: Bed Frame menggunakan luas alas (panjang x lebar)
        const area = (panjang / 100) * (lebar / 100);
        const basePrices = {
            'HPL': 3000000, // Old HPL price for bed (desktop version)
            'Duco': 5500000
        };
        const basePrice = basePrices[finishing] || 3000000;
        const total = area * basePrice;
        
        const item = {
            nama_item: 'Bed Frame',
            finishing: finishing,
            dimensi: `${panjang}x${lebar}x${tinggi}cm`,
            area: area,
            harga_satuan: basePrice,
            jumlah: total
        };
        
        itemsData.push(item);
        updateItemsList();
        updateTotal();
        
        // Clear inputs
        document.getElementById('bed_panjang').value = '';
        document.getElementById('bed_lebar').value = '';
        document.getElementById('bed_tinggi').value = '';
        
        showMobileToast('Bed Frame berhasil ditambahkan!');
        
    } catch (error) {
        console.error('Error adding bed:', error);
        showMobileToast('Terjadi kesalahan saat menambah bed', true);
    }
}

// Backdrop Panel
function addBackdrop() {
    try {
        const panjang = parseFloat(document.getElementById('bd_panjang').value);
        const tinggi = parseFloat(document.getElementById('bd_tinggi').value);
        const type = document.getElementById('bd_type').value;
        const finishing = document.getElementById('bd_finishing').value;
        
        if (!panjang || !tinggi) {
            showMobileToast('Mohon isi panjang dan tinggi Backdrop', true);
            return;
        }
        
        const area = (panjang / 100) * (tinggi / 100);
        let unitPrice = 0;
        let usedFinishing = finishing;
        // Desktop logic: specific price tables
        if (type === 'PVC') {
            unitPrice = 850000; // fixed PVC price per m²
            usedFinishing = 'PVC';
        } else if (type === 'Flat') {
            const prices = { 'HPL': 1800000, 'Duco': 2500000, 'Kombinasi': 2100000 };
            unitPrice = prices[finishing] || 1800000;
        } else { // Tebal
            const prices = { 'HPL': 2500000, 'Duco': 3600000, 'Kombinasi': 3200000 };
            unitPrice = prices[finishing] || 2500000;
        }
        const total = area * unitPrice;
        
        const item = {
            nama_item: `Backdrop Panel (${type})`,
            finishing: usedFinishing,
            dimensi: `${panjang}x${tinggi}cm`,
            area: area,
            harga_satuan: unitPrice,
            jumlah: total
        };
        
        itemsData.push(item);
        updateItemsList();
        updateTotal();
        
        // Clear inputs
        document.getElementById('bd_panjang').value = '';
        document.getElementById('bd_tinggi').value = '';
        
        showMobileToast('Backdrop Panel berhasil ditambahkan!');
        
    } catch (error) {
        console.error('Error adding backdrop:', error);
        showMobileToast('Terjadi kesalahan saat menambah backdrop', true);
    }
}

// Credenza
function addCredenza() {
    try {
        const panjang = parseFloat(document.getElementById('cr_panjang').value);
        const tinggi = parseFloat(document.getElementById('cr_tinggi').value);
        const lebar = parseFloat(document.getElementById('cr_lebar').value);
        const finishing = document.getElementById('cr_finishing').value;
        
        if (!panjang || !tinggi || !lebar) {
            showMobileToast('Mohon isi semua field Credenza', true);
            return;
        }
        
    const panjang_min = Math.max(panjang, 100);
    const tinggi_min = Math.max(tinggi, 100);
    const area = (panjang_min / 100) * (tinggi_min / 100);
    const basePrice = getFinishingPrice(finishing);
    const multiplier = lebar > 60 ? 1.2 : 1.0;
    const baseTotal = area * basePrice * multiplier;
    // Desktop: Credenza 25% cheaper
    const total = baseTotal * 0.75;
        
        const item = {
            nama_item: 'Credenza',
            finishing: finishing,
            dimensi: `${panjang_min}x${tinggi_min}x${lebar}cm`,
            area: area,
            harga_satuan: (basePrice * multiplier) * 0.75,
            jumlah: total
        };
        
        itemsData.push(item);
        updateItemsList();
        updateTotal();
        
        // Clear inputs
        document.getElementById('cr_panjang').value = '';
        document.getElementById('cr_tinggi').value = '';
        document.getElementById('cr_lebar').value = '';
        
        showMobileToast('Credenza berhasil ditambahkan!');
        
    } catch (error) {
        console.error('Error adding credenza:', error);
        showMobileToast('Terjadi kesalahan saat menambah credenza', true);
    }
}

// Multi Cabinet
function addMultiCabinet() {
    try {
        const panjang = parseFloat(document.getElementById('mc_panjang').value);
        const tinggi = parseFloat(document.getElementById('mc_tinggi').value);
        const lebar = parseFloat(document.getElementById('mc_lebar').value);
        const finishing = document.getElementById('mc_finishing').value;
        
        if (!panjang || !tinggi || !lebar) {
            showMobileToast('Mohon isi semua field Multi Cabinet', true);
            return;
        }
        
    const panjang_min = Math.max(panjang, 100);
    const tinggi_min = Math.max(tinggi, 100);
    const area = (panjang_min / 100) * (tinggi_min / 100);
    const basePrice = getFinishingPrice(finishing);
    const multiplier = lebar > 60 ? 1.2 : 1.0;
    const baseTotal = area * basePrice * multiplier;
    // Desktop: Multi Cabinet 15% cheaper
    const total = baseTotal * 0.85;
        
        const item = {
            nama_item: 'Multi Cabinet',
            finishing: finishing,
            dimensi: `${panjang_min}x${tinggi_min}x${lebar}cm`,
            area: area,
            harga_satuan: (basePrice * multiplier) * 0.85,
            jumlah: total
        };
        
        itemsData.push(item);
        updateItemsList();
        updateTotal();
        
        // Clear inputs
        document.getElementById('mc_panjang').value = '';
        document.getElementById('mc_tinggi').value = '';
        document.getElementById('mc_lebar').value = '';
        
        showMobileToast('Multi Cabinet berhasil ditambahkan!');
        
    } catch (error) {
        console.error('Error adding multi cabinet:', error);
        showMobileToast('Terjadi kesalahan saat menambah multi cabinet', true);
    }
}

// Custom Furniture
function addCustom() {
    try {
        const nama = document.getElementById('cf_nama').value.trim();
        const value1 = parseFloat(document.getElementById('cf_value1').value);
        const value2 = parseFloat(document.getElementById('cf_value2').value);
        const value3 = parseFloat(document.getElementById('cf_value3').value) || 0;
        const method = document.getElementById('cf_method').value;
        const finishing = document.getElementById('cf_finishing').value;
        
        if (!nama || !value1 || !value2) {
            showMobileToast('Mohon isi nama furniture dan dimensi', true);
            return;
        }
        
    let area = 0;
    let dimensi = '';
        
        switch (method) {
            case 'Meter Lari':
                area = value1 / 100; // Panjang dalam meter
                dimensi = `${value1}`;
                break;
            case 'Meter Persegi':
                // Desktop enforces min 100 for p & l on area-based methods
                const pMin = Math.max(value1, 100);
                const lMin = Math.max(value2, 100);
                area = (pMin / 100) * (lMin / 100);
                dimensi = `${pMin} x ${lMin}`;
                break;
            case 'Side Area X':
                area = (value1 / 100) * (value2 / 100); // Lebar x Tinggi
                dimensi = `${value1} x ${value2} x ${value3 || 0}`;
                break;
            case 'Side Area Y':
                area = (value1 / 100) * (value2 / 100); // Panjang x Tinggi
                dimensi = `${value1} x ${value2} x ${value3 || 0}`;
                break;
            case 'Side Area Z':
                area = (value1 / 100) * (value2 / 100); // Panjang x Lebar
                dimensi = `${value1} x ${value2} x ${value3 || 0}`;
                break;
        }
        
        if (value3 > 0) {
            dimensi += `x${value3}cm`;
        }
        
        const basePrice = getFinishingPrice(finishing);
        const total = area * basePrice;
        
        const item = {
            nama_item: nama,
            finishing: finishing,
            dimensi: `${dimensi}`,
            area: area,
            harga_satuan: basePrice,
            jumlah: total
        };
        
        itemsData.push(item);
        updateItemsList();
        updateTotal();
        
        // Clear inputs
        document.getElementById('cf_nama').value = '';
        document.getElementById('cf_value1').value = '';
        document.getElementById('cf_value2').value = '';
        document.getElementById('cf_value3').value = '';
        
        showMobileToast(`${nama} berhasil ditambahkan!`);
        
    } catch (error) {
        console.error('Error adding custom furniture:', error);
        showMobileToast('Terjadi kesalahan saat menambah custom furniture', true);
    }
}

// Pricing functions
function getFinishingPrice(finishing) {
    const prices = {
        'Tacosheet': 2300000,
        'HPL Low': 2300000,
        'HPL Mid': 2800000,
        'HPL High': 3200000,
        'Duco': 5500000,
        'Kombinasi': 4700000
    };
    return prices[finishing] || 2300000;
}

// Update items list
function updateItemsList() {
    const container = document.getElementById('itemsList');
    
    if (itemsData.length === 0) {
        container.innerHTML = '<p class="text-muted text-center">Belum ada item yang ditambahkan</p>';
        return;
    }
    
    let html = '';
    itemsData.forEach((item, index) => {
        html += `
            <div class="item-card mb-2" data-index="${index}" style="background: #f8f9fa; border: 1px solid #dee2e6; border-radius: 8px; padding: 12px;">
                <div class="d-flex justify-content-between align-items-start">
                    <div class="flex-grow-1">
                        <strong class="text-primary">${item.nama_item}</strong><br>
                        <small class="text-muted">${item.finishing || item.material || ''} | ${item.dimensi}</small><br>
                        <small class="text-success">Area/Volume: ${(item.area || item.volume || 0).toFixed(2)} m² | @Rp${(item.harga_satuan || 0).toLocaleString()}</small>
                    </div>
                    <div class="text-end">
                        <strong class="text-success">Rp${(item.jumlah || 0).toLocaleString()}</strong><br>
                        <button class="btn btn-outline-danger btn-sm mt-1" onclick="removeItem(${index})">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;
    });
    
    container.innerHTML = html;
}

// Remove item
function removeItem(index) {
    if (confirm('Hapus item ini?')) {
        itemsData.splice(index, 1);
        updateItemsList();
        updateTotal();
        showMobileToast('Item berhasil dihapus');
    }
}

// Clear all items
function clearAllItems() {
    if (confirm('Hapus semua item?')) {
        itemsData = [];
        updateItemsList();
        updateTotal();
        showMobileToast('Semua item berhasil dihapus');
    }
}

// Update total - tanpa PPN dan discount
function updateTotal() {
    const grandTotal = itemsData.reduce((sum, item) => sum + (item.jumlah || 0), 0);
    
    // Update display - hanya grand total
    document.getElementById('grandTotal').textContent = `Rp ${grandTotal.toLocaleString()}`;
    const itemsEl = document.getElementById('totalItems');
    if (itemsEl) itemsEl.textContent = `${itemsData.length}`;
}

// Theme toggle
function toggleTheme() {
    document.body.classList.toggle('dark-theme');
    const isDark = document.body.classList.contains('dark-theme');
    
    const icon = document.querySelector('button[onclick="toggleTheme()"] i');
    icon.className = isDark ? 'fas fa-sun' : 'fas fa-moon';
    
    localStorage.setItem('darkTheme', isDark);
}

// Export Excel dan Kirim WhatsApp
function exportExcel() {
    if (itemsData.length === 0) {
        showMobileToast('Tidak ada data untuk diekspor', true);
        return;
    }
    
    // Validasi informasi customer lengkap untuk WhatsApp
    const customerName = document.getElementById('customerName').value.trim();
    const customerPhone = document.getElementById('customerPhone').value.trim();
    const customerAddress = document.getElementById('customerAddress').value.trim();
    
    // Cek apakah semua field customer sudah diisi
    if (!customerName || !customerPhone || !customerAddress) {
        showMobileToast('❌ Informasi customer harus lengkap untuk export WhatsApp!', true);
        
        // Highlight field yang kosong
        highlightEmptyFields();
        
        // Scroll ke customer info section
        document.querySelector('.card:has(#customerName)').scrollIntoView({
            behavior: 'smooth',
            block: 'center'
        });
        
        return;
    }
    
    // Validasi format nomor telepon
    if (!isValidPhoneNumber(customerPhone)) {
        showMobileToast('❌ Format nomor telepon tidak valid! Gunakan format: 08xx-xxxx-xxxx', true);
        document.getElementById('customerPhone').focus();
        return;
    }
    
    // Hitung total sederhana (tanpa PPN & discount)
    const subtotal = itemsData.reduce((sum, item) => sum + (item.jumlah || 0), 0);
    const grandTotal = subtotal;
    
    const exportData = {
        items: itemsData,
        customer: {
            name: customerName,
            phone: customerPhone,
            address: customerAddress
        },
        pricing: {},
        totals: {
            subtotal: subtotal,
            grand_total: grandTotal
        }
    };
    
    // Show loading
    showMobileToast('Sedang membuat Excel dan mengirim WhatsApp...', false);
    
    // Send to server untuk Excel generation dan WhatsApp
    fetch('/export_excel_whatsapp', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(exportData)
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            // Download Excel file
            const link = document.createElement('a');
            link.href = data.file_url;
            link.download = data.filename;
            link.click();
            
            showMobileToast('✅ Excel berhasil dibuat dan dikirim ke WhatsApp!');
            
            // Open WhatsApp chat automatically (user interaction required by WhatsApp)
            if (data.whatsapp_url) {
                window.open(data.whatsapp_url, '_blank');
            }
            
            // Show WhatsApp status
            setTimeout(() => {
                showMobileToast(`📱 WhatsApp terkirim ke ${data.whatsapp_number}`, false);
            }, 1500);
            
        } else {
            throw new Error(data.error || 'Export failed');
        }
    })
    .catch(error => {
        console.error('Export error:', error);
        showMobileToast('❌ Gagal mengekspor atau mengirim WhatsApp', true);
    });
}

// Tambahan: Export Excel biasa (tanpa WhatsApp)
function exportExcelOnly() {
    if (itemsData.length === 0) {
        showMobileToast('Tidak ada data untuk diekspor', true);
        return;
    }
    
    const customerName = document.getElementById('customerName').value || 'Customer';
    const customerPhone = document.getElementById('customerPhone').value || '';
    const customerAddress = document.getElementById('customerAddress').value || '';
    
    const exportData = {
        items: itemsData,
        customer: {
            name: customerName,
            phone: customerPhone,
            address: customerAddress
        },
        pricing: {},
    };
    
    // Send to server for Excel generation only
    fetch('/export_excel', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(exportData)
    })
    .then(response => {
        if (response.ok) {
            return response.blob();
        }
        throw new Error('Export failed');
    })
    .then(blob => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = `Quotation_${customerName}_${new Date().toISOString().split('T')[0]}.xlsx`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        
        showMobileToast('Excel berhasil diunduh!');
    })
    .catch(error => {
        console.error('Export error:', error);
        showMobileToast('Gagal mengekspor Excel', true);
    });
}

// Customer validation functions
function highlightEmptyFields() {
    const customerName = document.getElementById('customerName');
    const customerPhone = document.getElementById('customerPhone');
    const customerAddress = document.getElementById('customerAddress');
    
    // Reset previous highlights
    [customerName, customerPhone, customerAddress].forEach(field => {
        field.classList.remove('is-invalid', 'border-danger');
    });
    
    // Highlight empty fields
    if (!customerName.value.trim()) {
        customerName.classList.add('is-invalid', 'border-danger');
        customerName.placeholder = 'WAJIB DIISI - Nama Customer';
    }
    
    if (!customerPhone.value.trim()) {
        customerPhone.classList.add('is-invalid', 'border-danger');
        customerPhone.placeholder = 'WAJIB DIISI - 08xx-xxxx-xxxx';
    }
    
    if (!customerAddress.value.trim()) {
        customerAddress.classList.add('is-invalid', 'border-danger');
        customerAddress.placeholder = 'WAJIB DIISI - Alamat Customer';
    }
}

function clearFieldHighlights() {
    const customerFields = ['customerName', 'customerPhone', 'customerAddress'];
    customerFields.forEach(fieldId => {
        const field = document.getElementById(fieldId);
        field.classList.remove('is-invalid', 'border-danger');
        
        // Restore original placeholders
        if (fieldId === 'customerName') field.placeholder = 'Nama Lengkap';
        if (fieldId === 'customerPhone') field.placeholder = '08xx-xxxx-xxxx';
        if (fieldId === 'customerAddress') field.placeholder = 'Alamat Customer';
    });
}

function isValidPhoneNumber(phone) {
    // Hapus semua karakter non-digit
    const cleanPhone = phone.replace(/\D/g, '');
    
    // Validasi format Indonesia
    // Harus dimulai dengan 08 atau +62 atau 62, dan minimal 10 digit
    const indonesianPhoneRegex = /^(08|628|\+628)[0-9]{8,12}$/;
    
    return indonesianPhoneRegex.test(cleanPhone) || 
           (cleanPhone.startsWith('08') && cleanPhone.length >= 10 && cleanPhone.length <= 13);
}

function validateCustomerInfo() {
    const customerName = document.getElementById('customerName').value.trim();
    const customerPhone = document.getElementById('customerPhone').value.trim();
    const customerAddress = document.getElementById('customerAddress').value.trim();
    
    return {
        isValid: customerName && customerPhone && customerAddress && isValidPhoneNumber(customerPhone),
        customerName,
        customerPhone,
        customerAddress,
        errors: {
            name: !customerName,
            phone: !customerPhone || !isValidPhoneNumber(customerPhone),
            address: !customerAddress
        }
    };
}

function updateWhatsAppButtonStatus() {
    const validation = validateCustomerInfo();
    const btn = document.getElementById('exportWhatsAppBtn');
    const icon = document.getElementById('waValidationIcon');
    
    if (!btn || !icon) return;
    
    if (validation.isValid) {
        // Customer info lengkap - enable WhatsApp export
        btn.classList.remove('btn-outline-success');
        btn.classList.add('btn-success');
        btn.disabled = false;
        icon.textContent = '✅';
        btn.title = 'Export Excel + Kirim WhatsApp (Info customer lengkap)';
    } else {
        // Customer info tidak lengkap - warning state
        btn.classList.remove('btn-success');
        btn.classList.add('btn-outline-success');
        btn.disabled = false; // Keep enabled untuk show validation message
        icon.textContent = '⚠️';
        
        const missingFields = [];
        if (validation.errors.name) missingFields.push('Nama');
        if (validation.errors.phone) missingFields.push('Telepon');
        if (validation.errors.address) missingFields.push('Alamat');
        
        btn.title = `Export Excel + WhatsApp (Lengkapi: ${missingFields.join(', ')})`;
    }
}

// Initialize app
document.addEventListener('DOMContentLoaded', function() {
    // Load theme preference
    if (localStorage.getItem('darkTheme') === 'true') {
        document.body.classList.add('dark-theme');
        document.querySelector('button[onclick="toggleTheme()"] i').className = 'fas fa-sun';
    }
    
    // Show first category
    showCategory();
    
    // Setup mobile optimizations
    setupMobileOptimizations();
    
    // Initialize WhatsApp button status
    updateWhatsAppButtonStatus();
    
    // Auto-update total when discount/tax changes
    // Removed discount/tax controls; totals are simplified
    
    // Clear validation highlights when user starts typing
    ['customerName', 'customerPhone', 'customerAddress'].forEach(fieldId => {
        const field = document.getElementById(fieldId);
        field.addEventListener('input', function() {
            if (this.value.trim()) {
                this.classList.remove('is-invalid', 'border-danger');
                
                // Restore original placeholder
                if (fieldId === 'customerName') this.placeholder = 'Nama Lengkap';
                if (fieldId === 'customerPhone') this.placeholder = '08xx-xxxx-xxxx';
                if (fieldId === 'customerAddress') this.placeholder = 'Alamat Customer';
            }
            
            // Update WhatsApp button status real-time
            updateWhatsAppButtonStatus();
        });
        
        // Phone number formatting
        if (fieldId === 'customerPhone') {
            field.addEventListener('input', function() {
                // Auto-format phone number (add dashes)
                let value = this.value.replace(/\D/g, ''); // Remove non-digits
                if (value.startsWith('08')) {
                    // Format: 08xx-xxxx-xxxx
                    if (value.length > 4 && value.length <= 8) {
                        value = value.slice(0, 4) + '-' + value.slice(4);
                    } else if (value.length > 8) {
                        value = value.slice(0, 4) + '-' + value.slice(4, 8) + '-' + value.slice(8, 12);
                    }
                }
                this.value = value;
            });
        }
    });
    
    console.log('Furniture Price Calculator - Mobile Ready!');
});

// Update backdrop finishing options based on type
function updateBackdropFinishing() {
    const type = document.getElementById('bd_type').value;
    const finishingSelect = document.getElementById('bd_finishing');
    
    if (type === 'PVC') {
        finishingSelect.disabled = true;
        finishingSelect.value = 'HPL';
    } else {
        finishingSelect.disabled = false;
    }
}

// Update method info for custom furniture
function updateMethodInfo() {
    const method = document.getElementById('cf_method').value;
    const methodInfo = document.getElementById('methodInfo');
    
    let infoText = '';
    switch(method) {
        case 'Meter Lari':
            infoText = '<strong>Meter Lari:</strong> Value1 ÷ 100. Contoh: 300cm = 3.0 meter';
            break;
        case 'Meter Persegi':
            infoText = '<strong>Meter Persegi:</strong> (Value1 ÷ 100) × (Value2 ÷ 100). Contoh: 300×200cm = 6.0 m²';
            break;
        case 'Side Area X':
            infoText = '<strong>Side Area X:</strong> (Value2 ÷ 100) × (Value3 ÷ 100). Sisi samping furniture';
            break;
        case 'Side Area Y':
            infoText = '<strong>Side Area Y:</strong> (Value1 ÷ 100) × (Value3 ÷ 100). Sisi depan/belakang';
            break;
        case 'Side Area Z':
            infoText = '<strong>Side Area Z:</strong> (Value1 ÷ 100) × (Value2 ÷ 100). Sisi atas/bawah';
            break;
    }
    
    methodInfo.innerHTML = `<small>${infoText}</small>`;
}

// Toast notification function
function showMobileToast(message, isError = false) {
    // Simple alert for now - can be enhanced with proper toast later
    if (isError) {
        alert('Error: ' + message);
    } else {
        alert(message);
    }
}
