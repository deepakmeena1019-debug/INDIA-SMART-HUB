export function init(container) {
    container.innerHTML = `
        <h3>GST कैलकुलेटर</h3>
        <input type="number" id="gstAmount" placeholder="मूल राशि (₹)..." style="width: 100%; max-width: 300px; padding: 8px;"><br><br>
        <select id="gstRate" style="padding: 8px;">
            <option value="5">5% GST</option>
            <option value="12">12% GST</option>
            <option value="18" selected>18% GST</option>
            <option value="28">28% GST</option>
        </select><br><br>
        <button id="calcGstBtn" style="background: #8b5cf6; color: white; padding: 10px 14px; border: none; border-radius: 5px; cursor: pointer;">GST निकालें</button>
        <h4 id="gstResult"></h4>
    `;

    document.getElementById('calcGstBtn').onclick = () => {
        const amt = parseFloat(document.getElementById('gstAmount').value);
        const rate = parseFloat(document.getElementById('gstRate').value);
        if (isNaN(amt) || amt <= 0) {
            alert('कृपया सही राशि भरें।');
            return;
        }
        const gstAmt = (amt * rate) / 100;
        const total = amt + gstAmt;
        document.getElementById('gstResult').innerText =
            'GST: ₹' + gstAmt.toFixed(2) + ' | कुल राशि: ₹' + total.toFixed(2);
    };
}
