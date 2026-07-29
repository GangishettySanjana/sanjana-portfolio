import type { CSSProperties, ReactNode } from 'react'
import { playTokenCssVars } from './tokens'

/**
 * Shared shell for every /play/* surface.
 * Sets the chalky pastel tokens once so child routes inherit them.
 */
export default function PlayLayout({ children }: { children: ReactNode }) {
  return (
    <div
      className="play-root min-h-screen bg-white text-[var(--play-ink)]"
      style={playTokenCssVars as CSSProperties}
    >
      {children}
    </div>
  )
}
