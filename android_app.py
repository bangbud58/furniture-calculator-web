import json
import os
from datetime import datetime
from kivy.app import App
from kivy.uix.boxlayout import BoxLayout
from kivy.uix.gridlayout import GridLayout
from kivy.uix.scrollview import ScrollView
from kivy.uix.label import Label
from kivy.uix.button import Button
from kivy.uix.textinput import TextInput
from kivy.uix.spinner import Spinner
from kivy.uix.popup import Popup
from kivy.uix.checkbox import CheckBox
from kivy.uix.image import Image
from kivy.core.window import Window

# Import data dari modul Python yang sudah ada
try:
    from info_combo import InfoComboBox
    from material_descriptions import MaterialDescriptions
except ImportError:
    # Fallback jika modul tidak tersedia
    class InfoComboBox:
        @staticmethod
        def get_info(category, sub_category):
            return f"Info untuk {category} - {sub_category}"
    
    class MaterialDescriptions:
        FINISHING_DETAILS = {
            'Tacosheet': 'Material taco sheet berkualitas tinggi',
            'HPL Low': 'HPL kualitas standar - Rp 2,300,000/m³',
            'HPL Mid': 'HPL kualitas menengah - Rp 2,800,000/m³', 
            'HPL High': 'HPL kualitas premium - Rp 3,200,000/m³',
            'Duco': 'Cat duco finishing premium - Rp 5,500,000/m³',
            'Kombinasi': 'Kombinasi HPL dan Duco - Rp 4,700,000/m³'
        }

