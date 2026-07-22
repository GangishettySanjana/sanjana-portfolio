'use client'

import Link from 'next/link'

/* ─────────────────────────────────────────────────────────────────
   Résumé.

   This page shows /public/resume.pdf directly rather than a
   hand-maintained HTML copy. The HTML version drifted badly from the
   real document — Keel Foundation dated over a year wrong, and a role
   still reading "(placeholder title — confirm)" on the live site —
   because it had to be updated by hand every time the PDF changed.
   One source of truth removes that failure mode: drop in a new
   resume.pdf and this page is current.

   The previous HTML résumé is in git history if it is ever wanted back.

   Most mobile browsers will not render an embedded PDF, so the
   open/download links are the primary action there, not a fallback.
   ───────────────────────────────────────────────────────────────── */

const PDF = '/resume.pdf?v=0722'
const NAV_H = 64

const navy = '#002448'
const teal = '#1a7a7a'

const btnBase: React.CSSProperties = {
  fontFamily: 'var(--font-geist-sans), sans-serif',
  fontSize: 12,
  fontWeight: 600,
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
  padding: '11px 20px',
  borderRadius: 999,
  textDecoration: 'none',
}

export default function ResumePage() {
  return (
    /* 64px clears the fixed site nav, matching the convention the project
       and About pages use. */
    <main style={{ background: '#F7F3EE', minHeight: '100vh', paddingTop: NAV_H }}>
      {/* top bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 16,
          flexWrap: 'wrap',
          padding: '18px clamp(20px, 5vw, 56px)',
          borderBottom: '1px solid rgba(0,36,72,0.1)',
          background: '#F7F3EE',
          position: 'sticky',
          top: NAV_H,
          zIndex: 2,
        }}
      >
        <Link
          href="/"
          onClick={() => sessionStorage.setItem('skipIntro', '1')}
          style={{
            fontFamily: 'var(--font-geist-sans), sans-serif',
            fontSize: 12,
            fontWeight: 600,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: navy,
            textDecoration: 'none',
          }}
        >
          ← Back
        </Link>

        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          <a
            href={PDF}
            target="_blank"
            rel="noopener noreferrer"
            style={{ ...btnBase, color: '#fff', background: teal }}
          >
            Open in new tab ↗
          </a>
          <a
            href={PDF}
            download="Sanjana-Gangishetty-Resume.pdf"
            style={{ ...btnBase, color: navy, border: `1.5px solid ${navy}` }}
          >
            Download ↓
          </a>
        </div>
      </div>

      {/* the document */}
      <div style={{ padding: 'clamp(16px, 3vw, 32px)' }}>
        <object
          data={PDF}
          type="application/pdf"
          aria-label="Résumé of Sanjana Gangishetty"
          style={{
            display: 'block',
            width: '100%',
            height: 'calc(100vh - 210px)',
            minHeight: 520,
            border: '1px solid rgba(0,36,72,0.12)',
            borderRadius: 12,
            background: '#fff',
          }}
        >
          {/* Rendered when the browser will not display a PDF inline. */}
          <div
            style={{
              padding: 'clamp(28px, 6vw, 56px)',
              textAlign: 'center',
              fontFamily: 'var(--font-geist-sans), sans-serif',
            }}
          >
            <p style={{ fontSize: 15, color: navy, margin: '0 0 18px', lineHeight: 1.6 }}>
              Your browser can&apos;t show the PDF inline.
            </p>
            <a
              href={PDF}
              target="_blank"
              rel="noopener noreferrer"
              style={{ ...btnBase, display: 'inline-block', color: '#fff', background: teal }}
            >
              Open the résumé ↗
            </a>
          </div>
        </object>
      </div>
    </main>
  )
}
