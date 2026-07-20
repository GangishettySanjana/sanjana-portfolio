import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Creative Projects · Sanjana Gangishetty',
  description: 'A playground of small creative experiments, typography toys, and things made for the joy of making them.',
}

/* Uniform with the rest of the site */
const HEAD = "'Cabinet Grotesk', sans-serif"
const BODY = "'Satoshi', sans-serif"
const MAX_W = 1320
const GUTTER = 'clamp(24px, 5vw, 80px)'

export default function CreativeProjectsPage() {
  return (
    <main style={{ background: '#ffffff', minHeight: '100vh', color: '#000' }}>
      <div style={{ maxWidth: MAX_W, margin: '0 auto', padding: `clamp(96px, 12vh, 140px) ${GUTTER} 120px` }}>

        {/* Back */}
        <Link href="/#work" style={{ fontFamily: BODY, fontSize: 13, fontWeight: 600, letterSpacing: '0.01em', color: 'rgba(0,0,0,0.45)', textDecoration: 'none' }}>
          ← Back to portfolio
        </Link>

        {/* Header, matches .work-header */}
        <header style={{ marginTop: 'clamp(32px, 5vw, 56px)', marginBottom: 'clamp(28px, 3.5vw, 44px)' }}>
          <p style={{ fontFamily: BODY, fontSize: 11, fontWeight: 600, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.38)', margin: '0 0 12px' }}>
            Playground
          </p>
          <h1 style={{ fontFamily: HEAD, fontSize: 'clamp(40px, 6vw, 72px)', fontWeight: 800, letterSpacing: '-0.025em', lineHeight: 1.0, color: '#000', margin: '0 0 20px' }}>
            Creative Projects
          </h1>
          <p style={{ fontFamily: BODY, fontSize: 'clamp(15px, 1.3vw, 17px)', fontWeight: 400, color: 'rgba(0,0,0,0.5)', lineHeight: 1.75, margin: 0 }}>
            The work outside the case studies. Small experiments, typography toys, and things I made because they were fun to make and I wanted to see if they&apos;d work. No client, no brief, no metric to move.
          </p>
        </header>

        {/* Divider */}
        <div style={{ height: 1, background: 'rgba(0,0,0,0.1)', marginBottom: 'clamp(40px, 5vw, 56px)' }} />

        {/* ── Looseleaf ───────────────────────────────── */}
        <section>
          <p style={{ fontFamily: BODY, fontSize: 11, fontWeight: 600, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.38)', margin: '0 0 14px' }}>
            Typography toy <span style={{ color: 'rgba(0,0,0,0.22)', margin: '0 8px' }}>·</span> Web Speech &amp; Canvas
          </p>

          <h2 style={{ fontFamily: HEAD, fontSize: 'clamp(30px, 4vw, 46px)', fontWeight: 800, letterSpacing: '-0.02em', lineHeight: 1.05, color: '#000', margin: '0 0 20px' }}>
            Looseleaf
          </h2>

          <div style={{ marginBottom: 28 }}>
            <p style={{ fontFamily: BODY, fontSize: 'clamp(15px, 1.3vw, 17px)', fontWeight: 400, color: 'rgba(0,0,0,0.55)', lineHeight: 1.78, margin: '0 0 16px' }}>
              Looseleaf is a small typography toy about putting the heavy stuff down. Type whatever is weighing on you, or say it out loud and let it transcribe, then break the words apart and knock them around the screen. When you&apos;re ready, you let it go, and something kinder settles back in its place.
            </p>
            <p style={{ fontFamily: BODY, fontSize: 'clamp(15px, 1.3vw, 17px)', fontWeight: 400, color: 'rgba(0,0,0,0.55)', lineHeight: 1.78, margin: 0 }}>
              Nothing is saved. No account, no history, nothing kept. It&apos;s meant to be used once and closed, the way you&apos;d crumple a page and toss it.
            </p>
          </div>

          <a href="/looseleaf.html" target="_blank" rel="noopener noreferrer" style={{
            display: 'inline-flex', alignItems: 'center', gap: 8, fontFamily: BODY, fontSize: 13, fontWeight: 600,
            letterSpacing: '0.04em', color: '#fff', textDecoration: 'none', background: '#000',
            borderRadius: 999, padding: '12px 24px', marginBottom: 32,
          }}>
            Open fullscreen ↗
          </a>

          {/* Embedded toy */}
          <iframe
            src="/looseleaf.html"
            title="Looseleaf"
            style={{ width: '100%', height: '80vh', border: '1px solid rgba(0,0,0,0.12)', borderRadius: 16, display: 'block' }}
            allow="microphone"
          />
        </section>

      </div>
    </main>
  )
}
