'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

const tools = [
  { name: 'Figma',          category: 'Product design',      bg: '#ffffff', border: true,  icon: <img src="/tools/figma.svg"     alt="Figma"          style={{ width: 20, height: 20, objectFit: 'contain' }} /> },
  { name: 'Adobe CC',       category: 'Creative suite',      bg: '#ffffff', border: true,  icon: <img src="/tools/adobe.svg"     alt="Adobe CC"       style={{ width: 22, height: 22, objectFit: 'contain' }} /> },
  { name: 'Notion',         category: 'Planning & docs',     bg: '#ffffff', border: true,  icon: <img src="/tools/notion.svg"    alt="Notion"         style={{ width: 20, height: 20, objectFit: 'contain' }} /> },
  { name: 'Jira',           category: 'Project tracking',    bg: '#ffffff', border: true,  icon: <img src="/tools/jira.svg"      alt="Jira"           style={{ width: 22, height: 22, objectFit: 'contain' }} /> },
  { name: 'Slack',          category: 'Communication',       bg: '#ffffff', border: true,  icon: <img src="/tools/slack.svg"     alt="Slack"          style={{ width: 20, height: 20, objectFit: 'contain' }} /> },
  { name: 'GitHub',         category: 'Version control',     bg: '#1C1C1E', border: false, icon: <img src="/tools/github.svg"    alt="GitHub"         style={{ width: 20, height: 20, objectFit: 'contain', filter: 'invert(1)' }} /> },
  { name: 'Claude Code',    category: 'AI-assisted design',  bg: '#2C1810', border: false, icon: <img src="/tools/claudecode.svg" alt="Claude Code"   style={{ width: 22, height: 22, objectFit: 'contain' }} /> },
  { name: 'Lovable',        category: 'AI app building',     bg: '#0A0A0A', border: false, icon: <img src="/tools/lovable.svg"   alt="Lovable"        style={{ width: 20, height: 20, objectFit: 'contain' }} /> },
  { name: 'Framer',         category: 'No-code dev',         bg: '#0055FF', border: false, icon: <svg viewBox="0 0 24 24" width="18" height="18" fill="none"><path d="M5 3h14v8H12L5 3zm0 8h7l7 10H5v-10z" fill="white"/></svg> },
  { name: 'Procreate',      category: 'Illustration',        bg: '#1C1C1E', border: false, icon: <svg viewBox="0 0 24 24" width="18" height="18" fill="none"><path d="M7 4h5.5a4 4 0 010 8H7V4z" fill="none" stroke="white" strokeWidth="2" strokeLinejoin="round"/><line x1="7" y1="12" x2="7" y2="20" stroke="white" strokeWidth="2" strokeLinecap="round"/></svg> },
]

