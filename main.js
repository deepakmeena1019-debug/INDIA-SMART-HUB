async function loadTool(toolName) {
    const workspace = document.getElementById('workspace');
    workspace.innerHTML = '<p>लोड हो रहा है...</p>';

    try {
        const module = await import(`./modules/${toolName}.js?cachebust=${Date.now()}`);
        module.init(workspace);
    } catch (err) {
        console.error("टूल लोड करने में विफल:", err);
        workspace.innerHTML = '<h2 style="color: #ef4444;">त्रुटि</h2><p>माफ़ कीजिए, यह टूल अभी उपलब्ध नहीं है। कृपया मॉड्यूल की जाँच करें。</p>';
    }
}
