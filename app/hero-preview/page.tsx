'use client'

import { useState, useRef } from 'react'
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useSpring,
} from 'framer-motion'

// ─── shared constants ───────────────────────────────────────────
const NAME1 = 'SANJANA'
const NAME2 = 'GANGISHETTY'
const ROLE  = 'Product Designer · UX Designer · AI Design'
const TAG   = 'I make hard things feel obvious.'

const STYLES = [
  { id: 0, label: 'Curtain Lift',  desc: 'Characters slide up from a hidden mask — editorial, high-fashion' },
  { id: 1, label: 'Kinetic Pull',  desc: 'Words snap in from opposite sides with spring physics' },
  { id: 2, label: 'Scroll Reveal', desc: 'Oversized name shrinks and lands as you scroll through the section' },
]

// ─── Style 1 — Curtain Lift ──────────────────────────────────────
function CurtainLift({ replay }: { replay: number }) {
  return (
    <div
      key={replay}
      className="w-full h-full flex flex-col items-center justify-center bg-[#3D4B6B] select-none px-8"
    >
      {/* Name line 1 */}
      <div className="leading-none mb-1" style={{ fontSize: 'clamp(52px, 8vw, 108px)' }}>
        {NAME1.split('').map((char, i) => (
          <span key={i} style={{ display: 'inline-block', overflow: 'hidden', lineHeight: 1.1 }}>
            <motion.span
              style={{ display: 'inline-block', fontFamily: 'Georgia, serif', color: '#F8F8F7', letterSpacing: '-0.01em' }}
              initial={{ y: '105%', opacity: 0 }}
              animate={{ y: '0%', opacity: 1 }}
              transition={{ duration: 0.75, delay: 0.1 + i * 0.045, ease: [0.16, 1, 0.3, 1] }}
            >
              {char}
            </motion.span>
          </span>
        ))}
      </div>

      {/* Name line 2 */}
      <div className="leading-none" style={{ fontSize: 'clamp(52px, 8vw, 108px)' }}>
        {NAME2.split('').map((char, i) => (
          <span key={i} style={{ display: 'inline-block', overflow: 'hidden', lineHeight: 1.1 }}>
            <motion.span
              style={{ display: 'inline-block', fontFamily: 'Georgia, serif', color: '#F8F8F7', letterSpacing: '-0.01em' }}
              initial={{ y: '105%', opacity: 0 }}
              animate={{ y: '0%', opacity: 1 }}
              transition={{ duration: 0.75, delay: 0.3 + i * 0.04, ease: [0.16, 1, 0.3, 1] }}
            >
              {char}
            </motion.span>
          </span>
        ))}
      </div>

      {/* Divider */}
      <motion.div
        className="w-16 h-px bg-[#E8A09A] mt-8 mb-6"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.6, delay: 1.0, ease: [0.16, 1, 0.3, 1] }}
        style={{ transformOrigin: 'left' }}
      />

      {/* Role */}
      <div style={{ overflow: 'hidden' }}>
        <motion.p
          style={{ fontFamily: 'Georgia, serif', color: '#A8B5C4', fontSize: 18, fontStyle: 'italic', letterSpacing: '0.01em' }}
          initial={{ y: '100%' }}
          animate={{ y: '0%' }}
          transition={{ duration: 0.65, delay: 1.1, ease: [0.16, 1, 0.3, 1] }}
        >
          {ROLE}
        </motion.p>
      </div>

      {/* Tagline */}
      <motion.p
        style={{ fontFamily: 'Georgia, serif', color: '#6B7A8A', fontSize: 14, marginTop: 12, letterSpacing: '0.04em' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.4 }}
      >
        {TAG}
      </motion.p>
    </div>
  )
}

