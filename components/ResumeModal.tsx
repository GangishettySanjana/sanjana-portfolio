'use client'

import { useEffect, useRef } from 'react'
import { getLenis } from '@/lib/smoothScroll'

const PDF = '/resume.pdf?v=0722'

export default function ResumeModal({ onClose }: { onClose: () => void }) {
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    document.documentElement.style.overflow = 'hidden'
    getLenis()?.stop()

    // Lenis installs a document-level wheel listener that calls preventDefault(),
    // which kills wheel events before they reach the modal's scroll container.
    // Stopping propagation here ensures the modal gets the events instead.
    const el = scrollRef.current
    const onWheel = (e: WheelEvent) => {
      e.stopPropagation()
      e.stopImmediatePropagation()
    }
    el?.addEventListener('wheel', onWheel, { passive: true, capture: true })

    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
      document.documentElement.style.overflow = ''
      getLenis()?.start()
      el?.removeEventListener('wheel', onWheel, { capture: true })
    }
  }, [onClose])

  return (
    <>
      {/* backdrop */}
      <div
        onClick={onClose}
        style={{
          position: 'fixed', inset: 0,
          background: 'rgba(0,0,0,0.55)',
          backdropFilter: 'blur(6px)',
          WebkitBackdropFilter: 'blur(6px)',
          zIndex: 1000,
        }}
      />

      {/* panel — own fixed position, no pointer-events tricks */}
      <div
        style={{
          position: 'fixed',
          top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 'calc(100vw - clamp(24px, 8vw, 64px))',
          maxWidth: 860,
          height: '90dvh',
          display: 'flex',
          flexDirection: 'column',
          background: '#ffffff',
          borderRadius: 16,
          overflow: 'hidden',
          boxShadow: '0 32px 80px rgba(0,0,0,0.28)',
          zIndex: 1001,
        }}
      >
          {/* top bar */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 12,
              padding: '14px 20px',
              borderBottom: '1px solid rgba(0,0,0,0.08)',
              flexShrink: 0,
            }}
          >
            <span style={{
              fontFamily: 'var(--font-geist-sans), sans-serif',
              fontSize: 13,
              fontWeight: 700,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: '#002448',
            }}>
              Résumé
            </span>

            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <a
                href={PDF}
                download="Sanjana-Gangishetty-Resume.pdf"
                style={{
                  fontFamily: 'var(--font-geist-sans), sans-serif',
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  padding: '8px 16px',
                  borderRadius: 999,
                  background: '#2f6bd6',
                  color: '#fff',
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  whiteSpace: 'nowrap',
                }}
              >
                Download PDF ↓
              </a>

              <button
                onClick={onClose}
                aria-label="Close résumé"
                style={{
                  background: 'rgba(0,36,72,0.07)',
                  border: 'none',
                  cursor: 'pointer',
                  width: 32, height: 32,
                  borderRadius: 8,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#002448',
                  fontSize: 16,
                  flexShrink: 0,
                }}
              >
                ✕
              </button>
            </div>
          </div>

          {/* resume preview — scrollable, fixed height so page never scrolls */}
          <div ref={scrollRef} style={{ flex: 1, overflowY: 'scroll', minHeight: 0, padding: '16px 20px 20px' }}>
            <img
              src="/resume-preview.png"
              alt="Résumé of Sanjana Gangishetty"
              style={{
                display: 'block',
                width: '100%',
                height: 'auto',
                borderRadius: 8,
                border: '1px solid rgba(0,0,0,0.08)',
              }}
            />
          </div>
        </div>
    </>
  )
}
