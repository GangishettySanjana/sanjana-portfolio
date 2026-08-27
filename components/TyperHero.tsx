'use client'

import { useEffect, useRef } from 'react'
import { Typer } from '@/lib/typer'

export default function TyperHero() {
  const ref = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const typer = new Typer(el, { fps: 20, cycles: 3, initVisible: reduced })

    if (reduced) return () => typer.destroy()

    const onDone = () => typer.in()
    window.addEventListener('curtain-done', onDone, { once: true })

    return () => {
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
