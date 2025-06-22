// Screenshot Resizer Pro - Main Application Logic

class ScreenshotResizerApp {
    constructor() {
        this.currentLanguage = 'en';
        this.currentPlatform = 'ios';
        this.selectedSizes = [];
        this.uploadedFiles = [];
        this.processedImages = [];
        
        this.data = {
            "platforms": {
                "ios": {
                    "name": "iOS App Store",
                    "categories": {
                        "iphone": {
                            "name": "iPhone",
                            "sizes": [
                                {"name": "iPhone 15 Pro Max", "width": 1320, "height": 2868, "orientation": "portrait"},
                                {"name": "iPhone 15 Pro Max", "width": 2868, "height": 1320, "orientation": "landscape"},
                                {"name": "iPhone 15 Pro", "width": 1290, "height": 2796, "orientation": "portrait"},
                                {"name": "iPhone 15 Pro", "width": 2796, "height": 1290, "orientation": "landscape"},
                                {"name": "iPhone 14/13/12 Pro", "width": 1170, "height": 2532, "orientation": "portrait"},
                                {"name": "iPhone 14/13/12 Pro", "width": 2532, "height": 1170, "orientation": "landscape"},
                                {"name": "iPhone SE", "width": 750, "height": 1334, "orientation": "portrait"},
                                {"name": "iPhone SE", "width": 1334, "height": 750, "orientation": "landscape"}
                            ]
                        },
                        "ipad": {
                            "name": "iPad",
                            "sizes": [
                                {"name": "iPad Pro (M4)", "width": 2064, "height": 2752, "orientation": "portrait"},
                                {"name": "iPad Pro (M4)", "width": 2752, "height": 2064, "orientation": "landscape"},
                                {"name": "iPad Pro (12.9\")", "width": 2048, "height": 2732, "orientation": "portrait"},
                                {"name": "iPad Pro (12.9\")", "width": 2732, "height": 2048, "orientation": "landscape"}
                            ]
                        }
                    }
                },
                "android": {
                    "name": "Android Google Play",
                    "categories": {
                        "phone": {
                            "name": "Phone",
                            "sizes": [
                                {"name": "Phone HD", "width": 720, "height": 1280, "orientation": "portrait"},
                                {"name": "Phone HD", "width": 1280, "height": 720, "orientation": "landscape"},
                                {"name": "Phone FHD", "width": 1080, "height": 1920, "orientation": "portrait"},
                                {"name": "Phone FHD", "width": 1920, "height": 1080, "orientation": "landscape"},
                                {"name": "Phone QHD", "width": 1440, "height": 2560, "orientation": "portrait"},
                                {"name": "Phone QHD", "width": 2560, "height": 1440, "orientation": "landscape"}
                            ]
                        },
                        "tablet": {
                            "name": "Tablet",
                            "sizes": [
                                {"name": "Tablet 7\"", "width": 800, "height": 1280, "orientation": "portrait"},
                                {"name": "Tablet 7\"", "width": 1280, "height": 800, "orientation": "landscape"},
                                {"name": "Tablet 10\"", "width": 1600, "height": 2560, "orientation": "portrait"},
                                {"name": "Tablet 10\"", "width": 2560, "height": 1600, "orientation": "landscape"}
                            ]
                        },
                        "wearos": {
                            "name": "Wear OS",
                            "sizes": [
                                {"name": "Wear OS", "width": 384, "height": 384, "orientation": "square"}
                            ]
                        }
                    }
                }
            },
            "translations": {
                "en": {
                    "appTitle": "Screenshot Resizer Pro",
                    "appDescription": "Resize your screenshots to App Store and Google Play standards",
                    "platformSelector": "Select Platform",
                    "uploadTitle": "Upload Screenshots",
                    "uploadDescription": "Drag and drop your images or click to select",
                    "supportedFormats": "Supported formats: JPG, PNG, WebP",
                    "selectSize": "Select Target Size",
                    "previewTitle": "Preview",
                    "downloadIndividual": "Download",
                    "downloadAll": "Download All (ZIP)",
                    "processing": "Processing...",
                    "noFiles": "No files selected",
                    "invalidFile": "Invalid file format",
                    "error": "An error occurred",
                    "success": "Images processed successfully",
                    "iphone": "iPhone",
                    "ipad": "iPad",
                    "phone": "Phone",
                    "tablet": "Tablet",
                    "wearos": "Wear OS",
                    "portrait": "Portrait",
                    "landscape": "Landscape",
                    "square": "Square"
                },
                "tr": {
                    "appTitle": "Ekran Görüntüsü Yeniden Boyutlandırıcı Pro",
                    "appDescription": "Ekran görüntülerinizi App Store ve Google Play standartlarına göre yeniden boyutlandırın",
                    "platformSelector": "Platform Seç",
                    "uploadTitle": "Ekran Görüntülerini Yükle",
                    "uploadDescription": "Görsellerinizi sürükleyip bırakın veya seçmek için tıklayın",
                    "supportedFormats": "Desteklenen formatlar: JPG, PNG, WebP",
                    "selectSize": "Hedef Boyut Seç",
                    "previewTitle": "Önizleme",
                    "downloadIndividual": "İndir",
                    "downloadAll": "Tümünü İndir (ZIP)",
                    "processing": "İşleniyor...",
                    "noFiles": "Dosya seçilmedi",
                    "invalidFile": "Geçersiz dosya formatı",
                    "error": "Bir hata oluştu",
                    "success": "Görseller başarıyla işlendi",
                    "iphone": "iPhone",
                    "ipad": "iPad",
                    "phone": "Telefon",
                    "tablet": "Tablet",
                    "wearos": "Wear OS",
                    "portrait": "Dikey",
                    "landscape": "Yatay",
                    "square": "Kare"
                }
            }
        };

        this.init();
    }

