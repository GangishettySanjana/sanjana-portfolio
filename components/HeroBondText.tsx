"use client"

import { useEffect, useRef } from "react"

// ── config ──────────────────────────────────────────────────────────
const HEADLINE   = "Designing better human experiences for an AI-first world."
const INK        = "#1c2a3a"
const FPS        = 32
const MOVE_T     = 20
const HOLD_T     = 14
const RETURN_T   = 22
const BOND_ON    = 3
const BOND_OFF   = 3
const N_SCATTER  = 3
const LINE_H_R   = 1.35
const SCATTER_PAD_R = 1.4   // scatter room on each side as × fontSize
const WORD_DX    = 0.65
const WORD_DY    = 0.65
const LETTER_DX  = 0.45
const CONTOUR_A  = 0.4
const CELL_CAP   = 9
const CELL_SCALE = 0.5
const BOND_AIR   = 2
const BOND_MIN   = 1
const BOND_WT    = 2
const BOND_BOW   = 1
const BOND_BOW_S = 7

const EASE_MOVE   = [0,0.014,0.044,0.193,0.317,0.545,0.621,0.735,0.777,0.838,0.868,0.908,0.924,0.95,0.962,0.979,0.985,0.994,0.996,1] as const
const EASE_RETURN = [0,0.0115,0.023,0.0475,0.072,0.1835,0.295,0.3645,0.434,0.534,0.634,0.667,0.7,0.7495,0.799,0.8175,0.836,0.862,0.888,0.8995,0.911,0.9275,0.944,0.949,0.954,0.9685,0.983,0.985,0.987,0.9915,0.996,0.998,1] as const

// ── helpers ─────────────────────────────────────────────────────────
function samp(t: readonly number[], f: number): number {
  if (f <= 0) return t[0]
  const i = Math.floor(f)
  if (i >= t.length - 1) return t[t.length - 1]
  return t[i] + (t[i+1] - t[i]) * (f - i)
}

function edgeDist(hw: number, hh: number, ux: number, uy: number): number {
  return Math.min(
    ux !== 0 ? hw / Math.abs(ux) : Infinity,
    uy !== 0 ? hh / Math.abs(uy) : Infinity,
  )
}

function prng(s: number): number {
  const x = Math.sin(s + 1) * 43758.5453
  return x - Math.floor(x)
}

// ── types ────────────────────────────────────────────────────────────
interface Glyph {
  ch: string
  x: number; y: number          // typeset position (baseline)
  inkL: number; inkR: number    // half-widths from optical center
  inkTop: number; inkBot: number// half-heights from optical center
  cenX: number; cenY: number    // optical center (computed once)
  word: number; line: number
}
interface Pose { ox: number[]; oy: number[] }

// ── scatter contours ─────────────────────────────────────────────────
const CONTOURS: ((k: number, n: number) => number)[] = [
  (k, n) => n > 1 ? Math.sin(Math.PI * k / (n-1)) : 0,
  (k, n) => n > 1 ? (k/(n-1) - 0.5) * 2 : 0,
  (k, n) => n > 1 ? Math.sin(2 * Math.PI * k / (n-1)) : 0,
  (k, n) => n > 1 ? Math.abs(k/(n-1) - 0.5) * 2 - 1 : 0,
  (k, n) => n > 1 ? (k < n/2 ? -1 : 1) : 0,
]

