export function init(container) {
    container.innerHTML = `
        <h3>स्व-घोषणा पत्र जनरेटर</h3>
        <input type="text" id="declName" placeholder="अपना नाम लिखें..."><br><br>
        <textarea id="declText" rows="5" placeholder="घोषणा का विवरण..."></textarea><br><br>
        <button id="generateDeclBtn" style="background: #8b5cf6; color: white; padding: 10px; border: none; border-radius: 5px; cursor: pointer;">प्रमाण पत्र बनाएँ</button>
    `;

    document.getElementById('generateDeclBtn').onclick = () => {
        const name = document.getElementById('declName').value;
        const text = document.getElementById('declText').value;
        if (!name || !text) {
            alert('कृपया सभी जानकारी भरें।');
            return;
        }
        alert(name + ' के लिए स्व-घोषणा पत्र तैयार किया जा रहा है।');
    };
}
