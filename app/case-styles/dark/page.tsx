export default function DarkCaseStyle() {
  return (
    <main className="dk-root">
      <style>{`
        .dk-root {
          --dk-base: #17130F;
          --dk-surface: #211B15;
          --dk-text: #ECE4D7;
          --dk-muted: #A89B88;
          --dk-amber: #E0A33C;
          --dk-hair: rgba(236,228,215,0.12);
          background: var(--dk-base);
          color: var(--dk-text);
          font-family: 'Satoshi', ui-sans-serif, system-ui, -apple-system, sans-serif;
          line-height: 1.65;
          -webkit-font-smoothing: antialiased;
          min-height: 100vh;
          overflow-x: hidden;
        }
        .dk-container {
          max-width: 1320px;
          margin: 0 auto;
          padding: 0 clamp(24px, 5vw, 80px);
        }
        .dk-display {
          font-family: 'Cabinet Grotesk', 'Satoshi', ui-sans-serif, system-ui, sans-serif;
        }

        /* HERO */
        .dk-hero {
          padding: clamp(96px, 16vh, 200px) 0 clamp(56px, 8vh, 96px);
        }
        .dk-kicker {
          font-family: 'Cabinet Grotesk', 'Satoshi', sans-serif;
          color: var(--dk-amber);
          font-size: 0.82rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          font-weight: 500;
          margin: 0 0 clamp(28px, 4vw, 44px);
        }
        .dk-h1 {
          font-family: 'Cabinet Grotesk', 'Satoshi', sans-serif;
          font-weight: 600;
          font-size: clamp(2.6rem, 6.2vw, 5.2rem);
          line-height: 1.04;
          letter-spacing: -0.02em;
          margin: 0;
          max-width: 17ch;
        }
        .dk-lede {
          color: var(--dk-text);
          font-size: clamp(1.1rem, 1.8vw, 1.45rem);
          line-height: 1.6;
          max-width: 56ch;
          margin: clamp(28px, 4vw, 40px) 0 0;
          opacity: 0.92;
        }
        .dk-meta {
          display: flex;
          flex-wrap: wrap;
          gap: clamp(32px, 5vw, 72px);
          margin-top: clamp(48px, 7vw, 80px);
          padding-top: clamp(32px, 4vw, 44px);
          border-top: 1px solid var(--dk-hair);
        }
        .dk-meta-item {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .dk-meta-label {
          font-size: 0.72rem;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--dk-muted);
        }
        .dk-meta-val {
          font-family: 'Cabinet Grotesk', 'Satoshi', sans-serif;
          font-size: 1.02rem;
          color: var(--dk-text);
        }

        /* FULL BLEED */
        .dk-fullbleed {
          position: relative;
          left: 50%;
          right: 50%;
          margin-left: -50vw;
          margin-right: -50vw;
          width: 100vw;
          height: clamp(420px, 72vh, 820px);
          overflow: hidden;
          background: var(--dk-surface);
        }
        .dk-fullbleed img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }
        .dk-fullbleed::after {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(23,19,15,0.32) 0%, rgba(23,19,15,0) 30%, rgba(23,19,15,0) 60%, rgba(23,19,15,0.55) 100%);
          pointer-events: none;
        }

        /* SECTION */
        .dk-section {
          padding: clamp(80px, 13vw, 168px) 0;
        }
        .dk-eyebrow {
          font-family: 'Cabinet Grotesk', 'Satoshi', sans-serif;
          color: var(--dk-amber);
          font-size: 0.78rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          font-weight: 500;
          margin: 0 0 clamp(20px, 3vw, 32px);
        }
        .dk-h2 {
          font-family: 'Cabinet Grotesk', 'Satoshi', sans-serif;
          font-weight: 600;
          font-size: clamp(1.9rem, 3.8vw, 3.1rem);
          line-height: 1.12;
          letter-spacing: -0.015em;
          margin: 0;
          max-width: 20ch;
        }
        .dk-body {
          font-size: clamp(1.02rem, 1.4vw, 1.2rem);
          line-height: 1.72;
          color: var(--dk-text);
          opacity: 0.88;
          max-width: 60ch;
          margin: 0 0 1.4em;
        }
        .dk-body:last-child { margin-bottom: 0; }

        .dk-split {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(40px, 6vw, 96px);
          align-items: center;
        }
        .dk-split-text { max-width: 52ch; }

        .dk-frame {
          background: var(--dk-surface);
          border: 1px solid var(--dk-hair);
          border-radius: 4px;
          overflow: hidden;
        }
        .dk-frame img {
          width: 100%;
          height: auto;
          display: block;
        }
        .dk-caption {
          font-size: 0.85rem;
          color: var(--dk-muted);
          margin-top: 16px;
          line-height: 1.5;
        }
        .dk-caption .dk-dot { color: var(--dk-amber); }

        .dk-wide {
          margin-top: clamp(40px, 5vw, 64px);
        }

        /* IMPACT METRICS */
        .dk-metrics {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: clamp(32px, 5vw, 80px);
          margin-top: clamp(48px, 7vw, 88px);
          padding-top: clamp(40px, 5vw, 64px);
          border-top: 1px solid var(--dk-hair);
        }
        .dk-metric-fig {
          font-family: 'Cabinet Grotesk', 'Satoshi', sans-serif;
          font-weight: 600;
          font-size: clamp(2.2rem, 5vw, 4rem);
          line-height: 1;
          letter-spacing: -0.02em;
          color: var(--dk-text);
        }
        .dk-metric-fig .dk-arrow { color: var(--dk-amber); font-weight: 500; padding: 0 0.12em; }
        .dk-metric-label {
          font-size: 0.78rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--dk-muted);
          margin-top: 18px;
        }
        .dk-metric-note {
          color: var(--dk-muted);
          font-size: 0.88rem;
          margin-top: clamp(32px, 4vw, 48px);
          font-style: italic;
        }

        /* DECISION before/after */
        .dk-ba {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(28px, 4vw, 56px);
          margin-top: clamp(40px, 5vw, 64px);
        }
        .dk-ba-label {
          font-family: 'Cabinet Grotesk', 'Satoshi', sans-serif;
          font-size: 0.74rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--dk-amber);
          margin: 0 0 16px;
        }

        /* PULL QUOTE */
        .dk-quote {
          padding: clamp(96px, 16vw, 200px) 0;
          border-top: 1px solid var(--dk-hair);
          border-bottom: 1px solid var(--dk-hair);
        }
        .dk-quote blockquote {
          font-family: 'Cabinet Grotesk', 'Satoshi', sans-serif;
          font-weight: 500;
          font-size: clamp(1.8rem, 4.4vw, 3.4rem);
          line-height: 1.22;
          letter-spacing: -0.015em;
          margin: 0;
          max-width: 24ch;
          color: var(--dk-text);
        }
        .dk-quote blockquote span { color: var(--dk-amber); }

        /* REFLECTION */
        .dk-reflection .dk-body { max-width: 58ch; }

        @media (max-width: 820px) {
          .dk-split { grid-template-columns: 1fr; }
          .dk-metrics { grid-template-columns: 1fr; gap: 40px; }
          .dk-ba { grid-template-columns: 1fr; }
        }
      `}</style>

      {/* 1, HERO */}
      <section className="dk-hero">
        <div className="dk-container">
          <p className="dk-kicker">product design · AI &amp; 0→1</p>
          <h1 className="dk-h1">Making a complex data tool feel like a conversation</h1>
          <p className="dk-lede">
            A finance platform where AI cleans and structures messy data through plain language.
            I designed the part where people decide whether to trust it, and built the prototypes
            to prove it.
          </p>
          <div className="dk-meta">
            <div className="dk-meta-item">
              <span className="dk-meta-label">Role</span>
              <span className="dk-meta-val">Lead Product Designer</span>
            </div>
            <div className="dk-meta-item">
              <span className="dk-meta-label">Timeline</span>
              <span className="dk-meta-val">10 weeks</span>
            </div>
            <div className="dk-meta-item">
              <span className="dk-meta-label">Team</span>
              <span className="dk-meta-val">2 eng · 1 PM</span>
            </div>
            <div className="dk-meta-item">
              <span className="dk-meta-label">Year</span>
              <span className="dk-meta-val">2026</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2, FULL BLEED HERO IMAGE */}
      <div className="dk-fullbleed">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/projects/fireside/exhibit-in-use.png" alt="The platform in use" />
      </div>

      {/* 3, CONTEXT */}
      <section className="dk-section">
        <div className="dk-container">
          <p className="dk-eyebrow">Context</p>
          <div className="dk-split">
            <div className="dk-split-text">
              <h2 className="dk-h2">The work people skip is the work that decides whether they trust it.</h2>
            </div>
            <div>
              <p className="dk-body">
                Teams loved the promise: drop in a messy spreadsheet, get back something clean and
                structured. But the moment the model touched their numbers, the question changed from
                &ldquo;can it do this&rdquo; to &ldquo;can I stake a forecast on what it just did.&rdquo;
              </p>
              <p className="dk-body">
                The hard part was never the cleaning. It was the quiet handoff where a person has to
                decide whether to accept the machine&rsquo;s edits. Skip that, and even correct output
                feels like a guess. That gap is where the product lived or died.
              </p>
            </div>
          </div>
          <div className="dk-wide">
            <div className="dk-frame">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/projects/fireside/information-mode.png" alt="Information mode interface" />
            </div>
            <p className="dk-caption">
              <span className="dk-dot">, </span> The review surface, where every automated change is
              shown before it&rsquo;s committed.
            </p>
          </div>
        </div>
      </section>

      {/* 4, PROCESS */}
      <section className="dk-section">
        <div className="dk-container">
          <p className="dk-eyebrow">Process</p>
          <h2 className="dk-h2">Design the flow, then prove it on a real screen.</h2>
          <p className="dk-body" style={{ marginTop: 'clamp(24px, 3vw, 36px)' }}>
            I started by mapping the trust decision as a flow, not a feature: what the model proposes,
            how it explains itself, and exactly where the person can step in. Then I stopped drawing
            and built it. A working prototype on real data told us in minutes what a month of
            wireframe debate never would.
          </p>
          <p className="dk-body">
            Every interaction earned its place by answering one question, does this make the person
            more confident, or just more impressed? We cut anything that only did the second.
          </p>
          <div className="dk-wide">
            <div className="dk-frame">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/projects/fireside/simulation-mode.png" alt="Simulation mode prototype" />
            </div>
            <p className="dk-caption">
              <span className="dk-dot">, </span> Simulation mode: testing the flow against live,
              imperfect input.
            </p>
          </div>
        </div>
      </section>

      {/* 5, IMPACT */}
      <section className="dk-section">
        <div className="dk-container">
          <p className="dk-eyebrow">Impact</p>
          <h2 className="dk-h2">It shipped, it worked.</h2>
          <div className="dk-metrics">
            <div className="dk-metric-item">
              <div className="dk-metric-fig">4h <span className="dk-arrow">→</span> 30m</div>
              <div className="dk-metric-label">Time to a trusted dataset</div>
            </div>
            <div className="dk-metric-item">
              <div className="dk-metric-fig">0 <span className="dk-arrow">→</span> 78%</div>
              <div className="dk-metric-label">Edits accepted without rework</div>
            </div>
            <div className="dk-metric-item">
              <div className="dk-metric-fig">5 <span className="dk-arrow">/</span> 5</div>
              <div className="dk-metric-label">Pilot teams kept using it</div>
            </div>
          </div>
          <p className="dk-metric-note">Founder-reported, across the first five pilot teams.</p>
        </div>
      </section>

      {/* 6, THE DECISION */}
      <section className="dk-section">
        <div className="dk-container">
          <p className="dk-eyebrow">The decision</p>
          <h2 className="dk-h2">Make the change visible, then let the person commit it.</h2>
          <div className="dk-ba">
            <div>
              <p className="dk-ba-label">Before</p>
              <div className="dk-frame">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/projects/fireside/information-mode.png" alt="Before, silent automation" />
              </div>
            </div>
            <div>
              <p className="dk-ba-label">After</p>
              <div className="dk-frame">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/projects/fireside/intervention-mode.png" alt="After, explained intervention" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7, PULL QUOTE */}
      <section className="dk-quote">
        <div className="dk-container">
          <blockquote>
            If it can&rsquo;t tell you what it did, it shouldn&rsquo;t do it <span>quietly.</span>
          </blockquote>
        </div>
      </section>

      {/* 8, REFLECTION */}
      <section className="dk-section dk-reflection">
        <div className="dk-container">
          <p className="dk-eyebrow">Reflection</p>
          <p className="dk-body">
            The lesson stayed with me: trust isn&rsquo;t a feeling you add at the end, it&rsquo;s a
            structure you design from the first screen. The most valuable thing I built wasn&rsquo;t
            the automation, it was the moment of consent around it, made plain enough that a person
            could say yes and mean it.
          </p>
        </div>
      </section>
    </main>
  )
}
