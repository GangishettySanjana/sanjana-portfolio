'use client'
import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

/* everything she brings, auto-rotating right rail */
const STRENGTHS = [
  'Designs that win the room',
  'Strategy before pixels',
  'Figma → Code',
  "Solved before it's sketched",
  'Builds AI people actually trust',
  'At home in the messy middle',
  'Sweats the last 2 pixels',
  'Asks why before how',
  'Watches users, not trends',
  'Seven years, still curious',
]

function RotatingStrengths() {
  const ROW = 30, VISIBLE = 3
  const [idx, setIdx] = useState(0)
  const [anim, setAnim] = useState(true)
  useEffect(() => {
    const t = setInterval(() => setIdx((i) => i + 1), 1700)
    return () => clearInterval(t)
  }, [])
  useEffect(() => {
    if (idx === STRENGTHS.length) {
      const t = setTimeout(() => { setAnim(false); setIdx(0) }, 560)
      return () => clearTimeout(t)
    }
    if (!anim) {
      const r = requestAnimationFrame(() => requestAnimationFrame(() => setAnim(true)))
      return () => cancelAnimationFrame(r)
    }
  }, [idx, anim])
  const list = [...STRENGTHS, ...STRENGTHS.slice(0, VISIBLE)]
  return (
    <div style={{
      height: ROW * VISIBLE, overflow: 'hidden', textAlign: 'right',
      WebkitMaskImage: 'linear-gradient(180deg, transparent 0%, #000 28%, #000 72%, transparent 100%)',
      maskImage: 'linear-gradient(180deg, transparent 0%, #000 28%, #000 72%, transparent 100%)',
    }}>
      <div style={{ transform: `translateY(-${idx * ROW}px)`, transition: anim ? 'transform 0.5s cubic-bezier(0.16,1,0.3,1)' : 'none' }}>
        {list.map((t, i) => (
          <div key={i} style={{
            height: ROW, lineHeight: `${ROW}px`,
            fontFamily: "'Cabinet Grotesk', sans-serif", fontSize: 12, fontWeight: 500,
            letterSpacing: '0.06em', color: 'rgba(13,13,13,0.5)', whiteSpace: 'nowrap',
          }}>{t}</div>
        ))}
      </div>
    </div>
  )
}

function wfStyle(w: number, h: number, color = 'rgba(13,13,13,0.3)'): React.CSSProperties {
  return { width: w, height: h, maxWidth: '70vw', border: `1.5px dashed ${color}`, borderRadius: 4, background: 'transparent' }
}
function lbl(color = 'rgba(13,13,13,0.35)', top = -16): React.CSSProperties {
  return { position: 'absolute', top, left: 0, fontFamily: "ui-monospace, 'SF Mono', Menlo, monospace", fontSize: 9, color, letterSpacing: '0.04em' }
}

