export function init(container) {
    container.innerHTML = `
        <h3>फोटो पर टेक्स्ट जोड़ें</h3>
        <input type="file" id="textImageInput" accept="image/*"><br><br>
        <input type="text" id="imageText" placeholder="अपना टेक्स्ट लिखें..."><br><br>
        <button id="applyTextBtn" style="background: #8b5cf6; color: white; padding: 10px; border: none; border-radius: 5px; cursor: pointer;">टेक्स्ट लगाएँ</button>
    `;

    document.getElementById('applyTextBtn').onclick = () => {
        alert('इमेज पर टेक्स्ट सेट किया जा रहा है।');
    };
}
