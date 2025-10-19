import tkinter as tk
from tkinter import ttk, messagebox, filedialog, simpledialog
import json
import os
from datetime import datetime

class FurnitureAndroidSimulator:
    def __init__(self):
        self.root = tk.Tk()
        self.root.title("Furniture Price Generator - Mobile Simulator")
        self.root.geometry("400x800")  # Mobile-like aspect ratio
        
        # Data
        self.items_data = []
        self.customer_name = ""
        self.customer_address = ""
        self.customer_phone = ""
        self.discount_percent = 0.0
        self.tax_percent = 11.0
        self.use_tax = True
        
        self.setup_ui()
    
    def setup_ui(self):
        # Configure style for mobile-like appearance
        style = ttk.Style()
        style.configure('Title.TLabel', font=('Arial', 12, 'bold'))
        style.configure('Header.TLabel', font=('Arial', 10, 'bold'))
        style.configure('Mobile.TButton', font=('Arial', 9))
        
        # Main container with scrollbar
        canvas = tk.Canvas(self.root)
        scrollbar = ttk.Scrollbar(self.root, orient="vertical", command=canvas.yview)
        scrollable_frame = ttk.Frame(canvas)
        
        scrollable_frame.bind(
            "<Configure>",
            lambda e: canvas.configure(scrollregion=canvas.bbox("all"))
        )
        
        canvas.create_window((0, 0), window=scrollable_frame, anchor="nw")
        canvas.configure(yscrollcommand=scrollbar.set)
        
        # Header
        header_frame = ttk.Frame(scrollable_frame)
        header_frame.pack(fill='x', padx=10, pady=5)
        
        ttk.Label(header_frame, text="MAPAN Furniture", style='Title.TLabel', foreground='red').pack()
        ttk.Label(header_frame, text="PT. ENIGMA PRISMA DELAPAN", style='Header.TLabel').pack()
        ttk.Label(header_frame, text="Jl. Raya H. Abdullah No.56, Tangerang", font=('Arial', 8)).pack()
        
        # Navigation buttons
        nav_frame = ttk.Frame(scrollable_frame)
        nav_frame.pack(fill='x', padx=10, pady=5)
        
        ttk.Button(nav_frame, text="Customer Info", command=self.show_customer_dialog, style='Mobile.TButton').pack(side='left', fill='x', expand=True, padx=2)
        ttk.Button(nav_frame, text="Diskon & Pajak", command=self.show_discount_dialog, style='Mobile.TButton').pack(side='left', fill='x', expand=True, padx=2)
        ttk.Button(nav_frame, text="Total", command=self.show_total, style='Mobile.TButton').pack(side='left', fill='x', expand=True, padx=2)
        
        # Category selection
        cat_frame = ttk.Frame(scrollable_frame)
        cat_frame.pack(fill='x', padx=10, pady=5)
        
        ttk.Label(cat_frame, text="Kategori:").pack(anchor='w')
        self.category_var = tk.StringVar(value="Kitchen Set KB")
        self.category_combo = ttk.Combobox(cat_frame, textvariable=self.category_var, 
                                          values=['Kitchen Set KB', 'Kitchen Set KA', 'Wardrobe', 'Bed Frame', 
                                                 'Backdrop Panel', 'Credenza', 'Multi Cabinet', 'Custom'])
        self.category_combo.pack(fill='x')
        self.category_combo.bind('<<ComboboxSelected>>', self.on_category_change)
        
        # Sub category
        sub_frame = ttk.Frame(scrollable_frame)
        sub_frame.pack(fill='x', padx=10, pady=5)
        
        ttk.Label(sub_frame, text="Sub Item:").pack(anchor='w')
        self.sub_var = tk.StringVar(value="Kitchen Bawah")
        self.sub_combo = ttk.Combobox(sub_frame, textvariable=self.sub_var, 
                                     values=['Kitchen Bawah', 'Kitchen Atas'])
        self.sub_combo.pack(fill='x')
        
        # Dimensions
        dim_frame = ttk.LabelFrame(scrollable_frame, text="Dimensi (meter)")
        dim_frame.pack(fill='x', padx=10, pady=5)
        
        # Panjang
        p_frame = ttk.Frame(dim_frame)
        p_frame.pack(fill='x', padx=5, pady=2)
        ttk.Label(p_frame, text="Panjang:", width=10).pack(side='left')
        self.panjang_var = tk.StringVar()
        ttk.Entry(p_frame, textvariable=self.panjang_var).pack(side='left', fill='x', expand=True)
        
        # Lebar
        l_frame = ttk.Frame(dim_frame)
        l_frame.pack(fill='x', padx=5, pady=2)
        ttk.Label(l_frame, text="Lebar:", width=10).pack(side='left')
        self.lebar_var = tk.StringVar()
        ttk.Entry(l_frame, textvariable=self.lebar_var).pack(side='left', fill='x', expand=True)
        
        # Tinggi
        t_frame = ttk.Frame(dim_frame)
        t_frame.pack(fill='x', padx=5, pady=2)
        ttk.Label(t_frame, text="Tinggi:", width=10).pack(side='left')
        self.tinggi_var = tk.StringVar()
        ttk.Entry(t_frame, textvariable=self.tinggi_var).pack(side='left', fill='x', expand=True)
        
        # Finishing
        finish_frame = ttk.Frame(scrollable_frame)
        finish_frame.pack(fill='x', padx=10, pady=5)
        
        ttk.Label(finish_frame, text="Finishing:").pack(anchor='w')
        self.finishing_var = tk.StringVar(value="HPL Low")
        self.finishing_combo = ttk.Combobox(finish_frame, textvariable=self.finishing_var,
                                           values=['Tacosheet', 'HPL Low', 'HPL Mid', 'HPL High', 'Duco', 'Kombinasi'])
        self.finishing_combo.pack(fill='x')
        
        # Add button
        ttk.Button(scrollable_frame, text="➕ Tambah Item", command=self.add_item, style='Mobile.TButton').pack(fill='x', padx=10, pady=10)
        
        # Items list
        list_frame = ttk.LabelFrame(scrollable_frame, text="Daftar Item")
        list_frame.pack(fill='both', expand=True, padx=10, pady=5)
        
        # Listbox with scrollbar
        list_container = ttk.Frame(list_frame)
        list_container.pack(fill='both', expand=True, padx=5, pady=5)
        
        self.items_listbox = tk.Listbox(list_container, height=6)
        list_scrollbar = ttk.Scrollbar(list_container, orient="vertical", command=self.items_listbox.yview)
        self.items_listbox.configure(yscrollcommand=list_scrollbar.set)
        
        self.items_listbox.pack(side='left', fill='both', expand=True)
        list_scrollbar.pack(side='right', fill='y')
        
        # Item action buttons
        item_btn_frame = ttk.Frame(list_frame)
        item_btn_frame.pack(fill='x', padx=5, pady=5)
        
        ttk.Button(item_btn_frame, text="🗑️ Hapus Dipilih", command=self.delete_selected, style='Mobile.TButton').pack(side='left', fill='x', expand=True, padx=2)
        ttk.Button(item_btn_frame, text="🗑️ Hapus Semua", command=self.clear_all, style='Mobile.TButton').pack(side='left', fill='x', expand=True, padx=2)
        
        # Action buttons
        action_frame = ttk.Frame(scrollable_frame)
        action_frame.pack(fill='x', padx=10, pady=10)
        
        ttk.Button(action_frame, text="💾 Simpan", command=self.save_project, style='Mobile.TButton').pack(side='left', fill='x', expand=True, padx=2)
        ttk.Button(action_frame, text="📂 Muat", command=self.load_project, style='Mobile.TButton').pack(side='left', fill='x', expand=True, padx=2)
        
        # Total display
        total_frame = ttk.Frame(scrollable_frame)
        total_frame.pack(fill='x', padx=10, pady=5)
        
        self.total_label = ttk.Label(total_frame, text="💰 Total: Rp 0 (0 item)", 
                                    style='Header.TLabel', background='lightgreen')
        self.total_label.pack(fill='x', pady=5)
        
        # Pack canvas and scrollbar
        canvas.pack(side="left", fill="both", expand=True)
        scrollbar.pack(side="right", fill="y")
        
        # Bind mousewheel to canvas
        def _on_mousewheel(event):
            canvas.yview_scroll(int(-1*(event.delta/120)), "units")
        canvas.bind_all("<MouseWheel>", _on_mousewheel)
    
    def on_category_change(self, event=None):
        """Update sub category based on main category"""
        category_subs = {
            'Kitchen Set KB': ['Kitchen Bawah'],
            'Kitchen Set KA': ['Kitchen Atas'],
            'Wardrobe': ['2 Pintu', '3 Pintu', '4 Pintu'],
            'Bed Frame': ['Single', 'Double', 'Queen', 'King'],
            'Backdrop Panel': ['TV Wall', 'Headboard', 'Partition'],
            'Credenza': ['Credenza 120', 'Credenza 150', 'Credenza 180'],
            'Multi Cabinet': ['2 Level', '3 Level', '4 Level'],
            'Custom': ['Custom Item']
        }
        
        category = self.category_var.get()
        if category in category_subs:
            self.sub_combo['values'] = category_subs[category]
            self.sub_var.set(category_subs[category][0])
    
    def get_price_per_m3(self, category, finishing):
        """Get price per m³ based on category and finishing"""
        prices = {
            'Tacosheet': 2300000,
            'HPL Low': 2300000,
            'HPL Mid': 2800000,
            'HPL High': 3200000,
            'Duco': 5500000,
            'Kombinasi': 4700000
        }
        return prices.get(finishing, 2300000)
    
    def add_item(self):
        """Add item to the list"""
        try:
            panjang = float(self.panjang_var.get() or 0)
            lebar = float(self.lebar_var.get() or 0)
            tinggi = float(self.tinggi_var.get() or 0)
            
            if panjang <= 0 or lebar <= 0 or tinggi <= 0:
                messagebox.showerror("Error", "Masukkan dimensi yang valid!")
                return
            
            volume = panjang * lebar * tinggi
            unit_price = self.get_price_per_m3(self.category_var.get(), self.finishing_var.get())
            total_price = volume * unit_price
            
            item_data = {
                'nama_item': self.category_var.get(),
                'sub_item': self.sub_var.get(),
                'deskripsi': f"Finishing {self.finishing_var.get()}",
                'dimensi': f"{panjang}×{lebar}×{tinggi}",
                'satuan_dimensi': 'm³',
                'total_volume': volume,
                'harga_dasar': unit_price,
                'jumlah': total_price
            }
            
            self.items_data.append(item_data)
            
            # Add to listbox
            display_text = f"{item_data['nama_item']} - {item_data['sub_item']} | {item_data['dimensi']} | Rp {total_price:,.0f}"
            self.items_listbox.insert(tk.END, display_text)
            
            # Clear inputs
            self.panjang_var.set('')
            self.lebar_var.set('')
            self.tinggi_var.set('')
            
            self.update_total()
            messagebox.showinfo("Sukses", "Item berhasil ditambahkan!")
            
        except ValueError:
            messagebox.showerror("Error", "Masukkan angka yang valid!")
    
    def delete_selected(self):
        """Delete selected item"""
        selection = self.items_listbox.curselection()
        if not selection:
            messagebox.showwarning("Peringatan", "Pilih item yang ingin dihapus!")
            return
        
        index = selection[0]
        self.items_listbox.delete(index)
        self.items_data.pop(index)
        self.update_total()
        messagebox.showinfo("Sukses", "Item berhasil dihapus!")
    
    def clear_all(self):
        """Clear all items"""
        if not self.items_data:
            messagebox.showinfo("Info", "Tidak ada item untuk dihapus!")
            return
        
        if messagebox.askyesno("Konfirmasi", f"Hapus semua {len(self.items_data)} item?"):
            self.items_listbox.delete(0, tk.END)
            self.items_data.clear()
            self.update_total()
            messagebox.showinfo("Sukses", "Semua item berhasil dihapus!")
    
    def update_total(self):
        """Update total display"""
        if not self.items_data:
            self.total_label.config(text="💰 Total: Rp 0 (0 item)")
            return
        
        subtotal = sum(item['jumlah'] for item in self.items_data)
        discount_amount = subtotal * (self.discount_percent / 100)
        after_discount = subtotal - discount_amount
        
        if self.use_tax:
            tax_amount = after_discount * (self.tax_percent / 100)
            grand_total = after_discount + tax_amount
        else:
            grand_total = after_discount
        
        self.total_label.config(text=f"💰 Total: Rp {grand_total:,.0f} ({len(self.items_data)} item)")
    
    def show_customer_dialog(self):
        """Show customer info dialog"""
        dialog = tk.Toplevel(self.root)
        dialog.title("Informasi Customer")
        dialog.geometry("350x300")
        dialog.transient(self.root)
        dialog.grab_set()
        
        # Center the dialog
        dialog.geometry("+%d+%d" % (self.root.winfo_rootx() + 25, self.root.winfo_rooty() + 50))
        
        frame = ttk.Frame(dialog, padding=20)
        frame.pack(fill='both', expand=True)
        
        # Name
        ttk.Label(frame, text="Nama Customer:").pack(anchor='w')
        name_var = tk.StringVar(value=self.customer_name)
        ttk.Entry(frame, textvariable=name_var).pack(fill='x', pady=5)
        
        # Address
        ttk.Label(frame, text="Alamat:").pack(anchor='w')
        address_var = tk.StringVar(value=self.customer_address)
        ttk.Entry(frame, textvariable=address_var).pack(fill='x', pady=5)
        
        # Phone
        ttk.Label(frame, text="Telepon:").pack(anchor='w')
        phone_var = tk.StringVar(value=self.customer_phone)
        ttk.Entry(frame, textvariable=phone_var).pack(fill='x', pady=5)
        
        # Buttons
        btn_frame = ttk.Frame(frame)
        btn_frame.pack(fill='x', pady=20)
        
        def save_customer():
            self.customer_name = name_var.get()
            self.customer_address = address_var.get()
            self.customer_phone = phone_var.get()
            dialog.destroy()
            messagebox.showinfo("Sukses", "Info customer disimpan!")
        
        ttk.Button(btn_frame, text="Simpan", command=save_customer).pack(side='left', fill='x', expand=True, padx=5)
        ttk.Button(btn_frame, text="Batal", command=dialog.destroy).pack(side='left', fill='x', expand=True, padx=5)
    
    def show_discount_dialog(self):
        """Show discount and tax dialog"""
        dialog = tk.Toplevel(self.root)
        dialog.title("Diskon & Pajak")
        dialog.geometry("300x250")
        dialog.transient(self.root)
        dialog.grab_set()
        
        dialog.geometry("+%d+%d" % (self.root.winfo_rootx() + 25, self.root.winfo_rooty() + 50))
        
        frame = ttk.Frame(dialog, padding=20)
        frame.pack(fill='both', expand=True)
        
        # Discount
        ttk.Label(frame, text="Diskon (%):").pack(anchor='w')
        discount_var = tk.StringVar(value=str(self.discount_percent))
        ttk.Entry(frame, textvariable=discount_var).pack(fill='x', pady=5)
        
        # Tax checkbox
        tax_var = tk.BooleanVar(value=self.use_tax)
        ttk.Checkbutton(frame, text="Gunakan Pajak/PPN", variable=tax_var).pack(anchor='w', pady=5)
        
        # Tax percentage
        ttk.Label(frame, text="Pajak (%):").pack(anchor='w')
        tax_percent_var = tk.StringVar(value=str(self.tax_percent))
        ttk.Entry(frame, textvariable=tax_percent_var).pack(fill='x', pady=5)
        
        # Buttons
        btn_frame = ttk.Frame(frame)
        btn_frame.pack(fill='x', pady=20)
        
        def save_discount():
            try:
                self.discount_percent = float(discount_var.get() or 0)
                self.tax_percent = float(tax_percent_var.get() or 11)
                self.use_tax = tax_var.get()
                self.update_total()
                dialog.destroy()
                
                tax_status = f"Pajak: {self.tax_percent}%" if self.use_tax else "Pajak: Tidak Digunakan"
                messagebox.showinfo("Sukses", f"Diskon: {self.discount_percent}% | {tax_status}")
            except ValueError:
                messagebox.showerror("Error", "Masukkan angka yang valid!")
        
        ttk.Button(btn_frame, text="Simpan", command=save_discount).pack(side='left', fill='x', expand=True, padx=5)
        ttk.Button(btn_frame, text="Batal", command=dialog.destroy).pack(side='left', fill='x', expand=True, padx=5)
    
    def show_total(self):
        """Show total breakdown"""
        if not self.items_data:
            messagebox.showinfo("Info", "Tidak ada item untuk dihitung!")
            return
        
        subtotal = sum(item['jumlah'] for item in self.items_data)
        discount_amount = subtotal * (self.discount_percent / 100)
        after_discount = subtotal - discount_amount
        
        msg = f"📊 RINCIAN TOTAL:\n\n"
        msg += f"Subtotal: Rp {subtotal:,.0f}\n"
        if self.discount_percent > 0:
            msg += f"Diskon ({self.discount_percent}%): -Rp {discount_amount:,.0f}\n"
            msg += f"Setelah Diskon: Rp {after_discount:,.0f}\n"
        
        if self.use_tax:
            tax_amount = after_discount * (self.tax_percent / 100)
            grand_total = after_discount + tax_amount
            msg += f"Pajak/PPN ({self.tax_percent}%): +Rp {tax_amount:,.0f}\n"
        else:
            grand_total = after_discount
            msg += "Pajak/PPN: Tidak Digunakan\n"
        
        msg += f"\n{'='*30}\n"
        msg += f"GRAND TOTAL: Rp {grand_total:,.0f}\n"
        msg += f"{'='*30}\n"
        msg += f"Total Item: {len(self.items_data)}"
        
        messagebox.showinfo("Total Harga", msg)
    
    def save_project(self):
        """Save project to JSON"""
        if not self.items_data:
            messagebox.showwarning("Peringatan", "Tidak ada data untuk disimpan!")
            return
        
        # Generate filename
        now = datetime.now()
        year = now.strftime('%Y')
        roman_months = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII']
        month_roman = roman_months[now.month - 1]
        sequence = now.strftime('%d%H%M')
        customer_name = self.customer_name.strip() if self.customer_name else "NoName"
        customer_name = "".join(c for c in customer_name if c.isalnum() or c in (' ', '-', '_')).strip()
        
        default_name = f'MPN{year}{month_roman}{sequence}-{customer_name}.json'
        
        file_path = filedialog.asksaveasfilename(
            title="Simpan Project",
            defaultextension=".json",
            filetypes=[("JSON files", "*.json"), ("All files", "*.*")],
            initialfilename=default_name
        )
        
        if file_path:
            project_data = {
                'customer_name': self.customer_name,
                'customer_address': self.customer_address,
                'customer_phone': self.customer_phone,
                'discount_percent': self.discount_percent,
                'tax_percent': self.tax_percent,
                'use_tax': self.use_tax,
                'items': self.items_data,
                'saved_at': datetime.now().strftime('%Y-%m-%d %H:%M:%S')
            }
            
            try:
                with open(file_path, 'w', encoding='utf-8') as f:
                    json.dump(project_data, f, indent=2, ensure_ascii=False)
                
                messagebox.showinfo("Sukses", f"Project berhasil disimpan!\n{os.path.basename(file_path)}")
            except Exception as e:
                messagebox.showerror("Error", f"Gagal menyimpan: {e}")
    
    def load_project(self):
        """Load project from JSON"""
        file_path = filedialog.askopenfilename(
            title="Muat Project",
            filetypes=[("JSON files", "*.json"), ("All files", "*.*")]
        )
        
        if file_path:
            try:
                with open(file_path, 'r', encoding='utf-8') as f:
                    project_data = json.load(f)
                
                # Load data
                self.customer_name = project_data.get('customer_name', '')
                self.customer_address = project_data.get('customer_address', '')
                self.customer_phone = project_data.get('customer_phone', '')
                self.discount_percent = project_data.get('discount_percent', 0.0)
                self.tax_percent = project_data.get('tax_percent', 11.0)
                self.use_tax = project_data.get('use_tax', True)
                self.items_data = project_data.get('items', [])
                
                # Update UI
                self.items_listbox.delete(0, tk.END)
                for item in self.items_data:
                    display_text = f"{item['nama_item']} - {item['sub_item']} | {item['dimensi']} | Rp {item['jumlah']:,.0f}"
                    self.items_listbox.insert(tk.END, display_text)
                
                self.update_total()
                messagebox.showinfo("Sukses", f"Project berhasil dimuat!\n{os.path.basename(file_path)}")
                
            except Exception as e:
                messagebox.showerror("Error", f"Gagal memuat: {e}")
    
    def run(self):
        """Run the application"""
        self.root.mainloop()

if __name__ == '__main__':
    app = FurnitureAndroidSimulator()
    app.run()