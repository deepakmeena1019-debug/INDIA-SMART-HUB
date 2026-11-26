export function init(container) {
    container.innerHTML = `
        <h3>आयु कैलकुलेटर</h3>
        <label>जन्म तिथि: </label><input type="date" id="dobInput">
        <br><br>
        <button id="calcAgeBtn" style="background: #8b5cf6; color: white; padding: 10px; border: none; border-radius: 5px; cursor: pointer;">आयु की गणना करें</button>
        <h4 id="ageResult"></h4>
    `;

    document.getElementById('calcAgeBtn').onclick = () => {
        const dob = new Date(document.getElementById('dobInput').value);
        if (!dob || isNaN(dob)) {
            alert('कृपया सही जन्म तिथि चुनें।');
            return;
        }
        const today = new Date();
        let age = today.getFullYear() - dob.getFullYear();
        const m = today.getMonth() - dob.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
            age--;
        }
        document.getElementById('ageResult').innerText = 'आपकी कुल आयु ' + age + ' वर्ष है।';
    };
}
