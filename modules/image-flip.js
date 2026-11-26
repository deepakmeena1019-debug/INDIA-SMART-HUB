export async function init(container) {
    container.innerHTML = `
        <style>
            .if-pro-card {
                max-width: 760px;
                margin: 20px auto;
                padding: 24px;
                background: #ffffff;
                border-radius: 16px;
                box-shadow: 0 12px 32px rgba(15, 23, 42, 0.14);
                font-family: system-ui, -apple-system, sans-serif;
                color: #1e293b;
            }
            .if-pro-header {
                text-align: center;
                margin-bottom: 20px;
            }
            .if-pro-header h3 {
                margin: 0;
                font-size: 23px;
                color: #4c1d95;
            }
            .if-pro-header p {
                margin: 4px 0 0;
                font-size: 13px;
                color: #64748b;
            }
            .if-grid-2 {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
                gap: 12px;
                margin-bottom: 14px;
            }
            .if-grid-3 {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(155px, 1fr));
                gap: 12px;
                margin-bottom: 14px;
            }
            .if-box {
                background: #f8fafc;
                border: 1px solid #e2e8f0;
                border-radius: 10px;
                padding: 12px;
            }
            .if-box label {
                display: block;
                font-size: 12.5px;
                font-weight: 700;
                color: #334155;
                margin-bottom: 6px;
            }
            .if-box input[type="file"],
            .if-box input[type="number"],
            .if-box input[type="range"],
            .if-box select {
                width: 100%;
                padding: 7px 9px;
                border: 1px solid #cbd5e1;
                border-radius: 7px;
                background: #ffffff;
                font-size: 13.5px;
                box-sizing: border-box;
            }
            .if-box input[type="range"] {
                padding: 4px 0;
                border: none;
                background: transparent;
                cursor: pointer;
            }
            .if-check-row {
                display: flex;
                align-items: center;
                gap: 6px;
                margin-top: 6px;
                font-size: 12px;
                color: #475569;
            }
            .if-hint {
                font-size: 11px;
                color: #64748b;
                margin-top: 4px;
            }
            .if-btn-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(135px, 1fr));
                gap: 9px;
                margin-bottom: 14px;
            }
            .if-btn {
                padding: 10px 12px;
                background: #7c3aed;
                color: #ffffff;
                border: none;
                border-radius: 8px;
                font-size: 13px;
                font-weight: 600;
                cursor: pointer;
                transition: background 0.18s ease, transform 0.1s ease;
            }
            .if-btn:hover {
                background: #6d28d9;
            }
            .if-btn:active {
                transform: scale(0.98);
            }
            .if-btn-alt {
                background: #4f46e5;
            }
            .if-btn-alt:hover {
                background: #4338ca;
            }
            .if-btn-warn {
                background: #475569;
            }
            .if-btn-warn:hover {
                background: #334155;
            }
            .if-dl-main {
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
            .if-dl-main:hover {
                background: #047857;
            }
            .if-preview-box {
                margin-top: 20px;
                padding-top: 16px;
                border-top: 1px solid #e2e8f0;
                text-align: center;
            }
            #ifCanvas {
                max-width: 100%;
                max-height: 440px;
                border: 1px solid #cbd5e1;
                border-radius: 10px;
                display: none;
                margin: 0 auto;
                background: #f1f5f9;
            }
            .if-meta {
                margin-top: 10px;
                font-size: 13px;
                font-weight: 600;
                color: #334155;
                min-height: 20px;
            }
        </style>

        <div class="if-pro-card">
            <div class="if-pro-header">
                <h3>इमेज फ़्लिप और एडिटर (प्रो)</h3>
                <p>फ़्लिप, रोटेशन, साइज़, फ़िल्टर और KB कंप्रेशन — सभी विकल्प एक जगह</p>
            </div>

            <div class="if-grid-2">
                <div class="if-box">
                    <label for="ifFileInput">इमेज चुनें</label>
                    <input type="file" id="ifFileInput" accept="image/*">
                    <div class="if-hint">JPG, PNG, WEBP, GIF (पहला फ़्रेम) समर्थित</div>
                </div>
                <div class="if-box">
                    <label for="ifFormatSelect">आउटपुट फ़ॉर्मेट</label>
                    <select id="ifFormatSelect">
                        <option value="image/jpeg" selected>JPG (.jpg)</option>
                        <option value="image/png">PNG (.png)</option>
                        <option value="image/webp">WEBP (.webp)</option>
                    </select>
                    <div class="if-hint">JPG / WEBP में KB कंप्रेशन सक्रिय</div>
                </div>
            </div>

            <div class="if-btn-grid">
                <button type="button" id="ifFlipH" class="if-btn">↔️ हॉरिज़ॉन्टल फ़्लिप</button>
                <button type="button" id="ifFlipV" class="if-btn">↕️ वर्टिकल फ़्लिप</button>
                <button type="button" id="ifFlipBoth" class="if-btn if-btn-alt">🔀 दोनों तरफ़ फ़्लिप</button>
                <button type="button" id="ifRotLeft" class="if-btn if-btn-alt">↺ 90° बाएँ घुमाएँ</button>
                <button type="button" id="ifRotRight" class="if-btn if-btn-alt">↻ 90° दाएँ घुमाएँ</button>
                <button type="button" id="ifResetAll" class="if-btn if-btn-warn">🔁 सब रीसेट करें</button>
            </div>

            <div class="if-grid-3">
                <div class="if-box">
                    <label for="ifWidthInput">चौड़ाई (px)</label>
                    <input type="number" id="ifWidthInput" min="16" max="6000" placeholder="ऑटो">
                    <div class="if-check-row">
                        <input type="checkbox" id="ifLockRatio" checked>
                        <span>आस्पेक्ट रेशियो लॉक</span>
                    </div>
                </div>
                <div class="if-box">
                    <label for="ifHeightInput">ऊँचाई (px)</label>
                    <input type="number" id="ifHeightInput" min="16" max="6000" placeholder="ऑटो">
                    <div class="if-hint">खाली रखने पर मूल/रोटेटेड साइज़</div>
                </div>
                <div class="if-box">
                    <label for="ifTargetKbInput">टारगेट साइज़ (KB)</label>
                    <input type="number" id="ifTargetKbInput" value="250" min="5" max="10000">
                    <div class="if-hint">इस सीमा में रखने का प्रयास</div>
                </div>
            </div>

            <div class="if-grid-3">
                <div class="if-box">
                    <label for="ifBrightness">ब्राइटनेस: <span id="ifBrightVal">100%</span></label>
                    <input type="range" id="ifBrightness" min="40" max="180" value="100">
                </div>
                <div class="if-box">
                    <label for="ifContrast">कॉन्ट्रास्ट: <span id="ifContrastVal">100%</span></label>
                    <input type="range" id="ifContrast" min="40" max="180" value="100">
                </div>
                <div class="if-box">
                    <label for="ifFilterPreset">कलर फ़िल्टर</label>
                    <select id="ifFilterPreset">
                        <option value="none" selected>सामान्य (Normal)</option>
                        <option value="grayscale(100%)">ब्लैक एंड व्हाइट (Grayscale)</option>
                        <option value="sepia(85%)">सेपिया (Sepia / Vintage)</option>
                        <option value="saturate(145%)">वाइब्रेंट (Vibrant)</option>
                    </select>
                </div>
            </div>

            <button type="button" id="ifDownloadBtn" class="if-dl-main">फ़्लिप, एडिट और डाउनलोड करें</button>

            <div class="if-preview-box">
                <canvas id="ifCanvas"></canvas>
                <div class="if-meta" id="ifMetaText"></div>
            </div>
        </div>
    `;

    let sourceImg = null;
    let scaleX = 1;
    let scaleY = 1;
    let rotationDeg = 0;
    let baseRotatedW = 0;
    let baseRotatedH = 0;
    let updatingDims = false;

    const canvas = document.getElementById('ifCanvas');
    const fileInput = document.getElementById('ifFileInput');
    const formatSelect = document.getElementById('ifFormatSelect');
    const widthInput = document.getElementById('ifWidthInput');
    const heightInput = document.getElementById('ifHeightInput');
    const lockRatioCheck = document.getElementById('ifLockRatio');
    const targetKbInput = document.getElementById('ifTargetKbInput');
    const brightnessRange = document.getElementById('ifBrightness');
    const contrastRange = document.getElementById('ifContrast');
    const brightVal = document.getElementById('ifBrightVal');
    const contrastVal = document.getElementById('ifContrastVal');
    const filterPreset = document.getElementById('ifFilterPreset');
    const metaText = document.getElementById('ifMetaText');

    const getBase64SizeKb = (dataUrl) => {
        const base64 = dataUrl.split(',')[1] || '';
        const padding = (base64.endsWith('==') ? 2 : base64.endsWith('=') ? 1 : 0);
        return ((base64.length * 3) / 4 - padding) / 1024;
    };

    const computeRotatedBaseSize = () => {
        if (!sourceImg) return;
        const norm = ((rotationDeg % 360) + 360) % 360;
        if (norm === 90 || norm === 270) {
            baseRotatedW = sourceImg.height;
            baseRotatedH = sourceImg.width;
        } else {
            baseRotatedW = sourceImg.width;
            baseRotatedH = sourceImg.height;
        }
    };

    const syncDefaultDimensionInputs = () => {
        if (!sourceImg) return;
        updatingDims = true;
        widthInput.value = baseRotatedW;
        heightInput.value = baseRotatedH;
        updatingDims = false;
    };

    const getTargetDimensions = () => {
        const wVal = parseInt(widthInput.value, 10);
        const hVal = parseInt(heightInput.value, 10);
        const outW = Number.isFinite(wVal) && wVal > 0 ? Math.min(6000, Math.max(16, wVal)) : baseRotatedW;
        const outH = Number.isFinite(hVal) && hVal > 0 ? Math.min(6000, Math.max(16, hVal)) : baseRotatedH;
        return { outW, outH };
    };

    const getCssFilterString = () => {
        const b = parseInt(brightnessRange.value, 10) || 100;
        const c = parseInt(contrastRange.value, 10) || 100;
        const preset = filterPreset.value || 'none';
        const baseFilter = `brightness(${b}%) contrast(${c}%)`;
        return preset === 'none' ? baseFilter : `${baseFilter} ${preset}`;
    };

    const encodeOutput = () => {
        const mime = formatSelect.value || 'image/jpeg';
        if (mime === 'image/png') {
            return {
                dataUrl: canvas.toDataURL('image/png'),
                ext: 'png',
                modeLabel: 'PNG (Lossless)'
            };
        }

        const targetKb = Math.max(5, parseInt(targetKbInput.value, 10) || 250);
        let quality = 0.92;
        let dataUrl = canvas.toDataURL(mime, quality);

        while (getBase64SizeKb(dataUrl) > targetKb && quality > 0.1) {
            quality = Math.max(0.1, +(quality - 0.05).toFixed(2));
            dataUrl = canvas.toDataURL(mime, quality);
        }

        const ext = mime === 'image/webp' ? 'webp' : 'jpg';
        return {
            dataUrl,
            ext,
            modeLabel: `${ext.toUpperCase()} क्वालिटी ${Math.round(quality * 100)}%`
        };
    };

    const renderCanvas = () => {
        if (!sourceImg) return;

        const { outW, outH } = getTargetDimensions();
        canvas.width = outW;
        canvas.height = outH;
        canvas.style.display = 'block';

        const ctx = canvas.getContext('2d');
        const mime = formatSelect.value || 'image/jpeg';

        ctx.save();
        if (mime === 'image/jpeg') {
            ctx.fillStyle = '#ffffff';
            ctx.fillRect(0, 0, outW, outH);
        } else {
            ctx.clearRect(0, 0, outW, outH);
        }

        ctx.filter = getCssFilterString();
        ctx.translate(outW / 2, outH / 2);
        ctx.scale(scaleX, scaleY);
        ctx.rotate((rotationDeg * Math.PI) / 180);

        const norm = ((rotationDeg % 360) + 360) % 360;
        const drawW = (norm === 90 || norm === 270) ? outH : outW;
        const drawH = (norm === 90 || norm === 270) ? outW : outH;

        ctx.drawImage(sourceImg, -drawW / 2, -drawH / 2, drawW, drawH);
        ctx.restore();

        brightVal.textContent = `${brightnessRange.value}%`;
        contrastVal.textContent = `${contrastRange.value}%`;

        const { dataUrl, modeLabel } = encodeOutput();
        const sizeKb = getBase64SizeKb(dataUrl).toFixed(1);
        const normRot = ((rotationDeg % 360) + 360) % 360;

        metaText.textContent =
            `डाइमेंशन: ${outW}×${outH} px | रोटेशन: ${normRot}° | फ़्लिप: (${scaleX === -1 ? 'H-Flip' : 'H-Norm'}, ${scaleY === -1 ? 'V-Flip' : 'V-Norm'}) | साइज़: ${sizeKb} KB (${modeLabel})`;
    };

    const requireImage = () => {
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
                rotationDeg = 0;
                brightnessRange.value = 100;
                contrastRange.value = 100;
                filterPreset.value = 'none';
                computeRotatedBaseSize();
                syncDefaultDimensionInputs();
                renderCanvas();
            };
            img.onerror = () => alert('यह इमेज लोड नहीं हो सकी। कृपया कोई अन्य फ़ाइल चुनें।');
            img.src = reader.result;
        };
        reader.onerror = () => alert('फ़ाइल पढ़ने में त्रुटि आई।');
        reader.readAsDataURL(file);
    };

    document.getElementById('ifFlipH').onclick = () => {
        if (!requireImage()) return;
        scaleX *= -1;
        renderCanvas();
    };

    document.getElementById('ifFlipV').onclick = () => {
        if (!requireImage()) return;
        scaleY *= -1;
        renderCanvas();
    };

    document.getElementById('ifFlipBoth').onclick = () => {
        if (!requireImage()) return;
        scaleX *= -1;
        scaleY *= -1;
        renderCanvas();
    };

    document.getElementById('ifRotLeft').onclick = () => {
        if (!requireImage()) return;
        rotationDeg = (rotationDeg - 90) % 360;
        computeRotatedBaseSize();
        syncDefaultDimensionInputs();
        renderCanvas();
    };

    document.getElementById('ifRotRight').onclick = () => {
        if (!requireImage()) return;
        rotationDeg = (rotationDeg + 90) % 360;
        computeRotatedBaseSize();
        syncDefaultDimensionInputs();
        renderCanvas();
    };

    document.getElementById('ifResetAll').onclick = () => {
        if (!requireImage()) return;
        scaleX = 1;
        scaleY = 1;
        rotationDeg = 0;
        brightnessRange.value = 100;
        contrastRange.value = 100;
        filterPreset.value = 'none';
        computeRotatedBaseSize();
        syncDefaultDimensionInputs();
        renderCanvas();
    };

    widthInput.oninput = () => {
        if (!sourceImg || updatingDims) return;
        const w = parseInt(widthInput.value, 10);
        if (lockRatioCheck.checked && Number.isFinite(w) && w > 0 && baseRotatedW > 0) {
            updatingDims = true;
            heightInput.value = Math.max(16, Math.round((w * baseRotatedH) / baseRotatedW));
            updatingDims = false;
        }
        renderCanvas();
    };

    heightInput.oninput = () => {
        if (!sourceImg || updatingDims) return;
        const h = parseInt(heightInput.value, 10);
        if (lockRatioCheck.checked && Number.isFinite(h) && h > 0 && baseRotatedH > 0) {
            updatingDims = true;
            widthInput.value = Math.max(16, Math.round((h * baseRotatedW) / baseRotatedH));
            updatingDims = false;
        }
        renderCanvas();
    };

    [formatSelect, targetKbInput, brightnessRange, contrastRange, filterPreset].forEach((el) => {
        el.oninput = () => {
            if (sourceImg) renderCanvas();
        };
        el.onchange = () => {
            if (sourceImg) renderCanvas();
        };
    });

    document.getElementById('ifDownloadBtn').onclick = () => {
        if (!requireImage()) return;
        renderCanvas();
        const { dataUrl, ext } = encodeOutput();
        const link = document.createElement('a');
        link.href = dataUrl;
        link.download = `flipped_edited_${Date.now()}.${ext}`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };
            }
