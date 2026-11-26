export function init(container) {
  container.innerHTML = `
    <div style="background: rgba(255, 255, 255, 0.1); padding: 20px; border-radius: 12px;">
      <h3 style="margin-top: 0; color: #8b5cf6;"> एडवांस इमेज रिसाइज़र और कंप्रेसर</h3>
      <div style="margin-bottom: 15px;">
        <label style="display: block; margin-bottom: 5px;">इमेज चुनें:</label>
        <input type="file" id="uploadImage" accept="image/*" style="width: 100%; padding: 8px; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.2); border-radius: 6px; color: white;">
      </div>
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 15px;">
        <div>
          <label style="display: block; margin-bottom: 5px;">लक्ष्य चौड़ाई (px):</label>
          <input type="number" id="targetWidth" value="800" style="width: 100%; padding: 8px; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.2); border-radius: 6px; color: white;">
        </div>
        <div>
          <label style="display: block; margin-bottom: 5px;">क्वालिटी (0.1 - 1.0):</label>
          <input type="number" id="targetQuality" value="0.8" step="0.1" min="0.1" max="1.0" style="width: 100%; padding: 8px; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.2); border-radius: 6px; color: white;">
        </div>
      </div>
      <button id="processBtn" style="width: 100%; padding: 12px; background: #8b5cf6; color: white; border: none; border-radius: 6px; font-weight: bold; cursor: pointer;">प्रोसेस और कंप्रेस करें</button>
      <div id="outputArea" style="margin-top: 20px; text-align: center;"></div>
    </div>
  `;

  document.getElementById('processBtn').addEventListener('click', processImage);
}

function processImage() {
  const fileInput = document.getElementById('uploadImage');
  const widthInput = document.getElementById('targetWidth');
  const qualityInput = document.getElementById('targetQuality');
  const outputArea = document.getElementById('outputArea');

  if (!fileInput.files[0]) {
    alert('कृपया सबसे पहले एक इमेज फाइल चुनें।');
    return;
  }

  const reader = new FileReader();
  reader.onload = function(event) {
    const img = new Image();
    img.onload = function() {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      const scaleFactor = parseInt(widthInput.value) / img.width;
      canvas.width = parseInt(widthInput.value);
      canvas.height = img.height * scaleFactor;
      
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      
      const quality = parseFloat(qualityInput.value);
      const dataUrl = canvas.toDataURL('image/jpeg', quality);
      
      outputArea.innerHTML = `
        <h4 style="margin-bottom: 10px;">परिणाम:</h4>
        <img src="${dataUrl}" style="max-width: 100%; max-height: 300px; border-radius: 8px; margin-bottom: 15px; box-shadow: 0 4px 10px rgba(0,0,0,0.3);">
        <br>
        <a href="${dataUrl}" download="compressed_${fileInput.files[0].name}" style="padding: 10px 20px; background: #ec4899; color: white; text-decoration: none; border-radius: 6px; font-weight: bold;">डाउनलोड इमेज</a>
      `;
    };
    img.src = event.target.result;
  };
  reader.readAsDataURL(fileInput.files[0]);
}
