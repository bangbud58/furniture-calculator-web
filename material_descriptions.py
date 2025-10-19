from PyQt5.QtWidgets import QMessageBox
class MaterialDescriptions:
    """Class to store all material and finishing descriptions"""
    
    FINISHING_DETAILS = {
        'Tacosheet': """Spesifikasi:
- Plywood kombinasi
- Finishing Tacosheet (lembaran HPL tipis)
- Inner finish melaminto white matt
- Lem kuning Prima D
- Mekanis engsel Ritzo soft close 3D adjuster
- Rel ball bearing soft close Taco
- Cocok untuk budget terbatas
- Indirect LED optional by design""",

        'HPL Low': """Spesifikasi:
- Plywood kombinasi
- Finishing luar HPL (motif terbatas)
- Inner finish melaminto white matt
- Lem kuning Prima D
- Mekanis engsel Ritzo soft close 3D adjuster
- Rel ball bearing soft close Taco
- Pilihan motif standar/populer
- Indirect LED optional by design""",

        'HPL Mid': """Spesifikasi:
- Plywood kombinasi
- Finishing luar HPL Taco/winston/carta (motif standar)
- Inner finish melaminto white matt
- Lem kuning Prima D
- Mekanis engsel Ritzo soft close 3D adjuster
- Rel ball bearing soft close Taco
- Lebih banyak pilihan motif
- Indirect LED optional by design""",

        'HPL High': """Spesifikasi:
- Plywood kombinasi
- Finishing luar dan dalam HPL Taco/winston/carta
- Motif tidak terbatas (premium collection)
- Lem kuning Prima D
- Mekanis engsel Ritzo soft close 3D adjuster
- Rel ball bearing soft close Taco
- Kualitas terbaik dengan motif eksklusif
- Indirect LED optional by design""",
        
        'Duco': """Spesifikasi:
- Plywood kombinasi
- Finishing Full duco
- Cat duco custom warna type NC
- Mekanis engsel Ritzo soft close 3D adjuster
- Rel ball bearing soft close Taco
- Indirect LED optional by design""",
        
        'Kombinasi': """Spesifikasi:
- Plywood kombinasi
- Finishing body HPL Taco/winston/carta
- Lem kuning Prima D
- Finishing pintu duco
- Cat duco custom warna type NC
- Inner finish melaminto white matt
- Mekanis engsel Ritzo soft close 3D adjuster
- Rel ball bearing soft close Taco
- Indirect LED optional by design""",
        
        'Solid Surface': """Spesifikasi:
- Solid surface by Primalite
- Tahan panas dan tahan gores
- Mudah dibersihkan
- Tersedia berbagai warna""",
        
        'Granit Alam': """Spesifikasi:
- Granit alam by Petra Marmer
- Material natural dengan pola unik
- Sangat tahan lama dan kuat
- Tahan panas tinggi""",
        
        'Marmer': """Spesifikasi:
- Marmer by Petra Marmer
- Material premium dengan pola eksklusif
- Tampilan mewah dan elegan
- Memerlukan perawatan khusus""",
        
        'Mirror Clear': """Spesifikasi:
- Plywood base
- Glass panel clear 5mm
- Kaca bening standar
- Cocok untuk backsplash modern""",
        
        'Bronze Mirror': """Spesifikasi:
- Plywood base
- Glass panel bronze 5mm
- Kaca warna bronze/coklat
- Memberikan kesan warm dan elegan""",
        
        'Keramik': """Spesifikasi:
- Keramik standar
- Berbagai pilihan motif dan warna
- Mudah dibersihkan
- Tahan air dan lembab""",
        
        'Synthetic Leather': """Spesifikasi:
- Kulit sintetis premium
- Lembut dan nyaman
- Mudah dibersihkan
- Tahan lama dan anti jamur""",
        
        'Fabric': """Spesifikasi:
- Kain pelapis berkualitas
- Berbagai pilihan warna dan tekstur
- Nyaman dan breathable
- Cocok untuk headboard modern"""
    }
    
    @staticmethod
    def get_description(material):
        """Get the description for a specific material/finishing"""
        return MaterialDescriptions.FINISHING_DETAILS.get(material, "Tidak ada deskripsi tersedia")

    @staticmethod
    def show_info(parent, material):
        """Show material/finishing information in a message box"""
        desc = MaterialDescriptions.get_description(material)
        QMessageBox.information(parent, f'Spesifikasi {material}', desc)