let lang = 'en';
let activeObjectUrl = null;

const i18n = {
  en: {
    tagline: 'One Website, Hundreds of Useful Tools.',
    heroTitle: 'Smart India Hub',
    heroSub: 'One Website, Hundreds of Useful Tools. — Fast, free & mobile-friendly utilities.',
    searchPh: 'What do you want to do today?',
    searchBtn: 'Search',
    langBtn: 'हिन्दी',
    allTools: 'All Tools',
    blog: 'Blog',
    about: 'About',
    privacy: 'Privacy',
    close: 'Close ✕',
    readyTag: 'Working Tool',
    configTag: 'API / Feed Setup Needed',
    infoHeading: 'Pages, Blog & Policies',
    adTop: 'Advertisement Space (Google AdSense Ready)',
    adMid: 'Advertisement Space (Google AdSense Ready)',
    footerTag: 'One Website, Hundreds of Useful Tools.',
    noResults: 'No matching tools found. Try another keyword.',
    infoCards: [
      { title: 'About Us', body: 'Smart India Hub helps students, e-commerce sellers, job applicants, and everyday users resize documents, host bulk listing images, calculate numbers, and format text quickly in the browser.' },
      { title: 'Blog & Guides', body: 'Guides on Cloudinary bulk image hosting for Amazon & Flipkart listings, setting photo dimensions & KB sizes for forms, understanding EMI & percentage calculations, and writing strong passwords.' },
      { title: 'Privacy Policy & Disclaimer', body: 'Images processed in local browser tools are not uploaded to external servers without your action. Cloudinary direct uploads send files straight to your account. Government exam details and rankings are never guaranteed—always verify official notices.' },
      { title: 'Contact & Terms', body: 'Add your official support email and terms before publishing publicly. Tools requiring external APIs or live feeds clearly show configuration status.' }
    ],
    footerLinks: ['Home', 'All Tools', 'About Us', 'Contact Us', 'Privacy Policy', 'Terms', 'Disclaimer', 'Sitemap']
  },
  hi: {
    tagline: 'एक वेबसाइट, सैकड़ों उपयोगी टूल्स।',
    heroTitle: 'स्मार्ट इंडिया हब (Smart India Hub)',
    heroSub: 'एक वेबसाइट, सैकड़ों उपयोगी टूल्स। — तेज़, मोबाइल-फ्रेंडली ऑनलाइन टूल्स।',
    searchPh: 'आज आप क्या करना चाहते हैं? (What do you want to do today?)',
    searchBtn: 'खोजें',
    langBtn: 'English',
    allTools: 'सभी टूल्स',
    blog: 'ब्लॉग',
    about: 'हमारे बारे में',
    privacy: 'प्राइवेसी',
    close: 'बंद करें ✕',
    readyTag: 'तैयार टूल',
    configTag: 'API / डेटा सेटअप ज़रूरी',
    infoHeading: 'पेज, ब्लॉग और नीतियां',
    adTop: 'विज्ञापन स्थान (Google AdSense के लिए तैयार)',
    adMid: 'विज्ञापन स्थान (Google AdSense के लिए तैयार)',
    footerTag: 'एक वेबसाइट, सैकड़ों उपयोगी टूल्स।',
    noResults: 'कोई टूल नहीं मिला। कृपया दूसरा शब्द खोजें.',
    infoCards: [
      { title: 'हमारे बारे में', body: 'स्मार्ट इंडिया हब छात्रों, ई-कॉमर्स सेलर्स, आवेदकों और आम उपयोगकर्ताओं को फोटो साइज बदलने, बल्क लिस्टिंग इमेज होस्ट करने, गणना करने और टेक्स्ट फ़ॉर्मेट करने में मदद करता है।' },
      { title: 'ब्लॉग और गाइड', body: 'अमेज़ॅन और फ्लिपकार्ट बल्क लिस्टिंग के लिए Cloudinary इमेज होस्टिंग, फॉर्म के लिए फोटो डाइमेंशन सेट करने, और EMI व प्रतिशत निकालने की गाइड।' },
      { title: 'प्राइवेसी नीति और डिस्क्लेमर', body: 'लोकल टूल्स में डेटा डिवाइस पर ही प्रोसेस होता है। Cloudinary अपलोड आपकी सहमति से डायरेक्ट अपलोड करता है। आधिकारिक सूचनाओं की हमेशा स्वतंत्र पुष्टि करें।' },
      { title: 'संपर्क और नियम', body: 'सार्वजनिक रूप से प्रकाशित करने से पहले अपना संपर्क ईमेल और नियम जोड़ें। बाहरी API वाले टूल्स की स्थिति स्पष्ट रूप से दिखाई जाती है।' }
    ],
    footerLinks: ['होम', 'सभी टूल्स', 'हमारे बारे में', 'संपर्क करें', 'प्राइवेसी नीति', 'नियम व शर्तें', 'डिस्क्लेमर', 'साइटमैप']
  }
};