    init() {
        this.setupEventListeners();
        this.renderSizeOptions();
        this.updateLanguage();
    }

    setupEventListeners() {
        // Language selector
        document.getElementById('languageSelect').addEventListener('change', (e) => {
            this.currentLanguage = e.target.value;
            this.updateLanguage();
        });

        // Platform tabs
        document.querySelectorAll('.platform-tab').forEach(tab => {
            tab.addEventListener('click', (e) => {
                const platform = e.currentTarget.dataset.platform;
                this.switchPlatform(platform);
            });
        });

        // File upload
        const fileInput = document.getElementById('fileInput');
        const uploadArea = document.getElementById('uploadArea');

        fileInput.addEventListener('change', (e) => {
            this.handleFiles(e.target.files);
        });

        uploadArea.addEventListener('click', () => {
            fileInput.click();
        });

        // Drag and drop
        uploadArea.addEventListener('dragover', (e) => {
            e.preventDefault();
            uploadArea.classList.add('dragover');
        });

        uploadArea.addEventListener('dragleave', () => {
            uploadArea.classList.remove('dragover');
        });

        uploadArea.addEventListener('drop', (e) => {
            e.preventDefault();
            uploadArea.classList.remove('dragover');
            this.handleFiles(e.dataTransfer.files);
        });

        // Download all button
        document.getElementById('downloadAllBtn').addEventListener('click', () => {
            this.downloadAllAsZip();
        });
    }

    updateLanguage() {
        const t = this.data.translations[this.currentLanguage];
        
        // Update text elements
        document.getElementById('appTitle').textContent = t.appTitle;
        document.getElementById('appDescription').textContent = t.appDescription;
        document.getElementById('platformSelector').textContent = t.platformSelector;
        document.getElementById('uploadTitle').textContent = t.uploadTitle;
        document.getElementById('uploadDescription').textContent = t.uploadDescription;
        document.getElementById('supportedFormats').textContent = t.supportedFormats;
        document.getElementById('selectSize').textContent = t.selectSize;
        document.getElementById('previewTitle').textContent = t.previewTitle;
        document.getElementById('downloadAll').textContent = t.downloadAll;
        document.getElementById('processing').textContent = t.processing;

        // Update HTML title
        document.title = t.appTitle;

        // Re-render size options to update category names
        this.renderSizeOptions();
    }

