import { playTokens } from '@/app/play/tokens'
import { LADDERS, SNAKES } from '../board-config'
import { squareCenterPercent } from '../lib/board'

type Pt = { x: number; y: number }

function hash(n: number): number {
  const x = Math.sin(n * 127.1 + 311.7) * 43758.5453
  return x - Math.floor(x)
}

/** Tiny seeded wobble so strokes feel printed, not CAD-clean. */
function wobble(p: Pt, seed: number, amount = 0.35): Pt {
  const a = (hash(seed) - 0.5) * 2 * amount
  const b = (hash(seed + 19) - 0.5) * 2 * amount
  return { x: p.x + a, y: p.y + b }
}

function sub(a: Pt, b: Pt): Pt {
  return { x: a.x - b.x, y: a.y - b.y }
}

function add(a: Pt, b: Pt): Pt {
  return { x: a.x + b.x, y: a.y + b.y }
}

function scale(a: Pt, s: number): Pt {
  return { x: a.x * s, y: a.y * s }
}

function len(a: Pt): number {
  return Math.hypot(a.x, a.y) || 1
}

function norm(a: Pt): Pt {
  const l = len(a)
  return { x: a.x / l, y: a.y / l }
}

function perp(a: Pt): Pt {
  return { x: -a.y, y: a.x }
}

function lerp(a: Pt, b: Pt, t: number): Pt {
  return { x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t }
}

function cubicAt(a: Pt, c1: Pt, c2: Pt, b: Pt, t: number): Pt {
  const u = 1 - t
  return {
    x: u * u * u * a.x + 3 * u * u * t * c1.x + 3 * u * t * t * c2.x + t * t * t * b.x,
    y: u * u * u * a.y + 3 * u * u * t * c1.y + 3 * u * t * t * c2.y + t * t * t * b.y,
  }
}

function cubicTangent(a: Pt, c1: Pt, c2: Pt, b: Pt, t: number): Pt {
  const u = 1 - t
  return {
    x: 3 * u * u * (c1.x - a.x) + 6 * u * t * (c2.x - c1.x) + 3 * t * t * (b.x - c2.x),
    y: 3 * u * u * (c1.y - a.y) + 6 * u * t * (c2.y - c1.y) + 3 * t * t * (b.y - c2.y),
  }
}

function snakeControls(from: number, to: number): { a: Pt; c1: Pt; c2: Pt; b: Pt } {
  const a0 = squareCenterPercent(from)
  const b0 = squareCenterPercent(to)
  const a = wobble(a0, from * 3, 0.25)
  const b = wobble(b0, to * 5, 0.25)
  const d = sub(b, a)
  const n = perp(norm(d))
  const dist = len(d)
  const bulge = Math.min(11, dist * 0.32)
  const side = hash(from + to) > 0.5 ? 1 : -1
  const c1 = wobble(
    add(lerp(a, b, 0.28), scale(n, bulge * side)),
    from * 7,
    0.55,
  )
  const c2 = wobble(
    add(lerp(a, b, 0.72), scale(n, -bulge * side * 0.85)),
    to * 11,
    0.55,
  )
  return { a, c1, c2, b }
}