// ── layout ──────────────────────────────────────────────────────────
function buildGlyphs(
  ctx: CanvasRenderingContext2D,
  fontStr: string,
  fontSize: number,
  cssW: number,
  scatterPad: number,
): { glyphs: Glyph[]; pairs: [number,number][]; textH: number } {
  ctx.font = fontStr
  ctx.textBaseline = "alphabetic"

  // wrap to 30ch
  const maxLW  = ctx.measureText("0".repeat(30)).width
  const tokens = HEADLINE.split(" ")
  const lines: string[] = []
  let cur = ""
  for (const tok of tokens) {
    const test = cur ? cur + " " + tok : tok
    if (ctx.measureText(test).width > maxLW && cur) { lines.push(cur); cur = tok }
    else cur = test
  }
  if (cur) lines.push(cur)

  const lineH  = fontSize * LINE_H_R
  const textH  = lines.length * lineH + fontSize * 0.3

  const glyphs: Glyph[] = []
  const pairs:  [number,number][] = []
  let globalWord = 0

  lines.forEach((line, li) => {
    const lineW    = ctx.measureText(line).width
    const lineLeft = (cssW - lineW) / 2
    const baseline = scatterPad + fontSize * 0.85 + li * lineH

    let charOff = 0
    line.split(" ").forEach((word) => {
      const wStart = glyphs.length
      for (let c = 0; c < word.length; c++) {
        const ch = word[c]
        const gx = lineLeft + ctx.measureText(line.slice(0, charOff + c)).width
        const m  = ctx.measureText(ch)
        const l  = m.actualBoundingBoxLeft   || 0
        const r  = m.actualBoundingBoxRight  || m.width
        const t  = m.actualBoundingBoxAscent || fontSize * 0.7
        const b  = m.actualBoundingBoxDescent|| fontSize * 0.1
        // optical center
        const cenX = gx + (r - l) / 2
        const cenY = baseline + (b - t) / 2
        glyphs.push({
          ch, x: gx, y: baseline,
          inkL: (l + r) / 2, inkR: (l + r) / 2,  // half-width from center
          inkTop: (t + b) / 2, inkBot: (t + b) / 2,// half-height from center
          cenX, cenY,
          word: globalWord, line: li,
        })
        if (c > 0) pairs.push([wStart + c - 1, wStart + c])
      }
      charOff += word.length + 1
      globalWord++
    })
  })

  return { glyphs, pairs, textH }
}

// ── pose generation ──────────────────────────────────────────────────
function genPose(glyphs: Glyph[], seed: number, fontSize: number): Pose {
  const ox = new Array(glyphs.length).fill(0) as number[]
  const oy = new Array(glyphs.length).fill(0) as number[]

  const byWord = new Map<number, number[]>()
  glyphs.forEach((g, i) => {
    if (!byWord.has(g.word)) byWord.set(g.word, [])
    byWord.get(g.word)!.push(i)
  })

  byWord.forEach((indices, wid) => {
    const n  = indices.length
    const li = glyphs[indices[0]].line
    const bx = (prng(seed * 7.3 + wid * 2.1) - 0.5) * 2 * fontSize * WORD_DX
    const by = li === 0
      ? -(prng(seed * 3.7 + wid * 1.9) * fontSize * WORD_DY + fontSize * 0.15)
      : +(prng(seed * 5.1 + wid * 2.7) * fontSize * WORD_DY + fontSize * 0.15)
    const ci = Math.floor(prng(seed * 11.3 + wid * 3.3) * CONTOURS.length)
    const hR = fontSize * LETTER_DX

    indices.forEach((gi, k) => {
      const rel = n > 1 ? k/(n-1) - 0.5 : 0
      ox[gi] = bx + rel * hR
      oy[gi] = by + CONTOURS[ci](k, n) * fontSize * CONTOUR_A
    })
  })
  return { ox, oy }
}

// ── engine class ─────────────────────────────────────────────────────
class HeroBond {
  private ctx: CanvasRenderingContext2D | null
  private raf     = 0
  private t0      = 0
  private mounted = 0
  private running = false
  private clock   = 0
  private dpr     = 1

  private glyphs:  Glyph[]           = []
  private pairs:   [number,number][] = []
  private poses:   Pose[]            = []
  private cell     = 1
  private fontStr  = ""
  private fontSize = 52
  private cycleT   = 0
  private scatterPad = 0
  private cssW     = 0
  private cssH     = 0

  readonly ok: boolean

