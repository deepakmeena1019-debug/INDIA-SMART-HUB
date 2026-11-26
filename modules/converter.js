export function init(container) {
  container.innerHTML = `
    <div style="background: rgba(255, 255, 255, 0.1); padding: 20px; border-radius: 12px;">
      <h3 style="margin-top: 0; color: #ec4899;"> इमेज फॉर्मेट कनवर्टर</h3>
      <div style="margin-bottom: 15px;">
        <label style="display: block; margin-bottom: 5px;">इमेज चुनें:</label>
        <input type="file" id="convImage" accept="image/*" style="width: 100%; padding: 8px; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.2); border-radius: 6px; color: white;">
      </div>
      <div style="margin-bottom: 15px;">
        <label style="display: block; margin-bottom: 5px;">टारगेट फॉर्मेट:</label>
        <select id="targetFormat" style="width: 100%; padding: 8px; background: #1f2937; border: 1px solid rgba(255,255,255,0.2); border-radius: 6px; color: white;">
          <option value="image/jpeg">JPG</option>
          <option value="image/png">PNG</option>
          <option value="image/webp">WEBP</option>
        </select>
      </div>
      <button id="convertBtn" style="width: 100%; padding: 12px; background: #ec4899; color: white; border: none; border-radius: 6px; font-weight: bold; cursor: pointer;">कन्वर्ट करें</button>
      <div id="convOutput" style="margin-top: 20px; text-align: center;"></div>
    </div>
  `;

  document.getElementById('convertBtn').addEventListener('click', convertImage);
}

function convertImage() {
  const fileInput = document.getElementById('convImage');
  const format = document.getElementById('targetFormat').value;
  const outputArea = document.getElementById('convOutput');

  if (!fileInput.files[0]) {
    alert('कृपया सबसे पहले एक फाइल चुनें।');
    return;
  }

  const reader = new FileReader();
  reader.onload = function(event) {
    const img = new Image();
    img.onload = function() {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      
      if (format === 'image/jpeg') {
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
      
      ctx.drawImage(img, 0, 0);
      
      const dataUrl = canvas.toDataURL(format, 0.9);
      const extension = format.split('/')[1].replace('jpeg', 'jpg');
      
      outputArea.innerHTML = `
        <h4 style="margin-bottom: 10px;">कन्वर्ट की गई इमेज:</h4>
        <img src="${dataUrl}" style="max-width: 100%; max-height: 300px; border-radius: 8px; margin-bottom: 15px; box-shadow: 0 4px 10px rgba(0,0,0,0.3);">
        <br>
        <a href="${dataUrl}" download="converted_${fileInput.files[0].name.split('.')[0]}.${extension}" style="padding: 10px 20px; background: #8b5cf6; color: white; text-decoration: none; border-radius: 6px; font-weight: bold;">डाउनलोड ${extension.toUpperCase()}</a>
      `;
    };
    img.src = event.target.result;
  };
  reader.readAsDataURL(fileInput.files[0]);
}
