/**
 * Shared play-surface palette.
 * Import from any /play/* project. Do not redefine these colors inside a route.
 *
 * Contrast notes (WCAG 2.1 AA, normal text ≥ 4.5:1):
 * - Ink (#4B4139) on Paper (#F4EAE2) ≈ 7.4:1
 * - Ink on Shell (#E4D5C8) ≈ 6.2:1
 * - Ink on Butter (#EFD9A0) ≈ 5.8:1
 * Square numbers: full ink on paper/shell (≥ AA). Soft-light grain at ~0.055 is hue-neutral.
 * Passage names: full ink on a paper plate above passage art (≥ 7.4:1).
 * Never put small text on Sage, Rose, or Peri. Those are shape/fill only.
 */
export const playTokens = {
  paper: '#F4EAE2',
  shell: '#E4D5C8',
  sage: '#A8BFA3',
  rose: '#D99B93',
  peri: '#9AA7DB',
  butter: '#EFD9A0',
  ink: '#4B4139',
} as const

export type PlayToken = keyof typeof playTokens

/** CSS custom properties for use in play layouts and route stylesheets. */
export const playTokenCssVars = {
  '--play-paper': playTokens.paper,
  '--play-shell': playTokens.shell,
  '--play-sage': playTokens.sage,
  '--play-rose': playTokens.rose,
  '--play-peri': playTokens.peri,
  '--play-butter': playTokens.butter,
  '--play-ink': playTokens.ink,
} as const
