'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import Contact from '@/components/Contact'

const timeline = [
  {
    year: '2018',
    title: 'Interior design. Yes, interior design.',
    whisper: 'Woxsen School of Arts and Design. Four years.',
    detail: 'Four years studying interior design. Rooms, materials, how light shifts when you change the ceiling height. Most of the job was figuring out what someone wanted a place to feel like before they had words for it. I liked it a lot. I just didn\'t know it was also training me for something else.',
    tag: 'Education',
    color: '#A880D4',
    photo: '/journey/2018-school.jpg',
    pivot: false,
  },
  {
    year: '2020',
    title: 'COVID hit. Online school turned out to be fine.',
    whisper: 'Most people hated it. I did not.',
    detail: 'Sketchbooks, Zoom critiques, late nights going down design rabbit holes. Honestly a good year for me. I graduated with more clarity than I had going in.',
    tag: 'Education',
    color: '#A880D4',
    photo: '/journey/2020-covid.jpg',
    pivot: false,
  },
  {
    year: '2022',
    title: 'Graduated. First class with distinction.',
    whisper: 'Interior designer on paper. Curious about everything else.',
    detail: 'Walked out with first class distinction and no real plan. Three months later I started an internship that answered a question I didn\'t know I was asking.',
    tag: 'Education',
    color: '#A880D4',
    photo: '/journey/2022-grad-ceremony.jpg',
    pivot: false,
  },
  {
    year: '2022',
    title: 'Tell Design Tales. Everything shifts.',
    whisper: 'Three months. One UX project. Pretty obvious from there.',
    detail: 'My first internship put me on a UX project for the studio\'s website. I just liked it. Like, genuinely, immediately. Four years thinking about how spaces make people feel. Turns out that\'s basically what UX is. Different medium, same question.',
    tag: 'Work',
    color: '#2BB5C2',
    photo: '/journey/2022-telltales.jpg',
    pivot: true,
  },
  {
    year: '2022',
    title: 'Google UX Certificate.',
    whisper: 'Aug 2, 2022. Foundations of User Experience Design. Coursera verified.',
    detail: 'Got the Google UX cert right after. Screener surveys, usability testing, journey maps. It put names to things I\'d already been doing by feel.',
    tag: 'Education',
    color: '#A880D4',
    photo: '/journey/2022-google-cert.jpg',
    pivot: false,
  },
  {
    year: '2022',
    title: 'Aura. MySassy Interiors. Six projects, mostly solo.',
    whisper: 'Bouquet app, six interiors, one acceptance email.',
    detail: 'Built Aura, a bouquet customization app for a Hyderabad florist. Then a full-time role at MySassy Interiors where I ran six projects on my own. The interior design background kept showing up in ways I didn\'t expect. I was applying to master\'s programs the whole time. Eventually I got in.',
    tag: 'Work',
    color: '#2BB5C2',
    pivot: false,
  },
  {
    year: '2023',
    title: 'CU Boulder. Moved to Colorado.',
    whisper: 'One overstuffed suitcase. The Rockies.',
    detail: 'Packed everything and moved to Boulder for the master\'s program. Two years on AI tools, interactive exhibits, product launches. Being the only person in the room who\'d designed physical spaces mattered more than I thought it would.',
    tag: 'Education',
    color: '#A880D4',
    photo: '/journey/2023-boulder.jpg',
    pivot: false,
  },
  {
    year: '2025',
    title: 'MS, Information and Learning Technologies.',
    whisper: 'Five years. Two countries. One direction.',
    detail: 'FlairX, Fireside Interactive, GetUp. AI recruiter workflows, a wildfire simulation exhibit, a celebrity product launch. Graduated. The work spread across a lot of industries, but it kept circling back to the same question: what does this person actually need?',
    tag: 'Education',
    color: '#A880D4',
    photo: '/journey/2025-grad.jpg',
    pivot: false,
  },
  {
    year: 'Now',
    title: 'Looking for the right team.',
    whisper: 'Open to work. Standards intact. Coffee: non-negotiable.',
    detail: 'I want to work somewhere that cares about the difference between something that technically works and something that\'s actually good. If that sounds like your team, let\'s talk.',
    tag: 'Open',
    color: '#4ade80',
    pivot: false,
  },
]

