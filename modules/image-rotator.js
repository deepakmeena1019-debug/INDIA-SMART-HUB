export function init(container) {
    container.innerHTML = `
        <h3>इमेज घुमाएँ</h3>
        <input type="file" id="rotImageInput" accept="image/*"><br><br>
        <button id="rotate90Btn" style="background: #8b5cf6; color: white; padding: 10px; border: none; border-radius: 5px; cursor: pointer;">90° घुमाएँ</button>
    `;

    document.getElementById('rotate90Btn').onclick = () => {
        alert('इमेज को 90 डिग्री घुमाया जा रहा है।');
    };
}
