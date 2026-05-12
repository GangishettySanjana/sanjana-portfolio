'use client'

import { motion } from 'framer-motion'

const tools = [
  {
    name: 'Figma',
    category: 'Product design',
    bg: '#1E1E1E',
    icon: (
      <svg viewBox="0 0 38 56" width="22" height="30" fill="none">
        <rect x="0" y="0" width="19" height="19" rx="5" fill="#F24E1E"/>
        <rect x="19" y="0" width="19" height="19" rx="5" fill="#FF7262"/>
        <rect x="0" y="18" width="19" height="19" rx="5" fill="#0ACF83"/>
        <circle cx="28.5" cy="27.5" r="9.5" fill="#1ABCFE"/>
        <rect x="0" y="37" width="19" height="19" rx="5" fill="#A259FF"/>
      </svg>
    ),
  },
  {
    name: 'Framer',
    category: 'No-code development',
    bg: '#0055FF',
    icon: (
      <svg viewBox="0 0 24 24" width="26" height="26" fill="none">
        <path d="M5 3h14v8H12L5 3zm0 8h7l7 10H5v-10z" fill="white"/>
      </svg>
    ),
  },
  {
    name: 'Procreate',
    category: 'Digital illustration',
    bg: '#1C1C1E',
    icon: (
      <svg viewBox="0 0 24 24" width="26" height="26" fill="none">
        <path d="M7 4h5.5a4 4 0 010 8H7V4z" fill="none" stroke="white" strokeWidth="2" strokeLinejoin="round"/>
        <line x1="7" y1="12" x2="7" y2="20" stroke="white" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    name: 'Notion',
    category: 'Planning & docs',
    bg: '#ffffff',
    icon: (
      <svg viewBox="0 0 24 24" width="26" height="26" fill="none">
        <path d="M5 3.5C5 2.7 5.6 2 6.4 1.9l10-1c.5 0 .9.1 1.2.4l1.8 1.5c.4.3.6.8.6 1.2V19c0 .8-.6 1.5-1.4 1.6L7 21.9c-.8.1-1.4-.5-1.4-1.3V3.5z" fill="#fff" stroke="#ddd" strokeWidth="1"/>
        <path d="M8 6.5l1.8 2.4V6.5h1.2v5h-1L8.2 9v2.5H7v-5h1z" fill="#000"/>
      </svg>
    ),
  },
  {
    name: 'Claude',
    category: 'AI-assisted design',
    bg: '#CC785C',
    icon: (
      <svg viewBox="0 0 24 24" width="24" height="24" fill="none">
        <path d="M12 3C12 3 14.5 6 14.5 12S12 21 12 21" stroke="white" strokeWidth="2" strokeLinecap="round"/>
        <path d="M3 12C3 12 6 9.5 12 9.5S21 12 21 12" stroke="white" strokeWidth="2" strokeLinecap="round"/>
        <path d="M5.6 5.6C8.5 7.5 10.5 10.5 10.5 10.5" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M18.4 18.4C15.5 16.5 13.5 13.5 13.5 13.5" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M5.6 18.4C7.5 15.5 10.5 13.5 10.5 13.5" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M18.4 5.6C16.5 8.5 13.5 10.5 13.5 10.5" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    name: 'Jira',
    category: 'Project tracking',
    bg: '#1868DB',
    icon: (
      <svg viewBox="0 0 24 24" width="26" height="26" fill="none">
        <defs>
          <linearGradient id="jira-stack" x1="1" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2684FF"/>
            <stop offset="100%" stopColor="rgba(38,132,255,0.3)"/>
          </linearGradient>
        </defs>
        <path d="M12 2.5L5.5 9l3 3L12 8.5l3.5 3.5 3-3L12 2.5z" fill="white"/>
        <path d="M12 21.5l6.5-6.5-3-3L12 15.5l-3.5-3.5-3 3L12 21.5z" fill="url(#jira-stack)"/>
      </svg>
    ),
  },
  {
    name: 'Slack',
    category: 'Team communication',
    bg: '#4A154B',
    icon: (
      <svg viewBox="0 0 24 24" width="24" height="24" fill="none">
        <rect x="3" y="9.75" width="6" height="2.5" rx="1.25" fill="#E01E5A"/>
        <circle cx="3.5" cy="11" r="1.5" fill="#E01E5A"/>
        <rect x="9.75" y="3" width="2.5" height="6" rx="1.25" fill="#ECB22E"/>
        <circle cx="11" cy="3.5" r="1.5" fill="#ECB22E"/>
        <rect x="15" y="9.75" width="6" height="2.5" rx="1.25" fill="#2EB67D"/>
        <circle cx="20.5" cy="11" r="1.5" fill="#2EB67D"/>
        <rect x="9.75" y="15" width="2.5" height="6" rx="1.25" fill="#36C5F0"/>
        <circle cx="11" cy="20.5" r="1.5" fill="#36C5F0"/>
      </svg>
    ),
  },
  {
    name: 'Lovable',
    category: 'AI app building',
    bg: '#FF3B6F',
    icon: (
      <svg viewBox="0 0 24 24" width="24" height="24" fill="none">
        <path d="M12 19.5C12 19.5 3.5 14 3.5 8.5a4.5 4.5 0 018.5-2.1A4.5 4.5 0 0120.5 8.5C20.5 14 12 19.5 12 19.5z" fill="white"/>
      </svg>
    ),
  },
]

export default function Stack() {
  return (
    <section style={{ background: '#fff', padding: 'var(--section-gap) 0', borderTop: '1px solid rgba(0,0,0,0.05)' }}>
      <div className="container-main">

        <motion.div
          style={{ marginBottom: 48 }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 style={{
            fontFamily: 'var(--font-heading), Georgia, serif',
            fontSize: 'clamp(28px, 4vw, 44px)',
            fontWeight: 700,
            color: '#111827',
            margin: 0,
            letterSpacing: '-0.02em',
          }}>
            My stack
          </h2>
        </motion.div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
          gap: 12,
        }}>
          {tools.map((tool, i) => (
            <motion.div
              key={tool.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 16,
                padding: '20px 24px',
                borderRadius: 14,
                border: '1.5px dashed rgba(0,0,0,0.1)',
                background: '#fff',
              }}
            >
              {/* Icon */}
              <div style={{
                width: 52, height: 52, borderRadius: 14,
                background: tool.bg,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0,
                boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
              }}>
                {tool.icon}
              </div>

              {/* Text */}
              <div>
                <p style={{
                  fontFamily: 'var(--font-heading), Georgia, serif',
                  fontSize: 16, fontWeight: 700,
                  color: '#111827', margin: '0 0 3px',
                  letterSpacing: '-0.01em',
                }}>
                  {tool.name}
                </p>
                <p style={{
                  fontFamily: 'var(--font-label), sans-serif',
                  fontSize: 12, color: '#9CA3AF',
                  margin: 0,
                }}>
                  {tool.category}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
