export function init(container) {
    container.innerHTML = `
        <h3>PDF मर्ज टूल</h3>
        <input type="file" id="pdfInput" multiple accept="application/pdf">
        <br><br>
        <button id="mergeBtn" style="background: #8b5cf6; color: white; padding: 10px; border: none; border-radius: 5px; cursor: pointer;">फाइलें चुनें और मर्ज करें</button>
        <p><small>नोट: उन्नत प्रोसेसिंग के लिए लाइब्रेरी एकीकरण आवश्यक है।</small></p>
    `;

    document.getElementById('mergeBtn').onclick = () => {
        const fileInput = document.getElementById('pdfInput');
        if (fileInput.files.length < 2) {
            alert('कृपया मर्ज करने के लिए कम से कम दो PDF फाइलें चुनें।');
            return;
        }
        alert(fileInput.files.length + ' फाइलें प्रोसेस की जा रही हैं।');
    };
}
