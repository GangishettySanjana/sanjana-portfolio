/* ─────────────────────────────────────────────────────────────
   SAMPLE case-study template — /case-template
   Aesthetic: LIGHT BUILD-NATIVE (design-engineer on a light surface).
   Neutral paper (not cream) · deep-teal signal · Geist Mono labels ·
   terminal-style metric readout · Cabinet Grotesk + Satoshi (her identity).
   Sample copy + reused images. Does NOT touch the real case studies.
   ───────────────────────────────────────────────────────────── */

const BG = '#F4F4F2'
const SURFACE = '#FFFFFF'
const INK = '#141619'
const MUTED = '#565C63'
const FAINT = '#767C84'
const ACCENT = '#0E8E80'      // deep teal — text-safe on light
const ACCENT_FILL = '#1FB0A0' // brighter teal for marks/fills
const BORDER = 'rgba(20,22,25,0.11)'

const IMG = {
  cover: '/projects/fireside/exhibit-in-use.png',
  wide: '/projects/fireside/simulation-mode.png',
  ui: '/projects/fireside/information-mode.png',
  mobile: '/projects/getup/popup.png',
  before: '/projects/fireside/information-mode.png',
  after: '/projects/fireside/intervention-mode.png',
}

export default function CaseTemplate() {
  return (
    <main className="bn">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Geist+Mono:wght@400;500;600&display=swap');
        .bn { background: ${BG}; color: ${INK}; font-family: 'Satoshi', system-ui, sans-serif; overflow-x: hidden; -webkit-font-smoothing: antialiased; }
        .bn ::selection { background: ${ACCENT_FILL}; color: #fff; }
        .bn-mono { font-family: 'Geist Mono', ui-monospace, monospace; }
        .bn-wrap { max-width: 1320px; margin: 0 auto; padding: 0 clamp(24px,5vw,80px); }
        .bn-display { font-family: 'Cabinet Grotesk', system-ui, sans-serif; font-weight: 800; letter-spacing: -0.03em; line-height: 1.0; }
        .bn-body { font-size: 16.5px; line-height: 1.75; color: ${MUTED}; max-width: 62ch; }
        .bn-body strong { color: ${INK}; font-weight: 600; }
        a.bn-link { color: ${ACCENT}; text-decoration: none; font-weight: 600; }

        /* top manifest bar */
        .bn-top { position: sticky; top: 0; z-index: 20; display: flex; align-items: center; justify-content: space-between;
          padding: 13px clamp(24px,5vw,80px); border-bottom: 1px solid ${BORDER}; background: rgba(244,244,242,0.78); backdrop-filter: blur(10px); font-size: 12px; color: ${FAINT}; }
        .bn-top .path b { color: ${INK}; font-weight: 500; }
        .bn-status { display: inline-flex; align-items: center; gap: 7px; color: ${MUTED}; }
        .bn-dot { width: 7px; height: 7px; border-radius: 50%; background: ${ACCENT_FILL}; box-shadow: 0 0 0 0 ${ACCENT_FILL}; animation: bnPulse 2s ease-out infinite; }
        @keyframes bnPulse { 0%{box-shadow:0 0 0 0 rgba(31,176,160,0.5)} 70%{box-shadow:0 0 0 6px rgba(31,176,160,0)} 100%{box-shadow:0 0 0 0 rgba(31,176,160,0)} }

        /* hero */
        .bn-hero { padding: clamp(56px,9vw,120px) 0 clamp(40px,5vw,64px); }
        .bn-kicker { font-size: 12px; color: ${ACCENT}; letter-spacing: 0.04em; font-weight: 600; }
        .bn-kicker .arrow { color: ${FAINT}; }
        .bn-h1 { font-size: clamp(40px,6.4vw,82px); margin: 22px 0 24px; max-width: 16ch; color: ${INK}; }
        .bn-lede { font-size: clamp(17px,1.7vw,21px); line-height: 1.6; color: ${MUTED}; max-width: 56ch; }
        .bn-meta { display: flex; flex-wrap: wrap; gap: 28px 44px; margin-top: 40px; padding-top: 26px; border-top: 1px solid ${BORDER}; }
        .bn-meta .k { font-size: 11px; color: ${FAINT}; letter-spacing: 0.02em; display: block; margin-bottom: 6px; }
        .bn-meta .v { font-size: 14px; color: ${INK}; }

        /* media */
        .bn-fig { margin: 0; }
        .bn-frame { border: 1px solid ${BORDER}; border-radius: 12px; overflow: hidden; background: ${SURFACE}; box-shadow: 0 24px 50px -28px rgba(20,22,25,0.22); }
        .bn-chrome { display: flex; align-items: center; gap: 7px; padding: 11px 14px; border-bottom: 1px solid ${BORDER}; background: #FBFBFA; }
        .bn-chrome i { width: 10px; height: 10px; border-radius: 50%; background: rgba(20,22,25,0.12); display: block; }
        .bn-chrome .url { margin-left: 10px; font-size: 11px; color: ${FAINT}; }
        .bn-frame img { width: 100%; display: block; }
        .bn-cap { font-size: 12px; color: ${FAINT}; margin-top: 14px; }
        .bn-cap b { color: ${ACCENT}; font-weight: 500; }

        .bn-bleed { width: 100vw; position: relative; left: 50%; transform: translateX(-50%); margin: clamp(56px,8vw,112px) 0; }
        .bn-bleed img { width: 100%; height: clamp(300px,44vw,600px); object-fit: cover; display: block; }
        .bn-bleed .bn-cap { padding: 0 clamp(24px,5vw,80px); max-width: 1320px; margin: 14px auto 0; }

        /* section */
        .bn-sec { padding: clamp(56px,8vw,104px) 0; border-top: 1px solid ${BORDER}; }
        .bn-num { font-size: 12px; color: ${FAINT}; display: block; margin-bottom: 16px; }
        .bn-num b { color: ${ACCENT}; font-weight: 600; }
        .bn-h2 { font-size: clamp(26px,3.2vw,40px); color: ${INK}; margin: 0 0 22px; max-width: 18ch; }
        .bn-sec .bn-body + .bn-body { margin-top: 16px; }

        .bn-split { display: grid; grid-template-columns: 1fr auto; gap: clamp(28px,5vw,64px); align-items: center; margin-top: 44px; }
        .bn-phone { width: 264px; flex-shrink: 0; background: #15171a; border-radius: 40px; padding: 9px; box-shadow: 0 50px 90px -42px rgba(20,22,25,0.5); }
        .bn-phone img { width: 100%; display: block; border-radius: 32px; }

        /* terminal-style metric readout (NOT the SaaS metric template) */
        .bn-readout { margin-top: 44px; border: 1px solid ${BORDER}; border-radius: 12px; overflow: hidden; background: ${SURFACE}; box-shadow: 0 24px 50px -30px rgba(20,22,25,0.18); }
        .bn-readout .head { padding: 11px 16px; border-bottom: 1px solid ${BORDER}; font-size: 12px; color: ${FAINT}; background: #FBFBFA; }
        .bn-readout .head b { color: ${MUTED}; font-weight: 400; }
        .bn-readout .rows { padding: 8px 0; }
        .bn-row { display: grid; grid-template-columns: 220px 1fr; gap: 16px; padding: 11px 16px; font-size: 14px; }
        .bn-row .key { color: ${FAINT}; }
        .bn-row .val { color: ${INK}; }
        .bn-row .val b { color: ${ACCENT}; font-weight: 600; }

        /* before / after */
        .bn-compare { display: grid; grid-template-columns: 1fr 1fr; gap: clamp(14px,2.5vw,24px); margin-top: 44px; }
        .bn-compare figure { margin: 0; }
        .bn-compare .lbl { font-size: 11px; margin-bottom: 12px; display: inline-block; padding: 4px 10px; border-radius: 6px; }
        .bn-compare .before .lbl { color: ${MUTED}; background: rgba(20,22,25,0.06); }
        .bn-compare .after .lbl { color: #fff; background: ${ACCENT_FILL}; }

        /* pull quote */
        .bn-quote { font-family: 'Cabinet Grotesk', system-ui, sans-serif; font-weight: 800; letter-spacing: -0.02em; font-size: clamp(26px,3.6vw,46px); line-height: 1.2; color: ${INK}; max-width: 18ch; }
        .bn-quote .m { color: ${ACCENT_FILL}; }

        @media (max-width: 720px) {
          .bn-split { grid-template-columns: 1fr; }
          .bn-row { grid-template-columns: 1fr; gap: 4px; }
          .bn-compare { grid-template-columns: 1fr; }
        }
        @media (prefers-reduced-motion: reduce) { .bn-dot { animation: none; } }
      `}</style>

      {/* top manifest */}
      <div className="bn-top bn-mono">
        <span className="path">sanjana / work / <b>sample-project</b></span>
        <span className="bn-status"><span className="bn-dot" />open to work</span>
      </div>

      <div className="bn-wrap">
        {/* HERO */}
        <header className="bn-hero">
          <p className="bn-kicker bn-mono">product design <span className="arrow">·</span> AI &amp; 0→1</p>
          <h1 className="bn-h1 bn-display">Making a complex data tool feel like a conversation</h1>
          <p className="bn-lede">A finance platform where AI cleans and structures messy data through plain language. I designed the part where people decide whether to trust it, and built the prototypes to prove it.</p>
          <div className="bn-meta bn-mono">
            <div><span className="k">role</span><span className="v">Lead Product Designer</span></div>
            <div><span className="k">timeline</span><span className="v">10 weeks</span></div>
            <div><span className="k">team</span><span className="v">2 eng · 1 PM</span></div>
            <div><span className="k">stack</span><span className="v">Figma · React</span></div>
          </div>
        </header>
      </div>

      {/* full-bleed hero media */}
      <figure className="bn-bleed">
        <img src={IMG.cover} alt="The product running in context" />
        <figcaption className="bn-cap bn-mono">fig.00 — <b>the system in context</b></figcaption>
      </figure>

      <div className="bn-wrap">
        {/* 01 */}
        <section className="bn-sec">
          <span className="bn-num bn-mono"><b>01</b> / context</span>
          <h2 className="bn-h2 bn-display">The work people skip is the work that decides whether they trust it.</h2>
          <p className="bn-body">Finance teams are skeptical of AI for good reason. A short, scannable paragraph frames the tension, not a feature list. This is sample copy standing in for the real story.</p>
          <p className="bn-body">A second paragraph names the specific constraint, the moment it got hard. <strong>The body color stays well above the contrast floor</strong>, light gray "for elegance" is the usual readability failure.</p>
          <figure className="bn-fig" style={{ marginTop: 44 }}>
            <div className="bn-frame">
              <div className="bn-chrome"><i /><i /><i /><span className="url bn-mono">app.preql.com/transform</span></div>
              <img src={IMG.ui} alt="" />
            </div>
            <figcaption className="bn-cap bn-mono">fig.01 — the transform view</figcaption>
          </figure>
        </section>

        {/* 02 */}
        <section className="bn-sec">
          <span className="bn-num bn-mono"><b>02</b> / process</span>
          <h2 className="bn-h2 bn-display">Design the flow, then prove it on a real screen.</h2>
          <div className="bn-split">
            <div>
              <p className="bn-body">Text on one side, the screen on the other. Mobile UI sits in a real device frame so it reads as product, not a flat export.</p>
              <p className="bn-body">The asymmetric split breaks the rhythm, the page stops feeling like frame, frame, frame.</p>
            </div>
            <div className="bn-phone"><img src={IMG.mobile} alt="" /></div>
          </div>
        </section>

        {/* METRIC READOUT */}
        <section className="bn-sec">
          <span className="bn-num bn-mono"><b>03</b> / impact</span>
          <h2 className="bn-h2 bn-display">It shipped, it worked, it changed how the team works.</h2>
          <div className="bn-readout bn-mono">
            <div className="head">$ results <b>--first-6-months</b></div>
            <div className="rows">
              <div className="bn-row"><span className="key">time_to_process</span><span className="val">4h <b>→</b> 30m</span></div>
              <div className="bn-row"><span className="key">ai_step_adoption</span><span className="val">0 <b>→</b> 78%</span></div>
              <div className="bn-row"><span className="key">test_completion</span><span className="val"><b>5 / 5</b> in final round</span></div>
              <div className="bn-row"><span className="key">source</span><span className="val" style={{ color: FAINT }}>founder-reported, pipeline data</span></div>
            </div>
          </div>
        </section>

        {/* BEFORE / AFTER */}
        <section className="bn-sec">
          <span className="bn-num bn-mono"><b>04</b> / the decision</span>
          <h2 className="bn-h2 bn-display">What changed, side by side.</h2>
          <p className="bn-body">A real before/after makes the decision legible in a glance, far stronger than describing it.</p>
          <div className="bn-compare">
            <figure className="before"><span className="lbl bn-mono">before</span><div className="bn-frame"><img src={IMG.before} alt="" /></div></figure>
            <figure className="after"><span className="lbl bn-mono">after</span><div className="bn-frame"><img src={IMG.after} alt="" /></div></figure>
          </div>
        </section>

        {/* PULL QUOTE */}
        <section className="bn-sec">
          <p className="bn-quote"><span className="m">“</span>If it can&apos;t tell you what it did, it shouldn&apos;t do it quietly.<span className="m">”</span></p>
        </section>

        {/* REFLECTION */}
        <section className="bn-sec" style={{ paddingBottom: 'clamp(80px,12vw,160px)' }}>
          <span className="bn-num bn-mono"><b>05</b> / reflection</span>
          <h2 className="bn-h2 bn-display">What I&apos;d do differently.</h2>
          <p className="bn-body">A short, honest close. The strongest case studies end on judgment, not a victory lap. That is where the senior signal lives. <a className="bn-link" href="#">Next project →</a></p>
        </section>
      </div>
    </main>
  )
}
