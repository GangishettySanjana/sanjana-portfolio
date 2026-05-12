'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'

export default function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false)

  const linkStyle: React.CSSProperties = {
    fontFamily: 'var(--font-label), sans-serif',
    fontSize: 12, fontWeight: 700,
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    color: 'rgba(20,28,50,0.75)',
    textDecoration: 'none',
    padding: '6px 11px',
    borderRadius: 8,
    transition: 'background 0.12s, color 0.12s',
  }

  return (
    <>
      {/* desktop pill nav */}
      <motion.header
        style={{
          position: 'fixed', top: 16, left: 16, right: 16, zIndex: 50,
          pointerEvents: 'none',
        }}
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
      >
        {/* desktop */}
        <nav
          className="hidden md:flex"
          style={{
            pointerEvents: 'all',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
            padding: '8px 12px 8px 20px',
            borderRadius: 999,
            background: 'rgba(255,255,255,0.7)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            border: '1px solid rgba(255,255,255,0.9)',
            boxShadow: '0 2px 20px rgba(20,28,50,0.08), 0 0 0 0.5px rgba(20,28,50,0.06)',
          }}
        >
          {/* Home / Logo — left */}
          <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', flexShrink: 0 }}
            onMouseEnter={e => (e.currentTarget.style.opacity = '0.6')}
            onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
          >
            <img src="/logo.png" alt="Sanjana" style={{ height: 44, width: 'auto', display: 'block', transition: 'opacity 0.12s' }} />
          </Link>

          {/* Work · About · Resume — center cluster */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {[
              { label: 'Work', href: '#work' },
              { label: 'About', href: '#about' },
            ].map(({ label, href }) => (
              <a key={label} href={href} style={linkStyle}
                onMouseEnter={e => {
                  e.currentTarget.style.background = 'rgba(20,28,50,0.07)'
                  e.currentTarget.style.color = 'rgba(20,28,50,1)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = 'transparent'
                  e.currentTarget.style.color = 'rgba(20,28,50,0.75)'
                }}
              >
                {label}
              </a>
            ))}
            <Link
              href="/resume"
              style={{ ...linkStyle, fontWeight: 500 }}
              onMouseEnter={e => {
                e.currentTarget.style.background = 'rgba(20,28,50,0.07)'
                e.currentTarget.style.color = 'rgba(20,28,50,1)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'transparent'
                e.currentTarget.style.color = 'rgba(20,28,50,0.75)'
              }}
            >
              Resume ↗
            </Link>
          </div>

          {/* Let's Connect — pill button */}
          <a href="#contact" style={{
            fontFamily: 'var(--font-label), sans-serif',
            fontSize: 11, fontWeight: 800,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: '#fff',
            textDecoration: 'none',
            background: 'linear-gradient(135deg, #2A3550 0%, #1a2236 100%)',
            borderRadius: 999,
            padding: '10px 22px',
            boxShadow: '0 2px 12px rgba(20,28,50,0.35), inset 0 1px 0 rgba(255,255,255,0.1)',
            border: '1px solid rgba(255,255,255,0.12)',
            transition: 'box-shadow 0.12s, transform 0.12s',
            flexShrink: 0,
          }}
            onMouseEnter={e => {
              e.currentTarget.style.boxShadow = '0 4px 20px rgba(20,28,50,0.45), inset 0 1px 0 rgba(255,255,255,0.1)'
              e.currentTarget.style.transform = 'scale(1.04)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.boxShadow = '0 2px 12px rgba(20,28,50,0.35), inset 0 1px 0 rgba(255,255,255,0.1)'
              e.currentTarget.style.transform = 'scale(1)'
            }}
          >
            Let&apos;s Connect
          </a>
        </nav>

        {/* mobile: logo + hamburger */}
        <div
          className="flex md:hidden"
          style={{
            pointerEvents: 'all',
            width: '100%',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 4px',
          }}
        >
          <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
            <img src="/logo.png" alt="Sanjana" style={{ height: 44, width: 'auto', display: 'block' }} />
          </Link>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 8, display: 'flex', flexDirection: 'column', gap: 5 }}
            aria-label="Toggle menu"
          >
            {[0, 1, 2].map(i => (
              <motion.span
                key={i}
                style={{ display: 'block', width: 22, height: 1.5, borderRadius: 2, background: 'rgba(20,28,50,0.82)', transformOrigin: 'center' }}
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

      {/* mobile fullscreen menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            style={{ position: 'fixed', inset: 0, zIndex: 40, background: '#FFFFFF', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 36 }}
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            {[['Work', '#work'], ['About', '#about'], ['Connect', '#contact']].map(([label, href], i) => (
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
            <motion.a href="/resume"
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