const principles = [
  {
    title: 'Research first',
    body: "I don't start in Figma. I start with the people who'll use the thing. User interviews, journey maps, screener surveys. The answers usually tell you what to build.",
  },
  {
    title: 'AI-augmented workflows',
    body: "I use Claude, Lovable, Replit, v0, and Bolt as real parts of my process. To prototype faster, synthesize research, and pressure-test copy before a line of UI gets drawn. A tool is a tool.",
  },
  {
    title: 'Systems thinking',
    body: "I design components, not screens. If something works once and breaks in another context, it wasn't designed. It was decorated.",
  },
  {
    title: 'Honest feedback loops',
    body: "Usability testing with real people, iterated until the confusion goes away. I'm not precious about my first ideas. The third version is usually the right one.",
  },
  {
    title: 'Cross-functional comfort',
    body: "I've worked with developers, educators, subject matter experts, and PMs. I'm comfortable in the middle, between what users need, what engineers can build, and what the business wants.",
  },
  {
    title: 'Clarity over cleverness',
    body: "A good interface shouldn't need a walkthrough. If I'm explaining how something works, it's a sign the design needs another pass.",
  },
]

const GRAIN = "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E\")"

const CARD_COLORS = ['#A880D4', '#2BB5C2', '#F59E0B', '#4ade80', '#F472B6', '#60A5FA']

// Strong ease-out curve (Emil): starts fast, settles soft. Used for every reveal.
const EASE_OUT = [0.16, 1, 0.3, 1] as const

const tagRgb = (tag: string) =>
  tag === 'Work' ? '43,181,194' : tag === 'Open' ? '74,222,128' : '168,128,212'