/** Filled tapering body: wide at head (from), tip at tail (to). */
function snakeBodyPolygon(from: number, to: number): string {
  const { a, c1, c2, b } = snakeControls(from, to)
  const steps = 22
  const left: Pt[] = []
  const right: Pt[] = []
  for (let i = 0; i <= steps; i += 1) {
    const t = i / steps
    const p = cubicAt(a, c1, c2, b, t)
    const tangent = norm(cubicTangent(a, c1, c2, b, t))
    const n = perp(tangent)
    // Half the previous slug width; head still wider than tip.
    const half = 0.78 * (1 - t) + 0.11 * t
    left.push(add(p, scale(n, half)))
    right.push(add(p, scale(n, -half)))
  }
  const pts = [...left, ...right.reverse()]
  return pts.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x.toFixed(2)} ${p.y.toFixed(2)}`).join(' ') + ' Z'
}

function snakeHead(from: number, to: number): { cx: number; cy: number; tx: number; ty: number } {
  const { a, c1, c2, b } = snakeControls(from, to)
  const tangent = norm(cubicTangent(a, c1, c2, b, 0.02))
  return {
    cx: a.x,
    cy: a.y,
    tx: tangent.x,
    ty: tangent.y,
  }
}

type LadderGeom = {
  railA: string
  railB: string
  rungs: string
  foot: string
}

function ladderGeometry(from: number, to: number): LadderGeom {
  const a0 = squareCenterPercent(from)
  const b0 = squareCenterPercent(to)
  const a = wobble(a0, from * 2, 0.2)
  const b = wobble(b0, to * 2, 0.2)
  const d = sub(b, a)
  const tdir = norm(d)
  const n = perp(tdir)
  const half = 1.15

  const aL = add(a, scale(n, half))
  const aR = add(a, scale(n, -half))
  const bL = add(b, scale(n, half))
  const bR = add(b, scale(n, -half))

  // Slight independent wobble on each rail end so rails are not laser-straight.
  const aLw = wobble(aL, from + 1, 0.2)
  const aRw = wobble(aR, from + 2, 0.2)
  const bLw = wobble(bL, to + 1, 0.2)
  const bRw = wobble(bR, to + 2, 0.2)

  const railA = `M ${aLw.x.toFixed(2)} ${aLw.y.toFixed(2)} L ${bLw.x.toFixed(2)} ${bLw.y.toFixed(2)}`
  const railB = `M ${aRw.x.toFixed(2)} ${aRw.y.toFixed(2)} L ${bRw.x.toFixed(2)} ${bRw.y.toFixed(2)}`

  const rungCount = 5
  const rungParts: string[] = []
  for (let i = 1; i <= rungCount; i += 1) {
    const u = i / (rungCount + 1)
    const left = wobble(lerp(aLw, bLw, u), from * 13 + i, 0.15)
    const right = wobble(lerp(aRw, bRw, u), to * 17 + i, 0.15)
    rungParts.push(
      `M ${left.x.toFixed(2)} ${left.y.toFixed(2)} L ${right.x.toFixed(2)} ${right.y.toFixed(2)}`,
    )
  }

  // Foot bar at the ladder base (from), wider than the rails.
  const footHalf = half + 0.55
  const fL = wobble(add(a, scale(n, footHalf)), from + 40, 0.12)
  const fR = wobble(add(a, scale(n, -footHalf)), from + 41, 0.12)
  const foot = `M ${fL.x.toFixed(2)} ${fL.y.toFixed(2)} L ${fR.x.toFixed(2)} ${fR.y.toFixed(2)}`

  return { railA, railB, rungs: rungParts.join(' '), foot }
}

type PassagesOverlayProps = {
  activeFrom?: number | null
}

export default function PassagesOverlay({ activeFrom = null }: PassagesOverlayProps) {
  return (
    <svg
      className="pointer-events-none absolute inset-0 z-[5] h-full w-full"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <defs>
        <filter id="play-stroke-grain" x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="0.45" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </defs>

      <g filter="url(#play-stroke-grain)">
        {LADDERS.map((passage) => {
          const active = activeFrom === passage.from
          const g = ladderGeometry(passage.from, passage.to)
          const stroke = playTokens.sage
          return (
            <g key={`ladder-${passage.from}`}>
              <path
                d={g.railA}
                fill="none"
                stroke={stroke}
                strokeWidth={active ? 0.85 : 0.7}
                strokeLinecap="round"
              />
              <path
                d={g.railB}
                fill="none"
                stroke={stroke}
                strokeWidth={active ? 0.85 : 0.7}
                strokeLinecap="round"
              />
              <path
                d={g.rungs}
                fill="none"
                stroke={stroke}
                strokeWidth={active ? 0.7 : 0.55}
                strokeLinecap="round"
              />
              <path
                d={g.foot}
                fill="none"
                stroke={stroke}
                strokeWidth={active ? 1.35 : 1.15}
                strokeLinecap="round"
              />
            </g>
          )
        })}

        {SNAKES.map((passage) => {
          const active = activeFrom === passage.from
          const head = snakeHead(passage.from, passage.to)
          const angle = (Math.atan2(head.ty, head.tx) * 180) / Math.PI
          return (
            <g key={`snake-${passage.from}`}>
              <path
                d={snakeBodyPolygon(passage.from, passage.to)}
                fill={playTokens.rose}
                fillOpacity={active ? 0.95 : 0.88}
                stroke={playTokens.rose}
                strokeWidth={0.08}
                strokeLinejoin="round"
              />
              {/* Head at `from` so direction reads without playing. */}
              <ellipse
                cx={head.cx}
                cy={head.cy}
                rx={0.85}
                ry={0.68}
                fill={playTokens.rose}
                transform={`rotate(${angle} ${head.cx} ${head.cy})`}
              />
            </g>
          )
        })}
      </g>
    </svg>
  )
}
