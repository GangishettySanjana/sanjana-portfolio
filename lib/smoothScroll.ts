// Tiny client-side registry so non-scroll components (e.g. the footer
// back-to-top button) can reach the single Lenis instance created by
// <SmoothScroll/> without a window global. Falls back to null when Lenis
// isn't running (reduced-motion, SSR, before mount).

type LenisLike = { scrollTo: (target: number | string | HTMLElement, opts?: Record<string, unknown>) => void }

let instance: LenisLike | null = null

export function setLenis(l: LenisLike | null) {
  instance = l
}

export function getLenis(): LenisLike | null {
  return instance
}
