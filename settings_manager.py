"""
Settings Manager untuk Furniture Price Generator
Mengelola harga material, finishing, dan parameter lainnya
"""
import json
import os

class SettingsManager:
    def __init__(self):
        self.settings_file = 'furniture_settings.json'
        self.default_settings = {
            # Harga Finishing per m²
            'finishing': {
                'HPL': 3000000,
                'Duco': 5500000,
                'Kombinasi': 4700000
            },
            
            # Harga Material Top Table & Backsplash per meter lari
            'top_table': {
                'Solid Surface': 2000000,
                'Granit Alam': 2500000,
                'Marmer': 3500000
            },
            
            'backsplash': {
                'Solid Surface': 2000000,
                'Granit Alam': 2500000,
                'Marmer': 3500000,
                'Mirror Clear': 1500000,
                'Bronze Mirror': 2000000,
                'Keramik': 850000
            },
            
            # Harga Material Bed
            'bed_material': {
                'Synthetic Leather': 500000,
                'Fabric': 400000
            },
            
            # Multiplier
            'multiplier': {
                'tebal_kabinet': 1.2,  # Jika tebal > 60cm
                'tebal_bed': 1.5,      # Jika tebal >= 3
                'backdrop_tebal': 1.3,  # Backdrop type Tebal
                'backdrop_pvc': 1500000  # PVC per m²
            },
            
            # Minimum dimensi (cm)
            'minimum': {
                'panjang': 100,
                'tinggi': 100,
                'lebar': 100
            }
        }
        
        self.settings = self.load_settings()
    
    def load_settings(self):
        """Load settings from JSON file"""
        if os.path.exists(self.settings_file):
            try:
                with open(self.settings_file, 'r') as f:
                    return json.load(f)
            except:
                return self.default_settings.copy()
        return self.default_settings.copy()
    
    def save_settings(self):
        """Save settings to JSON file"""
        try:
            with open(self.settings_file, 'w') as f:
                json.dump(self.settings, f, indent=4)
            return True
        except Exception as e:
            print(f"Error saving settings: {e}")
            return False
    
    def get_finishing_price(self, finishing):
        """Get price for finishing type"""
        return self.settings['finishing'].get(finishing, 0)
    
    def get_top_table_price(self, material):
        """Get price for top table material"""
        return self.settings['top_table'].get(material, 0)
    
    def get_backsplash_price(self, material):
        """Get price for backsplash material"""
        return self.settings['backsplash'].get(material, 0)
    
    def get_bed_material_price(self, material):
        """Get price for bed material"""
        return self.settings['bed_material'].get(material, 0)
    
    def get_multiplier(self, key):
        """Get multiplier value"""
        return self.settings['multiplier'].get(key, 1.0)
    
    def get_minimum(self, key):
        """Get minimum dimension value"""
        return self.settings['minimum'].get(key, 100)
    
    def reset_to_default(self):
        """Reset all settings to default"""
        self.settings = self.default_settings.copy()
        return self.save_settings()
    
    def update_finishing_price(self, finishing, price):
        """Update finishing price"""
        self.settings['finishing'][finishing] = price
    
    def update_top_table_price(self, material, price):
        """Update top table material price"""
        self.settings['top_table'][material] = price
    
    def update_backsplash_price(self, material, price):
        """Update backsplash material price"""
        self.settings['backsplash'][material] = price
    
    def update_bed_material_price(self, material, price):
        """Update bed material price"""
        self.settings['bed_material'][material] = price
    
    def update_multiplier(self, key, value):
        """Update multiplier value"""
        self.settings['multiplier'][key] = value
