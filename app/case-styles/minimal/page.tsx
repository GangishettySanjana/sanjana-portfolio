import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Making a complex data tool feel like a conversation",
  description:
    "A finance platform where AI cleans and structures messy data through plain language.",
};

export default function MinimalCaseStudy() {
  return (
    <div className="mn-root">
      <style>{`
        .mn-root {
          --mn-paper: #F2F2F1;
          --mn-ink: #18181A;
          --mn-muted: #6A6A6E;
          --mn-accent: #3A6B66;
          --mn-line: rgba(24,24,26,0.10);
          background: var(--mn-paper);
          color: var(--mn-ink);
          font-family: 'Satoshi', ui-sans-serif, system-ui, -apple-system, sans-serif;
          -webkit-font-smoothing: antialiased;
          text-rendering: optimizeLegibility;
          font-feature-settings: "kern" 1, "liga" 1;
          line-height: 1.65;
          min-height: 100vh;
        }
        .mn-container {
          max-width: 1320px;
          margin: 0 auto;
          padding: 0 clamp(24px, 5vw, 80px);
        }
        .mn-display {
          font-family: 'Cabinet Grotesk', 'Satoshi', ui-sans-serif, system-ui, sans-serif;
          font-weight: 500;
          letter-spacing: -0.01em;
          color: var(--mn-ink);
        }

        /* ---- Hero ---- */
        .mn-hero {
          padding-top: clamp(96px, 16vh, 200px);
          padding-bottom: clamp(64px, 10vh, 140px);
        }
        .mn-kicker {
          font-size: 13px;
          letter-spacing: 0.01em;
          color: var(--mn-muted);
          margin: 0 0 clamp(40px, 8vh, 96px);
          font-weight: 500;
        }
        .mn-h1 {
          font-family: 'Cabinet Grotesk', 'Satoshi', sans-serif;
          font-weight: 400;
          font-size: clamp(34px, 5.2vw, 64px);
          line-height: 1.08;
          letter-spacing: -0.02em;
          margin: 0;
          max-width: 18ch;
          color: var(--mn-ink);
        }
        .mn-lede {
          font-size: clamp(17px, 1.6vw, 21px);
          line-height: 1.7;
          color: var(--mn-ink);
          max-width: 52ch;
          margin: clamp(32px, 5vh, 56px) 0 0;
          font-weight: 400;
        }
        .mn-meta {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: clamp(20px, 3vw, 48px);
          margin-top: clamp(56px, 9vh, 110px);
          max-width: 760px;
        }
        .mn-meta-item {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .mn-meta-label {
          font-size: 12px;
          color: var(--mn-muted);
          letter-spacing: 0.01em;
        }
        .mn-meta-value {
          font-size: 15px;
          color: var(--mn-ink);
          font-weight: 500;
        }
        @media (max-width: 680px) {
          .mn-meta { grid-template-columns: 1fr 1fr; row-gap: 32px; }
        }

        /* ---- Full-bleed image ---- */
        .mn-fullbleed {
          width: 100vw;
          position: relative;
          left: 50%;
          right: 50%;
          margin-left: -50vw;
          margin-right: -50vw;
          margin-top: clamp(48px, 8vh, 96px);
          margin-bottom: clamp(96px, 16vh, 200px);
        }
        .mn-fullbleed img {
          display: block;
          width: 100%;
          height: auto;
        }

        /* ---- Sections ---- */
        .mn-section {
          padding-bottom: clamp(96px, 16vh, 200px);
        }
        .mn-section-label {
          font-size: 12px;
          color: var(--mn-muted);
          margin: 0 0 clamp(28px, 4vh, 48px);
          font-weight: 500;
        }
        .mn-h2 {
          font-family: 'Cabinet Grotesk', 'Satoshi', sans-serif;
          font-weight: 400;
          font-size: clamp(26px, 3.2vw, 40px);
          line-height: 1.18;
          letter-spacing: -0.015em;
          margin: 0;
          max-width: 22ch;
          color: var(--mn-ink);
        }
        .mn-prose {
          max-width: 60ch;
          margin-top: clamp(28px, 4vh, 44px);
        }
        .mn-prose p {
          font-size: 17px;
          line-height: 1.75;
          color: var(--mn-ink);
          margin: 0 0 1.4em;
        }
        .mn-prose p:last-child { margin-bottom: 0; }

        /* ---- Figures ---- */
        .mn-figure {
          margin: clamp(48px, 9vh, 112px) 0 0;
        }
        .mn-figure img {
          display: block;
          width: 100%;
          height: auto;
        }
        .mn-caption {
          font-size: 13px;
          color: var(--mn-muted);
          margin-top: 18px;
          max-width: 56ch;
        }

        /* ---- Metrics list ---- */
        .mn-metrics {
          max-width: 640px;
          margin-top: clamp(36px, 6vh, 64px);
        }
        .mn-metric {
          display: flex;
          align-items: baseline;
          justify-content: space-between;
          gap: 24px;
          padding: 22px 0;
          border-bottom: 1px solid var(--mn-line);
        }
        .mn-metric:first-child { border-top: 1px solid var(--mn-line); }
        .mn-metric-label {
          font-size: 15px;
          color: var(--mn-muted);
        }
        .mn-metric-value {
          font-family: 'Cabinet Grotesk', 'Satoshi', sans-serif;
          font-size: clamp(18px, 2vw, 24px);
          font-weight: 400;
          letter-spacing: -0.01em;
          color: var(--mn-ink);
          text-align: right;
        }
        .mn-metric-note {
          font-size: 13px;
          color: var(--mn-muted);
          margin-top: 22px;
        }

        /* ---- Before / after ---- */
        .mn-grid2 {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(24px, 4vw, 56px);
          margin-top: clamp(40px, 7vh, 80px);
        }
        @media (max-width: 720px) {
          .mn-grid2 { grid-template-columns: 1fr; row-gap: 48px; }
        }
        .mn-ba-label {
          font-size: 12px;
          color: var(--mn-muted);
          margin: 0 0 16px;
          font-weight: 500;
        }
        .mn-grid2 img {
          display: block;
          width: 100%;
          height: auto;
        }

        /* ---- Pull quote ---- */
        .mn-quote {
          padding: clamp(96px, 18vh, 220px) 0;
          text-align: left;
        }
        .mn-quote blockquote {
          font-family: 'Cabinet Grotesk', 'Satoshi', sans-serif;
          font-weight: 400;
          font-size: clamp(28px, 4vw, 48px);
          line-height: 1.22;
          letter-spacing: -0.02em;
          margin: 0;
          max-width: 20ch;
          color: var(--mn-ink);
        }

        /* ---- Reflection ---- */
        .mn-reflection {
          padding-bottom: clamp(120px, 22vh, 280px);
        }
        .mn-reflection p {
          font-size: clamp(17px, 1.7vw, 20px);
          line-height: 1.75;
          color: var(--mn-ink);
          max-width: 56ch;
          margin: clamp(24px, 4vh, 40px) 0 0;
        }
        .mn-accent {
          color: var(--mn-accent);
          text-decoration: none;
          border-bottom: 1px solid rgba(58,107,102,0.35);
          padding-bottom: 1px;
        }
        .mn-accent:hover { border-bottom-color: var(--mn-accent); }
      `}</style>

      {/* 1. Hero */}
      <header className="mn-container mn-hero">
        <p className="mn-kicker">product design · AI &amp; 0→1</p>
        <h1 className="mn-h1">
          Making a complex data tool feel like a conversation
        </h1>
        <p className="mn-lede">
          A finance platform where AI cleans and structures messy data through
          plain language. I designed the part where people decide whether to
          trust it, and built the prototypes to prove it.
        </p>

        <div className="mn-meta">
          <div className="mn-meta-item">
            <span className="mn-meta-label">Role</span>
            <span className="mn-meta-value">Lead Product Designer</span>
          </div>
          <div className="mn-meta-item">
            <span className="mn-meta-label">Timeline</span>
            <span className="mn-meta-value">10 weeks</span>
          </div>
          <div className="mn-meta-item">
            <span className="mn-meta-label">Team</span>
            <span className="mn-meta-value">2 eng · 1 PM</span>
          </div>
          <div className="mn-meta-item">
            <span className="mn-meta-label">Year</span>
            <span className="mn-meta-value">2026</span>
          </div>
        </div>
      </header>

      {/* 2. Full-bleed hero image */}
      <div className="mn-fullbleed">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/projects/fireside/exhibit-in-use.png" alt="The platform in use" />
      </div>

      {/* 3. Context */}
      <section className="mn-container mn-section">
        <p className="mn-section-label">Context</p>
        <h2 className="mn-h2">
          The work people skip is the work that decides whether they trust it.
        </h2>
        <div className="mn-prose">
          <p>
            The platform could already do the hard part, read a messy export,
            infer structure, and hand back something clean. The harder question
            was quieter: would anyone believe the result enough to act on it?
          </p>
          <p>
            People don&rsquo;t distrust automation because it&rsquo;s wrong.
            They distrust it because it&rsquo;s silent. So the design problem
            wasn&rsquo;t the cleaning, it was making the cleaning legible, a
            step at a time, in language a person could check.
          </p>
        </div>

        <figure className="mn-figure">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/projects/fireside/simulation-mode.png" alt="Simulation mode" />
          <figcaption className="mn-caption">
            An early simulation view, the system narrating what it intended to
            change before changing it.
          </figcaption>
        </figure>
      </section>

      {/* 4. Process */}
      <section className="mn-container mn-section">
        <p className="mn-section-label">Process</p>
        <h2 className="mn-h2">
          Design the flow, then prove it on a real screen.
        </h2>
        <div className="mn-prose">
          <p>
            I mapped the moments where trust is won or lost, the first result,
            the first correction, the first time the system disagrees with you,
            then designed a flow that surfaced its reasoning at each one.
          </p>
          <p>
            Paper holds up until you put it on a screen. I built working
            prototypes with real data so the team could feel the latency, the
            phrasing, and the weight of a wrong guess before any of it shipped.
          </p>
        </div>

        <figure className="mn-figure">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/projects/fireside/information-mode.png" alt="Information mode interface" />
          <figcaption className="mn-caption">
            The information layer: every transformation explained in plain
            language, reversible, and attributable.
          </figcaption>
        </figure>
      </section>

      {/* 5. Impact */}
      <section className="mn-container mn-section">
        <p className="mn-section-label">Impact</p>
        <h2 className="mn-h2">It shipped, it worked.</h2>

        <div className="mn-metrics">
          <div className="mn-metric">
            <span className="mn-metric-label">Time to process</span>
            <span className="mn-metric-value">2h → 30m</span>
          </div>
          <div className="mn-metric">
            <span className="mn-metric-label">AI adoption</span>
            <span className="mn-metric-value">0 → 78%</span>
          </div>
          <div className="mn-metric">
            <span className="mn-metric-label">Test completion</span>
            <span className="mn-metric-value">5 / 5</span>
          </div>
          <p className="mn-metric-note">Founder-reported.</p>
        </div>
      </section>

      {/* 6. The decision, before / after */}
      <section className="mn-container mn-section">
        <p className="mn-section-label">The decision</p>
        <h2 className="mn-h2">
          Showing the work changed the answer to &ldquo;do I trust this?&rdquo;
        </h2>

        <div className="mn-grid2">
          <figure className="mn-figure" style={{ marginTop: 0 }}>
            <p className="mn-ba-label">Before</p>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/projects/fireside/information-mode.png" alt="Before, result without explanation" />
          </figure>
          <figure className="mn-figure" style={{ marginTop: 0 }}>
            <p className="mn-ba-label">After</p>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/projects/fireside/intervention-mode.png" alt="After, result with explanation and intervention" />
          </figure>
        </div>
      </section>

      {/* 7. Pull quote */}
      <section className="mn-container mn-quote">
        <blockquote>
          If it can&rsquo;t tell you what it did, it shouldn&rsquo;t do it
          quietly.
        </blockquote>
      </section>

      {/* 8. Reflection */}
      <section className="mn-container mn-reflection">
        <p className="mn-section-label">Reflection</p>
        <h2 className="mn-h2">What I&rsquo;d carry forward.</h2>
        <p>
          The thing that moved adoption wasn&rsquo;t a better model, it was
          letting people see the model think. Trust isn&rsquo;t a feature you
          add at the end; it&rsquo;s the shape of every small moment where the
          system could have stayed silent and chose not to.{" "}
          <a className="mn-accent" href="#top">
            Read the full case study
          </a>
          .
        </p>
      </section>
    </div>
  );
}
