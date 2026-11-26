export async function init(container) {
    if (!window.jspdf) {
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';
        document.head.appendChild(script);
        await new Promise((resolve) => script.onload = resolve);
    }

    container.innerHTML = `
        <style>
            .adv-decl-card { max-width: 650px; margin: 20px auto; padding: 30px; background: #ffffff; border-radius: 12px; box-shadow: 0 10px 25px rgba(0,0,0,0.15); font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; }
            .adv-decl-card h3 { text-align: center; color: #1a365d; margin-bottom: 25px; font-size: 24px; border-bottom: 2px solid #e2e8f0; padding-bottom: 15px; }
            .form-group { margin-bottom: 20px; }
            .form-group label { display: block; font-weight: 600; margin-bottom: 8px; color: #2d3748; }
            .form-group input, .form-group textarea { width: 100%; padding: 12px; border: 1px solid #cbd5e0; border-radius: 8px; font-size: 16px; box-sizing: border-box; transition: border-color 0.2s; }
            .form-group input:focus, .form-group textarea:focus { outline: none; border-color: #3182ce; ring: 3px solid #bee3f8; }
            .generate-btn { width: 100%; padding: 15px; background: linear-gradient(135deg, #3182ce, #2b6cb0); color: white; border: none; border-radius: 8px; font-size: 18px; font-weight: bold; cursor: pointer; transition: transform 0.1s, box-shadow 0.2s; }
            .generate-btn:hover { box-shadow: 0 4px 12px rgba(49,130,206,0.4); }
            .generate-btn:active { transform: scale(0.98); }
        </style>
        <div class="adv-decl-card">
            <h3>प्रमाणित स्व-घोषणा पत्र</h3>
            <div class="form-group">
                <label for="fullName">पूरा नाम</label>
                <input type="text" id="fullName" placeholder="उदाहरण: राजेश कुमार">
            </div>
            <div class="form-group">
                <label for="declarationBody">घोषणा का विवरण</label>
                <textarea id="declarationBody" rows="6" placeholder="यहाँ विस्तार से अपनी घोषणा लिखें..."></textarea>
            </div>
            <button class="generate-btn" id="generatePdfBtn">दस्तावेज़ बनाएँ और डाउनलोड करें</button>
        </div>
    `;

    document.getElementById('generatePdfBtn').onclick = () => {
        const name = document.getElementById('fullName').value.trim();
        const text = document.getElementById('declarationBody').value.trim();

        if (!name || !text) {
            alert('कृपया सभी आवश्यक क्षेत्र भरें।');
            return;
        }

        const { jsPDF } = window.jspdf;
        const doc = new jsPDF('p', 'mm', 'a4');
        const pageWidth = doc.internal.pageSize.width;

        // Header Styling
        doc.setFillColor(26, 54, 93);
        doc.rect(0, 0, pageWidth, 40, 'F');
        doc.setTextColor(255, 255, 255);
        doc.setFont("Helvetica", "bold");
        doc.setFontSize(22);
        doc.text('स्व-घोषणा पत्र', pageWidth / 2, 25, { align: 'center' });

        // Body Content
        doc.setTextColor(45, 55, 72);
        doc.setFont("Helvetica", "normal");
        doc.setFontSize(14);
        
        let yPosition = 60;
        doc.setFont("Helvetica", "bold");
        doc.text('सेवा में,', 20, yPosition);
        yPosition += 10;
        doc.text('संबंधित अधिकारी', 20, yPosition);

        yPosition += 20;
        doc.setFont("Helvetica", "bold");
        doc.text('विषय: स्व-प्रमाणित घोषणा पत्र', 20, yPosition);

        yPosition += 15;
        doc.setFont("Helvetica", "normal");
        doc.setFontSize(12);
        doc.text('मैं,', 20, yPosition);
        doc.setFont("Helvetica", "bold");
        doc.text(name, 28, yPosition);
        doc.setFont("Helvetica", "normal");
        doc.text(', एतద్ द्वारा निम्नलिखित घोषणा करता/करती हूँ:', 70, yPosition);

        yPosition += 15;
        constsplitLines = doc.splitTextToSize(text, pageWidth - 40);
        doc.text(splitLines, 20, yPosition);

        // Footer & Signature
        const pageHeight = doc.internal.pageSize.height;
        yPosition = pageHeight - 50;
        
        doc.line(140, yPosition, 200, yPosition); // Signature Line
        yPosition += 10;
        doc.text('घोषणाकर्ता के हस्ताक्षर', 140, yPosition);
        yPosition += 8;
        doc.setFontSize(10);
        doc.text(`नाम: ${name}`, 140, yPosition);
        yPosition += 6;
        doc.text(`दिनांक: ${new Date().toLocaleDateString('hi-IN')}`, 140, yPosition);

        doc.save(`${name.replace(/\s+/g, '_')}_Declaration.pdf`);
    };
}
