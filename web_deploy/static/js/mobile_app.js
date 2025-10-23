// Prevent error if called but not defined
function setupMobileOptimizations() {}

// Global variables
let itemsData = [];
let isMobile = window.innerWidth <= 768;

// Helper functions
function byId(id) {
    const el = document.getElementById(id);
    if (!el) {
        console.error(`Element not found: #${id}`);
        throw new Error(`Element not found: #${id}`);
    }
    return el;
}

function toNumber(value) {
    const n = typeof value === 'number' ? value : parseFloat(String(value).replace(/,/g, '.'));
    return Number.isFinite(n) ? n : NaN;
}

function getNum(id) {
    return toNumber(byId(id).value);
}

function isValidNumber(...nums) {
    return nums.every((n) => Number.isFinite(n));
}

// Category management
function showCategory() {
    const selectedCategory = byId('kategoriSelect').value;
    document.querySelectorAll('.category-form').forEach((form) => {
        form.style.display = 'none';
    });
    const targetForm = document.getElementById(selectedCategory);
    if (targetForm) {
        targetForm.style.display = 'block';
        if (isMobile) {
            setTimeout(() => {
                targetForm.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 100);
        }
    }
}

// Kitchen Set items
function addKitchenItem(type) {
    try {
        let item = {};

        if (type === 'kb') {
            const panjang = getNum('kb_panjang');
            const tinggi = getNum('kb_tinggi');
            const tebal = getNum('kb_tebal');
            const finishing = byId('kb_finishing').value;
            if (!isValidNumber(panjang, tinggi, tebal)) {
                showMobileToast('Mohon isi angka yang valid untuk Kabinet Bawah', true);
                return;
            }
            const panjang_min = Math.max(panjang, 100);
            const tinggi_min = Math.max(tinggi, 100);
            const area = (panjang_min / 100) * (tinggi_min / 100);
            const basePrice = getFinishingPrice(finishing);
            const multiplier = tebal > 60 ? 1.2 : 1.0;
            const total = area * basePrice * multiplier;
            item = {
                nama_item: 'Kitchen Set - Kabinet Bawah',
                finishing,
                dimensi: `${panjang_min}x${tinggi_min}x${tebal}cm`,
                area,
                harga_satuan: basePrice * multiplier,
                jumlah: total,
            };
            byId('kb_panjang').value = '';
            byId('kb_tinggi').value = '';
            byId('kb_tebal').value = '';
        } else if (type === 'ka') {
            const panjang = getNum('ka_panjang');
            const tinggi = getNum('ka_tinggi');
            const tebal = getNum('ka_tebal');
            const finishing = byId('ka_finishing').value;
            if (!isValidNumber(panjang, tinggi, tebal)) {
                showMobileToast('Mohon isi angka yang valid untuk Kabinet Atas', true);
                return;
            }
            const panjang_min = Math.max(panjang, 100);
            const tinggi_min = Math.max(tinggi, 100);
            const area = (panjang_min / 100) * (tinggi_min / 100);
            const basePrice = getFinishingPrice(finishing);
            const multiplier = tebal > 60 ? 1.2 : 1.0;
            const total = area * basePrice * multiplier;
            item = {
                nama_item: 'Kitchen Set - Kabinet Atas',
                finishing,
                dimensi: `${panjang_min}x${tinggi_min}x${tebal}cm`,
                area,
                harga_satuan: basePrice * multiplier,
                jumlah: total,
            };
            byId('ka_panjang').value = '';
            byId('ka_tinggi').value = '';
            byId('ka_tebal').value = '';
        } else if (type === 'tt') {
            const panjang = getNum('tt_panjang');
            const lebar = getNum('tt_lebar');
            const material = byId('tt_material').value;
            if (!isValidNumber(panjang, lebar)) {
                showMobileToast('Mohon isi panjang dan lebar Top Table yang valid', true);
                return;
            }
            const meter_lari = panjang / 100;
            const materialPrices = {
                'Solid Surface': 2000000,
                'Granit Alam': 2500000,
                Marmer: 3500000,
            };
            const basePrice = materialPrices[material] || 2000000;
            const total = meter_lari * basePrice;
            item = {
                nama_item: 'Kitchen Set - Top Table',
                finishing: material,
                dimensi: `${panjang}x${lebar}cm`,
                area: meter_lari,
                harga_satuan: basePrice,
                jumlah: total,
            };
            byId('tt_panjang').value = '';
            byId('tt_lebar').value = '';
        } else if (type === 'bs') {
            const panjang = getNum('bs_panjang');
            const tinggi = getNum('bs_tinggi');
            const material = byId('bs_material').value;
            if (!isValidNumber(panjang, tinggi)) {
                showMobileToast('Mohon isi panjang dan tinggi Backsplash yang valid', true);
                return;
            }
            const meter_lari = panjang / 100;
            const materialPrices = {
                'Solid Surface': 2000000,
                'Granit Alam': 2500000,
                Marmer: 3500000,
                'Mirror Clear': 1500000,
                'Bronze Mirror': 2000000,
                Keramik: 850000,
            };
            const basePrice = materialPrices[material] || 850000;
            const total = meter_lari * basePrice;
            item = {
                nama_item: 'Kitchen Set - Backsplash',
                finishing: material,
                dimensi: `${panjang}x${tinggi}cm`,
                area: meter_lari,
                harga_satuan: basePrice,
                jumlah: total,
            };
            byId('bs_panjang').value = '';
            byId('bs_tinggi').value = '';
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
        const panjang = getNum('wr_panjang');
        const tinggi = getNum('wr_tinggi');
        const tebal = getNum('wr_lebar');
        const finishing = byId('wr_finishing').value;
        if (!isValidNumber(panjang, tinggi, tebal)) {
            showMobileToast('Mohon isi semua field Wardrobe dengan angka yang valid', true);
            return;
        }
        const panjang_min = Math.max(panjang, 100);
        const tinggi_min = Math.max(tinggi, 100);
        const area = (panjang_min / 100) * (tinggi_min / 100);
        const basePrice = getFinishingPrice(finishing);
        const multiplier = tebal > 60 ? 1.2 : 1.0;
        const total = area * basePrice * multiplier;
        const item = {
            nama_item: 'Wardrobe',
            finishing,
            dimensi: `${panjang_min}x${tinggi_min}x${tebal}cm`,
            area,
            harga_satuan: basePrice * multiplier,
            jumlah: total,
        };
        itemsData.push(item);
        updateItemsList();
        updateTotal();
        byId('wr_panjang').value = '';
        byId('wr_tinggi').value = '';
        byId('wr_lebar').value = '';
        showMobileToast('Wardrobe berhasil ditambahkan!');
    } catch (error) {
        console.error('Error adding wardrobe:', error);
        showMobileToast('Terjadi kesalahan saat menambah wardrobe', true);
    }
}

// Bed - sesuai desktop version
// Toggle custom input for bed
function toggleBedCustomInput() {
    const bedSize = byId('bed_size').value;
    const customInputs = document.getElementById('bed_custom_inputs');
    if (bedSize === 'custom') {
        customInputs.style.display = 'flex';
    } else {
        customInputs.style.display = 'none';
    }
}

function addBed() {
    try {
        const bedSizePreset = byId('bed_size').value;
        const tinggi = getNum('bed_tinggi');
        const finishing = byId('bed_finishing').value;
        
        if (!isValidNumber(tinggi)) {
            showMobileToast('Mohon isi tinggi bed yang valid', true);
            return;
        }
        
        // Define bed sizes (panjang x lebar)
        const bedSizes = {
            custom: null,
            super: { panjang: 210, lebar: 210, label: 'Super Size' },
            no1: { panjang: 190, lebar: 210, label: 'No. 1' },
            no2: { panjang: 170, lebar: 210, label: 'No. 2' },
            no3: { panjang: 130, lebar: 210, label: 'No. 3' },
            no4: { panjang: 100, lebar: 210, label: 'No. 4' }
        };
        
        // Define backhead sizes (tinggi_backhead x lebar_backhead)
        const backheadSizes = {
            custom: null,
            super: { tinggi: 120, lebar: 200 },
            no1: { tinggi: 120, lebar: 190 },
            no2: { tinggi: 120, lebar: 170 },
            no3: { tinggi: 120, lebar: 130 },
            no4: { tinggi: 120, lebar: 100 }
        };
        
        let panjang, lebar, bedLabel;
        
        if (bedSizePreset === 'custom') {
            panjang = getNum('bed_panjang_custom');
            lebar = getNum('bed_lebar_custom');
            if (!isValidNumber(panjang, lebar)) {
                showMobileToast('Mohon isi panjang dan lebar custom bed yang valid', true);
                return;
            }
            bedLabel = 'Custom';
        } else {
            panjang = bedSizes[bedSizePreset].panjang;
            lebar = bedSizes[bedSizePreset].lebar;
            bedLabel = bedSizes[bedSizePreset].label;
        }
        
        // Calculate bed frame
        const area = (panjang / 100) * (lebar / 100);
        const basePrice = getFinishingPrice(finishing);
        const total = area * basePrice;
        
        const bedItem = {
            nama_item: `Bed Frame - ${bedLabel}`,
            finishing,
            dimensi: `${panjang}x${lebar}x${tinggi}cm`,
            area,
            harga_satuan: basePrice,
            jumlah: total,
        };
        itemsData.push(bedItem);
        
        // Auto-add backhead
        let backheadTinggi, backheadLebar;
        if (bedSizePreset === 'custom') {
            backheadTinggi = 120;
            backheadLebar = lebar;
        } else {
            backheadTinggi = backheadSizes[bedSizePreset].tinggi;
            backheadLebar = backheadSizes[bedSizePreset].lebar;
        }
        
        const backheadArea = (backheadTinggi / 100) * (backheadLebar / 100);
        const backheadTotal = backheadArea * basePrice;
        
        const backheadItem = {
            nama_item: `Backhead - ${bedLabel}`,
            finishing,
            dimensi: `${backheadTinggi}x${backheadLebar}cm`,
            area: backheadArea,
            harga_satuan: basePrice,
            jumlah: backheadTotal,
        };
        itemsData.push(backheadItem);
        
        updateItemsList();
        updateTotal();
        
        // Clear inputs
        byId('bed_size').value = 'custom';
        byId('bed_tinggi').value = '120';
        if (bedSizePreset === 'custom') {
            byId('bed_panjang_custom').value = '';
            byId('bed_lebar_custom').value = '';
        }
        toggleBedCustomInput();
        
        showMobileToast(`Bed Frame ${bedLabel} + Backhead berhasil ditambahkan!`);
    } catch (error) {
        console.error('Error adding bed:', error);
        showMobileToast('Terjadi kesalahan saat menambah bed: ' + (error.message || error), true);
    }
}

// Backdrop Panel
function addBackdrop() {
    try {
        const panjang = getNum('bd_panjang');
        const tinggi = getNum('bd_tinggi');
        const type = byId('bd_type').value;
        const finishing = byId('bd_finishing').value;
        if (!isValidNumber(panjang, tinggi)) {
            showMobileToast('Mohon isi panjang dan tinggi Backdrop yang valid', true);
            return;
        }
        const area = (panjang / 100) * (tinggi / 100);
        let unitPrice = 0;
        let usedFinishing = finishing;
        if (type === 'PVC') {
            unitPrice = 850000;
            usedFinishing = 'PVC';
        } else if (type === 'Flat') {
            const prices = { HPL: 1800000, Duco: 2500000, Kombinasi: 2100000 };
            unitPrice = prices[finishing] || 1800000;
        } else {
            const prices = { HPL: 2500000, Duco: 3600000, Kombinasi: 3200000 };
            unitPrice = prices[finishing] || 2500000;
        }
        const total = area * unitPrice;
        const item = {
            nama_item: `Backdrop Panel (${type})`,
            finishing: usedFinishing,
            dimensi: `${panjang}x${tinggi}cm`,
            area,
            harga_satuan: unitPrice,
            jumlah: total,
        };
        itemsData.push(item);
        updateItemsList();
        updateTotal();
        byId('bd_panjang').value = '';
        byId('bd_tinggi').value = '';
        showMobileToast('Backdrop Panel berhasil ditambahkan!');
    } catch (error) {
        console.error('Error adding backdrop:', error);
        showMobileToast('Terjadi kesalahan saat menambah backdrop', true);
    }
}

// Credenza
function addCredenza() {
    try {
        const panjang = getNum('cr_panjang');
        const tinggi = getNum('cr_tinggi');
        const lebar = getNum('cr_lebar');
        const finishing = byId('cr_finishing').value;
        if (!isValidNumber(panjang, tinggi, lebar)) {
            showMobileToast('Mohon isi semua field Credenza dengan angka yang valid', true);
            return;
        }
        const panjang_min = Math.max(panjang, 100);
        const tinggi_min = Math.max(tinggi, 100);
        const area = (panjang_min / 100) * (tinggi_min / 100);
        const basePrice = getFinishingPrice(finishing);
        const multiplier = lebar > 60 ? 1.2 : 1.0;
        const baseTotal = area * basePrice * multiplier;
        const total = baseTotal * 0.75;
        const item = {
            nama_item: 'Credenza',
            finishing,
            dimensi: `${panjang_min}x${tinggi_min}x${lebar}cm`,
            area,
            harga_satuan: (basePrice * multiplier) * 0.75,
            jumlah: total,
        };
        itemsData.push(item);
        updateItemsList();
        updateTotal();
        byId('cr_panjang').value = '';
        byId('cr_tinggi').value = '';
        byId('cr_lebar').value = '';
        showMobileToast('Credenza berhasil ditambahkan!');
    } catch (error) {
        console.error('Error adding credenza:', error);
        showMobileToast('Terjadi kesalahan saat menambah credenza', true);
    }
}

// Multi Cabinet
function addMultiCabinet() {
    try {
        const panjang = getNum('mc_panjang');
        const tinggi = getNum('mc_tinggi');
        const lebar = getNum('mc_lebar');
        const finishing = byId('mc_finishing').value;
        if (!isValidNumber(panjang, tinggi, lebar)) {
            showMobileToast('Mohon isi semua field Multi Cabinet dengan angka yang valid', true);
            return;
        }
        const panjang_min = Math.max(panjang, 100);
        const tinggi_min = Math.max(tinggi, 100);
        const area = (panjang_min / 100) * (tinggi_min / 100);
        const basePrice = getFinishingPrice(finishing);
        const multiplier = lebar > 60 ? 1.2 : 1.0;
        const baseTotal = area * basePrice * multiplier;
        const total = baseTotal * 0.85;
        const item = {
            nama_item: 'Multi Cabinet',
            finishing,
            dimensi: `${panjang_min}x${tinggi_min}x${lebar}cm`,
            area,
            harga_satuan: (basePrice * multiplier) * 0.85,
            jumlah: total,
        };
        itemsData.push(item);
        updateItemsList();
        updateTotal();
        byId('mc_panjang').value = '';
        byId('mc_tinggi').value = '';
        byId('mc_lebar').value = '';
        showMobileToast('Multi Cabinet berhasil ditambahkan!');
    } catch (error) {
        console.error('Error adding multi cabinet:', error);
        showMobileToast('Terjadi kesalahan saat menambah multi cabinet', true);
    }
}

// Pricing functions
function getFinishingPrice(finishing) {
    const prices = {
        Tacosheet: 2300000,
        'HPL Low': 2300000,
        'HPL Mid': 2800000,
        'HPL High': 3200000,
        Duco: 5500000,
        Kombinasi: 4700000,
    };
    return prices[finishing] || 2300000;
}

// Update items list
function updateItemsList() {
    const container = document.getElementById('itemsList');
    if (!container) return;
    if (itemsData.length === 0) {
        container.innerHTML = '<p class="text-muted text-center">Belum ada item yang ditambahkan</p>';
        return;
    }
    let html = '';
    itemsData.forEach((item, index) => {
        const areaVal = Number.isFinite(item.area) ? item.area : 0;
        const unitVal = Number.isFinite(item.harga_satuan) ? item.harga_satuan : 0;
        const totalVal = Number.isFinite(item.jumlah) ? item.jumlah : 0;
        html += `
            <div class="item-card mb-2" data-index="${index}" style="background: #f8f9fa; border: 1px solid #dee2e6; border-radius: 8px; padding: 12px;">
                <div class="d-flex justify-content-between align-items-start">
                    <div class="flex-grow-1">
                        <strong class="text-primary">${item.nama_item}</strong><br>
                        <small class="text-muted">${item.finishing || item.material || ''} | ${item.dimensi}</small><br>
                        <small class="text-success">Area/Volume: ${areaVal.toFixed(2)} m² | @Rp${unitVal.toLocaleString()}</small>
                    </div>
                    <div class="text-end">
                        <strong class="text-success">Rp${totalVal.toLocaleString()}</strong><br>
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
    if (index < 0 || index >= itemsData.length) return;
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
    const grandTotal = itemsData.reduce((sum, item) => sum + (Number.isFinite(item.jumlah) ? item.jumlah : 0), 0);
    const gtEl = document.getElementById('grandTotal');
    const itemsEl = document.getElementById('totalItems');
    if (gtEl) gtEl.textContent = `Rp ${grandTotal.toLocaleString()}`;
    if (itemsEl) itemsEl.textContent = `${itemsData.length}`;
}

// Theme toggle
function toggleTheme() {
    document.body.classList.toggle('dark-theme');
    const isDark = document.body.classList.contains('dark-theme');
    const icon = document.querySelector('button[onclick="toggleTheme()"] i');
    if (icon) icon.className = isDark ? 'fas fa-sun' : 'fas fa-moon';
    localStorage.setItem('darkTheme', isDark);
}

// Export Excel dan Kirim WhatsApp
function exportExcel() {
    if (itemsData.length === 0) {
        showMobileToast('Tidak ada data untuk diekspor', true);
        return;
    }
    const customerName = byId('customerName').value.trim();
    const customerPhone = byId('customerPhone').value.trim();
    const customerAddress = byId('customerAddress').value.trim();
    if (!customerName || !customerPhone || !customerAddress) {
        showMobileToast('❌ Informasi customer harus lengkap untuk export WhatsApp!', true);
        highlightEmptyFields();
        document.querySelector('.card:has(#customerName)')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        return;
    }
    if (!isValidPhoneNumber(customerPhone)) {
        showMobileToast('❌ Format nomor telepon tidak valid! Gunakan format: 08xx-xxxx-xxxx', true);
        byId('customerPhone').focus();
        return;
    }
    const subtotal = itemsData.reduce((sum, item) => sum + (Number.isFinite(item.jumlah) ? item.jumlah : 0), 0);
    const exportData = {
        items: itemsData,
        customer: { name: customerName, phone: customerPhone, address: customerAddress },
        pricing: {},
        totals: { subtotal: subtotal, grand_total: subtotal },
    };
    showMobileToast('Sedang membuat Excel dan mengirim WhatsApp...', false);
    fetch('/export_excel_whatsapp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(exportData),
    })
        .then((r) => r.json())
        .then((data) => {
            if (!data.success) throw new Error(data.error || 'Export failed');
            const link = document.createElement('a');
            link.href = data.file_url;
            link.download = data.filename;
            link.click();
            showMobileToast('✅ Excel berhasil dibuat dan dikirim ke WhatsApp!');
            if (data.whatsapp_url) window.open(data.whatsapp_url, '_blank');
            setTimeout(() => showMobileToast(`📱 WhatsApp terkirim ke ${data.whatsapp_number}`, false), 1500);
        })
        .catch((e) => {
            console.error('Export error:', e);
            showMobileToast('❌ Gagal mengekspor atau mengirim WhatsApp', true);
        });
}

// Export Excel only (optional)
function exportExcelOnly() {
    if (itemsData.length === 0) {
        showMobileToast('Tidak ada data untuk diekspor', true);
        return;
    }
    const customerName = byId('customerName').value || 'Customer';
    const customerPhone = byId('customerPhone').value || '';
    const customerAddress = byId('customerAddress').value || '';
    const exportData = { items: itemsData, customer: { name: customerName, phone: customerPhone, address: customerAddress }, pricing: {} };
    fetch('/export_excel', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(exportData),
    })
        .then((response) => {
            if (response.ok) return response.blob();
            throw new Error('Export failed');
        })
        .then((blob) => {
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
        .catch((error) => {
            console.error('Export error:', error);
            showMobileToast('Gagal mengekspor Excel', true);
        });
}

// Customer validation helpers
function highlightEmptyFields() {
    const nameEl = byId('customerName');
    const phoneEl = byId('customerPhone');
    const addrEl = byId('customerAddress');
    [nameEl, phoneEl, addrEl].forEach((f) => f.classList.remove('is-invalid', 'border-danger'));
    if (!nameEl.value.trim()) {
        nameEl.classList.add('is-invalid', 'border-danger');
        nameEl.placeholder = 'WAJIB DIISI - Nama Customer';
    }
    if (!phoneEl.value.trim()) {
        phoneEl.classList.add('is-invalid', 'border-danger');
        phoneEl.placeholder = 'WAJIB DIISI - 08xx-xxxx-xxxx';
    }
    if (!addrEl.value.trim()) {
        addrEl.classList.add('is-invalid', 'border-danger');
        addrEl.placeholder = 'WAJIB DIISI - Alamat Customer';
    }
}

function clearFieldHighlights() {
    ['customerName', 'customerPhone', 'customerAddress'].forEach((id) => {
        const field = byId(id);
        field.classList.remove('is-invalid', 'border-danger');
        if (id === 'customerName') field.placeholder = 'Nama Lengkap';
        if (id === 'customerPhone') field.placeholder = '08xx-xxxx-xxxx';
        if (id === 'customerAddress') field.placeholder = 'Alamat Customer';
    });
}

function isValidPhoneNumber(phone) {
    const clean = phone.replace(/\D/g, '');
    const re = /^(08|628|\+628)[0-9]{8,12}$/;
    return re.test(clean) || (clean.startsWith('08') && clean.length >= 10 && clean.length <= 13);
}

function validateCustomerInfo() {
    const customerName = byId('customerName').value.trim();
    const customerPhone = byId('customerPhone').value.trim();
    const customerAddress = byId('customerAddress').value.trim();
    return {
        isValid: customerName && customerPhone && customerAddress && isValidPhoneNumber(customerPhone),
        customerName,
        customerPhone,
        customerAddress,
        errors: {
            name: !customerName,
            phone: !customerPhone || !isValidPhoneNumber(customerPhone),
            address: !customerAddress,
        },
    };
}

function updateWhatsAppButtonStatus() {
    const validation = validateCustomerInfo();
    const btn = document.getElementById('exportWhatsAppBtn');
    const icon = document.getElementById('waValidationIcon');
    if (!btn || !icon) return;
    if (validation.isValid) {
        btn.classList.remove('btn-outline-success');
        btn.classList.add('btn-success');
        btn.disabled = false;
        icon.textContent = '✅';
        btn.title = 'Export Excel + Kirim WhatsApp (Info customer lengkap)';
    } else {
        btn.classList.remove('btn-success');
        btn.classList.add('btn-outline-success');
        btn.disabled = false;
        icon.textContent = '⚠️';
        const missing = [];
        if (validation.errors.name) missing.push('Nama');
        if (validation.errors.phone) missing.push('Telepon');
        if (validation.errors.address) missing.push('Alamat');
        btn.title = `Export Excel + WhatsApp (Lengkapi: ${missing.join(', ')})`;
    }
}

// Initialize app
document.addEventListener('DOMContentLoaded', function () {
    if (localStorage.getItem('darkTheme') === 'true') {
        document.body.classList.add('dark-theme');
        const icon = document.querySelector('button[onclick="toggleTheme()"] i');
        if (icon) icon.className = 'fas fa-sun';
    }
    showCategory();
    updateWhatsAppButtonStatus();
    ['customerName', 'customerPhone', 'customerAddress'].forEach((id) => {
        const field = byId(id);
        field.addEventListener('input', function () {
            if (this.value.trim()) {
                this.classList.remove('is-invalid', 'border-danger');
                if (id === 'customerName') this.placeholder = 'Nama Lengkap';
                if (id === 'customerPhone') this.placeholder = '08xx-xxxx-xxxx';
                if (id === 'customerAddress') this.placeholder = 'Alamat Customer';
            }
            updateWhatsAppButtonStatus();
        });
        if (id === 'customerPhone') {
            field.addEventListener('input', function () {
                let v = this.value.replace(/\D/g, '');
                if (v.startsWith('08')) {
                    if (v.length > 4 && v.length <= 8) v = v.slice(0, 4) + '-' + v.slice(4);
                    else if (v.length > 8) v = v.slice(0, 4) + '-' + v.slice(4, 8) + '-' + v.slice(8, 12);
                }
                this.value = v;
            });
        }
    });
    console.log('Furniture Price Calculator - Mobile Ready!');
});

// Update backdrop finishing options
function updateBackdropFinishing() {
    const type = byId('bd_type').value;
    const finishingSelect = byId('bd_finishing');
    if (type === 'PVC') {
        finishingSelect.disabled = true;
        finishingSelect.value = 'HPL';
    } else {
        finishingSelect.disabled = false;
    }
}

// Toast notification
function showMobileToast(message, isError = false) {
    alert((isError ? 'Error: ' : '') + message);
}

// Wardrobe
function addWardrobe() {
    try {
        const panjangEl = document.getElementById('wr_panjang');
        const tinggiEl = document.getElementById('wr_tinggi');
        const tebalEl = document.getElementById('wr_lebar'); // di form namanya wr_lebar tapi sebenarnya tebal
        const finishingEl = document.getElementById('wr_finishing');
        if (!panjangEl || !tinggiEl || !tebalEl || !finishingEl) {
            showMobileToast('Form Wardrobe tidak ditemukan (ID input hilang)', true);
            return;
        }
    const panjang = parseNumField(panjangEl);
    const tinggi = parseNumField(tinggiEl);
    const tebal = parseNumField(tebalEl);
        const finishing = finishingEl.value;
        
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
        if (!Number.isFinite(area) || !Number.isFinite(basePrice) || !Number.isFinite(total)) {
            throw new Error('Nilai perhitungan Wardrobe tidak valid');
        }
        
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
    panjangEl.value = '';
    tinggiEl.value = '';
    tebalEl.value = '';
        
        showMobileToast('Wardrobe berhasil ditambahkan!');
        
    } catch (error) {
        console.error('Error adding wardrobe:', error);
        showMobileToast('Terjadi kesalahan saat menambah wardrobe', true);
    }
}

// Bed - sesuai desktop version
function addBed() {
    try {
        const panjangEl = document.getElementById('bed_panjang');
        const lebarEl = document.getElementById('bed_lebar');
        const tinggiEl = document.getElementById('bed_tinggi');
        const finishingEl = document.getElementById('bed_finishing');
        if (!panjangEl || !lebarEl || !tinggiEl || !finishingEl) {
            showMobileToast('Form Bed tidak ditemukan (ID input hilang)', true);
            return;
        }
    const panjang = parseNumField(panjangEl);
    const lebar = parseNumField(lebarEl);
    const tinggi = parseNumField(tinggiEl);
        const finishing = finishingEl.value;
        
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
        if (!Number.isFinite(area) || !Number.isFinite(basePrice) || !Number.isFinite(total)) {
            throw new Error('Nilai perhitungan Bed tidak valid');
        }
        
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
    panjangEl.value = '';
    lebarEl.value = '';
    tinggiEl.value = '';
        
        showMobileToast('Bed Frame berhasil ditambahkan!');
        
    } catch (error) {
        console.error('Error adding bed:', error);
        showMobileToast('Terjadi kesalahan saat menambah bed', true);
    }
}

// Backdrop Panel
function addBackdrop() {
    try {
        const panjangEl = document.getElementById('bd_panjang');
        const tinggiEl = document.getElementById('bd_tinggi');
        const typeEl = document.getElementById('bd_type');
        const finishingEl = document.getElementById('bd_finishing');
        if (!panjangEl || !tinggiEl || !typeEl || !finishingEl) {
            showMobileToast('Form Backdrop tidak ditemukan (ID input hilang)', true);
            return;
        }
    const panjang = parseNumField(panjangEl);
    const tinggi = parseNumField(tinggiEl);
        const type = typeEl.value;
        const finishing = finishingEl.value;
        
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
        if (!Number.isFinite(area) || !Number.isFinite(unitPrice) || !Number.isFinite(total)) {
            throw new Error('Nilai perhitungan Backdrop tidak valid');
        }
        
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
    panjangEl.value = '';
    tinggiEl.value = '';
        
        showMobileToast('Backdrop Panel berhasil ditambahkan!');
        
    } catch (error) {
        console.error('Error adding backdrop:', error);
        showMobileToast('Terjadi kesalahan saat menambah backdrop', true);
    }
}

// Credenza
function addCredenza() {
    try {
        const panjangEl = document.getElementById('cr_panjang');
        const tinggiEl = document.getElementById('cr_tinggi');
        const lebarEl = document.getElementById('cr_lebar');
        const finishingEl = document.getElementById('cr_finishing');
        if (!panjangEl || !tinggiEl || !lebarEl || !finishingEl) {
            showMobileToast('Form Credenza tidak ditemukan (ID input hilang)', true);
            return;
        }
    const panjang = parseNumField(panjangEl);
    const tinggi = parseNumField(tinggiEl);
    const lebar = parseNumField(lebarEl);
        const finishing = finishingEl.value;
        
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
    if (!Number.isFinite(area) || !Number.isFinite(basePrice) || !Number.isFinite(baseTotal) || !Number.isFinite(total)) {
        throw new Error('Nilai perhitungan Credenza tidak valid');
    }
        
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
    panjangEl.value = '';
    tinggiEl.value = '';
    lebarEl.value = '';
        
        showMobileToast('Credenza berhasil ditambahkan!');
        
    } catch (error) {
        console.error('Error adding credenza:', error);
        showMobileToast('Terjadi kesalahan saat menambah credenza', true);
    }
}

// Multi Cabinet
function addMultiCabinet() {
    try {
        const panjangEl = document.getElementById('mc_panjang');
        const tinggiEl = document.getElementById('mc_tinggi');
        const lebarEl = document.getElementById('mc_lebar');
        const finishingEl = document.getElementById('mc_finishing');
        if (!panjangEl || !tinggiEl || !lebarEl || !finishingEl) {
            showMobileToast('Form Multi Cabinet tidak ditemukan (ID input hilang)', true);
            return;
        }
    const panjang = parseNumField(panjangEl);
    const tinggi = parseNumField(tinggiEl);
    const lebar = parseNumField(lebarEl);
        const finishing = finishingEl.value;
        
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
    if (!Number.isFinite(area) || !Number.isFinite(basePrice) || !Number.isFinite(baseTotal) || !Number.isFinite(total)) {
        throw new Error('Nilai perhitungan Multi Cabinet tidak valid');
    }
        
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
    panjangEl.value = '';
    tinggiEl.value = '';
    lebarEl.value = '';
        
        showMobileToast('Multi Cabinet berhasil ditambahkan!');
        
    } catch (error) {
        console.error('Error adding multi cabinet:', error);
        showMobileToast('Terjadi kesalahan saat menambah multi cabinet', true);
    }
}

// Custom Furniture
function addCustom() {
    try {
        const namaEl = document.getElementById('cf_nama');
        const v1El = document.getElementById('cf_value1');
        const v2El = document.getElementById('cf_value2');
        const v3El = document.getElementById('cf_value3');
        const methodEl = document.getElementById('cf_method');
        const finishingEl = document.getElementById('cf_finishing');
        if (!namaEl || !v1El || !v2El || !v3El || !methodEl || !finishingEl) {
            showMobileToast('Form Custom tidak ditemukan (ID input hilang)', true);
            return;
        }
        const nama = namaEl.value.trim();
    const value1 = parseNumField(v1El);
    const value2 = parseNumField(v2El);
    const v3 = parseNumField(v3El);
    const value3 = Number.isFinite(v3) ? v3 : 0;
        const method = methodEl.value;
        const finishing = finishingEl.value;
        
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
        if (!Number.isFinite(area) || !Number.isFinite(basePrice) || !Number.isFinite(total)) {
            throw new Error('Nilai perhitungan Custom tidak valid');
        }
        
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
    namaEl.value = '';
    v1El.value = '';
    v2El.value = '';
    v3El.value = '';
        
        showMobileToast(`${nama} berhasil ditambahkan!`);
        
    } catch (error) {
        console.error('Error adding custom furniture:', error);
        showMobileToast(`Terjadi kesalahan saat menambah custom furniture: ${error.message || error}`, true);
    }
}

// Pricing functions

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


function toNumber(value) {
    const n = typeof value === 'number' ? value : parseFloat(String(value).replace(/,/g, '.'));
    return Number.isFinite(n) ? n : NaN;
}

function getNum(id) {
    return toNumber(byId(id).value);
}

function isValidNumber(...nums) {
    return nums.every((n) => Number.isFinite(n));
}

// Category management
function showCategory() {
    const selectedCategory = byId('kategoriSelect').value;
    document.querySelectorAll('.category-form').forEach((form) => {
        form.style.display = 'none';
    });
    const targetForm = document.getElementById(selectedCategory);
    if (targetForm) {
        targetForm.style.display = 'block';
        if (isMobile) {
            setTimeout(() => {
                targetForm.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 100);
        }
    }
}

// Kitchen Set items
function addKitchenItem(type) {
    try {
        let item = {};

        if (type === 'kb') {
            const panjang = getNum('kb_panjang');
            const tinggi = getNum('kb_tinggi');
            const tebal = getNum('kb_tebal');
            const finishing = byId('kb_finishing').value;
            if (!isValidNumber(panjang, tinggi, tebal)) {
                showMobileToast('Mohon isi angka yang valid untuk Kabinet Bawah', true);
                return;
            }
            const panjang_min = Math.max(panjang, 100);
            const tinggi_min = Math.max(tinggi, 100);
            const area = (panjang_min / 100) * (tinggi_min / 100);
            const basePrice = getFinishingPrice(finishing);
            const multiplier = tebal > 60 ? 1.2 : 1.0;
            const total = area * basePrice * multiplier;
            item = {
                nama_item: 'Kitchen Set - Kabinet Bawah',
                finishing,
                dimensi: `${panjang_min}x${tinggi_min}x${tebal}cm`,
                area,
                harga_satuan: basePrice * multiplier,
                jumlah: total,
            };
            byId('kb_panjang').value = '';
            byId('kb_tinggi').value = '';
            byId('kb_tebal').value = '';
        } else if (type === 'ka') {
            const panjang = getNum('ka_panjang');
            const tinggi = getNum('ka_tinggi');
            const tebal = getNum('ka_tebal');
            const finishing = byId('ka_finishing').value;
            if (!isValidNumber(panjang, tinggi, tebal)) {
                showMobileToast('Mohon isi angka yang valid untuk Kabinet Atas', true);
                return;
            }
            const panjang_min = Math.max(panjang, 100);
            const tinggi_min = Math.max(tinggi, 100);
            const area = (panjang_min / 100) * (tinggi_min / 100);
            const basePrice = getFinishingPrice(finishing);
            const multiplier = tebal > 60 ? 1.2 : 1.0;
            const total = area * basePrice * multiplier;
            item = {
                nama_item: 'Kitchen Set - Kabinet Atas',
                finishing,
                dimensi: `${panjang_min}x${tinggi_min}x${tebal}cm`,
                area,
                harga_satuan: basePrice * multiplier,
                jumlah: total,
            };
            byId('ka_panjang').value = '';
            byId('ka_tinggi').value = '';
            byId('ka_tebal').value = '';
        } else if (type === 'tt') {
            const panjang = getNum('tt_panjang');
            const lebar = getNum('tt_lebar');
            const material = byId('tt_material').value;
            if (!isValidNumber(panjang, lebar)) {
                showMobileToast('Mohon isi panjang dan lebar Top Table yang valid', true);
                return;
            }
            const meter_lari = panjang / 100;
            const materialPrices = {
                'Solid Surface': 2000000,
                'Granit Alam': 2500000,
                Marmer: 3500000,
            };
            const basePrice = materialPrices[material] || 2000000;
            const total = meter_lari * basePrice;
            item = {
                nama_item: 'Kitchen Set - Top Table',
                finishing: material,
                dimensi: `${panjang}x${lebar}cm`,
                area: meter_lari,
                harga_satuan: basePrice,
                jumlah: total,
            };
            byId('tt_panjang').value = '';
            byId('tt_lebar').value = '';
        } else if (type === 'bs') {
            const panjang = getNum('bs_panjang');
            const tinggi = getNum('bs_tinggi');
            const material = byId('bs_material').value;
            if (!isValidNumber(panjang, tinggi)) {
                showMobileToast('Mohon isi panjang dan tinggi Backsplash yang valid', true);
                return;
            }
            const meter_lari = panjang / 100;
            const materialPrices = {
                'Solid Surface': 2000000,
                'Granit Alam': 2500000,
                Marmer: 3500000,
                'Mirror Clear': 1500000,
                'Bronze Mirror': 2000000,
                Keramik: 850000,
            };
            const basePrice = materialPrices[material] || 850000;
            const total = meter_lari * basePrice;
            item = {
                nama_item: 'Kitchen Set - Backsplash',
                finishing: material,
                dimensi: `${panjang}x${tinggi}cm`,
                area: meter_lari,
                harga_satuan: basePrice,
                jumlah: total,
            };
            byId('bs_panjang').value = '';
            byId('bs_tinggi').value = '';
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

// ... (rest of the file unchanged, see previous patch for full content)