// ── Compact Accordion Timeline ──
// The whole story collapses to nine scannable rows on one continuous spine.
// Tap a row to expand its detail + photo. Compact by default, depth on demand.
function TimelineRow({
  item,
  last,
  open,
  onToggle,
}: {
  item: typeof timeline[0]
  last: boolean
  open: boolean
  onToggle: () => void
}) {
  const rgb = tagRgb(item.tag)
  return (
    <motion.div
      style={{
        display: 'grid',
        gridTemplateColumns: '14px 1fr',
        columnGap: 'clamp(16px, 3vw, 28px)',
        alignItems: 'stretch',
      }}
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, ease: EASE_OUT }}
    >
      {/* rail: dot + connecting line down to the next dot */}
      <div style={{ position: 'relative', width: 14 }}>
        <div
          style={{
            position: 'absolute', top: 7, left: 1,
            width: 12, height: 12, borderRadius: '50%',
            background: item.color,
            boxShadow: `0 0 0 4px #F7F3EE, 0 0 12px ${item.color}55`,
            zIndex: 1,
            transition: 'transform 200ms cubic-bezier(0.16,1,0.3,1)',
            transform: open ? 'scale(1.25)' : 'scale(1)',
          }}
        />
        {!last && (
          <div style={{ position: 'absolute', top: 21, bottom: 0, left: 6, width: 2, background: 'rgba(13,13,13,0.13)' }} />
        )}
      </div>

      {/* content */}
      <div style={{ paddingBottom: last ? 0 : 'clamp(14px, 2vw, 20px)' }}>
        {/* clickable header row */}
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={open}
          className="tl-acc-btn"
          style={{
            display: 'flex', alignItems: 'flex-start', gap: 12,
            width: '100%', textAlign: 'left',
            background: 'none', border: 'none', padding: '2px 0', margin: 0,
            cursor: 'pointer', font: 'inherit', color: 'inherit',
          }}
        >
          <span style={{ flex: 1, minWidth: 0 }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 5, flexWrap: 'wrap' }}>
              <span style={{ fontFamily: "'Satoshi', sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: `rgba(${rgb},0.85)` }}>
                {item.year}
              </span>
              <span style={{ fontFamily: "'Satoshi', sans-serif", fontSize: 9, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', padding: '4px 10px', borderRadius: 999, background: `rgba(${rgb},0.12)`, color: item.color }}>
                {item.tag}
              </span>
              {item.pivot && (
                <span style={{ fontFamily: "'Satoshi', sans-serif", fontSize: 9, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#A880D4', opacity: 0.8 }}>
                  ↩ pivot
                </span>
              )}
            </span>
            <span style={{ display: 'block', fontFamily: "'Cabinet Grotesk', sans-serif", fontWeight: 800, fontSize: 'clamp(18px, 1.9vw, 24px)', color: '#0d0d0d', lineHeight: 1.2, letterSpacing: '-0.02em' }}>
              {item.title}
            </span>
            <span style={{ display: 'block', fontFamily: "'Satoshi', sans-serif", fontSize: 13, fontStyle: 'italic', color: item.color, opacity: 0.8, lineHeight: 1.5, marginTop: 5 }}>
              {item.whisper}
            </span>
          </span>
          {/* chevron */}
          <span
            aria-hidden
            style={{
              flexShrink: 0, marginTop: 6, width: 22, height: 22,
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              color: 'rgba(13,13,13,0.4)',
              transition: 'transform 250ms cubic-bezier(0.16,1,0.3,1)',
              transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </span>
        </button>

        {/* expandable detail */}
        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              key="body"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ height: { duration: 0.4, ease: EASE_OUT }, opacity: { duration: 0.3, ease: 'easeOut' } }}
              style={{ overflow: 'hidden' }}
            >
              <div style={{ paddingTop: 14 }}>
                {'photo' in item && item.photo && (
                  <img
                    src={item.photo as string}
                    alt={item.title}
                    loading="lazy"
                    style={{ width: '100%', maxWidth: 320, height: 180, objectFit: 'cover', borderRadius: 12, display: 'block', margin: '0 0 14px', boxShadow: '0 12px 40px rgba(0,0,0,0.12)' }}
                  />
                )}
                <p style={{ fontFamily: "'Satoshi', sans-serif", fontSize: 15, fontWeight: 500, color: 'rgba(13,13,13,0.62)', lineHeight: 1.75, margin: 0 }}>
                  {item.detail}
                </p>
                {item.pivot && (
                  <div style={{ marginTop: 16, padding: '12px 18px', borderRadius: 10, background: 'rgba(168,128,212,0.1)', border: '1px solid rgba(168,128,212,0.2)', display: 'inline-flex', alignItems: 'center', gap: 10 }}>
                    <span style={{ fontSize: 16, color: '#A880D4' }}>↩</span>
                    <span style={{ fontFamily: "'Satoshi', sans-serif", fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#A880D4' }}>
                      Interior Design → UX Design. The pivot, formalized.
                    </span>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

function Timeline() {
  // First entry open by default so there's something to read on arrival.
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section
      className="about-page-section"
      style={{
        background: '#F7F3EE',
        padding: 'clamp(72px, 8vw, 112px) clamp(32px, 7vw, 96px)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* grain */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0, opacity: 0.35, backgroundImage: GRAIN, backgroundRepeat: 'repeat', backgroundSize: '180px 180px', pointerEvents: 'none' }} />

      <div style={{ position: 'relative', zIndex: 1, maxWidth: 760, margin: '0 auto' }}>
        {/* header */}
        <motion.p
          style={{ fontFamily: "'Satoshi', sans-serif", fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(13,13,13,0.4)', marginBottom: 14, fontWeight: 700 }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          Timeline
        </motion.p>
        <motion.h2
          style={{ fontFamily: "'Cabinet Grotesk', sans-serif", fontWeight: 800, fontSize: 'clamp(32px, 4.5vw, 56px)', color: '#0d0d0d', lineHeight: 1.0, letterSpacing: '-0.03em', margin: '0 0 14px' }}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: EASE_OUT }}
        >
          The full story.
        </motion.h2>
        <motion.p
          style={{ fontFamily: "'Satoshi', sans-serif", fontSize: 13, color: 'rgba(13,13,13,0.4)', margin: '0 0 clamp(40px, 5vw, 56px)' }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
        >
          Tap any moment to read more.
        </motion.p>

        {/* spine + entries */}
        <div style={{ position: 'relative' }}>
          {timeline.map((item, i) => (
            <TimelineRow
              key={`${item.year}-${i}`}
              item={item}
              last={i === timeline.length - 1}
              open={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default function AboutPage() {
  return (
    <>
      <main style={{ background: '#F7F3EE' }}>

        {/* ── Hero: Scrapbook / journal ── */}
        <section className="about-page-hero-section" style={{
          background: '#FDFAF5',
          minHeight: '100vh',
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          {/* grain */}
          <div style={{ position: 'absolute', inset: 0, zIndex: 0, opacity: 0.25, backgroundImage: GRAIN, backgroundRepeat: 'repeat', backgroundSize: '180px 180px', pointerEvents: 'none' }} />
          {/* soft purple blob top-right */}
          <div style={{ position: 'absolute', top: -120, right: '20%', width: 480, height: 480, background: 'radial-gradient(circle, rgba(168,128,212,0.1) 0%, transparent 70%)', borderRadius: '50%', pointerEvents: 'none' }} />
          {/* soft teal blob bottom-left */}
          <div style={{ position: 'absolute', bottom: -80, left: '10%', width: 360, height: 360, background: 'radial-gradient(circle, rgba(43,181,194,0.08) 0%, transparent 70%)', borderRadius: '50%', pointerEvents: 'none' }} />

          <div style={{
            position: 'relative', zIndex: 1,
            width: '100%',
            maxWidth: 680,
            padding: 'clamp(100px, 12vh, 140px) clamp(40px, 7vw, 96px) clamp(64px, 8vw, 96px)',
            display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center',
          }}>

            {/* Open to work pill */}
            <motion.div
              style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 32 }}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span style={{
                display: 'inline-flex', alignItems: 'center', gap: 7,
                background: 'rgba(74,222,128,0.1)', border: '1px solid rgba(74,222,128,0.3)',
                borderRadius: 999, padding: '6px 14px',
                fontFamily: "'Satoshi', sans-serif", fontSize: 11, fontWeight: 700,
                color: '#16a34a', letterSpacing: '0.06em', textTransform: 'uppercase' as const,
              }}>
                <span style={{ position: 'relative', display: 'inline-flex' }}>
                  <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#4ade80', display: 'block' }} />
                  <span style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: '#4ade80', animation: 'ping 1.5s cubic-bezier(0,0,0.2,1) infinite', opacity: 0.5 }} />
                </span>
                Open to work
              </span>
            </motion.div>

            {/* Headline — NCL Gasdrifo, single line */}
            <motion.h1
              style={{
                fontFamily: "'NCL Gasdrifo', Georgia, serif",
                fontWeight: 400,
                fontSize: 'clamp(36px, 5vw, 64px)',
                lineHeight: 1.15,
                letterSpacing: '0.01em',
                marginBottom: 28,
                color: '#111827',
              }}
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            >
              hi, it means a lot<br />that you&apos;re here ✦
            </motion.h1>

            {/* Personal bio */}
            <motion.div
              style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 40 }}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <p style={{ fontFamily: "'Satoshi', sans-serif", fontSize: 'clamp(15px, 1.3vw, 17px)', color: '#555', lineHeight: 1.78, margin: 0 }}>
                I&apos;m Sanjana. Seven years in design, studying it, working in it, thinking about it. I started in interior spaces and moved into product design. That background shapes how I work now. It just means I learned early how to figure out what something needs to feel like before anyone has words for it.
              </p>
              <p style={{ fontFamily: "'Satoshi', sans-serif", fontSize: 'clamp(15px, 1.3vw, 17px)', color: '#555', lineHeight: 1.78, margin: 0 }}>
                These days I design digital products. AI workflows, interactive exhibits, things people actually want to use. What I care about most is the gap between <em style={{ fontStyle: 'italic', color: '#111' }}>technically works</em> and <em style={{ fontStyle: 'italic', color: '#111' }}>actually good.</em>
              </p>
            </motion.div>

            {/* Buttons */}
            <motion.div
              style={{ display: 'flex', gap: 10, flexWrap: 'wrap', justifyContent: 'center' }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <a href="mailto:gangishettysanjana084@gmail.com" style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '13px 28px', borderRadius: 999,
                background: '#111', color: '#fff',
                fontFamily: "'Satoshi', sans-serif",
                fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase' as const,
                textDecoration: 'none', transition: 'opacity 0.2s',
              }}
                onMouseEnter={e => (e.currentTarget.style.opacity = '0.75')}
                onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
              >
                Let&apos;s talk →
              </a>
              <a href="/resume.pdf?v=0622" target="_blank" rel="noopener noreferrer" style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '13px 28px', borderRadius: 999,
                border: '1.5px solid rgba(0,0,0,0.18)', color: '#111',
                fontFamily: "'Satoshi', sans-serif",
                fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase' as const,
                textDecoration: 'none', transition: 'opacity 0.2s', background: 'transparent',
              }}
                onMouseEnter={e => (e.currentTarget.style.opacity = '0.5')}
                onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
              >
                Resume ↗
              </a>
            </motion.div>
          </div>
        </section>

        {/* ── Vertical timeline ── */}
        <Timeline />

        {/* ── How I work: light ── */}
        <section className="about-page-section" style={{ background: '#F7F3EE', padding: 'clamp(72px, 8vw, 112px) clamp(32px, 7vw, 96px)', overflow: 'hidden', position: 'relative' }}>
          {/* grain */}
          <div style={{ position: 'absolute', inset: 0, zIndex: 0, opacity: 0.35, backgroundImage: GRAIN, backgroundRepeat: 'repeat', backgroundSize: '180px 180px', pointerEvents: 'none' }} />

          <div style={{ position: 'relative', zIndex: 1 }}>
            <motion.p
              style={{ fontFamily: "'Satoshi', sans-serif", fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(13,13,13,0.35)', marginBottom: 16, fontWeight: 700 }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              How I work
            </motion.p>
            <motion.h2
              style={{ fontFamily: "'Cabinet Grotesk', sans-serif", fontSize: 'clamp(36px, 5vw, 64px)', fontWeight: 800, color: '#111827', marginBottom: 64, lineHeight: 1.0, letterSpacing: '-0.03em', maxWidth: 680 }}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Six things that don&apos;t change.
            </motion.h2>

            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {principles.map((card, i) => (
                <motion.div
                  key={card.title}
                  className="about-work-row"
                  style={{
                    padding: '36px 0',
                    borderTop: '1px solid rgba(13,13,13,0.1)',
                    cursor: 'default',
                  }}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.5, delay: i * 0.06 }}
                >
                  {/* Number */}
                  <div className="about-work-row-number" style={{
                    fontFamily: "'Cabinet Grotesk', sans-serif",
                    fontWeight: 800,
                    fontSize: 13,
                    color: CARD_COLORS[i],
                    letterSpacing: '0.06em',
                    paddingTop: 4,
                  }}>
                    0{i + 1}
                  </div>
                  {/* Title */}
                  <h3 className="about-work-row-title" style={{
                    fontFamily: "'Cabinet Grotesk', sans-serif",
                    fontSize: 'clamp(18px, 1.6vw, 22px)',
                    fontWeight: 700,
                    color: '#111827',
                    lineHeight: 1.2,
                    margin: 0,
                    paddingTop: 2,
                  }}>
                    {card.title}
                  </h3>
                  {/* Body */}
                  <p style={{
                    fontFamily: "'Satoshi', sans-serif",
                    fontSize: 15,
                    color: 'rgba(13,13,13,0.5)',
                    lineHeight: 1.75,
                    margin: 0,
                  }}>
                    {card.body}
                  </p>
                </motion.div>
              ))}
              {/* Bottom border */}
              <div style={{ borderTop: '1px solid rgba(13,13,13,0.1)' }} />
            </div>
          </div>
        </section>

        {/* ── Outside of design ── */}
        <section className="about-page-section" style={{ background: '#fff', padding: 'clamp(72px, 8vw, 112px) clamp(32px, 7vw, 96px) 0', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0, zIndex: 0, opacity: 0.25, backgroundImage: GRAIN, backgroundRepeat: 'repeat', backgroundSize: '180px 180px', pointerEvents: 'none' }} />
          <div style={{ position: 'relative', zIndex: 1, width: '100%', marginBottom: 56 }}>
            <motion.p
              style={{ fontFamily: "'Satoshi', sans-serif", fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(13,13,13,0.35)', marginBottom: 16, fontWeight: 700 }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              Outside of design
            </motion.p>
            <motion.h2
              style={{ fontFamily: "'Cabinet Grotesk', sans-serif", fontSize: 'clamp(32px, 4vw, 52px)', fontWeight: 800, color: '#111827', marginBottom: 32, lineHeight: 1.05, letterSpacing: '-0.03em' }}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              I exist outside of Figma, I promise.
            </motion.h2>
            <motion.p
              style={{ fontFamily: "'Satoshi', sans-serif", fontSize: 'clamp(15px, 1.3vw, 17px)', color: 'rgba(13,13,13,0.55)', lineHeight: 1.78 }}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Outside of work I am usually in the kitchen. Baking something I found at 11pm, or cooking for people I love. I travel whenever I get the chance. I watch shows with real commitment. Some of my best ideas show up on long flights or over a really good meal.
            </motion.p>
          </div>

          {/* Photo strip — auto-scrolling */}
          <motion.div
            style={{ position: 'relative', zIndex: 1, width: '100vw', left: '50%', transform: 'translateX(-50%)', overflow: 'hidden', marginBottom: 0 }}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <div style={{ display: 'flex', gap: 12, width: 'max-content', animation: 'marquee 35s linear infinite', paddingBottom: 56 }}>
              {[...Array(2)].map((_, rep) => (
                <div key={rep} style={{ display: 'flex', gap: 12, flexShrink: 0 }}>
                  {[
                    { src: '/About/IMG_0298.jpg', width: 220 },
                    { src: '/About/IMG_0476.jpg', width: 320 },
                    { src: '/About/IMG_7265.jpg', width: 220 },
                    { src: '/About/IMG_8183.jpg', width: 260 },
                    { src: '/About/IMG_0675.jpg', width: 220 },
                    { src: '/About/IMG_5333.jpg', width: 320 },
                    { src: '/About/IMG_7161.jpg', width: 260 },
                  ].map((photo, i) => (
                    <div
                      key={i}
                      style={{
                        flexShrink: 0,
                        width: photo.width,
                        height: 300,
                        borderRadius: 12,
                        overflow: 'hidden',
                        border: '1px solid rgba(13,13,13,0.06)',
                      }}
                    >
                      <img
                        src={photo.src}
                        alt=""
                        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                      />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Scrolling marquee strip */}
          <div style={{ position: 'relative', zIndex: 1, width: '100vw', left: '50%', transform: 'translateX(-50%)', overflow: 'hidden', borderTop: '1px solid rgba(13,13,13,0.08)', borderBottom: '1px solid rgba(13,13,13,0.08)', padding: '18px 0', background: '#FDFAF5' }}>
            <div style={{ display: 'flex', gap: 0, animation: 'marquee 22s linear infinite', width: 'max-content' }}>
              {[...Array(3)].map((_, rep) => (
                <span key={rep} style={{ display: 'flex', alignItems: 'center', gap: 0 }}>
                  {['Baking', 'Travelling', 'Cooking', 'Hanging with friends', 'Binge-watching shows'].map(item => (
                    <span key={item} style={{ display: 'flex', alignItems: 'center' }}>
                      <span style={{ fontFamily: "'Cabinet Grotesk', sans-serif", fontSize: 15, fontWeight: 700, color: '#111827', letterSpacing: '0.01em', padding: '0 32px', whiteSpace: 'nowrap' }}>
                        {item}
                      </span>
                      <span style={{ color: 'rgba(13,13,13,0.2)', fontSize: 12 }}>✦</span>
                    </span>
                  ))}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ── Right now + What I'm looking for ── */}
        <section style={{ background: '#FDFAF5', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0, zIndex: 0, opacity: 0.3, backgroundImage: GRAIN, backgroundRepeat: 'repeat', backgroundSize: '180px 180px', pointerEvents: 'none' }} />

          {/* Rows — padded */}
          <div style={{ position: 'relative', zIndex: 1, padding: 'clamp(72px, 8vw, 112px) clamp(32px, 7vw, 96px) 40px' }}>
            <motion.p
              style={{ fontFamily: "'Satoshi', sans-serif", fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(13,13,13,0.35)', marginBottom: 48, fontWeight: 700 }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              Right now
            </motion.p>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {[
                { label: 'Reading', value: "Clock In by Emily the Recruiter. Genuinely a little funny that I'm reading a career book mid-job-search, but here we are. It's making me think harder about what I actually want, not just what I think I'm supposed to want.", color: '#D97706' },
                { label: 'Building', value: "Learning to build real things with Claude Code. I'm a designer who can now ship her own ideas without waiting on anyone.", color: '#0BB4CC' },
                { label: 'Thinking about', value: "Why seamlessness is so rare. Most products get close and then sort of... stop. Closing that last gap is the part I care about most.", color: '#9B5DE5' },
              ].map((item, i) => (
                <motion.div
                  key={item.label}
                  className="about-now-row"
                  style={{
                    padding: '32px 0 32px 20px',
                    borderTop: '1px solid rgba(13,13,13,0.08)',
                    borderLeft: `3px solid ${item.color}`,
                    marginBottom: 2,
                  }}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.07 }}
                >
                  <span style={{ fontFamily: "'Satoshi', sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' as const, color: item.color, paddingTop: 3 }}>
                    {item.label}
                  </span>
                  <p style={{ fontFamily: "'Satoshi', sans-serif", fontSize: 15, color: 'rgba(13,13,13,0.65)', lineHeight: 1.72, margin: 0 }}>
                    {item.value}
                  </p>
                </motion.div>
              ))}
              <div style={{ borderTop: '1px solid rgba(13,13,13,0.08)' }} />
            </div>
          </div>

          {/* What I'm looking for — full-width dark block, direct child of section */}
          <motion.div
            style={{ background: '#111827', padding: 'clamp(40px, 5vw, 64px) clamp(32px, 7vw, 96px)', position: 'relative', overflow: 'hidden' }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div style={{ position: 'absolute', inset: 0, zIndex: 0, opacity: 0.4, backgroundImage: GRAIN, backgroundRepeat: 'repeat', backgroundSize: '180px 180px', pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', top: -10, right: 32, fontSize: 'clamp(120px, 16vw, 200px)', lineHeight: 1, fontFamily: "'NCL Gasdrifo', Georgia, serif", color: 'rgba(255,255,255,0.05)', pointerEvents: 'none', userSelect: 'none', zIndex: 0 }}>
              &rdquo;
            </div>
            <div style={{ position: 'relative', zIndex: 1 }}>
              <p style={{ fontFamily: "'Satoshi', sans-serif", fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', marginBottom: 24, fontWeight: 700 }}>
                What I&apos;m looking for
              </p>
              <p style={{ fontFamily: "'Cabinet Grotesk', sans-serif", fontSize: 'clamp(22px, 2.8vw, 38px)', fontWeight: 800, color: '#fff', lineHeight: 1.35, letterSpacing: '-0.02em', margin: '0 0 16px' }}>
                I want to work somewhere that starts with the person, not the feature list.
              </p>
              <p style={{ fontFamily: "'Satoshi', sans-serif", fontSize: 'clamp(15px, 1.3vw, 17px)', color: 'rgba(255,255,255,0.5)', lineHeight: 1.75, margin: '0 0 36px', maxWidth: 600 }}>
                The kind of place where someone can say &ldquo;this works but it doesn&apos;t feel right&rdquo; and the room takes it seriously. Concretely: a product design role at an AI-native company or an early-stage team, where I can own the whole arc from research to shipped build. I&apos;m based in the US and authorized to work here, and I&apos;m open to relocating.
              </p>
              <motion.a
                href="mailto:gangishettysanjana084@gmail.com"
                style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontFamily: "'Satoshi', sans-serif", fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: '#111827', background: '#fff', padding: '13px 26px', borderRadius: 999, textDecoration: 'none', transition: 'opacity 0.2s' }}
                whileHover={{ opacity: 0.85 }}
              >
                Let&apos;s talk →
              </motion.a>
            </div>
          </motion.div>
        </section>

        <Contact />
      </main>
    </>
  )
}
