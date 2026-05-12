'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { type Project } from '@/data/projects'

// ── Tool logo badges ──
function ToolBadge({ name }: { name: string }) {
  type Cfg = { bg: string; icon: React.ReactNode; light?: boolean }
  const map: Record<string, Cfg> = {
    Figma:        { bg: '#ffffff', light: true,  icon: <img src="/tools/figma.svg"     alt="Figma"       style={{ width: 14, height: 14, objectFit: 'contain' }} /> },
    Notion:       { bg: '#ffffff', light: true,  icon: <img src="/tools/notion.svg"    alt="Notion"      style={{ width: 15, height: 15, objectFit: 'contain' }} /> },
    Jira:         { bg: '#ffffff', light: true,  icon: <img src="/tools/jira.svg"      alt="Jira"        style={{ width: 15, height: 15, objectFit: 'contain' }} /> },
    Slack:        { bg: '#ffffff', light: true,  icon: <img src="/tools/slack.svg"     alt="Slack"       style={{ width: 14, height: 14, objectFit: 'contain' }} /> },
    'Adobe CC':   { bg: '#ffffff', light: true,  icon: <img src="/tools/adobe.svg"     alt="Adobe CC"    style={{ width: 16, height: 16, objectFit: 'contain' }} /> },
    GitHub:       { bg: '#1C1C1E', light: false, icon: <img src="/tools/github.svg"    alt="GitHub"      style={{ width: 14, height: 14, objectFit: 'contain', filter: 'invert(1)' }} /> },
    'Claude Code':{ bg: '#2C1810', light: false, icon: <img src="/tools/claudecode.svg" alt="Claude Code" style={{ width: 15, height: 15, objectFit: 'contain' }} /> },
    Claude:       { bg: '#2C1810', light: false, icon: <img src="/tools/claudecode.svg" alt="Claude"     style={{ width: 15, height: 15, objectFit: 'contain' }} /> },
    Lovable:      { bg: '#0A0A0A', light: false, icon: <img src="/tools/lovable.svg"   alt="Lovable"     style={{ width: 14, height: 14, objectFit: 'contain' }} /> },
    Framer:       { bg: '#0055FF', light: false, icon: <svg viewBox="0 0 24 24" width="11" height="13" fill="none"><path d="M5 3h14v8H12L5 3zm0 8h7l7 10H5v-10z" fill="white"/></svg> },
    Procreate:    { bg: '#1C1C1E', light: false, icon: <svg viewBox="0 0 24 24" width="12" height="12" fill="none"><path d="M7 4h5.5a4 4 0 010 8H7V4z" fill="none" stroke="white" strokeWidth="2" strokeLinejoin="round"/><line x1="7" y1="12" x2="7" y2="20" stroke="white" strokeWidth="2" strokeLinecap="round"/></svg> },
    'Google Forms':{ bg: '#ffffff', light: true, icon: <span style={{ fontSize: 9, fontWeight: 800, color: '#673AB7' }}>GF</span> },
  }
  const cfg = map[name] ?? { bg: 'rgba(0,0,0,0.06)', light: true, icon: <span style={{ fontSize: 8, fontWeight: 700, color: '#555' }}>{name.slice(0, 2).toUpperCase()}</span> }
  return (
    <div title={name} style={{
      width: 30, height: 30, borderRadius: 8, background: cfg.bg,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      boxShadow: cfg.light
        ? 'inset 0 0 0 1px rgba(0,0,0,0.1), 0 1px 3px rgba(0,0,0,0.06)'
        : '0 1px 4px rgba(0,0,0,0.18)',
      flexShrink: 0,
    }}>
      {cfg.icon}
    </div>
  )
}

function ExpandingButton({ slug, router }: { slug: string; router: ReturnType<typeof useRouter> }) {
  const [hovered, setHovered] = useState(false)
  return (
    <div style={{ paddingTop: 20 }}>
      <button
        onClick={e => { e.preventDefault(); router.push(`/projects/${slug}`) }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          background: 'none', border: 'none', padding: '6px 24px 6px 6px',
          display: 'inline-flex', alignItems: 'center', gap: 16,
          position: 'relative', cursor: 'pointer', borderRadius: 999,
        }}
      >
        {/* Expanding dark background */}
        <span style={{
          position: 'absolute', inset: 0, borderRadius: 999,
          background: '#111827',
          clipPath: hovered ? 'circle(120% at 50% 50%)' : 'circle(22px at 22px 50%)',
          transition: 'clip-path 0.35s cubic-bezier(0.76, 0, 0.24, 1)',
        }} />
        {/* Arrow circle */}
        <span style={{
          position: 'relative', zIndex: 1,
          width: 44, height: 44, borderRadius: '50%',
          background: '#111827',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0,
        }}>
          <svg fill="none" height="18" viewBox="0 0 24 24" width="18">
            <path d="M5 12h14M13 6l6 6-6 6" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
          </svg>
        </span>
        {/* Label */}
        <span style={{
          position: 'relative', zIndex: 1,
          fontFamily: 'var(--font-label), sans-serif',
          fontSize: 13, fontWeight: 600, letterSpacing: '0.04em',
          color: hovered ? '#ffffff' : '#111827',
          transition: 'color 0.2s ease 0.05s',
        }}>
          View Case Study
        </span>
      </button>
    </div>
  )
}

