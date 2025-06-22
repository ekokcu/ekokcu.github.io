# HTML dosyasının tamamını analiz edelim
with open("Adsiz.html", "r", encoding="utf-8") as file:
    html_content = file.read()

# JavaScript bölümünü bulalım
js_start = html_content.find("<script>")
if js_start != -1:
    js_end = html_content.find("</script>", js_start)
    js_content = html_content[js_start:js_end]
    print("JavaScript bölümü bulundu:", len(js_content), "karakter")
    print("\n--- JavaScript İçeriği (ilk 1000 karakter) ---")
    print(js_content[:1000])

# Mevcut boyutları kontrol edelim
import re
size_pattern = r'\d+\s*×\s*\d+px'
sizes = re.findall(size_pattern, html_content)
print(f"\n--- Mevcut Boyutlar ---")
for size in sizes:
    print(size)
    
# Emoji kontrolü
emoji_pattern = r'📱'
emojis = re.findall(emoji_pattern, html_content)
print(f"\n--- Emoji Kullanımı ---")
print(f"📱 emoji sayısı: {len(emojis)}")

# Renk kontrolü
color_pattern = r'#[0-9a-fA-F]{6}|#[0-9a-fA-F]{3}'
colors = re.findall(color_pattern, html_content)
print(f"\n--- Renk Kodları ---")
for color in set(colors):
    print(color)