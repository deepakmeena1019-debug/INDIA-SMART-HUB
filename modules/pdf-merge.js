export async function init(container) {
    // Dynamically load pdf-lib from CDN
    if (!window.PDFLib) {
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf-lib/1.17.1/pdf-lib.min.js';
        document.head.appendChild(script);
        await new Promise((resolve) => script.onload = resolve);
    }

    container.innerHTML = `
        <h3>PDF मर्ज टूल</h3>
        <input type="file" id="pdfInput" multiple accept="application/pdf"><br><br>
        <button id="mergeBtn" style="background: #8f5cfe; color: white; padding: 10px; border: none; border-radius: 5px; cursor: pointer;">PDF मर्ज करें</button>
        <div id="output" style="margin-top: 15px;"></div>
    `;

    document.getElementById('mergeBtn').onclick = async () => {
        const fileInput = document.getElementById('pdfInput');
        const output = document.getElementById('output');

        if (fileInput.files.length < 2) {
            alert('कृपया मर्ज करने के लिए कम से कम दो PDF फाइलें चुनें।');
            return;
        }

        output.innerHTML = 'प्रोसेसिंग चल रही है...';

        try {
            const { PDFDocument } = window.PDFLib;
            const mergedPdf = await PDFDocument.create();

            for (const file of fileInput.files) {
                const arrayBuffer = await file.arrayBuffer();
                const pdf = await PDFDocument.load(arrayBuffer);
                const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
                copiedPages.forEach((page) => mergedPdf.addPage(page));
            }

            const mergedPdfBytes = await mergedPdf.save();
            const blob = new Blob([mergedPdfBytes], { type: 'application/pdf' });
            
            output.innerHTML = '<p>सभी PDF सफलतापूर्वक मर्ज हो गई हैं!</p>';
            const downloadBtn = document.createElement('a');
            downloadBtn.href = URL.createObjectURL(blob);
            downloadBtn.download = 'merged-files.pdf';
            downloadBtn.innerText = 'मर्ज की गई PDF डाउनलोड करें';
            downloadBtn.style.display = 'block';
            downloadBtn.style.padding = '10px';
            downloadBtn.style.background = '#4CAF50';
            downloadBtn.style.color = 'white';
            downloadBtn.style.textAlign = 'center';
            downloadBtn.style.textDecoration = 'none';
            downloadBtn.style.borderRadius = '5px';
            output.appendChild(downloadBtn);

        } catch (error) {
            console.error(error);
            output.innerHTML = '<p style="color: red;">मर्ज करने में त्रुटि आई। कृपया वैध PDF फाइलें चुनें।</p>';
        }
    };
}