class FurnitureAndroidApp(BoxLayout):
    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.orientation = 'vertical'
        self.padding = 10
        self.spacing = 10
        
        # Data
        self.items_data = []
        self.customer_name = ""
        self.customer_address = ""
        self.customer_phone = ""
        self.discount_percent = 0.0
        self.tax_percent = 11.0
        self.use_tax = True
        
        # Set window size untuk mobile
        Window.size = (400, 700)
        
        self.build_ui()
    
    def build_ui(self):
        # Header dengan logo dan info perusahaan
        header = BoxLayout(orientation='horizontal', size_hint_y=None, height=80)
        
        # Logo placeholder
        logo_label = Label(
            text='[b][color=c0392b]MAPAN[/color][/b]\nFurniture',
            markup=True,
            text_size=(None, None),
            halign='center',
            size_hint_x=0.3
        )
        
        # Company info
        company_info = Label(
            text='[b][color=c0392b]PT. ENIGMA PRISMA DELAPAN[/color][/b]\nJl. Raya H. Abdullah No.56\nTangerang - 0821 1213 4258',
            markup=True,
            text_size=(None, None),
            halign='right',
            size_hint_x=0.7
        )
        
        header.add_widget(logo_label)
        header.add_widget(company_info)
        self.add_widget(header)
        
        # Navigation buttons
        nav_layout = BoxLayout(orientation='horizontal', size_hint_y=None, height=50, spacing=5)
        
        btn_customer = Button(text='Customer Info', size_hint_x=0.33)
        btn_customer.bind(on_press=self.show_customer_dialog)
        
        btn_discount = Button(text='Diskon & Pajak', size_hint_x=0.33)
        btn_discount.bind(on_press=self.show_discount_dialog)
        
        btn_total = Button(text='Total Harga', size_hint_x=0.34)
        btn_total.bind(on_press=self.show_total)
        
        nav_layout.add_widget(btn_customer)
        nav_layout.add_widget(btn_discount)
        nav_layout.add_widget(btn_total)
        self.add_widget(nav_layout)
        
        # Category selection
        category_layout = BoxLayout(orientation='horizontal', size_hint_y=None, height=50)
        category_layout.add_widget(Label(text='Kategori:', size_hint_x=0.3))
        
        self.category_spinner = Spinner(
            text='Kitchen Set KB',
            values=['Kitchen Set KB', 'Kitchen Set KA', 'Wardrobe', 'Bed Frame', 
                   'Backdrop Panel', 'Credenza', 'Multi Cabinet', 'Custom'],
            size_hint_x=0.7
        )
        self.category_spinner.bind(text=self.on_category_change)
        
        category_layout.add_widget(self.category_spinner)
        self.add_widget(category_layout)
        
        # Sub category
        sub_layout = BoxLayout(orientation='horizontal', size_hint_y=None, height=50)
        sub_layout.add_widget(Label(text='Sub Item:', size_hint_x=0.3))
        
        self.sub_spinner = Spinner(
            text='Kitchen Bawah',
            values=['Kitchen Bawah', 'Kitchen Atas'],
            size_hint_x=0.7
        )
        
        sub_layout.add_widget(self.sub_spinner)
        self.add_widget(sub_layout)
        
        # Dimensions input
        dim_layout = GridLayout(cols=2, size_hint_y=None, height=120, spacing=5)
        
        dim_layout.add_widget(Label(text='Panjang (m):'))
        self.panjang_input = TextInput(multiline=False, input_filter='float')
        dim_layout.add_widget(self.panjang_input)
        
        dim_layout.add_widget(Label(text='Lebar (m):'))
        self.lebar_input = TextInput(multiline=False, input_filter='float')
        dim_layout.add_widget(self.lebar_input)
        
        dim_layout.add_widget(Label(text='Tinggi (m):'))
        self.tinggi_input = TextInput(multiline=False, input_filter='float')
        dim_layout.add_widget(self.tinggi_input)
        
        self.add_widget(dim_layout)
        
        # Finishing selection
        finishing_layout = BoxLayout(orientation='horizontal', size_hint_y=None, height=50)
        finishing_layout.add_widget(Label(text='Finishing:', size_hint_x=0.3))
        
        self.finishing_spinner = Spinner(
            text='HPL Low',
            values=['Tacosheet', 'HPL Low', 'HPL Mid', 'HPL High', 'Duco', 'Kombinasi'],
            size_hint_x=0.7
        )
        
        finishing_layout.add_widget(self.finishing_spinner)
        self.add_widget(finishing_layout)
        
        # Add button
        add_btn = Button(text='Tambah Item', size_hint_y=None, height=50)
        add_btn.bind(on_press=self.add_item)
        self.add_widget(add_btn)
        
        # Items list
        list_label = Label(text='Daftar Item:', size_hint_y=None, height=30, halign='left')
        list_label.bind(size=list_label.setter('text_size'))
        self.add_widget(list_label)
        
        # Scrollable list
        scroll = ScrollView()
        self.items_layout = BoxLayout(orientation='vertical', size_hint_y=None)
        self.items_layout.bind(minimum_height=self.items_layout.setter('height'))
        scroll.add_widget(self.items_layout)
        self.add_widget(scroll)
        
        # Action buttons
        action_layout = BoxLayout(orientation='horizontal', size_hint_y=None, height=50, spacing=5)
        
        clear_btn = Button(text='Hapus Semua')
        clear_btn.bind(on_press=self.clear_all)
        
        save_btn = Button(text='Simpan')
        save_btn.bind(on_press=self.save_project)
        
        load_btn = Button(text='Muat')
        load_btn.bind(on_press=self.load_project)
        
        action_layout.add_widget(clear_btn)
        action_layout.add_widget(save_btn)
        action_layout.add_widget(load_btn)
        self.add_widget(action_layout)
        
        # Total display
        self.total_label = Label(
            text='Total: Rp 0 (0 item)',
            size_hint_y=None,
            height=40,
            color=(1, 1, 1, 1)
        )
        self.add_widget(self.total_label)
    
    def on_category_change(self, spinner, text):
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
        
        if text in category_subs:
            self.sub_spinner.values = category_subs[text]
            self.sub_spinner.text = category_subs[text][0]
    
    def get_price_per_m3(self, category, finishing):
        """Get price per m³ based on category and finishing"""
        # Base prices (simplified)
        prices = {
            'Tacosheet': 2300000,
            'HPL Low': 2300000,
            'HPL Mid': 2800000, 
            'HPL High': 3200000,
            'Duco': 5500000,
            'Kombinasi': 4700000
        }
        
        return prices.get(finishing, 2300000)
    
    def add_item(self, instance):
        """Add item to the list"""
        try:
            # Get input values
            panjang = float(self.panjang_input.text or 0)
            lebar = float(self.lebar_input.text or 0) 
            tinggi = float(self.tinggi_input.text or 0)
            
            if panjang <= 0 or lebar <= 0 or tinggi <= 0:
                self.show_popup("Error", "Masukkan dimensi yang valid!")
                return
            
            # Calculate volume and price
            volume = panjang * lebar * tinggi
            unit_price = self.get_price_per_m3(self.category_spinner.text, self.finishing_spinner.text)
            total_price = volume * unit_price
            
            # Create item data
            item_data = {
                'nama_item': self.category_spinner.text,
                'sub_item': self.sub_spinner.text,
                'deskripsi': f"Finishing {self.finishing_spinner.text}",
                'dimensi': f"{panjang}×{lebar}×{tinggi}",
                'satuan_dimensi': 'm³',
                'total_volume': volume,
                'harga_dasar': unit_price,
                'jumlah': total_price
            }
            
            self.items_data.append(item_data)
            
            # Add to UI list
            item_widget = BoxLayout(orientation='horizontal', size_hint_y=None, height=60)
            
            item_label = Label(
                text=f"{item_data['nama_item']} - {item_data['sub_item']}\n{item_data['dimensi']} | Rp {total_price:,.0f}",
                text_size=(None, None),
                halign='left'
            )
            
            delete_btn = Button(text='X', size_hint_x=None, width=50)
            delete_btn.bind(on_press=lambda x, idx=len(self.items_data)-1: self.delete_item(idx))
            
            item_widget.add_widget(item_label)
            item_widget.add_widget(delete_btn)
            
            self.items_layout.add_widget(item_widget)
            
            # Clear inputs
            self.panjang_input.text = ''
            self.lebar_input.text = ''
            self.tinggi_input.text = ''
            
            # Update total
            self.update_total()
            
            self.show_popup("Sukses", "Item berhasil ditambahkan!")
            
        except ValueError:
            self.show_popup("Error", "Masukkan angka yang valid!")
    
    def delete_item(self, index):
        """Delete item from list"""
        if 0 <= index < len(self.items_data):
            self.items_data.pop(index)
            self.refresh_items_display()
            self.update_total()
    
    def refresh_items_display(self):
        """Refresh the items display"""
        self.items_layout.clear_widgets()
        
        for idx, item in enumerate(self.items_data):
            item_widget = BoxLayout(orientation='horizontal', size_hint_y=None, height=60)
            
            item_label = Label(
                text=f"{item['nama_item']} - {item['sub_item']}\n{item['dimensi']} | Rp {item['jumlah']:,.0f}",
                text_size=(None, None),
                halign='left'
            )
            
            delete_btn = Button(text='X', size_hint_x=None, width=50)
            delete_btn.bind(on_press=lambda x, i=idx: self.delete_item(i))
            
            item_widget.add_widget(item_label)
            item_widget.add_widget(delete_btn)
            
            self.items_layout.add_widget(item_widget)
    
    def update_total(self):
        """Update total display"""
        if not self.items_data:
            self.total_label.text = "Total: Rp 0 (0 item)"
            return
        
        subtotal = sum(item['jumlah'] for item in self.items_data)
        discount_amount = subtotal * (self.discount_percent / 100)
        after_discount = subtotal - discount_amount
        
        if self.use_tax:
            tax_amount = after_discount * (self.tax_percent / 100)
            grand_total = after_discount + tax_amount
        else:
            grand_total = after_discount
        
        self.total_label.text = f"Total: Rp {grand_total:,.0f} ({len(self.items_data)} item)"
    
    def show_customer_dialog(self, instance):
        """Show customer info dialog"""
        content = BoxLayout(orientation='vertical', spacing=10, padding=10)
        
        # Name input
        content.add_widget(Label(text='Nama Customer:', size_hint_y=None, height=30))
        name_input = TextInput(text=self.customer_name, size_hint_y=None, height=40)
        content.add_widget(name_input)
        
        # Address input
        content.add_widget(Label(text='Alamat:', size_hint_y=None, height=30))
        address_input = TextInput(text=self.customer_address, size_hint_y=None, height=40)
        content.add_widget(address_input)
        
        # Phone input
        content.add_widget(Label(text='Telepon:', size_hint_y=None, height=30))
        phone_input = TextInput(text=self.customer_phone, size_hint_y=None, height=40)
        content.add_widget(phone_input)
        
        # Buttons
        btn_layout = BoxLayout(orientation='horizontal', size_hint_y=None, height=50)
        
        save_btn = Button(text='Simpan')
        cancel_btn = Button(text='Batal')
        
        btn_layout.add_widget(save_btn)
        btn_layout.add_widget(cancel_btn)
        content.add_widget(btn_layout)
        
        popup = Popup(title='Informasi Customer', content=content, size_hint=(0.9, 0.7))
        
        def save_customer(instance):
            self.customer_name = name_input.text
            self.customer_address = address_input.text  
            self.customer_phone = phone_input.text
            popup.dismiss()
            self.show_popup("Sukses", "Info customer disimpan!")
        
        save_btn.bind(on_press=save_customer)
        cancel_btn.bind(on_press=popup.dismiss)
        
        popup.open()
    
    def show_discount_dialog(self, instance):
        """Show discount and tax dialog"""
        content = BoxLayout(orientation='vertical', spacing=10, padding=10)
        
        # Discount input
        content.add_widget(Label(text='Diskon (%):', size_hint_y=None, height=30))
        discount_input = TextInput(text=str(self.discount_percent), input_filter='float', size_hint_y=None, height=40)
        content.add_widget(discount_input)
        
        # Tax checkbox
        tax_layout = BoxLayout(orientation='horizontal', size_hint_y=None, height=40)
        tax_checkbox = CheckBox(active=self.use_tax, size_hint_x=None, width=50)
        tax_layout.add_widget(tax_checkbox)
        tax_layout.add_widget(Label(text='Gunakan Pajak/PPN'))
        content.add_widget(tax_layout)
        
        # Tax input
        content.add_widget(Label(text='Pajak (%):', size_hint_y=None, height=30))
        tax_input = TextInput(text=str(self.tax_percent), input_filter='float', size_hint_y=None, height=40)
        content.add_widget(tax_input)
        
        # Buttons
        btn_layout = BoxLayout(orientation='horizontal', size_hint_y=None, height=50)
        
        save_btn = Button(text='Simpan')
        cancel_btn = Button(text='Batal')
        
        btn_layout.add_widget(save_btn)
        btn_layout.add_widget(cancel_btn)
        content.add_widget(btn_layout)
        
        popup = Popup(title='Diskon & Pajak', content=content, size_hint=(0.9, 0.6))
        
        def save_discount(instance):
            try:
                self.discount_percent = float(discount_input.text or 0)
                self.tax_percent = float(tax_input.text or 11)
                self.use_tax = tax_checkbox.active
                self.update_total()
                popup.dismiss()
                self.show_popup("Sukses", "Pengaturan diskon & pajak disimpan!")
            except ValueError:
                self.show_popup("Error", "Masukkan angka yang valid!")
        
        save_btn.bind(on_press=save_discount)
        cancel_btn.bind(on_press=popup.dismiss)
        
        popup.open()
    
    def show_total(self, instance):
        """Show total breakdown"""
        if not self.items_data:
            self.show_popup("Info", "Tidak ada item untuk dihitung!")
            return
        
        subtotal = sum(item['jumlah'] for item in self.items_data)
        discount_amount = subtotal * (self.discount_percent / 100)
        after_discount = subtotal - discount_amount
        
        msg = f"Subtotal: Rp {subtotal:,.0f}\n"
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
        
        msg += f"\nGRAND TOTAL: Rp {grand_total:,.0f}\n"
        msg += f"Total Item: {len(self.items_data)}"
        
        self.show_popup("Total Harga", msg)
    
    def clear_all(self, instance):
        """Clear all items"""
        self.items_data.clear()
        self.items_layout.clear_widgets()
        self.update_total()
        self.show_popup("Sukses", "Semua item dihapus!")
    
    def save_project(self, instance):
        """Save project to JSON"""
        if not self.items_data:
            self.show_popup("Peringatan", "Tidak ada data untuk disimpan!")
            return
        
        # Generate filename
        now = datetime.now()
        year = now.strftime('%Y')
        roman_months = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII']
        month_roman = roman_months[now.month - 1]
        sequence = now.strftime('%d%H%M')
        customer_name = self.customer_name.strip() if self.customer_name else "NoName"
        customer_name = "".join(c for c in customer_name if c.isalnum() or c in (' ', '-', '_')).strip()
        
        filename = f'MPN{year}{month_roman}{sequence}-{customer_name}.json'
        
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
            # Save to app directory
            app_dir = App.get_running_app().user_data_dir
            file_path = os.path.join(app_dir, filename)
            
            with open(file_path, 'w', encoding='utf-8') as f:
                json.dump(project_data, f, indent=2, ensure_ascii=False)
            
            self.show_popup("Sukses", f"Project disimpan!\n{filename}")
        except Exception as e:
            self.show_popup("Error", f"Gagal menyimpan: {e}")
    
    def load_project(self, instance):
        """Load project from JSON (simplified - shows available files)"""
        try:
            app_dir = App.get_running_app().user_data_dir
            files = [f for f in os.listdir(app_dir) if f.endswith('.json')]
            
            if not files:
                self.show_popup("Info", "Tidak ada file project tersimpan!")
                return
            
            # Show file selection (simplified - just load the latest)
            latest_file = max(files, key=lambda x: os.path.getctime(os.path.join(app_dir, x)))
            file_path = os.path.join(app_dir, latest_file)
            
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
            
            self.refresh_items_display()
            self.update_total()
            
            self.show_popup("Sukses", f"Project dimuat!\n{latest_file}")
            
        except Exception as e:
            self.show_popup("Error", f"Gagal memuat: {e}")
    
    def show_popup(self, title, message):
        """Show popup message"""
        content = BoxLayout(orientation='vertical', padding=10, spacing=10)
        
        label = Label(text=message, text_size=(None, None))
        content.add_widget(label)
        
        ok_btn = Button(text='OK', size_hint_y=None, height=50)
        content.add_widget(ok_btn)
        
        popup = Popup(title=title, content=content, size_hint=(0.8, 0.4))
        ok_btn.bind(on_press=popup.dismiss)
        popup.open()

class FurnitureApp(App):
    def build(self):
        self.title = 'Furniture Price Generator - Android'
        return FurnitureAndroidApp()

if __name__ == '__main__':
    FurnitureApp().run()