    switchPlatform(platform) {
        this.currentPlatform = platform;
        
        // Update tab active state
        document.querySelectorAll('.platform-tab').forEach(tab => {
            tab.classList.remove('active');
        });
        document.querySelector(`[data-platform="${platform}"]`).classList.add('active');

        // Clear selected sizes and re-render
        this.selectedSizes = [];
        this.renderSizeOptions();
        this.updatePreview();
    }

    renderSizeOptions() {
        const container = document.getElementById('sizeCategories');
        const platform = this.data.platforms[this.currentPlatform];
        const t = this.data.translations[this.currentLanguage];
        
        container.innerHTML = '';

        Object.entries(platform.categories).forEach(([categoryKey, category]) => {
            const categoryDiv = document.createElement('div');
            categoryDiv.className = 'size-category';
            
            const categoryName = t[categoryKey] || category.name;
            
            categoryDiv.innerHTML = `
                <h4>${categoryName}</h4>
                <div class="size-options">
                    ${category.sizes.map((size, index) => `
                        <div class="size-option" data-category="${categoryKey}" data-index="${index}">
                            <div class="size-info">
                                <div class="size-name">${size.name}</div>
                                <div class="size-dimensions">${size.width} × ${size.height}px</div>
                            </div>
                            <div class="size-orientation">${t[size.orientation]}</div>
                        </div>
                    `).join('')}
                </div>
            `;

            container.appendChild(categoryDiv);
        });

        // Add click handlers for size options
        document.querySelectorAll('.size-option').forEach(option => {
            option.addEventListener('click', (e) => {
                this.toggleSizeSelection(e.currentTarget);
            });
        });
    }

    toggleSizeSelection(element) {
        const category = element.dataset.category;
        const index = parseInt(element.dataset.index);
        const sizeData = this.data.platforms[this.currentPlatform].categories[category].sizes[index];
        
        const sizeId = `${category}-${index}`;
        const existingIndex = this.selectedSizes.findIndex(s => s.id === sizeId);

        if (existingIndex >= 0) {
            // Remove selection
            this.selectedSizes.splice(existingIndex, 1);
            element.classList.remove('selected');
        } else {
            // Add selection
            this.selectedSizes.push({
                id: sizeId,
                ...sizeData,
                category
            });
            element.classList.add('selected');
        }

        this.updatePreview();
    }

    handleFiles(files) {
        const validFiles = Array.from(files).filter(file => {
            return file.type.startsWith('image/');
        });

        if (validFiles.length === 0) {
            alert(this.data.translations[this.currentLanguage].invalidFile);
            return;
        }

        this.uploadedFiles = validFiles;
        this.updatePreview();
    }

    async updatePreview() {
        const previewSection = document.getElementById('previewSection');
        const previewGrid = document.getElementById('previewGrid');

        if (this.uploadedFiles.length === 0 || this.selectedSizes.length === 0) {
            previewSection.style.display = 'none';
            return;
        }

        previewSection.style.display = 'block';
        previewGrid.innerHTML = '';

        const t = this.data.translations[this.currentLanguage];

        for (const file of this.uploadedFiles) {
            for (const size of this.selectedSizes) {
                const previewItem = document.createElement('div');
                previewItem.className = 'preview-item';
                
                previewItem.innerHTML = `
                    <div class="preview-header">
                        <div class="preview-info">
                            <h4>${file.name} - ${size.name}</h4>
                            <p>${size.width} × ${size.height}px (${t[size.orientation]})</p>
                        </div>
                        <div class="preview-actions">
                            <button class="btn btn--sm btn--primary download-btn" data-file="${file.name}" data-size-id="${size.id}">
                                ${t.downloadIndividual}
                            </button>
                        </div>
                    </div>
                    <div class="preview-image-container">
                        <canvas class="preview-image" width="${Math.min(size.width, 268)}" height="${Math.min(size.height, 180)}"></canvas>
                    </div>
                `;

                previewGrid.appendChild(previewItem);

                // Render preview image
                const canvas = previewItem.querySelector('canvas');
                await this.renderPreviewImage(file, size, canvas);

                // Add download handler
                const downloadBtn = previewItem.querySelector('.download-btn');
                downloadBtn.addEventListener('click', () => {
                    this.downloadSingleImage(file, size);
                });
            }
        }
    }

