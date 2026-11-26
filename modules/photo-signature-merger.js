export function init(container) {
    container.innerHTML = `
        <h3>फोटो और सिग्नेचर मर्जर</h3>
        <label>फोटो चुनें: </label><input type="file" id="photoInput" accept="image/*"><br><br>
        <label>सिग्नेचर चुनें: </label><input type="file" id="sigInput" accept="image/*"><br><br>
        <button id="mergePhotosBtn" style="background: #8b5cf6; color: white; padding: 10px; border: none; border-radius: 5px; cursor: pointer;">मर्ज करके डाउनलोड करें</button>
        <canvas id="mergedCanvas" style="display:none;"></canvas>
    `;

    document.getElementById('mergePhotosBtn').onclick = () => {
        const photoFile = document.getElementById('photoInput').files[0];
        const sigFile = document.getElementById('sigInput').files[0];
        if (!photoFile || !sigFile) {
            alert('कृपया फोटो और सिग्नेचर दोनों फाइलें चुनें।');
            return;
        }
        // Processing logic to draw both on canvas and download
    };
}
