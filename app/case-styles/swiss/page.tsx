import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Swiss-bold grid, case study sample",
};

export default function SwissCaseStyle() {
  return (
    <main className="sw-root">
      <style>{`
        .sw-root {
          --sw-bg: #FCFCFB;
          --sw-ink: #0A0A0A;
          --sw-accent: #E5402A;
          --sw-rule: rgba(10, 10, 10, 0.14);
          --sw-max: 1320px;
          --sw-pad: clamp(24px, 5vw, 80px);
          background: var(--sw-bg);
          color: var(--sw-ink);
          font-family: 'Satoshi', system-ui, -apple-system, sans-serif;
          font-size: 17px;
          line-height: 1.55;
          -webkit-font-smoothing: antialiased;
          padding-bottom: 120px;
        }
        .sw-root *,
        .sw-root *::before,
        .sw-root *::after { box-sizing: border-box; }

        .sw-wrap {
          max-width: var(--sw-max);
          margin: 0 auto;
          padding: 0 var(--sw-pad);
        }

        .sw-display {
          font-family: 'Cabinet Grotesk', 'Satoshi', system-ui, sans-serif;
          font-weight: 800;
          letter-spacing: -0.03em;
          line-height: 0.94;
        }

        .sw-rule {
          border: 0;
          border-top: 1px solid var(--sw-rule);
          margin: 0;
        }

        /* ---- Hero ---- */
        .sw-hero {
          padding-top: clamp(56px, 9vw, 120px);
          padding-bottom: clamp(40px, 6vw, 72px);
        }
        .sw-kicker {
          font-family: 'Satoshi', system-ui, sans-serif;
          font-weight: 700;
          font-size: 13px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--sw-accent);
          margin: 0 0 clamp(28px, 5vw, 56px);
        }
        .sw-h1 {
          font-size: clamp(44px, 8.5vw, 116px);
          margin: 0;
          max-width: 18ch;
        }
        .sw-lede {
          font-size: clamp(18px, 2.2vw, 24px);
          line-height: 1.45;
          max-width: 60ch;
          margin: clamp(32px, 5vw, 56px) 0 0;
          color: var(--sw-ink);
        }

        .sw-meta {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 0;
          margin-top: clamp(40px, 6vw, 72px);
          border-top: 1px solid var(--sw-rule);
        }
        .sw-meta-cell {
          padding: 20px 24px 22px 0;
          border-bottom: 1px solid var(--sw-rule);
        }
        .sw-meta-k {
          font-size: 12px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          font-weight: 700;
          color: var(--sw-accent);
          margin: 0 0 8px;
        }
        .sw-meta-v {
          font-family: 'Cabinet Grotesk', 'Satoshi', sans-serif;
          font-weight: 700;
          font-size: clamp(17px, 1.6vw, 22px);
          letter-spacing: -0.01em;
          margin: 0;
          line-height: 1.15;
        }

        /* ---- Full-bleed image ---- */
        .sw-bleed {
          width: 100vw;
          position: relative;
          left: 50%;
          right: 50%;
          margin-left: -50vw;
          margin-right: -50vw;
          margin-top: clamp(40px, 6vw, 72px);
          margin-bottom: clamp(56px, 8vw, 104px);
          border-top: 1px solid var(--sw-rule);
          border-bottom: 1px solid var(--sw-rule);
        }
        .sw-bleed img {
          display: block;
          width: 100%;
          height: clamp(280px, 56vw, 660px);
          object-fit: cover;
        }

        /* ---- Section ---- */
        .sw-section {
          padding-top: clamp(48px, 7vw, 96px);
        }
        .sw-section + .sw-section {
          margin-top: clamp(48px, 7vw, 96px);
        }
        .sw-index {
          display: grid;
          grid-template-columns: minmax(0, 0.42fr) minmax(0, 0.58fr);
          gap: clamp(24px, 4vw, 64px);
          align-items: start;
          margin-top: clamp(28px, 4vw, 48px);
        }
        .sw-num {
          font-family: 'Cabinet Grotesk', 'Satoshi', sans-serif;
          font-weight: 800;
          font-size: clamp(56px, 10vw, 150px);
          line-height: 0.8;
          letter-spacing: -0.04em;
          color: var(--sw-bg);
          -webkit-text-stroke: 2px var(--sw-accent);
          margin: 0;
        }
        .sw-sec-label {
          font-size: 12px;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          font-weight: 700;
          margin: 12px 0 0;
          color: var(--sw-ink);
        }
        .sw-h2 {
          font-size: clamp(28px, 4.4vw, 56px);
          margin: 0;
          max-width: 20ch;
        }
        .sw-body p {
          margin: 0 0 1.1em;
          max-width: 56ch;
        }
        .sw-body p:last-child { margin-bottom: 0; }

        /* ---- Figures ---- */
        .sw-figure {
          margin: clamp(32px, 5vw, 56px) 0 0;
          border-top: 1px solid var(--sw-ink);
          padding-top: 14px;
        }
        .sw-figure img {
          display: block;
          width: 100%;
          height: auto;
          border: 1px solid var(--sw-rule);
        }
        .sw-cap {
          display: flex;
          justify-content: space-between;
          gap: 16px;
          font-size: 13px;
          letter-spacing: 0.02em;
          margin: 0 0 14px;
        }
        .sw-cap .sw-cap-tag {
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          color: var(--sw-accent);
          white-space: nowrap;
        }
        .sw-cap .sw-cap-txt { color: var(--sw-ink); }

        /* ---- Metrics (ruled rows) ---- */
        .sw-metrics {
          margin-top: clamp(28px, 4vw, 48px);
          border-top: 2px solid var(--sw-ink);
        }
        .sw-metric {
          display: grid;
          grid-template-columns: minmax(0, 0.42fr) minmax(0, 0.58fr);
          gap: clamp(16px, 4vw, 64px);
          align-items: baseline;
          padding: clamp(18px, 2.6vw, 28px) 0;
          border-bottom: 1px solid var(--sw-rule);
        }
        .sw-metric:last-child { border-bottom: 2px solid var(--sw-ink); }
        .sw-metric-k {
          font-size: 13px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          font-weight: 700;
          color: var(--sw-ink);
          margin: 0;
          align-self: center;
        }
        .sw-metric-v {
          font-family: 'Cabinet Grotesk', 'Satoshi', sans-serif;
          font-weight: 800;
          font-size: clamp(36px, 6vw, 78px);
          line-height: 0.92;
          letter-spacing: -0.03em;
          margin: 0;
        }
        .sw-metric-v .sw-arrow {
          color: var(--sw-accent);
          padding: 0 0.18em;
        }
        .sw-note {
          font-size: 13px;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          font-weight: 700;
          color: rgba(10, 10, 10, 0.55);
          margin: 18px 0 0;
        }

        /* ---- Before / After ---- */
        .sw-ba {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(16px, 3vw, 40px);
          margin-top: clamp(28px, 4vw, 48px);
        }
        .sw-ba-item { margin: 0; }
        .sw-ba-item .sw-cap { border-top: 2px solid var(--sw-ink); padding-top: 12px; margin-bottom: 14px; }
        .sw-ba-item img {
          display: block;
          width: 100%;
          height: auto;
          border: 1px solid var(--sw-rule);
        }

        /* ---- Pull quote ---- */
        .sw-quote {
          margin: clamp(64px, 9vw, 128px) 0 0;
          padding: clamp(40px, 6vw, 72px) 0;
          border-top: 2px solid var(--sw-ink);
          border-bottom: 2px solid var(--sw-ink);
        }
        .sw-quote blockquote {
          font-family: 'Cabinet Grotesk', 'Satoshi', sans-serif;
          font-weight: 800;
          font-size: clamp(30px, 5.6vw, 76px);
          line-height: 1.0;
          letter-spacing: -0.03em;
          margin: 0;
          max-width: 22ch;
        }
        .sw-quote .sw-q-mark { color: var(--sw-accent); }

        @media (max-width: 720px) {
          .sw-meta { grid-template-columns: 1fr 1fr; }
          .sw-index { grid-template-columns: 1fr; }
          .sw-metric { grid-template-columns: 1fr; gap: 6px; }
          .sw-ba { grid-template-columns: 1fr; }
        }
      `}</style>

      {/* 1. Hero */}
      <header className="sw-wrap sw-hero">
        <p className="sw-kicker">product design · AI &amp; 0→1</p>
        <h1 className="sw-h1 sw-display">
          Making a complex data tool feel like a conversation
        </h1>
        <p className="sw-lede">
          A finance platform where AI cleans and structures messy data through
          plain language. I designed the part where people decide whether to
          trust it, and built the prototypes to prove it.
        </p>

        <div className="sw-meta">
          <div className="sw-meta-cell">
            <p className="sw-meta-k">Role</p>
            <p className="sw-meta-v">Lead Product Designer</p>
          </div>
          <div className="sw-meta-cell">
            <p className="sw-meta-k">Timeline</p>
            <p className="sw-meta-v">10 weeks</p>
          </div>
          <div className="sw-meta-cell">
            <p className="sw-meta-k">Team</p>
            <p className="sw-meta-v">2 eng · 1 PM</p>
          </div>
          <div className="sw-meta-cell">
            <p className="sw-meta-k">Year</p>
            <p className="sw-meta-v">2025</p>
          </div>
        </div>
      </header>

      {/* 2. Full-bleed hero image */}
      <figure className="sw-bleed">
        <img src="/projects/fireside/exhibit-in-use.png" alt="Product in use" />
      </figure>

      {/* 3. Context */}
      <section className="sw-wrap sw-section">
        <hr className="sw-rule" />
        <div className="sw-index">
          <div>
            <p className="sw-num">01</p>
            <p className="sw-sec-label">/ context</p>
          </div>
          <div>
            <h2 className="sw-h2 sw-display">
              The work people skip is the work that decides whether they trust
              it.
            </h2>
            <div className="sw-body" style={{ marginTop: "clamp(20px,3vw,32px)" }}>
              <p>
                Teams pour effort into the visible output and treat data
                preparation as a chore to rush through. But the moment a number
                looks wrong, trust collapses backward through every step that
                produced it, including the ones nobody watched.
              </p>
              <p>
                We were asking people to hand cleaning and structuring to an AI
                step they couldn&apos;t see. The design question wasn&apos;t
                accuracy. It was whether someone would believe the result enough
                to act on it.
              </p>
            </div>
          </div>
        </div>

        <figure className="sw-figure">
          <figcaption className="sw-cap">
            <span className="sw-cap-tag">Fig. 01</span>
            <span className="sw-cap-txt">
              Information mode, the AI explains each transformation in plain
              language before applying it.
            </span>
          </figcaption>
          <img
            src="/projects/fireside/information-mode.png"
            alt="Information mode interface"
          />
        </figure>
      </section>

      {/* 4. Process */}
      <section className="sw-wrap sw-section">
        <hr className="sw-rule" />
        <div className="sw-index">
          <div>
            <p className="sw-num">02</p>
            <p className="sw-sec-label">/ process</p>
          </div>
          <div>
            <h2 className="sw-h2 sw-display">
              Design the flow, then prove it on a real screen.
            </h2>
            <div className="sw-body" style={{ marginTop: "clamp(20px,3vw,32px)" }}>
              <p>
                I mapped the trust moments first, where someone pauses, doubts,
                or wants to check the machine&apos;s work, then designed a
                simulation mode that walks through proposed changes before
                anything is committed.
              </p>
              <p>
                Then I built it as a working prototype, not a static mockup.
                Putting a real screen in front of people surfaced the friction
                that flowcharts hide: people wanted to undo, compare, and ask
                &quot;why&quot; at every step.
              </p>
            </div>
          </div>
        </div>

        <figure className="sw-figure">
          <figcaption className="sw-cap">
            <span className="sw-cap-tag">Fig. 02</span>
            <span className="sw-cap-txt">
              Simulation mode, proposed changes previewed against the original
              data, reversible before commit.
            </span>
          </figcaption>
          <img
            src="/projects/fireside/simulation-mode.png"
            alt="Simulation mode interface"
          />
        </figure>
      </section>

      {/* 5. Impact */}
      <section className="sw-wrap sw-section">
        <hr className="sw-rule" />
        <div className="sw-index">
          <div>
            <p className="sw-num">03</p>
            <p className="sw-sec-label">/ impact</p>
          </div>
          <div>
            <h2 className="sw-h2 sw-display">It shipped, it worked.</h2>
          </div>
        </div>

        <div className="sw-metrics">
          <div className="sw-metric">
            <p className="sw-metric-k">Time to process</p>
            <p className="sw-metric-v sw-display">
              4h <span className="sw-arrow">→</span> 30m
            </p>
          </div>
          <div className="sw-metric">
            <p className="sw-metric-k">AI step adoption</p>
            <p className="sw-metric-v sw-display">
              0 <span className="sw-arrow">→</span> 78%
            </p>
          </div>
          <div className="sw-metric">
            <p className="sw-metric-k">Test completion</p>
            <p className="sw-metric-v sw-display">5 / 5</p>
          </div>
        </div>
        <p className="sw-note">Founder-reported</p>
      </section>

      {/* 6. The decision, before / after */}
      <section className="sw-wrap sw-section">
        <hr className="sw-rule" />
        <div className="sw-index">
          <div>
            <p className="sw-num">04</p>
            <p className="sw-sec-label">/ the decision</p>
          </div>
          <div>
            <h2 className="sw-h2 sw-display">
              Make the machine show its work, or let it stay silent.
            </h2>
            <div className="sw-body" style={{ marginTop: "clamp(20px,3vw,32px)" }}>
              <p>
                The before relied on a passive information panel. The after
                turned every AI action into an explicit, inspectable
                intervention, the screen people actually trusted.
              </p>
            </div>
          </div>
        </div>

        <div className="sw-ba">
          <figure className="sw-ba-item">
            <figcaption className="sw-cap">
              <span className="sw-cap-tag">Before</span>
              <span className="sw-cap-txt">Passive information mode</span>
            </figcaption>
            <img
              src="/projects/fireside/information-mode.png"
              alt="Before, information mode"
            />
          </figure>
          <figure className="sw-ba-item">
            <figcaption className="sw-cap">
              <span className="sw-cap-tag">After</span>
              <span className="sw-cap-txt">Explicit intervention mode</span>
            </figcaption>
            <img
              src="/projects/fireside/intervention-mode.png"
              alt="After, intervention mode"
            />
          </figure>
        </div>
      </section>

      {/* 7. Pull quote */}
      <section className="sw-wrap sw-quote">
        <blockquote className="sw-display">
          <span className="sw-q-mark">“</span>If it can&apos;t tell you what it
          did, it shouldn&apos;t do it quietly.<span className="sw-q-mark">”</span>
        </blockquote>
      </section>

      {/* 8. Reflection */}
      <section className="sw-wrap sw-section">
        <hr className="sw-rule" />
        <div className="sw-index">
          <div>
            <p className="sw-num">05</p>
            <p className="sw-sec-label">/ reflection</p>
          </div>
          <div>
            <h2 className="sw-h2 sw-display">Trust is a design surface.</h2>
            <div className="sw-body" style={{ marginTop: "clamp(20px,3vw,32px)" }}>
              <p>
                The hardest part of designing for AI wasn&apos;t the model, it
                was giving people a reason to believe it. Once the system could
                explain itself, adoption stopped being a persuasion problem and
                became a default. I&apos;d carry that principle into anything
                automated: legibility first, automation second.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
