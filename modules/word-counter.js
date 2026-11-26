export function init(container) {
    container.innerHTML = `
        <h3>वर्ड और कैरेक्टर काउंटर</h3>
        <textarea id="textInput" rows="8" placeholder="यहाँ टेक्स्ट पेस्ट करें या लिखें..."></textarea>
        <br><br>
        <div id="statsResult">शब्द: 0 | कैरेक्टर: 0</div>
    `;

    document.getElementById('textInput').oninput = () => {
        const text = document.getElementById('textInput').value.trim();
        const words = text ? text.split(/\s+/).length : 0;
        const chars = text.length;
        document.getElementById('statsResult').innerText = 'शब्द: ' + words + ' | कैरेक्टर: ' + chars;
    };
}
