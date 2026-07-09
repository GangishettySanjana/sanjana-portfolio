'use client'

/**
 * HeroBeforeAfter — draggable before/after comparator hero.
 * Opt-in preview component. Does NOT replace the live hero.
 * Preview at /preview/hero. Swap into app/page.tsx only after approval.
 *
 * TODO(sanjana): confirm the two screenshots below are the right before/after pair,
 * and decide whether to add "US-authorized" to the eyebrow (kept out pending your confirmation).
 */

import { useCallback, useEffect, useRef, useState } from 'react'

const BEFORE_IMG = '/flairx/before-mockup.png' // old dense intake form
const AFTER_IMG = '/flairx/bulk-upload-1.png' // redesigned upload flow

const CLAMP_MIN = 7
const CLAMP_MAX = 93

export default function HeroBeforeAfter() {
  const [pos, setPos] = useState(50) // percent revealed (after panel width)
  const containerRef = useRef<HTMLDivElement>(null)
  const draggingRef = useRef(false)

  const clamp = (v: number) => Math.min(CLAMP_MAX, Math.max(CLAMP_MIN, v))

  const posFromClientX = useCallback((clientX: number) => {
    const el = containerRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    setPos(clamp(((clientX - rect.left) / rect.width) * 100))
  }, [])

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (draggingRef.current) posFromClientX(e.clientX)
    }
    const onTouchMove = (e: TouchEvent) => {
      if (draggingRef.current && e.touches[0]) posFromClientX(e.touches[0].clientX)
    }
    const onUp = () => { draggingRef.current = false }
    window.addEventListener('mousemove', onMove)
    window.addEventListener('touchmove', onTouchMove, { passive: true })
    window.addEventListener('mouseup', onUp)
    window.addEventListener('touchend', onUp)
    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('touchmove', onTouchMove)
      window.removeEventListener('mouseup', onUp)
      window.removeEventListener('touchend', onUp)
    }
  }, [posFromClientX])

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') { setPos(p => clamp(p - 4)); e.preventDefault() }
    if (e.key === 'ArrowRight') { setPos(p => clamp(p + 4)); e.preventDefault() }
    if (e.key === 'Home') { setPos(CLAMP_MIN); e.preventDefault() }
    if (e.key === 'End') { setPos(CLAMP_MAX); e.preventDefault() }
  }

  return (
    <section className="hba" aria-label="Introduction">
      <div className="hba-inner">
        <p className="hba-eyebrow">
          <span className="hba-dot" aria-hidden="true" />
          Product designer · AI &amp; B2B SaaS · open to full-time
        </p>

        <h1 className="hba-headline">
          I make complex products feel obvious.{' '}
          <span className="hba-accent">Drag to see.</span>
        </h1>

        <div
          className="hba-compare"
          ref={containerRef}
          onMouseDown={(e) => { draggingRef.current = true; posFromClientX(e.clientX) }}
          onTouchStart={(e) => { draggingRef.current = true; if (e.touches[0]) posFromClientX(e.touches[0].clientX) }}
        >
          {/* BEFORE (base layer) */}
          <div className="hba-panel hba-before">
            <img
              src={BEFORE_IMG}
              alt="Before: the inherited FlairX intake form — 14 fields, roughly 3 hours per batch"
              draggable={false}
            />
            <span className="hba-label hba-label-left">
              BEFORE — what I inherited · 14 fields · 3 hrs
            </span>
          </div>

          {/* AFTER (clipped overlay) */}
          <div className="hba-panel hba-after" style={{ width: `${pos}%` }}>
            <img
              src={AFTER_IMG}
              alt="After: the redesigned FlairX flow — one review step, about 30 minutes"
              draggable={false}
            />
            <span className="hba-label hba-label-right">
              AFTER — what I shipped · 1 review · 30 min
            </span>
          </div>

          {/* HANDLE */}
          <div
            className="hba-handle"
            style={{ left: `${pos}%` }}
            role="slider"
            tabIndex={0}
            aria-label="Reveal the redesigned interface"
            aria-valuemin={CLAMP_MIN}
            aria-valuemax={CLAMP_MAX}
            aria-valuenow={Math.round(pos)}
            onKeyDown={onKeyDown}
          >
            <span className="hba-handle-grip" aria-hidden="true">⟷</span>
          </div>
        </div>

        <ul className="hba-stats">
          <li><strong>2h→30m</strong> recruiter workflow</li>
          <li><strong>130</strong> hires sourced</li>
          <li><strong>solo</strong> — designed + shipped</li>
        </ul>

        <div className="hba-ctas">
          <a className="hba-cta-primary" href="#work">See my work →</a>
          <a className="hba-cta-secondary" href="/resume" target="_blank" rel="noopener noreferrer">Resume ↗</a>
        </div>
      </div>

      <style jsx>{`
        .hba {
          background: var(--color-bg, #ffffff);
          color: var(--color-text, #3d4b6b);
          padding: clamp(48px, 8vw, 110px) var(--container-pad, 24px);
        }
        .hba-inner {
          max-width: 1040px;
          margin: 0 auto;
        }
        .hba-eyebrow {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 13px;
          letter-spacing: 0.06em;
          text-transform: none;
          color: var(--color-text-muted, #8898a8);
          margin-bottom: 18px;
        }
        .hba-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #639922;
          flex: none;
        }
        .hba-headline {
          font-size: clamp(30px, 5.4vw, 58px);
          line-height: 1.06;
          letter-spacing: -0.02em;
          font-weight: 700;
          margin: 0 0 28px;
          max-width: 18ch;
        }
        .hba-accent {
          background: var(--color-accent, #e8a09a);
          color: var(--color-accent-text, #3d4b6b);
          padding: 0 0.18em;
          border-radius: 6px;
          white-space: nowrap;
        }
        .hba-compare {
          position: relative;
          width: 100%;
          aspect-ratio: 16 / 9;
          min-height: 260px;
          border-radius: 16px;
          overflow: hidden;
          border: 1px solid var(--color-border, rgba(61, 75, 107, 0.08));
          box-shadow: 0 20px 60px rgba(61, 75, 107, 0.12);
          cursor: ew-resize;
          user-select: none;
          touch-action: pan-y;
          background: var(--color-surface, #fff);
        }
        .hba-panel {
          position: absolute;
          inset: 0;
        }
        .hba-panel img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: left top;
          display: block;
          pointer-events: none;
        }
        .hba-after {
          overflow: hidden;
          border-right: 2px solid var(--color-accent, #e8a09a);
        }
        .hba-after img {
          /* keep after image aligned with container, not its clipped width */
          width: auto;
          min-width: 100%;
          max-width: none;
        }
        .hba-label {
          position: absolute;
          top: 12px;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.08em;
          padding: 6px 10px;
          border-radius: 999px;
          background: rgba(61, 75, 107, 0.85);
          color: #fff;
          white-space: nowrap;
        }
        /* BEFORE label lives on the right (the un-clipped side where the before panel is visible) */
        .hba-label-left { right: 12px; }
        /* AFTER label lives on the left, inside the revealed after region */
        .hba-label-right { left: 12px; top: auto; bottom: 12px; background: var(--color-accent, #e8a09a); color: var(--color-accent-text, #3d4b6b); }
        .hba-handle {
          position: absolute;
          top: 0;
          bottom: 0;
          width: 44px;
          margin-left: -22px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: ew-resize;
          outline-offset: 4px;
        }
        .hba-handle:focus-visible {
          outline: 2px solid var(--color-accent, #e8a09a);
          border-radius: 8px;
        }
        .hba-handle-grip {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: var(--color-dark-bg, #3d4b6b);
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 16px;
          box-shadow: 0 4px 16px rgba(61, 75, 107, 0.35);
        }
        .hba-stats {
          display: flex;
          flex-wrap: wrap;
          gap: 10px 28px;
          list-style: none;
          margin: 26px 0 30px;
          padding: 0;
          font-size: 14px;
          color: var(--color-text-muted, #8898a8);
        }
        .hba-stats strong { color: var(--color-text, #3d4b6b); font-weight: 700; }
        .hba-ctas { display: flex; flex-wrap: wrap; gap: 14px; }
        .hba-cta-primary,
        .hba-cta-secondary {
          display: inline-block;
          padding: 12px 22px;
          border-radius: 999px;
          font-size: 15px;
          font-weight: 600;
          text-decoration: none;
          transition: transform var(--duration-micro, 150ms) var(--ease-out, ease-out);
        }
        .hba-cta-primary {
          background: var(--color-dark-bg, #3d4b6b);
          color: #fff;
        }
        .hba-cta-secondary {
          border: 1.5px solid var(--color-border, rgba(61, 75, 107, 0.2));
          color: var(--color-text, #3d4b6b);
        }
        .hba-cta-primary:hover, .hba-cta-secondary:hover { transform: translateY(-2px); }
        @media (prefers-reduced-motion: reduce) {
          .hba-cta-primary, .hba-cta-secondary { transition: none; }
          .hba-cta-primary:hover, .hba-cta-secondary:hover { transform: none; }
        }
        @media (max-width: 480px) {
          .hba-compare { aspect-ratio: 4 / 5; }
          .hba-label { font-size: 10px; }
          .hba-stats { gap: 8px 18px; font-size: 13px; }
        }
      `}</style>
    </section>
  )
}
