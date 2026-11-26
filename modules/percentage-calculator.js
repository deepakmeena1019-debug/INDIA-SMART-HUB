export function init(container) {
    container.innerHTML = `
        <h3>प्रतिशत कैलकुलेटर</h3>
        <input type="number" id="obtainedMarks" placeholder="प्राप्तांक/मूल्य..."><br><br>
        <input type="number" id="totalMarks" placeholder="कुल मान..."><br><br>
        <button id="calcPercBtn" style="background: #8b5cf6; color: white; padding: 10px; border: none; border-radius: 5px; cursor: pointer;">प्रतिशत निकालें</button>
        <h4 id="percResult"></h4>
    `;

    document.getElementById('calcPercBtn').onclick = () => {
        const obtained = parseFloat(document.getElementById('obtainedMarks').value);
        const total = parseFloat(document.getElementById('totalMarks').value);
        if (isNaN(obtained) || isNaN(total) || total === 0) {
            alert('कृपया सही मान भरें।');
            return;
        }
        const percentage = (obtained / total) * 100;
        document.getElementById('percResult').innerText = 'परिणाम: ' + percentage.toFixed(2) + '%';
    };
}