const categories = [
  {
    id: 'popular',
    title: { en: 'Most Popular Tools', hi: 'सबसे लोकप्रिय टूल्स' },
    tools: [
      { id: 'img-host', icon: '☁️', name: { en: 'Bulk Image Link Host (Cloudinary)', hi: 'बल्क इमेज लिंक होस्ट (Cloudinary)' }, desc: { en: 'Upload images & get one-click copyable direct URLs', hi: 'इमेज अपलोड करें और वन-क्लिक डायरेक्ट लिंक प्राप्त करें' }, ready: true },
      { id: 'img-resizer', icon: '🖼️', name: { en: 'Image Resizer & KB Compressor', hi: 'इमेज रिसाइज़र और KB कंप्रेसर' }, desc: { en: 'Resize width, height, format & KB quality locally', hi: 'चौड़ाई, ऊंचाई, फॉर्मेट और KB क्वालिटी बदलें' }, ready: true },
      { id: 'text-case', icon: '🔤', name: { en: 'Text Case Converter', hi: 'टेक्स्ट केस कन्वर्टर' }, desc: { en: 'UPPERCASE, lowercase, Title Case & space cleaner', hi: 'UPPERCASE, lowercase, Title Case और स्पेस क्लीनर' }, ready: true },
      { id: 'passport-sig', icon: '🪪', name: { en: 'Passport & Signature Maker', hi: 'पासपोर्ट और सिग्नेचर मेकर' }, desc: { en: 'One-click presets for photo & signature', hi: 'फोटो और सिग्नेचर के लिए तैयार प्रेसेट्स' }, ready: true },
      { id: 'age-calc', icon: '🎂', name: { en: 'Age Calculator', hi: 'आयु कैलकुलेटर' }, desc: { en: 'Exact age in years, months & days', hi: 'साल, महीने और दिनों में सही उम्र निकालें' }, ready: true },
      { id: 'pct-calc', icon: '📊', name: { en: 'Percentage & Marks Calculator', hi: 'प्रतिशत और अंक कैलकुलेटर' }, desc: { en: 'Calculate percentage from marks easily', hi: 'अंकों से प्रतिशत आसानी से निकालें' }, ready: true }
    ]
  },
  {
    id: 'photo',
    title: { en: 'Photo & Image Tools', hi: 'फोटो और इमेज टूल्स' },
    tools: [
      { id: 'img-host', icon: '🔗', name: { en: 'Direct Image Link Generator', hi: 'डायरेक्ट इमेज लिंक जनरेटर' }, desc: { en: 'Host images freely on Cloudinary for e-commerce listings', hi: 'ई-कॉमर्स लिस्टिंग के लिए मुफ्त इमेज होस्ट करें' }, ready: true },
      { id: 'img-resizer', icon: '📐', name: { en: 'Image Resizer & Format Converter', hi: 'इमेज रिसाइज़र और फॉर्मेट कन्वर्टर' }, desc: { en: 'JPG, PNG, WEBP resize & quality control', hi: 'JPG, PNG, WEBP साइज व क्वालिटी बदलें' }, ready: true },
      { id: 'passport-sig', icon: '✍️', name: { en: 'Signature & Passport Presets', hi: 'सिग्नेचर और पासपोर्ट प्रेसेट्स' }, desc: { en: 'Standard form dimension presets', hi: 'फॉर्म के लिए स्टैंडर्ड साइज प्रेसेट्स' }, ready: true },
      { id: 'img-to-pdf', icon: '📑', name: { en: 'Image to PDF Converter', hi: 'इमेज से PDF कन्वर्टर' }, desc: { en: 'Export image as PDF document', hi: 'इमेज को PDF फाइल में सेव करें' }, ready: true },
      { id: 'bg-changer', icon: '🎨', name: { en: 'Background Color Changer', hi: 'बैकग्राउंड कलर चेंजर' }, desc: { en: 'Full AI background removal requires API', hi: 'पूरे बैकग्राउंड रिमूवल के लिए API ज़रूरी' }, ready: false }
    ]
  },
  {
    id: 'text',
    title: { en: 'Text Tools', hi: 'टेक्स्ट टूल्स' },
    tools: [
      { id: 'text-case', icon: '🔤', name: { en: 'Case Converter & Text Formatter', hi: 'केस कन्वर्टर और टेक्स्ट फ़ॉर्मेटर' }, desc: { en: 'UPPER, lower, Title, Capitalize & clean spaces', hi: 'UPPER, lower, Title, Capitalize और स्पेस क्लीनर' }, ready: true },
      { id: 'word-count', icon: '✍️', name: { en: 'Word, Char & Case Tool', hi: 'वर्ड, कैरेक्टर और केस टूल' }, desc: { en: 'Count words/chars, UPPER/lower & clean spaces', hi: 'शब्द/अक्षर गिनें, केस बदलें और एक्स्ट्रा स्पेस हटाएं' }, ready: true },
      { id: 'translator-tool', icon: '🌐', name: { en: 'Hindi ↔ English Translator', hi: 'हिन्दी ↔ English ट्रांसलेटर' }, desc: { en: 'Requires translation API configuration', hi: 'ट्रांसलेशन API कॉन्फ़िगरेशन ज़रूरी' }, ready: false }
    ]
  },
  {
    id: 'pdf',
    title: { en: 'PDF Tools', hi: 'PDF टूल्स' },
    tools: [
      { id: 'img-to-pdf', icon: '📄', name: { en: 'JPG / Image to PDF', hi: 'JPG / इमेज से PDF' }, desc: { en: 'Convert image to PDF in browser', hi: 'ब्राउज़र में इमेज से PDF बनाएं' }, ready: true },
      { id: 'pdf-suite', icon: '📚', name: { en: 'Merge, Split & Compress PDF', hi: 'मर्ज, स्प्लिट और कंप्रेस PDF' }, desc: { en: 'Add pdf-lib / PDF.js worker for multi-page PDF ops', hi: 'मल्टी-पेज PDF के लिए pdf-lib / PDF.js जोड़ें' }, ready: false }
    ]
  },
  {
    id: 'govt',
    title: { en: 'Government Job & Exam Tools', hi: 'सरकारी नौकरी और परीक्षा टूल्स' },
    tools: [
      { id: 'age-calc', icon: '🗓️', name: { en: 'Exam Age Calculator', hi: 'परीक्षा आयु कैलकुलेटर' }, desc: { en: 'Check age as of any cutoff date', hi: 'किसी भी तारीख के अनुसार आयु जानें' }, ready: true },
      { id: 'pct-calc', icon: '🧮', name: { en: 'Percentage & Merit Helper', hi: 'प्रतिशत और मेरिट हेल्पर' }, desc: { en: 'Compute marks percentage quickly', hi: 'अंकों का प्रतिशत निकालें' }, ready: true },
      { id: 'govt-feed', icon: '🏛️', name: { en: 'Jobs, Admit Card & Results', hi: 'भर्ती, एडमिट कार्ड और रिजल्ट' }, desc: { en: 'Connect verified official RSS/API source—never fake listings', hi: 'केवल सत्यापित स्रोत जोड़ें—फ़र्ज़ी अपडेट न दिखाएं' }, ready: false }
    ]
  },
  {
    id: 'calc',
    title: { en: 'Online Calculators', hi: 'ऑनलाइन कैलकुलेटर' },
    tools: [
      { id: 'emi-calc', icon: '🏦', name: { en: 'EMI Calculator', hi: 'EMI कैलकुलेटर' }, desc: { en: 'Monthly EMI, total interest & payable', hi: 'मासिक EMI, कुल ब्याज और कुल राशि' }, ready: true },
      { id: 'pct-calc', icon: '📊', name: { en: 'Percentage Calculator', hi: 'प्रतिशत कैलकुलेटर' }, desc: { en: 'Percentage calculation tool', hi: 'प्रतिशत गणना टूल' }, ready: true },
      { id: 'age-calc', icon: '⏳', name: { en: 'Age Calculator', hi: 'आयु कैलकुलेटर' }, desc: { en: 'Age breakdown in Y/M/D', hi: 'साल, महीने और दिन में उम्र' }, ready: true },
      { id: 'curr-calc', icon: '💱', name: { en: 'Live Currency Converter', hi: 'लाइव करेंसी कन्वर्टर' }, desc: { en: 'Requires live exchange rate API key', hi: 'लाइव एक्सचेंज रेट API की आवश्यकता' }, ready: false }
    ]
  },
  {
    id: 'utility',
    title: { en: 'Internet & Utility Tools', hi: 'इंटरनेट और यूटिलिटी टूल्स' },
    tools: [
      { id: 'pass-gen', icon: '🔐', name: { en: 'Strong Password Generator', hi: 'मजबूत पासवर्ड जनरेटर' }, desc: { en: 'Generate secure random passwords locally', hi: 'सुरक्षित रैंडम पासवर्ड बनाएं' }, ready: true },
      { id: 'qr-gen', icon: '📱', name: { en: 'QR Code Generator', hi: 'QR कोड जनरेटर' }, desc: { en: 'Generate QR code from text or URL', hi: 'टेक्स्ट या लिंक से QR कोड बनाएं' }, ready: true }
    ]
  }
];

