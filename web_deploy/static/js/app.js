// Furniture Price Calculator Web App - Mobile Optimized

// Mobile detection and responsive setup
let isMobile = window.innerWidth <= 768;

// Mobile-specific optimizations
function setupMobileOptimizations() {
    if (isMobile) {
        document.body.classList.add('mobile-layout');
        
        // Touch-friendly button sizing
        document.querySelectorAll('.btn').forEach(btn => {
            btn.style.minHeight = '44px';
        });
        
        // Prevent zoom on input focus (iOS)
        document.querySelectorAll('input[type="number"], select').forEach(input => {
            input.style.fontSize = '16px';
        });
        
        // Auto-scroll to form after category change
        document.getElementById('kategoriSelect').addEventListener('change', () => {
            setTimeout(() => {
                document.querySelector('.category-form:not([style*="display: none"])').scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }, 100);
        });
        
        // Mobile toast notifications
        setupMobileNotifications();
    }
}

// Mobile notification system
function setupMobileNotifications() {
    const style = document.createElement('style');
    style.textContent = `
        .mobile-toast {
            position: fixed;
            top: 80px;
            left: 50%;
            transform: translateX(-50%);
            background: #28a745;
            color: white;
            padding: 12px 20px;
            border-radius: 25px;
            z-index: 1050;
            font-size: 14px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            opacity: 0;
            transition: all 0.3s ease;
        }
        .mobile-toast.show {
            opacity: 1;
            transform: translateX(-50%) translateY(10px);
        }
        .mobile-toast.error {
            background: #dc3545;
        }
    `;
    document.head.appendChild(style);
}

function showMobileToast(message, isError = false) {
    const toast = document.createElement('div');
    toast.className = `mobile-toast ${isError ? 'error' : ''}`;
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => toast.classList.add('show'), 100);
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => document.body.removeChild(toast), 300);
    }, 2500);
}

// Window resize handler
function handleResize() {
    const wasMobile = isMobile;
    isMobile = window.innerWidth <= 768;
    
    if (isMobile !== wasMobile) {
        if (isMobile) {
            setupMobileOptimizations();
        } else {
            document.body.classList.remove('mobile-layout');
        }
    }
}

window.addEventListener('resize', handleResize);
document.addEventListener('DOMContentLoaded', setupMobileOptimizations);

class FurniturePriceApp {
    constructor() {
        this.initializeApp();
    }

    initializeApp() {
        this.setupEventListeners();
        this.loadInitialData();
    }

    setupEventListeners() {
        // Form submission
        document.getElementById('itemForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.addItem();
        });