    async renderPreviewImage(file, size, canvas) {
        return new Promise((resolve) => {
            const img = new Image();
            img.onload = () => {
                const ctx = canvas.getContext('2d');
                const canvasWidth = canvas.width;
                const canvasHeight = canvas.height;
                
                // Calculate aspect ratios
                const imgAspect = img.width / img.height;
                const canvasAspect = canvasWidth / canvasHeight;
                
                let drawWidth, drawHeight, x, y;
                
                if (imgAspect > canvasAspect) {
                    drawWidth = canvasWidth;
                    drawHeight = canvasWidth / imgAspect;
                    x = 0;
                    y = (canvasHeight - drawHeight) / 2;
                } else {
                    drawHeight = canvasHeight;
                    drawWidth = canvasHeight * imgAspect;
                    x = (canvasWidth - drawWidth) / 2;
                    y = 0;
                }
                
                ctx.fillStyle = '#f0f0f0';
                ctx.fillRect(0, 0, canvasWidth, canvasHeight);
                ctx.drawImage(img, x, y, drawWidth, drawHeight);
                resolve();
            };
            img.src = URL.createObjectURL(file);
        });
    }

    async resizeImage(file, targetWidth, targetHeight) {
        return new Promise((resolve) => {
            const img = new Image();
            img.onload = () => {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                
                canvas.width = targetWidth;
                canvas.height = targetHeight;
                
                // Fill with white background
                ctx.fillStyle = '#ffffff';
                ctx.fillRect(0, 0, targetWidth, targetHeight);
                
                // Calculate scaling to fit image while maintaining aspect ratio
                const scale = Math.min(targetWidth / img.width, targetHeight / img.height);
                const scaledWidth = img.width * scale;
                const scaledHeight = img.height * scale;
                
                // Center the image
                const x = (targetWidth - scaledWidth) / 2;
                const y = (targetHeight - scaledHeight) / 2;
                
                ctx.drawImage(img, x, y, scaledWidth, scaledHeight);
                
                canvas.toBlob(resolve, 'image/png');
            };
            img.src = URL.createObjectURL(file);
        });
    }

    async downloadSingleImage(file, size) {
        try {
            const resizedBlob = await this.resizeImage(file, size.width, size.height);
            const url = URL.createObjectURL(resizedBlob);
            
            const a = document.createElement('a');
            a.href = url;
            a.download = `${file.name.split('.')[0]}_${size.name.replace(/[^a-zA-Z0-9]/g, '_')}_${size.width}x${size.height}.png`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Error downloading image:', error);
            alert(this.data.translations[this.currentLanguage].error);
        }
    }

    async downloadAllAsZip() {
        if (this.uploadedFiles.length === 0 || this.selectedSizes.length === 0) {
            alert(this.data.translations[this.currentLanguage].noFiles);
            return;
        }

        const processingOverlay = document.getElementById('processingOverlay');
        processingOverlay.style.display = 'flex';

        try {
            const zip = new JSZip();
            
            for (const file of this.uploadedFiles) {
                for (const size of this.selectedSizes) {
                    const resizedBlob = await this.resizeImage(file, size.width, size.height);
                    const fileName = `${file.name.split('.')[0]}_${size.name.replace(/[^a-zA-Z0-9]/g, '_')}_${size.width}x${size.height}.png`;
                    zip.file(fileName, resizedBlob);
                }
            }

            const zipBlob = await zip.generateAsync({type: 'blob'});
            const url = URL.createObjectURL(zipBlob);
            
            const a = document.createElement('a');
            a.href = url;
            a.download = `screenshots_resized_${Date.now()}.zip`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);

        } catch (error) {
            console.error('Error creating ZIP:', error);
            alert(this.data.translations[this.currentLanguage].error);
        } finally {
            processingOverlay.style.display = 'none';
        }
    }
}

// Initialize the application when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ScreenshotResizerApp();
});