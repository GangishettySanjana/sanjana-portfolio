'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import type { ReactNode, CSSProperties } from 'react'

/* ─────────────────────────────────────────────────────────────────
   Shared case-study kit.

   Every primitive here is presentation-only and accent-agnostic: colour
   comes from `--case-accent`, which each case study sets on its own root
   (see <CaseRoot accent="#2BB5C2">). That way fireside / aura / getup /
   [slug] pick up the same structure with their own palette.
   ───────────────────────────────────────────────────────────────── */

/* ── Root ──────────────────────────────────────────────────────────
   Wraps a case study and publishes its accent as a CSS variable. */
export function CaseRoot({
  accent,
  children,
  className,
}: {
  accent: string
  children: ReactNode
  className?: string
}) {
  return (
    <div
      className={className}
      style={{ ['--case-accent' as string]: accent }}
    >
      {children}
    </div>
  )
}

/* ── Reveal ────────────────────────────────────────────────────────
   Subtle fade-and-rise on scroll. Plain IntersectionObserver with a
   safety fallback so content can never stay hidden if an observer
   misbehaves. Reduced-motion shows instantly. */
export function Reveal({
  children,
  className,
  style,
}: {
  children: ReactNode
  className?: string
  style?: CSSProperties
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce || typeof IntersectionObserver === 'undefined') {
      setShown(true)
      return
    }
    let done = false
    const reveal = () => {
      if (!done) {
        done = true
        setShown(true)
      }
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          reveal()
          io.disconnect()
        }
      },
      { rootMargin: '0px 0px -8% 0px' }
    )
    io.observe(el)
    // safety net: never let content stay invisible
    const t = window.setTimeout(reveal, 1500)
    return () => {
      io.disconnect()
      window.clearTimeout(t)
    }
  }, [])

  return (
    <div
      ref={ref}
      className={`cs-reveal${shown ? ' cs-reveal-in' : ''}${className ? ' ' + className : ''}`}
      style={style}
    >
      {children}
    </div>
  )
}

/* ── Lightbox ──────────────────────────────────────────────────────
   These are 4000px-wide product screenshots shown a few hundred px
   wide. Even full-bleed they are downscaled ~3×, so zoom is not a
   nicety — it is the only way the detail is ever legible. */
function Lightbox({
  src,
  alt,
  onClose,
}: {
  src: string
  alt: string
  onClose: () => void
}) {
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    // keep focus inside the overlay while it is open
    closeRef.current?.focus()
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [onClose])

  return (
    <div
      className="cs-lightbox"
      role="dialog"
      aria-modal="true"
      aria-label={alt}
      onClick={onClose}
    >
      <button
        ref={closeRef}
        type="button"
        className="cs-lightbox-close"
        onClick={onClose}
        aria-label="Close enlarged image"
      >
        ×
      </button>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        className="cs-lightbox-img"
        onClick={(e) => e.stopPropagation()}
      />
    </div>
  )
}

/* ── CaseFigure ────────────────────────────────────────────────────
   One image treatment across every case study.

   width  'content' stays in the text column · 'wide' breaks out past it
          · 'full' goes edge-to-edge for full-bleed moments
   frame  'card' soft rounded card · 'browser' adds chrome for product
          screenshots · 'bare' for flowcharts and diagrams that already
          have their own container
*/
export function CaseFigure({
  src,
  alt,
  caption,
  width,
  frame,
  fit = 'width',
  zoom = true,
  priority = false,
  variant,
  maxWidth,
  style,
}: {
  src: string
  alt: string
  /** One line saying what decision this shows. */
  caption?: string
  width?: 'content' | 'wide' | 'full'
  frame?: 'card' | 'browser' | 'bare'
  /** Portrait shots (phone screens, tall tables) grow absurdly tall when
   *  sized by width. 'height' caps them to the viewport instead. */
  fit?: 'width' | 'height'
  zoom?: boolean
  priority?: boolean
  /** @deprecated Legacy prop from the first kit — use `frame`. Still honoured
   *  so fireside / aura / getup keep working unchanged. */
  variant?: 'plain' | 'browser' | 'hero'
  /** @deprecated Use `width`. Kept for the same reason as `variant`. */
  maxWidth?: number
  style?: CSSProperties
}) {
  const [open, setOpen] = useState(false)
  const close = useCallback(() => setOpen(false), [])

  // Resolve the legacy API onto the new one.
  const resolvedFrame: 'card' | 'browser' | 'bare' =
    frame ?? (variant === 'browser' ? 'browser' : 'card')
  // A pinned maxWidth means the caller wants the reading column, not a breakout.
  const resolvedWidth: 'content' | 'wide' | 'full' =
    width ?? (maxWidth ? 'content' : 'wide')

  const img = (
    /* eslint-disable-next-line @next/next/no-img-element */
    <img
      src={src}
      alt={alt}
      loading={priority ? 'eager' : 'lazy'}
      className="cs-figure-img"
    />
  )

  return (
    <>
      <figure
        className={`cs-figure cs-figure-w-${resolvedWidth}${
          fit === 'height' ? ' cs-figure-tall' : ''
        }${variant === 'hero' ? ' cs-figure-hero' : ''}`}
        style={maxWidth ? { maxWidth, ...style } : style}
      >
        <div className={`cs-figure-frame cs-frame-${resolvedFrame}`}>
          {resolvedFrame === 'browser' && (
            <div className="cs-browser-bar" aria-hidden="true">
              <span></span>
              <span></span>
              <span></span>
            </div>
          )}
          {zoom ? (
            <button
              type="button"
              className="cs-figure-zoom"
              onClick={() => setOpen(true)}
              aria-label={`Enlarge image: ${alt}`}
            >
              {img}
              <span className="cs-zoom-hint" aria-hidden="true">
                Click to enlarge
              </span>
            </button>
          ) : (
            img
          )}
        </div>
        {caption && <figcaption className="cs-figcaption">{caption}</figcaption>}
      </figure>
      {open && <Lightbox src={src} alt={alt} onClose={close} />}
    </>
  )
}

