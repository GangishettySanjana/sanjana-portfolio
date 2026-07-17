'use client'

import { useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import 'lenis/dist/lenis.css'

/**
 * Site-wide Lenis smooth scroll, kept in lockstep with GSAP ScrollTrigger so
 * every scroll-driven animation (hero parallax, work header, project cards,
 * stat counters, about, connect pills) tracks the smoothed scroll position.
 *
 * RAF driver: an explicit requestAnimationFrame loop calling lenis.raf(time).
 * We do NOT rely on gsap.ticker (its callback never fires for a listener added
 * from this component in this app) nor on Lenis' autoRaf (which also failed to
 * drive the loop here) — either leaves the page frozen, since Lenis owns the
 * scroll but its raf would never run. The manual rAF loop is the canonical
 * Lenis setup and is reliable; ScrollTrigger stays synced via the scroll event.
 *
 * - Skipped entirely under prefers-reduced-motion (native scroll).
 * - Touch scrolling stays native (Lenis default) so mobile feels normal.
 * - Same-page anchor links (#work, /#about, …) route through lenis.scrollTo
 *   with an offset for the fixed nav.
 * - Fully torn down on unmount (rAF cancelled, listener removed, lenis destroyed).
 */
export default function SmoothScroll() {
  useEffect(() => {
    if (typeof window === 'undefined') return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const NAV_OFFSET = -84 // fixed nav clearance (matches scroll-padding-top)

    gsap.registerPlugin(ScrollTrigger)

    // Gentle lerp; autoRaf off — we drive the loop ourselves below.
    const lenis = new Lenis({ lerp: 0.09, autoRaf: false })

    // Keep every ScrollTrigger updating against Lenis' smoothed position.
    lenis.on('scroll', ScrollTrigger.update)
    gsap.ticker.lagSmoothing(0)

    // Explicit rAF loop — the reliable Lenis driver in this app.
    let rafId = 0
    const raf = (time: number) => {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)

    // Same-page anchor links → smooth Lenis scroll
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
      const a = (e.target as HTMLElement | null)?.closest('a')
      const href = a?.getAttribute('href')
      if (!href) return
      const hashIdx = href.indexOf('#')
      if (hashIdx === -1) return
      const path = href.slice(0, hashIdx)
      const hash = href.slice(hashIdx)
      if (hash.length < 2) return
      const samePage =
        path === '' ||
        path === window.location.pathname ||
        (path === '/' && window.location.pathname === '/')
      if (!samePage) return
      const target = document.querySelector(hash)
      if (!target) return
      e.preventDefault()
      lenis.scrollTo(target as HTMLElement, { offset: NAV_OFFSET })
      history.pushState(null, '', hash)
    }
    document.addEventListener('click', onClick)

    // Honor an initial hash on load (e.g. arriving at /#work)
    if (window.location.hash) {
      const t = document.querySelector(window.location.hash)
      if (t) requestAnimationFrame(() => lenis.scrollTo(t as HTMLElement, { offset: NAV_OFFSET }))
    }

    return () => {
      cancelAnimationFrame(rafId)
      document.removeEventListener('click', onClick)
      lenis.destroy()
    }
  }, [])

  return null
}