interface ProjectCardProps {
  project: Project
  index: number
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const router = useRouter()
  return (
    <motion.article
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
    >
      <Link href={`/projects/${project.slug}`} className="group block">
        <div className="project-card-grid" style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          borderRadius: 20,
          background: '#fff',
          overflow: 'hidden',
          border: '1px solid rgba(0,0,0,0.08)',
        }}>

          {/* ── Left: text ── */}
          <div className="project-card-text" style={{ padding: '48px 44px', display: 'flex', flexDirection: 'column', gap: 20 }}>

            {/* Title + context tag */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <h3 style={{
                fontFamily: 'var(--font-heading), Georgia, serif',
                fontSize: 'clamp(22px, 2vw, 28px)',
                fontWeight: 800,
                color: '#111827',
                lineHeight: 1.15,
                margin: 0,
                letterSpacing: '-0.02em',
              }}>
                {project.title}
              </h3>
              {project.cardContext && (
                <p style={{
                  fontFamily: 'var(--font-label), sans-serif',
                  fontSize: 10,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: '#6B7280',
                  margin: 0,
                }}>
                  {project.cardContext}
                </p>
              )}
            </div>

            {/* Key outcomes — lead with impact */}
            <div>
              <p style={{
                fontFamily: 'var(--font-label), sans-serif',
                fontSize: 11,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: '#374151',
                margin: '0 0 12px',
              }}>
                Key outcomes
              </p>
              <div className="project-card-stats" style={{ display: 'flex', gap: 8 }}>
                {project.stats.map((stat) => (
                  <div key={stat.label} style={{
                    flex: 1,
                    border: '1px solid rgba(0,0,0,0.09)',
                    borderRadius: 12,
                    padding: '20px 16px 18px',
                  }}>
                    <p style={{
                      fontFamily: 'var(--font-heading), Georgia, serif',
                      fontSize: 'clamp(15px, 1.4vw, 18px)',
                      fontWeight: 700,
                      color: '#111827',
                      margin: '0 0 6px',
                      lineHeight: 1.15,
                    }}>
                      {stat.value}
                    </p>
                    <p style={{
                      fontFamily: 'var(--font-label), sans-serif',
                      fontSize: 10,
                      letterSpacing: '0.06em',
                      textTransform: 'uppercase',
                      color: '#4B5563',
                      margin: 0,
                      lineHeight: 1.4,
                    }}>
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <p style={{
              fontFamily: 'var(--font-body), Georgia, serif',
              fontSize: 15,
              color: '#374151',
              lineHeight: 1.65,
              margin: 0,
            }}>
              {project.tldr}
            </p>

            {/* Tool logos */}
            <div style={{ display: 'flex', gap: 8, marginTop: 'auto' }}>
              {project.tools.slice(0, 5).map(tool => (
                <ToolBadge key={tool} name={tool} />
              ))}
            </div>

            {/* Expanding circle → pill button */}
            <ExpandingButton slug={project.slug} router={router} />
          </div>

          {/* ── Right: image ── */}
          <div className="project-card-image" style={{
            background: 'linear-gradient(145deg, #F0F2F7 0%, #E8EBF4 100%)',
            overflow: 'hidden',
            minHeight: 380,
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '40px 36px',
          }}>
            {project.images?.overview ? (
              <motion.div
                style={{ position: 'relative', width: '100%', maxWidth: 420 }}
                whileHover={{ y: -6, rotate: 0.5 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* Shadow layer */}
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  borderRadius: 16,
                  boxShadow: '0 24px 60px rgba(20,28,50,0.18), 0 8px 20px rgba(20,28,50,0.1)',
                  transform: 'translateY(4px) scale(0.97)',
                  zIndex: 0,
                }} />
                <img
                  src={project.images.overview}
                  alt={project.title}
                  style={{
                    position: 'relative',
                    zIndex: 1,
                    width: '100%',
                    height: 'auto',
                    display: 'block',
                    borderRadius: 14,
                    border: '1px solid rgba(255,255,255,0.8)',
                  }}
                />
              </motion.div>
            ) : (
              <div style={{
                width: '100%',
                borderRadius: 14,
                background: 'rgba(0,0,0,0.04)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: 220,
                gap: 12,
              }}>
                <p style={{ fontFamily: 'var(--font-heading), Georgia, serif', fontSize: 18, fontWeight: 600, color: 'rgba(0,0,0,0.2)', margin: 0 }}>{project.title}</p>
                <p style={{ fontFamily: 'var(--font-label), sans-serif', fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.15)', margin: 0 }}>{project.company}</p>
              </div>
            )}
          </div>

        </div>
      </Link>
    </motion.article>
  )
}
