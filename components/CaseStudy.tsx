'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { type Project } from '@/data/projects'

// ── Type scale (Impeccable: 5 clear sizes, ~1.333 ratio, 16px base minimum)
// xs  : 12px — legal, placeholder labels
// sm  : 14px — tags, ALL-CAPS meta labels
// base: 16px — body text, sidebar values
// lg  : 20px — section headings, active nav
// xl  : clamp(56px, 7.5vw, 104px) — display title

// ── Tool logo badges ──
function ToolBadge({ name }: { name: string }) {
  type Cfg = { bg: string; light: boolean; icon: React.ReactNode }
  const map: Record<string, Cfg> = {
    Figma:         { bg: '#ffffff', light: true,  icon: <img src="/tools/figma.svg"      alt="Figma"       style={{ width: 15, height: 15, objectFit: 'contain' }} /> },
    Notion:        { bg: '#ffffff', light: true,  icon: <img src="/tools/notion.svg"     alt="Notion"      style={{ width: 15, height: 15, objectFit: 'contain' }} /> },
    Jira:          { bg: '#ffffff', light: true,  icon: <img src="/tools/jira.svg"       alt="Jira"        style={{ width: 15, height: 15, objectFit: 'contain' }} /> },
    Slack:         { bg: '#ffffff', light: true,  icon: <img src="/tools/slack.svg"      alt="Slack"       style={{ width: 15, height: 15, objectFit: 'contain' }} /> },
    'Adobe CC':    { bg: '#ffffff', light: true,  icon: <img src="/tools/adobe.svg"      alt="Adobe CC"    style={{ width: 16, height: 16, objectFit: 'contain' }} /> },
    GitHub:        { bg: '#1C1C1E', light: false, icon: <img src="/tools/github.svg"     alt="GitHub"      style={{ width: 14, height: 14, objectFit: 'contain', filter: 'invert(1)' }} /> },
    'Claude Code': { bg: '#2C1810', light: false, icon: <img src="/tools/claudecode.svg" alt="Claude Code" style={{ width: 15, height: 15, objectFit: 'contain' }} /> },
    Claude:        { bg: '#2C1810', light: false, icon: <img src="/tools/claudecode.svg" alt="Claude"      style={{ width: 15, height: 15, objectFit: 'contain' }} /> },
    Lovable:       { bg: '#0A0A0A', light: false, icon: <img src="/tools/lovable.svg"    alt="Lovable"     style={{ width: 14, height: 14, objectFit: 'contain' }} /> },
    Framer:        { bg: '#0055FF', light: false, icon: <svg viewBox="0 0 24 24" width="12" height="13" fill="none"><path d="M5 3h14v8H12L5 3zm0 8h7l7 10H5v-10z" fill="white"/></svg> },
    Procreate:     { bg: '#1C1C1E', light: false, icon: <svg viewBox="0 0 24 24" width="12" height="12" fill="none"><path d="M7 4h5.5a4 4 0 010 8H7V4z" fill="none" stroke="white" strokeWidth="2" strokeLinejoin="round"/><line x1="7" y1="12" x2="7" y2="20" stroke="white" strokeWidth="2" strokeLinecap="round"/></svg> },
    'Google Forms':{ bg: '#ffffff', light: true,  icon: <span style={{ fontSize: 9, fontWeight: 800, color: '#673AB7' }}>GF</span> },
  }
  const cfg = map[name] ?? { bg: 'rgba(0,0,0,0.05)', light: true, icon: <span style={{ fontSize: 8, fontWeight: 700, color: '#555' }}>{name.slice(0, 2).toUpperCase()}</span> }
  return (
    <div title={name} style={{
      width: 36, height: 36, borderRadius: 10, background: cfg.bg,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      boxShadow: cfg.light
        ? 'inset 0 0 0 1px rgba(0,0,0,0.1), 0 1px 3px rgba(0,0,0,0.06)'
        : '0 1px 4px rgba(0,0,0,0.18)',
      flexShrink: 0, cursor: 'default',
    }}>
      {cfg.icon}
    </div>
  )
}

function ImgPlaceholder({ label = 'Design Preview', aspect = '16/9', src }: { label?: string; aspect?: string; src?: string }) {
  if (src) {
    return (
      <div style={{ width: '100%', aspectRatio: aspect, borderRadius: 12, overflow: 'hidden', border: '1px solid rgba(43,181,194,0.12)' }}>
        <img src={src} alt={label} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
      </div>
    )
  }
  return (
    <div style={{
      width: '100%', aspectRatio: aspect,
      background: 'linear-gradient(135deg, #EDE5D4 0%, #D8CEBC 100%)',
      borderRadius: 12, display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center', gap: 12,
      border: '1px solid rgba(43,181,194,0.12)',
    }}>
      <svg width="40" height="40" viewBox="0 0 36 36" fill="none">
        <rect width="36" height="36" rx="8" fill="rgba(0,36,72,0.1)" />
        <rect x="8" y="10" width="20" height="14" rx="2" stroke="rgba(0,36,72,0.3)" strokeWidth="1.5" fill="none" />
        <circle cx="13" cy="15" r="2" fill="rgba(0,36,72,0.25)" />
        <path d="M8 21l5-4 4 3 4-5 7 7" stroke="rgba(0,36,72,0.3)" strokeWidth="1.5" strokeLinejoin="round" fill="none" />
      </svg>
      <span style={{ fontFamily: 'var(--font-label), sans-serif', fontSize: 12, letterSpacing: '0.1em', textTransform: 'uppercase' as const, color: 'rgba(0,36,72,0.4)' }}>{label}</span>
    </div>
  )
}

function ViewToggle({ view, setView }: { view: 'recruiter' | 'full'; setView: (v: 'recruiter' | 'full') => void }) {
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', padding: 4, background: 'rgba(0,36,72,0.03)', borderRadius: 999, border: '1px solid rgba(43,181,194,0.18)', gap: 2 }}>
      {(['recruiter', 'full'] as const).map(v => (
        <button key={v} onClick={() => setView(v)} style={{
          padding: '8px 14px', borderRadius: 999, border: 'none', cursor: 'pointer',
          fontFamily: 'var(--font-label), sans-serif',
          fontSize: 11, letterSpacing: '0.06em', textTransform: 'uppercase' as const, fontWeight: 600,
          transition: 'all 0.2s ease',
          background: view === v ? '#002448' : 'transparent',
          color: view === v ? '#F8F8F7' : 'rgba(0,36,72,0.45)',
        }}>
          {v === 'recruiter' ? 'Quick read' : 'Full story'}
        </button>
      ))}
    </div>
  )
}

export default function CaseStudy({ project }: { project: Project }) {
  const [view, setView] = useState<'recruiter' | 'full'>('recruiter')
  const [activeSection, setActiveSection] = useState('overview')
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({})
  const navSections = project.navSections ?? DEFAULT_NAV_SECTIONS

  useEffect(() => {
    if (view !== 'full') return
    // Scroll-based tracker — fires immediately, no IntersectionObserver lag
    const handleScroll = () => {
      const ids = navSections.map(s => s.id)
      const offset = 120
      let current = ids[0]
      for (const id of ids) {
        const el = sectionRefs.current[id] ?? document.getElementById(id)
        if (!el) continue
        if (el.getBoundingClientRect().top <= offset) current = id
      }
      setActiveSection(current)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // run once on mount
    return () => window.removeEventListener('scroll', handleScroll)
  }, [view, navSections])

  return (
    <div style={{ background: 'var(--color-bg)', minHeight: '100vh' }}>
      <div className="case-layout" style={{
        maxWidth: 1100, margin: '0 auto',
        padding: 'clamp(100px, 10vh, 130px) clamp(24px, 5vw, 60px) 100px',
        display: 'flex', gap: 60, alignItems: 'flex-start',
      }}>

        {/* ── Sidebar ── */}
        <aside className="case-sidebar" style={{ width: 220, flexShrink: 0, position: 'sticky', top: 90, maxHeight: 'calc(100vh - 110px)', overflowY: 'auto', scrollbarWidth: 'none', msOverflowStyle: 'none' } as React.CSSProperties}>
          <Link href="/#work" style={{
            display: 'flex', alignItems: 'center', gap: 6,
            fontFamily: 'var(--font-label), sans-serif',
            fontSize: 13, letterSpacing: '0.07em', textTransform: 'uppercase' as const,
            color: 'rgba(0,36,72,0.45)', textDecoration: 'none',
            marginBottom: 28, transition: 'color 0.2s',
          }}
            onMouseEnter={e => (e.currentTarget.style.color = '#002448')}
            onMouseLeave={e => (e.currentTarget.style.color = 'rgba(0,36,72,0.45)')}
          >
            ← Back
          </Link>

          <div className="case-sidebar-toggle" style={{ marginBottom: 32 }}>
            <ViewToggle view={view} setView={setView} />
          </div>

          <div className="case-sidebar-nav">{view === 'full' && <SectionNav activeSection={activeSection} setActiveSection={setActiveSection} sectionRefs={sectionRefs} sections={navSections} />}</div>

          {/* ■ At a glance */}
          <div className="case-sidebar-glance">
          <p style={{ fontFamily: 'var(--font-label), sans-serif', fontSize: 12, letterSpacing: '0.12em', textTransform: 'uppercase' as const, color: 'rgba(0,36,72,0.35)', marginBottom: 16 }}>■ At a glance</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 20 }}>
            {[
              { label: 'Company',  value: project.company },
              { label: 'Year',     value: project.year },
              { label: 'Duration', value: project.duration },
              { label: 'Role',     value: project.role },
              { label: 'Status',   value: project.status },
            ].map(({ label, value }) => (
              <div key={label}>
                <p style={{ fontFamily: 'var(--font-label), sans-serif', fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase' as const, color: 'rgba(0,36,72,0.35)', marginBottom: 3 }}>{label}</p>
                <p style={{ fontFamily: 'var(--font-body), Georgia, serif', fontSize: 16, fontWeight: 500, color: '#002448', lineHeight: 1.4 }}>{value}</p>
              </div>
            ))}
          </div>
          </div>
          <div className="case-sidebar-tools" style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {project.tools.map(tool => <ToolBadge key={tool} name={tool} />)}
          </div>
        </aside>

        {/* ── Main ── */}
        <main style={{ flex: 1, minWidth: 0 }}>
          <h1 style={{
            fontFamily: 'var(--font-display), Georgia, serif',
            fontSize: 'clamp(32px, 5vw, 60px)',
            fontWeight: 300, fontStyle: 'italic',
            color: '#002448', lineHeight: 1.05, letterSpacing: '-0.03em',
            marginBottom: 16, textWrap: 'balance' as any,
          }}>{project.title}</h1>
          <p style={{
            fontFamily: 'var(--font-label), sans-serif',
            fontSize: 14, letterSpacing: '0.09em', textTransform: 'uppercase' as const,
            color: 'rgba(0,36,72,0.4)', marginBottom: 24,
          }}>{project.tagline}</p>

          <AnimatePresence mode="wait">
            {view === 'recruiter' ? (
              <motion.div key="recruiter" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}>
                <RecruiterContent project={project} onReadMore={() => setView('full')} />
              </motion.div>
            ) : (
              <motion.div key="full" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}>
                <FullStoryContent project={project} sectionRefs={sectionRefs} />
              </motion.div>
            )}
          </AnimatePresence>

          <div style={{ display: 'flex', alignItems: 'center', gap: 16, paddingTop: 48, marginTop: 24, borderTop: '1px solid rgba(43,181,194,0.15)' }}>
            <Link href="/#work" style={{
              display: 'inline-flex', alignItems: 'center', gap: 6, padding: '13px 28px',
              border: '1px solid rgba(0,36,72,0.2)', color: '#002448',
              fontFamily: 'var(--font-label), sans-serif',
              fontSize: 13, letterSpacing: '0.08em', textTransform: 'uppercase' as const,
              borderRadius: 999, textDecoration: 'none', transition: 'opacity 0.2s',
            }}
              onMouseEnter={e => (e.currentTarget.style.opacity = '0.6')}
              onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
            >
              ← All work
            </Link>
          </div>
        </main>
      </div>
    </div>
  )
}

// ── Section nav with timeline track ──
const DEFAULT_NAV_SECTIONS = [
  { id: 'overview',   label: 'Overview' },
  { id: 'problem',    label: 'Problem' },
  { id: 'process',    label: 'Process' },
  { id: 'solution',   label: 'Solution' },
  { id: 'reflection', label: 'Reflection' },
]

// Fixed-header-aware scroll — accounts for the 90px sticky nav bar
function scrollToSection(el: HTMLElement | null) {
  if (!el) return
  const NAV_OFFSET = 108 // fixed nav top(20) + nav height(~64) + breathing room(24)
  const y = el.getBoundingClientRect().top + window.scrollY - NAV_OFFSET
  window.scrollTo({ top: Math.max(0, y), behavior: 'smooth' })
}

function SectionNav({ activeSection, setActiveSection, sectionRefs, sections }: {
  activeSection: string;
  setActiveSection: (id: string) => void;
  sectionRefs: React.MutableRefObject<Record<string, HTMLElement | null>>;
  sections: { id: string; label: string }[]
}) {
  const activeIdx = sections.findIndex(s => s.id === activeSection)

  return (
    <nav style={{ position: 'relative', marginBottom: 32, paddingLeft: 18 }}>
      {/* Static track */}
      <div style={{ position: 'absolute', left: 5, top: 6, bottom: 6, width: 1.5, background: 'rgba(0,36,72,0.08)', borderRadius: 2 }} />
      {/* Filled progress */}
      <motion.div
        style={{ position: 'absolute', left: 5, top: 6, width: 1.5, background: '#2BB5C2', borderRadius: 2, transformOrigin: 'top' }}
        animate={{ height: activeIdx < 0 ? 0 : `${Math.round(((activeIdx + 0.5) / sections.length) * 100)}%` }}
        transition={{ type: 'spring', stiffness: 300, damping: 36 }}
      />

      {sections.map(({ id, label }, i) => {
        const isActive = id === activeSection
        const isDone   = i < activeIdx
        return (
          <div key={id} style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 0 }}>
            {/* Dot */}
            <motion.div
              animate={{
                scale: isActive ? 1.25 : 1,
                background: isActive ? '#2BB5C2' : isDone ? 'rgba(43,181,194,0.55)' : 'rgba(0,36,72,0.15)',
              }}
              transition={{ duration: 0.18 }}
              style={{ width: 8, height: 8, borderRadius: '50%', flexShrink: 0, position: 'absolute', left: 2 }}
            />
            {/* Label — consistent font, only color/weight changes */}
            <button
              onClick={() => {
                setActiveSection(id) // instant highlight
                const el = sectionRefs.current[id] ?? document.getElementById(id)
                scrollToSection(el)
              }}
              style={{
                background: 'none', border: 'none', cursor: 'pointer',
                textAlign: 'left', padding: '6px 0',
                fontFamily: 'var(--font-label), sans-serif',
                fontSize: 12,
                letterSpacing: '0.08em',
                textTransform: 'uppercase' as const,
                fontWeight: isActive ? 700 : 500,
                color: isActive ? '#2BB5C2' : isDone ? 'rgba(0,36,72,0.6)' : 'rgba(0,36,72,0.35)',
                transition: 'color 0.15s',
                whiteSpace: 'nowrap' as const,
              }}
            >
              {label}
            </button>
          </div>
        )
      })}
    </nav>
  )
}