const toolsById = {};
categories.forEach(cat => cat.tools.forEach(t => {
  if (!toolsById[t.id]) toolsById[t.id] = t;
}));

function renderTools(query = '') {
  const q = query.trim().toLowerCase();
  const wrap = document.getElementById('tools-area');
  wrap.innerHTML = '';

  categories.forEach(cat => {
    const matched = cat.tools.filter(t =>
      !q ||
      t.name.en.toLowerCase().includes(q) ||
      t.name.hi.toLowerCase().includes(q) ||
      t.desc.en.toLowerCase().includes(q) ||
      t.desc.hi.toLowerCase().includes(q)
    );
    if (!matched.length) return;

    const sec = document.createElement('section');
    sec.className = 'cat-section';

    const header = document.createElement('div');
    header.className = 'cat-header';
    const h2 = document.createElement('h2');
    h2.className = 'cat-title';
    h2.textContent = cat.title[lang];
    header.appendChild(h2);
    sec.appendChild(header);

    const grid = document.createElement('div');
    grid.className = 'grid';

    matched.forEach(t => {
      const card = document.createElement('div');
      card.className = 'tool-card';
      card.onclick = () => openTool(t.id);

      const top = document.createElement('div');
      top.className = 'tool-top';

      const icon = document.createElement('div');
      icon.className = 'tool-icon';
      icon.textContent = t.icon;

      const textWrap = document.createElement('div');
      const nameEl = document.createElement('div');
      nameEl.className = 'tool-name';
      nameEl.textContent = t.name[lang];

      const descEl = document.createElement('div');
      descEl.className = 'tool-desc';
      descEl.textContent = t.desc[lang];

      textWrap.append(nameEl, descEl);
      top.append(icon, textWrap);

      const tag = document.createElement('span');
      tag.className = `tool-tag ${t.ready ? '' : 'config'}`;
      tag.textContent = t.ready ? i18n[lang].readyTag : i18n[lang].configTag;

      card.append(top, tag);
      grid.appendChild(card);
    });

    sec.appendChild(grid);
    wrap.appendChild(sec);
  });

  if (!wrap.children.length) {
    wrap.innerHTML = `<div class="info-card"><p>${i18n[lang].noResults}</p></div>`;
  }
}

