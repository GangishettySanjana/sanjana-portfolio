'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  Reveal,
  CaseFigure,
  CaseStats,
  CaseSpecStrip,
  CaseQuote,
} from '@/components/case/CaseKit'
import './fireside.css'
import '@/app/projects/_case/case-kit.css'
import '@/app/projects/_case/buildnative.css'

/* ── Interactive fire-spread simulation ───────────────────────────── */
const SIM_COLS = 30
const SIM_ROWS = 17
const SIM_CELL = 18

type Cell = { fuel: number; type: 'veg' | 'dry' | 'rock'; state: 0 | 1 | 2; age: number }

function makeTerrain(): Cell[] {
  const cells: Cell[] = []
  for (let j = 0; j < SIM_ROWS; j++) {
    for (let i = 0; i < SIM_COLS; i++) {
      let f = 0.5 + 0.36 * Math.sin(i * 0.45 + j * 0.3) * Math.cos(j * 0.5)
      f = Math.max(0.22, Math.min(0.95, f + 0.25))
      let type: Cell['type'] = 'veg'
      // a dry, fast-burning belt across the lower third
      if (j > SIM_ROWS * 0.6 && f > 0.55) { type = 'dry'; f = Math.min(0.98, f + 0.15) }
      // a rock firebreak, vertical strip with a gap fire must flow around
      const inStrip = i >= 19 && i <= 20
      const gap = j >= 6 && j <= 9
      if (inStrip && !gap) { type = 'rock'; f = 0 }
      cells.push({ fuel: f, type, state: 0, age: 0 })
    }
  }
  return cells
}

function fuelColor(c: Cell): string {
  if (c.type === 'rock') return '#bdb9b0'
  if (c.type === 'dry') return `hsl(44, 46%, ${66 - c.fuel * 16}%)`
  return `hsl(96, 34%, ${60 - c.fuel * 20}%)`
}