export default function IntroCurtain({ onComplete }: { onComplete: () => void }) {
  const rootRef = useRef<HTMLDivElement>(null)
  const tlRef = useRef<gsap.core.Timeline | null>(null)
  const onCompleteRef = useRef(onComplete)
  onCompleteRef.current = onComplete
  const [visible, setVisible] = useState(true)
  const startedRef = useRef(false)

  function run() {
    if (tlRef.current) tlRef.current.kill()
    const q = gsap.utils.selector(rootRef)
    const tl = gsap.timeline()
    tlRef.current = tl

    // reset
    gsap.set(q('.scenery-video'), { opacity: 0, scale: 1.12 })
    gsap.set(q('.scenery-overlay'), { opacity: 1 })
    gsap.set(q('.bl-grid'), { opacity: 0 })
    gsap.set(q('.wf-box'), { opacity: 0, scale: 0.96 })
    ;(q('.wf-box') as HTMLElement[]).forEach((b) => { b.classList.remove('sk-anim'); b.style.background = 'transparent'; b.style.borderColor = '' })
    gsap.set(q('.wf-label'), { opacity: 0, y: 4 })
    gsap.set(q('.wf-dim'), { opacity: 0, scaleX: 0 })
    gsap.set(q('.real-eyebrow'), { opacity: 0 })
    gsap.set(q('.real-line'), { width: 0 })
    gsap.set(q('.name-cover'), { scaleX: 1 })
    gsap.set(q('.real-name'), { opacity: 1 })
    gsap.set(q('.real-sub'), { opacity: 0, y: 6 })
    gsap.set(q('.tag-rail'), { opacity: 0, x: 14 })
    gsap.set(q('.log-line'), { opacity: 0, x: -6 })
    gsap.set(q('.shipped'), { opacity: 0, scale: 0.9 })

    tl
      .to(q('.scenery-video'), { opacity: 0.18, duration: 1.0, ease: 'power2.out' }, 0)
      .to(q('.scenery-video'), { scale: 1.0, duration: 6.0, ease: 'power1.out' }, 0)
      .to(q('.bl-grid'), { opacity: 1, duration: 0.4, ease: 'power2.out' }, 0)
      .to(q('.log-1'), { opacity: 1, x: 0, duration: 0.3 }, 0.1)
      .to(q('.wf-box'), { opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(1.8)', stagger: 0.12 }, 0.35)
      .to(q('.wf-label'), { opacity: 1, y: 0, duration: 0.35, stagger: 0.1 }, 0.5)
      .to(q('.wf-dim'), { opacity: 1, scaleX: 1, duration: 0.45, ease: 'power2.out', stagger: 0.1 }, 0.7)
      .to(q('.log-2'), { opacity: 1, x: 0, duration: 0.3 }, 0.9)
      // solidify → shimmering skeleton
      .to(q('.wf-box'), { borderColor: 'transparent', duration: 0.3, stagger: 0.08 }, 1.6)
      .add(() => {
        (q('.wf-box') as HTMLElement[]).forEach((b) => {
          b.style.background = 'linear-gradient(100deg, #EFEBE1 25%, #FBFAF6 50%, #EFEBE1 75%)'
          b.style.backgroundSize = '220% 100%'
          b.classList.add('sk-anim')
        })
      }, 1.6)
      .to(q('.wf-label'), { opacity: 0, duration: 0.25 }, 1.6)
      .to(q('.wf-dim'), { opacity: 0, duration: 0.25 }, 1.6)
      .to(q('.log-3'), { opacity: 1, x: 0, duration: 0.3 }, 1.7)
      .to(q('.color-bloom'), { opacity: 1, duration: 1.2, ease: 'power2.out' }, 1.7)
      // resolve
      .to(q('.wf-eyebrow'), { opacity: 0, duration: 0.3 }, 2.2)
      .to(q('.real-eyebrow'), { opacity: 1, duration: 0.4, ease: 'power2.out' }, 2.25)
      .to(q('.real-line'), { width: 'clamp(160px, 24vw, 340px)', duration: 0.6, ease: 'power3.out' }, 2.3)
      .to(q('.wf-name'), { opacity: 0, duration: 0.2 }, 2.45)
      .to(q('.name-cover'), { scaleX: 0, transformOrigin: 'right center', duration: 0.7, ease: 'power4.inOut' }, 2.5)
      .to(q('.wf-sub'), { opacity: 0, duration: 0.3 }, 2.7)
      .to(q('.real-sub'), { opacity: 1, y: 0, duration: 0.45, ease: 'power3.out' }, 2.8)
      .to(q('.tag-rail'), { opacity: 1, x: 0, duration: 0.6, ease: 'power3.out' }, 2.9)
      .to(q('.log-4'), { opacity: 1, x: 0, duration: 0.3 }, 3.0)
      // ship
      .to(q('.bl-grid'), { opacity: 0, duration: 0.6 }, 3.4)
      .to(q('.scenery-video'), { opacity: 0.5, duration: 1.2, ease: 'power2.out' }, 3.4)
      .to(q('.scenery-overlay'), { opacity: 0.72, duration: 1.2, ease: 'power2.out' }, 3.4)
      .to(q('.shipped'), { opacity: 1, scale: 1, duration: 0.45, ease: 'back.out(2)' }, 3.5)
      .to(q('.log-5'), { opacity: 1, x: 0, duration: 0.3 }, 3.5)
      // hold on the shipped frame
      .to({}, { duration: 1.4 })
      // curtain lifts, reveal the hero
      .to(rootRef.current, {
        yPercent: -100, duration: 1.0, ease: 'power4.inOut',
        onStart: () => { onCompleteRef.current?.() },
      })
      .call(() => { setVisible(false) })
  }

  useEffect(() => {
    if (startedRef.current) return
    startedRef.current = true

    // Play the curtain only ONCE per session. Skip it if it has already played,
    // or if a project page explicitly asked to skip on the way back.
    if (typeof window !== 'undefined' && (sessionStorage.getItem('introSeen') || sessionStorage.getItem('skipIntro'))) {
      sessionStorage.removeItem('skipIntro')
      setVisible(false)  // curtain unmounts; the homepage reveals its own hero
      return
    }

    // mark as seen up front so navigating away mid-curtain still won't replay it
    try { sessionStorage.setItem('introSeen', '1') } catch { /* storage unavailable */ }

    // force the scenery video to play (muted autoplay); retry on events + interaction
    const vid = rootRef.current?.querySelector('.scenery-video') as HTMLVideoElement | null
    const tryPlay = () => { if (vid && vid.tagName === 'VIDEO') { const p = vid.play(); if (p && p.catch) p.catch(() => {}) } }
    if (vid && vid.tagName === 'VIDEO') {
      vid.muted = true; vid.defaultMuted = true; vid.playsInline = true
      tryPlay()
      vid.addEventListener('canplay', tryPlay)
      vid.addEventListener('loadeddata', tryPlay)
      document.addEventListener('pointerdown', tryPlay)
    }

    // auto-start the experience, no gate, no friction
    run()

    return () => {
      if (tlRef.current) tlRef.current.kill()
      if (vid) { vid.removeEventListener('canplay', tryPlay); vid.removeEventListener('loadeddata', tryPlay) }
      document.removeEventListener('pointerdown', tryPlay)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const skip = () => {
    if (tlRef.current) tlRef.current.kill()
    onCompleteRef.current?.()
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div ref={rootRef} style={{
      position: 'fixed', inset: 0, background: '#faf8f4', overflow: 'hidden',
      fontFamily: "'Satoshi', sans-serif", zIndex: 9500, willChange: 'transform',
    }}>
      <style>{`
        .sk-shimmer { background: linear-gradient(100deg, #EFEBE1 25%, #FBFAF6 50%, #EFEBE1 75%); background-size: 220% 100%; animation: skShimmer 1.4s linear infinite; }
        .sk-anim { animation: skShimmer 1.4s linear infinite; }
        @keyframes skShimmer { 0% { background-position: 220% 0 } 100% { background-position: -220% 0 } }
        @media (max-width: 700px) {
          .intro-log { font-size: 9px !important; gap: 3px !important; top: 28px !important; left: 20px !important; }
          .tag-rail { display: none !important; }
          .intro-bottom { left: 20px !important; right: 20px !important; bottom: 16vh !important; }
          .intro-name-real { font-size: 34px !important; white-space: normal !important; line-height: 1.06 !important; }
          .wf-name-box { width: 70vw !important; height: 64px !important; }
          .wf-dim-tick { width: 70vw !important; }
        }
      `}</style>

      {/* Green-landscape scenery, washed bright; GSAP fades/Ken-Burns it via .scenery-video */}
      <video className="scenery-video" muted playsInline autoPlay loop preload="auto"
        src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260328_083109_283f3553-e28f-428b-a723-d639c617eb2b.mp4"
        style={{
          position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover',
          zIndex: 0, opacity: 0, pointerEvents: 'none', filter: 'brightness(1.25) saturate(0.78) contrast(0.96)',
        }} />
      <div className="scenery-overlay" style={{
        position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none',
        background: 'radial-gradient(120% 80% at 50% 38%, rgba(255,255,255,0.4) 0%, rgba(250,248,244,0.82) 55%, #faf8f4 100%)',
      }} />
      <div className="bl-grid" style={{
        position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none',
        backgroundImage: 'radial-gradient(rgba(13,13,13,0.10) 1px, transparent 1px)', backgroundSize: '26px 26px',
      }} />
      <div className="color-bloom" style={{
        position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none', opacity: 0,
        background: 'radial-gradient(75% 65% at 20% 88%, rgba(189,173,143,0.12) 0%, transparent 60%)',
      }} />

      {/* Build log */}
      <div className="intro-log" style={{
        position: 'absolute', top: 'clamp(40px, 7vh, 90px)', left: 'clamp(32px, 6vw, 96px)', zIndex: 5,
        display: 'flex', flexDirection: 'column', gap: 5,
        fontFamily: "ui-monospace, 'SF Mono', Menlo, monospace", fontSize: 11, color: 'rgba(13,13,13,0.4)', letterSpacing: '0.02em',
      }}>
        <span className="log-line log-1">&gt; understanding the user</span>
        <span className="log-line log-2">&gt; mapping the flow</span>
        <span className="log-line log-3">&gt; thinking through edge cases</span>
        <span className="log-line log-4">&gt; analyzing trade-offs</span>
        <span className="log-line log-5" style={{ color: '#0d0d0d', fontWeight: 600 }}>&gt; designed &amp; shipped</span>
      </div>

      {/* Right rail, rotating strengths */}
      <div className="tag-rail" style={{ position: 'absolute', right: 'clamp(32px, 6vw, 96px)', top: 'clamp(56px, 9vh, 120px)', zIndex: 4 }}>
        <RotatingStrengths />
      </div>

      {/* Bottom-left block */}
      <div className="intro-bottom" style={{ position: 'absolute', left: 'clamp(32px, 6vw, 96px)', bottom: 'clamp(56px, 10vh, 120px)', zIndex: 4 }}>
        <div style={{ position: 'relative', height: 16, marginBottom: 14 }}>
          <div className="wf-box wf-eyebrow" style={wfStyle(150, 12, 'rgba(13,13,13,0.18)')} />
          <span className="wf-label" style={lbl('rgba(13,13,13,0.35)')}>eyebrow</span>
          <div className="real-eyebrow" style={{
            position: 'absolute', top: 0, left: 0, fontFamily: "'Cabinet Grotesk', sans-serif",
            fontSize: 10, fontWeight: 500, letterSpacing: '0.26em', color: 'rgba(13,13,13,0.45)',
          }}>PORTFOLIO · 2026</div>
        </div>
        <div className="real-line" style={{ height: 1, background: 'rgba(13,13,13,0.22)', marginBottom: 16, width: 0 }} />
        <div style={{ position: 'relative', marginBottom: 16 }}>
          <div className="wf-box wf-name wf-name-box" style={{ ...wfStyle(560, 86, 'rgba(13,13,13,0.18)'), position: 'relative' }}>
            <span className="wf-label" style={lbl('rgba(13,13,13,0.35)', -18)}>h1.name</span>
          </div>
          <div style={{ position: 'absolute', top: 0, left: 0, overflow: 'hidden' }}>
            <div className="real-name intro-name-real" style={{
              fontFamily: "'NCL Gasdrifo', Georgia, serif", fontSize: 'clamp(48px, 7.5vw, 104px)',
              fontWeight: 400, color: '#0d0d0d', letterSpacing: '0.005em', lineHeight: 1, whiteSpace: 'nowrap',
            }}>Sanjana Gangishetty</div>
            <div className="name-cover sk-shimmer" style={{ position: 'absolute', inset: 0, transformOrigin: 'right center' }} />
          </div>
        </div>
        <div style={{ position: 'relative', height: 22 }}>
          <div className="wf-box wf-sub" style={wfStyle(120, 16, 'rgba(13,13,13,0.18)')} />
          <span className="wf-label" style={lbl('rgba(13,13,13,0.35)')}>p.role</span>
          <div className="real-sub" style={{
            position: 'absolute', top: 0, left: 0, fontFamily: "'Satoshi', sans-serif",
            fontSize: 'clamp(13px, 1.3vw, 17px)', fontWeight: 400, fontStyle: 'italic', color: 'rgba(13,13,13,0.5)',
          }}>Product Designer</div>
        </div>
        <div className="wf-dim wf-dim-tick" style={{
          position: 'absolute', left: 0, bottom: -2, width: 560, height: 1,
          background: 'repeating-linear-gradient(90deg, rgba(13,13,13,0.3) 0 4px, transparent 4px 8px)', transformOrigin: 'left center',
        }} />
      </div>

      {/* shipped stamp */}
      <div className="shipped" style={{
        position: 'absolute', right: 'clamp(32px, 6vw, 96px)', bottom: 'clamp(40px, 6vh, 70px)', zIndex: 6,
        fontFamily: "ui-monospace, 'SF Mono', Menlo, monospace", fontSize: 11, fontWeight: 600,
        color: '#0d0d0d', border: '1px solid rgba(13,13,13,0.2)', borderRadius: 999, padding: '6px 14px',
        display: 'flex', alignItems: 'center', gap: 7,
      }}>
        <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#4ade80', display: 'block' }} />
        SHIPPED
      </div>

      {/* Skip, quiet, bottom center */}
      <button onClick={skip} style={{
        position: 'absolute', bottom: 'clamp(20px, 3vh, 34px)', left: '50%', transform: 'translateX(-50%)', zIndex: 30,
        fontFamily: "'Satoshi', sans-serif", fontSize: 11, fontWeight: 500, letterSpacing: '0.14em',
        textTransform: 'uppercase', color: 'rgba(13,13,13,0.32)', background: 'none', border: 'none', cursor: 'pointer',
      }}>Skip</button>

    </div>
  )
}
