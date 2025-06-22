# HTML dosyasının tam yapısını inceleyelim
with open("Adsiz.html", "r", encoding="utf-8") as file:
    html_content = file.read()

# Header bölümünü bulalım
header_start = html_content.find('<div class="header">')
header_end = html_content.find('</div>', header_start) + 6
header_content = html_content[header_start:header_end]
print("--- Header Bölümü ---")
print(header_content)

# iPhone boyutları bölümünü bulalım
iphone_start = html_content.find('<div class="category-section">')
if iphone_start != -1:
    # İkinci category-section'ı bulalım (iPad için)
    second_category = html_content.find('<div class="category-section">', iphone_start + 1)
    if second_category != -1:
        iphone_content = html_content[iphone_start:second_category]
    else:
        iphone_content = html_content[iphone_start:iphone_start+1000]
    
    print("\n--- iPhone Boyutları Bölümü ---")
    print(iphone_content[:800])

# Mevcut fonksiyonları bulalım
function_pattern = r'function\s+(\w+)\s*\('
functions = re.findall(function_pattern, html_content)
print(f"\n--- JavaScript Fonksiyonları ---")
for func in functions:
    print(f"- {func}()")
    
# Boyut seçeneklerini bulalım
option_pattern = r'onclick="selectDimension\((\d+),\s*(\d+)\)"'
dimensions = re.findall(option_pattern, html_content)
print(f"\n--- Mevcut Boyut Seçenekleri ---")
for width, height in dimensions:
    print(f"{width} × {height} px")