// ── Bullet list helper (converts prose to → bullets) ──
function BulletBody({ text, fontSize = 17 }: { text: string; fontSize?: number }) {
  const sentences = text.split(/(?<=[.!?])\s+/).filter(s => s.trim().length > 0)
  return (
    <ul style={{ paddingLeft: 0, margin: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>
      {sentences.map((s, i) => (
        <li key={i} style={{ fontFamily: 'var(--font-body), Georgia, serif', fontSize, fontWeight: 500, color: 'rgba(0,36,72,0.75)', lineHeight: 1.7, paddingLeft: 20, position: 'relative' }}>
          <span style={{ position: 'absolute', left: 0, color: 'rgba(43,181,194,0.7)' }}>→</span>
          {s}
        </li>
      ))}
    </ul>
  )
}

// ── Recruiter view ──
function RecruiterContent({ project, onReadMore }: { project: Project; onReadMore: () => void }) {
  return (
    <div>
      {project.images?.overview && (
        <div style={{ marginBottom: 40 }}>
          <img src={project.images.overview} alt={`${project.title}, overview`} style={{ width: '100%', height: 'auto', borderRadius: 12, display: 'block' }} />
        </div>
      )}

      {/* Stat bar */}
      <div className="case-stat-bar" style={{ display: 'grid', gridTemplateColumns: `repeat(${project.stats.length}, 1fr)`, gap: 0, marginBottom: 40, borderRadius: 14, overflow: 'hidden', border: '1px solid rgba(43,181,194,0.15)' }}>
        {project.stats.map(({ value, label }, i) => (
          <div key={i} style={{ padding: '20px 24px', background: i % 2 === 0 ? 'rgba(0,36,72,0.03)' : 'rgba(43,181,194,0.04)', borderRight: i < project.stats.length - 1 ? '1px solid rgba(43,181,194,0.15)' : 'none' }}>
            <p style={{ fontFamily: 'var(--font-display), Georgia, serif', fontSize: 'clamp(13px, 1.4vw, 18px)', fontWeight: 500, color: '#002448', margin: '0 0 4px', lineHeight: 1.2 }}>{value}</p>
            <p style={{ fontFamily: 'var(--font-label), sans-serif', fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: 'rgba(0,36,72,0.4)', margin: 0 }}>{label}</p>
          </div>
        ))}
      </div>

      <div className="case-3col" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 1, background: 'rgba(43,181,194,0.12)', borderRadius: 12, overflow: 'hidden', marginBottom: 40 }}>
        {[
          { label: 'The problem', text: project.problem },
          { label: 'What I did',  text: project.tldr },
          { label: 'The outcome', text: project.outcome },
        ].map(({ label, text }) => (
          <div key={label} style={{ background: '#FFFFFF', padding: '28px 24px' }}>
            <p style={{ fontFamily: 'var(--font-label), sans-serif', fontSize: 12, letterSpacing: '0.1em', textTransform: 'uppercase' as const, color: 'rgba(0,36,72,0.4)', marginBottom: 12 }}>{label}</p>
            <p style={{ fontFamily: 'var(--font-body), Georgia, serif', fontSize: 16, color: '#002448', lineHeight: 1.7 }}>{text}</p>
          </div>
        ))}
      </div>

      {project.metrics.length > 0 && (
        <div style={{ marginBottom: 40 }}>
          <p style={{ fontFamily: 'var(--font-label), sans-serif', fontSize: 12, letterSpacing: '0.1em', textTransform: 'uppercase' as const, color: 'rgba(0,36,72,0.4)', marginBottom: 16 }}>Key outcomes</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {project.metrics.map((metric, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
                <span style={{
                  flexShrink: 0, width: 28, height: 28, borderRadius: '50%',
                  background: 'rgba(43,181,194,0.12)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: 'var(--font-label), sans-serif', fontSize: 12, fontWeight: 700, color: '#2BB5C2',
                }}>{i + 1}</span>
                <p style={{ fontFamily: 'var(--font-body), Georgia, serif', fontSize: 16, color: '#002448', lineHeight: 1.65, margin: 0, paddingTop: 4 }}>{metric}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      <button onClick={onReadMore} style={{
        background: 'none', border: 'none', cursor: 'pointer', padding: 0,
        fontFamily: 'var(--font-label), sans-serif', fontSize: 13, letterSpacing: '0.1em',
        textTransform: 'uppercase' as const, color: 'rgba(0,36,72,0.35)', transition: 'color 0.2s',
      }}
        onMouseEnter={e => (e.currentTarget.style.color = '#002448')}
        onMouseLeave={e => (e.currentTarget.style.color = 'rgba(0,36,72,0.35)')}
      >
        Read the full story →
      </button>
    </div>
  )
}

// ── Full story view ──
function FullStoryContent({ project, sectionRefs }: { project: Project; sectionRefs: React.MutableRefObject<Record<string, HTMLElement | null>> }) {
  if (project.slug === 'flairx') return <FlairXContent project={project} sectionRefs={sectionRefs} />
  if (project.slug === 'fireside') return <FiresideContent project={project} sectionRefs={sectionRefs} />
  if (project.slug === 'aura') return <AuraContent project={project} sectionRefs={sectionRefs} />
  if (project.slug === 'getup') return <GetUpContent project={project} sectionRefs={sectionRefs} />
  return (
    <div>
      <section id="overview" ref={el => { sectionRefs.current['overview'] = el }} style={{ marginBottom: 72 }}>
        <p style={sLabel}>Overview</p>
        <BulletBody text={project.context} />
        {project.images?.overview && (
          <div style={{ marginTop: 28 }}><ImgPlaceholder label="Overview" aspect="16/8" src={project.images.overview} /></div>
        )}
      </section>

      <section id="problem" ref={el => { sectionRefs.current['problem'] = el }} style={{ marginBottom: 72 }}>
        <p style={sLabel}>Problem</p>
        <h2 style={sHeading}>{project.challenge.split('.')[0]}.</h2>
        <BulletBody text={project.challenge} />
      </section>

      <section id="process" ref={el => { sectionRefs.current['process'] = el }} style={{ marginBottom: 72 }}>
        <p style={sLabel}>Design process</p>
        {project.process.map((step, i) => (
          <div key={i} style={{ marginBottom: 40 }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, marginBottom: 10 }}>
              <span style={{ fontFamily: 'var(--font-label), sans-serif', fontSize: 12, letterSpacing: '0.08em', color: '#2BB5C2', flexShrink: 0 }}>0{i + 1}</span>
              <h3 style={{ fontFamily: 'var(--font-display), Georgia, serif', fontSize: 'clamp(20px, 2vw, 24px)', fontWeight: 500, fontStyle: 'italic', color: '#002448', margin: 0 }}>{step.heading}</h3>
            </div>
            <div style={{ paddingLeft: 28 }}>
              <BulletBody text={step.body} />
            </div>
            {i === 0 && project.images?.discovery && (
              <div style={{ paddingLeft: 28, marginTop: 20 }}>
                <ImgPlaceholder label="Before state" aspect="16/7" src={project.images.discovery} />
              </div>
            )}
            {i === 2 && project.images?.exploration && (
              <div style={{ paddingLeft: 28, marginTop: 20 }}>
                <ImgPlaceholder label="Design exploration" aspect="16/7" src={project.images.exploration} />
              </div>
            )}
            {i === 3 && project.images?.flows && (
              <div style={{ paddingLeft: 28, marginTop: 20 }}>
                <ImgPlaceholder label="Upload flow" aspect="16/7" src={project.images.flows} />
              </div>
            )}
          </div>
        ))}
      </section>

      <section id="solution" ref={el => { sectionRefs.current['solution'] = el }} style={{ marginBottom: 72 }}>
        <p style={sLabel}>Solution</p>
        <BulletBody text={project.solution} />
        {project.images?.solution1 && (
          <div style={{ marginTop: 28 }}><ImgPlaceholder label="Final design" aspect="16/9" src={project.images.solution1} /></div>
        )}
        {project.images?.solution2 && (
          <div style={{ marginTop: 16 }}><ImgPlaceholder label="Detail view" aspect="16/7" src={project.images.solution2} /></div>
        )}
      </section>

      <section id="reflection" ref={el => { sectionRefs.current['reflection'] = el }} style={{ marginBottom: 16 }}>
        <p style={sLabel}>Reflection</p>
        <p style={{ ...sBody, fontStyle: 'italic', fontSize: 'clamp(18px, 1.8vw, 22px)', color: 'rgba(0,36,72,0.65)', borderLeft: '2px solid rgba(43,181,194,0.4)', paddingLeft: 24 }}>{project.reflection}</p>
      </section>
    </div>
  )
}

// ── GetUp case study ──
function GetUpContent({ project, sectionRefs }: { project: Project; sectionRefs: React.MutableRefObject<Record<string, HTMLElement | null>> }) {
  const green = '#4DAA60'
  const greenLight = 'rgba(77,170,96,0.10)'
  const greenMid = '#3A8A4A'
  const navy = '#002448'

  const label = (text: string) => (
    <p style={{ fontFamily: 'var(--font-label), sans-serif', fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase' as const, color: green, marginBottom: 16, fontWeight: 700 }}>{text}</p>
  )
  const body = (text: string) => (
    <p style={{ fontFamily: 'var(--font-body), Georgia, serif', fontSize: 17, color: 'rgba(0,36,72,0.8)', lineHeight: 1.75, marginBottom: 0 }}>{text}</p>
  )
  const heading = (text: string) => (
    <h2 className="case-section-heading" style={{ fontFamily: 'var(--font-display), Georgia, serif', fontSize: 'clamp(22px, 2.5vw, 30px)', fontWeight: 400, fontStyle: 'italic', color: navy, lineHeight: 1.15, marginBottom: 20 }}>{text}</h2>
  )
  const img = (lbl: string, aspect = '16/9', src?: string) => (
    <div style={{ marginTop: 28, marginBottom: 4 }}>
      <ImgPlaceholder label={lbl} aspect={aspect} src={src} />
    </div>
  )

  return (
    <div>

      {/* ── Context ── */}
      <section id="context" ref={el => { sectionRefs.current['context'] = el }} style={{ marginBottom: 72 }}>
        {label('Context')}
        {heading('A celebrity-backed energy brand. Three weeks. A sparse brief.')}
        {body('GetUp is a health brand backed by Jason Derulo, outdoor-meets-wellness, not hardcore fitness. They were launching caffeinated Energy Bites and needed a pre-order pop-up campaign fast. The brief was vibes, not guidelines. I was the only designer.')}
        <div style={{ height: 20 }} />
        {body('Pop-ups live and die in the first second of attention. No time for clever, just clear. One product, one value prop, one CTA. Everything else is noise.')}

        {/* Brand signal cards */}
        <div className="getup-3col" style={{ marginTop: 28, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
          {[
            { stat: '3 weeks', desc: 'From brief to Figma handoff' },
            { stat: 'Jason Derulo', desc: 'Celebrity co-founder, high visibility launch' },
            { stat: 'Pre-order', desc: 'Conversion-first objective, not awareness' },
          ].map(item => (
            <div key={item.stat} style={{ padding: '20px 22px', borderRadius: 12, border: `1.5px solid rgba(77,170,96,0.2)`, background: greenLight }}>
              <p style={{ fontFamily: 'var(--font-heading), Georgia, serif', fontSize: 18, fontWeight: 700, color: navy, marginBottom: 6 }}>{item.stat}</p>
              <p style={{ fontFamily: 'var(--font-body), Georgia, serif', fontSize: 14, color: 'rgba(0,36,72,0.65)', lineHeight: 1.55, margin: 0 }}>{item.desc}</p>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 28 }}>
          <img src="/projects/getup/popup.png" alt="GetUp Energy Bites pop-up" style={{ width: '100%', borderRadius: 16 }} />
        </div>
      </section>

      {/* ── My Role ── */}
      <section id="role" ref={el => { sectionRefs.current['role'] = el }} style={{ marginBottom: 72 }}>
        {label('My Role')}
        {heading('Sole designer, copy, visual direction, and Figma handoff.')}
        {body('No design lead, no brand guidelines, no copywriter. I derived the visual direction from GetUp\'s existing social presence, wrote and tested the copy myself, and delivered a complete Figma package ready for dev in three weeks.')}
        <div className="getup-2col" style={{ marginTop: 24, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          {[
            { title: 'Brand Research', desc: 'Reverse-engineered the brand voice from existing social and web content. Built a mood board to align on tone before touching Figma.' },
            { title: 'Copy Direction', desc: 'Wrote and pressure-tested headline options. Used Claude to run multiple drafts fast. Final copy: punchy, not clever, because pop-ups get one second.' },
            { title: 'Visual Design', desc: 'Designed the full pop-up with hero product image, clear value statement, and single CTA. Mobile-first, responsive to desktop.' },
            { title: 'Dev Handoff', desc: 'Full Figma component with desktop and mobile variants, interaction states, and annotated notes on hover behavior and close action.' },
          ].map(item => (
            <div key={item.title} style={{ padding: '20px 22px', borderRadius: 12, border: `1.5px solid rgba(77,170,96,0.18)`, background: 'rgba(77,170,96,0.03)' }}>
              <p style={{ fontFamily: 'var(--font-label), sans-serif', fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase' as const, color: green, marginBottom: 8, fontWeight: 700 }}>{item.title}</p>
              <p style={{ fontFamily: 'var(--font-body), Georgia, serif', fontSize: 15, color: 'rgba(0,36,72,0.75)', lineHeight: 1.65, margin: 0 }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── The Brief ── */}
      <section id="brief" ref={el => { sectionRefs.current['brief'] = el }} style={{ marginBottom: 72 }}>
        {label('The Brief')}
        {heading('What they gave me. What I had to figure out.')}

        {/* Two-col: given vs derived */}
        <div className="getup-2col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginTop: 8 }}>
          <div style={{ borderRadius: 12, overflow: 'hidden', border: `1px solid rgba(77,170,96,0.18)` }}>
            <div style={{ background: green, padding: '12px 18px' }}>
              <p style={{ fontFamily: 'var(--font-label), sans-serif', fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase' as const, color: 'rgba(255,255,255,0.85)', margin: 0, fontWeight: 700 }}>Given</p>
            </div>
            <div style={{ padding: '16px 18px', background: 'white', display: 'flex', flexDirection: 'column' as const, gap: 10 }}>
              {[
                'Product: caffeinated Energy Bites, new SKU',
                'Goal: drive pre-orders before launch',
                'Format: pop-up modal, web',
                'Timeline: 3 weeks to handoff',
                'Brand: GetUp by Jason Derulo',
              ].map((g, i) => (
                <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                  <span style={{ color: green, flexShrink: 0, marginTop: 3, fontSize: 12 }}>✓</span>
                  <p style={{ fontFamily: 'var(--font-body), Georgia, serif', fontSize: 14, color: 'rgba(0,36,72,0.78)', lineHeight: 1.6, margin: 0 }}>{g}</p>
                </div>
              ))}
            </div>
          </div>
          <div style={{ borderRadius: 12, overflow: 'hidden', border: `1px solid rgba(77,170,96,0.18)` }}>
            <div style={{ background: greenMid, padding: '12px 18px' }}>
              <p style={{ fontFamily: 'var(--font-label), sans-serif', fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase' as const, color: 'rgba(255,255,255,0.85)', margin: 0, fontWeight: 700 }}>Derived by me</p>
            </div>
            <div style={{ padding: '16px 18px', background: 'white', display: 'flex', flexDirection: 'column' as const, gap: 10 }}>
              {[
                'Brand voice: outdoorsy-wellness, casual confidence (not gym-bro)',
                'Visual tone: fresh, bright, green-forward but not aggressive',
                'Copy direction: punchy headline, one clear subline, no body copy',
                'CTA language: action-oriented, urgency without desperation',
                'Hero layout: product image dominant, text secondary',
              ].map((g, i) => (
                <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                  <span style={{ color: greenMid, flexShrink: 0, marginTop: 3, fontSize: 12 }}>→</span>
                  <p style={{ fontFamily: 'var(--font-body), Georgia, serif', fontSize: 14, color: 'rgba(0,36,72,0.78)', lineHeight: 1.6, margin: 0 }}>{g}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

      </section>

      {/* ── Design ── */}
      <section id="design" ref={el => { sectionRefs.current['design'] = el }} style={{ marginBottom: 72 }}>
        {label('The Design')}
        {heading('One product. One moment. One shot.')}
        {body('The whole pop-up is built around a single constraint: you get one second. The product image is the hero. The headline does one job, make someone want to know more. The CTA is the only interactive element in the viewport.')}

        {/* Design decisions */}
        <div style={{ marginTop: 24, display: 'flex', flexDirection: 'column' as const, gap: 14 }}>
          {[
            { num: '01', title: 'Product image as hero', desc: 'Full bleed product photography anchors the layout. No background patterns, no competing visuals. The Energy Bites packaging is the brand statement.' },
            { num: '02', title: 'Headline over subline', desc: 'Punchy headline does the lifting. One short subline for context. No paragraph copy, people don\'t read pop-ups, they decide in milliseconds.' },
            { num: '03', title: 'Single CTA, maximum contrast', desc: 'One button. High contrast against the background. Copy tested through multiple drafts, action-forward, low anxiety. "Pre-order now" beat every other variant.' },
            { num: '04', title: 'Mobile-first scaling', desc: 'Designed at 390px first, then scaled to 1280px desktop. Most pop-up traffic on a celebrity launch comes from social, which means mobile.' },
          ].map(item => (
            <div key={item.num} style={{ display: 'flex', gap: 20, padding: '20px 22px', borderRadius: 12, border: '1px solid rgba(0,36,72,0.07)', background: 'white', alignItems: 'flex-start' }}>
              <span style={{ fontFamily: 'var(--font-label), sans-serif', fontSize: 13, fontWeight: 700, color: green, flexShrink: 0, minWidth: 28 }}>{item.num}</span>
              <div>
                <p style={{ fontFamily: 'var(--font-heading), Georgia, serif', fontSize: 16, fontWeight: 700, color: navy, marginBottom: 6 }}>{item.title}</p>
                <p style={{ fontFamily: 'var(--font-body), Georgia, serif', fontSize: 15, color: 'rgba(0,36,72,0.72)', lineHeight: 1.65, margin: 0 }}>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

      </section>

      {/* ── Copy Process ── */}
      <section id="copy" ref={el => { sectionRefs.current['copy'] = el }} style={{ marginBottom: 72 }}>
        {label('Copy Process')}
        {heading('How I wrote the campaign copy without a copywriter.')}

        <div style={{ padding: '28px 32px', borderRadius: 16, background: greenLight, border: `1px solid rgba(77,170,96,0.2)`, marginBottom: 28 }}>
          <p style={{ fontFamily: 'var(--font-label), sans-serif', fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase' as const, color: green, marginBottom: 12, fontWeight: 700 }}>The process</p>
          <p style={{ fontFamily: 'var(--font-display), Georgia, serif', fontSize: 'clamp(16px, 1.6vw, 20px)', fontStyle: 'italic', color: navy, lineHeight: 1.55, margin: 0 }}>Brand immersion first. Copy second. Never the other way around.</p>
        </div>

        {body('Started by building a picture of the brand voice from every piece of existing GetUp content, website, Instagram, product photography. The voice read as: outdoors-meets-wellness, casual confidence, natural energy. Not performance. Not aggression.')}
        <div style={{ height: 16 }} />
        {body('Used Claude to generate 20+ headline options across different tones, then cut aggressively using the brand voice as the filter. The winning headline was short, active, and product-honest, no hype language that would feel off-brand for a health product.')}

        {/* Copy iteration table */}
        <div style={{ marginTop: 28, borderRadius: 12, overflow: 'hidden', border: '1px solid rgba(0,36,72,0.08)' }}>
          <div style={{ background: 'rgba(0,36,72,0.03)', padding: '12px 18px', borderBottom: '1px solid rgba(0,36,72,0.07)', display: 'grid', gridTemplateColumns: '1fr 2fr 80px' }}>
            {['Draft', 'Headline', 'Status'].map(h => (
              <p key={h} style={{ fontFamily: 'var(--font-label), sans-serif', fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase' as const, color: 'rgba(0,36,72,0.4)', margin: 0, fontWeight: 700 }}>{h}</p>
            ))}
          </div>
          {[
            { draft: 'v1', line: 'Feel the energy. Pre-order now.', status: '✕ Generic' },
            { draft: 'v2', line: 'New drop. Caffeinated bites, real ingredients.', status: '✕ Flat' },
            { draft: 'v3', line: 'Energy Bites are here. Grab yours early.', status: '~ Getting there' },
            { draft: 'v4', line: 'Fuel your day. GetUp Energy Bites, pre-order now.', status: '✓ Selected' },
          ].map((row, i) => (
            <div key={i} style={{ padding: '14px 18px', borderBottom: i < 3 ? '1px solid rgba(0,36,72,0.05)' : 'none', display: 'grid', gridTemplateColumns: '1fr 2fr 80px', background: i === 3 ? 'rgba(77,170,96,0.04)' : 'white', alignItems: 'center' }}>
              <p style={{ fontFamily: 'var(--font-label), sans-serif', fontSize: 11, color: 'rgba(0,36,72,0.4)', margin: 0 }}>{row.draft}</p>
              <p style={{ fontFamily: 'var(--font-body), Georgia, serif', fontSize: 14, color: i === 3 ? navy : 'rgba(0,36,72,0.55)', margin: 0, fontStyle: i === 3 ? 'normal' : 'italic', fontWeight: i === 3 ? 600 : 400 }}>{row.line}</p>
              <p style={{ fontFamily: 'var(--font-label), sans-serif', fontSize: 10, color: i === 3 ? green : i === 2 ? '#B8860B' : 'rgba(0,36,72,0.35)', margin: 0 }}>{row.status}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Reflection ── */}
      <section id="reflection" ref={el => { sectionRefs.current['reflection'] = el }} style={{ marginBottom: 16 }}>
        {label('Reflection')}
        <p style={{ fontFamily: 'var(--font-display), Georgia, serif', fontSize: 'clamp(18px, 1.8vw, 24px)', fontWeight: 400, fontStyle: 'italic', color: 'rgba(0,36,72,0.7)', lineHeight: 1.6, borderLeft: `2px solid rgba(77,170,96,0.5)`, paddingLeft: 24, margin: '0 0 24px' }}>
          Three weeks with a sparse brief is a real-world condition, not an edge case.
        </p>
        {body('Most projects don\'t come with complete brand guidelines and a fully staffed team. GetUp was a version of reality I\'ll work in often: high expectations, limited time, incomplete information. The lesson wasn\'t how to work fast, it was how to make defensible decisions fast, without waiting for clarity that isn\'t coming.')}
        <div style={{ height: 16 }} />
        {body('The copy process was the most useful discovery. Having a brand voice clearly articulated before touching the product made every creative decision faster. I knew what "wrong" sounded like, which meant I could get to "right" without looping.')}
      </section>
    </div>
  )
}

// ── Aura case study ──
// ── Aura user flow diagram ──
function AuraUserFlow() {
  const purple = '#A880D4'
  const purpleDark = '#7B5EA8'
  const purpleLight = 'rgba(168,128,212,0.10)'

  const Node = ({ x, y, w = 110, h = 38, text, sub, accent = false }: { x: number; y: number; w?: number; h?: number; text: string; sub?: string; accent?: boolean }) => (
    <g>
      <rect x={x - w / 2} y={y - h / 2} width={w} height={h} rx={8}
        fill={accent ? purple : 'white'}
        stroke={accent ? purple : 'rgba(168,128,212,0.35)'}
        strokeWidth={accent ? 0 : 1.5}
      />
      <text x={x} y={sub ? y - 3 : y + 5} textAnchor="middle"
        fontFamily="var(--font-label), sans-serif" fontSize={10} fontWeight={700}
        letterSpacing="0.05em" fill={accent ? 'white' : purpleDark}
      >{text}</text>
      {sub && <text x={x} y={y + 11} textAnchor="middle"
        fontFamily="var(--font-body), Georgia, serif" fontSize={9} fill={accent ? 'rgba(255,255,255,0.7)' : 'rgba(0,36,72,0.45)'}
      >{sub}</text>}
    </g>
  )

  const Arrow = ({ x1, y1, x2, y2 }: { x1: number; y1: number; x2: number; y2: number }) => {
    const mx = (x1 + x2) / 2
    const my = (y1 + y2) / 2
    const dx = x2 - x1, dy = y2 - y1
    const len = Math.sqrt(dx * dx + dy * dy)
    const ux = dx / len, uy = dy / len
    const tx = x2 - ux * 7, ty = y2 - uy * 7
    return (
      <g>
        <line x1={x1} y1={y1} x2={tx} y2={ty} stroke="rgba(168,128,212,0.4)" strokeWidth={1.5} />
        <polygon points={`${x2},${y2} ${tx - uy * 4},${ty + ux * 4} ${tx + uy * 4},${ty - ux * 4}`}
          fill="rgba(168,128,212,0.5)" />
      </g>
    )
  }

  const Label = ({ x, y, text }: { x: number; y: number; text: string }) => (
    <text x={x} y={y} textAnchor="middle" fontFamily="var(--font-label), sans-serif"
      fontSize={8} letterSpacing="0.1em" fill="rgba(168,128,212,0.6)" fontWeight={700}
    >{text.toUpperCase()}</text>
  )

  return (
    <div style={{ marginTop: 28, background: purpleLight, borderRadius: 16, padding: '28px 20px', border: '1px solid rgba(168,128,212,0.2)' }}>
      <p style={{ fontFamily: 'var(--font-label), sans-serif', fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase' as const, color: purple, marginBottom: 16, fontWeight: 700 }}>User flow. Aura app</p>
      <svg viewBox="0 0 620 380" style={{ width: '100%', height: 'auto', display: 'block' }}>
        {/* Row 1: Entry */}
        <Node x={310} y={36} w={130} h={38} text="Registration / Login" accent />
        <Arrow x1={310} y1={55} x2={310} y2={82} />

        {/* Row 2: Dashboard */}
        <Node x={310} y={100} w={110} h={34} text="Dashboard" />

        {/* Branch arrows from Dashboard */}
        <Arrow x1={245} y1={117} x2={130} y2={150} />
        <Arrow x1={310} y1={117} x2={310} y2={150} />
        <Arrow x1={375} y1={117} x2={490} y2={150} />

        {/* Row 3: 3 paths */}
        <Label x={110} y={142} text="Path A" />
        <Node x={130} y={163} w={120} h={36} text="Create Your Own" sub="custom bouquet" />

        <Label x={310} y={142} text="Path B" />
        <Node x={310} y={163} w={100} h={36} text="Catalogue" sub="browse ready" />

        <Label x={490} y={142} text="Path C" />
        <Node x={490} y={163} w={100} h={36} text="Trending" sub="seasonal picks" />

        {/* Converge arrows → Select Flowers */}
        <Arrow x1={130} y1={181} x2={220} y2={218} />
        <Arrow x1={310} y1={181} x2={310} y2={218} />
        <Arrow x1={490} y1={181} x2={400} y2={218} />

        {/* Row 4: Select Flowers */}
        <Node x={310} y={234} w={120} h={34} text="Select Flowers" />
        <Arrow x1={310} y1={251} x2={310} y2={276} />

        {/* Row 5: Quantity */}
        <Node x={310} y={292} w={100} h={34} text="Quantity" />

        {/* Quantity → Add-ons (side) */}
        <Arrow x1={360} y1={292} x2={440} y2={292} />
        <Node x={510} y={292} w={100} h={34} text="Add-ons" sub="gift wrap, card" />
        <Arrow x1={460} y1={292} x2={390} y2={292} />

        {/* Add-ons to Cart */}
        <Arrow x1={310} y1={309} x2={310} y2={333} />

        {/* Row 6: Cart → Checkout → Confirm */}
        <Node x={160} y={348} w={100} h={34} text="Order Preview" />
        <Node x={310} y={348} w={100} h={34} text="Checkout" />
        <Node x={460} y={348} w={120} h={34} text="Order Confirmed" accent />

        {/* Row 6 arrows */}
        <Arrow x1={310} y1={326} x2={220} y2={336} />
        <Arrow x1={210} y1={348} x2={256} y2={348} />
        <Arrow x1={360} y1={348} x2={396} y2={348} />
      </svg>
    </div>
  )
}

function AuraContent({ project, sectionRefs }: { project: Project; sectionRefs: React.MutableRefObject<Record<string, HTMLElement | null>> }) {
  const purple = '#A880D4'
  const purpleLight = '#C5A8E8'
  const purpleMid = '#7B5EA8'

  const label = (text: string) => (
    <p style={{ fontFamily: 'var(--font-label), sans-serif', fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase' as const, color: purple, marginBottom: 16, fontWeight: 700 }}>{text}</p>
  )
  const body = (text: string) => (
    <p style={{ fontFamily: 'var(--font-body), Georgia, serif', fontSize: 17, color: 'rgba(0,36,72,0.8)', lineHeight: 1.75, marginBottom: 0 }}>{text}</p>
  )
  const heading = (text: string) => (
    <h2 className="case-section-heading" style={{ fontFamily: 'var(--font-display), Georgia, serif', fontSize: 'clamp(22px, 2.5vw, 30px)', fontWeight: 400, fontStyle: 'italic', color: '#002448', lineHeight: 1.15, marginBottom: 20 }}>{text}</h2>
  )
  const img = (lbl: string, aspect = '16/9', src?: string) => (
    <div style={{ marginTop: 28, marginBottom: 4 }}>
      <ImgPlaceholder label={lbl} aspect={aspect} src={src} />
    </div>
  )

  return (
    <div>

      {/* ── Context ── */}
      <section id="context" ref={el => { sectionRefs.current['context'] = el }} style={{ marginBottom: 72 }}>
        {label('Context')}
        {heading('A florist with no digital presence, in the middle of a lockdown.')}
        {body('Small florists in Hyderabad were entirely foot-traffic dependent. No app, no website, no way to take orders online. When COVID-19 hit and in-person shopping stopped, loyal customers had nowhere to go. Aura was designed to fix that, a mobile app that brings the in-store florist experience online without losing what makes it personal.')}
        <div style={{ height: 20 }} />
        {body('The project was completed as part of the Google UX Design Professional Certificate, but the problem was real: a local florist, a real customer base, and no digital solution. I took it from zero.')}
      </section>

      {/* ── My Role ── */}
      <section id="role" ref={el => { sectionRefs.current['role'] = el }} style={{ marginBottom: 72 }}>
        {label('My Role')}
        {heading('Sole UX designer, research through final prototype.')}
        {body('As the only designer on this project, I owned every phase. That meant setting my own constraints, making judgment calls without a team to pressure-test them, and learning what it actually takes to go from a blank canvas to a working prototype people can use.')}
        <div style={{ marginTop: 24, display: 'flex', flexDirection: 'column' as const, gap: 10 }}>
          {[
            'Conducted screener survey to recruit target users (ages 18–40 with flower-buying experience)',
            'Led user research and journey mapping to identify customer needs and pain points',
            'Created sketches, wireframes, and interactive prototypes to explore design solutions',
            'Ran usability tests and iterated on the design based on observed behavior',
            'Refined visual design into a polished high-fidelity prototype for final presentation',
          ].map((item, i) => (
            <div key={i} style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
              <span style={{ flexShrink: 0, width: 24, height: 24, borderRadius: '50%', background: `rgba(168,128,212,0.12)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-label), sans-serif', fontSize: 11, fontWeight: 700, color: purple, marginTop: 2 }}>{i + 1}</span>
              <p style={{ fontFamily: 'var(--font-body), Georgia, serif', fontSize: 16, color: 'rgba(0,36,72,0.78)', lineHeight: 1.65, margin: 0 }}>{item}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Research ── */}
      <section id="research" ref={el => { sectionRefs.current['research'] = el }} style={{ marginBottom: 72 }}>
        {label('Research')}
        {heading('What people actually do when they buy flowers.')}
        {body('The research had two phases: a screener survey to find the right participants, then user interviews to understand the real behavior underneath. What I found changed the whole direction of the app.')}

        {/* Research goals */}
        <div style={{ marginTop: 24, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10, marginBottom: 28 }}>
          {[
            { goal: 'Usage patterns', text: 'How often do people use apps for floral services, and why?' },
            { goal: 'Expectations', text: 'What do users expect and what leaves them frustrated?' },
            { goal: 'Who\'s buying', text: 'Demographics, occasions, motivations, who actually buys flowers?' },
          ].map(item => (
            <div key={item.goal} style={{ padding: '18px 20px', borderRadius: 12, border: `1.5px solid rgba(168,128,212,0.18)`, background: 'rgba(168,128,212,0.03)' }}>
              <p style={{ fontFamily: 'var(--font-label), sans-serif', fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase' as const, color: purple, marginBottom: 8, fontWeight: 700 }}>{item.goal}</p>
              <p style={{ fontFamily: 'var(--font-body), Georgia, serif', fontSize: 14, color: 'rgba(0,36,72,0.7)', lineHeight: 1.6, margin: 0 }}>{item.text}</p>
            </div>
          ))}
        </div>

        {/* Key user insight */}
        <div style={{ padding: '24px 28px', borderRadius: 14, background: `rgba(168,128,212,0.07)`, borderLeft: `3px solid ${purple}`, marginBottom: 28 }}>
          <p style={{ fontFamily: 'var(--font-label), sans-serif', fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase' as const, color: purple, marginBottom: 10, fontWeight: 700 }}>Key insight from interviews</p>
          <p style={{ fontFamily: 'var(--font-display), Georgia, serif', fontSize: 'clamp(17px, 1.6vw, 20px)', fontStyle: 'italic', color: '#002448', lineHeight: 1.55, margin: 0 }}>Most people buy flowers for other people, not themselves, on a deadline, under pressure to get it right.</p>
        </div>

        {/* User goals + pain points */}
        <div style={{ marginTop: 28, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <div style={{ borderRadius: 12, overflow: 'hidden', border: `1px solid rgba(168,128,212,0.15)` }}>
            <div style={{ background: purple, padding: '12px 18px' }}>
              <p style={{ fontFamily: 'var(--font-label), sans-serif', fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase' as const, color: 'rgba(255,255,255,0.8)', margin: 0, fontWeight: 700 }}>What users want</p>
            </div>
            <div style={{ padding: '16px 18px', background: 'white', display: 'flex', flexDirection: 'column' as const, gap: 10 }}>
              {[
                'Fast mobile shopping for flowers',
                'Quick suggestions from a florist',
                'Gifting for occasions. Valentine\'s, Mother\'s Day, festivals',
                'Flowers that match their aesthetic and space',
              ].map((g, i) => (
                <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                  <span style={{ color: purple, flexShrink: 0, marginTop: 3, fontSize: 12 }}>✓</span>
                  <p style={{ fontFamily: 'var(--font-body), Georgia, serif', fontSize: 14, color: 'rgba(0,36,72,0.78)', lineHeight: 1.6, margin: 0 }}>{g}</p>
                </div>
              ))}
            </div>
          </div>
          <div style={{ borderRadius: 12, overflow: 'hidden', border: `1px solid rgba(168,128,212,0.15)` }}>
            <div style={{ background: '#6B4D8A', padding: '12px 18px' }}>
              <p style={{ fontFamily: 'var(--font-label), sans-serif', fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase' as const, color: 'rgba(255,255,255,0.8)', margin: 0, fontWeight: 700 }}>What frustrates them</p>
            </div>
            <div style={{ padding: '16px 18px', background: 'white', display: 'flex', flexDirection: 'column' as const, gap: 10 }}>
              {[
                'Standing in line, especially near major occasions',
                'Flowers that aren\'t fresh or well arranged',
                'Price not matching quality',
                'No way to customize bouquets',
                'Fear that the real product won\'t match what\'s shown',
              ].map((p, i) => (
                <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                  <span style={{ color: '#6B4D8A', flexShrink: 0, marginTop: 3, fontSize: 12 }}>✕</span>
                  <p style={{ fontFamily: 'var(--font-body), Georgia, serif', fontSize: 14, color: 'rgba(0,36,72,0.78)', lineHeight: 1.6, margin: 0 }}>{p}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Competitive analysis */}
        <div style={{ marginTop: 28 }}>
          <p style={{ fontFamily: 'var(--font-label), sans-serif', fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase' as const, color: 'rgba(0,36,72,0.4)', marginBottom: 14, fontWeight: 700 }}>Competitive landscape</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
            {[
              { name: 'FNP (Ferns N Petals)', pros: ['Domestic + international delivery', 'User accounts', 'Add-ons like sweets'], cons: ['Ordering process too long', 'No customisation options'] },
              { name: 'Local florists', pros: ['Personal service', 'Fresh stock'], cons: ['Physical store only', 'No app or website', 'Old stock during high demand'] },
              { name: 'Grocery stores', pros: ['Easy availability', 'Multiple offer boards'], cons: ['Ready-made only', 'No customisation', 'No dedicated app'] },
            ].map(comp => (
              <div key={comp.name} style={{ borderRadius: 12, border: '1px solid rgba(0,36,72,0.08)', overflow: 'hidden' }}>
                <div style={{ background: 'rgba(0,36,72,0.03)', padding: '12px 16px', borderBottom: '1px solid rgba(0,36,72,0.06)' }}>
                  <p style={{ fontFamily: 'var(--font-label), sans-serif', fontSize: 11, fontWeight: 700, color: '#002448', margin: 0 }}>{comp.name}</p>
                </div>
                <div style={{ padding: '12px 16px', background: 'white' }}>
                  <p style={{ fontFamily: 'var(--font-label), sans-serif', fontSize: 10, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: purple, marginBottom: 6, fontWeight: 700 }}>Has</p>
                  {comp.pros.map(p => <p key={p} style={{ fontFamily: 'var(--font-body), Georgia, serif', fontSize: 13, color: 'rgba(0,36,72,0.7)', lineHeight: 1.5, margin: '0 0 3px' }}>+ {p}</p>)}
                  <p style={{ fontFamily: 'var(--font-label), sans-serif', fontSize: 10, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: '#6B4D8A', marginBottom: 6, marginTop: 10, fontWeight: 700 }}>Missing</p>
                  {comp.cons.map(c => <p key={c} style={{ fontFamily: 'var(--font-body), Georgia, serif', fontSize: 13, color: 'rgba(0,36,72,0.7)', lineHeight: 1.5, margin: '0 0 3px' }}>− {c}</p>)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HMW ── */}
      <section id="hmw" ref={el => { sectionRefs.current['hmw'] = el }} style={{ marginBottom: 72 }}>
        {label('Design Direction')}
        {heading('One question that reframed everything.')}
        <div style={{ padding: '32px 36px', borderRadius: 16, background: `linear-gradient(135deg, rgba(168,128,212,0.1) 0%, rgba(197,168,232,0.06) 100%)`, border: `1px solid rgba(168,128,212,0.2)`, marginBottom: 28 }}>
          <p style={{ fontFamily: 'var(--font-label), sans-serif', fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase' as const, color: purple, marginBottom: 14, fontWeight: 700 }}>How might we</p>
          <p style={{ fontFamily: 'var(--font-display), Georgia, serif', fontSize: 'clamp(18px, 2vw, 24px)', fontStyle: 'italic', color: '#002448', lineHeight: 1.5, margin: 0 }}>Help local florists offer a personalized, seamless online bouquet shopping experience that lets customers view real inventory, customize arrangements, and schedule deliveries with ease?</p>
        </div>
        {body('The HMW reframed the project from "build an ordering app" to "replicate the personal florist experience online." That distinction changed what we designed: not just a product catalog, but a guided customization flow with real inventory signals and a gifting-native checkout.')}
        <div style={{ marginTop: 24, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
          {[
            { principle: 'Real inventory first', text: 'Show only what\'s actually available. No disappointment at checkout.' },
            { principle: 'Customization is the product', text: 'The bouquet builder is the differentiator, not just a feature buried in the flow.' },
            { principle: 'Built for gifting', text: 'Delivery scheduling, occasion messaging, and gift wrapping live front and center.' },
          ].map(item => (
            <div key={item.principle} style={{ padding: '18px 20px', borderRadius: 12, border: `1.5px solid rgba(168,128,212,0.18)`, background: 'white' }}>
              <p style={{ fontFamily: 'var(--font-label), sans-serif', fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase' as const, color: purple, marginBottom: 8, fontWeight: 700 }}>{item.principle}</p>
              <p style={{ fontFamily: 'var(--font-body), Georgia, serif', fontSize: 14, color: 'rgba(0,36,72,0.72)', lineHeight: 1.6, margin: 0 }}>{item.text}</p>
            </div>
          ))}
        </div>
        <AuraUserFlow />
        {/* Paper wireframes */}
        <div style={{ marginTop: 32 }}>
          <p style={{ fontFamily: 'var(--font-label), sans-serif', fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase' as const, color: 'rgba(0,36,72,0.4)', marginBottom: 12 }}>Paper wireframes</p>
          <img src="/projects/aura/paper-wireframes.png" alt="Paper wireframes" style={{ width: '100%', height: 'auto', borderRadius: 12, display: 'block', border: '1px solid rgba(0,36,72,0.08)' }} />
        </div>
      </section>

      {/* ── Final Design ── */}
      <section id="design" ref={el => { sectionRefs.current['design'] = el }} style={{ marginBottom: 72 }}>
        {label('Final Design')}
        {heading('Four screens that do the work.')}
        {body('The final prototype covers the core loop: browse real inventory → customize your bouquet → schedule delivery → confirm. Each screen was tested at least twice before reaching the final form.')}

        {/* Home screen */}
        <div style={{ marginTop: 28 }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 12 }}>
            <span style={{ fontFamily: 'var(--font-label), sans-serif', fontSize: 11, letterSpacing: '0.1em', color: purple, fontWeight: 700 }}>01</span>
            <p style={{ fontFamily: 'var(--font-heading), Georgia, serif', fontSize: 18, fontWeight: 700, color: '#002448', margin: 0 }}>Home, "Our Favorite Pick"</p>
          </div>
          <p style={{ fontFamily: 'var(--font-body), Georgia, serif', fontSize: 16, color: 'rgba(0,36,72,0.75)', lineHeight: 1.7, marginBottom: 0 }}>The home screen balances browsing and discovery. Real-time inventory status is baked in, grayed out means unavailable, soft tags signal low stock. An "upcoming collections" section keeps returning customers engaged with what's fresh.</p>
          {/* Dashboard — real image, original proportions */}
          <div style={{ marginTop: 20, display: 'flex', justifyContent: 'center' }}>
            <img src="/projects/aura/aura-dashboard.png" alt="Aura home screen" style={{ maxWidth: 320, width: '100%', height: 'auto', borderRadius: 32, display: 'block', boxShadow: '0 12px 48px rgba(0,36,72,0.12)' }} />
          </div>
        </div>

        {/* Customizer */}
        <div style={{ marginTop: 48 }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 12 }}>
            <span style={{ fontFamily: 'var(--font-label), sans-serif', fontSize: 11, letterSpacing: '0.1em', color: purple, fontWeight: 700 }}>02</span>
            <p style={{ fontFamily: 'var(--font-heading), Georgia, serif', fontSize: 18, fontWeight: 700, color: '#002448', margin: 0 }}>Create Your Own, bouquet builder</p>
          </div>
          <p style={{ fontFamily: 'var(--font-body), Georgia, serif', fontSize: 16, color: 'rgba(0,36,72,0.75)', lineHeight: 1.7, marginBottom: 20 }}>A live preview updates as users add stems, so they can see the bouquet coming together before they commit. Selection is limited to current inventory. The biggest usability lesson: the preview was initially too small. Round two of testing, we made it take up 60% of the screen. Completion rates jumped.</p>
          {/* Full-width customizer flow */}
          <img src="/projects/aura/Bouquet customizer flow.png" alt="Bouquet customizer flow" style={{ width: '100%', height: 'auto', borderRadius: 16, display: 'block', border: '1px solid rgba(0,36,72,0.08)' }} />
        </div>

        {/* Checkout */}
        <div style={{ marginTop: 48 }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 12 }}>
            <span style={{ fontFamily: 'var(--font-label), sans-serif', fontSize: 11, letterSpacing: '0.1em', color: purple, fontWeight: 700 }}>03</span>
            <p style={{ fontFamily: 'var(--font-heading), Georgia, serif', fontSize: 18, fontWeight: 700, color: '#002448', margin: 0 }}>Checkout, delivery scheduling up front</p>
          </div>
          <p style={{ fontFamily: 'var(--font-body), Georgia, serif', fontSize: 16, color: 'rgba(0,36,72,0.75)', lineHeight: 1.7, marginBottom: 20 }}>Round two of testing revealed a critical flaw, delivery date selection came too late in the flow. Users would build their whole bouquet, then discover their date wasn't available. We moved scheduling to step one of checkout so users know their timeline is possible before they invest in choices.</p>
          <img src="/projects/aura/Checkout flow.png" alt="Checkout flow" style={{ width: '100%', height: 'auto', borderRadius: 16, display: 'block', border: '1px solid rgba(0,36,72,0.08)' }} />
        </div>

        {/* Order confirmation */}
        <div style={{ marginTop: 48 }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 12 }}>
            <span style={{ fontFamily: 'var(--font-label), sans-serif', fontSize: 11, letterSpacing: '0.1em', color: purple, fontWeight: 700 }}>04</span>
            <p style={{ fontFamily: 'var(--font-heading), Georgia, serif', fontSize: 18, fontWeight: 700, color: '#002448', margin: 0 }}>Confirmation, "Yay! Your packed Petals will reach you soon!!"</p>
          </div>
          <p style={{ fontFamily: 'var(--font-body), Georgia, serif', fontSize: 16, color: 'rgba(0,36,72,0.75)', lineHeight: 1.7, marginBottom: 20 }}>The confirmation screen had to feel good, not just functional. Order number, purchase date, and a promise of an email receipt. The copy is warm because the whole product is about giving someone a gift.</p>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <img src="/projects/aura/Order confirmation.png" alt="Order confirmation" style={{ maxWidth: 320, width: '100%', height: 'auto', borderRadius: 32, display: 'block', boxShadow: '0 12px 48px rgba(0,36,72,0.12)' }} />
          </div>
        </div>
      </section>

      {/* ── Reflection ── */}
      <section id="reflection" ref={el => { sectionRefs.current['reflection'] = el }} style={{ marginBottom: 16 }}>
        {label('Reflection')}
        <p style={{ fontFamily: 'var(--font-display), Georgia, serif', fontSize: 'clamp(18px, 1.8vw, 24px)', fontWeight: 400, fontStyle: 'italic', color: 'rgba(0,36,72,0.7)', lineHeight: 1.6, borderLeft: `2px solid rgba(168,128,212,0.5)`, paddingLeft: 24, margin: '0 0 24px' }}>
          The thing you think is the feature is sometimes not the hardest design problem.
        </p>
        {body('I came into this project thinking I\'d design a bouquet customizer. I ended up redesigning the information hierarchy three times. The hard problem wasn\'t the picker, it was inventory communication. How do you tell someone something is out of stock without killing the mood? How do you signal low stock without being aggressive?')}
        <div style={{ height: 16 }} />
        {body('Three rounds of usability testing taught me to stop defending my designs and start watching what actually happened. Round one: preview too small. Round two: checkout sequence wrong. Round three: it worked. That cadence, design, watch, fix, repeat, is the only process that actually produces something usable.')}
      </section>
    </div>
  )
}

// ── Fireside case study ──
function FiresideContent({ project, sectionRefs }: { project: Project; sectionRefs: React.MutableRefObject<Record<string, HTMLElement | null>> }) {
  const teal = '#66a9a9'
  const orange = '#f19559'
  const label = (text: string) => (
    <p style={{
      fontFamily: 'var(--font-label), sans-serif', fontSize: 11, letterSpacing: '0.14em',
      textTransform: 'uppercase' as const, color: teal, marginBottom: 16, fontWeight: 700,
    }}>{text}</p>
  )
  const body = (text: string) => (
    <p style={{ fontFamily: 'var(--font-body), Georgia, serif', fontSize: 17, color: 'rgba(0,36,72,0.8)', lineHeight: 1.75, marginBottom: 0 }}>{text}</p>
  )
  const heading = (text: string) => (
    <h2 className="case-section-heading" style={{ fontFamily: 'var(--font-display), Georgia, serif', fontSize: 'clamp(22px, 2.5vw, 30px)', fontWeight: 400, fontStyle: 'italic', color: '#002448', lineHeight: 1.15, marginBottom: 20 }}>{text}</h2>
  )

  const img = (label: string, aspect = '16/9', src?: string) => (
    <div style={{ marginTop: 28, marginBottom: 4 }}>
      <ImgPlaceholder label={label} aspect={aspect} src={src} />
    </div>
  )

  return (
    <div>
      {/* ── Context ── */}
      <section id="context" ref={el => { sectionRefs.current['context'] = el }} style={{ marginBottom: 72 }}>
        {label('Context')}
        {heading('A wildfire doesn\'t wait for you to understand it.')}
        {body('Wildfires are becoming more frequent, more destructive, and harder to predict. But most public education still looks like a pamphlet. The Fireside Interactive project set out to change that, by building a physical exhibit that let visitors actually experience how a wildfire spreads, not just read about it.')}
        <div style={{ height: 20 }} />
        {body('The project was developed as part of CU Boulder\'s community wildfire awareness initiative. The audience was everyone: families, school groups, firefighters, and retirees. The exhibit needed to work in a noisy science museum, capture attention in under 10 seconds, and teach something real in under 5 minutes.')}
        {/* Hero / exhibit photo */}
        <div style={{ marginTop: 28 }}>
          <img src="/projects/fireside/exhibit-in-use.png" alt="Fireside Interactive, exhibit in use" style={{ width: '100%', height: 'auto', borderRadius: 14, display: 'block', border: '1px solid rgba(0,36,72,0.07)' }} />
        </div>
      </section>

      {/* ── My Role ── */}
      <section id="role" ref={el => { sectionRefs.current['role'] = el }} style={{ marginBottom: 72 }}>
        {label('My Role')}
        {heading('UX designer for the full exhibit, interface, interaction, and spatial flow.')}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12, marginTop: 8 }}>
          {[
            { title: 'Interface Design', desc: 'Designed the projection UI displayed on the 3D topographic table, visual language that reads on a lumpy, curved surface.' },
            { title: 'Interaction Design', desc: 'Mapped the full three-mode journey: Information → Simulation → Intervention. Defined entry points, transitions, and feedback loops.' },
            { title: 'User Research', desc: 'Tested with families, high school students, and educators. Three rounds of iteration based on observed behavior, not surveys.' },
            { title: 'Spatial Design', desc: 'Worked with the hardware team on control placement, table ergonomics, and the physical layout that makes cause-and-effect spatially obvious.' },
          ].map(item => (
            <div key={item.title} style={{ padding: '20px 22px', borderRadius: 12, border: `1.5px solid rgba(102,169,169,0.2)`, background: 'rgba(102,169,169,0.04)' }}>
              <p style={{ fontFamily: 'var(--font-label), sans-serif', fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase' as const, color: teal, marginBottom: 8, fontWeight: 700 }}>{item.title}</p>
              <p style={{ fontFamily: 'var(--font-body), Georgia, serif', fontSize: 15, color: 'rgba(0,36,72,0.75)', lineHeight: 1.65, margin: 0 }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── The Solution ── */}
      <section id="solution" ref={el => { sectionRefs.current['solution'] = el }} style={{ marginBottom: 72 }}>
        {label('The Solution')}
        {heading('Three modes. One table. Zero instructions.')}
        {body('The exhibit runs three distinct interaction modes: each designed to work without onboarding. Visitors can walk up, start touching things, and immediately understand what\'s happening. The projection layer and the physical table always tell the same story at the same moment.')}
        <div style={{ marginTop: 28, display: 'flex', flexDirection: 'column' as const, gap: 28 }}>
          {[
            {
              mode: 'Information Mode',
              color: '#f19559',
              imgLabel: 'Information Mode, ambient fire risk overlay',
              desc: 'The exhibit starts in ambient mode, fire risk data overlaid on the terrain, wind patterns animated, vegetation density visible. Visitors absorb context passively before they interact.',
              detail: 'Visual hierarchy is built for 10-second attention spans. Color encodes danger level. Motion communicates wind. No text required to get the basic picture.',
            },
            {
              mode: 'Simulation Mode',
              color: '#e07040',
              imgLabel: 'Simulation Mode, live fire spread on terrain',
              desc: 'Visitors set environmental conditions, wind speed, humidity, vegetation, and watch a simulated fire spread across the physical terrain in real time. The projection follows the topology of the table.',
              detail: 'This is the moment of "oh, that\'s why it moves like that." Fast feedback, visible causality. Every input has an immediate, legible consequence on screen.',
            },
            {
              mode: 'Intervention Mode',
              color: '#c04a20',
              imgLabel: 'Intervention Mode, suppression deployment UI',
              desc: 'A fire is already burning. Visitors deploy suppression resources, firebreaks, water drops, evacuation routes, and try to contain it before it reaches a settlement.',
              detail: 'High urgency, constrained resources, real tradeoffs. The mode communicates genuine stakes without being overwhelming. Designed to work for 8-year-olds and retired firefighters simultaneously.',
            },
          ].map((card, i) => (
            <div key={card.mode}>
              <div style={{
                borderRadius: 14, overflow: 'hidden',
                border: `1px solid rgba(${i === 0 ? '241,149,89' : i === 1 ? '224,112,64' : '192,74,32'},0.25)`,
              }}>
                <div style={{ background: card.color, padding: '14px 22px', display: 'flex', alignItems: 'center', gap: 14 }}>
                  <span style={{ fontFamily: 'var(--font-label), sans-serif', fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase' as const, color: 'rgba(255,255,255,0.7)', fontWeight: 700 }}>Mode 0{i + 1}</span>
                  <span style={{ fontFamily: 'var(--font-heading), Georgia, serif', fontSize: 16, fontWeight: 700, color: 'white', letterSpacing: '-0.01em' }}>{card.mode}</span>
                </div>
                <div style={{ padding: '20px 22px', background: 'white' }}>
                  <p style={{ fontFamily: 'var(--font-body), Georgia, serif', fontSize: 16, color: '#002448', lineHeight: 1.7, marginBottom: 10 }}>{card.desc}</p>
                  <p style={{ fontFamily: 'var(--font-body), Georgia, serif', fontSize: 14, color: 'rgba(0,36,72,0.55)', lineHeight: 1.65, margin: 0, fontStyle: 'italic' }}>{card.detail}</p>
                </div>
              </div>
              {/* Mode screenshot */}
              <div style={{ marginTop: 12 }}>
                <img
                  src={i === 0 ? '/projects/fireside/information-mode.png' : i === 1 ? '/projects/fireside/simulation-mode.png' : '/projects/fireside/intervention-mode.png'}
                  alt={card.mode}
                  style={{ width: '100%', height: 'auto', borderRadius: 12, display: 'block', border: '1px solid rgba(0,36,72,0.07)' }}
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── User Experience ── */}
      <section id="experience" ref={el => { sectionRefs.current['experience'] = el }} style={{ marginBottom: 72 }}>
        {label('User Experience')}
        {heading('Designed for everyone who walks through the door.')}
        {body('The hardest constraint: the exhibit had to be immediately usable without instructions, engaging for a curious eight-year-old, and credible enough for a fire behavior researcher. That\'s a very wide spread.')}
        {/* UX flow diagram */}
        <div style={{ marginTop: 28, marginBottom: 28 }}>
          <img src="/projects/fireside/user-flow.png" alt="User experience flow, end-to-end journey" style={{ width: '100%', height: 'auto', borderRadius: 14, display: 'block', border: '1px solid rgba(0,36,72,0.07)' }} />
        </div>
        <div style={{ marginTop: 28, display: 'flex', flexDirection: 'column' as const, gap: 20 }}>
          {[
            { step: '01', title: 'Arrival', text: 'Ambient fire risk visualization draws visitors in from across the room. No action required, just watch. The terrain and the color language do the work.' },
            { step: '02', title: 'First touch', text: 'Physical controls are at the table edge, spatially adjacent to where their effect appears. Rotating a wind dial shows immediate change in fire direction. No instruction needed, the spatial relationship teaches itself.' },
            { step: '03', title: 'Escalation', text: 'Visitors naturally want to "try more." Simulation mode invites that. Set extreme conditions, watch fire spread fast. The system rewards curiosity without punishing mistakes.' },
            { step: '04', title: 'The challenge', text: 'Intervention mode introduces stakes. A pre-set fire scenario. Limited resources. Real time pressure. Families work together. Educators use it as a teaching moment. Either way it lands.' },
          ].map(({ step, title, text }) => (
            <div key={step} style={{ display: 'flex', gap: 20, alignItems: 'flex-start' }}>
              <span style={{ fontFamily: 'var(--font-label), sans-serif', fontSize: 13, letterSpacing: '0.08em', color: teal, flexShrink: 0, paddingTop: 2, fontWeight: 700 }}>{step}</span>
              <div>
                <p style={{ fontFamily: 'var(--font-heading), Georgia, serif', fontSize: 16, fontWeight: 700, color: '#002448', marginBottom: 6 }}>{title}</p>
                <p style={{ fontFamily: 'var(--font-body), Georgia, serif', fontSize: 16, color: 'rgba(0,36,72,0.75)', lineHeight: 1.7, margin: 0 }}>{text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── iPad Prototype ── */}
      <section id="prototype" ref={el => { sectionRefs.current['prototype'] = el }} style={{ marginBottom: 72 }}>
        {label('iPad Prototype')}
        {heading('The companion interface, for facilitators and deeper learners.')}
        {body('Alongside the physical table, a tablet interface gives facilitators control over exhibit state, and gives curious visitors a way to go deeper, fire science data, case studies from real events, step-by-step mode explanations.')}
        <div style={{ height: 20 }} />
        {body('The iPad screens went through three design phases: first a dashboard-heavy approach that overwhelmed test users, then a stripped-back information-first layout, and finally the current version, which surfaces only what\'s needed for the current mode.')}
        {/* Introduction screens — full-width */}
        <div style={{ marginTop: 28 }}>
          <img src="/projects/fireside/intro-screens.png" alt="iPad. Introduction screens" style={{ width: '100%', height: 'auto', borderRadius: 14, display: 'block', border: '1px solid rgba(0,36,72,0.07)' }} />
        </div>
        {/* Three intro screen variations side-by-side */}
        <div style={{ marginTop: 12, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
          {[
            '/projects/fireside/intro-screens-2.png',
            '/projects/fireside/intro-screens-3.png',
            '/projects/fireside/intro-screens-4.png',
          ].map((src, i) => (
            <img key={i} src={src} alt={`Introduction screen ${i + 2}`} style={{ width: '100%', height: 'auto', borderRadius: 10, display: 'block', border: '1px solid rgba(0,36,72,0.07)' }} />
          ))}
        </div>
        {/* Marshall Fire / information mode deep-dive */}
        <div style={{ marginTop: 12 }}>
          <img src="/projects/fireside/information-mode.png" alt="iPad, information mode deep-dive" style={{ width: '100%', height: 'auto', borderRadius: 14, display: 'block', border: '1px solid rgba(0,36,72,0.07)' }} />
        </div>
        <div style={{ marginTop: 20, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
          {[
            { title: 'Introduction', desc: 'Welcome screen with exhibit overview and mode selection, the only screen with text instructions.' },
            { title: 'Mode Control', desc: 'Facilitator view: switch modes, reset simulation, set scenario difficulty. Designed for glanceable use.' },
            { title: 'Fire Data', desc: 'Deep-dive panel: real fire spread data, historical case studies, and the science behind the simulation.' },
          ].map(item => (
            <div key={item.title} style={{ borderRadius: 12, border: '1px solid rgba(102,169,169,0.15)', overflow: 'hidden' }}>
              <div style={{ background: 'rgba(102,169,169,0.08)', padding: '14px 16px', borderBottom: '1px solid rgba(102,169,169,0.12)' }}>
                <p style={{ fontFamily: 'var(--font-label), sans-serif', fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase' as const, color: teal, margin: 0, fontWeight: 700 }}>{item.title}</p>
              </div>
              <div style={{ padding: '14px 16px', background: 'white' }}>
                <p style={{ fontFamily: 'var(--font-body), Georgia, serif', fontSize: 14, color: 'rgba(0,36,72,0.7)', lineHeight: 1.65, margin: 0 }}>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Spatial Design ── */}
      <section id="spatial" ref={el => { sectionRefs.current['spatial'] = el }} style={{ marginBottom: 72 }}>
        {label('Spatial Design')}
        {heading('The table is the interface.')}
        {body('Most of the interaction design decisions were actually spatial decisions. Where you place the controls relative to where the effects appear teaches users without words. We went through four floor plan iterations before the cause-and-effect loop felt immediate.')}
        {/* Floor plan diagram */}
        <div style={{ marginTop: 28 }}>
          <img src="/projects/fireside/spatial-layout.png" alt="Spatial layout, floor plan and control placement" style={{ width: '100%', height: 'auto', borderRadius: 14, display: 'block', border: '1px solid rgba(0,36,72,0.07)' }} />
        </div>
        <div style={{ marginTop: 24, display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 20 }}>
          {[
            { title: 'Control placement', text: 'Controls live at the table edge directly adjacent to the terrain region they affect. Wind controls on the upwind side. Suppression tools near the settlement. Nothing is abstract.' },
            { title: 'Material language', text: 'The terrain surface uses warm earth tones with high-contrast projection. At-risk zones glow amber. Active fire is red-orange. Firebreaks appear in deep blue. The color system works under variable museum lighting.' },
            { title: 'Viewing zones', text: 'Designed for up to 8 people simultaneously. Primary interaction zone is at the table. Secondary viewing zone (for groups watching) has clear sight lines from 3 meters. Projection is legible at both distances.' },
            { title: 'Accessibility', text: 'Table height set for wheelchair access. Controls are large-grip physical knobs, no fine motor precision required. Mode transitions are announced via color change and subtle audio cue.' },
          ].map(item => (
            <div key={item.title} style={{ padding: '20px 22px', borderRadius: 12, border: '1px solid rgba(0,36,72,0.08)', background: 'rgba(0,36,72,0.015)' }}>
              <p style={{ fontFamily: 'var(--font-label), sans-serif', fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase' as const, color: 'rgba(0,36,72,0.4)', marginBottom: 8 }}>{item.title}</p>
              <p style={{ fontFamily: 'var(--font-body), Georgia, serif', fontSize: 15, color: 'rgba(0,36,72,0.75)', lineHeight: 1.65, margin: 0 }}>{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Reflection ── */}
      <section id="reflection" ref={el => { sectionRefs.current['reflection'] = el }} style={{ marginBottom: 16 }}>
        {label('Reflection')}
        <p style={{ fontFamily: 'var(--font-display), Georgia, serif', fontSize: 'clamp(18px, 1.8vw, 24px)', fontWeight: 400, fontStyle: 'italic', color: 'rgba(0,36,72,0.7)', lineHeight: 1.6, borderLeft: `2px solid rgba(102,169,169,0.5)`, paddingLeft: 24, margin: '0 0 24px' }}>
          This was the first time I had to design for a non-screen medium. The projection-on-terrain constraint was genuinely hard, and genuinely interesting.
        </p>
        {body('I\'d never thought about how pixel density changes meaning when your canvas has hills. Or how a control feels intuitive not because of its label but because of where it sits relative to the effect. Designing for physical space forced me to think spatially in a way that screen design never had.')}
        <div style={{ height: 16 }} />
        {body('The thing I\'m most proud of: the exhibit works for an 8-year-old and a retired firefighter in the same room, at the same time, without requiring either of them to compromise. That\'s hard. We got there by testing obsessively with real people and being willing to throw out work that didn\'t survive contact with actual visitors.')}
      </section>
    </div>
  )
}

// ── FlairX image map ──
const FX = {
  before:       '/flairx/Screenshot%202025-12-07%20at%208.54.50%20PM%201.jpg',
  case1:        '/flairx/decision-1.png',
  case2:        '/flairx/decision-2.png',
  entryPoint:   '/flairx/Screenshot%202025-12-08%20at%2011.07.15%20AM%201.jpg',
  singleUpload: '/flairx/bulk upload.png',
  bulkUpload:   '/flairx/bulk-upload-1.png',
  csvUpload:    '/flairx/csv-upload.png',
  edgeCase1:    '/flairx/mixed-uploads.png',
  edgeCase2:    '/flairx/missing-fields.png',
  alert1:       '/flairx/unsaved-files-warning.png',
  alert2:       '/flairx/failed-files-notice.png',
  alert3:       '/flairx/empty-pipeline-warning.png',
  alert4:       '/flairx/required-fields-block.png',
  alert5:       '/flairx/duplicate-detection.png',
  flowChart:    '/flairx/Group%20241.png',
  beforeMockup: '/flairx/before-mockup.png',
}

// ── FlairX flow chart ──
function FlairXFlowChart() {
  const stageFill = 'rgba(43,181,194,0.1)'
  const stageBorder = 'rgba(43,181,194,0.45)'
  const resultFill = 'rgba(0,36,72,0.03)'
  const resultBorder = 'rgba(43,181,194,0.18)'
  const lineColor = 'rgba(43,181,194,0.55)'
  const lw = 1.5
  const font = "var(--font-label), system-ui, sans-serif"
  return (
    <div style={{
      background: '#FFFFFF',
      borderRadius: 20, padding: '36px 24px 28px', border: '1px solid rgba(43,181,194,0.18)',
      position: 'relative', overflow: 'hidden',
    }}>
      {/* dot grid */}
      <svg aria-hidden="true" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.13 }}>
        <defs>
          <pattern id="fxdots" x="0" y="0" width="22" height="22" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1.2" fill="#2BB5C2"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#fxdots)"/>
      </svg>

      <svg viewBox="0 0 720 360" width="100%" style={{ position: 'relative', display: 'block', overflow: 'visible' }}>
        <defs>
          <marker id="fxarrow" markerWidth="7" markerHeight="7" refX="5" refY="3.5" orient="auto">
            <path d="M0,0.5 L6,3.5 L0,6.5 Z" fill={lineColor}/>
          </marker>
          <linearGradient id="topGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#002448"/>
            <stop offset="100%" stopColor="#002448"/>
          </linearGradient>
        </defs>

        {/* ── Top node ── */}
        <rect x={190} y={8} width={340} height={60} rx={16} fill="url(#topGrad)"/>
        <text x={360} y={34} textAnchor="middle" fill="white" fontSize={13} fontFamily={font} fontWeight={700} letterSpacing="0.08em">UPLOAD YOUR</text>
        <text x={360} y={54} textAnchor="middle" fill="rgba(255,255,255,0.65)" fontSize={11} fontFamily={font} letterSpacing="0.12em">TALENT POOL</text>

        {/* Vertical + branch */}
        <line x1={360} y1={68} x2={360} y2={104} stroke={lineColor} strokeWidth={lw} markerEnd="url(#fxarrow)"/>
        <line x1={100} y1={110} x2={620} y2={110} stroke={lineColor} strokeWidth={lw}/>

        {/* 3 drops to stage boxes */}
        {[100, 360, 620].map(x => (
          <line key={x} x1={x} y1={110} x2={x} y2={134} stroke={lineColor} strokeWidth={lw} markerEnd="url(#fxarrow)"/>
        ))}

        {/* ── Stage 1 ── */}
        <rect x={10} y={140} width={180} height={70} rx={13} fill={stageFill} stroke={stageBorder} strokeWidth={lw}/>
        <text x={100} y={165} textAnchor="middle" fill="rgba(43,181,194,0.95)" fontSize={9.5} fontFamily={font} fontWeight={700} letterSpacing="0.14em">STAGE 1</text>
        <text x={100} y={187} textAnchor="middle" fill="#002448" fontSize={13} fontFamily={font} fontWeight={600}>CSV Upload</text>

        {/* ── Stage 2 ── */}
        <rect x={270} y={140} width={180} height={70} rx={13} fill={stageFill} stroke={stageBorder} strokeWidth={lw}/>
        <text x={360} y={165} textAnchor="middle" fill="rgba(43,181,194,0.95)" fontSize={9.5} fontFamily={font} fontWeight={700} letterSpacing="0.14em">STAGE 2</text>
        <text x={360} y={183} textAnchor="middle" fill="#002448" fontSize={13} fontFamily={font} fontWeight={600}>AI Résumé</text>
        <text x={360} y={199} textAnchor="middle" fill="#002448" fontSize={13} fontFamily={font} fontWeight={600}>Parsing</text>

        {/* ── Stage 3 ── */}
        <rect x={530} y={140} width={180} height={70} rx={13} fill={stageFill} stroke={stageBorder} strokeWidth={lw}/>
        <text x={620} y={165} textAnchor="middle" fill="rgba(43,181,194,0.95)" fontSize={9.5} fontFamily={font} fontWeight={700} letterSpacing="0.14em">STAGE 3</text>
        <text x={620} y={183} textAnchor="middle" fill="#002448" fontSize={13} fontFamily={font} fontWeight={600}>ATS</text>
        <text x={620} y={199} textAnchor="middle" fill="#002448" fontSize={13} fontFamily={font} fontWeight={600}>Integration</text>

        {/* Stage 1 → result */}
        <line x1={100} y1={210} x2={100} y2={248} stroke={lineColor} strokeWidth={lw} markerEnd="url(#fxarrow)"/>

        {/* Stage 2 → splits */}
        <line x1={360} y1={210} x2={360} y2={238} stroke={lineColor} strokeWidth={lw}/>
        <line x1={288} y1={238} x2={432} y2={238} stroke={lineColor} strokeWidth={lw}/>
        <line x1={288} y1={238} x2={288} y2={256} stroke={lineColor} strokeWidth={lw} markerEnd="url(#fxarrow)"/>
        <line x1={432} y1={238} x2={432} y2={256} stroke={lineColor} strokeWidth={lw} markerEnd="url(#fxarrow)"/>

        {/* Stage 3 → result */}
        <line x1={620} y1={210} x2={620} y2={248} stroke={lineColor} strokeWidth={lw} markerEnd="url(#fxarrow)"/>

        {/* ── Stage 1 result ── */}
        <rect x={10} y={252} width={180} height={78} rx={13} fill={resultFill} stroke={resultBorder} strokeWidth={lw}/>
        <text x={100} y={279} textAnchor="middle" fill="rgba(0,36,72,0.7)" fontSize={11.5} fontFamily={font}>No manual time required</text>
        <text x={100} y={297} textAnchor="middle" fill="rgba(0,36,72,0.7)" fontSize={11.5} fontFamily={font}>Clean, structured data</text>

        {/* ── Stage 2 results — single + bulk ── */}
        <rect x={208} y={260} width={155} height={60} rx={13} fill={resultFill} stroke={resultBorder} strokeWidth={lw}/>
        <text x={285} y={286} textAnchor="middle" fill="#002448" fontSize={12.5} fontFamily={font} fontWeight={600}>Single</text>
        <text x={285} y={304} textAnchor="middle" fill="#002448" fontSize={12.5} fontFamily={font} fontWeight={600}>Upload</text>

        <rect x={357} y={260} width={155} height={60} rx={13} fill={resultFill} stroke={resultBorder} strokeWidth={lw}/>
        <text x={434} y={286} textAnchor="middle" fill="#002448" fontSize={12.5} fontFamily={font} fontWeight={600}>Bulk</text>
        <text x={434} y={304} textAnchor="middle" fill="#002448" fontSize={12.5} fontFamily={font} fontWeight={600}>Upload</text>

        {/* ── Stage 3 result ── */}
        <rect x={530} y={252} width={180} height={78} rx={13} fill={resultFill} stroke={resultBorder} strokeWidth={lw}/>
        <text x={620} y={276} textAnchor="middle" fill="rgba(0,36,72,0.7)" fontSize={11.5} fontFamily={font}>Connect to applicant</text>
        <text x={620} y={294} textAnchor="middle" fill="rgba(0,36,72,0.7)" fontSize={11.5} fontFamily={font}>tracking systems</text>
        <text x={620} y={312} textAnchor="middle" fill="rgba(0,36,72,0.7)" fontSize={11.5} fontFamily={font}>Map fields &amp; retrieve data</text>
      </svg>
    </div>
  )
}

// ── FlairX case study ──
function FlairXContent({ project: _project, sectionRefs }: { project: Project; sectionRefs: React.MutableRefObject<Record<string, HTMLElement | null>> }) {
  return (
    <div>
      {/* ── Section 1: Overview ── */}
      <section id="overview" ref={el => { sectionRefs.current['overview'] = el }} style={{ marginBottom: 72 }}>
        <p style={sLabel}>Overview</p>
        <p style={sBody}>
          Redesigned the candidate intake system for FlairX, a B2B interview platform, replacing a slow, manual workflow with an AI-powered upload system that handles résumé parsing, bulk intake, and CSV imports in a unified flow.
        </p>
        <div className="case-2col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginTop: 48, background: 'rgba(0,36,72,0.03)', borderRadius: 12, padding: '20px 24px', border: '1px solid rgba(43,181,194,0.12)' }}>
          <div>
            <p style={{ fontFamily: 'var(--font-label), sans-serif', fontSize: 12, letterSpacing: '0.1em', textTransform: 'uppercase' as const, color: 'rgba(0,36,72,0.4)', marginBottom: 10 }}>Role</p>
            <p style={{ fontFamily: 'var(--font-body), Georgia, serif', fontSize: 15, color: '#002448', lineHeight: 1.7 }}>
              UX/UI/Product Designer<br />
              Workflow design<br />
              Interaction patterns<br />
              AI-assisted automation<br />
              Research &amp; validation
            </p>
          </div>
          <div>
            <p style={{ fontFamily: 'var(--font-label), sans-serif', fontSize: 12, letterSpacing: '0.1em', textTransform: 'uppercase' as const, color: 'rgba(0,36,72,0.4)', marginBottom: 10 }}>Collaborated With</p>
            <p style={{ fontFamily: 'var(--font-body), Georgia, serif', fontSize: 15, color: '#002448', lineHeight: 1.7 }}>
              Founder/CEO<br />
              Product Team<br />
              Frontend Engineers<br />
              Backend Engineers
            </p>
          </div>
        </div>
      </section>

      {/* ── Section 2: Context ── */}
      <section id="context" ref={el => { sectionRefs.current['context'] = el }} style={{ marginBottom: 72 }}>
        <p style={sLabel}>Context</p>
        <ul style={{ paddingLeft: 0, margin: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>
          {[
            'Simplifying the entire candidate intake process and integrating AI to do it',
            'Résumé parsing, bulk uploads, and ATS imports, all rethought from scratch',
            'The workflow I inherited was slow, manual, and filled with repetitive steps',
            'My job was to redesign it into an intelligent, automated system that reduced friction while keeping recruiters fully in control',
          ].map((item, i) => (
            <li key={i} style={{ fontFamily: 'var(--font-body), Georgia, serif', fontSize: 17, fontWeight: 500, color: 'rgba(0,36,72,0.75)', lineHeight: 1.7, paddingLeft: 20, position: 'relative' }}>
              <span style={{ position: 'absolute', left: 0, color: 'rgba(43,181,194,0.7)' }}>→</span>
              {item}
            </li>
          ))}
        </ul>
      </section>

      {/* ── Section 3: Problem ── */}
      <section id="problem" ref={el => { sectionRefs.current['problem'] = el }} style={{ marginBottom: 72 }}>
        <p style={sLabel}>Problem</p>
        <h2 style={sHeading}>Recruiters were spending hours before an interview could even be scheduled.</h2>
        <ul style={{ paddingLeft: 0, margin: '0 0 28px', listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>
          {[
            'Recruiters spent hours typing candidate details by hand before interviews could even be scheduled',
            'Résumés were uploaded one-by-one with no batch support',
            'Data errors had to be found and fixed manually, with no inline guidance',
            'The workflow was slow, repetitive, and mentally exhausting',
          ].map((item, i) => (
            <li key={i} style={{ fontFamily: 'var(--font-body), Georgia, serif', fontSize: 17, fontWeight: 500, color: 'rgba(0,36,72,0.75)', lineHeight: 1.7, paddingLeft: 20, position: 'relative' }}>
              <span style={{ position: 'absolute', left: 0, color: 'rgba(43,181,194,0.7)' }}>→</span>
              {item}
            </li>
          ))}
        </ul>
        <div className="case-2col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginTop: 28, marginBottom: 28 }}>
          {[
            "Why am I entering the same information again and again?",
            "Bulk uploads break or miss details. I don't trust it.",
            "If I make one mistake, the entire flow collapses.",
            "I wish the system would just do this for me.",
          ].map((quote, i) => (
            <div key={i} style={{ background: 'rgba(0,36,72,0.03)', borderRadius: 12, padding: '20px 24px', border: '1px solid rgba(43,181,194,0.12)' }}>
              <p style={{ fontFamily: 'var(--font-body), Georgia, serif', fontSize: 15, color: 'rgba(0,36,72,0.75)', lineHeight: 1.7, fontStyle: 'italic', margin: 0 }}>"{quote}"</p>
            </div>
          ))}
        </div>
        <div className="case-2col-discovery" style={{ display: 'flex', gap: 48, alignItems: 'flex-start' }}>
          <div style={{ flex: 1 }}>
            <p style={{ fontFamily: 'var(--font-label), sans-serif', fontSize: 12, letterSpacing: '0.1em', textTransform: 'uppercase' as const, color: 'rgba(0,36,72,0.4)', marginBottom: 12 }}>Discoveries</p>
            <ul style={{ paddingLeft: 20, margin: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
              {[
                'Manual data entry for every candidate field, no automation',
                'CSV uploads were unstable and frequently lost or scrambled data',
                'No transparency into what the system was doing during processing',
                'No duplicate detection, the same candidate could be added multiple times',
                'Scheduling kicked off too early, before candidate data was complete',
                'AI capabilities existed in the product but were completely unused',
              ].map((item, i) => (
                <li key={i} style={{ fontFamily: 'var(--font-body), Georgia, serif', fontSize: 16, fontWeight: 500, color: 'rgba(0,36,72,0.75)', lineHeight: 1.7 }}>{item}</li>
              ))}
            </ul>
          </div>
          <img
            src={FX.beforeMockup}
            alt="Before state. Upload your Talent Pool"
            style={{ width: 260, flexShrink: 0, display: 'block', borderRadius: 10 }}
          />
        </div>
      </section>

      {/* ── Section 4: Ideation & Flow ── */}
      <section id="ideation" ref={el => { sectionRefs.current['ideation'] = el }} style={{ marginBottom: 72 }}>
        <p style={sLabel}>Ideation &amp; Flow</p>
        <ul style={{ paddingLeft: 0, margin: '0 0 28px', listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>
          {[
            'Mapped the three core workflow areas: CSV handling, AI résumé parsing, and ATS integrations',
            'Explored multiple solution paths before committing to a direction',
            'Identified what should be automated vs. what needed to stay in recruiter control',
            'Removed steps that added friction without adding value',
          ].map((item, i) => (
            <li key={i} style={{ fontFamily: 'var(--font-body), Georgia, serif', fontSize: 17, fontWeight: 500, color: 'rgba(0,36,72,0.75)', lineHeight: 1.7, paddingLeft: 20, position: 'relative' }}>
              <span style={{ position: 'absolute', left: 0, color: 'rgba(43,181,194,0.7)' }}>→</span>
              {item}
            </li>
          ))}
        </ul>
        <div style={{ marginTop: 28 }}>
          <FlairXFlowChart />
        </div>
      </section>

      {/* ── Section 5: Design Decisions ── */}
      <section id="decisions" ref={el => { sectionRefs.current['decisions'] = el }} style={{ marginBottom: 72 }}>
        <p style={sLabel}>Design Decisions</p>

        {/* Case 1 */}
        <div style={{ marginBottom: 56 }}>
          <p style={{ fontFamily: 'var(--font-label), sans-serif', fontSize: 12, letterSpacing: '0.1em', textTransform: 'uppercase' as const, color: 'rgba(0,36,72,0.4)', marginBottom: 16 }}>Early Direction (Not Approved)</p>
          <img src={FX.case1} alt="Early direction" style={{ width: '100%', display: 'block', borderRadius: 12, marginBottom: 24 }} />
          <ul style={{ paddingLeft: 0, margin: '0 0 20px', listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>
            {[
              'Focused on simplifying single upload and restructuring intake steps',
              'Organized fields more cleanly but still relied heavily on manual input',
              'Did not fully leverage the AI capabilities already in the product',
            ].map((item, i) => (
              <li key={i} style={{ fontFamily: 'var(--font-body), Georgia, serif', fontSize: 17, fontWeight: 500, color: 'rgba(0,36,72,0.75)', lineHeight: 1.7, paddingLeft: 20, position: 'relative' }}>
                <span style={{ position: 'absolute', left: 0, color: 'rgba(43,181,194,0.7)' }}>→</span>
                {item}
              </li>
            ))}
          </ul>
          <p style={{ fontFamily: 'var(--font-label), sans-serif', fontSize: 12, letterSpacing: '0.1em', textTransform: 'uppercase' as const, color: 'rgba(0,36,72,0.4)', marginTop: 20, marginBottom: 10 }}>Why it wasn't approved:</p>
          <ul style={{ paddingLeft: 18, margin: 0, display: 'flex', flexDirection: 'column', gap: 6 }}>
            {[
              'Still too much manual data entry',
              'Did not reduce steps meaningfully',
              'No improvement in transparency for bulk uploads',
              'Did not handle edge cases or parsing failures',
            ].map((item, i) => (
              <li key={i} style={{ fontFamily: 'var(--font-body), Georgia, serif', fontSize: 15, fontWeight: 500, color: 'rgba(0,36,72,0.75)', lineHeight: 1.65 }}>{item}</li>
            ))}
          </ul>
        </div>

        {/* Case 2 */}
        <div style={{ marginBottom: 48 }}>
          <p style={{ fontFamily: 'var(--font-label), sans-serif', fontSize: 12, letterSpacing: '0.1em', textTransform: 'uppercase' as const, color: 'rgba(0,36,72,0.4)', marginBottom: 16 }}>Multi-Screen Flow (Not Selected)</p>
          <img src={FX.case2} alt="Multi-screen flow" style={{ width: '100%', display: 'block', borderRadius: 12, marginBottom: 24 }} />
          <ul style={{ paddingLeft: 0, margin: '0 0 20px', listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>
            {[
              'Split the intake process across multiple screens: upload, validation, and review as separate pages',
              'Internal testing showed the flow became visually chaotic and hard to follow',
              'Users struggled to track where they were in the process',
            ].map((item, i) => (
              <li key={i} style={{ fontFamily: 'var(--font-body), Georgia, serif', fontSize: 17, fontWeight: 500, color: 'rgba(0,36,72,0.75)', lineHeight: 1.7, paddingLeft: 20, position: 'relative' }}>
                <span style={{ position: 'absolute', left: 0, color: 'rgba(43,181,194,0.7)' }}>→</span>
                {item}
              </li>
            ))}
          </ul>
          <p style={{ fontFamily: 'var(--font-label), sans-serif', fontSize: 12, letterSpacing: '0.1em', textTransform: 'uppercase' as const, color: 'rgba(0,36,72,0.4)', marginTop: 20, marginBottom: 10 }}>Why it wasn't selected:</p>
          <ul style={{ paddingLeft: 18, margin: 0, display: 'flex', flexDirection: 'column', gap: 6 }}>
            {[
              'Too many screens for a single task',
              'Cognitive load increased instead of decreasing',
              'Users could not easily find the next actionable step',
              'Risk of abandonment due to unclear progression',
            ].map((item, i) => (
              <li key={i} style={{ fontFamily: 'var(--font-body), Georgia, serif', fontSize: 15, fontWeight: 500, color: 'rgba(0,36,72,0.75)', lineHeight: 1.65 }}>{item}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Section 6: Final Designs ── */}
      <section id="finals" ref={el => { sectionRefs.current['finals'] = el }} style={{ marginBottom: 72 }}>
        <p style={sLabel}>Final Designs</p>

        {/* Single upload */}
        <div style={{ marginBottom: 48 }}>
          <h3 style={{ fontFamily: 'var(--font-display), Georgia, serif', fontSize: 'clamp(20px, 2vw, 24px)', fontWeight: 500, fontStyle: 'italic', color: '#002448', margin: '0 0 16px' }}>Single Upload Happy Path</h3>
          <img src={FX.singleUpload} alt="Single upload happy path" style={{ width: '100%', display: 'block', borderRadius: 12, marginBottom: 0 }} />
          <ul style={{ paddingLeft: 0, margin: '16px 0 0', listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>
            {[
              'Optimized for adding one candidate at a time with minimal friction',
              'AI extracts fields from the résumé automatically on upload',
              'Recruiters only need to review and edit what the system missed',
              'Simple, linear flow: upload → review → confirm',
            ].map((item, i) => (
              <li key={i} style={{ fontFamily: 'var(--font-body), Georgia, serif', fontSize: 17, fontWeight: 500, color: 'rgba(0,36,72,0.75)', lineHeight: 1.7, paddingLeft: 20, position: 'relative' }}>
                <span style={{ position: 'absolute', left: 0, color: 'rgba(43,181,194,0.7)' }}>→</span>
                {item}
              </li>
            ))}
          </ul>
          <p style={{ fontFamily: 'var(--font-label), sans-serif', fontSize: 12, letterSpacing: '0.1em', textTransform: 'uppercase' as const, color: 'rgba(0,36,72,0.4)', marginTop: 20, marginBottom: 10 }}>Key improvements</p>
          <ul style={{ paddingLeft: 18, margin: 0, display: 'flex', flexDirection: 'column', gap: 6 }}>
            {[
              'AI extracts core fields automatically',
              'Only incomplete fields require editing',
              'Clear state transitions: upload → review → confirmation',
              'Reduced friction vs. original version',
            ].map((item, i) => (
              <li key={i} style={{ fontFamily: 'var(--font-body), Georgia, serif', fontSize: 15, color: 'rgba(0,36,72,0.75)', lineHeight: 1.65 }}>{item}</li>
            ))}
          </ul>
        </div>

        {/* Bulk upload */}
        <div style={{ marginBottom: 48 }}>
          <h3 style={{ fontFamily: 'var(--font-display), Georgia, serif', fontSize: 'clamp(20px, 2vw, 24px)', fontWeight: 500, fontStyle: 'italic', color: '#002448', margin: '0 0 16px' }}>Bulk Upload Happy Path</h3>
          <img src={FX.bulkUpload} alt="Bulk upload happy path" style={{ width: '100%', display: 'block', borderRadius: 12, marginBottom: 0 }} />
          <ul style={{ paddingLeft: 0, margin: '16px 0 0', listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>
            {[
              'Built for high-volume hiring, upload dozens of résumés at once',
              'System displays a real-time parsing summary as files are processed',
              'Missing fields are highlighted inline so nothing slips through',
              'Errors can be fixed directly in the table without opening separate forms',
            ].map((item, i) => (
              <li key={i} style={{ fontFamily: 'var(--font-body), Georgia, serif', fontSize: 17, fontWeight: 500, color: 'rgba(0,36,72,0.75)', lineHeight: 1.7, paddingLeft: 20, position: 'relative' }}>
                <span style={{ position: 'absolute', left: 0, color: 'rgba(43,181,194,0.7)' }}>→</span>
                {item}
              </li>
            ))}
          </ul>
          <p style={{ fontFamily: 'var(--font-label), sans-serif', fontSize: 12, letterSpacing: '0.1em', textTransform: 'uppercase' as const, color: 'rgba(0,36,72,0.4)', marginTop: 20, marginBottom: 10 }}>Key improvements</p>
          <ul style={{ paddingLeft: 18, margin: 0, display: 'flex', flexDirection: 'column', gap: 6 }}>
            {[
              'Real-time parsing feedback',
              'Missing-field indicators and inline editing',
              'Duplicate detection for large datasets',
              'Bulk confirmation controls',
              'Reduces time from hours → minutes',
            ].map((item, i) => (
              <li key={i} style={{ fontFamily: 'var(--font-body), Georgia, serif', fontSize: 15, color: 'rgba(0,36,72,0.75)', lineHeight: 1.65 }}>{item}</li>
            ))}
          </ul>
        </div>

        {/* CSV upload */}
        <div style={{ marginBottom: 0 }}>
          <h3 style={{ fontFamily: 'var(--font-display), Georgia, serif', fontSize: 'clamp(20px, 2vw, 24px)', fontWeight: 500, fontStyle: 'italic', color: '#002448', margin: '0 0 16px' }}>CSV Upload Happy Path</h3>
          <img src={FX.csvUpload} alt="CSV upload happy path" style={{ width: '100%', height: 'auto', borderRadius: 10, display: 'block' }} />
          <ul style={{ paddingLeft: 0, margin: '16px 0 0', listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>
            {[
              'Designed for teams who prefer structured, spreadsheet-style data uploads',
              'System automatically maps CSV columns to candidate fields after upload',
              'Conflicts and mismatches are surfaced clearly before any data is committed',
              'Inline correction keeps users in flow without switching contexts',
            ].map((item, i) => (
              <li key={i} style={{ fontFamily: 'var(--font-body), Georgia, serif', fontSize: 17, fontWeight: 500, color: 'rgba(0,36,72,0.75)', lineHeight: 1.7, paddingLeft: 20, position: 'relative' }}>
                <span style={{ position: 'absolute', left: 0, color: 'rgba(43,181,194,0.7)' }}>→</span>
                {item}
              </li>
            ))}
          </ul>
          <p style={{ fontFamily: 'var(--font-label), sans-serif', fontSize: 12, letterSpacing: '0.1em', textTransform: 'uppercase' as const, color: 'rgba(0,36,72,0.4)', marginTop: 20, marginBottom: 10 }}>Key improvements</p>
          <ul style={{ paddingLeft: 18, margin: 0, display: 'flex', flexDirection: 'column', gap: 6 }}>
            {[
              'Stable CSV upload experience',
              'Field-mapping clarity',
              'Conflict resolution flow',
              'Eliminates unpredictable CSV failures',
            ].map((item, i) => (
              <li key={i} style={{ fontFamily: 'var(--font-body), Georgia, serif', fontSize: 15, color: 'rgba(0,36,72,0.75)', lineHeight: 1.65 }}>{item}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Section 7: Edge Cases ── */}
      <section id="edgecases" ref={el => { sectionRefs.current['edgecases'] = el }} style={{ marginBottom: 72 }}>
        <p style={sLabel}>Edge Cases</p>

        {/* Edge Case 1 */}
        <div style={{ marginBottom: 48 }}>
          <p style={{ fontFamily: 'var(--font-label), sans-serif', fontSize: 12, letterSpacing: '0.1em', textTransform: 'uppercase' as const, color: 'rgba(0,36,72,0.4)', marginBottom: 16 }}>Mixed Uploading + Failed Uploads + Successful Uploads</p>
          <img src={FX.edgeCase1} alt="Mixed upload states" style={{ width: '100%', height: 'auto', borderRadius: 10, display: 'block', marginBottom: 16 }} />
          <ul style={{ paddingLeft: 0, margin: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>
            {[
              'Each file is handled independently, one failure does not block the rest',
              'Files are separated into three buckets: Uploading, Failed, and Successfully Uploaded',
              'Parse Résumés action is disabled while any file is still in progress',
              'Cancelling only pauses files actively uploading, completed files stay intact',
            ].map((item, i) => (
              <li key={i} style={{ fontFamily: 'var(--font-body), Georgia, serif', fontSize: 17, fontWeight: 500, color: 'rgba(0,36,72,0.75)', lineHeight: 1.7, paddingLeft: 20, position: 'relative' }}>
                <span style={{ position: 'absolute', left: 0, color: 'rgba(43,181,194,0.7)' }}>→</span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Edge Case 2 */}
        <div style={{ marginBottom: 48 }}>
          <p style={{ fontFamily: 'var(--font-label), sans-serif', fontSize: 12, letterSpacing: '0.1em', textTransform: 'uppercase' as const, color: 'rgba(0,36,72,0.4)', marginBottom: 16 }}>Missing Fields After Parsing</p>
          <img src={FX.edgeCase2} alt="Missing fields after parsing" style={{ width: '100%', height: 'auto', borderRadius: 10, display: 'block', marginBottom: 16 }} />
          <ul style={{ paddingLeft: 0, margin: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>
            {[
              'When mandatory fields cannot be extracted, they surface as inline warnings in the review table',
              'Only incomplete fields are flagged, no noise for what was parsed correctly',
              'Users can correct missing data directly in the table without opening separate forms',
              'Transforms a traditionally painful step into a fast, guided experience',
            ].map((item, i) => (
              <li key={i} style={{ fontFamily: 'var(--font-body), Georgia, serif', fontSize: 17, fontWeight: 500, color: 'rgba(0,36,72,0.75)', lineHeight: 1.7, paddingLeft: 20, position: 'relative' }}>
                <span style={{ position: 'absolute', left: 0, color: 'rgba(43,181,194,0.7)' }}>→</span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Alerts subsection */}
        <div>
          <p style={{ fontFamily: 'var(--font-label), sans-serif', fontSize: 12, letterSpacing: '0.1em', textTransform: 'uppercase' as const, color: 'rgba(0,36,72,0.4)', marginBottom: 12 }}>Edge Case Alerts &amp; Preventive Guidance</p>
          <ul style={{ paddingLeft: 0, margin: '0 0 24px', listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>
            {[
              'Designed a series of micro-alerts to support a safe and predictable workflow',
              'Prevents users from losing work mid-upload or navigating away accidentally',
              'Blocks incomplete jobs from being posted before data is ready',
              'Stops invalid or duplicate data from entering the system silently',
            ].map((item, i) => (
              <li key={i} style={{ fontFamily: 'var(--font-body), Georgia, serif', fontSize: 17, fontWeight: 500, color: 'rgba(0,36,72,0.75)', lineHeight: 1.7, paddingLeft: 20, position: 'relative' }}>
                <span style={{ position: 'absolute', left: 0, color: 'rgba(43,181,194,0.7)' }}>→</span>
                {item}
              </li>
            ))}
          </ul>
          <div className="case-alerts-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
            {[
              { src: FX.alert1, title: 'Unsaved Files Warning', bullets: [
                'Triggered when a user tries to navigate away mid-upload',
                'Prompts users to confirm before losing unsaved progress',
                'Prevents accidental data loss during bulk sessions',
              ]},
              { src: FX.alert2, title: 'Failed Files Notice', bullets: [
                'Surfaces clearly which files failed or are still in progress',
                'Failed files are excluded from the parsing step automatically',
                'Sets honest expectations so users can retry before continuing',
              ]},
              { src: FX.alert3, title: 'Empty Pipeline Warning', bullets: [
                'Fires when a job is posted with no candidates attached',
                'Prevents recruiters from publishing roles with empty pipelines',
                'Prompts users to add at least one candidate before posting',
              ]},
              { src: FX.alert4, title: 'Required Fields Block', bullets: [
                'Submission is blocked until all mandatory fields are filled',
                'Highlights exactly which fields are missing inline',
                'Ensures clean, complete data enters the system every time',
              ]},
              { src: FX.alert5, title: 'Duplicate Detection', bullets: [
                'Automatically checks if a candidate already exists in the database',
                'Flags the duplicate before it is added to the pipeline',
                'Keeps recruiter data clean and avoids redundant profiles',
              ]},
            ].map(({ src, title, bullets }) => (
              <div key={title}>
                <img src={src} alt={title} style={{ width: '100%', height: 'auto', borderRadius: 10, display: 'block' }} />
                <p style={{ fontFamily: 'var(--font-label), sans-serif', fontSize: 13, letterSpacing: '0.07em', textTransform: 'uppercase' as const, color: '#002448', marginTop: 12, marginBottom: 8 }}>{title}</p>
                <ul style={{ margin: 0, paddingLeft: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 5 }}>
                  {bullets.map(b => (
                    <li key={b} style={{ fontFamily: 'var(--font-body), Georgia, serif', fontSize: 14, color: 'rgba(0,36,72,0.65)', lineHeight: 1.6, paddingLeft: 16, position: 'relative' }}>
                      <span style={{ position: 'absolute', left: 0, color: 'rgba(43,181,194,0.7)' }}>→</span>
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Section 8: Impact ── */}
      <section id="impact" ref={el => { sectionRefs.current['impact'] = el }} style={{ marginBottom: 16 }}>
        <p style={sLabel}>Impact</p>
        <h2 style={sHeading}>It all worked out, and with an impact.</h2>
        <div style={{ marginTop: 32, display: 'flex', flexDirection: 'column', gap: 0 }}>
          {[
            { metric: '↓ 4 hrs → ~30 mins', desc: 'Time to process résumés reduced dramatically' },
            { metric: '↓ Duplicate Profiles', desc: 'System caught and prevented repeated entries' },
            { metric: '↑ Data Accuracy',      desc: 'Inline validation improved completeness & quality' },
            { metric: '↑ Recruiter Efficiency', desc: 'Bulk uploads became faster, predictable, and stress-free' },
          ].map(({ metric, desc }) => (
            <div key={metric} style={{ paddingLeft: 20, marginBottom: 28, borderLeft: '1.5px solid rgba(43,181,194,0.35)', position: 'relative' }}>
              <p style={{ fontFamily: 'var(--font-display), Georgia, serif', fontSize: 'clamp(22px, 2.5vw, 28px)', fontWeight: 500, color: '#002448', margin: '0 0 6px' }}>{metric}</p>
              <p style={{ fontFamily: 'var(--font-body), Georgia, serif', fontSize: 16, color: 'rgba(0,36,72,0.65)', margin: 0, lineHeight: 1.6 }}>{desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

const sLabel: React.CSSProperties = {
  fontFamily: 'var(--font-label), sans-serif',
  fontSize: 12, letterSpacing: '0.12em',
  textTransform: 'uppercase', color: 'rgba(0,36,72,0.35)',
  marginBottom: 14,
}

const sHeading: React.CSSProperties = {
  fontFamily: 'var(--font-display), Georgia, serif',
  fontSize: 'clamp(24px, 2.8vw, 32px)',
  fontWeight: 400, fontStyle: 'italic',
  color: '#002448', lineHeight: 1.2,
  letterSpacing: '-0.01em', marginBottom: 16,
}

const sBody: React.CSSProperties = {
  fontFamily: 'var(--font-body), Georgia, serif',
  fontSize: 'clamp(16px, 1.4vw, 18px)',
  fontWeight: 500,
  color: 'rgba(0,36,72,0.8)',
  lineHeight: 1.8, margin: 0,
}