export default function About() {
  return (
    <section id="about" style={{ background: '#FFFFFF', padding: '0 20px 20px' }}>
      <div style={{
        borderRadius: 20,
        background: '#F7F3EE',
        overflow: 'hidden',
      }}>

        {/* Top strip */}
        <div style={{ padding: 'clamp(60px, 8vw, 96px) clamp(32px, 6vw, 80px) 0' }}>

          <motion.p
            style={{ fontFamily: 'var(--font-label), sans-serif', fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#9CA3AF', marginBottom: 24, fontWeight: 700 }}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            About
          </motion.p>

          {/* Two column: text + photo */}
          <div className="about-grid" style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 300px', gap: 'clamp(40px,6vw,80px)', alignItems: 'start' }}>

            {/* Left — headline + copy */}
            <div>
              <motion.h2
                style={{ fontFamily: 'var(--font-display), Georgia, serif', fontSize: 'clamp(32px, 4.5vw, 56px)', fontWeight: 400, color: '#2A3550', lineHeight: 1.05, letterSpacing: '-0.025em', marginBottom: 32 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              >
                Dearest gentle reader.<br />
                <em style={{ fontStyle: 'italic', fontWeight: 300 }}>Your correspondent brings news.</em>
              </motion.h2>

              {[
                `There is a designer in the market, and she has been chasing a specific feeling since 2018. Not the feeling of shipping. The feeling of watching someone use something you built, and come back to it the next day without being asked. A Bachelor's in Design. A Master's from CU Boulder, where the altitude apparently clarifies one's opinions about what works and what very much does not. She has since been observed working across research, strategy, prototyping, and handoff, with a particular fondness for the moment before the decision. Not the wireframe. Not the prototype. The thinking that happens before either of those exists.`,
                `She is open to roles, dear reader, with a particular soft spot for teams building AI products where getting it wrong is not an option — the kind of team that asks not just 'does this work' but 'why would someone come back to this tomorrow.' That question is where she does her best work. Whether you are that team remains to be seen. But this author suspects you already know the answer.`,
              ].map((para, i) => (
                <motion.p
                  key={i}
                  style={{ fontFamily: 'var(--font-body), Georgia, serif', fontSize: 'clamp(15px, 1.3vw, 17px)', color: 'rgba(42,53,80,0.78)', lineHeight: 1.75, marginBottom: 18 }}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
                >
                  {para}
                </motion.p>
              ))}

              <motion.div
                style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 32 }}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.25 }}
              >
                <Link href="/about" style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  padding: '12px 24px', borderRadius: 999,
                  background: '#2A3550', color: '#F7F3EE',
                  fontFamily: 'var(--font-label), sans-serif',
                  fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase' as const,
                  textDecoration: 'none', transition: 'transform 0.2s, opacity 0.2s',
                }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.03)'; e.currentTarget.style.opacity = '0.9' }}
                  onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.opacity = '1' }}
                >
                  Full story →
                </Link>
                <a href="/resume" style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  padding: '12px 24px', borderRadius: 999,
                  border: '1px solid rgba(42,53,80,0.25)', color: '#2A3550',
                  fontFamily: 'var(--font-label), sans-serif',
                  fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase' as const,
                  textDecoration: 'none', transition: 'opacity 0.2s', background: 'transparent',
                }}
                  onMouseEnter={e => (e.currentTarget.style.opacity = '0.6')}
                  onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
                >
                  Resume ↗
                </a>
              </motion.div>
            </div>

            {/* Right — photo */}
            <motion.div
              className="about-photo"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              style={{ position: 'relative' }}
            >
              <div style={{
                width: '100%',
                aspectRatio: '3/4',
                borderRadius: 16,
                overflow: 'hidden',
                boxShadow: '0 20px 60px rgba(42,53,80,0.12), 0 4px 16px rgba(42,53,80,0.08)',
                transform: 'rotate(1.5deg)',
              }}>
                <img
                  src="/images/sanjana.jpg"
                  alt="Sanjana Gangishetty"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />
              </div>
              {/* little tag */}
              <div style={{
                position: 'absolute', bottom: -14, left: 20,
                background: 'white', borderRadius: 10,
                padding: '8px 14px',
                boxShadow: '0 4px 16px rgba(0,0,0,0.10)',
                display: 'flex', alignItems: 'center', gap: 8,
              }}>
                <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#4ade80', display: 'block', flexShrink: 0 }} />
                <span style={{ fontFamily: 'var(--font-label), sans-serif', fontSize: 10, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: '#2A3550' }}>Open to full-time</span>
              </div>
            </motion.div>

          </div>
        </div>

        {/* Tool strip */}
        <motion.div
          style={{ padding: 'clamp(48px, 6vw, 72px) clamp(32px, 6vw, 80px)' }}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="about-tools-grid" style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
            {tools.map((tool, i) => (
              <motion.div
                key={tool.name}
                style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 16px', borderRadius: 12, background: 'white', border: '1px solid rgba(42,53,80,0.07)', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.04 }}
                whileHover={{ y: -2, boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}
              >
                <div style={{ width: 34, height: 34, borderRadius: 9, background: tool.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: tool.border ? 'inset 0 0 0 1px rgba(0,0,0,0.1), 0 1px 4px rgba(0,0,0,0.06)' : '0 1px 4px rgba(0,0,0,0.14)' }}>
                  {tool.icon}
                </div>
                <div>
                  <p style={{ fontFamily: 'var(--font-label), sans-serif', fontSize: 12, fontWeight: 700, color: '#2A3550', margin: '0 0 1px', letterSpacing: '0.02em' }}>{tool.name}</p>
                  <p style={{ fontFamily: 'var(--font-label), sans-serif', fontSize: 10, color: '#9CA3AF', margin: 0, letterSpacing: '0.04em' }}>{tool.category}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  )
}
