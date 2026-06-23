const puppeteer = require('puppeteer')
const path = require('path')

// Card image column renders at ~1.275:1 (desktop). Match it so object-fit:cover
// fills with no meaningful crop. Generous internal margins absorb minor crop at
// other breakpoints.
const html = `<!doctype html><html><head><meta charset="utf-8"><style>
  * { margin:0; padding:0; box-sizing:border-box; }
  html,body { width:1600px; height:1250px; }
  .card {
    width:1600px; height:1250px; position:relative; overflow:hidden;
    background:#F6F6F8;
    background-image: radial-gradient(circle, #D7D8DE 1.5px, transparent 1.7px);
    background-size: 32px 32px;
    font-family:'Helvetica Neue', Arial, sans-serif;
    padding:104px 100px;
    display:flex; flex-direction:column;
  }
  .wash { position:absolute; inset:0; background:linear-gradient(125deg, rgba(246,246,248,0.96) 30%, rgba(246,246,248,0.55) 72%, rgba(246,246,248,0.25) 100%); }
  .inner { position:relative; z-index:1; display:flex; flex-direction:column; height:100%; }
  .eyebrow { display:flex; align-items:center; gap:15px; font-size:28px; font-weight:700; letter-spacing:0.13em; color:#4B45E0; }
  .eyebrow .dot { width:12px; height:12px; border-radius:50%; background:#4B45E0; }
  h1 { font-size:130px; line-height:0.98; font-weight:700; letter-spacing:-0.035em; color:#111114; margin-top:40px; white-space:nowrap; }
  .sub { font-size:44px; line-height:1.34; font-weight:400; color:#6E7079; margin-top:46px; max-width:1180px; }
  .pills { display:flex; gap:24px; margin-top:74px; }
  .pill { display:flex; align-items:center; gap:16px; font-size:36px; font-weight:700; padding:23px 40px; border-radius:999px; border:1.5px solid; }
  .pill .pd { width:17px; height:17px; border-radius:50%; }
  .p-green { background:#E8F5EC; color:#1F7A3D; border-color:#CBE8D5; }
  .p-green .pd { background:#2FA856; }
  .p-amber { background:#FBF0DB; color:#9A6A13; border-color:#EFDFBE; }
  .p-amber .pd { background:#E0A024; }
  .p-gray { background:#ECECEE; color:#4B5563; border-color:#DCDCE0; }
  .p-gray .pd { background:#6B7280; }
  .foot { margin-top:auto; display:flex; align-items:baseline; justify-content:space-between; }
  .foot .by { font-size:35px; color:#6E7079; font-weight:400; }
  .foot .by b { color:#15151A; font-weight:700; }
  .foot .url { font-size:33px; color:#A2A6AE; font-weight:400; }
</style></head><body>
  <div class="card">
    <div class="wash"></div>
    <div class="inner">
      <div class="eyebrow"><span class="dot"></span>CONCEPT STUDY · AI TRUST UX</div>
      <h1>The AI Trust Meter</h1>
      <div class="sub">What if AI support tools were honest about uncertainty? A confidence-state design system for AI answers.</div>
      <div class="pills">
        <div class="pill p-green"><span class="pd"></span>Grounded</div>
        <div class="pill p-amber"><span class="pd"></span>Inferred</div>
        <div class="pill p-gray"><span class="pd"></span>Uncertain</div>
      </div>
      <div class="foot">
        <div class="by">Designed &amp; built by <b>Sanjana Gangishetty</b></div>
        <div class="url">gangishettysanjana.com</div>
      </div>
    </div>
  </div>
</body></html>`

;(async () => {
  const browser = await puppeteer.launch({ args: ['--no-sandbox'] })
  const page = await browser.newPage()
  await page.setViewport({ width: 1600, height: 1250, deviceScaleFactor: 2 })
  await page.setContent(html, { waitUntil: 'networkidle0' })
  const out = path.join(__dirname, '..', 'public', 'images', 'ai-trust-meter.png')
  await page.screenshot({ path: out, type: 'png' })
  await browser.close()
  console.log('wrote', out)
})()
