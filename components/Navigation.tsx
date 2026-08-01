'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

/**
 * One nav for the whole site — matches the homepage/Fun sky nav:
 * Instrument Serif wordmark, "open to work" status, Work/About/Fun/Contact,
 * and a Résumé pill. Transparent at the top, soft frost once you scroll so
 * it stays legible over content. Hidden on the immersive /play game routes
 * (the homepage and /fun render this same markup inline).
 */
export default function Navigation() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // The homepage ships this nav inline; the game routes stay immersive.
  if (pathname === '/' || pathname.startsWith('/play')) return null

  return (
    <header className={`site-nav${scrolled ? ' scrolled' : ''}`}>
      <div className="site-nav-inner">
        <div className="site-nav-left">
          <Link href="/" className="site-brand">Sanjana Gangishetty</Link>
          <span className="site-status"><span className="site-dot" />Currently looking for a role</span>
        </div>
        <div className="site-nav-right">
          <nav className={`site-links${menuOpen ? ' open' : ''}`}>
            <Link href="/#work" onClick={() => setMenuOpen(false)}>Work</Link>
            <Link href="/#about" onClick={() => setMenuOpen(false)}>About</Link>
            <Link href="/fun" onClick={() => setMenuOpen(false)}>Fun</Link>
            <Link href="/#contact" onClick={() => setMenuOpen(false)}>Contact</Link>
          </nav>
          <a className="site-resume" href="/resume.pdf?v=0722" target="_blank" rel="noopener noreferrer">Résumé ↗</a>
          <button className="site-toggle" aria-label="Menu" aria-expanded={menuOpen} onClick={() => setMenuOpen(v => !v)}>
            <span /><span /><span />
          </button>
        </div>
      </div>
    </header>
  )
}