        // Customer info form
        document.getElementById('customerForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.updateCustomerInfo();
        });

        // Pricing form
        document.getElementById('pricingForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.updatePricingInfo();
        });

        // Delete all items
        document.getElementById('clearAllBtn').addEventListener('click', () => {
            this.clearAllItems();
        });

        // File operations
        document.getElementById('saveProjectBtn').addEventListener('click', () => {
            this.saveProject();
        });

        document.getElementById('loadProjectBtn').addEventListener('click', () => {
            document.getElementById('fileInput').click();
        });

        document.getElementById('fileInput').addEventListener('change', (e) => {
            this.loadProject(e.target.files[0]);
        });

        // Export operations
        document.getElementById('exportExcelBtn').addEventListener('click', () => {
            this.exportToExcel();
        });
    }

    loadInitialData() {
        this.refreshItemList();
        this.loadCustomerInfo();
        this.loadPricingInfo();
    }

    async addItem() {
        const form = document.getElementById('itemForm');
        const formData = new FormData(form);

        // Validate inputs
        const nama = formData.get('nama').trim();
        const panjang = parseFloat(formData.get('panjang'));
        const lebar = parseFloat(formData.get('lebar'));
        const jumlah = parseInt(formData.get('jumlah'));

        if (!nama || !panjang || !lebar || !jumlah) {
            this.showToast('Harap lengkapi semua field!', 'error');
            return;
        }

        if (panjang <= 0 || lebar <= 0 || jumlah <= 0) {
            this.showToast('Nilai harus lebih besar dari 0!', 'error');
            return;
        }

        try {
            const response = await fetch('/add_item', {
                method: 'POST',
                body: formData
            });

            const result = await response.json();
            
            if (result.success) {
                this.showToast('Item berhasil ditambahkan!', 'success');
                form.reset();
                this.refreshItemList();
                this.addSuccessAnimation();
            } else {
                this.showToast(result.message || 'Terjadi kesalahan!', 'error');
            }
        } catch (error) {
            this.showToast('Terjadi kesalahan koneksi!', 'error');
            console.error('Error:', error);
        }
    }

    async deleteItem(index) {
        if (!confirm('Yakin ingin menghapus item ini?')) {
            return;
        }

        try {
            const response = await fetch('/delete_item', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ index: index })
            });

            const result = await response.json();
            
            if (result.success) {
                this.showToast('Item berhasil dihapus!', 'success');
                this.refreshItemList();
            } else {
                this.showToast(result.message || 'Terjadi kesalahan!', 'error');
            }
        } catch (error) {
            this.showToast('Terjadi kesalahan koneksi!', 'error');
            console.error('Error:', error);
        }
    }

    async clearAllItems() {
        if (!confirm('Yakin ingin menghapus semua item?')) {
            return;
        }

        try {
            const response = await fetch('/clear_all', {
                method: 'POST'
            });

            const result = await response.json();
            
            if (result.success) {
                this.showToast('Semua item berhasil dihapus!', 'success');
                this.refreshItemList();
            } else {
                this.showToast(result.message || 'Terjadi kesalahan!', 'error');
            }
        } catch (error) {
            this.showToast('Terjadi kesalahan koneksi!', 'error');
            console.error('Error:', error);
        }
    }

    async refreshItemList() {
        try {
            const response = await fetch('/');
            const html = await response.text();
            
            // Parse the response and update the table
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            
            const newTableBody = doc.querySelector('#itemTableBody');
            const newGrandTotal = doc.querySelector('#grandTotal');
            
            if (newTableBody) {
                document.getElementById('itemTableBody').innerHTML = newTableBody.innerHTML;
            }
            
            if (newGrandTotal) {
                document.getElementById('grandTotal').textContent = newGrandTotal.textContent;
            }

            // Add fade-in animation to new rows
            const rows = document.querySelectorAll('#itemTableBody tr');
            rows.forEach((row, index) => {
                setTimeout(() => {
                    row.classList.add('fade-in-up');
                }, index * 100);
            });

        } catch (error) {
            console.error('Error refreshing item list:', error);
        }
    }

    async updateCustomerInfo() {
        const form = document.getElementById('customerForm');
        const formData = new FormData(form);

        try {
            const response = await fetch('/update_customer', {
                method: 'POST',
                body: formData
            });

            const result = await response.json();
            
            if (result.success) {
                this.showToast('Info pelanggan berhasil diperbarui!', 'success');
                const modal = bootstrap.Modal.getInstance(document.getElementById('customerModal'));
                modal.hide();
            } else {
                this.showToast(result.message || 'Terjadi kesalahan!', 'error');
            }
        } catch (error) {
            this.showToast('Terjadi kesalahan koneksi!', 'error');
            console.error('Error:', error);
        }
    }

    async updatePricingInfo() {
        const form = document.getElementById('pricingForm');
        const formData = new FormData(form);

        try {
            const response = await fetch('/update_pricing', {
                method: 'POST',
                body: formData
            });

            const result = await response.json();
            
            if (result.success) {
                this.showToast('Pengaturan harga berhasil diperbarui!', 'success');
                const modal = bootstrap.Modal.getInstance(document.getElementById('pricingModal'));
                modal.hide();
                this.refreshItemList(); // Refresh to recalculate prices
            } else {
                this.showToast(result.message || 'Terjadi kesalahan!', 'error');
            }
        } catch (error) {
            this.showToast('Terjadi kesalahan koneksi!', 'error');
            console.error('Error:', error);
        }
    }

    async loadCustomerInfo() {
        try {
            const response = await fetch('/get_customer_info');
            const data = await response.json();
            
            if (data.success) {
                const info = data.customer_info;
                document.getElementById('customerName').value = info.nama || '';
                document.getElementById('customerPhone').value = info.telepon || '';
                document.getElementById('customerAddress').value = info.alamat || '';
            }
        } catch (error) {
            console.error('Error loading customer info:', error);
        }
    }

    async loadPricingInfo() {
        try {
            const response = await fetch('/get_pricing_info');
            const data = await response.json();
            
            if (data.success) {
                const pricing = data.pricing_info;
                
                // Update form values
                document.getElementById('hplLevel').value = pricing.hpl_level || '1';
                document.getElementById('enableDiscount').checked = pricing.enable_discount || false;
                document.getElementById('discountPercent').value = pricing.discount_percent || 0;
                document.getElementById('enableTax').checked = pricing.enable_tax || false;
                document.getElementById('taxPercent').value = pricing.tax_percent || 0;
                
                // Toggle discount/tax fields
                this.toggleDiscountFields();
                this.toggleTaxFields();
                
                // Add event listeners for toggles
                document.getElementById('enableDiscount').addEventListener('change', () => {
                    this.toggleDiscountFields();
                });
                
                document.getElementById('enableTax').addEventListener('change', () => {
                    this.toggleTaxFields();
                });
            }
        } catch (error) {
            console.error('Error loading pricing info:', error);
        }
    }

    toggleDiscountFields() {
        const enableDiscount = document.getElementById('enableDiscount').checked;
        const discountField = document.getElementById('discountPercent');
        discountField.disabled = !enableDiscount;
        if (!enableDiscount) {
            discountField.value = 0;
        }
    }

    toggleTaxFields() {
        const enableTax = document.getElementById('enableTax').checked;
        const taxField = document.getElementById('taxPercent');
        taxField.disabled = !enableTax;
        if (!enableTax) {
            taxField.value = 0;
        }
    }

    async saveProject() {
        try {
            const response = await fetch('/save_project', {
                method: 'POST'
            });

            if (response.ok) {
                // Trigger file download
                const blob = await response.blob();
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = response.headers.get('Content-Disposition').split('filename=')[1] || 'project.json';
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                window.URL.revokeObjectURL(url);

                this.showToast('Proyek berhasil disimpan!', 'success');
            } else {
                this.showToast('Gagal menyimpan proyek!', 'error');
            }
        } catch (error) {
            this.showToast('Terjadi kesalahan koneksi!', 'error');
            console.error('Error:', error);
        }
    }

    async loadProject(file) {
        if (!file) return;

        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await fetch('/load_project', {
                method: 'POST',
                body: formData
            });

            const result = await response.json();
            
            if (result.success) {
                this.showToast('Proyek berhasil dimuat!', 'success');
                this.refreshItemList();
                this.loadCustomerInfo();
                this.loadPricingInfo();
            } else {
                this.showToast(result.message || 'Gagal memuat proyek!', 'error');
            }
        } catch (error) {
            this.showToast('Terjadi kesalahan koneksi!', 'error');
            console.error('Error:', error);
        }
    }

    async exportToExcel() {
        try {
            const response = await fetch('/export_excel', {
                method: 'POST'
            });

            if (response.ok) {
                // Trigger file download
                const blob = await response.blob();
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = response.headers.get('Content-Disposition').split('filename=')[1] || 'invoice.xlsx';
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                window.URL.revokeObjectURL(url);

                this.showToast('Excel berhasil diekspor!', 'success');
            } else {
                this.showToast('Gagal mengekspor Excel!', 'error');
            }
        } catch (error) {
            this.showToast('Terjadi kesalahan koneksi!', 'error');
            console.error('Error:', error);
        }
    }

    showToast(message, type = 'info') {
        const toastContainer = document.getElementById('toastContainer');
        const toastId = 'toast_' + Date.now();
        
        let bgClass = 'bg-primary';
        let icon = 'fa-info-circle';
        
        if (type === 'success') {
            bgClass = 'bg-success';
            icon = 'fa-check-circle';
        } else if (type === 'error') {
            bgClass = 'bg-danger';
            icon = 'fa-exclamation-circle';
        }

        const toastHTML = `
            <div id="${toastId}" class="toast align-items-center text-white ${bgClass} border-0" role="alert" aria-live="assertive" aria-atomic="true">
                <div class="d-flex">
                    <div class="toast-body">
                        <i class="fas ${icon} me-2"></i>
                        ${message}
                    </div>
                    <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
                </div>
            </div>
        `;

        toastContainer.insertAdjacentHTML('beforeend', toastHTML);
        
        const toastElement = document.getElementById(toastId);
        const toast = new bootstrap.Toast(toastElement);
        toast.show();

        // Remove toast element after it's hidden
        toastElement.addEventListener('hidden.bs.toast', () => {
            toastElement.remove();
        });
    }

    addSuccessAnimation() {
        const form = document.getElementById('itemForm');
        form.classList.add('success-animation');
        setTimeout(() => {
            form.classList.remove('success-animation');
        }, 600);
    }

    formatCurrency(amount) {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        }).format(amount);
    }
}

