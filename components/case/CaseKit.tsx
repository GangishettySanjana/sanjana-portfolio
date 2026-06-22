'use client'

import { useEffect, useRef, useState } from 'react'
import type { ReactNode, CSSProperties } from 'react'

/* Subtle fade-and-rise on scroll.
   Plain IntersectionObserver with a safety fallback so content can never
   stay hidden if an observer misbehaves. Reduced-motion shows instantly. */
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

/* One consistent, elevated image treatment across every case study.
   variant 'browser' adds a chrome bar for product screenshots. */
export function CaseFigure({
  src,
  alt,
  caption,
  variant = 'plain',
  maxWidth,
  style,
}: {
  src: string
  alt: string
  caption?: string
  variant?: 'plain' | 'browser' | 'hero'
  maxWidth?: number
  style?: CSSProperties
}) {
  return (
    <figure className="cs-figure" style={{ maxWidth, ...style }}>
      <div className={`cs-figure-frame cs-figure-${variant}`}>
        {variant === 'browser' && (
          <div className="cs-browser-bar" aria-hidden>
            <span></span>
            <span></span>
            <span></span>
          </div>
        )}
        <img src={src} alt={alt} loading="lazy" className="cs-figure-img" />
      </div>
      {caption && <figcaption className="cs-figcaption">{caption}</figcaption>}
    </figure>
  )
}