// ─── Style 2 — Kinetic Pull ──────────────────────────────────────
function KineticPull({ replay }: { replay: number }) {
  return (
    <div
      key={replay}
      className="w-full h-full flex flex-col items-start justify-center bg-[#F8F8F7] select-none px-[8%]"
    >
      {/* SANJANA — flies in from left */}
      <div style={{ overflow: 'hidden' }}>
        <motion.div
          style={{
            fontFamily: 'Georgia, serif',
            fontSize: 'clamp(56px, 9vw, 118px)',
            color: '#3D4B6B',
            lineHeight: 0.95,
            letterSpacing: '-0.02em',
          }}
          initial={{ x: -180, opacity: 0, filter: 'blur(6px)' }}
          animate={{ x: 0, opacity: 1, filter: 'blur(0px)' }}
          transition={{ duration: 0.7, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
        >
          {NAME1}
        </motion.div>
      </div>

      {/* GANGISHETTY — flies in from right */}
      <div style={{ overflow: 'hidden' }}>
        <motion.div
          style={{
            fontFamily: 'Georgia, serif',
            fontSize: 'clamp(56px, 9vw, 118px)',
            color: '#3D4B6B',
            lineHeight: 0.95,
            letterSpacing: '-0.02em',
          }}
          initial={{ x: 180, opacity: 0, filter: 'blur(6px)' }}
          animate={{ x: 0, opacity: 1, filter: 'blur(0px)' }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        >
          {NAME2}
        </motion.div>
      </div>

      {/* Role — flies up from below */}
      <motion.p
        style={{
          fontFamily: 'Georgia, serif',
          fontSize: 'clamp(16px, 1.6vw, 22px)',
          color: '#8898A8',
          fontStyle: 'italic',
          marginTop: 28,
        }}
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.65, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
      >
        {ROLE}
      </motion.p>

      {/* Tagline — fades up after */}
      <motion.p
        style={{
          fontFamily: 'Georgia, serif',
          fontSize: 16,
          color: '#3D4B6B',
          marginTop: 16,
          maxWidth: 480,
          lineHeight: 1.6,
        }}
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.65, delay: 0.75, ease: [0.16, 1, 0.3, 1] }}
      >
        {TAG}
      </motion.p>

      {/* CTAs — pop up last */}
      <motion.div
        style={{ display: 'flex', gap: 16, marginTop: 40 }}
        initial={{ y: 24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.95, ease: [0.16, 1, 0.3, 1] }}
      >
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            padding: '14px 28px',
            background: '#3D4B6B',
            color: '#F8F8F7',
            fontFamily: 'sans-serif',
            fontSize: 11,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            borderRadius: 999,
          }}
        >
          Let&apos;s talk →
        </span>
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            padding: '14px 28px',
            border: '1px solid #3D4B6B',
            color: '#3D4B6B',
            fontFamily: 'sans-serif',
            fontSize: 11,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            borderRadius: 999,
          }}
        >
          See my work
        </span>
      </motion.div>
    </div>
  )
}

