export async function init(container) {
    container.innerHTML = `
        <style>
            .at-card {
                max-width: 680px;
                margin: 20px auto;
                padding: 24px;
                background: #ffffff;
                border-radius: 14px;
                box-shadow: 0 10px 30px rgba(15, 23, 42, 0.12);
                font-family: system-ui, -apple-system, sans-serif;
                color: #1e293b;
            }
            .at-card h3 {
                text-align: center;
                margin: 0 0 20px;
                font-size: 22px;
                color: #4c1d95;
            }
            .at-grid-2 {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
                gap: 14px;
                margin-bottom: 14px;
            }
            .at-grid-3 {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
                gap: 12px;
                margin-bottom: 14px;
            }
            .at-box {
                background: #f8fafc;
                border: 1px solid #e2e8f0;
                border-radius: 10px;
                padding: 12px;
            }
            .at-box label {
                display: block;
                font-size: 13px;
                font-weight: 600;
                color: #334155;
                margin-bottom: 6px;
            }
            .at-box input[type="file"],
            .at-box input[type="text"],
            .at-box input[type="number"],
            .at-box input[type="color"],
            .at-box select {
                width: 100%;
                padding: 8px 10px;
                border: 1px solid #cbd5e1;
                border-radius: 7px;
                background: #fff;
                font-size: 14px;
                box-sizing: border-box;
            }
            .at-box input[type="color"] {
                height: 38px;
                padding: 3px;
                cursor: pointer;
            }
            .at-hint {
                font-size: 11.5px;
                color: #64748b;
                margin-top: 4px;
            }
            .at-btn {
                width: 100%;
                padding: 13px 18px;
                background: #7c3aed;
                color: #ffffff;
                border: none;
                border-radius: 9px;
                font-size: 16px;
                font-weight: 700;
                cursor: pointer;
                transition: background 0.2s ease, transform 0.1s ease;
            }
            .at-btn:hover {
                background: #6d28d9;
            }
            .at-btn:active {
                transform: scale(0.99);
            }
            .at-preview-wrap {
                margin-top: 22px;
                padding-top: 18px;
                border-top: 1px solid #e2e8f0;
                display: none;
                text-align: center;
            }
            .at-preview-wrap h4 {
                margin: 0 0 12px;
                font-size: 16px;
                color: #0f172a;
            }
            #atPreviewImg {
                max-width: 100%;
                max-height: 400px;
                border-radius: 8px;
                border: 1px solid #cbd5e1;
                background: #f1f5f9;
            }
            .at-stats {
                margin-top: 10px;
                font-size: 13.5px;
                font-weight: 600;
                color: #334155;
            }
            .at-dl-btn {
                margin-top: 12px;
                padding: 10px 18px;
                background: #059669;
                color: #fff;
                border: none;
                border-radius: 8px;
                font-size: 14px;
                font-weight: 600;
                cursor: pointer;
            }
            .at-dl-btn:hover {
                background: #047857;
            }
        </style>

        <div class="at-card">
            <h3>फोटो पर टेक्स्ट जोड़ें</h3>

            <div class="at-grid-2">
                <div class="at-box">
                    <label for="textImageInput">फोटो चुनें</label>
                    <input type="file" id="textImageInput" accept="image/*">
                    <div class="at-hint">JPG, PNG, WEBP समर्थित</div>
                </div>
                <div class="at-box">
                    <label for="imageText">अपना टेक्स्ट लिखें</label>
                    <input type="text" id="imageText" placeholder="यहाँ टेक्स्ट लिखें...">
                    <div class="at-hint">हिंदी या अंग्रेज़ी टेक्स्ट समर्थित</div>
                </div>
            </div>

            <div class="at-grid-3">
                <div class="at-box">
                    <label for="textPosition">टेक्स्ट की स्थिति</label>
                    <select id="textPosition">
                        <option value="bottom" selected>नीचे (Bottom)</option>
                        <option value="center">बीच में (Center)</option>
                        <option value="top">ऊपर (Top)</option>
                    </select>
                </div>
                <div class="at-box">
                    <label for="textSizeScale">फ़ॉन्ट आकार (%)</label>
                    <input type="number" id="textSizeScale" value="6" min="2" max="25">
                    <div class="at-hint">इमेज चौड़ाई के अनुसार</div>
                </div>
                <div class="at-box">
                    <label for="targetKb">टारगेट साइज़ (KB)</label>
                    <input type="number" id="targetKb" value="250" min="10" max="5000">
                    <div class="at-hint">ऑटो-कंप्रेशन सीमा</div>
                </div>
            </div>

            <div class="at-grid-3">
                <div class="at-box">
                    <label for="textColor">टेक्स्ट का रंग</label>
                    <input type="color" id="textColor" value="#ffffff">
                </div>
                <div class="at-box">
                    <label for="outlineColor">बॉर्डर / आउटलाइन रंग</label>
                    <input type="color" id="outlineColor" value="#000000">
                </div>
                <div class="at-box">
                    <label for="showBanner">बैकग्राउंड पट्टी</label>
                    <select id="showBanner">
                        <option value="none" selected>केवल टेक्स्ट + आउटलाइन</option>
                        <option value="dark">हल्की काली पट्टी</option>
                        <option value="light">हल्की सफ़ेद पट्टी</option>
                    </select>
                </div>
            </div>

            <button type="button" id="applyTextBtn" class="at-btn">टेक्स्ट लगाएँ और डाउनलोड करें</button>
            <canvas id="textCanvas" style="display:none;"></canvas>

            <div class="at-preview-wrap" id="atPreviewWrap">
                <h4>लाइव प्रीव्यू</h4>
                <img id="atPreviewImg" alt="Image with Text">
                <div class="at-stats" id="atStats"></div>
                <button type="button" class="at-dl-btn" id="atManualDownload">दोबारा डाउनलोड करें</button>
            </div>
        </div>
    `;

    const loadImage = (file) => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (ev) => {
            const img = new Image();
            img.onload = () => resolve(img);
            img.onerror = reject;
            img.src = ev.target.result;
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });

    const getBase64SizeKb = (dataUrl) => {
        const base64 = dataUrl.split(',')[1] || '';
        const padding = (base64.endsWith('==') ? 2 : base64.endsWith('=') ? 1 : 0);
        return ((base64.length * 3) / 4 - padding) / 1024;
    };

    const triggerDownload = (dataUrl, filename) => {
        const link = document.createElement('a');
        link.href = dataUrl;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const wrapLines = (ctx, text, maxWidth) => {
        const words = text.split(/\s+/).filter(Boolean);
        if (words.length === 0) return [text];
        const lines = [];
        let current = words[0];

        for (let i = 1; i < words.length; i++) {
            const candidate = `${current} ${words[i]}`;
            if (ctx.measureText(candidate).width <= maxWidth) {
                current = candidate;
            } else {
                lines.push(current);
                current = words[i];
            }
        }
        lines.push(current);
        return lines;
    };

    let lastDataUrl = '';
    let lastFileName = 'text_image.jpg';

    document.getElementById('applyTextBtn').onclick = async () => {
        const fileInput = document.getElementById('textImageInput');
        const textVal = (document.getElementById('imageText').value || '').trim();

        if (!fileInput.files || !fileInput.files[0]) {
            alert('कृपया पहले एक फोटो चुनें।');
            return;
        }
        if (!textVal) {
            alert('कृपया फोटो पर लगाने के लिए टेक्स्ट लिखें।');
            return;
        }

        const position = document.getElementById('textPosition').value;
        const sizeScale = Math.max(2, Math.min(25, parseInt(document.getElementById('textSizeScale').value, 10) || 6));
        const targetKb = Math.max(10, parseInt(document.getElementById('targetKb').value, 10) || 250);
        const textColor = document.getElementById('textColor').value || '#ffffff';
        const outlineColor = document.getElementById('outlineColor').value || '#000000';
        const bannerMode = document.getElementById('showBanner').value;

        try {
            const img = await loadImage(fileInput.files[0]);
            const canvas = document.getElementById('textCanvas');
            canvas.width = img.width;
            canvas.height = img.height;

            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

            const fontSize = Math.max(16, Math.round((canvas.width * sizeScale) / 100));
            const lineHeight = Math.round(fontSize * 1.28);
            const sidePad = Math.round(canvas.width * 0.05);
            const maxTextWidth = Math.max(40, canvas.width - sidePad * 2);

            ctx.font = `bold ${fontSize}px system-ui, -apple-system, "Noto Sans Devanagari", sans-serif`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';

            const lines = wrapLines(ctx, textVal, maxTextWidth);
            const totalTextHeight = lines.length * lineHeight;

            let startY;
            if (position === 'top') {
                startY = sidePad + lineHeight / 2;
            } else if (position === 'center') {
                startY = (canvas.height - totalTextHeight) / 2 + lineHeight / 2;
            } else {
                startY = canvas.height - sidePad - totalTextHeight + lineHeight / 2;
            }

            if (bannerMode === 'dark' || bannerMode === 'light') {
                const bandPad = Math.round(lineHeight * 0.35);
                const bandY = startY - lineHeight / 2 - bandPad;
                const bandH = totalTextHeight + bandPad * 2;
                ctx.fillStyle = bannerMode === 'dark' ? 'rgba(0, 0, 0, 0.55)' : 'rgba(255, 255, 255, 0.72)';
                ctx.fillRect(0, bandY, canvas.width, bandH);
            }

            const centerX = canvas.width / 2;
            lines.forEach((line, idx) => {
                const y = startY + idx * lineHeight;
                ctx.lineWidth = Math.max(2, Math.round(fontSize * 0.12));
                ctx.strokeStyle = outlineColor;
                ctx.lineJoin = 'round';
                ctx.strokeText(line, centerX, y);

                ctx.fillStyle = textColor;
                ctx.fillText(line, centerX, y);
            });

            let quality = 0.92;
            let dataUrl = canvas.toDataURL('image/jpeg', quality);

            while (getBase64SizeKb(dataUrl) > targetKb && quality > 0.1) {
                quality = Math.max(0.1, +(quality - 0.05).toFixed(2));
                dataUrl = canvas.toDataURL('image/jpeg', quality);
            }

            const finalKb = getBase64SizeKb(dataUrl).toFixed(1);
            lastDataUrl = dataUrl;
            lastFileName = `text_added_${Date.now()}.jpg`;

            const previewWrap = document.getElementById('atPreviewWrap');
            const previewImg = document.getElementById('atPreviewImg');
            const statsEl = document.getElementById('atStats');

            previewImg.src = dataUrl;
            statsEl.textContent = `डाइमेंशन: ${canvas.width}×${canvas.height} px | साइज़: ${finalKb} KB (क्वालिटी: ${Math.round(quality * 100)}%)`;
            previewWrap.style.display = 'block';

            triggerDownload(lastDataUrl, lastFileName);
        } catch (err) {
            alert('फोटो पर टेक्स्ट जोड़ने में समस्या आई। कृपया दूसरी इमेज आज़माएँ।');
        }
    };

    document.getElementById('atManualDownload').onclick = () => {
        if (lastDataUrl) {
            triggerDownload(lastDataUrl, lastFileName);
        }
    };
}
