'use client'

import { useState, useEffect } from 'react'

export default function Contact() {
  const [copied, setCopied] = useState(false)
  const [showScroll, setShowScroll] = useState(false)
  const email = 'gangishettysanjana084@gmail.com'

  useEffect(() => {
    const onScroll = () => setShowScroll(window.scrollY > 400)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  function copyEmail() {
    navigator.clipboard.writeText(email).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <footer id="contact" style={{ background: '#fff', borderTop: '1px solid rgba(0,0,0,0.06)' }}>
      <div style={{
        maxWidth: 1320, margin: '0 auto',
        padding: 'clamp(72px, 10vw, 120px) clamp(24px, 5vw, 80px) clamp(40px, 5vw, 64px)',
      }}>

        {/* Email block */}
        <div style={{ marginBottom: 48 }}>
          <p style={{
            fontFamily: 'var(--font-display), Georgia, serif',
            fontSize: 'clamp(32px, 5vw, 60px)',
            fontWeight: 400,
            color: '#111827',
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
            marginBottom: 20,
          }}>
            If the experience you&apos;re building deserves to feel more human,{' '}
            <em style={{ fontStyle: 'italic', fontWeight: 300 }}>let&apos;s talk.</em>
          </p>

          <div style={{ display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap' }}>
            <a
              href={`mailto:${email}`}
              style={{
                fontFamily: 'var(--font-body), Georgia, serif',
                fontSize: 15,
                fontWeight: 500,
                color: '#111827',
                textDecoration: 'underline',
                textUnderlineOffset: 3,
                textDecorationColor: 'rgba(0,0,0,0.25)',
                transition: 'text-decoration-color 0.2s, opacity 0.2s',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.textDecorationColor = '#111827'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.textDecorationColor = 'rgba(0,0,0,0.25)'
              }}
            >
              {email}
            </a>

            <button
              onClick={copyEmail}
              style={{
                background: copied ? 'rgba(34,197,94,0.08)' : '#111827',
                border: `1px solid ${copied ? 'rgba(34,197,94,0.3)' : '#111827'}`,
                borderRadius: 999,
                padding: '7px 16px',
                fontFamily: 'var(--font-label), sans-serif',
                fontSize: 10,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: copied ? '#22c55e' : '#ffffff',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
            >
              {copied ? '✓ Copied' : 'Copy'}
            </button>
          </div>
        </div>

        {/* Social links */}
        <div style={{ display: 'flex', gap: 24, marginBottom: 64, flexWrap: 'wrap' }}>
          {[
            {
              label: 'LinkedIn',
              href: 'https://www.linkedin.com/in/sanjana-gangishetty',
              icon: (
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none">
                  <rect x="2" y="2" width="20" height="20" rx="4" stroke="#111827" strokeWidth="1.5"/>
                  <path d="M7 10v7M7 7.5v.5M11 17v-4c0-1.1.9-2 2-2s2 .9 2 2v4M11 10v7" stroke="#111827" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              ),
            },
            {
              label: 'Email',
              href: 'mailto:gangishettysanjana@gmail.com',
              icon: (
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none">
                  <rect x="2" y="4" width="20" height="16" rx="3" stroke="#111827" strokeWidth="1.5"/>
                  <path d="M2 7l10 7 10-7" stroke="#111827" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              ),
            },
          ].map(({ label, href, icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex', alignItems: 'center', gap: 12,
                textDecoration: 'none',
                fontFamily: 'var(--font-label), sans-serif',
                fontSize: 13, letterSpacing: '0.1em', textTransform: 'uppercase',
                color: '#111827',
                transition: 'opacity 0.2s',
              }}
              onMouseEnter={e => (e.currentTarget.style.opacity = '0.5')}
              onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
            >
              {icon}
              {label}
            </a>
          ))}
        </div>

        {/* Bottom bar */}
        <div style={{
          borderTop: '1px solid rgba(0,0,0,0.08)',
          paddingTop: 28,
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          gap: 24,
        }} className="footer-bottom">
          <div>
            <p style={{ fontFamily: 'var(--font-label), sans-serif', fontSize: 13, color: '#111827', margin: '0 0 4px' }}>
              © 2026 Sanjana Gangishetty
            </p>
            <p style={{ fontFamily: 'var(--font-label), sans-serif', fontSize: 13, color: '#6B7280', margin: 0 }}>
              &ldquo;The details are not the details. They make the design.&rdquo; — Charles Eames
            </p>
          </div>
          <div style={{ textAlign: 'right' }}>
            <p style={{ fontFamily: 'var(--font-label), sans-serif', fontSize: 13, color: '#111827', margin: '0 0 4px' }}>
              Made in the US, by yours truly.
            </p>
            <p style={{ fontFamily: 'var(--font-label), sans-serif', fontSize: 13, color: '#6B7280', margin: 0 }}>
              Last updated on May 2026
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
