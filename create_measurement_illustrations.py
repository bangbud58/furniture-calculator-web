"""
Script untuk membuat ilustrasi pengukuran furniture
Menggunakan PIL/Pillow untuk create visual guides
"""
try:
    from PIL import Image, ImageDraw, ImageFont
    import os
    
    def create_kitchen_illustration():
        """Ilustrasi Kitchen Set - Kabinet dengan dimensi"""
        img = Image.new('RGB', (400, 300), 'white')
        draw = ImageDraw.Draw(img)
        
        # Draw cabinet outline
        draw.rectangle([50, 80, 350, 250], outline='#2c3e50', width=3)
        
        # Panjang arrow (horizontal)
        draw.line([50, 270, 350, 270], fill='#e74c3c', width=2)
        draw.polygon([(45, 270), (55, 265), (55, 275)], fill='#e74c3c')
        draw.polygon([(355, 270), (345, 265), (345, 275)], fill='#e74c3c')
        draw.text((180, 275), 'PANJANG', fill='#e74c3c', anchor='mm')
        
        # Tinggi arrow (vertical)
        draw.line([30, 80, 30, 250], fill='#3498db', width=2)
        draw.polygon([(30, 75), (25, 85), (35, 85)], fill='#3498db')
        draw.polygon([(30, 255), (25, 245), (35, 245)], fill='#3498db')
        draw.text((30, 165), 'TINGGI', fill='#3498db', anchor='mm', angle=90)
        
        # Tebal arrow (diagonal untuk depth effect)
        draw.line([350, 80, 370, 60], fill='#27ae60', width=2)
        draw.polygon([(372, 58), (368, 63), (365, 56)], fill='#27ae60')
        draw.text((380, 50), 'TEBAL', fill='#27ae60', anchor='lm')
        
        # Title
        draw.text((200, 20), 'KITCHEN SET - KABINET', fill='#c0392b', anchor='mm')
        
        img.save('illustration_kitchen.png')
        print("✅ Kitchen illustration created")
    
    def create_wardrobe_illustration():
        """Ilustrasi Wardrobe"""
        img = Image.new('RGB', (400, 400), 'white')
        draw = ImageDraw.Draw(img)
        
        # Draw wardrobe outline (taller)
        draw.rectangle([80, 80, 320, 350], outline='#2c3e50', width=3)
        draw.line([200, 80, 200, 350], fill='#2c3e50', width=2)  # Door separator
        
        # Panjang arrow
        draw.line([80, 370, 320, 370], fill='#e74c3c', width=2)
        draw.polygon([(75, 370), (85, 365), (85, 375)], fill='#e74c3c')
        draw.polygon([(325, 370), (315, 365), (315, 375)], fill='#e74c3c')
        draw.text((200, 385), 'PANJANG', fill='#e74c3c', anchor='mm')
        
        # Tinggi arrow
        draw.line([50, 80, 50, 350], fill='#3498db', width=2)
        draw.polygon([(50, 75), (45, 85), (55, 85)], fill='#3498db')
        draw.polygon([(50, 355), (45, 345), (55, 345)], fill='#3498db')
        draw.text((50, 215), 'TINGGI', fill='#3498db', anchor='mm', angle=90)
        
        # Tebal arrow
        draw.line([320, 80, 350, 60], fill='#27ae60', width=2)
        draw.polygon([(352, 58), (348, 63), (345, 56)], fill='#27ae60')
        draw.text((365, 50), 'TEBAL', fill='#27ae60', anchor='lm')
        
        # Title
        draw.text((200, 20), 'WARDROBE', fill='#c0392b', anchor='mm')
        
        img.save('illustration_wardrobe.png')
        print("✅ Wardrobe illustration created")
    
    def create_bed_illustration():
        """Ilustrasi Bed Frame + Headboard"""
        img = Image.new('RGB', (500, 350), 'white')
        draw = ImageDraw.Draw(img)
        
        # Headboard
        draw.rectangle([50, 80, 180, 220], outline='#8e44ad', width=3, fill='#e8daef')
        
        # Bed frame
        draw.rectangle([180, 150, 450, 270], outline='#2c3e50', width=3)
        
        # Panjang bed
        draw.line([180, 290, 450, 290], fill='#e74c3c', width=2)
        draw.polygon([(175, 290), (185, 285), (185, 295)], fill='#e74c3c')
        draw.polygon([(455, 290), (445, 285), (445, 295)], fill='#e74c3c')
        draw.text((315, 305), 'PANJANG (Bed)', fill='#e74c3c', anchor='mm')
        
        # Lebar bed
        draw.line([470, 150, 470, 270], fill='#f39c12', width=2)
        draw.polygon([(470, 145), (465, 155), (475, 155)], fill='#f39c12')
        draw.polygon([(470, 275), (465, 265), (475, 265)], fill='#f39c12')
        draw.text((485, 210), 'LEBAR', fill='#f39c12', anchor='lm', angle=90)
        
        # Tinggi headboard
        draw.line([30, 80, 30, 220], fill='#8e44ad', width=2)
        draw.polygon([(30, 75), (25, 85), (35, 85)], fill='#8e44ad')
        draw.polygon([(30, 225), (25, 215), (35, 215)], fill='#8e44ad')
        draw.text((30, 150), 'TINGGI (Headboard)', fill='#8e44ad', anchor='mm', angle=90)
        
        # Title
        draw.text((250, 20), 'BED FRAME + HEADBOARD', fill='#c0392b', anchor='mm')
        
        img.save('illustration_bed.png')
        print("✅ Bed illustration created")
    
    def create_backdrop_illustration():
        """Ilustrasi Backdrop Panel"""
        img = Image.new('RGB', (400, 400), 'white')
        draw = ImageDraw.Draw(img)
        
        # Backdrop panel
        draw.rectangle([100, 80, 300, 320], outline='#2c3e50', width=3, fill='#ecf0f1')
        
        # Panjang arrow
        draw.line([100, 340, 300, 340], fill='#e74c3c', width=2)
        draw.polygon([(95, 340), (105, 335), (105, 345)], fill='#e74c3c')
        draw.polygon([(305, 340), (295, 335), (295, 345)], fill='#e74c3c')
        draw.text((200, 360), 'PANJANG', fill='#e74c3c', anchor='mm')
        
        # Tinggi arrow
        draw.line([70, 80, 70, 320], fill='#3498db', width=2)
        draw.polygon([(70, 75), (65, 85), (75, 85)], fill='#3498db')
        draw.polygon([(70, 325), (65, 315), (75, 315)], fill='#3498db')
        draw.text((70, 200), 'TINGGI', fill='#3498db', anchor='mm', angle=90)
        
        # Title
        draw.text((200, 20), 'BACKDROP PANEL', fill='#c0392b', anchor='mm')
        
        img.save('illustration_backdrop.png')
        print("✅ Backdrop illustration created")
    
    def create_credenza_illustration():
        """Ilustrasi Credenza"""
        img = Image.new('RGB', (450, 300), 'white')
        draw = ImageDraw.Draw(img)
        
        # Credenza (lebih pendek, lebih panjang)
        draw.rectangle([50, 150, 400, 250], outline='#2c3e50', width=3)
        draw.line([150, 150, 150, 250], fill='#2c3e50', width=1)
        draw.line([250, 150, 250, 250], fill='#2c3e50', width=1)
        draw.line([350, 150, 350, 250], fill='#2c3e50', width=1)
        
        # Panjang arrow
        draw.line([50, 270, 400, 270], fill='#e74c3c', width=2)
        draw.polygon([(45, 270), (55, 265), (55, 275)], fill='#e74c3c')
        draw.polygon([(405, 270), (395, 265), (395, 275)], fill='#e74c3c')
        draw.text((225, 285), 'PANJANG', fill='#e74c3c', anchor='mm')
        
        # Tinggi arrow
        draw.line([30, 150, 30, 250], fill='#3498db', width=2)
        draw.polygon([(30, 145), (25, 155), (35, 155)], fill='#3498db')
        draw.polygon([(30, 255), (25, 245), (35, 245)], fill='#3498db')
        draw.text((30, 200), 'TINGGI', fill='#3498db', anchor='mm', angle=90)
        
        # Tebal arrow
        draw.line([400, 150, 420, 130], fill='#27ae60', width=2)
        draw.polygon([(422, 128), (418, 133), (415, 126)], fill='#27ae60')
        draw.text((430, 120), 'TEBAL', fill='#27ae60', anchor='lm')
        
        # Title
        draw.text((225, 20), 'CREDENZA', fill='#c0392b', anchor='mm')
        
        img.save('illustration_credenza.png')
        print("✅ Credenza illustration created")
    
    def create_custom_illustration():
        """Ilustrasi Custom - 3D Box dengan X, Y, Z"""
        img = Image.new('RGB', (400, 400), 'white')
        draw = ImageDraw.Draw(img)
        
        # 3D Box
        # Front face
        draw.polygon([
            (100, 150), (300, 150), (300, 300), (100, 300)
        ], outline='#2c3e50', width=3)
        
        # Top face
        draw.polygon([
            (100, 150), (150, 100), (350, 100), (300, 150)
        ], outline='#2c3e50', width=3, fill='#ecf0f1')
        
        # Right face
        draw.polygon([
            (300, 150), (350, 100), (350, 250), (300, 300)
        ], outline='#2c3e50', width=3, fill='#d5dbdb')
        
        # Panjang (X axis) - horizontal bottom
        draw.line([100, 320, 300, 320], fill='#e74c3c', width=2)
        draw.polygon([(95, 320), (105, 315), (105, 325)], fill='#e74c3c')
        draw.polygon([(305, 320), (295, 315), (295, 325)], fill='#e74c3c')
        draw.text((200, 340), 'PANJANG (X)', fill='#e74c3c', anchor='mm')
        
        # Tinggi (Y axis) - vertical left
        draw.line([80, 150, 80, 300], fill='#3498db', width=2)
        draw.polygon([(80, 145), (75, 155), (85, 155)], fill='#3498db')
        draw.polygon([(80, 305), (75, 295), (85, 295)], fill='#3498db')
        draw.text((65, 225), 'TINGGI (Y)', fill='#3498db', anchor='mm', angle=90)
        
        # Lebar (Z axis) - diagonal
        draw.line([300, 150, 350, 100], fill='#27ae60', width=2)
        draw.polygon([(352, 98), (348, 103), (345, 96)], fill='#27ae60')
        draw.text((365, 85), 'LEBAR (Z)', fill='#27ae60', anchor='lm')
        
        # Title
        draw.text((200, 20), 'CUSTOM - 3 DIMENSI', fill='#c0392b', anchor='mm')
        draw.text((200, 50), 'Area X=(L×T) | Area Y=(P×T) | Area Z=(P×L)', fill='#7f8c8d', anchor='mm')
        
        img.save('illustration_custom.png')
        print("✅ Custom illustration created")
    
    # Create all illustrations
    create_kitchen_illustration()
    create_wardrobe_illustration()
    create_bed_illustration()
    create_backdrop_illustration()
    create_credenza_illustration()
    create_custom_illustration()
    
    print("\n✅ Semua ilustrasi berhasil dibuat!")
    print("Files: illustration_kitchen.png, illustration_wardrobe.png, illustration_bed.png,")
    print("       illustration_backdrop.png, illustration_credenza.png, illustration_custom.png")

except ImportError:
    print("❌ PIL/Pillow tidak terinstall.")
    print("Install dengan: pip install pillow")
except Exception as e:
    print(f"❌ Error: {e}")