  constructor(
    private canvas: HTMLCanvasElement,
    private family: string,
    private wrapper: HTMLDivElement,
  ) {
    this.ctx = canvas.getContext("2d")
    this.ok  = !!this.ctx
    if (this.ok) this.reflow()
  }

  reflow() {
    const ctx = this.ctx; if (!ctx) return
    this.dpr     = Math.min(window.devicePixelRatio || 1, 2)
    this.cssW    = this.wrapper.getBoundingClientRect().width || 640
    this.fontSize = Math.max(42, Math.min(window.innerWidth * 0.035, 62))
    this.fontStr = `800 ${this.fontSize}px ${this.family}`
    this.scatterPad = Math.ceil(this.fontSize * SCATTER_PAD_R)
    this.cell    = Math.max(1, Math.round(this.fontSize / CELL_CAP)) * CELL_SCALE

    const { glyphs, pairs, textH } = buildGlyphs(
      ctx, this.fontStr, this.fontSize, this.cssW, this.scatterPad,
    )
    this.glyphs = glyphs
    this.pairs  = pairs
    this.cssH   = textH + 2 * this.scatterPad

    this.canvas.width  = Math.round(this.cssW * this.dpr)
    this.canvas.height = Math.round(this.cssH * this.dpr)
    this.canvas.style.width  = this.cssW + "px"
    this.canvas.style.height = this.cssH + "px"
    this.canvas.style.marginTop = -this.scatterPad + "px"
    this.wrapper.style.height   = textH + "px"

    // reset transform (avoids accumulation on repeated reflow calls)
    ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0)

    this.genCycle()
    if (!this.running) this.draw(this.cycleT - 1)
  }

  private genCycle() {
    this.poses = Array.from({ length: N_SCATTER }, () =>
      genPose(this.glyphs, Math.random() * 9999, this.fontSize),
    )
    this.cycleT = HOLD_T + N_SCATTER * MOVE_T + RETURN_T
  }

  private offsetAt(gi: number, t: number): [number, number] {
    if (t < HOLD_T) return [0, 0]
    const st = t - HOLD_T
    const scEnd = N_SCATTER * MOVE_T

    if (st < scEnd) {
      const k     = Math.min(N_SCATTER - 1, Math.floor(st / MOVE_T))
      const local = st - k * MOVE_T
      const p     = samp(EASE_MOVE, local * (EASE_MOVE.length - 1) / MOVE_T)
      const fx    = k === 0 ? 0 : this.poses[k-1].ox[gi]
      const fy    = k === 0 ? 0 : this.poses[k-1].oy[gi]
      return [fx + (this.poses[k].ox[gi] - fx) * p, fy + (this.poses[k].oy[gi] - fy) * p]
    }

    const rt = st - scEnd
    if (rt >= RETURN_T) return [0, 0]
    const p    = samp(EASE_RETURN, rt * (EASE_RETURN.length - 1) / RETURN_T)
    const last = this.poses[N_SCATTER - 1]
    return [last.ox[gi] * (1 - p), last.oy[gi] * (1 - p)]
  }

  private draw(t: number) {
    const ctx = this.ctx; if (!ctx) return
    ctx.clearRect(0, 0, this.cssW, this.cssH)
    ctx.font = this.fontStr
    ctx.textBaseline = "alphabetic"
    ctx.fillStyle = INK

    const off = this.glyphs.map((_, gi) => this.offsetAt(gi, t))
    this.glyphs.forEach((g, gi) => ctx.fillText(g.ch, g.x + off[gi][0], g.y + off[gi][1]))

    const bondStart = HOLD_T + BOND_ON
    const bondEnd   = HOLD_T + N_SCATTER * MOVE_T + RETURN_T - BOND_OFF
    if (t < bondStart || t > bondEnd) return

    // optical centers with current offsets
    const cen: [number,number][] = this.glyphs.map((g, gi) => [
      g.cenX + off[gi][0],
      g.cenY + off[gi][1],
    ])

    const cell = this.cell
    for (const [ia, ib] of this.pairs) {
      const A = this.glyphs[ia], B = this.glyphs[ib]
      const dx = cen[ib][0] - cen[ia][0]
      const dy = cen[ib][1] - cen[ia][1]
      const L  = Math.hypot(dx, dy)
      if (L < 1) continue
      const ux = dx/L, uy = dy/L

      const ea = edgeDist(A.inkL, A.inkTop, ux, uy)
      const eb = edgeDist(B.inkL, B.inkTop, ux, uy)
      const free   = L - ea - eb
      const air    = BOND_AIR * cell
      const usable = free - 2 * air
      const n      = Math.floor(usable / cell)
      if (n < BOND_MIN) continue

      const s0  = ea + air + (usable - n * cell) / 2
      const bow = BOND_BOW * cell *
        Math.sin(this.clock * (Math.PI * 2 / BOND_BOW_S) + ia * 1.1)
      const nx = -uy, ny = ux

      for (let k = 0; k < n; k++) {
        const d  = s0 + (k + 0.5) * cell
        const e  = n > 1 ? Math.sin(Math.PI * (k + 0.5) / n) : 0
        const px = cen[ia][0] + ux * d + nx * bow * e
        const py = cen[ia][1] + uy * d + ny * bow * e
        const wt = BOND_WT * cell
        ctx.fillRect(
          Math.round((px - wt/2) / cell) * cell,
          Math.round((py - wt/2) / cell) * cell,
          wt, wt,
        )
      }
    }
  }

  start() {
    if (this.running || !this.ok) return
    this.running = true
    this.t0      = performance.now()
    if (!this.mounted) this.mounted = this.t0

    const tick = (now: number) => {
      if (!this.running) return
      this.clock = (now - this.mounted) / 1000
      const t = ((now - this.t0) / 1000) * FPS
      if (t >= this.cycleT) {
        this.t0 = now; this.genCycle()
        this.draw(0)
      } else {
        this.draw(t)
      }
      this.raf = requestAnimationFrame(tick)
    }
    this.raf = requestAnimationFrame(tick)
  }

  stop()    { this.running = false; cancelAnimationFrame(this.raf) }
  destroy() { this.stop() }
}