function FiresidePrototype() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const cellsRef = useRef<Cell[]>(makeTerrain())
  const igniteRef = useRef<number>(SIM_ROWS * SIM_COLS / 2 - SIM_COLS + 4 | 0)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const [wind, setWind] = useState(70)       // degrees, direction wind blows toward (0 = up)
  const [speed, setSpeed] = useState(3)       // 1–5
  const [running, setRunning] = useState(false)
  const [done, setDone] = useState(false)

  const windRef = useRef(wind); windRef.current = wind
  const speedRef = useRef(speed); speedRef.current = speed

  function draw() {
    const cv = canvasRef.current; if (!cv) return
    const ctx = cv.getContext('2d'); if (!ctx) return
    const cells = cellsRef.current
    for (let j = 0; j < SIM_ROWS; j++) {
      for (let i = 0; i < SIM_COLS; i++) {
        const c = cells[j * SIM_COLS + i]
        let color: string
        if (c.state === 1) color = c.age === 0 ? '#ffb02e' : '#ff4d1c'
        else if (c.state === 2) color = '#2c2420'
        else color = fuelColor(c)
        ctx.fillStyle = color
        ctx.fillRect(i * SIM_CELL, j * SIM_CELL, SIM_CELL - 1, SIM_CELL - 1)
      }
    }
    // ignition marker when idle
    if (!running && !done) {
      const idx = igniteRef.current
      const ix = idx % SIM_COLS, iy = (idx / SIM_COLS) | 0
      ctx.strokeStyle = '#ff3d00'; ctx.lineWidth = 2
      ctx.strokeRect(ix * SIM_CELL, iy * SIM_CELL, SIM_CELL - 1, SIM_CELL - 1)
    }
  }

  function step() {
    const cells = cellsRef.current
    const θ = windRef.current * Math.PI / 180
    const wdx = Math.sin(θ), wdy = -Math.cos(θ)
    const s = speedRef.current
    const next = cells.map(c => ({ ...c }))
    let anyBurning = false
    for (let j = 0; j < SIM_ROWS; j++) {
      for (let i = 0; i < SIM_COLS; i++) {
        const c = cells[j * SIM_COLS + i]
        if (c.state === 1) {
          anyBurning = true
          // age the fire; burn out after 2 steps
          if (c.age >= 1) next[j * SIM_COLS + i].state = 2
          else next[j * SIM_COLS + i].age = c.age + 1
          // try to ignite neighbours
          for (let dj = -1; dj <= 1; dj++) {
            for (let di = -1; di <= 1; di++) {
              if (!di && !dj) continue
              const ni = i + di, nj = j + dj
              if (ni < 0 || nj < 0 || ni >= SIM_COLS || nj >= SIM_ROWS) continue
              const nIdx = nj * SIM_COLS + ni
              const n = cells[nIdx]
              if (n.state !== 0 || n.fuel <= 0) continue
              const len = Math.hypot(di, dj)
              const align = (di / len) * wdx + (dj / len) * wdy
              const windFactor = Math.max(0.05, 1 + align * s * 0.32)
              const p = 0.2 * n.fuel * windFactor
              if (Math.random() < p) { next[nIdx].state = 1; next[nIdx].age = 0 }
            }
          }
        }
      }
    }
    cellsRef.current = next
    draw()
    if (!anyBurning) { stop(true) }
  }

  function stop(finished = false) {
    if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null }
    setRunning(false)
    if (finished) setDone(true)
  }

  function ignite() {
    if (running) return
    const cells = cellsRef.current
    // if a previous run finished, reset terrain first
    if (done || cells.some(c => c.state !== 0)) {
      cellsRef.current = makeTerrain()
      setDone(false)
    }
    const idx = igniteRef.current
    if (cellsRef.current[idx].fuel > 0) cellsRef.current[idx].state = 1
    draw()
    setRunning(true)
    timerRef.current = setInterval(step, 220)
  }

  function reset() {
    stop(false)
    cellsRef.current = makeTerrain()
    setDone(false)
    draw()
  }

  function onCanvasClick(e: React.MouseEvent<HTMLCanvasElement>) {
    if (running) return
    const cv = canvasRef.current; if (!cv) return
    const rect = cv.getBoundingClientRect()
    const i = Math.floor((e.clientX - rect.left) / rect.width * SIM_COLS)
    const j = Math.floor((e.clientY - rect.top) / rect.height * SIM_ROWS)
    if (i < 0 || j < 0 || i >= SIM_COLS || j >= SIM_ROWS) return
    if (cellsRef.current[j * SIM_COLS + i].type === 'rock') return
    if (done || cellsRef.current.some(c => c.state !== 0)) { cellsRef.current = makeTerrain(); setDone(false) }
    igniteRef.current = j * SIM_COLS + i
    draw()
  }

  function onDial(e: React.MouseEvent<SVGSVGElement>) {
    const r = (e.currentTarget as SVGSVGElement).getBoundingClientRect()
    const cx = r.left + r.width / 2, cy = r.top + r.height / 2
    let deg = Math.atan2(e.clientX - cx, -(e.clientY - cy)) * 180 / Math.PI
    if (deg < 0) deg += 360
    setWind(Math.round(deg))
  }

  useEffect(() => { draw(); return () => { if (timerRef.current) clearInterval(timerRef.current) }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const arrowθ = wind * Math.PI / 180
  const ax = 26 + 17 * Math.sin(arrowθ), ay = 26 - 17 * Math.cos(arrowθ)
  const tx = 26 - 12 * Math.sin(arrowθ), ty = 26 + 12 * Math.cos(arrowθ)

  return (
    <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 16, padding: 'clamp(16px, 3vw, 28px)' }}>
      <canvas
        ref={canvasRef}
        width={SIM_COLS * SIM_CELL}
        height={SIM_ROWS * SIM_CELL}
        onClick={onCanvasClick}
        style={{ width: '100%', height: 'auto', display: 'block', borderRadius: 10, cursor: running ? 'default' : 'crosshair', imageRendering: 'auto' }}
      />
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 'clamp(16px, 3vw, 32px)', marginTop: 20 }}>
        {/* Wind dial */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <svg width={52} height={52} viewBox="0 0 52 52" onClick={onDial} style={{ cursor: 'pointer', flexShrink: 0 }}>
            <circle cx={26} cy={26} r={24} fill="none" stroke="var(--border)" strokeWidth={2} />
            <circle cx={26} cy={26} r={2.5} fill="var(--muted)" />
            <line x1={tx} y1={ty} x2={ax} y2={ay} stroke="var(--accent)" strokeWidth={2.5} strokeLinecap="round" />
            <circle cx={ax} cy={ay} r={3.5} fill="var(--accent)" />
          </svg>
          <div>
            <p style={{ fontFamily: 'var(--fx-sans)', fontSize: 'var(--type-xs)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.09em', color: 'var(--muted)', margin: '0 0 2px' }}>Wind direction</p>
            <p style={{ fontFamily: 'var(--fx-sans)', fontSize: 'var(--type-sm)', color: 'var(--text)', margin: 0 }}>{wind}° · click the dial</p>
          </div>
        </div>
        {/* Wind speed */}
        <div style={{ minWidth: 160 }}>
          <p style={{ fontFamily: 'var(--fx-sans)', fontSize: 'var(--type-xs)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.09em', color: 'var(--muted)', margin: '0 0 6px' }}>Wind speed · {speed}</p>
          <input type="range" min={1} max={5} step={1} value={speed} onChange={e => setSpeed(+e.target.value)} style={{ width: '100%', accentColor: 'var(--accent)' }} />
        </div>
        {/* Buttons */}
        <div style={{ display: 'flex', gap: 10, marginLeft: 'auto' }}>
          <button onClick={ignite} disabled={running} style={{
            fontFamily: 'var(--fx-sans)', fontSize: 'var(--type-sm)', fontWeight: 700, color: '#fff',
            background: running ? 'var(--muted)' : 'var(--accent)', border: 'none', borderRadius: 999,
            padding: '10px 22px', cursor: running ? 'default' : 'pointer',
          }}>{running ? 'Spreading…' : done ? 'Ignite again' : 'Ignite'}</button>
          <button onClick={reset} style={{
            fontFamily: 'var(--fx-sans)', fontSize: 'var(--type-sm)', fontWeight: 700, color: 'var(--text)',
            background: 'transparent', border: '1px solid var(--border)', borderRadius: 999, padding: '10px 20px', cursor: 'pointer',
          }}>Reset</button>
        </div>
      </div>
      <p style={{ fontFamily: 'var(--fx-sans)', fontSize: 'var(--type-xs)', color: 'var(--muted)', margin: '14px 0 0', lineHeight: 'var(--lh-normal)' }}>
        Built in React and Canvas. Click the terrain to drop an ignition point, set the wind, then ignite. Greener cells hold more fuel, the tan belt is dry grass that runs fast, and the grey strip is a rock firebreak the fire has to flow around, exactly the kind of cause-and-effect the table was built to make visible.
      </p>
    </div>
  )
}

