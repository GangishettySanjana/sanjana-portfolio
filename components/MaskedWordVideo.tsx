'use client'

import { useEffect, useRef, useState } from 'react'

// Same meadow clip the hero uses — reusing the URL lets the browser serve it
// from cache instead of a second ~29MB download.
const MEADOW_SRC =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260328_083109_283f3553-e28f-428b-a723-d639c617eb2b.mp4'

// SVG mask coordinate space. Text is laid out per line inside this box; the
// whole thing scales to the container via the viewBox.
const VB_W = 1700
const VB_H = 540

/**
 * A statement whose letters are cut out of a cream cover, revealing the meadow
 * video playing behind — so the footer bookends the page with the hero scenery.
 * Supports multiple lines (the whole phrase is masked, not just one word).
 *
 * How the SVG mask works: a white full-size rect (= show) plus black <text>
 * lines (= hide) form the mask; the cream cover rect is painted everywhere the
 * mask is white and hidden where it's black (the letters), so the video shows
 * only through the letters.
 *
 * Rendering / robustness:
 * - The base is always solid bold ink text. The video mask fades in ONLY once
 *   the video is actually playing — so the masked (composited) layer is never
 *   shown in a static frame, where Chrome can flash a 1px seam at its edge.
 *   The effect reads as the words "filling" with the meadow.
 * - Video is skipped entirely on ≤767px and under prefers-reduced-motion —
 *   those keep the solid ink text (no <video>, no mask).
 * - The src is set lazily, only when the footer nears the viewport.
 *
 * Accessibility: the phrase is an <h2> with an sr-only text node; the visual
 * treatment (solid or mask) is aria-hidden, so screen readers read it once.
 */
export default function MaskedWordVideo({ lines }: { lines: string[] }) {
  const rootRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [useVideo, setUseVideo] = useState(false)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const isMobile = window.matchMedia('(max-width: 767px)').matches
    if (reduce || isMobile) return // keep solid ink text
    setUseVideo(true)
  }, [])

  useEffect(() => {
    if (!useVideo) return
    const root = rootRef.current
    const video = videoRef.current
    if (!root || !video) return

    let started = false
    const tryPlay = () => {
      const p = video.play()
      if (p && p.catch) p.catch(() => {})
    }
    const onPlaying = () => setReady(true) // reveal the mask only while it plays
    const start = () => {
      if (started) return
      started = true
      video.src = MEADOW_SRC
      video.muted = true
      video.defaultMuted = true
      video.playsInline = true
      video.addEventListener('playing', onPlaying)
      video.addEventListener('canplay', tryPlay)
      video.addEventListener('loadeddata', tryPlay)
      tryPlay()
    }

    const io = new IntersectionObserver(
      (entries) => {
        const e = entries[0]
        if (e && e.isIntersecting) {
          start()
          io.disconnect()
        }
      },
      { rootMargin: '400px' }
    )
    io.observe(root)

    const onInteract = () => started && tryPlay()
    document.addEventListener('pointerdown', onInteract)
    document.addEventListener('scroll', onInteract, { passive: true })

    return () => {
      io.disconnect()
      document.removeEventListener('pointerdown', onInteract)
      document.removeEventListener('scroll', onInteract)
      video.removeEventListener('playing', onPlaying)
      video.removeEventListener('canplay', tryPlay)
      video.removeEventListener('loadeddata', tryPlay)
    }
  }, [useVideo])

  const maskId = 'meadow-cut'
  const lineH = VB_H / lines.length
  const fontSize = lineH * 0.72

  return (
    <h2 className="connect-word" ref={rootRef} style={{ aspectRatio: `${VB_W} / ${VB_H}` }}>
      <span className="sr-only">{lines.join(' ')}</span>

      {/* solid ink text — the base; fades out once the video is playing */}
      <span className={`mwv-solidtext${ready ? ' is-hidden' : ''}`} aria-hidden="true">
        {lines.map((line, i) => (
          <span key={i} className="mwv-solidline">
            {line}
          </span>
        ))}
      </span>

      {/* video mask — desktop only; revealed only while the video plays */}
      {useVideo && (
        <span className={`mwv-stage${ready ? ' is-ready' : ''}`} aria-hidden="true">
          <video ref={videoRef} className="mwv-video" muted loop playsInline preload="metadata" />
          <svg className="mwv-svg" viewBox={`0 0 ${VB_W} ${VB_H}`} preserveAspectRatio="xMidYMid meet">
            <defs>
              <mask id={maskId}>
                <rect x="-8" y="-8" width={VB_W + 16} height={VB_H + 16} fill="#fff" />
                {lines.map((line, i) => (
                  <text
                    key={i}
                    x={VB_W / 2}
                    y={lineH * (i + 0.5)}
                    textAnchor="middle"
                    dominantBaseline="central"
                    className="mwv-masktext"
                    style={{ fontSize }}
                  >
                    {line}
                  </text>
                ))}
              </mask>
            </defs>
            <rect className="mwv-cover" x="-8" y="-8" width={VB_W + 16} height={VB_H + 16} mask={`url(#${maskId})`} />
          </svg>
        </span>
      )}
    </h2>
  )
}