// Initialize the app when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.furnitureApp = new FurniturePriceApp();
});

// Global functions for onclick events
function deleteItem(index) {
    window.furnitureApp.deleteItem(index);
}

// QDoubleValidator equivalent for web - SAME VALIDATION AS DESKTOP
function validateNumberInput(input) {
    const value = parseFloat(input.value);
    
    // Same validation logic as desktop QDoubleValidator(0.0, 999999.99, 2)
    if (isNaN(value) || value <= 0 || value > 999999.99) {
        input.classList.add('is-invalid');
        input.classList.remove('is-valid');
        input.setCustomValidity('Harus angka positif antara 0.01 - 999999.99');
        return false;
    } else {
        input.classList.add('is-valid');
        input.classList.remove('is-invalid');
        input.setCustomValidity('');
        return true;
    }
}

function formatNumberInput(input) {
    // Format to 2 decimal places like desktop
    const value = parseFloat(input.value);
    if (!isNaN(value) && value > 0) {
        input.value = value.toFixed(2);
    }
}

// Update finishing info based on selection - SAME AS DESKTOP InfoComboBox
function updateFinishingInfo() {
    const finishingSelect = document.getElementById('finishing');
    const finishingInfo = document.getElementById('finishingInfo');
    
    if (finishingSelect && finishingInfo) {
        const selectedFinishing = finishingSelect.value;
        
        // EXACT SAME descriptions as desktop material_descriptions.py
        const descriptions = {
            'Tacosheet': 'Luar tacosheet, dalam melamninto, ekonomis (Rp 2,3jt/m²)',
            'HPL Low': 'Luar HPL, dalam melamninto, motif terbatas (Rp 2,3jt/m²)',
            'HPL Mid': 'Luar HPL, dalam melamninto, motif standar (Rp 2,8jt/m²)',
            'HPL High': 'Luar+dalam full HPL, semua motif tersedia (Rp 3,2jt/m²)',
            'Duco': 'Cat duco premium, finishing halus (Rp 5,5jt/m²)',
            'Kombinasi': 'Kombinasi HPL + duco (Rp 4,7jt/m²)'
        };
        
        if (selectedFinishing && descriptions[selectedFinishing]) {
            finishingInfo.innerHTML = `
                <small class="text-info">
                    <div style="background: #e3f2fd; border: 1px solid #2196f3; border-radius: 4px; padding: 6px; font-size: 11px;">
                        <strong>📝 ${selectedFinishing}:</strong> ${descriptions[selectedFinishing]}
                    </div>
                </small>
            `;
        } else {
            finishingInfo.innerHTML = `
                <small class="text-muted">
                    <div style="background: #fff9e6; border: 1px solid #f39c12; border-radius: 4px; padding: 8px; font-size: 11px;">
                        📋 <strong>KETERANGAN FINISHING:</strong><br>
                        • Tacosheet: Luar tacosheet, dalam melamninto, ekonomis (Rp 2,3jt/m²)<br>
                        • HPL Low: Luar HPL, dalam melamninto, motif terbatas (Rp 2,3jt/m²)<br>
                        • HPL Mid: Luar HPL, dalam melamninto, motif standar (Rp 2,8jt/m²)<br>
                        • HPL High: Luar+dalam full HPL, semua motif tersedia (Rp 3,2jt/m²)<br>
                        • Duco: Cat duco premium, finishing halus (Rp 5,5jt/m²)<br>
                        • Kombinasi: Kombinasi HPL + duco (Rp 4,7jt/m²)
                    </div>
                </small>
            `;
        }
    }
}