function renderInfoAndFooter() {
  const t = i18n[lang];
  document.getElementById('infoHeading').textContent = t.infoHeading;
  document.getElementById('footerTag').textContent = t.footerTag;

  const infoGrid = document.getElementById('infoGrid');
  infoGrid.innerHTML = t.infoCards.map(item => `
    <div class="info-card">
      <h3>${item.title}</h3>
      <p>${item.body}</p>
    </div>
  `).join('');

  const footerLinks = document.getElementById('footerLinks');
  footerLinks.innerHTML = t.footerLinks.map(label => `<a href="#info-pages">${label}</a>`).join('');
}

function applyStaticLang() {
  const t = i18n[lang];
  document.documentElement.lang = lang;
  document.getElementById('tagline').textContent = t.tagline;
  document.getElementById('heroTitle').textContent = t.heroTitle;
  document.getElementById('heroSub').textContent = t.heroSub;
  document.getElementById('searchInput').placeholder = t.searchPh;
  document.getElementById('searchBtn').textContent = t.searchBtn;
  document.getElementById('langToggle').textContent = t.langBtn;
  document.getElementById('navAllTools').textContent = t.allTools;
  document.getElementById('navBlog').textContent = t.blog;
  document.getElementById('navAbout').textContent = t.about;
  document.getElementById('navPrivacy').textContent = t.privacy;
  document.getElementById('closeWsBtn').textContent = t.close;
  document.getElementById('adSlotTop').textContent = t.adTop;
  document.getElementById('adSlotMid').textContent = t.adMid;
  renderInfoAndFooter();
}

