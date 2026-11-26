export function init(container) {
    container.innerHTML = `
        <h3>पासपोर्ट फोटो मेकर</h3>
        <input type="file" id="photoInput" accept="image/*">
        <br><br>
        <button id="processPhotoBtn" style="background: #8b5cf6; color: white; padding: 10px; border: none; border-radius: 5px; cursor: pointer;">फोटो तैयार करें</button>
        <canvas id="photoCanvas" style="display:none;"></canvas>
    `;

    document.getElementById('processPhotoBtn').onclick = () => {
        const fileInput = document.getElementById('photoInput');
        if (!fileInput.files[0]) {
            alert('कृपया एक फोटो अपलोड करें।');
            return;
        }
        const reader = new FileReader();
        reader.onload = function(event) {
            const img = new Image();
            img.onload = function() {
                const canvas = document.getElementById('photoCanvas');
                const ctx = canvas.getContext('2d');
                canvas.width = 413; // Standard 35mm x 45mm at 300 DPI
                canvas.height = 531;
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                const dataUrl = canvas.toDataURL('image/jpeg');
                const a = document.createElement('a');
                a.href = dataUrl;
                a.download = 'passport_photo.jpg';
                a.click();
            };
            img.src = event.target.result;
        };
        reader.readAsDataURL(fileInput.files[0]);
    };
}
