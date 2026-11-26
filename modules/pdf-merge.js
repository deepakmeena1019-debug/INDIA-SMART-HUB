export async function init(container) {
    // Dynamically load pdf-lib and jsPDF from CDN
    if (!window.PDFLib) {
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf-lib/1.17.1/pdf-lib.min.js';
        document.head.appendChild(script);
        await new Promise((resolve) => script.onload = resolve);
    }
    if (!window.jspdf) {
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';
        document.head.appendChild(script);
        await new Promise((resolve) => script.onload = resolve);
    }

    container.innerHTML = `
        <style>
            .merger-card { max-width: 600px; margin: 20px auto; padding: 30px; background: #ffffff; border-radius: 12px; box-shadow: 0 10px 25px rgba(0,0,0,0.15); font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; }
            .merger-card h3 { text-align: center; color: #1a365d; margin-bottom: 20px; }
            .upload-area { border: 2px dashed #3182ce; padding: 40px; text-align: center; border-radius: 8px; background: #ebf8ff; color: #2b6cb0; font-weight: 600; cursor: pointer; margin-bottom: 20px; }
            .file-list { margin-bottom: 20px; max-height: 150px; overflow-y: auto; font-size: 14px; color: #4a5568; }
            .file-item { padding: 5px 0; border-bottom: 1px solid #e2e8f0;display: flex; justify-content: space-between; }
            .merge-btn { width: 100%; padding: 15px; background: linear-gradient(135deg, #3182ce, #2b6cb0); color: white; border: none; border-radius: 8px; font-size: 18px; font-weight: bold; cursor: pointer; }
            .status { text-align: center; margin-top: 15px; font-weight: 600; color: #2d3748; }
        </style>
        <div class="merger-card">
            <h3>अल्टीमेट पीडीएफ मर्जर</h3>
            <div class="upload-area" id="dropZone">
                यहाँ फ़ाइलें चुनें (PDF, JPG, PNG)
                <input type="file" id="fileInput" multiple accept=".pdf,image/*" style="display: none;">
            </div>
            <div class="file-list" id="fileList">कोई फ़ाइल नहीं चुनी गई</div>
            <button class="merge-btn" id="mergeBtn">पीडीएफ़ बनाएँ और मर्ज करें</button>
            <div class="status" id="statusArea"></div>
        </div>
    `;

    const fileInput = document.getElementById('fileInput');
    const dropZone = document.getElementById('dropZone');
    const fileList = document.getElementById('fileList');
    const mergeBtn = document.getElementById('mergeBtn');
    const statusArea = document.getElementById('statusArea');

    let selectedFiles = [];

    dropZone.onclick = () => fileInput.click();

    fileInput.onchange = (e) => {
        selectedFiles = Array.from(e.target.files);
        if (selectedFiles.length > 0) {
            fileList.innerHTML = selectedFiles.map(f => `<div class="file-item"><span>${f.name}</span><span>${(f.size/1024/1024).toFixed(2)} MB</span></div>`).join('');
        } else {
            fileList.innerHTML = 'कोई फ़ाइल नहीं चुनी गई';
        }
    };

    mergeBtn.onclick = async () => {
        if (selectedFiles.length === 0) {
            alert('कृपया कम से कम एक फ़ाइल चुनें।');
            return;
        }

        statusArea.innerText = 'प्रक्रिया चल रही है, कृपया प्रतीक्षा करें...';
        const { PDFDocument } = window.PDFLib;
        const { jsPDF } = window.jspdf;
        const mergedPdf = await PDFDocument.create();

        try {
            for (const file of selectedFiles) {
                const arrayBuffer = await file.arrayBuffer();

                if (file.type === 'application/pdf') {
                    // Load existing PDF and copy pages
                    const srcDoc = await PDFDocument.load(arrayBuffer);
                    const copiedPages = await mergedPdf.copyPages(srcDoc, srcDoc.getPageIndices());
                    copiedPages.forEach((page) => mergedPdf.addPage(page));
                } else if (file.type.startsWith('image/')) {
                    // Convert Image to PDF using jsPDF
                    const imgData = await new Promise((resolve) => {
                        const reader = new FileReader();
                        reader.onload = (e) => resolve(e.target.result);
                        reader.readAsDataURL(file);
                    });

                    // Create a temporary Image object to get dimensions
                    const img = new Image();
                    img.src = imgData;
                    await new Promise((resolve) => img.onload = resolve);

                    const orientation = img.width > img.height ? 'l' : 'p';
                    const tempPdf = new jsPDF(orientation, 'px', [img.width, img.height]);
                    tempPdf.addImage(imgData, 'JPEG', 0, 0, img.width, img.height);
                    
                    const pdfBytes = tempPdf.output('arraybuffer');
                    const imgPdfDoc = await PDFDocument.load(pdfBytes);
                    const pages = await mergedPdf.copyPages(imgPdfDoc, imgPdfDoc.getPageIndices());
                    pages.forEach((page) => mergedPdf.addPage(page));
                }
            }

            const mergedPdfBytes = await mergedPdf.save();
            const blob = new Blob([mergedPdfBytes], { type: 'application/pdf' });
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = 'merged_document.pdf';
            link.click();
            statusArea.innerHTML = '<span style="color: green;">सफलतापूर्वक मर्ज हो गया!</span>';

        } catch (error) {
            console.error(error);
            statusArea.innerHTML = '<span style="color: red;">प्रक्रिया में त्रुटि आई।</span>';
        }
    };
        }