function filterTools() {
  renderTools(document.getElementById('searchInput').value);
}

function resetSearch() {
  document.getElementById('searchInput').value = '';
  renderTools('');
  closeWorkspace();
}

function toggleLang() {
  lang = lang === 'en' ? 'hi' : 'en';
  applyStaticLang();
  renderTools(document.getElementById('searchInput').value);
}

function closeWorkspace() {
  if (activeObjectUrl) {
    URL.revokeObjectURL(activeObjectUrl);
    activeObjectUrl = null;
  }
  document.getElementById('workspace').style.display = 'none';
  document.getElementById('wsBody').innerHTML = '';
}

function openTool(id) {
  const tool = toolsById[id];
  if (!tool) return;
  if (activeObjectUrl) {
    URL.revokeObjectURL(activeObjectUrl);
    activeObjectUrl = null;
  }

  const title = tool.name[lang];
  const desc = tool.desc[lang];
  const ws = document.getElementById('workspace');
  const body = document.getElementById('wsBody');
  document.getElementById('wsTitle').textContent = title;
  ws.style.display = 'block';
  ws.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

  if (!tool.ready) {
    body.innerHTML = `
      <div class="notice-box">
        <strong>${title}</strong><br/>
        ${desc}.<br/><br/>
        ${lang === 'hi'
          ? 'इस फीचर को लाइव चलाने के लिए अपना वेरिफ़ाइड डेटा सोर्स, API कुंजी या बैकएंड कनेक्ट करें।'
          : 'Connect your verified data source, API key, or backend service to enable live results for this tool.'}
      </div>
    `;
    return;
  }

  if (id === 'img-host') {
    body.innerHTML = `
      <div class="notice-box">
        ${lang === 'hi'
          ? '<strong>Cloudinary API सेटिंग्स:</strong> अपना Cloud Name और Unsigned Upload Preset डालें।'
          : '<strong>Cloudinary API Setup:</strong> Enter Cloud Name & Unsigned Upload Preset.'}
      </div>
      <div class="row-2">
        <div class="field"><label>Cloud Name:</label><input type="text" id="cCloudName" value="demo" /></div>
        <div class="field"><label>Upload Preset (Unsigned):</label><input type="text" id="cPreset" value="docs_upload_example_preset" /></div>
      </div>
      <div class="field">
        <label>Select Image (JPG, PNG, WEBP):</label>
        <input type="file" id="cImgFile" accept="image/*" />
      </div>
      <button class="btn-primary" type="button" onclick="runCloudinaryUpload()">Upload & Get Direct Link</button>
      <div class="result-box" id="cOut" style="display:none;"></div>
    `;
  } else if (id === 'text-case') {
    body.innerHTML = `
      <div class="field">
        <label>Enter or Paste Text:</label>
        <textarea id="caseTxt" rows="6" placeholder="Type text here..." oninput="updateCaseStats()"></textarea>
      </div>
      <div class="field">
        <button type="button" class="btn-secondary" onclick="transformCase('upper')">UPPERCASE</button>
        <button type="button" class="btn-secondary" onclick="transformCase('lower')">lowercase</button>
        <button type="button" class="btn-secondary" onclick="transformCase('clean')">Remove Extra Spaces</button>
      </div>
      <div class="result-box" id="caseStats">Words: 0 | Characters: 0</div>
    `;
  } else if (id === 'img-resizer' || id === 'passport-sig' || id === 'img-to-pdf') {
    const defaultFmt = id === 'img-to-pdf' ? 'pdf' : 'jpeg';
    body.innerHTML = `
      <div class="field">
        <label>Select Image (JPG, PNG, WEBP — Max 15MB):</label>
        <input type="file" id="tImgFile" accept="image/*" />
      </div>
      <div class="field">
        <button type="button" class="btn-secondary" onclick="setImgDim(350,450)">Passport (350×450)</button>
        <button type="button" class="btn-secondary" onclick="setImgDim(400,200)">Signature (400×200)</button>
        <button type="button" class="btn-secondary" onclick="setImgDim(600,600)">Postcard (600×600)</button>
      </div>
      <div class="row-2">
        <div class="field"><label>Width (px):</label><input type="number" id="tImgW" value="350" min="1" max="5000" /></div>
        <div class="field"><label>Height (px):</label><input type="number" id="tImgH" value="450" min="1" max="5000" /></div>
      </div>
      <label class="checkbox-row"><input type="checkbox" id="tKeepRatio" /> Fit inside box preserving aspect ratio (white background)</label>
      <div class="row-2">
        <div class="field"><label>Quality (10% - 100%):</label><input type="range" id="tImgQ" min="0.1" max="1" step="0.05" value="0.8" /></div>
        <div class="field">
          <label>Output Format:</label>
          <select id="tImgFmt">
            <option value="jpeg" ${defaultFmt==='jpeg'?'selected':''}>JPG / JPEG</option>
            <option value="png" ${defaultFmt==='png'?'selected':''}>PNG</option>
            <option value="webp" ${defaultFmt==='webp'?'selected':''}>WEBP</option>
            <option value="pdf" ${defaultFmt==='pdf'?'selected':''}>PDF</option>
          </select>
        </div>
      </div>
      <button class="btn-primary" type="button" onclick="runImageTool()">Process & Download</button>
      <div class="result-box" id="tImgOut" style="display:none;"></div>
    `;
  } else if (id === 'age-calc') {
    body.innerHTML = `
      <div class="row-2">
        <div class="field"><label>Date of Birth:</label><input type="date" id="dobInput" /></div>
        <div class="field"><label>As on Date:</label><input type="date" id="asOnInput" value="${new Date().toISOString().slice(0,10)}" /></div>
      </div>
      <button class="btn-primary" type="button" onclick="runAgeCalc()">Calculate Age</button>
      <div class="result-box" id="ageOut" style="display:none;"></div>
    `;
  } else if (id === 'pct-calc') {
    body.innerHTML = `
      <div class="row-2">
        <div class="field"><label>Obtained Marks:</label><input type="number" id="obtMarks" placeholder="e.g. 420" /></div>
        <div class="field"><label>Total Marks:</label><input type="number" id="totMarks" placeholder="e.g. 500" /></div>
      </div>
      <button class="btn-primary" type="button"
