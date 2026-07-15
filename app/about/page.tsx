'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { useEffect, useRef } from 'react'
import Contact from '@/components/Contact'
import { JourneyMap } from '@/components/JourneyMap'
import { journeyData } from '@/components/journey-data'

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
    title: 'MS, Human-Computer Interaction.',
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

// ── GSAP Timeline Item ──
function TimelineItem({ item, index, nextYear }: { item: typeof timeline[0]; index: number; nextYear?: string }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let gsap: typeof import('gsap').gsap
    let ScrollTrigger: typeof import('gsap/ScrollTrigger').ScrollTrigger

    async function init() {
      const g = await import('gsap')
      const st = await import('gsap/ScrollTrigger')
      gsap = g.gsap
      ScrollTrigger = st.ScrollTrigger
      gsap.registerPlugin(ScrollTrigger)

      if (!ref.current) return

      const el = ref.current
      const year = el.querySelector('.tl-year')
      const dot = el.querySelector('.tl-dot')
      const title = el.querySelector('.tl-title')
      const whisper = el.querySelector('.tl-whisper')
      const detail = el.querySelector('.tl-detail')
      const photo = el.querySelector('.tl-photo')
      const badge = el.querySelector('.tl-badge')

      gsap.set([year, dot, title, whisper, detail, photo, badge].filter(Boolean), { opacity: 0 })
      gsap.set(year, { x: -20 })
      gsap.set(dot, { scale: 0 })
      gsap.set(title, { y: 18, x: 10 })
      gsap.set(whisper, { y: 10, opacity: 0 })
      gsap.set(detail, { y: 14 })
      gsap.set(badge, { scale: 0.7, x: -8 })
      if (photo) gsap.set(photo, { y: 20, rotateX: 8 })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: 'top 82%',
          once: true,
        },
      })

      tl.to(dot, { opacity: 1, scale: 1, duration: 0.4, ease: 'back.out(2)' })
        .to(year, { opacity: 1, x: 0, duration: 0.4, ease: 'power3.out' }, '<0.05')
        .to(badge, { opacity: 1, scale: 1, x: 0, duration: 0.35, ease: 'back.out(1.5)' }, '<0.1')
        .to(title, { opacity: 1, y: 0, x: 0, duration: 0.5, ease: 'power3.out' }, '<0.05')
        .to(whisper, { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }, '<0.1')
        .to(detail, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, '<0.08')

      if (photo) {
        tl.to(photo, { opacity: 0.88, y: 0, rotateX: 0, duration: 0.6, ease: 'power3.out' }, '<0.1')
      }
    }

    init()

    return () => {
      import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
        ScrollTrigger.getAll().forEach(t => {
          if (ref.current && t.trigger === ref.current) t.kill()
        })
      })
    }
  }, [])

  const tagBg =
    item.tag === 'Open' ? 'rgba(74,222,128,0.12)' :
    item.tag === 'Work' ? 'rgba(43,181,194,0.12)' :
    'rgba(168,128,212,0.12)'

  return (
    <div
      ref={ref}
      className="about-timeline-grid"
      style={{
        display: 'grid',
        gridTemplateColumns: '120px 1fr',
        gap: 48,
        alignItems: 'start',
        paddingBottom: 48,
        borderBottom: index < timeline.length - 1 && !(item.year === '2022' && nextYear === '2022') ? '1px solid rgba(255,255,255,0.12)' : 'none',
      }}
    >
      {/* Year + dot */}
      <div className="about-timeline-year" style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-end', gap: 12, paddingTop: 6 }}>
        <span
          className="tl-year"
          style={{ fontFamily: "'Satoshi', sans-serif", fontSize: 11, letterSpacing: '0.1em', color: 'rgba(255,255,255,0.35)', fontWeight: 700 }}
        >
          {item.year}
        </span>
        <div
          className="tl-dot"
          style={{
            width: 11, height: 11, borderRadius: '50%',
            background: item.color,
            flexShrink: 0, marginTop: 2,
            boxShadow: `0 0 12px ${item.color}66`,
          }}
        />
      </div>

      {/* Content */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6, flexWrap: 'wrap' }}>
          <h3
            className="tl-title"
            style={{
              fontFamily: "'Cabinet Grotesk', sans-serif",
              fontSize: 'clamp(16px, 1.5vw, 20px)',
              fontWeight: 700, color: '#F7F3EE', margin: 0,
              letterSpacing: '-0.01em',
            }}
          >
            {item.title}
          </h3>
          <span
            className="tl-badge"
            style={{
              fontFamily: "'Satoshi', sans-serif",
              fontSize: 9, letterSpacing: '0.1em',
              textTransform: 'uppercase', padding: '3px 10px',
              borderRadius: 999, flexShrink: 0,
              background: tagBg, color: item.color,
              display: 'inline-block',
            }}
          >
            {item.tag}
          </span>
        </div>

        {/* Photo above text */}
        {'photo' in item && item.photo && (
          <img
            className="tl-photo"
            src={item.photo as string}
            alt={item.title}
            style={{
              width: '100%', maxWidth: 340, height: 200,
              objectFit: 'cover', borderRadius: 14,
              display: 'block',
              marginBottom: 16,
              boxShadow: '0 12px 40px rgba(0,0,0,0.35)',
              transformOrigin: 'bottom center',
            }}
          />
        )}

        {/* Whistledown whisper line */}
        <p
          className="tl-whisper"
          style={{
            fontFamily: "'Satoshi', sans-serif",
            fontSize: 13,
            fontStyle: 'italic',
            color: item.color,
            opacity: 0.75,
            margin: '0 0 10px',
            letterSpacing: '0.01em',
          }}
        >
          {item.whisper}
        </p>

        <p
          className="tl-detail"
          style={{
            fontFamily: "'Satoshi', sans-serif",
            fontSize: 16,
            fontWeight: 500,
            color: 'rgba(247,243,238,0.72)',
            lineHeight: 1.75,
            margin: '0 0 16px',
          }}
        >
          {item.detail}
        </p>

        {/* Pivot callout */}
        {item.pivot && (
          <div style={{
            marginTop: 16,
            padding: '12px 18px',
            borderRadius: 10,
            background: 'rgba(168,128,212,0.1)',
            border: '1px solid rgba(168,128,212,0.2)',
            display: 'inline-flex', alignItems: 'center', gap: 10,
          }}>
            <span style={{ fontSize: 16 }}>↩</span>
            <span style={{
              fontFamily: "'Satoshi', sans-serif",
              fontSize: 10, letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: '#A880D4',
            }}>
              Interior Design → UX Design. The pivot, formalized.
            </span>
          </div>
        )}
      </div>
    </div>
  )
}

