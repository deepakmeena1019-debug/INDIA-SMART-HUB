export function init(container) {
    container.innerHTML = `
        <h3>सिग्नेचर रिसाइज़र</h3>
        <input type="file" id="sigInput" accept="image/*">
        <br><br>
        <label>चौड़ाई (px): </label><input type="number" id="sigWidth" value="150">
        <label>ऊँचाई (px): </label><input type="number" id="sigHeight" value="50">
        <br><br>
        <button id="resizeSigBtn" style="background: #8b5cf6; color: white; padding: 10px; border: none; border-radius: 5px; cursor: pointer;">सिग्नेचर तैयार करें</button>
        <canvas id="sigCanvas" style="display:none;"></canvas>
    `;

    document.getElementById('resizeSigBtn').onclick = () => {
        const fileInput = document.getElementById('sigInput');
        if (!fileInput.files[0]) {
            alert('कृपया सिग्नेचर की फोटो अपलोड करें।');
            return;
        }
        const reader = new FileReader();
        reader.onload = function(event) {
            const img = new Image();
            img.onload = function() {
                const canvas = document.getElementById('sigCanvas');
                const ctx = canvas.getContext('2d');
                canvas.width = parseInt(document.getElementById('sigWidth').value) || 150;
                canvas.height = parseInt(document.getElementById('sigHeight').value) || 50;
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                const dataUrl = canvas.toDataURL('image/jpeg');
                const a = document.createElement('a');
                a.href = dataUrl;
                a.download = 'resized_signature.jpg';
                a.click();
            };
            img.src = event.target.result;
        };
        reader.readAsDataURL(fileInput.files[0]);
    };
}
