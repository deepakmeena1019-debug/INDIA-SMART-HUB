export async function init(container) {
    container.innerHTML = `
        <style>
            .ir-card {
                max-width: 760px;
                margin: 20px auto;
                padding: 24px;
                background: #ffffff;
                border-radius: 16px;
                box-shadow: 0 12px 32px rgba(15, 23, 42, 0.14);
                font-family: system-ui, -apple-system, sans-serif;
                color: #1e293b;
            }
            .ir-header {
                text-align: center;
                margin-bottom: 20px;
            }
            .ir-header h3 {
                margin: 0;
                font-size: 23px;
                color: #4c1d95;
            }
            .ir-header p {
                margin: 4px 0 0;
                font-size: 13px;
                color: #64748b;
            }
            .ir-grid-2 {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
                gap: 12px;
                margin-bottom: 14px;
            }
            .ir-grid-3 {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(155px, 1fr));
                gap: 12px;
                margin-bottom: 14px;
            }
            .ir-box {
                background: #f8fafc;
                border: 1px solid #e2e8f0;
                border-radius: 10px;
                padding: 12px;
            }
            .ir-box label {
                display: block;
                font-size: 12.5px;
                font-weight: 700;
                color: #334155;
                margin-bottom: 6px;
            }
            .ir-box input[type="file"],
            .ir-box input[type="number"],
            .ir-box input[type="range"],
            .ir-box input[type="color"],
            .ir-box select {
                width: 100%;
                padding: 7px 9px;
                border: 1px solid #cbd5e1;
                border-radius: 7px;
                background: #ffffff;
                font-size: 13.5px;
                box-sizing: border-box;
            }
            .ir-box input[type="range"] {
                padding: 4px 0;
                border: none;
                background: transparent;
                cursor: pointer;
            }
            .ir-box input[type="color"] {
                height: 36px;
                padding: 3px;
                cursor: pointer;
            }
            .ir-check-row {
                display: flex;
                align-items: center;
                gap: 6px;
                margin-top: 6px;
                font-size: 12px;
                color: #475569;
            }
            .ir-hint {
                font-size: 11px;
                color: #64748b;
                margin-top: 4px;
            }
            .ir-btn-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));
                gap: 9px;
                margin-bottom: 14px;
            }
            .ir-btn {
                padding: 10px 12px;
                background: #8b5cf6;
                color: #ffffff;
                border: none;
                border-radius: 8px;
                font-size: 13px;
                font-weight: 600;
                cursor: pointer;
                transition: background 0.18s ease, transform 0.1s ease;
            }
            .ir-btn:hover {
                background: #7c3aed;
            }
            .ir-btn:active {
                transform: scale(0.98);
            }
            .ir-btn-alt {
                background: #4f46e5;
            }
            .ir-btn-alt:hover {
                background: #4338ca;
            }
            .ir-btn-reset {
                background: #475569;
            }
            .ir-btn-reset:hover {
                background: #334155;
            }
            .ir-dl-btn {
                width: 100%;
                padding: 14px 18px;
                background: #059669;
                color: #ffffff;
                border: none;
                border-radius: 10px;
                font-size: 16px;
                font-weight: 700;
                cursor: pointer;
                transition: background 0.2s ease;
            }
            .ir-dl-btn:hover {
                background: #047857;
            }
            .ir-preview-wrap {
                margin-top: 20px;
                padding-top: 16px;
                border-top: 1px solid #e2e8f0;
                text-align: center;
            }
            #irCanvas {
                max-width: 100%;
                max-height: 440px;
                border: 1px solid #cbd5e1;
                border-radius: 10px;
                display: none;
                margin: 0 auto;
                background: #f1f5f9;
            }
            .ir-meta {
                margin-top: 10px;
                font-size: 13px;
                font-weight: 600;
                color: #334155;
                min-height: 20px;
            }
        </style>

        <div class="ir-card">
            <div class="ir-header">
                <h3>इमेज घुमाएँ (प्रो रोटेटर)</h3>
                <p>90°/180°, कस्टम डिग्री, फ़्लिप, डाइमेंशन, फ़ॉर्मेट और KB कंप्रेशन</p>
            </div>

            <div class="ir-grid-2">
                <div class="ir-box">
                    <label for="irFileInput">इमेज चुनें</label>
                    <input type="file" id="irFileInput" accept="image/*">
                    <div class="ir-hint">JPG, PNG, WEBP, GIF (पहला फ़्रेम) समर्थित</div>
                </div>
                <div class="ir-box">
                    <label for="irFormat">आउटपुट फ़ॉर्मेट</label>
                    <select id="irFormat">
                        <option value="image/jpeg" selected>JPG (.jpg)</option>
                        <option value="image/png">PNG (.png)</option>
                        <option value="image/webp">WEBP (.webp)</option>
                    </select>
                    <div class="ir-hint">JPG / WEBP में KB कंप्रेशन सक्रिय</div>
                </div>
            </div>

            <div class="ir-btn-grid">
                <button type="button" id="irRot90R" class="ir-btn">↻ 90° दाएँ घुमाएँ</button>
                <button type="button" id="irRot90L" class="ir-btn">↺ 90° बाएँ घुमाएँ</button>
                <button type="button" id="irRot180" class="ir-btn ir-btn-alt">↕ 180° उल्टा करें</button>
                <button type="button" id="irFlipH" class="ir-btn ir-btn-alt">↔ हॉरिज़ॉन्टल फ़्लिप</button>
                <button type="button" id="irFlipV" class="ir-btn ir-btn-alt">⇅ वर्टिकल फ़्लिप</button>
                <button type="button" id="irResetBtn" class="ir-btn ir-btn-reset">🔁 रीसेट करें</button>
            </div>

            <div class="ir-grid-2">
                <div class="ir-box">
                    <label for="irAngleSlider">कस्टम कोण (डिग्री): <span id="irAngleLabel">0°</span></label>
                    <input type="range" id="irAngleSlider" min="-180" max="180" value="0" step="1">
                    <div class="ir-hint">-180° से +180° तक किसी भी कोण पर घुमाएँ</div>
                </div>
                <div class="ir-box">
                    <label for="irAngleNum">सटीक डिग्री डालें</label>
                    <input type="number" id="irAngleNum" min="-360" max="360" value="0">
                    <div class="ir-hint">सीधे डिग्री टाइप करने के लिए</div>
                </div>
            </div>

            <div class="ir-grid-3">
                <div class="ir-box">
                    <label for="irWidth">आउटपुट चौड़ाई (px)</label>
                    <input type="number" id="irWidth" min="16" max="6000" placeholder="ऑटो">
                    <div class="ir-check-row">
                        <input type="checkbox" id="irLockRatio" checked>
                        <span>आस्पेक्ट रेशियो लॉक</span>
                    </div>
                </div>
                <div class="ir-box">
                    <label for="irHeight">आउटपुट ऊँचाई (px)</label>
                    <input type="number" id="irHeight" min="16" max="6000" placeholder="ऑटो">
                    <div class="ir-hint">खाली/ऑटो पर रोटेटेड साइज़</div>
                </div>
                <div class="ir-box">
                    <label for="irTargetKb">टारगेट साइज़ (KB)</label>
                    <input type="number" id="irTargetKb" value="250" min="5" max="10000">
                    <div class="ir-hint">इस सीमा के अंदर रखने का प्रयास</div>
                </div>
            </div>

            <div class="ir-grid-2">
                <div class="ir-box">
                    <label for="irBgColor">बैकग्राउंड रंग (कस्टम कोण / JPG के लिए)</label>
                    <input type="color" id="irBgColor" value="#ffffff">
                </div>
                <div class="ir-box">
                    <label for="irQualityMode">क्वालिटी प्राथमिकता</label>
                    <select id="irQualityMode">
                        <option value="target_kb" selected>टारगेट KB के अनुसार ऑटो-कंप्रेशन</option>
                        <option value="high">उच्चतम क्वालिटी (95%)</option>
                        <option value="balanced">संतुलित क्वालिटी (75%)</option>
                    </select>
                </div>
            </div>

            <button type="button" id="irDownloadBtn" class="ir-dl-btn">घुमाएँ और डाउनलोड करें</button>

            <div class="ir-preview-wrap">
                <canvas id="irCanvas"></canvas>
                <div class="ir-meta" id="irMetaText"></div>
            </div>
        </div>
    `;

    let sourceImg = null;
    let angleDeg = 0;
    let scaleX = 1;
    let scaleY = 1;
    let boundW = 0;
    let boundH = 0;
    let syncingDims = false;

    const canvas = document.getElementById('irCanvas');
    const fileInput = document.getElementById('irFileInput');
    const formatSelect = document.getElementById('irFormat');
    const angleSlider = document.getElementById('irAngleSlider');
    const angleNum = document.getElementById('irAngleNum');
    const angleLabel = document.getElementById('irAngleLabel');
    const widthInput = document.getElementById('irWidth');
    const heightInput = document.getElementById('irHeight');
    const lockRatio = document.getElementById('irLockRatio');
    const targetKbInput = document.getElementById('irTargetKb');
    const bgColorInput = document.getElementById('irBgColor');
    const qualityModeSelect = document.getElementById('irQualityMode');
    const metaText = document.getElementById('irMetaText');

    const getBase64SizeKb = (dataUrl) => {
        const base64 = dataUrl.split(',')[1] || '';
        const padding = (base64.endsWith('==') ? 2 : base64.endsWith('=') ? 1 : 0);
        return ((base64.length * 3) / 4 - padding) / 1024;
    };

    const computeBoundingBox = () => {
        if (!sourceImg) return;
        const rad = (angleDeg * Math.PI) / 180;
        const cos = Math.abs(Math.cos(rad));
        const sin = Math.abs(Math.sin(rad));
        boundW = Math.max(16, Math.round(sourceImg.width * cos + sourceImg.height * sin));
        boundH = Math.max(16, Math.round(sourceImg.width * sin + sourceImg.height * cos));
    };

    const syncDimensionsFromBounds = () => {
        if (!sourceImg) return;
        syncingDims = true;
        widthInput.value = boundW;
        heightInput.value = boundH;
        syncingDims = false;
    };

    const getOutputSize = () => {
        const wParsed = parseInt(widthInput.value, 10);
        const hParsed = parseInt(heightInput.value, 10);
        const outW = Number.isFinite(wParsed) && wParsed > 0 ? Math.min(6000, Math.max(16, wParsed)) : boundW;
        const outH = Number.isFinite(hParsed) && hParsed > 0 ? Math.min(6000, Math.max(16, hParsed)) : boundH;
        return { outW, outH };
    };

    const buildEncodedOutput = () => {
        const mime = formatSelect.value || 'image/jpeg';
        if (mime === 'image/png') {
            return {
                dataUrl: canvas.toDataURL('image/png'),
                ext: 'png',
                detail: 'PNG (Lossless)'
            };
        }

        const ext = mime === 'image/webp' ? 'webp' : 'jpg';
        const mode = qualityModeSelect.value;

        if (mode === 'high') {
            return {
                dataUrl: canvas.toDataURL(mime, 0.95),
                ext,
                detail: `${ext.toUpperCase()} 95%`
            };
        }
        if (mode === 'balanced') {
            return {
                dataUrl: canvas.toDataURL(mime, 0.75),
                ext,
                detail: `${ext.toUpperCase()} 75%`
            };
        }

        const targetKb = Math.max(5, parseInt(targetKbInput.value, 10) || 250);
        let quality = 0.92;
        let dataUrl = canvas.toDataURL(mime, quality);

        while (getBase64SizeKb(dataUrl) > targetKb && quality > 0.1) {
            quality = Math.max(0.1, +(quality - 0.05).toFixed(2));
            dataUrl = canvas.toDataURL(mime, quality);
        }

        return {
            dataUrl,
            ext,
            detail: `${ext.toUpperCase()} ${Math.round(quality * 100)}%`
        };
    };

    const renderPreview = () => {
        if (!sourceImg) return;

        const { outW, outH } = getOutputSize();
        canvas.width = outW;
        canvas.height = outH;
        canvas.style.display = 'block';

        const ctx = canvas.getContext('2d');
        const mime = formatSelect.value || 'image/jpeg';
        const bgColor = bgColorInput.value || '#ffffff';

        ctx.save();
        if (mime === 'image/jpeg') {
            ctx.fillStyle = bgColor;
            ctx.fillRect(0, 0, outW, outH);
        } else {
            ctx.clearRect(0, 0, outW, outH);
        }

        const scaleFactor = Math.min(outW / boundW, outH / boundH);
        const drawW = sourceImg.width * scaleFactor;
        const drawH = sourceImg.height * scaleFactor;

        ctx.translate(outW / 2, outH / 2);
        ctx.scale(scaleX, scaleY);
        ctx.rotate((angleDeg * Math.PI) / 180);
        ctx.drawImage(sourceImg, -drawW / 2, -drawH / 2, drawW, drawH);
        ctx.restore();

        angleLabel.textContent = `${angleDeg}°`;

        const { dataUrl, detail } = buildEncodedOutput();
        const sizeKb = getBase64SizeKb(dataUrl).toFixed(1);
        metaText.textContent =
            `कोण: ${angleDeg}° | डाइमेंशन: ${outW}×${outH} px | साइज़: ${sizeKb} KB (${detail})`;
    };

    const setAngle = (deg) => {
        let val = Number.isFinite(deg) ? Math.round(deg) : 0;
        if (val > 180 || val < -180) {
            val = ((val + 180) % 360 + 360) % 360 - 180;
        }
        angleDeg = val;
        angleSlider.value = Math.max(-180, Math.min(180, angleDeg));
        angleNum.value = angleDeg;
        angleLabel.textContent = `${angleDeg}°`;

        if (sourceImg) {
            computeBoundingBox();
            syncDimensionsFromBounds();
            renderPreview();
        }
    };

    const ensureLoaded = () => {
        if (!sourceImg) {
            alert('कृपया पहले एक इमेज चुनें।');
            return false;
        }
        return true;
    };

    fileInput.onchange = (e) => {
        const file = e.target.files && e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = () => {
            const img = new Image();
            img.onload = () => {
                sourceImg = img;
                scaleX = 1;
                scaleY = 1;
                angleDeg = 0;
                angleSlider.value = 0;
                angleNum.value = 0;
                angleLabel.textContent = '0°';
                computeBoundingBox();
                syncDimensionsFromBounds();
                renderPreview();
            };
            img.onerror = () => alert('इमेज लोड नहीं हो सकी। कृपया कोई अन्य इमेज चुनें।');
            img.src = reader.result;
        };
        reader.onerror = () => alert('फ़ाइल पढ़ने में समस्या आई।');
        reader.readAsDataURL(file);
    };

    document.getElementById('irRot90R').onclick = () => {
        if (!ensureLoaded()) return;
        setAngle(angleDeg + 90);
    };

    document.getElementById('irRot90L').onclick = () => {
        if (!ensureLoaded()) return;
        setAngle(angleDeg - 90);
    };

    document.getElementById('irRot180').onclick = () => {
        if (!ensureLoaded()) return;
        setAngle(angleDeg + 180);
    };

    document.getElementById('irFlipH').onclick = () => {
        if (!ensureLoaded()) return;
        scaleX *= -1;
        renderPreview();
    };

    document.getElementById('irFlipV').onclick = () => {
        if (!ensureLoaded()) return;
        scaleY *= -1;
        renderPreview();
    };

    document.getElementById('irResetBtn').onclick = () => {
        if (!ensureLoaded()) return;
        scaleX = 1;
        scaleY = 1;
        setAngle(0);
    };

    angleSlider.oninput = () => {
        setAngle(parseInt(angleSlider.value, 10) || 0);
    };

    angleNum.oninput = () => {
        setAngle(parseInt(angleNum.value, 10) || 0);
    };

    widthInput.oninput = () => {
        if (!sourceImg || syncingDims) return;
        const w = parseInt(widthInput.value, 10);
        if (lockRatio.checked && Number.isFinite(w) && w > 0 && boundW > 0) {
            syncingDims = true;
            heightInput.value = Math.max(16, Math.round((w * boundH) / boundW));
            syncingDims = false;
        }
        renderPreview();
    };

    heightInput.oninput = () => {
        if (!sourceImg || syncingDims) return;
        const h = parseInt(heightInput.value, 10);
        if (lockRatio.checked && Number.isFinite(h) && h > 0 && boundH > 0) {
            syncingDims = true;
            widthInput.value = Math.max(16, Math.round((h * boundW) / boundH));
            syncingDims = false;
        }
        renderPreview();
    };

    [formatSelect, targetKbInput, bgColorInput, qualityModeSelect].forEach((el) => {
        el.oninput = () => {
            if (sourceImg) renderPreview();
        };
        el.onchange = () => {
            if (sourceImg) renderPreview();
        };
    });

    document.getElementById('irDownloadBtn').onclick = () => {
        if (!ensureLoaded()) return;
        renderPreview();
        const { dataUrl, ext } = buildEncodedOutput();
        const link = document.createElement('a');
        link.href = dataUrl;
        link.download = `rotated_${angleDeg}deg_${Date.now()}.${ext}`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };
            }
