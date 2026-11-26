export function init(container) {
    container.innerHTML = `
        <h3>डिस्काउंट कैलकुलेटर</h3>
        <input type="number" id="originalPrice" placeholder="मूल्य..."><br><br>
        <input type="number" id="discountRate" placeholder="छूट प्रतिशत..."><br><br>
        <button id="calcDiscBtn" style="background: #8b5cf6; color: white; padding: 10px; border: none; border-radius: 5px; cursor: pointer;">छूट की गणना करें</button>
        <h4 id="discResult"></h4>
    `;

    document.getElementById('calcDiscBtn').onclick = () => {
        const price = parseFloat(document.getElementById('originalPrice').value);
        const discount = parseFloat(document.getElementById('discountRate').value);
        if (isNaN(price) || isNaN(discount) || price < 0 || discount < 0) {
            alert('कृपया सही मान भरें।');
            return;
        }
        const amountSaved = (price * discount) / 100;
        const finalPrice = price - amountSaved;
        document.getElementById('discResult').innerText = 'बचत: ' + amountSaved.toFixed(2) + ' | अंतिम मूल्य: ' + finalPrice.toFixed(2);
    };
}
