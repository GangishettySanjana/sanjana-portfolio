'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

function BeachSVG() {
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', opacity: 0.6 }}>
      <svg
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern id="sandGrain" x="0" y="0" width="48" height="48" patternUnits="userSpaceOnUse">
            <circle cx="8"  cy="12" r="1.4" fill="rgba(170,128,70,0.18)" />
            <circle cx="28" cy="6"  r="1.0" fill="rgba(170,128,70,0.14)" />
            <circle cx="42" cy="30" r="1.6" fill="rgba(170,128,70,0.16)" />
            <circle cx="16" cy="38" r="1.0" fill="rgba(170,128,70,0.12)" />
            <circle cx="36" cy="44" r="1.2" fill="rgba(170,128,70,0.15)" />
          </pattern>
        </defs>

        <rect width="1440" height="900" fill="#F0D49C" />
        <rect width="1440" height="900" fill="url(#sandGrain)" />

        <motion.path
          d="M-80,0 L1520,0 L1520,555
             C1380,510 1240,580 1080,545
             C920,510 760,580 600,545
             C440,510 280,575 100,548
             C20,535 -40,542 -80,548 Z"
          fill="#2BB5C2"
          animate={{ x: [0, -22, 0] }}
          transition={{ duration: 13, repeat: Infinity, ease: 'easeInOut' }}
        />

        <motion.path
          d="M-80,0 L1520,0 L1520,518
             C1380,473 1240,543 1080,508
             C920,473 760,543 600,508
             C440,473 280,538 100,511
             C20,498 -40,505 -80,511 Z"
          fill="#42C8D4"
          animate={{ x: [0, 18, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
        />

        <motion.path
          d="M-80,0 L1520,0 L1520,482
             C1380,437 1240,507 1080,472
             C920,437 760,507 600,472
             C440,437 280,502 100,475
             C20,462 -40,469 -80,475 Z"
          fill="#80DCEA"
          animate={{ x: [0, -14, 0] }}
          transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut', delay: 1.1 }}
        />

        <motion.path
          d="M-80,468
             C60,428 220,508 380,468
             C540,428 700,508 860,468
             C1020,428 1180,502 1340,468
             C1410,450 1480,455 1520,462
             L1520,494
             C1480,487 1410,476 1340,494
             C1180,528 1020,454 860,494
             C700,534 540,454 380,494
             C220,534 60,454 -80,494 Z"
          fill="white"
          animate={{ x: [0, 24, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
        />

        <motion.path
          d="M-80,486
             C60,446 220,526 380,486
             C540,446 700,526 860,486
             C1020,446 1180,520 1340,486
             C1410,468 1480,473 1520,480
             L1520,510
             C1480,517 1410,498 1340,514
             C1180,548 1020,474 860,514
             C700,554 540,474 380,514
             C220,554 60,474 -80,514 Z"
          fill="#E8C888"
          opacity={0.55}
          animate={{ x: [0, -18, 0] }}
          transition={{ duration: 9.5, repeat: Infinity, ease: 'easeInOut', delay: 0.7 }}
        />
      </svg>
    </div>
  )
}

const headlines = [
  { line1: 'I design the', line2: '“oh, of course.”' },
  { line1: 'Clarity', line2: 'is the feature.' },
]

export default function Hero() {
  const [idx, setIdx] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setIdx(i => (i + 1) % headlines.length), 4500)
    return () => clearInterval(t)
  }, [])

  return (
    <div style={{ background: '#FFFFFF' }}>
    <section
      id="home"
      className="hero-section"
      style={{
        margin: '104px 20px 20px',
        borderRadius: 18,
        overflow: 'hidden',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        minHeight: 'calc(100vh - 90px)',
      }}
    >
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes ping {
          75%, 100% { transform: scale(2.2); opacity: 0; }
        }
      `}</style>

      <BeachSVG />

      {/* hero content */}
      <div style={{
        flex: 1, position: 'relative', zIndex: 5,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'clamp(120px, 16vh, 170px) clamp(40px, 8vw, 120px) clamp(60px, 10vw, 120px)',
        textAlign: 'center',
      }}>

        {/* hello from + actively looking row */}
        <div className="hero-top-row" style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          width: '100%', maxWidth: 680,
          marginBottom: -10,
          animation: 'fadeUp 0.9s 0.1s cubic-bezier(0.16,1,0.3,1) both',
        }}>
          <p style={{
            fontFamily: 'var(--font-body), Georgia, serif',
            fontSize: 'clamp(13px, 1.1vw, 15px)',
            fontWeight: 600,
            color: 'rgba(50,65,100,0.72)',
            fontStyle: 'italic',
            letterSpacing: '0.01em',
            margin: 0,
          }}>
            Hello from the designer&apos;s desk.
          </p>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 8,
            padding: '6px 14px 6px 10px', borderRadius: 999,
            background: 'rgba(255,255,255,0.65)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(255,255,255,0.85)',
            boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
          }}>
            <span style={{ position: 'relative', width: 8, height: 8, flexShrink: 0 }}>
              <span style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: '#4ade80', opacity: 0.4, animation: 'ping 1.8s cubic-bezier(0,0,0.2,1) infinite' }} />
              <span style={{ position: 'relative', display: 'block', width: 8, height: 8, borderRadius: '50%', background: '#22c55e' }} />
            </span>
            <span style={{
              fontFamily: 'var(--font-label), sans-serif',
              fontSize: 10, letterSpacing: '0.08em',
              textTransform: 'uppercase' as const,
              color: '#1a2e1a',
              fontWeight: 600,
            }}>
              Available · Full-time roles
            </span>
          </div>
        </div>

        {/* headline */}
        <h1 style={{
          fontFamily: 'var(--font-display), Georgia, serif',
          fontSize: 'clamp(44px, 8vw, 112px)',
          fontWeight: 400,
          color: '#2A3550',
          lineHeight: 0.94,
          letterSpacing: '-0.025em',
          margin: 0,
          marginTop: 30,
          marginBottom: 'clamp(20px, 3vw, 34px)',
          animation: 'fadeUp 1s 0.2s cubic-bezier(0.16,1,0.3,1) both',
        }}>
          <AnimatePresence mode="wait">
            <motion.span
              key={idx}
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            >
              <span style={{ display: 'block' }}>{headlines[idx].line1}</span>
              <span style={{ display: 'block', fontStyle: 'italic', fontWeight: 300 }}>
                {headlines[idx].line2}
              </span>
            </motion.span>
          </AnimatePresence>
        </h1>

        {/* tagline */}
        <p style={{
          fontFamily: 'var(--font-body), Georgia, serif',
          fontSize: 'clamp(15px, 1.4vw, 19px)',
          fontWeight: 600,
          color: '#2A3550',
          lineHeight: 1.65,
          maxWidth: 520,
          marginBottom: 32,
          animation: 'fadeUp 1s 0.35s cubic-bezier(0.16,1,0.3,1) both',
        }}>
          I research how people think, then design around it. Especially
          when &ldquo;it&rdquo; is an AI that has to earn the user&apos;s trust before
          they&apos;ll let it do anything useful.
        </p>

        {/* CTA */}
        <div style={{
          display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'center',
          animation: 'fadeUp 1s 0.5s cubic-bezier(0.16,1,0.3,1) both',
        }}>
          <a href="#work" style={{
            display: 'inline-flex', alignItems: 'center', gap: 7,
            padding: '13px 26px',
            background: 'rgba(255,255,255,0.55)',
            color: '#2A3550',
            fontFamily: 'var(--font-label), sans-serif',
            fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase' as const,
            borderRadius: 999, textDecoration: 'none',
            border: '1px solid rgba(255,255,255,0.8)',
            backdropFilter: 'blur(8px)',
            transition: 'transform 0.2s',
          }}
            onMouseEnter={e => (e.currentTarget.style.transform = 'translateY(-2px)')}
            onMouseLeave={e => (e.currentTarget.style.transform = '')}
          >
            See my work
          </a>
        </div>

        <p style={{
          fontFamily: 'var(--font-label), sans-serif',
          fontSize: 9, letterSpacing: '0.14em',
          textTransform: 'uppercase' as const,
          color: 'rgba(42,53,80,0.65)',
          marginTop: 22,
          animation: 'fadeIn 1s 0.7s cubic-bezier(0.16,1,0.3,1) both',
        }}>
          Based in the United States · CU Boulder MS &apos;25
        </p>
      </div>

      {/* scroll indicator */}
      <div style={{
        position: 'absolute', bottom: 28, left: '50%', transform: 'translateX(-50%)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 7,
        zIndex: 10,
        animation: 'fadeIn 1s 1s cubic-bezier(0.16,1,0.3,1) both',
      }}>
        <span style={{
          fontFamily: 'var(--font-label), sans-serif',
          fontSize: 8, letterSpacing: '0.18em', textTransform: 'uppercase' as const,
          color: 'rgba(42,53,80,0.4)',
        }}>scroll</span>
        <motion.div
          style={{ width: 1, height: 30, background: 'rgba(42,53,80,0.25)', transformOrigin: 'top' }}
          animate={{ scaleY: [0.3, 1, 0.3] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      {/* seamless fade into page below */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: 180,
        background: 'linear-gradient(to bottom, transparent 0%, rgba(255,255,255,0.7) 60%, #FFFFFF 100%)',
        pointerEvents: 'none', zIndex: 1,
      }} />
    </section>
    </div>
  )
}
