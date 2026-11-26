export function init(container) {
    container.innerHTML = `
        <h3>EMI कैलकुलेटर</h3>
        <input type="number" id="loanAmount" placeholder="लोन की राशि (₹)..." style="width: 100%; max-width: 300px; padding: 8px;"><br><br>
        <input type="number" id="annualRate" placeholder="सालाना ब्याज दर (%)..." step="0.1" style="width: 100%; max-width: 300px; padding: 8px;"><br><br>
        <input type="number" id="tenureMonths" placeholder="अवधि (महीनों में)..." style="width: 100%; max-width: 300px; padding: 8px;"><br><br>
        <button id="calcEmiBtn" style="background: #8b5cf6; color: white; padding: 10px 14px; border: none; border-radius: 5px; cursor: pointer;">EMI निकालें</button>
        <h4 id="emiResult"></h4>
    `;

    document.getElementById('calcEmiBtn').onclick = () => {
        const p = parseFloat(document.getElementById('loanAmount').value);
        const annual = parseFloat(document.getElementById('annualRate').value);
        const n = parseInt(document.getElementById('tenureMonths').value, 10);

        if (isNaN(p) || isNaN(annual) || isNaN(n) || p <= 0 || annual < 0 || n <= 0) {
            alert('कृपया सही मान भरें।');
            return;
        }

        const r = annual / 12 / 100;
        let emi = 0;
        if (r === 0) {
            emi = p / n;
        } else {
            const factor = Math.pow(1 + r, n);
            emi = (p * r * factor) / (factor - 1);
        }

        const totalPayment = emi * n;
        const totalInterest = totalPayment - p;

        document.getElementById('emiResult').innerText =
            'मासिक EMI: ₹' + emi.toFixed(2) +
            ' | कुल ब्याज: ₹' + totalInterest.toFixed(2) +
            ' | कुल भुगतान: ₹' + totalPayment.toFixed(2);
    };
}
