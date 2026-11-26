export function init(container) {
    container.innerHTML = `
        <h3>PDF मेकर</h3>
        <textarea id="pdfText" rows="5" placeholder="यहाँ टेक्स्ट लिखें..."></textarea>
        <br><br>
        <button id="generatePdfBtn" style="background: #8b5cf6; color: white; padding: 10px; border: none; border-radius: 5px; cursor: pointer;">PDF बनाएँ</button>
    `;

    document.getElementById('generatePdfBtn').onclick = () => {
        const text = document.getElementById('pdfText').value;
        if (!text.trim()) {
            alert('कृपया कुछ टेक्स्ट लिखें।');
            return;
        }
        const blob = new Blob([text], { type: 'application/pdf' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'document.pdf';
        link.click();
    };
}
