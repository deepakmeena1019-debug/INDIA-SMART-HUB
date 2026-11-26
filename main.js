let activeLoadToken = 0;

export async function loadTool(toolName) {
    const workspace = document.getElementById('workspace');
    if (!workspace) return;

    // सुरक्षित नाम जाँच (ताकि पाथ में कोई गड़बड़ न हो)
    if (!toolName || !/^[a-z0-9-]+$/i.test(toolName)) {
        workspace.innerHTML = `
            <div style="padding:20px;border-radius:10px;background:#fef2f2;color:#991b1b;">
                <h3 style="margin:0 0 6px;">अमान्य टूल</h3>
                <p style="margin:0;font-size:14px;">कृपया मेनू या डैशबोर्ड से सही टूल चुनें।</p>
            </div>
        `;
        return;
    }

    const loadToken = ++activeLoadToken;

    workspace.innerHTML = `
        <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:260px;gap:10px;color:#334155;">
            <div style="width:34px;height:34px;border:4px solid #e2e8f0;border-top-color:#7c3aed;border-radius:50%;animation:toolSpin 0.8s linear infinite;"></div>
            <p style="margin:0;font-weight:600;">लोड हो रहा है...</p>
        </div>
        <style>@keyframes toolSpin { to { transform: rotate(360deg); } }</style>
    `;

    try {
        const mod = await import(`./modules/${toolName}.js?cachebust=${Date.now()}`);

        // यदि यूज़र ने इस बीच कोई दूसरा टूल चुन लिया है, तो पुराने टूल को रेंडर न करें
        if (loadToken !== activeLoadToken) return;

        if (!mod || typeof mod.init !== 'function') {
            throw new Error(`"${toolName}.js" में init() फ़ंक्शन नहीं मिला।`);
        }

        workspace.innerHTML = '';
        await mod.init(workspace);
    } catch (err) {
        if (loadToken !== activeLoadToken) return;

        console.error('टूल लोड करने में विफल:', err);
        workspace.innerHTML = `
            <div style="padding:22px;border-radius:12px;background:#fef2f2;border:1px solid #fecaca;color:#991b1b;">
                <h2 style="margin:0 0 8px;font-size:20px;color:#dc2626;">त्रुटि</h2>
                <p style="margin:0 0 6px;font-size:14px;">माफ़ कीजिए, यह टूल अभी उपलब्ध नहीं है या लोड नहीं हो पाया।</p>
                <p style="margin:0;font-size:12.5px;color:#7f1d1d;">मॉड्यूल फ़ाइल <code>./modules/${toolName}.js</code> और उसका <code>init()</code> फ़ंक्शन जाँचें।</p>
            </div>
        `;
    }
}
