'use client'

import { useEffect, useRef, useState } from 'react'

// Same meadow clip the hero uses — reusing the URL lets the browser serve it
// from cache instead of a second ~29MB download.
const MEADOW_SRC =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260328_083109_283f3553-e28f-428b-a723-d639c617eb2b.mp4'

/**
 * A big word whose letters are cut out of a cream cover, revealing the meadow
 * video playing behind — so the footer bookends the page with the hero scenery.
 *
 * How the SVG mask works: a white full-size rect (= show) plus black <text>
 * (= hide) form the mask; the cream cover rect is painted everywhere the mask
 * is white and hidden where it's black (the letters), so the video shows only
 * through the letters.
 *
 * Rendering / robustness:
 * - The base is always solid bold ink text. The video mask fades in ONLY once
 *   the video is actually playing — so the masked (composited) layer is never
 *   shown in a static frame, where Chrome can flash a 1px seam at its edge.
 *   The effect reads as the ink word "filling" with the meadow.
 * - Video is skipped entirely on ≤767px and under prefers-reduced-motion —
 *   those keep the solid ink word (no <video>, no mask).
 * - The src is set lazily, only when the footer nears the viewport.
 *
 * Accessibility: the real word is an <h2> with an sr-only text node; the visual
 * treatment (solid or mask) is aria-hidden, so screen readers read it once.
 */
export default function MaskedWordVideo({ word }: { word: string }) {
  const rootRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [useVideo, setUseVideo] = useState(false)
  const [ready, setReady] = useState(false)

  // Decide video vs solid on the client (after mount → no hydration mismatch).
  useEffect(() => {
    if (typeof window === 'undefined') return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const isMobile = window.matchMedia('(max-width: 767px)').matches
    if (reduce || isMobile) return // keep solid ink word
    setUseVideo(true)
  }, [])

  // Lazy-load + play the video once it exists and the footer is near.
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

    // Safari / Low Power Mode can block autoplay — retry on interaction.
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

  return (
    <h2 className="connect-word" ref={rootRef}>
      <span className="sr-only">{word}</span>

      {/* solid ink word — the base; fades out once the video is playing */}
      <span className={`mwv-solidtext${ready ? ' is-hidden' : ''}`} aria-hidden="true">
        {word}
      </span>

      {/* video mask — desktop only; revealed only while the video plays */}
      {useVideo && (
        <span className={`mwv-stage${ready ? ' is-ready' : ''}`} aria-hidden="true">
          <video ref={videoRef} className="mwv-video" muted loop playsInline preload="metadata" />
          <svg className="mwv-svg" viewBox="0 0 1200 300" preserveAspectRatio="xMidYMid meet">
            <defs>
              {/* rects overscan the viewBox so the SVG viewport hard-clips the edge */}
              <mask id={maskId}>
                <rect x="-8" y="-8" width="1216" height="316" fill="#fff" />
                <text x="600" y="150" textAnchor="middle" dominantBaseline="central" className="mwv-masktext">
                  {word}
                </text>
              </mask>
            </defs>
            <rect className="mwv-cover" x="-8" y="-8" width="1216" height="316" mask={`url(#${maskId})`} />
          </svg>
        </span>
      )}
    </h2>
  )
}
