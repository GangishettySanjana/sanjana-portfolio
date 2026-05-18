'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

function NoiseGradientBG() {
  const gradientCanvasRef = useRef<HTMLCanvasElement>(null)
  const noiseCanvasRef = useRef<HTMLCanvasElement>(null)
  const rafRef = useRef<number>(0)

  useEffect(() => {
    const canvas = gradientCanvasRef.current
    const noiseCanvas = noiseCanvasRef.current
    if (!canvas || !noiseCanvas) return
    const ctx = canvas.getContext('2d')
    const nCtx = noiseCanvas.getContext('2d')
    if (!ctx || !nCtx) return

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
      noiseCanvas.width = noiseCanvas.offsetWidth
      noiseCanvas.height = noiseCanvas.offsetHeight
      // Draw noise once (static grain)
      const img = nCtx.createImageData(noiseCanvas.width, noiseCanvas.height)
      for (let i = 0; i < img.data.length; i += 4) {
        const v = Math.random() * 255
        img.data[i] = v; img.data[i+1] = v; img.data[i+2] = v; img.data[i+3] = 255
      }
      nCtx.putImageData(img, 0, 0)
    }

    // Blobs in the palette colors
    const blobs = [
      { x: 0.15, y: 0.2,  r: 0.6,  color: [249, 246, 242] as [number,number,number], phase: 0,   speed: 0.28 }, // off-white
      { x: 0.75, y: 0.15, r: 0.55, color: [157, 213, 220] as [number,number,number], phase: 1.8,  speed: 0.22 }, // powder blue
      { x: 0.5,  y: 0.75, r: 0.5,  color: [124, 185, 232] as [number,number,number], phase: 3.4,  speed: 0.18 }, // soft blue
      { x: 0.88, y: 0.8,  r: 0.45, color: [157, 213, 220] as [number,number,number], phase: 0.9,  speed: 0.24 }, // powder blue
      { x: 0.1,  y: 0.85, r: 0.4,  color: [124, 185, 232] as [number,number,number], phase: 2.5,  speed: 0.2  }, // soft blue
    ]

    function draw(t: number) {
      if (!ctx || !canvas) return
      const w = canvas.width
      const h = canvas.height
      ctx.clearRect(0, 0, w, h)

      // Base: off-white
      ctx.fillStyle = '#F9F6F2'
      ctx.fillRect(0, 0, w, h)

      blobs.forEach(b => {
        const x = (b.x + Math.sin(t * b.speed + b.phase) * 0.12) * w
        const y = (b.y + Math.cos(t * b.speed * 0.8 + b.phase) * 0.1) * h
        const r = b.r * Math.max(w, h)
        const g = ctx.createRadialGradient(x, y, 0, x, y, r)
        const [r0, g0, b0] = b.color
        g.addColorStop(0, `rgba(${r0},${g0},${b0},0.7)`)
        g.addColorStop(1, `rgba(${r0},${g0},${b0},0)`)
        ctx.fillStyle = g
        ctx.beginPath()
        ctx.arc(x, y, r, 0, Math.PI * 2)
        ctx.fill()
      })

      rafRef.current = requestAnimationFrame(t2 => draw(t2 / 1000))
    }

    resize()
    window.addEventListener('resize', resize)
    rafRef.current = requestAnimationFrame(t => draw(t / 1000))

    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
      {/* Animated gradient blobs */}
      <canvas
        ref={gradientCanvasRef}
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
      />
      {/* Static grain overlay */}
      <canvas
        ref={noiseCanvasRef}
        style={{
          position: 'absolute', inset: 0,
          width: '100%', height: '100%',
          opacity: 0.04,
          mixBlendMode: 'multiply',
        }}
      />
    </div>
  )
}

