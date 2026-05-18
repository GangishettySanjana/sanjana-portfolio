'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { projects } from '@/data/projects'

// Per-project folder colors
const FOLDER_COLORS: Record<string, { bg: string; text: string; tabLeft: string }> = {
  flairx:         { bg: '#E8B4A8', text: '#3d2a24', tabLeft: '0px'   },
  fireside:       { bg: '#B5634A', text: '#f5e8e4', tabLeft: '160px' },
  aura:           { bg: '#9BB8C2', text: '#1e3540', tabLeft: '320px' },
  getup:          { bg: '#5B7FA6', text: '#e8f0f8', tabLeft: '470px' },
  'northern-trust':{ bg: '#F2EDE4', text: '#3a3530', tabLeft: '600px' },
}

const TAB_H   = 36
const PEEK_H  = 74
const ACTIVE_H = 420
const GAP     = 5

export default function FolderStack() {
  const router = useRouter()
  const [active, setActive] = useState(0)
  const [progVal, setProgVal] = useState(0)
  const autoRef  = useRef<ReturnType<typeof setTimeout> | null>(null)
  const progRef  = useRef<ReturnType<typeof setInterval> | null>(null)
  const N = projects.length

  const startAuto = useCallback((idx: number) => {
    if (autoRef.current)  clearTimeout(autoRef.current)
    if (progRef.current)  clearInterval(progRef.current)
    setProgVal(0)

    let val = 0
    progRef.current = setInterval(() => {
      val += 100 / (2000 / 60)
      setProgVal(Math.min(val, 100))
    }, 60)

    autoRef.current = setTimeout(() => {
      const next = (idx + 1) % N
      setActive(next)
      startAuto(next)
    }, 2000)
  }, [N])

  useEffect(() => {
    startAuto(0)
    return () => {
      if (autoRef.current)  clearTimeout(autoRef.current)
      if (progRef.current)  clearInterval(progRef.current)
    }
  }, [startAuto])

  const activate = (idx: number) => {
    setActive(idx)
    startAuto(idx)
  }

  return (
    <div style={{ width: '100%' }}>
      {/* Stack */}
      <div style={{
        position: 'relative',
        width: '100%',
        height: calcTotalHeight(active, N, TAB_H, PEEK_H, ACTIVE_H, GAP),
        transition: 'height 0.5s cubic-bezier(0.16,1,0.3,1)',
      }}>
        {projects.map((project, i) => {
          const c = FOLDER_COLORS[project.slug] ?? { bg: '#E8EAF0', text: '#2A3550', tabLeft: '0px' }
          const isActive = i === active
          const top = getTop(i, active, TAB_H, PEEK_H, ACTIVE_H, GAP)
          const height = isActive ? TAB_H + ACTIVE_H : TAB_H + PEEK_H

          return (
            <div
              key={project.slug}
              onClick={() => !isActive && activate(i)}
              style={{
                position: 'absolute',
                left: 0, right: 0,
                top,
                height,
                transition: 'top 0.5s cubic-bezier(0.16,1,0.3,1), height 0.5s cubic-bezier(0.16,1,0.3,1)',
                zIndex: isActive ? N + 10 : i < active ? i + 1 : N - i,
                cursor: isActive ? 'default' : 'pointer',
              }}
            >
              {/* Tab */}
              <div style={{
                position: 'absolute',
                top: 0, left: c.tabLeft,
                height: TAB_H,
                width: 155,
                borderRadius: '10px 10px 0 0',
                background: c.bg,
                color: c.text,
                display: 'flex', alignItems: 'center',
                padding: '0 18px',
                fontSize: 11, fontWeight: 600,
                letterSpacing: '0.07em',
                fontFamily: 'var(--font-label), sans-serif',
                whiteSpace: 'nowrap',
                filter: 'brightness(0.88)',
                zIndex: 2,
              }}>
                {project.company || project.title}
              </div>

              {/* Body */}
              <div style={{
                position: 'absolute',
                left: 0, right: 0,
                top: TAB_H - 4,
                bottom: 0,
                borderRadius: '4px 18px 18px 18px',
                background: c.bg,
                color: c.text,
                overflow: 'hidden',
                boxShadow: isActive
                  ? '0 16px 56px rgba(0,0,0,0.28), 0 4px 12px rgba(0,0,0,0.14)'
                  : '0 4px 24px rgba(0,0,0,0.18)',
                transition: 'box-shadow 0.3s',
              }}>
                {/* Paper lines */}
                <div style={{
                  position: 'absolute', inset: 0,
                  backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 29px, rgba(0,0,0,0.05) 29px, rgba(0,0,0,0.05) 30px)',
                  pointerEvents: 'none',
                }} />
                {/* Red margin */}
                <div style={{
                  position: 'absolute',
                  left: 52, top: 0, bottom: 0,
                  width: 1,
                  background: 'rgba(200,80,80,0.12)',
                  pointerEvents: 'none',
                }} />

                {!isActive ? (
                  /* ── Peek ── */
                  <div style={{
                    position: 'relative', zIndex: 1,
                    padding: '18px 32px',
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    height: '100%',
                  }}>
                    <div>
                      <div style={{
                        fontFamily: 'var(--font-heading), Georgia, serif',
                        fontSize: 17, fontWeight: 700, lineHeight: 1.2,
                      }}>
                        {project.title}
                      </div>
                      <div style={{
                        fontSize: 10, letterSpacing: '0.09em',
                        textTransform: 'uppercase', opacity: 0.45, marginTop: 4,
                        fontFamily: 'var(--font-label), sans-serif',
                      }}>
                        {project.cardContext}
                      </div>
                    </div>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{ opacity: 0.3, flexShrink: 0 }}>
                      <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                ) : (
                  /* ── Expanded ── */
                  <div style={{
                    position: 'relative', zIndex: 1,
                    display: 'flex', height: '100%',
                  }}>
                    {/* Left: info */}
                    <div style={{
                      flex: 1,
                      padding: '36px 36px',
                      display: 'flex', flexDirection: 'column', gap: 14,
                    }}>
                      <div style={{
                        fontSize: 10, letterSpacing: '0.12em',
                        textTransform: 'uppercase', opacity: 0.45,
                        fontFamily: 'var(--font-label), sans-serif',
                      }}>
                        {project.cardContext}
                      </div>
                      <div style={{
                        fontFamily: 'var(--font-heading), Georgia, serif',
                        fontSize: 'clamp(20px, 2.5vw, 28px)',
                        fontWeight: 800, lineHeight: 1.15,
                      }}>
                        {project.title}
                      </div>
                      <div style={{
                        fontSize: 14, lineHeight: 1.7, opacity: 0.68,
                        maxWidth: 320,
                        fontFamily: 'var(--font-body), Georgia, serif',
                      }}>
                        {project.tldr}
                      </div>

                      {/* Stats */}
                      <div style={{ display: 'flex', gap: 24, marginTop: 4 }}>
                        {project.stats.slice(0, 2).map(s => (
                          <div key={s.label}>
                            <div style={{
                              fontFamily: 'var(--font-heading), Georgia, serif',
                              fontSize: 24, fontWeight: 700,
                            }}>
                              {s.value}
                            </div>
                            <div style={{
                              fontSize: 9, letterSpacing: '0.1em',
                              textTransform: 'uppercase', opacity: 0.45,
                              marginTop: 2,
                              fontFamily: 'var(--font-label), sans-serif',
                            }}>
                              {s.label}
                            </div>
                          </div>
                        ))}
                      </div>

                      <button
                        onClick={() => router.push(`/projects/${project.slug}`)}
                        style={{
                          marginTop: 'auto',
                          display: 'inline-flex', alignItems: 'center', gap: 8,
                          padding: '10px 22px', borderRadius: 999,
                          fontSize: 11, letterSpacing: '0.08em',
                          textTransform: 'uppercase', fontWeight: 600,
                          cursor: 'pointer', border: 'none',
                          fontFamily: 'var(--font-label), sans-serif',
                          width: 'fit-content',
                          background: c.text, color: c.bg,
                          transition: 'opacity 0.15s',
                        }}
                        onMouseEnter={e => (e.currentTarget.style.opacity = '0.75')}
                        onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
                      >
                        View Case Study →
                      </button>
                    </div>

                    {/* Right: thumbnail panel */}
                    <div style={{
                      width: 260, flexShrink: 0,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      padding: '28px 24px',
                      background: `${c.bg}99`,
                    }}>
                      <div style={{
                        width: '100%',
                        aspectRatio: '3/4',
                        borderRadius: 8,
                        boxShadow: '0 12px 40px rgba(0,0,0,0.2)',
                        overflow: 'hidden',
                        background: 'white',
                        display: 'flex', flexDirection: 'column',
                        transform: isActive ? 'rotate(0deg)' : 'rotate(2deg)',
                        transition: 'transform 0.5s cubic-bezier(0.16,1,0.3,1)',
                      }}>
                        {/* Mock screen top */}
                        <div style={{
                          height: '42%',
                          background: `${c.bg}88`,
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                        }}>
                          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" style={{ opacity: 0.35 }}>
                            <rect x="3" y="3" width="18" height="18" rx="3" stroke={c.text} strokeWidth="1.5"/>
                            <circle cx="12" cy="10" r="3" stroke={c.text} strokeWidth="1.5"/>
                            <path d="M6 21c0-3.3 2.7-6 6-6s6 2.7 6 6" stroke={c.text} strokeWidth="1.5" strokeLinecap="round"/>
                          </svg>
                        </div>
                        {/* Mock lines */}
                        <div style={{ flex: 1, padding: '10px 14px', display: 'flex', flexDirection: 'column', gap: 7 }}>
                          {[70, 50, 85, 40, 65].map((w, j) => (
                            <div key={j} style={{
                              height: 6, borderRadius: 3,
                              width: `${w}%`,
                              background: c.text,
                              opacity: 0.13,
                            }} />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Progress strip */}
                {isActive && (
                  <div style={{
                    position: 'absolute', bottom: 0, left: 0,
                    height: 3, width: `${progVal}%`,
                    background: c.text, opacity: 0.25,
                    borderRadius: '0 0 0 18px',
                    transition: 'width 0.07s linear',
                  }} />
                )}
              </div>
            </div>
          )
        })}
      </div>

      {/* Dots */}
      <div style={{ display: 'flex', gap: 8, marginTop: 24, justifyContent: 'center' }}>
        {projects.map((_, i) => (
          <div
            key={i}
            onClick={() => activate(i)}
            style={{
              width: 6, height: 6, borderRadius: '50%', cursor: 'pointer',
              background: i === active ? 'rgba(42,53,80,0.7)' : 'rgba(42,53,80,0.15)',
              transform: i === active ? 'scale(1.35)' : 'scale(1)',
              transition: 'all 0.2s',
            }}
          />
        ))}
      </div>
    </div>
  )
}

function getTop(i: number, active: number, TAB_H: number, PEEK_H: number, ACTIVE_H: number, GAP: number) {
  if (i < active) {
    return i * (PEEK_H + GAP)
  } else if (i === active) {
    return active * (PEEK_H + GAP)
  } else {
    return active * (PEEK_H + GAP) + TAB_H + ACTIVE_H + (i - active - 1) * (PEEK_H + GAP)
  }
}

function calcTotalHeight(active: number, N: number, TAB_H: number, PEEK_H: number, ACTIVE_H: number, GAP: number) {
  return active * (PEEK_H + GAP) + TAB_H + ACTIVE_H + (N - active - 1) * (PEEK_H + GAP) + TAB_H + 20
}
