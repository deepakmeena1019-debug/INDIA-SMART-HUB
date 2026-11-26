export function init(container) {
    container.innerHTML = `
        <h3>इमेज फ़्लिप टूल</h3>
        <input type="file" id="flipInput" accept="image/*"><br><br>
        <button id="flipHBtn" style="background: #8b5cf6; color: white; padding: 10px 12px; border: none; border-radius: 5px; cursor: pointer;">हॉरिज़ॉन्टल फ़्लिप</button>
        <button id="flipVBtn" style="background: #6d28d9; color: white; padding: 10px 12px; border: none; border-radius: 5px; cursor: pointer; margin-left: 6px;">वर्टिकल फ़्लिप</button>
        <br><br>
        <canvas id="flipCanvas" style="max-width: 100%; border: 1px solid #ddd; display: none;"></canvas>
    `;

    let currentImg = null;
    let scaleX = 1;
    let scaleY = 1;

    const render = () => {
        if (!currentImg) return;
        const canvas = document.getElementById('flipCanvas');
        const ctx = canvas.getContext('2d');
        canvas.width = currentImg.width;
        canvas.height = currentImg.height;
        canvas.style.display = 'block';

        ctx.save();
        ctx.translate(scaleX === -1 ? canvas.width : 0, scaleY === -1 ? canvas.height : 0);
        ctx.scale(scaleX, scaleY);
        ctx.drawImage(currentImg, 0, 0);
        ctx.restore();
    };

    document.getElementById('flipInput').onchange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = () => {
            const img = new Image();
            img.onload = () => {
                currentImg = img;
                scaleX = 1;
                scaleY = 1;
                render();
            };
            img.src = reader.result;
        };
        reader.readAsDataURL(file);
    };

    document.getElementById('flipHBtn').onclick = () => {
        if (!currentImg) return alert('पहले इमेज चुनें।');
        scaleX *= -1;
        render();
    };

    document.getElementById('flipVBtn').onclick = () => {
        if (!currentImg) return alert('पहले इमेज चुनें।');
        scaleY *= -1;
        render();
    };
}
