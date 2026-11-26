export function init(container) {
    container.innerHTML = `
        <h3>सरकारी फॉर्म फोटो/सिग्नेचर रिसाइज़र</h3>
        <input type="file" id="docInput" accept="image/*">
        <br><br>
        <label>चौड़ाई (px): </label><input type="number" id="widthInput" value="200">
        <br><br>
        <button id="resizeBtn" style="background: #8b5cf6; color: white; padding: 10px; border: none; border-radius: 5px; cursor: pointer;">रीसाइज और डाउनलोड करें</button>
        <canvas id="docCanvas" style="display:none;"></canvas>
    `;

    document.getElementById('resizeBtn').onclick = () => {
        const fileInput = document.getElementById('docInput');
        if (!fileInput.files[0]) {
            alert('कृपया पहले एक फोटो चुनें।');
            return;
        }
        const reader = new FileReader();
        reader.onload = function(event) {
            const img = new Image();
            img.onload = function() {
                const canvas = document.getElementById('docCanvas');
                const ctx = canvas.getContext('2d');
                const targetWidth = parseInt(document.getElementById('widthInput').value) || 200;
                const scaleFactor = targetWidth / img.width;
                canvas.width = targetWidth;
                canvas.height = img.height * scaleFactor;
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                const dataUrl = canvas.toDataURL('image/jpeg');
                const a = document.createElement('a');
                a.href = dataUrl;
                a.download = 'resized_document.jpg';
                a.click();
            };
            img.src = event.target.result;
        };
        reader.readAsDataURL(fileInput.files[0]);
    };
}