// ─── Style 3 — Scroll Reveal ─────────────────────────────────────
function ScrollReveal({ replay }: { replay: number }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ container: containerRef })

  const rawNameSize  = useTransform(scrollYProgress, [0, 0.45], [1, 0.38])
  const nameSize     = useSpring(rawNameSize, { stiffness: 80, damping: 20 })
  const rawNameY     = useTransform(scrollYProgress, [0, 0.45], ['0%', '-18%'])
  const nameY        = useSpring(rawNameY, { stiffness: 80, damping: 20 })
  const rawNameX     = useTransform(scrollYProgress, [0, 0.45], ['0%', '-14%'])
  const nameX        = useSpring(rawNameX, { stiffness: 80, damping: 20 })
  const roleOpacity  = useTransform(scrollYProgress, [0.2, 0.5], [0, 1])
  const roleY        = useTransform(scrollYProgress, [0.2, 0.5], [40, 0])
  const tagOpacity   = useTransform(scrollYProgress, [0.35, 0.6], [0, 1])
  const tagY         = useTransform(scrollYProgress, [0.35, 0.6], [30, 0])
  const ctaOpacity   = useTransform(scrollYProgress, [0.5, 0.72], [0, 1])
  const ctaY         = useTransform(scrollYProgress, [0.5, 0.72], [24, 0])

  return (
    <div
      key={replay}
      ref={containerRef}
      className="w-full h-full overflow-y-scroll"
      style={{ scrollbarWidth: 'none' }}
    >
      {/* Tall scroll track — 3× viewport */}
      <div style={{ height: '300%', background: '#F8F8F7', position: 'relative' }}>

        {/* Sticky hero panel */}
        <div style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden' }}>

          {/* Scroll hint */}
          <motion.div
            style={{
              position: 'absolute',
              bottom: 32,
              left: '50%',
              translateX: '-50%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 8,
              opacity: useTransform(scrollYProgress, [0, 0.15], [1, 0]),
            }}
          >
            <span style={{ fontFamily: 'sans-serif', fontSize: 9, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#A8B5C4' }}>scroll</span>
            <motion.div
              style={{ width: 1, height: 36, background: '#A8B5C4', transformOrigin: 'top' }}
              animate={{ scaleY: [0.3, 1, 0.3] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            />
          </motion.div>

          {/* Name — oversized, scales + drifts left as you scroll */}
          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <motion.div
              style={{ scale: nameSize, y: nameY, x: nameX, textAlign: 'center' }}
            >
              <div
                style={{
                  fontFamily: 'Georgia, serif',
                  fontSize: 'clamp(64px, 10.5vw, 138px)',
                  color: '#3D4B6B',
                  lineHeight: 0.92,
                  letterSpacing: '-0.02em',
                }}
              >
                <div>{NAME1}</div>
                <div>{NAME2}</div>
              </div>
            </motion.div>
          </div>

          {/* Role — fades in mid-scroll */}
          <motion.div
            style={{
              position: 'absolute',
              bottom: '34%',
              left: '8%',
              opacity: roleOpacity,
              y: roleY,
            }}
          >
            <p style={{
              fontFamily: 'Georgia, serif',
              fontSize: 'clamp(15px, 1.4vw, 20px)',
              color: '#8898A8',
              fontStyle: 'italic',
            }}>
              {ROLE}
            </p>
          </motion.div>

          {/* Tagline */}
          <motion.div
            style={{
              position: 'absolute',
              bottom: '27%',
              left: '8%',
              opacity: tagOpacity,
              y: tagY,
              maxWidth: 440,
            }}
          >
            <p style={{ fontFamily: 'Georgia, serif', fontSize: 16, color: '#3D4B6B', lineHeight: 1.65 }}>
              {TAG}
            </p>
          </motion.div>

          {/* CTAs */}
          <motion.div
            style={{
              position: 'absolute',
              bottom: '16%',
              left: '8%',
              opacity: ctaOpacity,
              y: ctaY,
              display: 'flex',
              gap: 16,
            }}
          >
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '14px 28px', background: '#3D4B6B', color: '#F8F8F7',
              fontFamily: 'sans-serif', fontSize: 11, letterSpacing: '0.1em',
              textTransform: 'uppercase', borderRadius: 999,
            }}>
              Let&apos;s talk →
            </span>
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '14px 28px', border: '1px solid #3D4B6B', color: '#3D4B6B',
              fontFamily: 'sans-serif', fontSize: 11, letterSpacing: '0.1em',
              textTransform: 'uppercase', borderRadius: 999,
            }}>
              See my work
            </span>
          </motion.div>

        </div>
      </div>
    </div>
  )
}