const GRAIN = "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E\")"

const CARD_COLORS = ['#A880D4', '#2BB5C2', '#F59E0B', '#4ade80', '#F472B6', '#60A5FA']
const CARD_BG_HOVER = [
  'rgba(168,128,212,0.1)', 'rgba(43,181,194,0.1)', 'rgba(245,158,11,0.1)',
  'rgba(74,222,128,0.1)', 'rgba(244,114,182,0.1)', 'rgba(96,165,250,0.1)',
]
const CARD_BORDER_HOVER = [
  'rgba(168,128,212,0.35)', 'rgba(43,181,194,0.35)', 'rgba(245,158,11,0.35)',
  'rgba(74,222,128,0.35)', 'rgba(244,114,182,0.35)', 'rgba(96,165,250,0.35)',
]

// ── Vertical Timeline ──
// Cards stack down the page along a spine that draws itself as you scroll,
// with node dots that light up as the progress reaches them. GSAP powers the
// interactivity, but deliberately NOT the pattern that broke Safari (no pin,
// no position:sticky, no translateX scroll-jack) — everything here is normal
// scroll driving scaleY on an in-flow line plus class toggles, which composits
// correctly in every browser. Cards are fully visible by default; the reveal
// is a purely positional rise that only enhances (never gates) visibility and
// is skipped entirely for users who prefer reduced motion.
function VerticalTimeline() {
  const reduce = useReducedMotion()
  const rootRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const fillRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (reduce) return
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let ctx: any = null

    async function init() {
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      const root = rootRef.current
      const track = trackRef.current
      const fill = fillRef.current
      if (!root || !track || !fill) return

      await new Promise<void>(r => setTimeout(r, 150))

      const dots = Array.from(root.querySelectorAll<HTMLElement>('.vtl-dot'))
      const reveals = Array.from(root.querySelectorAll<HTMLElement>('.vtl-reveal'))

      // Spine geometry: run the track from the first node center to the last,
      // re-measured on every refresh so font/image reflow can't misalign it.
      let firstC = 0, lastC = 0, centers: number[] = []
      const measure = () => {
        const rootTop = root.getBoundingClientRect().top + window.scrollY
        centers = dots.map(d => {
          const r = d.getBoundingClientRect()
          return r.top + window.scrollY - rootTop + r.height / 2
        })
        firstC = centers[0] ?? 0
        lastC = centers[centers.length - 1] ?? 0
        track.style.top = `${firstC}px`
        track.style.height = `${Math.max(0, lastC - firstC)}px`
      }
      measure()

      ctx = gsap.context(() => {
        gsap.set(fill, { scaleY: 0, transformOrigin: 'top' })

        ScrollTrigger.create({
          trigger: root,
          start: 'top 62%',
          end: 'bottom 62%',
          scrub: 0.6,
          invalidateOnRefresh: true,
          onRefreshInit: measure,
          onUpdate: (self: { progress: number }) => {
            fill.style.transform = `scaleY(${self.progress})`
            const filledY = firstC + self.progress * (lastC - firstC)
            dots.forEach((d, i) => {
              d.classList.toggle('vtl-dot--on', centers[i] <= filledY + 1)
            })
          },
        })

        // Per-card positional reveal (opacity stays 1 → visible by default).
        reveals.forEach(el => {
          gsap.set(el, { y: 30 })
          gsap.to(el, {
            y: 0, duration: 0.7, ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' },
            onComplete: () => gsap.set(el, { clearProps: 'transform' }),
          })
        })
      }, root)

      root.querySelectorAll('img').forEach(img => {
        if (!img.complete) img.addEventListener('load', () => ScrollTrigger.refresh(), { once: true })
      })
    }

    init()
    return () => ctx?.revert()
  }, [reduce])

  return (
    <section style={{ position: 'relative', background: '#F7F3EE', padding: 'clamp(64px, 9vw, 120px) 0 clamp(72px, 10vw, 132px)' }}>
      {/* grain */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0, opacity: 0.35, backgroundImage: GRAIN, backgroundRepeat: 'repeat', backgroundSize: '180px 180px', pointerEvents: 'none' }} />

      {/* scoped interactive styles */}
      <style>{`
        .vtl-dot {
          transition: transform .35s cubic-bezier(.16,1,.3,1), background .35s, border-color .35s, box-shadow .35s;
        }
        .vtl-dot--on {
          transform: scale(1.25);
          background: var(--dot) !important;
          border-color: var(--dot) !important;
          box-shadow: 0 0 0 5px rgba(var(--dotrgb), 0.16) !important;
        }
        .vtl-card {
          transition: transform .35s cubic-bezier(.16,1,.3,1), box-shadow .35s, border-color .35s;
          will-change: transform;
        }
        .vtl-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 22px 48px -26px rgba(13,13,13,0.35);
          border-color: rgba(var(--dotrgb), 0.4);
        }
        @media (prefers-reduced-motion: reduce) {
          .vtl-card, .vtl-dot { transition: none; }
        }
      `}</style>

      <div style={{ position: 'relative', zIndex: 1, maxWidth: 920, margin: '0 auto', padding: '0 clamp(24px, 6vw, 64px)' }}>
        {/* header */}
        <div style={{ marginBottom: 'clamp(40px, 6vw, 72px)', paddingBottom: 24, borderBottom: '1px solid rgba(13,13,13,0.08)' }}>
          <p style={{ fontFamily: "'Satoshi', sans-serif", fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(13,13,13,0.4)', marginBottom: 10, fontWeight: 700 }}>
            Timeline
          </p>
          <h2 style={{ fontFamily: "'Cabinet Grotesk', sans-serif", fontWeight: 800, fontSize: 'clamp(30px, 4.5vw, 52px)', color: '#0d0d0d', lineHeight: 1, letterSpacing: '-0.03em', margin: 0 }}>
            The full story.
          </h2>
        </div>

        {/* items */}
        <div ref={rootRef} style={{ position: 'relative' }}>
          {/* animated spine: gray track + colored fill that draws on scroll */}
          <div ref={trackRef} aria-hidden style={{ position: 'absolute', left: 8, width: 2, background: 'rgba(13,13,13,0.1)', borderRadius: 2, pointerEvents: 'none' }}>
            <div
              ref={fillRef}
              style={{
                position: 'absolute', inset: 0, width: 2, borderRadius: 2,
                background: 'linear-gradient(to bottom, #A880D4 0%, #2BB5C2 55%, #4ade80 100%)',
                transform: reduce ? 'scaleY(1)' : 'scaleY(0)',
                transformOrigin: 'top',
              }}
            />
          </div>

          {timeline.map((item, i) => {
            const color = item.tag === 'Work' ? '#2BB5C2' : item.tag === 'Open' ? '#4ade80' : '#A880D4'
            const rgb = item.tag === 'Work' ? '43,181,194' : item.tag === 'Open' ? '74,222,128' : '168,128,212'
            const isLast = i === timeline.length - 1
            return (
              <div
                key={`${item.year}-${i}`}
                style={{
                  position: 'relative',
                  display: 'grid',
                  gridTemplateColumns: '18px 1fr',
                  columnGap: 'clamp(20px, 4vw, 40px)',
                  paddingBottom: isLast ? 0 : 'clamp(28px, 4vw, 52px)',
                }}
              >
                {/* node dot (sits on the spine) */}
                <div style={{ position: 'relative' }}>
                  <div
                    className={`vtl-dot${reduce ? ' vtl-dot--on' : ''}`}
                    style={{
                      // custom props feed the active-state CSS
                      ['--dot' as string]: color,
                      ['--dotrgb' as string]: rgb,
                      position: 'absolute', top: 24, left: 2,
                      width: 14, height: 14, borderRadius: '50%',
                      background: '#F7F3EE', border: '2px solid rgba(13,13,13,0.22)',
                    }}
                  />
                </div>

                {/* reveal wrapper (GSAP animates this) → card (CSS hover) */}
                <div className="vtl-reveal">
                  <article
                    className="vtl-card"
                    style={{
                      ['--dotrgb' as string]: rgb,
                      position: 'relative',
                      background: item.pivot ? 'rgba(168,128,212,0.08)' : '#ffffff',
                      borderRadius: 20,
                      border: item.pivot ? '1px solid rgba(168,128,212,0.25)' : '1px solid rgba(13,13,13,0.07)',
                      overflow: 'hidden',
                      padding: 'clamp(28px, 4vw, 40px)',
                    }}
                  >
                    {/* giant watermark year */}
                    <div style={{
                      position: 'absolute', bottom: -22, right: -4,
                      fontFamily: "'Cabinet Grotesk', sans-serif", fontWeight: 800,
                      fontSize: 'clamp(72px, 11vw, 128px)',
                      color: 'rgba(13,13,13,0.05)',
                      lineHeight: 1, letterSpacing: '-0.04em',
                      userSelect: 'none', pointerEvents: 'none',
                    }}>
                      {item.year}
                    </div>

                    {/* pivot glow */}
                    {item.pivot && (
                      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 0% 0%, rgba(168,128,212,0.15) 0%, transparent 60%)', pointerEvents: 'none' }} />
                    )}

                    <div style={{ position: 'relative', zIndex: 1 }}>
                      {/* index + tag */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18, flexWrap: 'wrap' }}>
                        <span style={{ fontFamily: "'Cabinet Grotesk', sans-serif", fontWeight: 800, fontSize: 11, color: 'rgba(13,13,13,0.25)', letterSpacing: '0.06em' }}>
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        <span style={{
                          fontFamily: "'Satoshi', sans-serif", fontSize: 9, fontWeight: 700,
                          letterSpacing: '0.12em', textTransform: 'uppercase' as const,
                          padding: '4px 10px', borderRadius: 999,
                          background: `rgba(${rgb},0.12)`, color,
                        }}>
                          {item.tag}
                        </span>
                        {item.pivot && (
                          <span style={{ fontFamily: "'Satoshi', sans-serif", fontSize: 9, color: '#A880D4', letterSpacing: '0.1em', textTransform: 'uppercase' as const, fontWeight: 700, opacity: 0.8 }}>
                            ↩ pivot
                          </span>
                        )}
                      </div>

                      {/* year label */}
                      <p style={{ fontFamily: "'Satoshi', sans-serif", fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase' as const, color: `rgba(${rgb},0.85)`, marginBottom: 10, fontWeight: 700 }}>
                        {item.year}
                      </p>

                      {/* title */}
                      <h3 style={{ fontFamily: "'Cabinet Grotesk', sans-serif", fontWeight: 800, fontSize: 'clamp(21px, 2.6vw, 30px)', color: '#0d0d0d', lineHeight: 1.15, letterSpacing: '-0.02em', marginBottom: 12, textWrap: 'balance' }}>
                        {item.title}
                      </h3>

                      {/* whisper */}
                      <p style={{ fontFamily: "'Satoshi', sans-serif", fontSize: 13, fontStyle: 'italic', color, opacity: 0.75, marginBottom: 16, lineHeight: 1.5 }}>
                        {item.whisper}
                      </p>

                      {/* detail */}
                      <p style={{ fontFamily: "'Satoshi', sans-serif", fontSize: 'clamp(14px, 1.1vw, 15px)', color: 'rgba(13,13,13,0.62)', lineHeight: 1.75, margin: 0, maxWidth: '62ch' }}>
                        {item.detail}
                      </p>
                    </div>
                  </article>
                </div>
              </div>
            )
          })}
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
                I&apos;m Sanjana. ~7 years in design, ~3 in product, studying it, working in it, thinking about it. I started in interior spaces and moved into product design. That background shapes how I work now. It just means I learned early how to figure out what something needs to feel like before anyone has words for it.
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

        {/* ── Horizontal scroll timeline ── */}
        <VerticalTimeline />

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
              Outside of work I am usually in the kitchen. Baking something I found at 11pm, or cooking for people I love. I travel whenever I get the chance. I watch shows with a level of commitment that is honestly a little embarrassing. Some of my best ideas show up on long flights or over a really good meal.
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
                { label: 'Building', value: "Learning to build real things with Claude Code. I'm a designer who can now ship her own ideas without waiting on anyone. Still wrapping my head around that one.", color: '#0BB4CC' },
                { label: 'Thinking about', value: "Why seamlessness is so rare. Most products get close and then sort of... stop. I think about this more than is probably healthy.", color: '#9B5DE5' },
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
                The kind of place where someone can say &ldquo;this works but it doesn&apos;t feel right&rdquo; and the room takes it seriously. I&apos;ve been in rooms like that. I want back in.
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
