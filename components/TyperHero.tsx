'use client'

import { useEffect, useRef } from 'react'
import { Typer } from '@/lib/typer'

// persists across client-side navigations; resets on hard reload (curtain replays then too)
let introHasPlayed = false

export default function TyperHero() {
  const ref = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const typer = new Typer(el, { fps: 20, cycles: 3, initVisible: reduced })

    if (reduced) return () => typer.destroy()

    // Curtain already played this session — show immediately without re-waiting
    if (introHasPlayed) {
      const t = setTimeout(() => typer.in(), 80)
      return () => { clearTimeout(t); typer.destroy() }
    }

    const onDone = () => {
      introHasPlayed = true
      window.clearTimeout(fallback)
      typer.in()
    }
    window.addEventListener('curtain-done', onDone, { once: true })

    // Safety net: if curtain-done never fires (preloader error, slow load, etc.),
    // reveal the headline after 4s so it never stays permanently invisible.
    const fallback = window.setTimeout(() => {
      introHasPlayed = true
      window.removeEventListener('curtain-done', onDone)
      typer.in()
    }, 4000)

    return () => {
      window.clearTimeout(fallback)
      window.removeEventListener('curtain-done', onDone)
      typer.destroy()
    }
  }, [])

  return (
    <h1
      ref={ref}
      data-typer
      data-typer-type="initial"
      style={
        {
          '--typer-fg': '#1c2a3a',
          '--typer-bg': 'transparent',
          '--typer-accent': '#ffffff',
          '--typer-accent-ink': '#1c2a3a',
        } as React.CSSProperties
      }
    >
      Designing better human experiences for an AI-first world.
    </h1>
  )
}