// Add table row selection like desktop QListWidget
function selectTableRow(row, index) {
    // Remove previous selection
    document.querySelectorAll('tbody tr').forEach(r => r.classList.remove('table-active'));
    
    // Add selection to clicked row
    row.classList.add('table-active');
    row.dataset.index = index;
}

// Utility functions
function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

function calculateArea(panjang, lebar) {
    return (panjang * lebar / 10000).toFixed(2);
}

// QDoubleValidator equivalent - SAME AS DESKTOP
function validateNumberInput(input) {
    const value = parseFloat(input.value);
    
    // Allow empty during typing
    if (input.value === '') {
        input.classList.remove('is-invalid', 'is-valid');
        return true;
    }
    
    // Check if valid number and within range (like QDoubleValidator)
    if (isNaN(value) || value <= 0 || value > 999999.99) {
        input.classList.add('is-invalid');
        input.classList.remove('is-valid');
        return false;
    } else {
        input.classList.add('is-valid');
        input.classList.remove('is-invalid');
        return true;
    }
}

function formatNumberInput(input) {
    const value = parseFloat(input.value);
    if (!isNaN(value) && value > 0) {
        // Format to 2 decimal places like desktop
        input.value = value.toFixed(2);
    }
}

// Update finishing info display - SAME AS DESKTOP InfoComboBox
function updateFinishingInfo() {
    const finishing = document.getElementById('finishing').value;
    const infoDiv = document.getElementById('finishingInfo');
    
    const descriptions = {
        'Tacosheet': 'Luar tacosheet, dalam melamninto, ekonomis (Rp 2,3jt/m²)',
        'HPL Low': 'Luar HPL, dalam melamninto, motif terbatas (Rp 2,3jt/m²)',
        'HPL Mid': 'Luar HPL, dalam melamninto, motif standar (Rp 2,8jt/m²)',
        'HPL High': 'Luar+dalam full HPL, semua motif tersedia (Rp 3,2jt/m²)',
        'Duco': 'Cat duco premium, finishing halus (Rp 5,5jt/m²)',
        'Kombinasi': 'Kombinasi HPL + duco (Rp 4,7jt/m²)'
    };
    
    if (finishing && descriptions[finishing]) {
        infoDiv.innerHTML = `
            <small class="text-success">
                <div style="background: #e8f5e9; border: 1px solid #4caf50; border-radius: 4px; padding: 6px; font-size: 11px;">
                    ✅ <strong>${finishing}:</strong> ${descriptions[finishing]}
                </div>
            </small>
        `;
    }
}

