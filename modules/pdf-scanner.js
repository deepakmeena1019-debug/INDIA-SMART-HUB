export async function init(container) {
    if (!window.jspdf) {
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';
        document.head.appendChild(script);
        await new Promise((resolve, reject) => {
            script.onload = resolve;
            script.onerror = () => reject(new Error('jsPDF load failed'));
        });
    }

    container.innerHTML = `
        <style>
            .ds-card {
                max-width: 740px;
                margin: 20px auto;
                padding: 24px;
                background: #ffffff;
                border-radius: 16px;
                box-shadow: 0 12px 32px rgba(15, 23, 42, 0.14);
                font-family: system-ui, -apple-system, sans-serif;
                color: #1e293b;
            }
            .ds-header {
                text-align: center;
                margin-bottom: 18px;
            }
            .ds-header h3 {
                margin: 0;
                font-size: 23px;
                color: #065f46;
            }
            .ds-header p {
                margin: 4px 0 0;
                font-size: 13px;
                color: #64748b;
            }
            .ds-cam-box {
                position: relative;
                background: #0f172a;
                border-radius: 12px;
                overflow: hidden;
                max-width: 480px;
                margin: 0 auto 14px;
                border: 2px solid #cbd5e1;
            }
            #scannerView {
                width: 100%;
                max-height: 360px;
                display: block;
                object-fit: cover;
                background: #000000;
            }
            .ds-cam-placeholder {
                padding: 48px 18px;
                text-align: center;
                color: #cbd5e1;
                font-size: 14px;
            }
            .ds-grid-2 {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(210px, 1fr));
                gap: 12px;
                margin-bottom: 14px;
            }
            .ds-grid-3 {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
                gap: 12px;
                margin-bottom: 14px;
            }
            .ds-box {
                background: #f8fafc;
                border: 1px solid #e2e8f0;
                border-radius: 10px;
                padding: 12px;
            }
            .ds-box label {
                display: block;
                font-size: 12.5px;
                font-weight: 700;
                color: #334155;
                margin-bottom: 6px;
            }
            .ds-box input[type="file"],
            .ds-box input[type="number"],
            .ds-box select {
                width: 100%;
                padding: 8px 10px;
                border: 1px solid #cbd5e1;
                border-radius: 7px;
                background: #ffffff;
                font-size: 13.5px;
                box-sizing: border-box;
            }
            .ds-hint {
                font-size: 11px;
                color: #64748b;
                margin-top: 4px;
            }
            .ds-btn-row {
                display: flex;
                flex-wrap: wrap;
                gap: 10px;
                margin-bottom: 14px;
            }
            .ds-btn {
                flex: 1 1 140px;
                padding: 11px 14px;
                background: #10b981;
                color: #ffffff;
                border: none;
                border-radius: 8px;
                font-size: 14px;
                font-weight: 700;
                cursor: pointer;
                transition: background 0.18s ease, transform 0.1s ease;
            }
            .ds-btn:hover {
                background: #059669;
            }
            .ds-btn:active {
                transform: scale(0.98);
            }
            .ds-btn-cam {
                background: #2563eb;
            }
            .ds-btn-cam:hover {
                background: #1d4ed8;
            }
            .ds-btn-sec {
                background: #475569;
            }
            .ds-btn-sec:hover {
                background: #334155;
            }
            .ds-dl-row {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
                gap: 10px;
                margin-top: 14px;
            }
            .ds-dl-jpg {
                padding: 12px 16px;
                background: #059669;
                color: #ffffff;
                border: none;
                border-radius: 9px;
                font-size: 15px;
                font-weight: 700;
                cursor: pointer;
            }
            .ds-dl-jpg:hover {
                background: #047857;
            }
            .ds-dl-pdf {
                padding: 12px 16px;
                background: #7c3aed;
                color: #ffffff;
                border: none;
                border-radius: 9px;
                font-size: 15px;
                font-weight: 700;
                cursor: pointer;
            }
            .ds-dl-pdf:hover {
                background: #6d28d9;
            }
            .ds-preview-wrap {
                margin-top: 20px;
                padding-top: 16px;
                border-top: 1px solid #e2e8f0;
                text-align: center;
                display: none;
            }
            #scanCanvas {
                max-width: 100%;
                max-height: 440px;
                border: 1px solid #cbd5e1;
                border-radius: 10px;
                margin: 0 auto;
                background: #f1f5f9;
            }
            .ds-status {
                margin-top: 10px;
                font-size: 13px;
                font-weight: 600;
                color: #334155;
                min-height: 20px;
            }
        </style>

        <div class="ds-card">
            <div class="ds-header">
                <h3>दस्तावेज़ स्कैनर (प्रो)</h3>
                <p>कैमरा या फ़ाइल से स्कैन करें, फ़िल्टर लगाएँ, KB सेट करें और JPG या PDF डाउनलोड करें</p>
            </div>

            <div class="ds-cam-box">
                <video id="scannerView" autoplay playsinline muted style="display:none;"></video>
                <div class="ds-cam-placeholder" id="camPlaceholder">
                    कैमरा शुरू करने के लिए नीचे <strong>"कैमरा चालू करें"</strong> दबाएँ या फ़ाइल चुनें।
                </div>
            </div>

            <div class="ds-btn-row">
                <button type="button" id="startCamBtn" class="ds-btn ds-btn-cam">📷 कैमरा चालू करें</button>
                <button type="button" id="switchCamBtn" class="ds-btn ds-btn-sec">🔄 कैमरा बदलें</button>
                <button type="button" id="captureBtn" class="ds-btn">📸 फ़ोटो खींचें</button>
                <button type="button" id="stopCamBtn" class="ds-btn ds-btn-sec">⏹ कैमरा बंद करें</button>
            </div>

            <div class="ds-grid-2">
                <div class="ds-box">
                    <label for="scanFileInput">या फ़ाइल / गैलरी से चुनें</label>
                    <input type="file" id="scanFileInput" accept="image/*">
                    <div class="ds-hint">कैमरा न चलने या पहले से खींची फ़ोटो के लिए</div>
                </div>
                <div class="ds-box">
                    <label for="scanMode">स्कैन मोड (फ़िल्टर)</label>
                    <select id="scanMode">
                        <option value="document" selected>दस्तावेज़ (साफ़ हाई-कॉन्ट्रास्ट)</option>
                        <option value="bw">ब्लैक एंड व्हाइट (टेक्स्ट के लिए साफ़)</option>
                        <option value="grayscale">ग्रेस्केल (Grayscale)</option>
                        <option value="color">रंगीन (Original Color)</option>
                    </select>
                </div>
            </div>

            <div class="ds-grid-3">
                <div class="ds-box">
                    <label for="scanRotate">घुमाएँ (Rotation)</label>
                    <select id="scanRotate">
                        <option value="0" selected>0° (सामान्य)</option>
                        <option value="90">90° दाएँ</option>
                        <option value="180">180° उल्टा</option>
                        <option value="270">270° / 90° बाएँ</option>
                    </select>
                </div>
                <div class="ds-box">
                    <label for="scanMaxWidth">अधिकतम चौड़ाई (px)</label>
                    <input type="number" id="scanMaxWidth" value="1400" min="300" max="4000">
                </div>
                <div class="ds-box">
                    <label for="scanTargetKb">टारगेट साइज़ (KB)</label>
                    <input type="number" id="scanTargetKb" value="250" min="15" max="10000">
                    <div class="ds-hint">JPG साइज़ इस सीमा में रखने का प्रयास</div>
                </div>
            </div>

            <div class="ds-preview-wrap" id="dsPreviewWrap">
                <canvas id="scanCanvas"></canvas>
                <div class="ds-status" id="dsStatus"></div>
                <div class="ds-dl-row">
                    <button type="button" id="downloadJpgBtn" class="ds-dl-jpg">⬇️ JPG डाउनलोड करें</button>
                    <button type="button" id="downloadPdfBtn" class="ds-dl-pdf">📄 PDF डाउनलोड करें</button>
                </div>
            </div>
        </div>
    `;

    let stream = null;
    let facingMode = 'environment';
    let capturedSource = null;

    const videoEl = document.getElementById('scannerView');
    const placeholderEl = document.getElementById('camPlaceholder');
    const canvas = document.getElementById('scanCanvas');
    const previewWrap = document.getElementById('dsPreviewWrap');
    const statusEl = document.getElementById('dsStatus');
    const scanModeSelect = document.getElementById('scanMode');
    const scanRotateSelect = document.getElementById('scanRotate');
    const maxWidthInput = document.getElementById('scanMaxWidth');
    const targetKbInput = document.getElementById('scanTargetKb');

    const getBase64SizeKb = (dataUrl) => {
        const base64 = dataUrl.split(',')[1] || '';
        const padding = (base64.endsWith('==') ? 2 : base64.endsWith('=') ? 1 : 0);
        return ((base64.length * 3) / 4 - padding) / 1024;
    };

    const stopCamera = () => {
        if (stream) {
            stream.getTracks().forEach((track) => track.stop());
            stream = null;
        }
        videoEl.srcObject = null;
        videoEl.style.display = 'none';
        placeholderEl.style.display = 'block';
    };

    const startCamera = async () => {
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
            alert('इस ब्राउज़र में कैमरा सपोर्ट नहीं है। कृपया "फ़ाइल / गैलरी से चुनें" का उपयोग करें।');
            return;
        }
        stopCamera();
        try {
            stream = await navigator.mediaDevices.getUserMedia({
                video: { facingMode: { ideal: facingMode }, width: { ideal: 1920 }, height: { ideal: 1080 } },
                audio: false
            });
            videoEl.srcObject = stream;
            videoEl.style.display = 'block';
            placeholderEl.style.display = 'none';
            await videoEl.play();
        } catch (err) {
            try {
                stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
                videoEl.srcObject = stream;
                videoEl.style.display = 'block';
                placeholderEl.style.display = 'none';
                await videoEl.play();
            } catch (fallbackErr) {
                alert('कैमरा अनुमति नहीं मिली या कैमरा उपलब्ध नहीं है। कृपया ब्राउज़र में कैमरा परमिशन दें या फ़ाइल चुनें।');
            }
        }
    };

    const applyScanFilter = (ctx, w, h, mode) => {
        if (mode === 'color') return;
        const imgData = ctx.getImageData(0, 0, w, h);
        const data = imgData.data;

        for (let i = 0; i < data.length; i += 4) {
            const r = data[i];
            const g = data[i + 1];
            const b = data[i + 2];
            const lum = 0.299 * r + 0.587 * g + 0.114 * b;

            if (mode === 'grayscale') {
                data[i] = data[i + 1] = data[i + 2] = lum;
            } else if (mode === 'document') {
                // Brighten background & sharpen contrast for legible document text
                const boosted = Math.min(255, Math.max(0, (lum - 115) * 1.45 + 150));
                data[i] = data[i + 1] = data[i + 2] = boosted;
            } else if (mode === 'bw') {
                const bwVal = lum > 148 ? 255 : 0;
                data[i] = data[i + 1] = data[i + 2] = bwVal;
            }
        }
        ctx.putImageData(imgData, 0, 0);
    };

    const renderScannedCanvas = () => {
        if (!capturedSource) return;

        const rot = parseInt(scanRotateSelect.value, 10) || 0;
        const maxW = Math.max(300, Math.min(4000, parseInt(maxWidthInput.value, 10) || 1400));
        const mode = scanModeSelect.value || 'document';

        const srcW = capturedSource.width;
        const srcH = capturedSource.height;
        const isSideways = rot === 90 || rot === 270;
        const rawW = isSideways ? srcH : srcW;
        const rawH = isSideways ? srcW : srcH;

        const scale = rawW > maxW ? maxW / rawW : 1;
        const outW = Math.max(100, Math.round(rawW * scale));
        const outH = Math.max(100, Math.round(rawH * scale));

        canvas.width = outW;
        canvas.height = outH;

        const ctx = canvas.getContext('2d');
        ctx.save();
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, outW, outH);

        ctx.translate(outW / 2, outH / 2);
        ctx.rotate((rot * Math.PI) / 180);

        const drawW = isSideways ? outH : outW;
        const drawH = isSideways ? outW : outH;
        ctx.drawImage(capturedSource, -drawW / 2, -drawH / 2, drawW, drawH);
        ctx.restore();

        applyScanFilter(ctx, outW, outH, mode);

        previewWrap.style.display = 'block';
        const { dataUrl, qualityPct } = buildCompressedJpg();
        const sizeKb = getBase64SizeKb(dataUrl).toFixed(1);
        statusEl.textContent = `स्कैन तैयार: ${outW}×${outH} px | अनुमानित JPG साइज़: ${sizeKb} KB (क्वालिटी: ${qualityPct}%)`;
    };

    const buildCompressedJpg = () => {
        const targetKb = Math.max(15, parseInt(targetKbInput.value, 10) || 250);
        let quality = 0.92;
        let dataUrl = canvas.toDataURL('image/jpeg', quality);

        while (getBase64SizeKb(dataUrl) > targetKb && quality > 0.1) {
            quality = Math.max(0.1, +(quality - 0.05).toFixed(2));
            dataUrl = canvas.toDataURL('image/jpeg', quality);
        }

        return { dataUrl, qualityPct: Math.round(quality * 100) };
    };

    const triggerDownload = (href, filename) => {
        const a = document.createElement('a');
        a.href = href;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    };

    document.getElementById('startCamBtn').onclick = () => startCamera();

    document.getElementById('switchCamBtn').onclick = () => {
        facingMode = facingMode === 'environment' ? 'user' : 'environment';
        startCamera();
    };

    document.getElementById('stopCamBtn').onclick = () => stopCamera();

    document.getElementById('captureBtn').onclick = () => {
        if (!stream || videoEl.readyState < 2 || !videoEl.videoWidth) {
            alert('कृपया पहले "कैमरा चालू करें" दबाएँ या नीचे से कोई फ़ाइल चुनें।');
            return;
        }
        const tempCanvas = document.createElement('canvas');
        tempCanvas.width = videoEl.videoWidth;
        tempCanvas.height = videoEl.videoHeight;
        const tCtx = tempCanvas.getContext('2d');
        tCtx.drawImage(videoEl, 0, 0);

        capturedSource = {
            width: tempCanvas.width,
            height: tempCanvas.height,
            draw: (ctx, dx, dy, dw, dh) => ctx.drawImage(tempCanvas, dx, dy, dw, dh)
        };

        // Wrap drawImage so renderScannedCanvas works uniformly for both image and video frame
        const img = new Image();
        img.onload = () => {
            capturedSource = img;
            renderScannedCanvas();
        };
        img.src = tempCanvas.toDataURL('image/jpeg', 0.95);
    };

    document.getElementById('scanFileInput').onchange = (e) => {
        const file = e.target.files && e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = () => {
            const img = new Image();
            img.onload = () => {
                capturedSource = img;
                renderScannedCanvas();
            };
            img.onerror = () => alert('इमेज लोड नहीं हो सकी। कृपया कोई अन्य फ़ाइल चुनें।');
            img.src = reader.result;
        };
        reader.onerror = () => alert('फ़ाइल पढ़ने में समस्या आई।');
        reader.readAsDataURL(file);
    };

    [scanModeSelect, scanRotateSelect, maxWidthInput, targetKbInput].forEach((el) => {
        el.oninput = () => {
            if (capturedSource) renderScannedCanvas();
        };
        el.onchange = () => {
            if (capturedSource) renderScannedCanvas();
        };
    });

    document.getElementById('downloadJpgBtn').onclick = () => {
        if (!capturedSource) return alert('कृपया पहले फ़ोटो खींचें या फ़ाइल चुनें।');
        renderScannedCanvas();
        const { dataUrl } = buildCompressedJpg();
        triggerDownload(dataUrl, `scanned_doc_${Date.now()}.jpg`);
    };

    document.getElementById('downloadPdfBtn').onclick = () => {
        if (!capturedSource) return alert('कृपया पहले फ़ोटो खींचें या फ़ाइल चुनें।');
        renderScannedCanvas();

        try {
            const { jsPDF } = window.jspdf;
            const { dataUrl } = buildCompressedJpg();
            const isLandscape = canvas.width > canvas.height;
            const doc = new jsPDF({
                orientation: isLandscape ? 'landscape' : 'portrait',
                unit: 'pt',
                format: 'a4'
            });

            const pageW = doc.internal.pageSize.getWidth();
            const pageH = doc.internal.pageSize.getHeight();
            const margin = 24;
            const maxW = pageW - margin * 2;
            const maxH = pageH - margin * 2;

            const ratio = Math.min(maxW / canvas.width, maxH / canvas.height);
            const drawW = canvas.width * ratio;
            const drawH = canvas.height * ratio;
            const x = (pageW - drawW) / 2;
            const y = (pageH - drawH) / 2;

            doc.addImage(dataUrl, 'JPEG', x, y, drawW, drawH);
            const blob = doc.output('blob');
            const url = URL.createObjectURL(blob);
            triggerDownload(url, `scanned_doc_${Date.now()}.pdf`);
            setTimeout(() => URL.revokeObjectURL(url), 1500);
        } catch (err) {
            alert('PDF बनाने में समस्या आई। कृपया JPG डाउनलोड करें या दोबारा प्रयास करें।');
        }
    };

    // Clean up camera tracks if user navigates away or reloads
    window.addEventListener('beforeunload', stopCamera, { once: true });
        }
