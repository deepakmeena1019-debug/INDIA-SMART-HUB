export async function init(container) {
    if (!window.jspdf) {
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';
        document.head.appendChild(script);
        await new Promise((resolve, reject) => {
            script.onload = resolve;
            script.onerror = () => reject(new Error('jsPDF load failed'));
        });
    }

    container.innerHTML = `
        <style>
            .ttp-card {
                max-width: 650px;
                margin: 20px auto;
                padding: 24px;
                background: #ffffff;
                border-radius: 14px;
                box-shadow: 0 10px 28px rgba(15, 23, 42, 0.14);
                font-family: system-ui, -apple-system, sans-serif;
                color: #1e293b;
            }
            .ttp-card h3 {
                text-align: center;
                margin: 0 0 18px;
                font-size: 22px;
                color: #4c1d95;
            }
            .ttp-field {
                margin-bottom: 14px;
            }
            .ttp-field label {
                display: block;
                font-size: 13px;
                font-weight: 600;
                margin-bottom: 6px;
                color: #334155;
            }
            .ttp-field input,
            .ttp-field select,
            .ttp-field textarea {
                width: 100%;
                padding: 10px 12px;
                border: 1px solid #cbd5e1;
                border-radius: 8px;
                font-size: 14px;
                box-sizing: border-box;
                font-family: inherit;
            }
            .ttp-field textarea {
                min-height: 180px;
                resize: vertical;
                line-height: 1.5;
            }
            .ttp-row {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
                gap: 12px;
                margin-bottom: 14px;
            }
            .ttp-btn {
                width: 100%;
                padding: 13px 16px;
                background: #7c3aed;
                color: #ffffff;
                border: none;
                border-radius: 9px;
                font-size: 16px;
                font-weight: 700;
                cursor: pointer;
                transition: background 0.2s ease;
            }
            .ttp-btn:hover {
                background: #6d28d9;
            }
            .ttp-status {
                margin-top: 12px;
                font-size: 13px;
                text-align: center;
                color: #475569;
                min-height: 18px;
            }
        </style>

        <div class="ttp-card">
            <h3>टेक्स्ट टू पीडीएफ कन्वर्टर</h3>

            <div class="ttp-row">
                <div class="ttp-field" style="margin-bottom:0;">
                    <label for="ttpFileName">फाइल का नाम</label>
                    <input type="text" id="ttpFileName" value="converted_document" placeholder="जैसे: my_notes">
                </div>
                <div class="ttp-field" style="margin-bottom:0;">
                    <label for="ttpFontSize">फ़ॉन्ट साइज़ (pt)</label>
                    <select id="ttpFontSize">
                        <option value="11">11 pt</option>
                        <option value="12" selected>12 pt</option>
                        <option value="14">14 pt</option>
                        <option value="16">16 pt</option>
                    </select>
                </div>
            </div>

            <div class="ttp-field">
                <label for="ttpTextArea">यहाँ टेक्स्ट लिखें या पेस्ट करें</label>
                <textarea id="ttpTextArea" placeholder="यहाँ अपना टेक्स्ट टाइप या पेस्ट करें..."></textarea>
            </div>

            <button type="button" class="ttp-btn" id="ttpDownloadBtn">PDF डाउनलोड करें</button>
            <div class="ttp-status" id="ttpStatus"></div>
        </div>
    `;

    const textArea = document.getElementById('ttpTextArea');
    const fileNameInput = document.getElementById('ttpFileName');
    const fontSizeSelect = document.getElementById('ttpFontSize');
    const downloadBtn = document.getElementById('ttpDownloadBtn');
    const statusEl = document.getElementById('ttpStatus');

    downloadBtn.onclick = () => {
        const rawText = (textArea.value || '').trim();
        if (!rawText) {
            alert('कृपया पीडीएफ बनाने के लिए कुछ टेक्स्ट लिखें या पेस्ट करें।');
            return;
        }

        try {
            const { jsPDF } = window.jspdf;
            const doc = new jsPDF({
                orientation: 'portrait',
                unit: 'pt',
                format: 'a4'
            });

            const fontSize = parseInt(fontSizeSelect.value, 10) || 12;
            const margin = 40;
            const pageWidth = doc.internal.pageSize.getWidth();
            const pageHeight = doc.internal.pageSize.getHeight();
            const maxLineWidth = pageWidth - margin * 2;
            const lineHeight = fontSize * 1.45;

            doc.setFont('helvetica', 'normal');
            doc.setFontSize(fontSize);

            const paragraphs = rawText.split(/\r?\n/);
            let cursorY = margin + fontSize;

            for (const para of paragraphs) {
                const wrappedLines = doc.splitTextToSize(para || ' ', maxLineWidth);
                for (const line of wrappedLines) {
                    if (cursorY + lineHeight > pageHeight - margin) {
                        doc.addPage();
                        cursorY = margin + fontSize;
                    }
                    doc.text(line, margin, cursorY);
                    cursorY += lineHeight;
                }
            }

            const cleanName = (fileNameInput.value || 'converted_document')
                .trim()
                .replace(/[^a-zA-Z0-9_-]/g, '_') || 'converted_document';
            const finalFileName = cleanName.toLowerCase().endsWith('.pdf')
                ? cleanName
                : `${cleanName}.pdf`;

            const pdfBlob = doc.output('blob');
            if (!pdfBlob || pdfBlob.size === 0) {
                throw new Error('Empty PDF blob');
            }

            const blobUrl = URL.createObjectURL(pdfBlob);
            const link = document.createElement('a');
            link.href = blobUrl;
            link.download = finalFileName;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            setTimeout(() => URL.revokeObjectURL(blobUrl), 1500);

            statusEl.textContent = `पीडीएफ तैयार हो गई: ${finalFileName}`;
        } catch (err) {
            statusEl.textContent = 'पीडीएफ बनाने में त्रुटि आई। कृपया दोबारा प्रयास करें।';
            alert('पीडीएफ जनरेट करने में समस्या आई।');
        }
    };
}