// ─── Main preview page ───────────────────────────────────────────
export default function HeroPreviewPage() {
  const [active, setActive] = useState(0)
  const [replay, setReplay] = useState(0)

  return (
    <div className="fixed inset-0 flex flex-col bg-[#F8F8F7]" style={{ fontFamily: 'sans-serif' }}>

      {/* Top bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 24px',
          height: 56,
          borderBottom: '1px solid rgba(61,75,107,0.08)',
          background: 'rgba(248,248,247,0.9)',
          backdropFilter: 'blur(12px)',
          flexShrink: 0,
          zIndex: 10,
        }}
      >
        <span style={{ fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#8898A8' }}>
          Hero Animation Preview
        </span>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: 4 }}>
          {STYLES.map((s) => (
            <button
              key={s.id}
              onClick={() => { setActive(s.id); setReplay(r => r + 1) }}
              style={{
                padding: '6px 16px',
                borderRadius: 999,
                border: 'none',
                cursor: 'pointer',
                fontSize: 11,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                transition: 'all 0.2s',
                background: active === s.id ? '#3D4B6B' : 'transparent',
                color: active === s.id ? '#F8F8F7' : '#8898A8',
              }}
            >
              {s.label}
            </button>
          ))}
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <button
            onClick={() => setReplay(r => r + 1)}
            style={{
              padding: '6px 14px',
              borderRadius: 999,
              border: '1px solid rgba(61,75,107,0.2)',
              background: 'transparent',
              cursor: 'pointer',
              fontSize: 11,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: '#3D4B6B',
            }}
          >
            ↺ Replay
          </button>
          <a
            href="/"
            style={{
              padding: '6px 14px',
              borderRadius: 999,
              border: '1px solid rgba(61,75,107,0.2)',
              background: 'transparent',
              textDecoration: 'none',
              fontSize: 11,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: '#3D4B6B',
            }}
          >
            ← Back to portfolio
          </a>
        </div>
      </div>

      {/* Description bar */}
      <div style={{
        padding: '10px 24px',
        borderBottom: '1px solid rgba(61,75,107,0.06)',
        background: '#F0F0EF',
        flexShrink: 0,
      }}>
        <AnimatePresence mode="wait">
          <motion.p
            key={active}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.25 }}
            style={{ fontSize: 12, color: '#8898A8', margin: 0 }}
          >
            <strong style={{ color: '#3D4B6B' }}>{STYLES[active].label}:</strong>{' '}
            {STYLES[active].desc}
            {active === 2 && <span style={{ color: '#E8A09A', marginLeft: 8 }}>↓ Scroll inside the preview to trigger the animation</span>}
          </motion.p>
        </AnimatePresence>
      </div>

      {/* Preview area */}
      <div style={{ flex: 1, overflow: 'hidden', position: 'relative' }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={`${active}-${replay}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{ width: '100%', height: '100%' }}
          >
            {active === 0 && <CurtainLift replay={replay} />}
            {active === 1 && <KineticPull replay={replay} />}
            {active === 2 && <ScrollReveal replay={replay} />}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom style picker — 3 cards */}
      <div style={{
        display: 'flex',
        gap: 1,
        borderTop: '1px solid rgba(61,75,107,0.08)',
        flexShrink: 0,
      }}>
        {STYLES.map((s) => (
          <button
            key={s.id}
            onClick={() => { setActive(s.id); setReplay(r => r + 1) }}
            style={{
              flex: 1,
              padding: '14px 20px',
              border: 'none',
              borderTop: active === s.id ? '2px solid #E8A09A' : '2px solid transparent',
              background: active === s.id ? '#F8F8F7' : '#F0F0EF',
              cursor: 'pointer',
              textAlign: 'left',
              transition: 'all 0.2s',
            }}
          >
            <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: active === s.id ? '#3D4B6B' : '#8898A8', margin: '0 0 2px' }}>
              {String(s.id + 1).padStart(2, '0')} — {s.label}
            </p>
            <p style={{ fontSize: 11, color: '#A8B5C4', margin: 0 }}>{s.desc}</p>
          </button>
        ))}
      </div>
    </div>
  )
}
