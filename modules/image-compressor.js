export function init(container) {
    container.innerHTML = `
        <h3>इमेज कंप्रेसर</h3>
        <input type="file" id="compressInput" accept="image/*">
        <br><br>
        <label>क्वालिटी (0.1 से 1): </label><input type="number" id="qualityInput" step="0.1" value="0.7">
        <br><br>
        <button id="compressBtn" style="background: #8b5cf6; color: white; padding: 10px; border: none; border-radius: 5px; cursor: pointer;">कंप्रेस और डाउनलोड करें</button>
        <canvas id="compressCanvas" style="display:none;"></canvas>
    `;

    document.getElementById('compressBtn').onclick = () => {
        const fileInput = document.getElementById('compressInput');
        if (!fileInput.files[0]) {
            alert('कृपया एक इमेज चुनें।');
            return;
        }
        const reader = new FileReader();
        reader.onload = function(event) {
            const img = new Image();
            img.onload = function() {
                const canvas = document.getElementById('compressCanvas');
                const ctx = canvas.getContext('2d');
                canvas.width = img.width;
                canvas.height = img.height;
                ctx.drawImage(img, 0, 0);
                const quality = parseFloat(document.getElementById('qualityInput').value) || 0.7;
                const dataUrl = canvas.toDataURL('image/jpeg', quality);
                const a = document.createElement('a');
                a.href = dataUrl;
                a.download = 'compressed_image.jpg';
                a.click();
            };
            img.src = event.target.result;
        };
        reader.readAsDataURL(fileInput.files[0]);
    };
}