// ── component ────────────────────────────────────────────────────────
export function HeroBondText() {
  const canvasRef  = useRef<HTMLCanvasElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const canvas  = canvasRef.current
    const wrapper = wrapperRef.current
    if (!canvas || !wrapper) return

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    // resolve --font-serif to actual family name
    const probe = document.createElement("span")
    probe.style.cssText = "position:absolute;visibility:hidden;font-family:var(--font-serif)"
    document.body.appendChild(probe)
    const fam = getComputedStyle(probe).fontFamily || "sans-serif"
    probe.remove()

    const engine = new HeroBond(canvas, fam, wrapper)
    if (!engine.ok || reduced) return

    let onScreen = false
    let hidden   = false
    const sync = () => {
      if (onScreen && !hidden) engine.start(); else engine.stop()
    }

    const io = new IntersectionObserver(
      (es) => { onScreen = es[0]?.isIntersecting ?? false; sync() },
      { threshold: 0.1 },
    )
    io.observe(canvas)
    onScreen = true
    sync()

    const onVis = () => { hidden = document.hidden; sync() }
    document.addEventListener("visibilitychange", onVis)

    let rt = 0
    const onResize = () => {
      window.clearTimeout(rt)
      rt = window.setTimeout(() => engine.reflow(), 150)
    }
    window.addEventListener("resize", onResize)

    return () => {
      io.disconnect()
      document.removeEventListener("visibilitychange", onVis)
      window.removeEventListener("resize", onResize)
      window.clearTimeout(rt)
      engine.destroy()
    }
  }, [])

  return (
    <div
      ref={wrapperRef}
      role="heading"
      aria-level={1}
      aria-label={HEADLINE}
      style={{ position: "relative", overflow: "visible" }}
    >
      <canvas ref={canvasRef} style={{ display: "block", position: "relative" }} />
    </div>
  )
}
