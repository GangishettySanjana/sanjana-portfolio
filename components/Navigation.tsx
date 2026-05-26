'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'

export default function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [musicPlaying, setMusicPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    const audio = new Audio('/music/luther.mp3')
    audio.loop = true
    audio.volume = 0.15
    audioRef.current = audio
    return () => { audio.pause(); audio.src = '' }
  }, [])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close menu on outside tap
  useEffect(() => {
    if (!menuOpen) return
    const handler = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (!target.closest('#mobile-pill-menu') && !target.closest('#mobile-menu-btn')) {
        setMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [menuOpen])

  const linkColor = 'rgba(20,28,50,0.75)'
  const linkHoverColor = 'rgba(20,28,50,1)'
  const linkHoverBg = 'rgba(20,28,50,0.07)'

  const linkStyle: React.CSSProperties = {
    fontFamily: 'var(--font-body), Georgia, serif',
    fontSize: 15,
    fontWeight: 500,
    letterSpacing: '-0.01em',
    textTransform: 'none',
    color: linkColor,
    textDecoration: 'none',
    padding: '6px 11px',
    borderRadius: 8,
    transition: 'background 0.12s, color 0.15s',
  }

  const mobileNavItems = [
    { label: 'Work',           href: '/#work' },
    { label: 'Explorations',   href: '/#explorations' },
    { label: 'About',          href: '/#about' },
    { label: "Let's Connect",  href: 'https://www.linkedin.com/in/sanjana-gangishetty' },
    { label: 'Resume',         href: '/resume.pdf', external: true },
  ]

  return (
    <>
      {/* Main header */}
      <motion.header
        style={{
          position: 'fixed',
          top: 0, left: 0, right: 0,
          zIndex: 50,
          background: scrolled ? 'rgba(255,255,255,0.92)' : 'rgba(255,255,255,0.75)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderBottom: scrolled ? '1px solid rgba(0,0,0,0.06)' : '1px solid rgba(0,0,0,0.04)',
          transition: 'background 0.3s ease, border-color 0.3s ease, backdrop-filter 0.3s ease',
        }}
        initial={{ y: -8, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
      >
        {/* Desktop nav */}
        <nav
          className="hidden md:flex"
          style={{
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
            maxWidth: 1320,
            margin: '0 auto',
            padding: '0 clamp(24px, 5vw, 80px)',
            height: 64,
          }}
        >
          {/* Logo + music toggle */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 0, flexShrink: 0 }}>
            <Link href="/" style={{ textDecoration: 'none' }}>
              <span style={{ fontFamily: 'var(--font-body), Georgia, serif', fontSize: 15, fontWeight: 500, color: '#111827', letterSpacing: '-0.01em' }}>
                Sanjana Gangishetty
              </span>
            </Link>
            <span style={{ color: 'rgba(20,28,50,0.2)', margin: '0 10px', fontSize: 13 }}>·</span>
            <button
              onClick={() => {
                if (musicPlaying) {
                  audioRef.current?.pause()
                  setMusicPlaying(false)
                } else {
                  audioRef.current?.play()
                  setMusicPlaying(true)
                }
              }}
              style={{
                display: 'flex', alignItems: 'center', gap: 6,
                background: 'none', border: 'none', cursor: 'pointer',
                padding: '2px 4px', borderRadius: 6,
                transition: 'opacity 0.15s', lineHeight: 1,
              }}
            >
              {musicPlaying ? (
                <>
                  <svg width="14" height="14" viewBox="0 0 12 12" fill="none">
                    <rect x="1" y="1" width="3.5" height="10" rx="1.5" fill="rgba(20,28,50,0.55)" />
                    <rect x="7.5" y="1" width="3.5" height="10" rx="1.5" fill="rgba(20,28,50,0.55)" />
                  </svg>
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: 'rgba(20,28,50,0.55)', letterSpacing: '-0.01em' }}>my current vibe</span>
                </>
              ) : (
                <>
                  <svg width="14" height="14" viewBox="0 0 12 12" fill="none">
                    <path d="M2 1.5L11 6L2 10.5V1.5Z" fill="rgba(20,28,50,0.35)" />
                  </svg>
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: 'rgba(20,28,50,0.35)', letterSpacing: '-0.01em' }}>my current vibe</span>
                </>
              )}
            </button>
          </div>

          {/* Right side: links + CTA */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 2, flexShrink: 0 }}>
            {[
              { label: 'Work', href: '/#work' },
              { label: 'Explorations', href: '/#explorations' },
              { label: 'About', href: '/#about' },
            ].map(({ label, href }) => (
              <a
                key={label}
                href={href}
                style={linkStyle}
                onMouseEnter={e => {
                  e.currentTarget.style.background = linkHoverBg
                  e.currentTarget.style.color = linkHoverColor
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = 'transparent'
                  e.currentTarget.style.color = linkColor
                }}
              >
                {label}
              </a>
            ))}
            <div style={{ width: 12 }} />
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              style={{ ...linkStyle, fontWeight: 500 }}
              onMouseEnter={e => {
                e.currentTarget.style.background = linkHoverBg
                e.currentTarget.style.color = linkHoverColor
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'transparent'
                e.currentTarget.style.color = linkColor
              }}
            >
              Resume →
            </a>
            <a
              href="https://www.linkedin.com/in/sanjana-gangishetty"
              style={{
                fontFamily: 'var(--font-label), sans-serif',
                fontSize: 11,
                fontWeight: 800,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: '#fff',
                textDecoration: 'none',
                background: 'linear-gradient(135deg, #2A3550 0%, #1a2236 100%)',
                backgroundColor: '#2A3550',
                borderRadius: 999,
                padding: '9px 20px',
                boxShadow: '0 2px 12px rgba(20,28,50,0.3), inset 0 1px 0 rgba(255,255,255,0.1)',
                border: '1px solid rgba(255,255,255,0.08)',
                transition: 'box-shadow 0.12s, transform 0.12s',
                flexShrink: 0,
                isolation: 'isolate' as const,
                willChange: 'transform',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'scale(1.04)'
                e.currentTarget.style.background = 'linear-gradient(135deg, #1e2840 0%, #111828 100%)'
                e.currentTarget.style.color = '#fff'
                e.currentTarget.style.boxShadow = '0 4px 20px rgba(20,28,50,0.45), inset 0 1px 0 rgba(255,255,255,0.1)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'scale(1)'
                e.currentTarget.style.background = 'linear-gradient(135deg, #2A3550 0%, #1a2236 100%)'
                e.currentTarget.style.color = '#fff'
                e.currentTarget.style.boxShadow = '0 2px 12px rgba(20,28,50,0.3), inset 0 1px 0 rgba(255,255,255,0.1)'
              }}
            >
              Let&apos;s Connect
            </a>
          </div>
        </nav>

        {/* Mobile header */}
        <div
          className="flex md:hidden"
          style={{
            width: '100%',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '12px 20px',
          }}
        >
          <Link href="/" style={{ textDecoration: 'none' }}>
            <span style={{
              fontFamily: 'var(--font-body), Georgia, serif',
              fontSize: 15, fontWeight: 500,
              color: '#111827',
            }}>
              Sanjana Gangishetty
            </span>
          </Link>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            {/* Hamburger */}
            <button
              id="mobile-menu-btn"
              onClick={() => setMenuOpen(!menuOpen)}
              style={{
                background: menuOpen ? 'rgba(20,28,50,0.06)' : 'none',
                border: '1px solid',
                borderColor: menuOpen ? 'rgba(20,28,50,0.12)' : 'transparent',
                borderRadius: 8,
                cursor: 'pointer',
                padding: '7px 8px',
                display: 'flex',
                flexDirection: 'column',
                gap: 5,
                transition: 'background 0.18s, border-color 0.18s',
              }}
              aria-label="Toggle menu"
            >
              {[0, 1, 2].map(i => (
                <motion.span
                  key={i}
                  style={{
                    display: 'block', width: 22, height: 1.5, borderRadius: 2,
                    background: 'rgba(20,28,50,0.82)',
                    transformOrigin: 'center',
                  }}
                  animate={
                    menuOpen && i === 0 ? { rotate: 45, y: 6.5 }
                      : menuOpen && i === 1 ? { opacity: 0 }
                      : menuOpen && i === 2 ? { rotate: -45, y: -6.5 }
                      : { rotate: 0, y: 0, opacity: 1 }
                  }
                  transition={{ duration: 0.2 }}
                />
              ))}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile floating pill menu */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              style={{
                position: 'fixed', inset: 0, zIndex: 48,
                background: 'rgba(10,15,30,0.25)',
                backdropFilter: 'blur(4px)',
                WebkitBackdropFilter: 'blur(4px)',
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.22 }}
              onClick={() => setMenuOpen(false)}
            />

            {/* Centering wrapper — keep CSS transform separate from Framer Motion */}
            <div
              id="mobile-pill-menu"
              style={{
                position: 'fixed',
                top: '50%', left: '50%',
                transform: 'translate(-50%, -50%)',
                zIndex: 49,
                width: 'min(320px, 88vw)',
              }}
            >
            <motion.div
              style={{
                background: 'rgba(255,255,255,0.97)',
                backdropFilter: 'blur(24px)',
                WebkitBackdropFilter: 'blur(24px)',
                borderRadius: 24,
                boxShadow: '0 24px 60px rgba(10,15,30,0.22), 0 1px 0 rgba(255,255,255,0.8) inset',
                border: '1px solid rgba(20,28,50,0.08)',
                overflow: 'hidden',
                padding: '8px 0',
              }}
              initial={{ opacity: 0, scale: 0.90, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 10 }}
              transition={{ duration: 0.26, ease: [0.16, 1, 0.3, 1] }}
            >
              {mobileNavItems.map(({ label, href, external }, i) => (
                <motion.a
                  key={label}
                  href={href}
                  target={external ? '_blank' : undefined}
                  rel={external ? 'noopener noreferrer' : undefined}
                  onClick={() => setMenuOpen(false)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '16px 24px',
                    textDecoration: 'none',
                    color: label === "Let's Connect" ? '#2A3550' : 'rgba(20,28,50,0.82)',
                    fontFamily: label === "Let's Connect"
                      ? 'var(--font-body), Georgia, serif'
                      : 'var(--font-body), Georgia, serif',
                    fontSize: label === "Let's Connect" ? 16 : 15,
                    fontWeight: label === "Let's Connect" ? 600 : 500,
                    borderBottom: i < mobileNavItems.length - 1
                      ? '1px solid rgba(20,28,50,0.06)'
                      : 'none',
                    transition: 'background 0.12s',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.background = 'rgba(20,28,50,0.04)')}
                  onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.22, ease: 'easeOut' }}
                >
                  <span>{label}</span>
                  <span style={{
                    fontSize: 16,
                    opacity: 0.35,
                    fontWeight: 400,
                    letterSpacing: '-0.02em',
                  }}>→</span>
                </motion.a>
              ))}
            </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
