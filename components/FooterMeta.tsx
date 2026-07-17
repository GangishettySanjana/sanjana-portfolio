'use client'

import { getLenis } from '@/lib/smoothScroll'

/**
 * Quiet footer details: an availability indicator and an accessible
 * back-to-top button.
 */

function Availability() {
  return (
    <span className="footer-availability">
      <span className="footer-availability-dot" aria-hidden="true" />
      Open to opportunities
    </span>
  )
}

function BackToTop() {
  const toTop = () => {
    const lenis = getLenis()
    if (lenis) lenis.scrollTo(0)
    else window.scrollTo({ top: 0, behavior: 'smooth' })
  }
  return (
    <button type="button" className="back-to-top" onClick={toTop} aria-label="Back to top of page">
      <span aria-hidden="true">↑</span> Top
    </button>
  )
}

export default function FooterMeta() {
  return (
    <div className="footer-meta">
      <Availability />
      <BackToTop />
    </div>
  )
}
