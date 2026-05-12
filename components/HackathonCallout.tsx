'use client'

import { motion } from 'framer-motion'

export default function HackathonCallout() {
  return (
    <section style={{ background: '#fff', padding: '0 clamp(24px, 5vw, 80px) clamp(40px, 5vw, 64px)' }}>
      <div style={{ maxWidth: 1320, margin: '0 auto' }}>
        <motion.div
          className="hackathon-callout"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 40,
            padding: 'clamp(28px, 3vw, 36px) clamp(28px, 3vw, 44px)',
            borderRadius: 20,
            background: '#fff',
            border: '1px solid rgba(0,0,0,0.08)',
            borderLeft: '3px solid #2A3550',
          }}
        >
          {/* Left — label + headline + body */}
          <div className="hackathon-callout-left" style={{ display: 'flex', alignItems: 'flex-start', gap: 24, flex: 1, minWidth: 0 }}>

            {/* Star mark — portfolio navy */}
            <div style={{
              width: 40, height: 40, borderRadius: 10,
              background: 'rgba(42,53,80,0.06)',
              border: '1px solid rgba(42,53,80,0.1)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0, marginTop: 2,
            }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M12 2l2.9 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l7.1-1.01L12 2z" fill="#2A3550" opacity="0.7"/>
              </svg>
            </div>

            {/* Text block */}
            <div style={{ minWidth: 0 }}>
              <p style={{
                fontFamily: 'var(--font-label), sans-serif',
                fontSize: 9, letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: 'rgba(42,53,80,0.45)',
                fontWeight: 700,
                margin: '0 0 6px',
              }}>
                Recognition
              </p>
              <p style={{
                fontFamily: 'var(--font-heading), Georgia, serif',
                fontSize: 'clamp(15px, 1.4vw, 18px)',
                fontWeight: 700,
                color: '#2A3550',
                margin: '0 0 8px',
                lineHeight: 1.25,
                letterSpacing: '-0.01em',
              }}>
                Finalist. Women in Product × Lovable Hackathon 2026
              </p>
              <span style={{
                display: 'inline-flex', alignItems: 'center', gap: 5,
                fontFamily: 'var(--font-label), sans-serif',
                fontSize: 9, letterSpacing: '0.1em', textTransform: 'uppercase' as const,
                color: '#16a34a', background: 'rgba(22,163,74,0.08)',
                border: '1px solid rgba(22,163,74,0.2)', borderRadius: 999,
                padding: '3px 10px', marginBottom: 8,
              }}>
                <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#16a34a', display: 'block' }} />
                Live
              </span>
              <p style={{
                fontFamily: 'var(--font-body), Georgia, serif',
                fontSize: 'clamp(14px, 1.1vw, 15px)',
                color: 'rgba(42,53,80,0.72)',
                lineHeight: 1.65,
                margin: '0 0 12px',
              }}>
                Built a working referral network for the WIP community in one sprint, designed to make cold referral requests feel less awkward and more human. Team of 5. Shipped, presented, placed.
              </p>
              {/* Tags */}
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                {['Lovable', 'AI-assisted', '48hrs', 'Team of 5'].map(tag => (
                  <span key={tag} style={{
                    fontFamily: 'var(--font-label), sans-serif',
                    fontSize: 9, letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    color: '#2A3550',
                    background: 'rgba(42,53,80,0.07)',
                    border: '1px solid rgba(42,53,80,0.18)',
                    borderRadius: 999,
                    padding: '3px 10px',
                  }}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right — CTA */}
          <a
            href="https://wip-spark-connect.lovable.app"
            target="_blank"
            rel="noopener noreferrer"
            className="hackathon-callout-cta"
            style={{
              flexShrink: 0,
              fontFamily: 'var(--font-label), sans-serif',
              fontSize: 10, letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: '#2A3550',
              textDecoration: 'none',
              border: '1px solid rgba(42,53,80,0.25)',
              borderRadius: 999,
              padding: '11px 22px',
              whiteSpace: 'nowrap' as const,
              transition: 'background 0.25s, color 0.25s, border-color 0.25s',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = '#2A3550'
              e.currentTarget.style.color = '#F7F3EE'
              e.currentTarget.style.borderColor = '#2A3550'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'transparent'
              e.currentTarget.style.color = '#2A3550'
              e.currentTarget.style.borderColor = 'rgba(42,53,80,0.25)'
            }}
          >
            View Live App →
          </a>

        </motion.div>
      </div>
    </section>
  )
}
