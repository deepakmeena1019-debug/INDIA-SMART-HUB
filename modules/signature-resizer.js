export async function init(container) {
    container.innerHTML = `
        <style>
            .resizer-card { max-width: 500px; margin: 20px auto; padding: 25px; background: #ffffff; border-radius: 12px; box-shadow: 0 10px 25px rgba(0,0,0,0.1); font-family: sans-serif; }
            .resizer-card h3 { text-align: center; color: #1a365d; margin-bottom: 20px; }
            .group { margin-bottom: 15px; }
            .group label { display: block; font-size: 14px; font-weight: 600; color: #4a5568; margin-bottom: 5px; }
            .group input { width: 100%; padding: 10px; border: 1px solid #cbd5e0; border-radius: 6px; box-sizing: border-box; }
            .action-btn { width: 100%; padding: 14px; background: #3182ce; color: white; border: none; border-radius: 6px; font-size: 16px; font-weight: bold; cursor: pointer; transition: background 0.2s; }
            .action-btn:hover { background: #2b6cb0; }
            #previewArea { margin-top: 15px; text-align: center; display: none; }
            #previewImg { max-width: 100%; max-height: 200px; border-radius: 6px; border: 1px solid #e2e8f0; }
            .info { font-size: 13px; color: #718096; margin-top: 5px; }
        </style>
        <div class="resizer-card">
            <h3>सिग्नेचर मास्टर रिसाइज़र</h3>
            <div class="group">
                <label>सिग्नेचर इमेज चुनें</label>
                <input type="file" id="sigFile" accept="image/*">
            </div>
            <div class="group">
                <label>अधिकतम चौड़ाई (px)</label>
                <input type="number" id="targetWidth" value="400">
            </div>
            <div class="group">
                <label>अधिकतम ऊँचाई (px)</label>
                <input type="number" id="targetHeight" value="200">
            </div>
            <div class="group">
                <label>टारगेट साइज़ सीमा (KB)</label>
                <input type="number" id="targetKb" value="50">
                <div class="info">फाइल का साइज़ इससे नीचे रखने की कोशिश की जाएगी।</div>
            </div>
            <button class="action-btn" id="processBtn">प्रोसेस और डाउनलोड करें</button>
            <div id="previewArea">
                <h4>प्रीव्यू:</h4>
                <img id="previewImg" alt="Resized Signature">
                <div class="info" id="finalStats"></div>
            </div>
        </div>
    `;

    document.getElementById('processBtn').onclick = () => {
        const fileInput = document.getElementById('sigFile');
        if (!fileInput.files[0]) {
            alert('कृपया पहले सिग्नेचर इमेज अपलोड करें।');
            return;
        }

        const maxWidth = parseInt(document.getElementById('targetWidth').value) || 400;
        const maxHeight = parseInt(document.getElementById('targetHeight').value) || 200;
        const targetKb = parseInt(document.getElementById('targetKb').value) || 50;

        const reader = new FileReader();
        reader.onload = (e) => {
            const img = new Image();
            img.onload = () => {
                let width = img.width;
                let height = img.height;

                // Aspect ratio preserving calculation
                if (width > maxWidth || height > maxHeight) {
                    const ratio1 = maxWidth / width;
                    const ratio2 = maxHeight / height;
                    const scale = Math.min(ratio1, ratio2);
                    width = Math.round(width * scale);
                    height = Math.round(height * scale);
                }

                const canvas = document.createElement('canvas');
                canvas.width = width;
                canvas.height = height;
                const ctx = canvas.getContext('2d');
                
                // Fill white background for transparent PNGs
                ctx.fillStyle = "#FFFFFF";
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                ctx.drawImage(img, 0, 0, width, height);

                // Iterative compression to meet target KB
                let quality = 0.9;
                let dataUrl = canvas.toDataURL('image/jpeg', quality);
                
                const getByteLength = (base64) => {
                    const binaryed = atob(base64.split(',')[1]);
                    return binaryed.length;
                };

                while ((getByteLength(dataUrl) / 1024) > targetKb && quality > 0.1) {
                    quality -= 0.1;
                    dataUrl = canvas.toDataURL('image/jpeg', quality);
                }

                const finalKb = (getByteLength(dataUrl) / 1024).toFixed(1);

                const previewImg = document.getElementById('previewImg');
                previewImg.src = dataUrl;
                document.getElementById('finalStats').innerText = 
                    `नया साइज़: ${width}x${height} px | अनुमानित साइज़: ${finalKb} KB`;
                document.getElementById('previewArea').style.display = 'block';

                const a = document.createElement('a');
                a.href = dataUrl;
                a.download = `optimized_signature_${width}x${height}.jpg`;
                a.click();
            };
            img.src = e.target.result;
        };
        reader.readAsDataURL(fileInput.files[0]);
    };
                }