/* ── Page ─────────────────────────────────────────────────────────── */
export default function FiresidePage() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const NAV = [
      { id: 'context',    num: '01', label: 'Context'        },
      { id: 'role',       num: '02', label: 'My Role'        },
      { id: 'solution',   num: '03', label: 'The Solution'   },
      { id: 'experience', num: '04', label: 'User Experience'},
      { id: 'simulation', num: '05', label: 'Try the Table' },
      { id: 'prototype',  num: '06', label: 'iPad Prototype' },
      { id: 'spatial',    num: '07', label: 'Spatial Design' },
      { id: 'reflection', num: '08', label: 'Reflection'     },
    ]

    const sections   = NAV.map(n => document.getElementById(n.id)).filter(Boolean) as HTMLElement[]
    const vLinks     = Array.from(document.querySelectorAll('.fx-v-link')) as HTMLElement[]
    const fill       = document.querySelector('.fx-v-fill') as HTMLElement | null
    const total      = sections.length

    function activate(index: number) {
      if (fill) {
        gsap.to(fill, { height: `${((index + 1) / total) * 100}%`, duration: 0.55, ease: 'power3.out' })
      }
      vLinks.forEach((link, i) => link.classList.toggle('fx-v-on', i === index))
    }

    sections.forEach((sec, i) => {
      ScrollTrigger.create({
        trigger: sec,
        start: 'top 55%',
        end:   'bottom 45%',
        onEnter:     () => activate(i),
        onEnterBack: () => activate(i),
      })
    })

    activate(0)

    return () => { ScrollTrigger.getAll().forEach(t => t.kill()) }
  }, [])

  return (
    <>
      <div className="fx-page cs-bleed-root" style={{ paddingTop: 64 }}>

        {/* ── VERTICAL SCROLLSPY NAV ──────────────────────── */}
        <nav className="fx-v-nav" aria-label="Page sections">
          <div className="fx-v-track">
            <div className="fx-v-fill" style={{ height: '12.5%' }}></div>
          </div>
          <div className="fx-v-items">
            {[
              { href: '#context',    n: '01', label: 'Context'    },
              { href: '#role',       n: '02', label: 'Role'       },
              { href: '#solution',   n: '03', label: 'Solution'   },
              { href: '#experience', n: '04', label: 'Experience' },
              { href: '#simulation', n: '05', label: 'Simulation' },
              { href: '#prototype',  n: '06', label: 'Prototype'  },
              { href: '#spatial',    n: '07', label: 'Spatial'    },
              { href: '#reflection', n: '08', label: 'Reflection' },
            ].map(({ href, n, label }) => (
              <a key={href} href={href} className="fx-v-link">
                <span className="fx-v-num">{n}</span>
                <span className="fx-v-label">{label}</span>
              </a>
            ))}
          </div>
        </nav>

        {/* ── HERO ────────────────────────────────────────── */}
        <section className="fx-hero" id="hero">
          <div className="fx-container">
            <Reveal>
              <Link href="/#work" className="fx-back-link" onClick={() => sessionStorage.setItem('skipIntro', '1')}>← Back to work</Link>
              <p className="fx-eyebrow">Academic Project · CU Boulder · UX Design</p>
              <h1 className="fx-hero-title">Designing a Wildfire Exhibit Anyone Could Use</h1>
              <p className="fx-hero-sub">
                This was the first project where the interface wasn&apos;t a screen. It was a 3D topographic table with a projected display on top of physical terrain. I designed the interaction language for a wildfire exhibit that taught fire behavior to anyone who walked up, without instructions, in under 10 seconds.
              </p>

              {/* Outcome lands before anyone decides whether to keep reading */}
              <CaseStats
                items={[
                  { value: '4', label: 'Public events deployed at' },
                  { value: '8–80', label: 'Age range it had to work for' },
                  { value: '0', label: 'Instructions needed to start' },
                ]}
              />

              <CaseFigure
                src="/projects/fireside/exhibit-in-use.png"
                alt="Visitors gathered around the Fireside topographic table at a public science night, using it without staff guidance"
                caption="The exhibit at a public science night. Visitors walked up and started using it without anyone explaining how."
                width="wide"
                priority
                style={{ marginTop: 40, marginBottom: 8 }}
              />

              <div className="fx-summary-card">
                <div className="fx-summary-top">
                  <p className="fx-summary-hmw">
                    <strong>The challenge:</strong> Make the exhibit immediately usable for everyone from an 8-year-old to a retired firefighter, without instructions, in a noisy museum, in under 10 seconds.
                  </p>
                  <span className="fx-status-live">Case Study</span>
                </div>
                <div className="fx-summary-meta">
                  <div className="fx-smeta-item">
                    <span className="fx-smeta-k">Role</span>
                    <span className="fx-smeta-v">UX Designer</span>
                  </div>
                  <div className="fx-smeta-item">
                    <span className="fx-smeta-k">Company</span>
                    <span className="fx-smeta-v">CU Boulder</span>
                  </div>
                  <div className="fx-smeta-item">
                    <span className="fx-smeta-k">Year</span>
                    <span className="fx-smeta-v">2024</span>
                  </div>
                  <div className="fx-smeta-item">
                    <span className="fx-smeta-k">Duration</span>
                    <span className="fx-smeta-v">5 months</span>
                  </div>
                  <div className="fx-smeta-item">
                    <span className="fx-smeta-k">Tools</span>
                    <span className="fx-smeta-v">Figma · Framer · Procreate</span>
                  </div>
                </div>
                <div className="fx-summary-cols">
                  <div className="fx-sum-col fx-sum-problem">
                    <div className="fx-sum-head">
                      <span className="fx-sum-label">The Problem</span>
                    </div>
                    <ul>
                      <li>No way to understand fire behavior without a pamphlet</li>
                      <li>Physical table and projected interface felt disconnected</li>
                      <li>Audience ranged from kids to fire scientists</li>
                    </ul>
                  </div>
                  <div className="fx-sum-col fx-sum-approach">
                    <div className="fx-sum-head">
                      <span className="fx-sum-label">What I did</span>
                    </div>
                    <ul>
                      <li>3 interaction modes, each usable without onboarding</li>
                      <li>Projection and table always tell the same story</li>
                      <li>Spatial controls placed adjacent to their effects</li>
                    </ul>
                  </div>
                  <div className="fx-sum-col fx-sum-result">
                    <div className="fx-sum-head">
                      <span className="fx-sum-label">Result</span>
                    </div>
                    <ul>
                      <li>Deployed at 4 public science events</li>
                      <li>Works for ages 8-80 with no prior knowledge</li>
                      <li>3 rounds of iteration, zero instruction text needed</li>
                    </ul>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ── 01 CONTEXT ──────────────────────────────────── */}
        <section className="fx-sec cs-band-tint" id="context">
          <div className="fx-container">
            <Reveal>
              <p className="fx-sec-label">01 · Context</p>
              <h2 className="fx-sec-title">A wildfire doesn&apos;t wait for you to understand it.</h2>

              <div className="fx-prose" style={{ marginBottom: 32 }}>
                <p>Wildfires are becoming more frequent, more destructive, and harder to predict. But most public education still looks like a pamphlet. The Fireside Interactive project set out to change that, by building a physical exhibit that let visitors actually experience how a wildfire spreads, not just read about it.</p>
                <p>The project was developed as part of CU Boulder&apos;s community wildfire awareness initiative. The audience was everyone: families, school groups, firefighters, and retirees. The exhibit needed to work in a noisy science museum, capture attention in under 10 seconds, and teach something real in under 5 minutes.</p>
              </div>

              {/* The constraint carries an argument, so it stays as prose;
                  the rest compresses into a scannable strip. */}
              <CaseQuote attribution="The single constraint the whole interaction language had to satisfy.">
                No instructions. It had to explain itself the moment someone walked up.
              </CaseQuote>

              <CaseSpecStrip
                items={[
                  { label: 'Role', value: 'UX Designer' },
                  { label: 'Ask', value: 'Make wildfire science visceral in a high-traffic exhibit' },
                  { label: 'Audience', value: 'Families, school groups, educators, fire scientists — same room' },
                  { label: 'Setting', value: 'Noisy museums, short attention spans, variable lighting' },
                  { label: 'Team', value: 'CU Boulder design team, hardware engineers, fire researchers' },
                ]}
              />
            </Reveal>
          </div>
        </section>

        {/* ── 02 MY ROLE ──────────────────────────────────── */}
        <section className="fx-sec fx-sec-alt" id="role">
          <div className="fx-container">
            <Reveal>
              <p className="fx-sec-label">02 · My Role</p>
              <h2 className="fx-sec-title">UX designer for the full exhibit: interface, interaction, and spatial flow.</h2>

              <div className="fx-decisions-list">
                {[
                  {
                    num: '01',
                    title: 'Interface Design',
                    desc: 'Designed the projection UI displayed on the 3D topographic table. Visual language that reads on a lumpy, curved surface.',
                  },
                  {
                    num: '02',
                    title: 'Interaction Design',
                    desc: 'Mapped the full three-mode journey: Information, Simulation, Intervention. Defined entry points, transitions, and feedback loops.',
                  },
                  {
                    num: '03',
                    title: 'User Research',
                    desc: 'Tested with families, high school students, and educators. Three rounds of iteration based on observed behavior, not surveys.',
                  },
                  {
                    num: '04',
                    title: 'Spatial Design',
                    desc: 'Worked with the hardware team on control placement, table ergonomics, and the physical layout that makes cause-and-effect spatially obvious.',
                  },
                ].map(({ num, title, desc }) => (
                  <div key={num} className="fx-decision">
                    <div className="fx-decision-num">{num}</div>
                    <div className="fx-decision-body">
                      <h3>{title}</h3>
                      <div className="fx-dblock">
                        <p>{desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* ── 03 THE SOLUTION ─────────────────────────────── */}
        <section className="fx-sec" id="solution">
          <div className="fx-container">
            <Reveal>
              <p className="fx-sec-label">03 · The Solution</p>
              <h2 className="fx-sec-title">Three modes. One table. Zero instructions.</h2>

              <div className="fx-prose" style={{ marginBottom: 40 }}>
                <p>The exhibit runs three distinct interaction modes, each designed to work without onboarding. Visitors can walk up, start touching things, and immediately understand what&apos;s happening. The projection layer and the physical table always tell the same story at the same moment.</p>
              </div>

              {[
                {
                  barColor: '#2BB5C2',
                  modeLabel: 'Mode 01',
                  title: 'Information Mode',
                  img: '/projects/fireside/information-mode.png',
                  caption: 'Ambient state. Colour encodes danger, motion encodes wind, so the terrain reads before anyone touches it.',
                  bullets: [
                    'The exhibit starts in ambient mode. Fire risk data overlaid on terrain, wind patterns animated, vegetation density visible.',
                    'Visitors absorb context passively before interacting.',
                    'Color encodes danger level. Motion communicates wind. No text required to get the basic picture.',
                  ],
                },
                {
                  barColor: '#e07040',
                  modeLabel: 'Mode 02',
                  title: 'Simulation Mode',
                  img: '/projects/fireside/simulation-mode.png',
                  caption: 'Every input has an immediate consequence on the terrain. This is where the causal link lands.',
                  bullets: [
                    'Set environmental conditions: wind speed, humidity, vegetation. Watch a simulated fire spread across the physical terrain in real time.',
                    'Every input has an immediate, legible consequence on screen.',
                    "This is the moment of 'oh, that's why it moves like that.'",
                  ],
                },
                {
                  barColor: '#c04a20',
                  modeLabel: 'Mode 03',
                  title: 'Intervention Mode',
                  img: '/projects/fireside/intervention-mode.png',
                  caption: 'Controls are large and forgiving, but the scenarios stay layered enough for a professional to find them meaningful.',
                  bullets: [
                    'A fire is already burning. Deploy suppression resources: firebreaks, water drops, evacuation routes.',
                    'High urgency, constrained resources, real tradeoffs.',
                    'The controls are large and forgiving. The scenarios are layered enough that someone with professional fire knowledge still finds them meaningful.',
                  ],
                },
              ].map(({ barColor, modeLabel, title, img, caption, bullets }) => (
                <div key={modeLabel} className="fx-design-block">
                  <div
                    className="fx-mode-bar"
                    style={{ background: barColor }}
                  >
                    {modeLabel}
                  </div>
                  <h3
                    className="fx-design-title"
                    style={{ borderTop: `1px solid rgba(0,36,72,0.07)`, borderBottom: '1px solid var(--border)', borderRadius: 0, marginTop: 0, paddingTop: 14 }}
                  >
                    {title}
                  </h3>
                  <CaseFigure
                    src={img}
                    alt={`${title}: ${bullets[0]}`}
                    caption={caption}
                    width="wide"
                  />
                  <ul className="fx-bullets">
                    {bullets.map(item => <li key={item}>{item}</li>)}
                  </ul>
                </div>
              ))}
            </Reveal>
          </div>
        </section>

        {/* ── 04 USER EXPERIENCE ──────────────────────────── */}
        <section className="fx-sec fx-sec-alt" id="experience">
          <div className="fx-container">
            <Reveal>
              <p className="fx-sec-label">04 · User Experience</p>
              <h2 className="fx-sec-title">Designed for everyone who walks through the door.</h2>

              <div className="fx-prose" style={{ marginBottom: 32 }}>
                <p>The hardest constraint was the audience range. The same ten seconds of interaction had to land for a kid who can&apos;t read the labels yet and for someone who fights fires for a living, with no instructions and no facilitator standing in between.</p>
              </div>

              <CaseFigure
                src="/projects/fireside/user-flow.png"
                alt="User flow diagram for the Fireside exhibit"
                caption="How visitors move through the exhibit"
                variant="plain"
              />

              <div className="fx-outcomes">
                {[
                  {
                    num: '01',
                    metric: 'Arrival',
                    desc: 'Ambient fire risk visualization draws visitors in from across the room. No action required, just watch. The terrain and the color language do the work.',
                  },
                  {
                    num: '02',
                    metric: 'First touch',
                    desc: 'Physical controls are at the table edge, spatially adjacent to where their effect appears. Rotating a wind dial shows immediate change in fire direction. No instruction needed.',
                  },
                  {
                    num: '03',
                    metric: 'Escalation',
                    desc: 'Visitors naturally want to try more. Simulation mode invites that. Set extreme conditions, watch fire spread fast. The system rewards curiosity without punishing mistakes.',
                  },
                  {
                    num: '04',
                    metric: 'The challenge',
                    desc: 'Intervention mode introduces stakes. A pre-set fire scenario. Limited resources. Real time pressure. Families work together. Either way it lands.',
                  },
                ].map(({ num, metric, desc }) => (
                  <div key={num} className="fx-outcome-item">
                    <div className="fx-outcome-num">{num}</div>
                    <div>
                      <p className="fx-outcome-metric">{metric}</p>
                      <p className="fx-outcome-desc">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* ── 04.5 LIVE SIMULATION ────────────────────────── */}
        <section className="fx-sec" id="simulation">
          <div className="fx-container">
            <Reveal>
              <p className="fx-sec-label">05 · Try the table</p>
              <h2 className="fx-sec-title">The interaction the whole exhibit was built around.</h2>
              <div className="fx-prose" style={{ marginBottom: 28 }}>
                <p>The physical table projected fire spreading across 3D terrain. You couldn&apos;t ship that in a portfolio, so here is the model it ran on, playable. Drop an ignition point, turn the wind, and watch the same cause-and-effect a nine-year-old read in fifteen seconds at the exhibit: fire runs with the wind, races through dry grass, and stalls at the firebreak.</p>
              </div>
              <FiresidePrototype />
            </Reveal>
          </div>
        </section>

        {/* ── 05 iPAD PROTOTYPE ───────────────────────────── */}
        <section className="fx-sec fx-sec-alt" id="prototype">
          <div className="fx-container">
            <Reveal>
              <p className="fx-sec-label">06 · iPad Prototype</p>
              <h2 className="fx-sec-title">The companion interface, for facilitators and deeper learners.</h2>

              <div className="fx-prose" style={{ marginBottom: 32 }}>
                <p>Alongside the physical table, a tablet interface gives facilitators control over exhibit state, and gives curious visitors a way to go deeper: fire science data, case studies from real events, step-by-step mode explanations.</p>
                <p>The iPad screens went through three design phases: first a dashboard-heavy approach that overwhelmed test users, then a stripped-back information-first layout, and finally the current version, which surfaces only what&apos;s needed for the current mode.</p>
              </div>

              <CaseFigure
                src="/projects/fireside/intro-screens.png"
                alt="iPad intro screens for Fireside"
                caption="iPad companion, intro screens"
                variant="browser"
              />

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 40 }}>
                {[
                  '/projects/fireside/intro-screens-2.png',
                  '/projects/fireside/intro-screens-3.png',
                  '/projects/fireside/intro-screens-4.png',
                ].map(src => (
                  <img
                    key={src}
                    src={src}
                    alt="iPad prototype screen"
                    style={{ width: '100%', display: 'block', borderRadius: 10, border: '1px solid var(--border)' }}
                  />
                ))}
              </div>

              <div className="fx-card-grid">
                {[
                  {
                    title: 'Introduction',
                    desc: 'Welcome screen with exhibit overview and mode selection, the only screen with text instructions.',
                  },
                  {
                    title: 'Mode Control',
                    desc: 'Facilitator view: switch modes, reset simulation, set scenario difficulty. Designed for glanceable use.',
                  },
                  {
                    title: 'Fire Data',
                    desc: 'Deep-dive panel: real fire spread data, historical case studies, and the science behind the simulation.',
                  },
                ].map(({ title, desc }) => (
                  <div key={title} className="fx-card-grid-item">
                    <p className="fx-card-grid-title">{title}</p>
                    <p className="fx-card-grid-desc">{desc}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* ── 06 SPATIAL DESIGN ───────────────────────────── */}
        <section className="fx-sec" id="spatial">
          <div className="fx-container">
            <Reveal>
              <p className="fx-sec-label">07 · Spatial Design</p>
              <h2 className="fx-sec-title">The table is the interface.</h2>

              <div className="fx-prose" style={{ marginBottom: 32 }}>
                <p>Most of the interaction design decisions were actually spatial decisions. Where you place the controls relative to where the effects appear teaches users without words. We went through four floor plan iterations before the cause-and-effect loop felt immediate.</p>
              </div>

              <CaseFigure
                src="/projects/fireside/spatial-layout.png"
                alt="Spatial layout diagram for the Fireside exhibit"
                caption="Floor plan and control placement"
                variant="plain"
              />

              <div className="fx-two-col-grid">
                {[
                  {
                    title: 'Control placement',
                    desc: 'Controls live at the table edge directly adjacent to the terrain region they affect. Wind controls on the upwind side. Suppression tools near the settlement. Nothing is abstract.',
                  },
                  {
                    title: 'Material language',
                    desc: 'The terrain surface uses warm earth tones with high-contrast projection. At-risk zones glow amber. Active fire is red-orange. Firebreaks appear in deep blue.',
                  },
                  {
                    title: 'Viewing zones',
                    desc: 'Designed for up to 8 people simultaneously. Primary interaction at the table. Secondary viewing zone has clear sight lines from 3 meters.',
                  },
                  {
                    title: 'Accessibility',
                    desc: 'Table height set for wheelchair access. Controls are large-grip physical knobs, no fine motor precision required.',
                  },
                ].map(({ title, desc }) => (
                  <div key={title} className="fx-two-col-item">
                    <p className="fx-two-col-title">{title}</p>
                    <p className="fx-two-col-desc">{desc}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* ── 07 REFLECTION ───────────────────────────────── */}
        <section className="fx-sec" id="reflection">
          <div className="fx-container">
            <Reveal>
              <p className="fx-sec-label">08 · Reflection</p>
              <h2 className="fx-sec-title">The hardest design problem was the one I didn&apos;t expect.</h2>

              <div className="fx-prose">
                <p>Everything I knew about interface design quietly assumed a flat rectangle. Here the canvas had hills. The projection-on-terrain constraint was genuinely hard and genuinely interesting, I&apos;d never had to think about how pixel density changes meaning when your surface isn&apos;t flat, or how a button reads when it&apos;s cast across a slope.</p>
                <p>Or how a control feels intuitive not because of its label but because of where it sits relative to the effect. Designing for physical space forced me to think spatially in a way that screen design never had.</p>
              </div>

              <div className="fx-reflection-callout">
                <span className="fx-reflection-label">One thing from a real event</span>
                <p>At the first public deployment, a family science night at CU Boulder, a kid rotated the wind dial all the way up in Simulation Mode and watched the fire spread across the whole table in about 15 seconds. He turned to his parent and said &ldquo;oh, that&apos;s why it goes that direction.&rdquo; That was the whole design goal, delivered by a 9-year-old who had never seen the exhibit before. We didn&apos;t change anything after that session.</p>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ── FOOTER ──────────────────────────────────────── */}
        <footer className="fx-footer">
          <div className="fx-container">
            <blockquote className="fx-footer-quote">
              &ldquo;Nobody reads the instructions. They just start touching things.&rdquo;
              <cite>UX research session, Fireside Interactive</cite>
            </blockquote>
            <Link href="/#work" className="fx-footer-back" onClick={() => sessionStorage.setItem('skipIntro', '1')}>
              ← Back to work
            </Link>
          </div>
        </footer>

      </div>
    </>
  )
}
