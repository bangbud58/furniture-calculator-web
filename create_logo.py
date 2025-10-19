"""
Script untuk membuat logo EPD (PT. Enigma Prisma Delapan)
Logo simple dengan text 'EPD' di background merah
"""
try:
    from PIL import Image, ImageDraw, ImageFont
    
    # Create image
    width, height = 200, 200
    img = Image.new('RGB', (width, height), color='#c0392b')
    
    # Draw
    draw = ImageDraw.Draw(img)
    
    # Try to use a nice font, fallback to default
    try:
        font = ImageFont.truetype("arial.ttf", 80)
    except:
        font = ImageFont.load_default()
    
    # Draw text "EPD" in center
    text = "EPD"
    
    # Get text bounding box for centering
    bbox = draw.textbbox((0, 0), text, font=font)
    text_width = bbox[2] - bbox[0]
    text_height = bbox[3] - bbox[1]
    
    x = (width - text_width) // 2
    y = (height - text_height) // 2 - 10
    
    draw.text((x, y), text, fill='white', font=font)
    
    # Save
    img.save('logo_epd.png')
    print("✅ Logo berhasil dibuat: logo_epd.png")
    
except ImportError:
    print("⚠️ PIL/Pillow tidak terinstall. Logo text sudah cukup.")
    print("Jika ingin logo image, install: pip install pillow")