/* ── CaseStats ─────────────────────────────────────────────────────
   Big numbers, small labels. Sits high on the page so the outcome
   lands before anyone decides whether to keep reading. */
export function CaseStats({
  items,
  tone = 'plain',
}: {
  items: { value: string; label: string }[]
  /** 'plain' on page background · 'band' as a bright accent block */
  tone?: 'plain' | 'band'
}) {
  return (
    <div className={`cs-stats cs-stats-${tone}`}>
      {items.map(({ value, label }) => (
        <div key={label} className="cs-stat">
          <span className="cs-stat-value">{value}</span>
          <span className="cs-stat-label">{label}</span>
        </div>
      ))}
    </div>
  )
}

/* ── CaseBeforeAfter ───────────────────────────────────────────────
   The money shot. Two labelled screens at large size. */
export function CaseBeforeAfter({
  before,
  after,
  caption,
}: {
  before: { src: string; alt: string; note?: string }
  after: { src: string; alt: string; note?: string }
  caption?: string
}) {
  return (
    <div className="cs-ba">
      <div className="cs-ba-grid">
        {[
          { ...before, kind: 'before' as const, label: 'Before' },
          { ...after, kind: 'after' as const, label: 'After' },
        ].map((side) => (
          <div key={side.kind} className={`cs-ba-side cs-ba-${side.kind}`}>
            <div className="cs-ba-head">
              <span className={`cs-ba-tag cs-ba-tag-${side.kind}`}>{side.label}</span>
              {side.note && <span className="cs-ba-note">{side.note}</span>}
            </div>
            <CaseFigure
              src={side.src}
              alt={side.alt}
              width="content"
              frame="browser"
            />
          </div>
        ))}
      </div>
      {caption && <p className="cs-ba-caption">{caption}</p>}
    </div>
  )
}

/* ── CaseSpecStrip ─────────────────────────────────────────────────
   Replaces stacked definition lists. Scope / role / timeline etc. as
   one compact scannable strip instead of six full-width rows. */
export function CaseSpecStrip({
  items,
}: {
  items: { label: string; value: string }[]
}) {
  return (
    <dl className="cs-spec">
      {items.map(({ label, value }) => (
        <div key={label} className="cs-spec-item">
          <dt className="cs-spec-key">{label}</dt>
          <dd className="cs-spec-val">{value}</dd>
        </div>
      ))}
    </dl>
  )
}

/* ── CaseQuote ─────────────────────────────────────────────────────
   Large pull-quote treatment for research quotes. */
export function CaseQuote({
  children,
  attribution,
}: {
  children: ReactNode
  attribution?: string
}) {
  return (
    <figure className="cs-quote">
      <blockquote className="cs-quote-body">{children}</blockquote>
      {attribution && (
        <figcaption className="cs-quote-attr">{attribution}</figcaption>
      )}
    </figure>
  )
}

/* ── CaseBand ──────────────────────────────────────────────────────
   Section-level background treatment, so the page stops reading as one
   continuous off-white document.

   tone  'tint' soft accent wash (problem) · 'accent' saturated block
         (results) · 'ink' dark moment
*/
export function CaseBand({
  tone = 'tint',
  children,
  id,
  className,
}: {
  tone?: 'tint' | 'accent' | 'ink'
  children: ReactNode
  id?: string
  className?: string
}) {
  return (
    <section
      id={id}
      className={`cs-band cs-band-${tone}${className ? ' ' + className : ''}`}
    >
      {children}
    </section>
  )
}
