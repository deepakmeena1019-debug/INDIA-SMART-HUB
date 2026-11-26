export function init(container) {
    container.innerHTML = `
        <h3>फोटो पर बॉर्डर लगाएँ</h3>
        <input type="file" id="borderInput" accept="image/*"><br><br>
        <label>बॉर्डर का रंग:</label>
        <input type="color" id="borderColor" value="#000000"><br><br>
        <label>मोटाई (px):</label>
        <input type="number" id="borderWidth" value="10" min="1"><br><br>
        <button id="applyBorderBtn" style="background: #8f5cfe; color: white; padding: 10px; border: none; border-radius: 5px; cursor: pointer;">बॉर्डर जोड़ें</button>
        <br><br>
        <canvas id="canvas" style="display:none;"></canvas>
        <div id="output"></div>
    `;

    document.getElementById('applyBorderBtn').onclick = () => {
        const fileInput = document.getElementById('borderInput');
        const color = document.getElementById('borderColor').value;
        const width = parseInt(document.getElementById('borderWidth').value);
        const output = document.getElementById('output');

        if (!fileInput.files[0]) {
            alert('कृपया पहले एक इमेज चुनें।');
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            const img = new Image();
            img.onload = () => {
                const canvas = document.getElementById('canvas');
                const ctx = canvas.getContext('2d');
                
                canvas.width = img.width + (width * 2);
                canvas.height = img.height + (width * 2);

                ctx.fillStyle = color;
                ctx.fillRect(0, 0, canvas.width, canvas.height);

                ctx.drawImage(img, width, width);

                output.innerHTML = '<p>प्रोसेसिंग पूरी हुई!</p>';
                const resultImg = document.createElement('img');
                resultImg.src = canvas.toDataURL();
                resultImg.style.maxWidth = '100%';
                output.appendChild(resultImg);
                
                const downloadBtn = document.createElement('a');
                downloadBtn.href = canvas.toDataURL();
                downloadBtn.download = 'bordered-image.png';
                downloadBtn.innerText = 'इमेज डाउनलोड करें';
                downloadBtn.style.display = 'block';
                downloadBtn.style.marginTop = '10px';
                downloadBtn.style.padding = '10px';
                downloadBtn.style.background = '#4CAF50';
                downloadBtn.style.color = 'white';
                downloadBtn.style.textAlign = 'center';
                downloadBtn.style.textDecoration = 'none';
                downloadBtn.style.borderRadius = '5px';
                output.appendChild(downloadBtn);
            };
            img.src = e.target.result;
        };
        reader.readAsDataURL(fileInput.files[0]);
    };
}
