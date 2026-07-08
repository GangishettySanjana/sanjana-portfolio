import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Case study · Warm studio sample",
  description:
    "A finance platform where AI cleans and structures messy data through plain language.",
};

export default function StudioCaseStudyPage() {
  return (
    <main className="st-root">
      <style>{`
        .st-root {
          --st-base: #E7E0D3;
          --st-ink: #2A2620;
          --st-ink-soft: #5A5448;
          --st-terra: #BC542E;
          --st-terra-deep: #8F3D1F;
          --st-sage: #6E7757;
          --st-sage-deep: #4E5640;
          --st-surface: #EFEAE0;
          --st-line: #CFC6B4;
          --st-radius: 20px;
          background: var(--st-base);
          color: var(--st-ink);
          font-family: 'Satoshi', system-ui, -apple-system, sans-serif;
          line-height: 1.65;
          -webkit-font-smoothing: antialiased;
          overflow-x: hidden;
        }
        .st-root *,
        .st-root *::before,
        .st-root *::after { box-sizing: border-box; }

        .st-wrap {
          max-width: 1320px;
          margin: 0 auto;
          padding: 0 clamp(24px, 5vw, 80px);
        }

        .st-display {
          font-family: 'Cabinet Grotesk', 'Satoshi', system-ui, sans-serif;
          font-weight: 700;
          letter-spacing: -0.02em;
          line-height: 1.04;
          color: var(--st-ink);
          margin: 0;
        }

        .st-kicker {
          font-family: 'Satoshi', system-ui, sans-serif;
          font-size: 0.95rem;
          font-weight: 500;
          letter-spacing: 0.01em;
          color: var(--st-terra-deep);
          margin: 0 0 1.25rem;
        }
        .st-kicker .st-dot { color: var(--st-sage); padding: 0 0.4em; }

        /* ---- Hero ---- */
        .st-hero { padding: clamp(72px, 11vw, 150px) 0 clamp(48px, 7vw, 96px); }
        .st-h1 { font-size: clamp(2.6rem, 6.4vw, 5.4rem); max-width: 16ch; }
        .st-lede {
          font-size: clamp(1.12rem, 1.8vw, 1.42rem);
          line-height: 1.55;
          color: var(--st-ink-soft);
          max-width: 46ch;
          margin: 2rem 0 0;
        }
        .st-meta {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: clamp(20px, 3vw, 56px);
          margin-top: clamp(48px, 6vw, 80px);
          padding-top: 2rem;
          border-top: 1px solid var(--st-line);
          max-width: 760px;
        }
        .st-meta-k {
          font-size: 0.78rem;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--st-ink-soft);
          margin: 0 0 0.5rem;
          font-weight: 500;
        }
        .st-meta-v {
          font-family: 'Cabinet Grotesk', 'Satoshi', sans-serif;
          font-size: clamp(1rem, 1.4vw, 1.18rem);
          font-weight: 600;
          margin: 0;
          line-height: 1.25;
        }

        /* ---- Full bleed ---- */
        .st-bleed {
          width: 100vw;
          position: relative;
          left: 50%;
          right: 50%;
          margin-left: -50vw;
          margin-right: -50vw;
          margin-top: clamp(8px, 2vw, 24px);
        }
        .st-bleed img {
          display: block;
          width: 100%;
          height: clamp(320px, 56vw, 720px);
          object-fit: cover;
        }

        /* ---- Section scaffold ---- */
        .st-section { padding: clamp(72px, 10vw, 132px) 0; }
        .st-label {
          font-family: 'Cabinet Grotesk', 'Satoshi', sans-serif;
          font-size: 0.82rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          font-weight: 600;
          color: var(--st-terra-deep);
          margin: 0 0 1.75rem;
          display: flex;
          align-items: center;
          gap: 0.85rem;
        }
        .st-label::before {
          content: "";
          width: 26px;
          height: 2px;
          background: var(--st-terra);
          display: inline-block;
        }
        .st-h2 {
          font-size: clamp(1.85rem, 3.8vw, 3.1rem);
          max-width: 20ch;
        }
        .st-body { font-size: 1.08rem; color: var(--st-ink-soft); line-height: 1.72; margin: 0 0 1.25rem; }
        .st-body:last-child { margin-bottom: 0; }

        .st-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(32px, 5vw, 80px);
          align-items: center;
        }
        .st-prose { max-width: 48ch; }

        .st-frame {
          border-radius: var(--st-radius);
          overflow: hidden;
          background: var(--st-surface);
        }
        .st-frame img { display: block; width: 100%; height: auto; }
        .st-cap {
          font-size: 0.9rem;
          color: var(--st-ink-soft);
          margin: 1rem 0 0;
          padding-left: 0.1rem;
        }

        /* ---- Material panels ---- */
        .st-panel {
          border-radius: clamp(24px, 3vw, 36px);
          padding: clamp(40px, 6vw, 88px);
        }
        .st-panel--sage { background: var(--st-sage); color: #F2EFE6; }
        .st-panel--sage .st-label { color: #DDE3CB; }
        .st-panel--sage .st-label::before { background: #DDE3CB; }
        .st-panel--sage .st-h2 { color: #F6F3EA; }
        .st-panel--sage .st-body { color: #E4E6D6; }
        .st-panel--sage .st-frame { background: var(--st-sage-deep); }

        /* ---- Impact / metrics ---- */
        .st-metrics {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: clamp(28px, 4vw, 64px);
          margin-top: clamp(40px, 5vw, 72px);
          border-top: 1px solid var(--st-line);
          padding-top: clamp(36px, 4vw, 60px);
        }
        .st-metric-k {
          font-size: 0.92rem;
          color: var(--st-ink-soft);
          margin: 0 0 1rem;
          font-weight: 500;
        }
        .st-metric-v {
          font-family: 'Cabinet Grotesk', 'Satoshi', sans-serif;
          font-weight: 700;
          font-size: clamp(2.4rem, 5vw, 4rem);
          line-height: 1;
          letter-spacing: -0.02em;
          margin: 0;
          color: var(--st-ink);
        }
        .st-metric-v .st-arrow { color: var(--st-terra); margin: 0 0.18em; font-weight: 600; }
        .st-metric-v .st-from { color: var(--st-ink-soft); }
        .st-note {
          margin-top: clamp(28px, 3vw, 44px);
          font-size: 0.92rem;
          color: var(--st-ink-soft);
          font-style: italic;
          max-width: 52ch;
        }

        /* ---- Before / after ---- */
        .st-ba { display: grid; grid-template-columns: 1fr 1fr; gap: clamp(20px, 3vw, 40px); margin-top: clamp(40px, 5vw, 64px); }
        .st-ba-tag {
          display: inline-block;
          font-family: 'Cabinet Grotesk', 'Satoshi', sans-serif;
          font-size: 0.78rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          font-weight: 600;
          padding: 0.4rem 0.9rem;
          border-radius: 999px;
          margin-bottom: 1rem;
        }
        .st-ba-tag--before { background: var(--st-surface); color: var(--st-ink-soft); border: 1px solid var(--st-line); }
        .st-ba-tag--after { background: var(--st-terra); color: #FBEFE7; }

        /* ---- Pull quote ---- */
        .st-quote-block { background: var(--st-terra); }
        .st-quote-block .st-wrap { padding-top: clamp(80px, 10vw, 150px); padding-bottom: clamp(80px, 10vw, 150px); }
        .st-quote {
          font-family: 'Cabinet Grotesk', 'Satoshi', sans-serif;
          font-weight: 700;
          font-size: clamp(2rem, 5vw, 4rem);
          line-height: 1.08;
          letter-spacing: -0.02em;
          color: #FBEFE7;
          max-width: 22ch;
          margin: 0;
          text-wrap: balance;
        }
        .st-quote .st-mark { color: #E6A989; }

        /* ---- Reflection ---- */
        .st-reflect { max-width: 58ch; }
        .st-reflect .st-body { font-size: clamp(1.12rem, 1.7vw, 1.34rem); color: var(--st-ink); line-height: 1.62; }

        @media (max-width: 760px) {
          .st-grid, .st-ba { grid-template-columns: 1fr; }
          .st-metrics { grid-template-columns: 1fr; gap: 2rem; }
          .st-meta { grid-template-columns: 1fr 1fr; gap: 28px 24px; }
          .st-prose { max-width: none; }
        }
      `}</style>

      {/* 1. Hero */}
      <header className="st-hero">
        <div className="st-wrap">
          <p className="st-kicker">
            product design <span className="st-dot">·</span> AI &amp; 0→1
          </p>
          <h1 className="st-display st-h1">
            Making a complex data tool feel like a conversation
          </h1>
          <p className="st-lede">
            A finance platform where AI cleans and structures messy data through
            plain language. I designed the part where people decide whether to
            trust it, and built the prototypes to prove it.
          </p>

          <dl className="st-meta">
            <div>
              <p className="st-meta-k">Role</p>
              <p className="st-meta-v">Lead Product Designer</p>
            </div>
            <div>
              <p className="st-meta-k">Timeline</p>
              <p className="st-meta-v">10 weeks</p>
            </div>
            <div>
              <p className="st-meta-k">Team</p>
              <p className="st-meta-v">2 eng · 1 PM</p>
            </div>
            <div>
              <p className="st-meta-k">Year</p>
              <p className="st-meta-v">2026</p>
            </div>
          </dl>
        </div>
      </header>

      {/* 2. Full-bleed hero image */}
      <div className="st-bleed">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/projects/fireside/exhibit-in-use.png" alt="The platform in use during a working session" />
      </div>

      {/* 3. Context */}
      <section className="st-section">
        <div className="st-wrap">
          <p className="st-label">Context</p>
          <div className="st-grid">
            <div className="st-prose">
              <h2 className="st-display st-h2">
                The work people skip is the work that decides whether they trust it.
              </h2>
              <p className="st-body" style={{ marginTop: "1.75rem" }}>
                Finance teams were drowning in spreadsheets that never quite
                agreed with each other. The promise was simple: hand the mess to
                an AI, get clean, structured data back. The hard part was never
                the cleaning. It was the moment someone has to look at the result
                and decide if they believe it.
              </p>
              <p className="st-body">
                Most tools hide that moment. They show a confident answer and
                move on. We chose to design for the doubt instead, making the
                system explain what it changed, why, and how sure it was, so the
                decision to trust felt earned rather than coerced.
              </p>
            </div>
            <figure style={{ margin: 0 }}>
              <div className="st-frame">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/projects/fireside/simulation-mode.png" alt="Reviewing how the system interprets a messy dataset" />
              </div>
              <figcaption className="st-cap">
                Review view, every transformation is shown before it is applied.
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* 4. Process, sage material panel */}
      <section className="st-section" style={{ paddingTop: 0 }}>
        <div className="st-wrap">
          <div className="st-panel st-panel--sage">
            <p className="st-label">Process</p>
            <div className="st-grid">
              <div className="st-prose">
                <h2 className="st-display st-h2">
                  Design the flow, then prove it on a real screen.
                </h2>
                <p className="st-body" style={{ marginTop: "1.75rem" }}>
                  I started with the trust journey on paper, where confidence
                  builds, where it breaks, then moved fast into working
                  prototypes. Plain-language prompts, inline confidence, and a
                  clear undo at every step.
                </p>
                <p className="st-body">
                  Abstractions only get you so far. The real test was putting a
                  live screen in front of finance operators and watching the
                  exact second they decided to let go of the spreadsheet.
                </p>
              </div>
              <figure style={{ margin: 0 }}>
                <div className="st-frame">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/projects/fireside/information-mode.png" alt="A working prototype of the structured data view" />
                </div>
                <figcaption className="st-cap" style={{ color: "#E4E6D6" }}>
                  Prototype, the structured result, with provenance one tap away.
                </figcaption>
              </figure>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Impact */}
      <section className="st-section" style={{ paddingTop: 0 }}>
        <div className="st-wrap">
          <p className="st-label">Impact</p>
          <h2 className="st-display st-h2">It shipped, it worked.</h2>

          <div className="st-metrics">
            <div>
              <p className="st-metric-k">Time to process</p>
              <p className="st-metric-v">
                <span className="st-from">4h</span>
                <span className="st-arrow">→</span>30m
              </p>
            </div>
            <div>
              <p className="st-metric-k">AI adoption</p>
              <p className="st-metric-v">
                <span className="st-from">0</span>
                <span className="st-arrow">→</span>78%
              </p>
            </div>
            <div>
              <p className="st-metric-k">Test completion</p>
              <p className="st-metric-v">
                5<span className="st-arrow">/</span>5
              </p>
            </div>
          </div>

          <p className="st-note">
            Founder-reported, in the first quarter after launch. Numbers from a
            small early cohort, not a controlled study, but the direction was
            unambiguous.
          </p>
        </div>
      </section>

      {/* 6. The decision, before / after */}
      <section className="st-section" style={{ paddingTop: 0 }}>
        <div className="st-wrap">
          <p className="st-label">The decision</p>
          <h2 className="st-display st-h2">
            One screen, two ways of asking for trust.
          </h2>

          <div className="st-ba">
            <figure style={{ margin: 0 }}>
              <span className="st-ba-tag st-ba-tag--before">Before</span>
              <div className="st-frame">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/projects/fireside/information-mode.png" alt="The earlier design, which presented results without explanation" />
              </div>
              <figcaption className="st-cap">
                A confident answer with nowhere to look underneath it.
              </figcaption>
            </figure>
            <figure style={{ margin: 0 }}>
              <span className="st-ba-tag st-ba-tag--after">After</span>
              <div className="st-frame">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/projects/fireside/intervention-mode.png" alt="The revised design, which surfaces what changed and why" />
              </div>
              <figcaption className="st-cap">
                The same answer, now able to show its work on request.
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* 7. Pull quote, terracotta block */}
      <section className="st-quote-block">
        <div className="st-wrap">
          <blockquote className="st-quote">
            <span className="st-mark">“</span>If it can&apos;t tell you what it
            did, it shouldn&apos;t do it quietly.<span className="st-mark">”</span>
          </blockquote>
        </div>
      </section>

      {/* 8. Reflection */}
      <section className="st-section">
        <div className="st-wrap">
          <div className="st-reflect">
            <p className="st-label">Reflection</p>
            <p className="st-body">
              The instinct in AI products is to make the machine look certain.
              This project taught me the opposite is what earns trust, that
              people relax once a system is willing to be legible about its own
              limits. The most human thing the tool did was admit when it
              wasn&apos;t sure, and that, more than any feature, is what made
              people stay.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
