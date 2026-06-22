/* ─────────────────────────────────────────────────────────────
   SAMPLE case-study layout — /case-styles/drench
   Aesthetic: TYPE-DRENCH / one bold color owns the page.
   Cobalt blue (#1E34D6) drench · acid yellow-green accent (#E8FF45) ·
   giant Cabinet Grotesk display · Satoshi body · white reading sections.
   Reference: Klim specimen / Pentagram color drench.
   Sample copy + reused images. Self-contained; touches no other file.
   ───────────────────────────────────────────────────────────── */

const COBALT = '#1E34D6'   // vivid cobalt drench (dark enough for white text >= 4.5:1)
const WHITE = '#FFFFFF'
const ACID = '#E8FF45'     // acid yellow-green — the one electric detail
const INK = '#0B1020'      // near-black ink for white sections

const IMG = {
  cover: '/projects/fireside/exhibit-in-use.png',
  wide: '/projects/fireside/simulation-mode.png',
  ui: '/projects/fireside/information-mode.png',
  mobile: '/projects/getup/popup.png',
  before: '/projects/fireside/information-mode.png',
  after: '/projects/fireside/intervention-mode.png',
}

export default function DrenchCaseStyle() {
  return (
    <main className="dr">
      <style>{`
        .dr {
          --cobalt: ${COBALT};
          --white: ${WHITE};
          --acid: ${ACID};
          --ink: ${INK};
          background: var(--white);
          color: var(--ink);
          font-family: 'Satoshi', system-ui, -apple-system, sans-serif;
          -webkit-font-smoothing: antialiased;
          overflow-x: hidden;
        }
        .dr *, .dr *::before, .dr *::after { box-sizing: border-box; }

        .dr-wrap {
          max-width: 1320px;
          margin: 0 auto;
          padding: 0 clamp(24px, 5vw, 80px);
        }

        .dr-display {
          font-family: 'Cabinet Grotesk', 'Satoshi', system-ui, sans-serif;
          font-weight: 800;
          letter-spacing: -0.02em;
          line-height: 0.95;
        }

        /* ── drenched sections ── */
        .dr-drench {
          background: var(--cobalt);
          color: var(--white);
        }

        /* ── HERO ── */
        .dr-hero { padding: clamp(72px, 12vh, 160px) 0 clamp(56px, 9vh, 120px); }
        .dr-kicker {
          font-family: 'Cabinet Grotesk', sans-serif;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.18em;
          font-size: clamp(12px, 1.1vw, 14px);
          color: var(--acid);
          margin: 0 0 clamp(28px, 5vh, 56px);
        }
        .dr-h1 {
          font-size: clamp(44px, 9vw, 96px);
          color: var(--white);
          margin: 0;
          max-width: 17ch;
        }
        .dr-lede {
          font-size: clamp(18px, 2vw, 24px);
          line-height: 1.45;
          color: rgba(255,255,255,0.82);
          max-width: 56ch;
          margin: clamp(28px, 5vh, 48px) 0 0;
        }
        .dr-meta {
          display: flex;
          flex-wrap: wrap;
          gap: clamp(28px, 5vw, 72px);
          margin-top: clamp(40px, 7vh, 72px);
          padding-top: clamp(28px, 4vh, 40px);
          border-top: 1px solid rgba(255,255,255,0.28);
        }
        .dr-meta-k {
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 0.14em;
          color: var(--acid);
          margin: 0 0 8px;
          font-weight: 700;
        }
        .dr-meta-v {
          font-size: clamp(15px, 1.5vw, 18px);
          color: var(--white);
          margin: 0;
          font-weight: 500;
        }

        /* ── full-bleed image ── */
        .dr-bleed {
          width: 100vw;
          position: relative;
          left: 50%;
          right: 50%;
          margin-left: -50vw;
          margin-right: -50vw;
        }
        .dr-bleed img {
          display: block;
          width: 100%;
          height: clamp(280px, 56vh, 640px);
          object-fit: cover;
        }

        /* ── reading sections (white) ── */
        .dr-section { padding: clamp(72px, 12vh, 150px) 0; }
        .dr-num {
          font-family: 'Cabinet Grotesk', sans-serif;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.16em;
          font-size: 13px;
          color: var(--cobalt);
          margin: 0 0 clamp(20px, 3vh, 32px);
        }
        .dr-h2 {
          font-size: clamp(30px, 5vw, 64px);
          color: var(--ink);
          margin: 0 0 clamp(28px, 4vh, 48px);
          max-width: 20ch;
        }
        .dr-cols {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: clamp(24px, 4vw, 56px);
          max-width: 92ch;
        }
        .dr-p {
          font-size: clamp(16px, 1.4vw, 19px);
          line-height: 1.6;
          color: var(--ink);
          margin: 0;
        }
        .dr-p + .dr-p { margin-top: 1.1em; }
        .dr-link {
          color: var(--cobalt);
          text-decoration: none;
          border-bottom: 2px solid var(--acid);
          font-weight: 600;
        }

        /* ── framed figure ── */
        .dr-fig { margin: clamp(40px, 6vh, 72px) 0 0; }
        .dr-fig-frame {
          border: 3px solid var(--cobalt);
          padding: clamp(10px, 1.6vw, 18px);
          background: var(--white);
        }
        .dr-fig-frame img { display: block; width: 100%; height: auto; }
        .dr-cap {
          font-size: 14px;
          color: var(--cobalt);
          margin: 14px 0 0;
          font-weight: 500;
        }

        /* ── process layout ── */
        .dr-split {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(32px, 5vw, 72px);
          align-items: center;
        }
        .dr-split img {
          display: block;
          width: 100%;
          height: auto;
          border: 3px solid var(--cobalt);
        }

        /* ── impact / metrics panel ── */
        .dr-impact { padding: clamp(72px, 12vh, 150px) 0; }
        .dr-metrics {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: clamp(32px, 5vw, 64px);
          margin-top: clamp(36px, 5vh, 56px);
        }
        .dr-metric-fig {
          font-family: 'Cabinet Grotesk', sans-serif;
          font-weight: 800;
          letter-spacing: -0.03em;
          line-height: 0.92;
          font-size: clamp(40px, 6.5vw, 96px);
          color: var(--white);
          margin: 0;
        }
        .dr-metric-fig em {
          font-style: normal;
          color: var(--acid);
        }
        .dr-metric-lbl {
          font-size: clamp(13px, 1.2vw, 16px);
          color: rgba(255,255,255,0.82);
          margin: 16px 0 0;
          line-height: 1.4;
        }
        .dr-note {
          margin-top: clamp(40px, 6vh, 64px);
          font-size: 13px;
          text-transform: uppercase;
          letter-spacing: 0.14em;
          color: rgba(255,255,255,0.6);
        }

        /* ── before / after ── */
        .dr-ba {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(20px, 3vw, 40px);
        }
        .dr-ba figure { margin: 0; }
        .dr-ba-lbl {
          font-family: 'Cabinet Grotesk', sans-serif;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.14em;
          font-size: 13px;
          color: var(--cobalt);
          margin: 0 0 14px;
        }
        .dr-ba img {
          display: block;
          width: 100%;
          height: auto;
          border: 3px solid var(--cobalt);
        }

        /* ── pull quote panel ── */
        .dr-quote { padding: clamp(80px, 14vh, 180px) 0; }
        .dr-quote-text {
          font-size: clamp(32px, 6vw, 80px);
          color: var(--white);
          margin: 0;
          max-width: 18ch;
        }
        .dr-quote-text .dr-q-mark { color: var(--acid); }

        /* ── reflection ── */
        .dr-reflect-p {
          font-size: clamp(18px, 2vw, 26px);
          line-height: 1.5;
          color: var(--ink);
          margin: 0;
          max-width: 52ch;
        }

        @media (max-width: 720px) {
          .dr-cols { grid-template-columns: 1fr; }
          .dr-split { grid-template-columns: 1fr; }
          .dr-metrics { grid-template-columns: 1fr; gap: clamp(28px, 6vh, 44px); }
          .dr-ba { grid-template-columns: 1fr; }
        }
      `}</style>

      {/* 1 — HERO (fully drenched cobalt) */}
      <section className="dr-drench dr-hero">
        <div className="dr-wrap">
          <p className="dr-kicker">product design · AI &amp; 0→1</p>
          <h1 className="dr-h1 dr-display">
            Making a complex data tool feel like a conversation
          </h1>
          <p className="dr-lede">
            A finance platform where AI cleans and structures messy data through
            plain language. I designed the part where people decide whether to
            trust it, and built the prototypes to prove it.
          </p>
          <div className="dr-meta">
            <div>
              <p className="dr-meta-k">Role</p>
              <p className="dr-meta-v">Lead Product Designer</p>
            </div>
            <div>
              <p className="dr-meta-k">Timeline</p>
              <p className="dr-meta-v">10 weeks</p>
            </div>
            <div>
              <p className="dr-meta-k">Team</p>
              <p className="dr-meta-v">2 eng · 1 PM</p>
            </div>
            <div>
              <p className="dr-meta-k">Year</p>
              <p className="dr-meta-v">2025</p>
            </div>
          </div>
        </div>
      </section>

      {/* 2 — full-bleed hero image */}
      <div className="dr-bleed">
        <img src={IMG.cover} alt="The platform in use" />
      </div>

      {/* 3 — 01 context (white) */}
      <section className="dr-section">
        <div className="dr-wrap">
          <p className="dr-num">01 — Context</p>
          <h2 className="dr-h2 dr-display">
            The work people skip is the work that decides whether they trust it.
          </h2>
          <div className="dr-cols">
            <div>
              <p className="dr-p">
                Before anyone could ask a question of their data, someone had to
                clean it: reconcile names, fix formats, drop duplicates, decide
                what a blank cell really meant. That work was invisible, slow, and
                quietly where every later decision came from.
              </p>
            </div>
            <div>
              <p className="dr-p">
                The AI could do most of it in seconds. The hard problem was never
                the cleaning — it was <a className="dr-link" href="#decision">earning
                belief</a>. People won&apos;t build on a foundation they can&apos;t
                see being laid. So the design question became: how do you make the
                machine show its work?
              </p>
            </div>
          </div>
          <figure className="dr-fig">
            <div className="dr-fig-frame">
              <img src={IMG.ui} alt="Information mode interface" />
            </div>
            <figcaption className="dr-cap">
              Information mode — every transformation the model made, written back
              in plain language.
            </figcaption>
          </figure>
        </div>
      </section>

      {/* 4 — 02 process (white) */}
      <section className="dr-section" style={{ paddingTop: 0 }}>
        <div className="dr-wrap">
          <p className="dr-num">02 — Process</p>
          <h2 className="dr-h2 dr-display">
            Design the flow, then prove it on a real screen.
          </h2>
          <div className="dr-split">
            <div>
              <p className="dr-p">
                Flows are cheap; conviction is not. I mapped the trust moment as a
                loop — the model proposes, the person inspects, the person accepts
                or corrects — then built it on a real screen with real, ugly data
                so the team could feel where confidence broke.
              </p>
              <p className="dr-p">
                Prototyping early changed the conversation. Instead of debating
                copy in the abstract, we watched people hesitate at the exact line
                where the explanation got thin, and fixed that line.
              </p>
            </div>
            <img src={IMG.wide} alt="Simulation mode prototype" />
          </div>
        </div>
      </section>

      {/* 5 — 03 impact (cobalt drench, huge metrics) */}
      <section className="dr-drench dr-impact">
        <div className="dr-wrap">
          <p className="dr-num" style={{ color: ACID }}>03 — Impact</p>
          <h2 className="dr-h2 dr-display" style={{ color: WHITE }}>
            Less time, more trust, full marks.
          </h2>
          <div className="dr-metrics">
            <div>
              <p className="dr-metric-fig dr-display">4h <em>→</em> 30m</p>
              <p className="dr-metric-lbl">Time to clean and structure a typical dataset.</p>
            </div>
            <div>
              <p className="dr-metric-fig dr-display">0 <em>→</em> 78%</p>
              <p className="dr-metric-lbl">Users who accepted AI output without re-checking by hand.</p>
            </div>
            <div>
              <p className="dr-metric-fig dr-display">5 <em>/</em> 5</p>
              <p className="dr-metric-lbl">Pilot teams who kept using it past the trial.</p>
            </div>
          </div>
          <p className="dr-note">Founder-reported · early pilot, small sample</p>
        </div>
      </section>

      {/* 6 — 04 the decision (before / after) */}
      <section id="decision" className="dr-section">
        <div className="dr-wrap">
          <p className="dr-num">04 — The decision</p>
          <h2 className="dr-h2 dr-display">
            The moment a person decides to trust the machine.
          </h2>
          <div className="dr-ba">
            <figure>
              <p className="dr-ba-lbl">Before</p>
              <img src={IMG.before} alt="Before: opaque output" />
            </figure>
            <figure>
              <p className="dr-ba-lbl">After</p>
              <img src={IMG.after} alt="After: explained intervention" />
            </figure>
          </div>
        </div>
      </section>

      {/* 7 — pull quote (cobalt panel) */}
      <section className="dr-drench dr-quote">
        <div className="dr-wrap">
          <blockquote className="dr-quote-text dr-display">
            <span className="dr-q-mark">“</span>If it can&apos;t tell you what it
            did, it shouldn&apos;t do it quietly.<span className="dr-q-mark">”</span>
          </blockquote>
        </div>
      </section>

      {/* 8 — 05 reflection (white) */}
      <section className="dr-section">
        <div className="dr-wrap">
          <p className="dr-num">05 — Reflection</p>
          <p className="dr-reflect-p">
            The interesting design surface in AI tools isn&apos;t the magic — it&apos;s
            the seam where a person decides whether to believe it. Build that seam
            well and the magic gets to stay. Build it badly and people quietly do
            the work twice.
          </p>
        </div>
      </section>
    </main>
  )
}