export default function Hero() {
  return (
    <div style={{ background: '#F9F6F2' }}>
      <section
        id="home"
        className="hero-section"
        style={{
          margin: 0, borderRadius: 0, overflow: 'hidden',
          position: 'relative', display: 'flex', flexDirection: 'column',
          minHeight: '100vh',
          background: 'transparent',
        }}
      >
        <style>{`
          @keyframes fadeUp {
            from { opacity: 0; transform: translateY(12px); }
            to   { opacity: 1; transform: translateY(0); }
          }
          @keyframes fadeIn {
            from { opacity: 0; }
            to   { opacity: 1; }
          }
          @keyframes ping {
            75%, 100% { transform: scale(2.2); opacity: 0; }
          }
        `}</style>

        <NoiseGradientBG />


        {/* Main content — left aligned */}
        <div style={{
          flex: 1, position: 'relative', zIndex: 5,
          display: 'flex', alignItems: 'stretch',
          width: '100%',
        }}>
        <div style={{
          display: 'flex', flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          width: '100%',
          maxWidth: 1320,
          margin: '0 auto',
          padding: 'clamp(100px, 14vh, 140px) clamp(24px, 5vw, 80px) clamp(80px, 10vh, 120px)',
        }}>

          {/* Greeting */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontFamily: 'var(--font-body), Georgia, serif',
              fontSize: 'clamp(14px, 1.2vw, 17px)',
              fontWeight: 400,
              color: 'rgba(20,28,50,0.6)',
              margin: '0 0 20px',
            }}
          >
            Hello, I am Sanjana
          </motion.p>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontFamily: 'var(--font-heading), sans-serif',
              fontSize: 'clamp(36px, 4.8vw, 80px)',
              fontWeight: 800,
              color: '#111827',
              lineHeight: 1.05,
              letterSpacing: '-0.03em',
              margin: '0 0 clamp(20px, 3vw, 32px)',
            }}
          >
            <span style={{ display: 'block' }}>Complex doesn&apos;t</span>
            <span style={{ display: 'block', whiteSpace: 'nowrap' }}>have to feel complex.</span>
          </motion.h1>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontFamily: 'var(--font-body), Georgia, serif',
              fontSize: 'clamp(15px, 1.4vw, 19px)',
              fontWeight: 400,
              color: 'rgba(42,53,80,0.8)',
              lineHeight: 1.65,
              maxWidth: 560,
              margin: '0 0 36px',
            }}
          >
            I design AI and B2B products that earn trust fast — through research, clarity, and decisions that hold up under scrutiny.
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}
          >
            <a href="#work" style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '13px 28px',
              background: 'rgba(255,255,255,0.55)',
              color: '#111827',
              fontFamily: 'var(--font-label), sans-serif',
              fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase' as const,
              borderRadius: 999, textDecoration: 'none',
              border: '1px solid rgba(0,0,0,0.1)',
              backdropFilter: 'blur(8px)',
              transition: 'transform 0.2s, background 0.2s',
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.background = 'rgba(255,255,255,0.8)' }}
              onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.background = 'rgba(255,255,255,0.55)' }}
            >
              See my work
            </a>
          </motion.div>

          {/* Location */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            style={{
              fontFamily: 'var(--font-label), sans-serif',
              fontSize: 9, letterSpacing: '0.14em',
              textTransform: 'uppercase' as const,
              color: 'rgba(42,53,80,0.5)',
              marginTop: 28,
            }}
          >
            Based in Seattle · Open to relocation · CU Boulder MS &apos;25
          </motion.p>
        </div>
        </div>

        {/* Scroll indicator */}
        <div style={{
          position: 'absolute', bottom: 28, left: 'clamp(24px, 5vw, 80px)',
          display: 'flex', alignItems: 'center', gap: 10,
          zIndex: 10,
          animation: 'fadeIn 1s 1s cubic-bezier(0.16,1,0.3,1) both',
          opacity: 0,
        }}>
          <motion.div
            style={{ width: 30, height: 1, background: 'rgba(42,53,80,0.3)', transformOrigin: 'left' }}
            animate={{ scaleX: [0.3, 1, 0.3] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          />
          <span style={{ fontFamily: 'var(--font-label), sans-serif', fontSize: 8, letterSpacing: '0.18em', textTransform: 'uppercase' as const, color: 'rgba(42,53,80,0.4)' }}>scroll</span>
        </div>

        {/* Fade to white */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: 180,
          background: 'linear-gradient(to bottom, transparent 0%, rgba(249,246,242,0.7) 60%, #FFFFFF 100%)',
          pointerEvents: 'none', zIndex: 1,
        }} />
      </section>
    </div>
  )
}
