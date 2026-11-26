export function init(container) {
    container.innerHTML = `
        <h3>दस्तावेज़ स्कैनर</h3>
        <video id="scannerView" autoplay playsinline style="width: 100%; max-width: 400px; background: #000;"></video>
        <br><br>
        <button id="captureBtn" style="background: #10b981; color: white; padding: 10px; border: none; border-radius: 5px; cursor: pointer;">फोटो खींचें</button>
        <canvas id="scanCanvas" style="display:none;"></canvas>
    `;

    document.getElementById('captureBtn').onclick = () => {
        alert('कैमरा से दस्तावेज़ कैप्चर किया जा रहा है।');
    };
}
