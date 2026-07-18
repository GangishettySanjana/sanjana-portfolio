'use client'

import { useEffect, useRef, useState } from 'react'
import { DotLottieReact } from '@lottiefiles/dotlottie-react'

/**
 * Small decorative Lottie accent.
 *
 * Drop-in usage: pass `src` pointing at a .lottie file (e.g. "/lottie/wave.lottie").
 * Until a src is supplied it renders `fallback` (an emoji), so the page is never
 * broken by a missing asset.
 *
 * Behaviour:
 * - Lazy: the player only mounts once the accent scrolls near the viewport.
 * - prefers-reduced-motion: never mounts the player — the static fallback stays.
 * - Purely decorative → aria-hidden.
 */
type Props = {
  /** Path to a .lottie file, e.g. "/lottie/wave.lottie". Empty → fallback only. */
  src?: string
  /** Shown before the Lottie loads, under reduced-motion, or when src is empty. */
  fallback?: React.ReactNode
  className?: string
  loop?: boolean
}

export default function LottieAccent({ src, fallback = null, className, loop = true }: Props) {
  const ref = useRef<HTMLSpanElement>(null)
  const [play, setPlay] = useState(false)

  useEffect(() => {
    if (!src) return
    if (typeof window === 'undefined') return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setPlay(true)
          io.disconnect()
        }
      },
      { rootMargin: '200px' }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [src])

  return (
    <span ref={ref} className={className} aria-hidden="true">
      {src && play ? (
        <DotLottieReact src={src} loop={loop} autoplay style={{ width: '100%', height: '100%' }} />
      ) : (
        fallback
      )}
    </span>
  )
}
