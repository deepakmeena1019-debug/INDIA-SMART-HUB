export function init(container) {
    container.innerHTML = `
        <h3>टेक्स्ट टू पीडीएफ कन्वर्टर</h3>
        <textarea id="textContent" rows="10" placeholder="यहाँ टेक्स्ट लिखें..."></textarea>
        <br><br>
        <button id="convertBtn" style="background: #8b5cf6; color: white; padding: 10px; border: none; border-radius: 5px; cursor: pointer;">PDF डाउनलोड करें</button>
    `;

    document.getElementById('convertBtn').onclick = () => {
        const text = document.getElementById('textContent').value;
        if (!text.trim()) {
            alert('कृपया कुछ टेक्स्ट लिखें।');
            return;
        }
        const blob = new Blob([text], { type: 'application/pdf' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'converted_document.pdf';
        link.click();
    };
}