// Dark mode toggle - SAME AS DESKTOP
function toggleTheme() {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    
    // Update theme button
    const themeBtn = document.querySelector('[onclick="toggleTheme()"]');
    if (themeBtn) {
        themeBtn.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    }
    
    // Apply dark theme colors (grey instead of red like desktop)
    if (isDark) {
        document.documentElement.style.setProperty('--primary-color', '#6c757d');
        document.documentElement.style.setProperty('--danger-color', '#6c757d');
    } else {
        document.documentElement.style.setProperty('--primary-color', '#c0392b');
        document.documentElement.style.setProperty('--danger-color', '#dc3545');
    }
}

// Form validation helpers
function validatePositiveNumber(input) {
    return validateNumberInput(input);
}

// Add real-time validation - SAME AS DESKTOP QDoubleValidator
document.addEventListener('DOMContentLoaded', () => {
    const numberInputs = document.querySelectorAll('input[type="number"]');
    numberInputs.forEach(input => {
        input.addEventListener('input', () => {
            validateNumberInput(input);
        });
        input.addEventListener('blur', () => {
            formatNumberInput(input);
        });
    });
    
    // Initialize finishing info
    updateFinishingInfo();
});

// Keyboard shortcuts - SAME AS DESKTOP QShortcut
document.addEventListener('keydown', (e) => {
    // Ctrl+S for save (same as desktop)
    if (e.ctrlKey && e.key === 's') {
        e.preventDefault();
        window.furnitureApp.saveProject();
        window.furnitureApp.showToast('Shortcut: Ctrl+S - Save Project', 'info');
    }
    
    // Ctrl+O for open (same as desktop)
    if (e.ctrlKey && e.key === 'o') {
        e.preventDefault();
        document.getElementById('loadProjectBtn').click();
        window.furnitureApp.showToast('Shortcut: Ctrl+O - Open Project', 'info');
    }
    
    // Ctrl+E for export (same as desktop)
    if (e.ctrlKey && e.key === 'e') {
        e.preventDefault();
        window.furnitureApp.exportToExcel();
        window.furnitureApp.showToast('Shortcut: Ctrl+E - Export Excel', 'info');
    }
    
    // Enter on form to add item (same as desktop)
    if (e.key === 'Enter' && e.target.closest('#itemForm')) {
        e.preventDefault();
        window.furnitureApp.addItem();
    }
    
    // Delete key to remove selected item (same as desktop)
    if (e.key === 'Delete' && !e.target.matches('input, textarea, select')) {
        e.preventDefault();
        const selectedRow = document.querySelector('tr.table-active');
        if (selectedRow) {
            const index = selectedRow.dataset.index;
            if (index !== undefined) {
                window.furnitureApp.deleteItem(parseInt(index));
            }
        }
    }
    
    // Ctrl+D for clear all (same as desktop)
    if (e.ctrlKey && e.key === 'd') {
        e.preventDefault();
        window.furnitureApp.clearAllItems();
        window.furnitureApp.showToast('Shortcut: Ctrl+D - Clear All', 'info');
    }
    
    // F1 for customer info (same as desktop)
    if (e.key === 'F1') {
        e.preventDefault();
        const customerModal = new bootstrap.Modal(document.getElementById('customerModal'));
        customerModal.show();
        window.furnitureApp.showToast('Shortcut: F1 - Customer Info', 'info');
    }
    
    // F2 for pricing settings (same as desktop)  
    if (e.key === 'F2') {
        e.preventDefault();
        const pricingModal = new bootstrap.Modal(document.getElementById('pricingModal'));
        pricingModal.show();
        window.furnitureApp.showToast('Shortcut: F2 - Pricing Settings', 'info');
    }
});