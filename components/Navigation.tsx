'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import ResumeModal from './ResumeModal'
import { HugeiconsIcon } from '@hugeicons/react'
import { Linkedin01FreeIcons, Menu01FreeIcons, Cancel01FreeIcons } from '@hugeicons/core-free-icons'

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
  const [resumeOpen, setResumeOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // The homepage ships this nav inline; the game routes stay immersive.
  if (pathname === '/' || pathname === '/play' || pathname.startsWith('/play/')) return null

  return (
    <header className={`site-nav${scrolled ? ' scrolled' : ''}`}>
      <div className="site-nav-inner">
        <div className="site-nav-left">
          <Link href="/" className="site-brand">Sanjana Gangishetty</Link>
          <Link href="/recruiters" className="site-status site-status-link"><span className="site-dot" />Currently looking for a role</Link>
        </div>
        <div className="site-nav-right">
          <nav className={`site-links${menuOpen ? ' open' : ''}`}>
            <Link href="/#work" onClick={() => setMenuOpen(false)}>Work</Link>
            <Link href="/#about" onClick={() => setMenuOpen(false)}>About</Link>
            <Link href="/playground" onClick={() => setMenuOpen(false)}>Playground</Link>
            <Link href="/recruiters" className="only-mobile" onClick={() => setMenuOpen(false)}>See if we&rsquo;re a match ↗</Link>
          </nav>
          <a href="https://www.linkedin.com/in/sanjana-gangishetty" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" style={{ display: 'flex', alignItems: 'center', color: '#002448', opacity: 0.7, transition: 'opacity 0.15s', flexShrink: 0 }} onMouseEnter={e => (e.currentTarget.style.opacity='1')} onMouseLeave={e => (e.currentTarget.style.opacity='0.7')}>
            <HugeiconsIcon icon={Linkedin01FreeIcons} size={22} color="currentColor" strokeWidth={1.5} />
          </a>
          <button className="site-resume" onClick={() => setResumeOpen(true)}>Résumé ↗</button>
          {resumeOpen && <ResumeModal onClose={() => setResumeOpen(false)} />}
          <button className="site-toggle" aria-label="Menu" aria-expanded={menuOpen} onClick={() => setMenuOpen(v => !v)}>
            <HugeiconsIcon icon={menuOpen ? Cancel01FreeIcons : Menu01FreeIcons} size={20} color="currentColor" strokeWidth={1.5} />
          </button>
        </div>
      </div>
    </header>
  )
}
