# Mevcut HTML dosyasını okuyup içeriğini kontrol edelim
try:
    with open("Adsiz.html", "r", encoding="utf-8") as file:
        html_content = file.read()
    
    print("HTML dosyası bulundu. İçerik uzunluğu:", len(html_content))
    
    # İlk 1000 karakteri gösterelim
    print("\n--- İlk 1000 karakter ---")
    print(html_content[:1000])
    
    # CSS stillerini kontrol edelim
    if "<style>" in html_content:
        style_start = html_content.find("<style>")
        style_end = html_content.find("</style>") + len("</style>")
        css_content = html_content[style_start:style_end]
        print("\n--- CSS İçeriği ---")
        print(css_content[:500])  # İlk 500 karakteri göster
    
except FileNotFoundError:
    print("HTML dosyası bulunamadı.")
except Exception as e:
    print(f"Hata: {e}")