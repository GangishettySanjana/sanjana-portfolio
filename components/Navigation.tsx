'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'

export default function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

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

  return (
    <>
      {/* Main header */}
      <motion.header
        style={{
          position: 'fixed',
          top: 0, left: 0, right: 0,
          zIndex: 50,
          background: scrolled ? 'rgba(255,255,255,0.88)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(0,0,0,0.06)' : '1px solid transparent',
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
          {/* Logo */}
          <Link
            href="/"
            style={{ textDecoration: 'none', flexShrink: 0 }}
            onMouseEnter={e => (e.currentTarget.style.opacity = '0.6')}
            onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
          >
            <span style={{
              fontFamily: 'var(--font-body), Georgia, serif',
              fontSize: 15,
              fontWeight: 500,
              color: '#111827',
              letterSpacing: '-0.01em',
            }}>
              Sanjana Gangishetty
            </span>
          </Link>

          {/* Right side: all links + CTA */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 2, flexShrink: 0 }}>
            {[
              { label: 'Work', href: '/#work' },
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
              Resume ↗
            </a>
          <a
            href="/#contact"
            style={{
              fontFamily: 'var(--font-label), sans-serif',
              fontSize: 11,
              fontWeight: 800,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: '#fff',
              textDecoration: 'none',
              background: 'linear-gradient(135deg, #2A3550 0%, #1a2236 100%)',
              borderRadius: 999,
              padding: '9px 20px',
              boxShadow: '0 2px 12px rgba(20,28,50,0.3), inset 0 1px 0 rgba(255,255,255,0.1)',
              border: '1px solid transparent',
              transition: 'box-shadow 0.12s, transform 0.12s',
              flexShrink: 0,
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'scale(1.04)'
              e.currentTarget.style.boxShadow = scrolled
                ? '0 4px 20px rgba(20,28,50,0.45), inset 0 1px 0 rgba(255,255,255,0.1)'
                : '0 4px 16px rgba(0,0,0,0.18)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'scale(1)'
              e.currentTarget.style.boxShadow = scrolled
                ? '0 2px 12px rgba(20,28,50,0.35), inset 0 1px 0 rgba(255,255,255,0.1)'
                : '0 2px 12px rgba(0,0,0,0.12)'
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
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 8, display: 'flex', flexDirection: 'column', gap: 5 }}
            aria-label="Toggle menu"
          >
            {[0, 1, 2].map(i => (
              <motion.span
                key={i}
                style={{
                  display: 'block', width: 22, height: 1.5, borderRadius: 2,
                  background: 'rgba(20,28,50,0.82)',
                  transformOrigin: 'center',
                  transition: 'background 0.3s',
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
      </motion.header>

      {/* Mobile fullscreen menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            style={{ position: 'fixed', inset: 0, zIndex: 40, background: '#FFFFFF', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 36 }}
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            {[['Work', '/#work'], ['About', '/#about'], ['Connect', '/#contact']].map(([label, href], i) => (
              <motion.a key={label} href={href}
                style={{ fontFamily: 'var(--font-heading), Georgia, serif', fontSize: 36, color: '#3D4B6B', textDecoration: 'none' }}
                onClick={() => setMenuOpen(false)}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                {label}
              </motion.a>
            ))}
            <motion.a href="/resume.pdf" target="_blank" rel="noopener noreferrer"
              style={{ fontFamily: 'var(--font-label), sans-serif', fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', padding: '12px 28px', border: '1px solid #3D4B6B', borderRadius: 999, color: '#3D4B6B', textDecoration: 'none' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.25 }}
            >
              Resume ↗
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
