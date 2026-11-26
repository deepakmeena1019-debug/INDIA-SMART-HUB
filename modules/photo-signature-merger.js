export async function init(container) {
    container.innerHTML = `
        <style>
            .psm-card {
                max-width: 680px;
                margin: 20px auto;
                padding: 24px;
                background: #ffffff;
                border-radius: 14px;
                box-shadow: 0 10px 30px rgba(15, 23, 42, 0.12);
                font-family: system-ui, -apple-system, sans-serif;
                color: #1e293b;
            }
            .psm-card h3 {
                text-align: center;
                margin: 0 0 20px;
                font-size: 22px;
                color: #4c1d95;
            }
            .psm-grid-2 {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
                gap: 14px;
                margin-bottom: 16px;
            }
            .psm-grid-3 {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
                gap: 12px;
                margin-bottom: 16px;
            }
            .psm-box {
                background: #f8fafc;
                border: 1px solid #e2e8f0;
                border-radius: 10px;
                padding: 12px;
            }
            .psm-box label {
                display: block;
                font-size: 13px;
                font-weight: 600;
                color: #334155;
                margin-bottom: 6px;
            }
            .psm-box input[type="file"],
            .psm-box input[type="number"],
            .psm-box input[type="color"],
            .psm-box select {
                width: 100%;
                padding: 8px 10px;
                border: 1px solid #cbd5e1;
                border-radius: 7px;
                background: #fff;
                font-size: 14px;
                box-sizing: border-box;
            }
            .psm-box input[type="color"] {
                height: 38px;
                padding: 3px;
                cursor: pointer;
            }
            .psm-hint {
                font-size: 11.5px;
                color: #64748b;
                margin-top: 4px;
            }
            .psm-btn {
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
            .psm-btn:hover {
                background: #6d28d9;
            }
            .psm-btn:active {
                transform: scale(0.99);
            }
            .psm-preview-wrap {
                margin-top: 22px;
                padding-top: 18px;
                border-top: 1px solid #e2e8f0;
                display: none;
                text-align: center;
            }
            .psm-preview-wrap h4 {
                margin: 0 0 12px;
                font-size: 16px;
                color: #0f172a;
            }
            #psmPreviewImg {
                max-width: 100%;
                max-height: 380px;
                border-radius: 8px;
                border: 1px solid #cbd5e1;
                background: #f1f5f9;
            }
            .psm-stats {
                margin-top: 10px;
                font-size: 13.5px;
                font-weight: 600;
                color: #334155;
            }
            .psm-dl-btn {
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
            .psm-dl-btn:hover {
                background: #047857;
            }
        </style>

        <div class="psm-card">
            <h3>फोटो और सिग्नेचर मर्जर</h3>

            <div class="psm-grid-2">
                <div class="psm-box">
                    <label for="photoInput">फोटो चुनें</label>
                    <input type="file" id="photoInput" accept="image/*">
                    <div class="psm-hint">JPG, PNG, WEBP समर्थित</div>
                </div>
                <div class="psm-box">
                    <label for="sigInput">सिग्नेचर चुनें</label>
                    <input type="file" id="sigInput" accept="image/*">
                    <div class="psm-hint">ट्रांसपेरेंट PNG भी ऑटो-सपोर्टेड</div>
                </div>
            </div>

            <div class="psm-grid-3">
                <div class="psm-box">
                    <label for="layoutMode">लेआउट चुनें</label>
                    <select id="layoutMode">
                        <option value="vertical" selected>ऊपर फोटो, नीचे सिग्नेचर</option>
                        <option value="horizontal">अगल-बगल (फोटो बाएँ, सिग्नेचर दाएँ)</option>
                    </select>
                </div>
                <div class="psm-box">
                    <label for="outWidth">कुल चौड़ाई (px)</label>
                    <input type="number" id="outWidth" value="600" min="100" max="4000">
                </div>
                <div class="psm-box">
                    <label for="outHeight">कुल ऊँचाई (px)</label>
                    <input type="number" id="outHeight" value="750" min="100" max="4000">
                </div>
            </div>

            <div class="psm-grid-3">
                <div class="psm-box">
                    <label for="bgColor">बैकग्राउंड रंग</label>
                    <input type="color" id="bgColor" value="#ffffff">
                </div>
                <div class="psm-box">
                    <label for="borderWidth">बॉर्डर मोटाई (px)</label>
                    <input type="number" id="borderWidth" value="2" min="0" max="30">
                </div>
                <div class="psm-box">
                    <label for="targetKb">टारगेट साइज़ (KB)</label>
                    <input type="number" id="targetKb" value="100" min="5" max="5000">
                    <div class="psm-hint">इस सीमा के अंदर रखने का प्रयास</div>
                </div>
            </div>

            <button id="mergePhotosBtn" class="psm-btn">मर्ज, कंप्रेस और डाउनलोड करें</button>
            <canvas id="mergedCanvas" style="display:none;"></canvas>

            <div class="psm-preview-wrap" id="psmPreviewWrap">
                <h4>लाइव प्रीव्यू</h4>
                <img id="psmPreviewImg" alt="Merged Photo and Signature">
                <div class="psm-stats" id="psmStats"></div>
                <button type="button" class="psm-dl-btn" id="psmManualDownload">दोबारा डाउनलोड करें</button>
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

    const drawContain = (ctx, img, x, y, w, h, pad = 8) => {
        const availW = Math.max(10, w - pad * 2);
        const availH = Math.max(10, h - pad * 2);
        const scale = Math.min(availW / img.width, availH / img.height);
        const drawW = Math.round(img.width * scale);
        const drawH = Math.round(img.height * scale);
        const drawX = Math.round(x + (w - drawW) / 2);
        const drawY = Math.round(y + (h - drawH) / 2);
        ctx.drawImage(img, drawX, drawY, drawW, drawH);
    };

    const triggerDownload = (dataUrl, filename) => {
        const link = document.createElement('a');
        link.href = dataUrl;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    let lastDataUrl = '';
    let lastFileName = 'photo_signature_merged.jpg';

    document.getElementById('mergePhotosBtn').onclick = async () => {
        const photoFile = document.getElementById('photoInput').files[0];
        const sigFile = document.getElementById('sigInput').files[0];

        if (!photoFile || !sigFile) {
            alert('कृपया फोटो और सिग्नेचर दोनों फाइलें चुनें।');
            return;
        }

        const layout = document.getElementById('layoutMode').value;
        const totalW = parseInt(document.getElementById('outWidth').value, 10) || 600;
        const totalH = parseInt(document.getElementById('outHeight').value, 10) || 750;
        const bgColor = document.getElementById('bgColor').value || '#ffffff';
        const borderW = Math.max(0, parseInt(document.getElementById('borderWidth').value, 10) || 0);
        const targetKb = Math.max(5, parseInt(document.getElementById('targetKb').value, 10) || 100);

        try {
            const [photoImg, sigImg] = await Promise.all([loadImage(photoFile), loadImage(sigFile)]);
            const canvas = document.getElementById('mergedCanvas');
            canvas.width = totalW;
            canvas.height = totalH;

            const ctx = canvas.getContext('2d');
            ctx.fillStyle = bgColor;
            ctx.fillRect(0, 0, totalW, totalH);

            const innerX = borderW;
            const innerY = borderW;
            const innerW = Math.max(20, totalW - borderW * 2);
            const innerH = Math.max(20, totalH - borderW * 2);

            if (layout === 'horizontal') {
                const photoBoxW = Math.round(innerW * 0.62);
                const sigBoxW = innerW - photoBoxW;
                drawContain(ctx, photoImg, innerX, innerY, photoBoxW, innerH, 10);
                drawContain(ctx, sigImg, innerX + photoBoxW, innerY, sigBoxW, innerH, 10);

                // Divider line between photo and signature
                ctx.strokeStyle = '#cbd5e1';
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(innerX + photoBoxW, innerY + 10);
                ctx.lineTo(innerX + photoBoxW, innerY + innerH - 10);
                ctx.stroke();
            } else {
                const photoBoxH = Math.round(innerH * 0.75);
                const sigBoxH = innerH - photoBoxH;
                drawContain(ctx, photoImg, innerX, innerY, innerW, photoBoxH, 10);
                drawContain(ctx, sigImg, innerX, innerY + photoBoxH, innerW, sigBoxH, 10);

                // Divider line between photo and signature
                ctx.strokeStyle = '#cbd5e1';
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(innerX + 10, innerY + photoBoxH);
                ctx.lineTo(innerX + innerW - 10, innerY + photoBoxH);
                ctx.stroke();
            }

            if (borderW > 0) {
                ctx.strokeStyle = '#334155';
                ctx.lineWidth = borderW;
                ctx.strokeRect(borderW / 2, borderW / 2, totalW - borderW, totalH - borderW);
            }

            // Compress iteratively towards target KB
            let quality = 0.92;
            let dataUrl = canvas.toDataURL('image/jpeg', quality);

            while (getBase64SizeKb(dataUrl) > targetKb && quality > 0.1) {
                quality = Math.max(0.1, +(quality - 0.05).toFixed(2));
                dataUrl = canvas.toDataURL('image/jpeg', quality);
            }

            const finalKb = getBase64SizeKb(dataUrl).toFixed(1);
            lastDataUrl = dataUrl;
            lastFileName = `photo_signature_${totalW}x${totalH}.jpg`;

            const previewWrap = document.getElementById('psmPreviewWrap');
            const previewImg = document.getElementById('psmPreviewImg');
            const statsEl = document.getElementById('psmStats');

            previewImg.src = dataUrl;
            statsEl.textContent = `डाइमेंशन: ${totalW}×${totalH} px | साइज़: ${finalKb} KB (क्वालिटी: ${Math.round(quality * 100)}%)`;
            previewWrap.style.display = 'block';

            triggerDownload(lastDataUrl, lastFileName);
        } catch (err) {
            alert('फोटो या सिग्नेचर प्रोसेस करने में समस्या आई। कृपया दूसरी इमेज आज़माएँ।');
        }
    };

    document.getElementById('psmManualDownload').onclick = () => {
        if (lastDataUrl) {
            triggerDownload(lastDataUrl, lastFileName);
        }
    };
                               }
