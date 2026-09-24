'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import ResumeModal from './ResumeModal'

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
            <Link href="/#contact" onClick={() => setMenuOpen(false)}>Contact</Link>
            <Link href="/recruiters" className="only-mobile" onClick={() => setMenuOpen(false)}>See if we&rsquo;re a match ↗</Link>
          </nav>
          <a href="https://www.linkedin.com/in/sanjana-gangishetty" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" style={{ display: 'flex', alignItems: 'center', color: '#002448', opacity: 0.7, transition: 'opacity 0.15s', flexShrink: 0 }} onMouseEnter={e => (e.currentTarget.style.opacity='1')} onMouseLeave={e => (e.currentTarget.style.opacity='0.7')}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
              <path d="M4.5 9.5H4C3.05719 9.5 2.58579 9.5 2.29289 9.79289C2 10.0858 2 10.5572 2 11.5V20C2 20.9428 2 21.4142 2.29289 21.7071C2.58579 22 3.05719 22 4 22H4.5C5.44281 22 5.91421 22 6.20711 21.7071C6.5 21.4142 6.5 20.9428 6.5 20V11.5C6.5 10.5572 6.5 10.0858 6.20711 9.79289C5.91421 9.5 5.44281 9.5 4.5 9.5Z"/>
              <path d="M6.5 4.25C6.5 5.49264 5.49264 6.5 4.25 6.5C3.00736 6.5 2 5.49264 2 4.25C2 3.00736 3.00736 2 4.25 2C5.49264 2 6.5 3.00736 6.5 4.25Z"/>
              <path d="M12.326 9.5H11.5C10.5572 9.5 10.0858 9.5 9.79289 9.79289C9.5 10.0858 9.5 10.5572 9.5 11.5V20C9.5 20.9428 9.5 21.4142 9.79289 21.7071C10.0858 22 10.5572 22 11.5 22H12C12.9428 22 13.4142 22 13.7071 21.7071C14 21.4142 14 20.9428 14 20L14.0001 16.5001C14.0001 14.8433 14.5281 13.5001 16.0879 13.5001C16.8677 13.5001 17.5 14.1717 17.5 15.0001V19.5001C17.5 20.4429 17.5 20.9143 17.7929 21.2072C18.0857 21.5001 18.5572 21.5001 19.5 21.5001H19.9987C20.9413 21.5001 21.4126 21.5001 21.7055 21.2073C21.9984 20.9145 21.9985 20.4432 21.9987 19.5006L22.0001 14.0002C22.0001 11.515 19.6364 9.50024 17.2968 9.50024C15.9649 9.50024 14.7767 10.1531 14.0001 11.174C14 10.5439 14 10.2289 13.8632 9.995C13.7765 9.84686 13.6531 9.72353 13.505 9.63687C13.2711 9.5 12.9561 9.5 12.326 9.5Z" strokeLinejoin="round"/>
            </svg>
          </a>
          <button className="site-resume" onClick={() => setResumeOpen(true)}>Résumé ↗</button>
          {resumeOpen && <ResumeModal onClose={() => setResumeOpen(false)} />}
          <button className="site-toggle" aria-label="Menu" aria-expanded={menuOpen} onClick={() => setMenuOpen(v => !v)}>
            <span /><span /><span />
          </button>
        </div>
      </div>
    </header>
  )
}
