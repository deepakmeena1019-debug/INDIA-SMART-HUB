export function init(container) {
    container.innerHTML = `
        <h3>पासवर्ड जनरेटर</h3>
        <label>लंबाई (6–32): </label>
        <input type="number" id="passLen" value="12" min="6" max="32" style="width: 80px; padding: 6px;"><br><br>
        <button id="genPassBtn" style="background: #8b5cf6; color: white; padding: 10px 14px; border: none; border-radius: 5px; cursor: pointer;">पासवर्ड बनाएँ</button>
        <h4 id="passResult" style="user-select: all;"></h4>
    `;

    document.getElementById('genPassBtn').onclick = () => {
        const len = parseInt(document.getElementById('passLen').value, 10);
        if (isNaN(len) || len < 6 || len > 32) {
            alert('कृपया 6 से 32 के बीच की लंबाई चुनें।');
            return;
        }
        const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789!@#$%^&*';
        let pass = '';
        for (let i = 0; i < len; i++) {
            const idx = Math.floor(Math.random() * chars.length);
            pass += chars[idx];
        }
        document.getElementById('passResult').innerText = pass;
    };
}
