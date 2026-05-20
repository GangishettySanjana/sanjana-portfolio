'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useEffect, useRef } from 'react'
import Navigation from '@/components/Navigation'
import Contact from '@/components/Contact'
import { JourneyMap } from '@/components/JourneyMap'
import { journeyData } from '@/components/journey-data'

const timeline = [
  {
    year: '2018',
    title: 'Interior design. Yes, interior design.',
    whisper: 'Woxsen School of Arts and Design. Four years.',
    detail: 'I spent four years studying interior design — rooms, materials, how light changes a space. Most of the job was figuring out what someone wanted a place to feel like before they could put it into words. I liked it a lot. I just had no idea it was also training me for something else.',
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
    detail: 'Walked out with first class distinction and no real plan. Three months later I started an internship that answered the question I didn\'t know I was asking.',
    tag: 'Education',
    color: '#A880D4',
    photo: '/journey/2022-grad-ceremony.jpg',
    pivot: false,
  },
  {
    year: '2022',
    title: 'Tell Design Tales. Everything shifts.',
    whisper: 'Three months. One UX project. Pretty obvious from there.',
    detail: 'My first internship put me on a UX project for the studio\'s website. I just liked it. Like, genuinely, immediately. Four years of thinking about how spaces make people feel — turns out that\'s basically what UX is. Different medium, same question.',
    tag: 'Work',
    color: '#2BB5C2',
    photo: '/journey/2022-telltales.jpg',
    pivot: true,
  },
  {
    year: '2022',
    title: 'Google UX Certificate.',
    whisper: 'Aug 2, 2022. Foundations of User Experience Design. Coursera verified.',
    detail: 'Got the Google UX cert right after. Screener surveys, usability testing, journey maps. It put names to things I\'d already started doing by feel.',
    tag: 'Education',
    color: '#A880D4',
    photo: '/journey/2022-google-cert.jpg',
    pivot: false,
  },
  {
    year: '2022',
    title: 'Aura. MySassy Interiors. Six projects, mostly solo.',
    whisper: 'Bouquet app, six interiors, one acceptance email.',
    detail: 'Built Aura — a bouquet customization app for a Hyderabad florist during lockdown. Then a full-time role at MySassy Interiors where I ran six projects on my own. The interior design background kept showing up in useful ways. I was applying to master\'s programs the whole time. Eventually I got in.',
    tag: 'Work',
    color: '#2BB5C2',
    pivot: false,
  },
  {
    year: '2023',
    title: 'CU Boulder. Moved to Colorado.',
    whisper: 'One overstuffed suitcase. The Rockies.',
    detail: 'Packed everything and moved to Boulder for the master\'s program. Two years working on AI tools, interactive exhibits, product launches. Being the only person in the room who\'d designed physical spaces turned out to matter more than I expected.',
    tag: 'Education',
    color: '#A880D4',
    photo: '/journey/2023-boulder.jpg',
    pivot: false,
  },
  {
    year: '2025',
    title: "MS in Creative Technology & Design.",
    whisper: 'Five years. Two countries. One direction.',
    detail: 'FlairX, Fireside Interactive, GetUp: AI recruiter workflows, a wildfire simulation exhibit, a celebrity product launch. Graduated. The work was all over the place, but it kept coming back to the same question — what does this person actually need?',
    tag: 'Education',
    color: '#A880D4',
    photo: '/journey/2025-grad.jpg',
    pivot: false,
  },
  {
    year: 'Now',
    title: 'Looking for the right team.',
    whisper: 'Open to work. Standards intact. Coffee: non-negotiable.',
    detail: 'I\'m not just "open to opportunities." I want to work somewhere that cares about the difference between something that technically works and something that\'s actually good. If that sounds like your team, I\'d like to talk.',
    tag: 'Open',
    color: '#4ade80',
    pivot: false,
  },
]

const principles = [
  {
    title: 'Research first',
    body: "I don't start in Figma. I start with the people who'll use the thing. User interviews, journey maps, screener surveys. The design almost writes itself once you understand what's actually happening.",
  },
  {
    title: 'AI-augmented workflows',
    body: "I use Claude, Lovable, Replit, v0, and Bolt as real parts of my process. Not just to generate ideas, but to prototype faster, synthesize research, and pressure-test copy. AI is a collaborator, not a shortcut.",
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
    body: "I've worked with developers, educators, subject matter experts, and PMs. I'm comfortable being the person who sits between what users need, what engineers can build, and what the business is asking for.",
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
          style={{ fontFamily: 'var(--font-label), sans-serif', fontSize: 11, letterSpacing: '0.1em', color: 'rgba(255,255,255,0.35)', fontWeight: 700 }}
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
              fontFamily: 'var(--font-heading), Georgia, serif',
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
              fontFamily: 'var(--font-label), sans-serif',
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
            fontFamily: 'var(--font-body), Georgia, serif',
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
            fontFamily: 'var(--font-body), Georgia, serif',
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
              fontFamily: 'var(--font-label), sans-serif',
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

export default function AboutPage() {
  return (
    <>
      <Navigation />
      <main style={{ background: '#FFFFFF' }}>

        {/* ── Hero ── */}
        <section className="about-page-hero-section" style={{
          margin: '60px 20px 20px',
          borderRadius: 20,
          background: '#F7F3EE',
          overflow: 'hidden',
          padding: 'clamp(60px, 9vw, 100px) clamp(32px, 7vw, 96px)',
        }}>
          <motion.p
            style={{ fontFamily: 'var(--font-label), sans-serif', fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#9CA3AF', marginBottom: 24, fontWeight: 700 }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            About Sanjana
          </motion.p>

          <div className="about-page-hero-grid" style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 320px', gap: 'clamp(48px, 7vw, 96px)', alignItems: 'start' }}>

            {/* Text */}
            <div>
              <motion.h1
                style={{ fontFamily: 'var(--font-display), Georgia, serif', fontSize: 'clamp(36px, 5vw, 64px)', fontWeight: 400, color: '#2A3550', lineHeight: 1.05, letterSpacing: '-0.025em', marginBottom: 36 }}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              >
                I design products.<br />
                <em style={{ fontStyle: 'italic', fontWeight: 300 }}>I used to design rooms.</em>
              </motion.h1>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                {[
                  "I studied interior design for four years — actual rooms, real spaces. You spend a lot of time figuring out what someone wants a place to feel like before they have words for it. My first UX internship felt like the same problem on a different surface. I liked it enough to keep going. Did the Google cert, built a bouquet app, ran six projects solo, then moved to Colorado for a master's at CU Boulder.",
                  "Two years later I'd shipped an AI recruiter workflow, a wildfire simulation exhibit, and a celebrity product launch. I use Figma, Claude, whatever gets things done. Now I'm looking for a team that cares about the gap between technically works and actually good. That gap is where I do my best work.",
                ].map((para, i) => (
                  <motion.p
                    key={i}
                    style={{ fontFamily: 'var(--font-body), Georgia, serif', fontSize: 'clamp(15px, 1.3vw, 17px)', color: 'rgba(42,53,80,0.8)', lineHeight: 1.78, margin: 0 }}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.15 + i * 0.07, ease: [0.16, 1, 0.3, 1] }}
                  >
                    {para}
                  </motion.p>
                ))}
              </div>

              <motion.div
                style={{ display: 'flex', gap: 12, marginTop: 40, flexWrap: 'wrap' }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <a href="mailto:gangishettysanjana084@gmail.com" style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  padding: '13px 28px', borderRadius: 999,
                  background: '#2A3550', color: '#F7F3EE',
                  fontFamily: 'var(--font-label), sans-serif',
                  fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase' as const,
                  textDecoration: 'none', transition: 'opacity 0.2s',
                }}
                  onMouseEnter={e => (e.currentTarget.style.opacity = '0.8')}
                  onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
                >
                  Get in touch →
                </a>
                <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  padding: '13px 28px', borderRadius: 999,
                  border: '1px solid rgba(42,53,80,0.2)', color: '#2A3550',
                  fontFamily: 'var(--font-label), sans-serif',
                  fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase' as const,
                  textDecoration: 'none', transition: 'opacity 0.2s', background: 'transparent',
                }}
                  onMouseEnter={e => (e.currentTarget.style.opacity = '0.6')}
                  onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
                >
                  Resume ↗
                </a>
              </motion.div>
            </div>

            {/* Photo */}
            <motion.div
              className="about-page-photo"
              style={{ position: 'relative', paddingBottom: 24 }}
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <div style={{
                width: '100%', aspectRatio: '3/4', borderRadius: 18, overflow: 'hidden',
                boxShadow: '0 24px 64px rgba(42,53,80,0.14), 0 4px 16px rgba(42,53,80,0.08)',
                transform: 'rotate(1.5deg)',
              }}>
                <img src="/images/sanjana.jpg" alt="Sanjana Gangishetty"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
              </div>
              <div style={{
                position: 'absolute', bottom: 6, left: 16,
                background: 'white', borderRadius: 12, padding: '9px 16px',
                boxShadow: '0 4px 20px rgba(0,0,0,0.10)',
                display: 'flex', alignItems: 'center', gap: 8,
              }}>
                <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#4ade80', display: 'block', flexShrink: 0 }} />
                <span style={{ fontFamily: 'var(--font-label), sans-serif', fontSize: 10, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: '#2A3550' }}>Looking for full time · CU Boulder MS &apos;25</span>
              </div>
            </motion.div>

          </div>
        </section>

        {/* ── Journey Map ── */}
        <div style={{ margin: '0 20px 20px', borderRadius: 20, overflow: 'hidden' }}>
          <JourneyMap
            items={journeyData}
            accent="#A880D4"
            title="the whole journey, at once"
            eyebrow="interior design → ux · two countries · one direction"
          />
        </div>

        {/* ── How I work ── */}
        <section className="about-page-section" style={{ margin: '0 20px 20px', borderRadius: 20, background: '#F7F3EE', padding: 'clamp(60px, 8vw, 96px) clamp(32px, 7vw, 96px)', overflow: 'hidden' }}>
          <motion.p
            style={{ fontFamily: 'var(--font-label), sans-serif', fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#9CA3AF', marginBottom: 16, fontWeight: 700 }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Skills
          </motion.p>
          <motion.h2
            style={{ fontFamily: 'var(--font-display), Georgia, serif', fontSize: 'clamp(28px, 3.5vw, 44px)', fontWeight: 400, fontStyle: 'italic', color: '#2A3550', marginBottom: 48, lineHeight: 1.1 }}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            How I work.
          </motion.h2>

          <div className="about-skills-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
            {principles.map((card, i) => (
              <motion.div
                key={card.title}
                style={{ background: 'white', borderRadius: 16, padding: '28px 28px', border: '1px solid rgba(42,53,80,0.07)' }}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
              >
                <h3 style={{ fontFamily: 'var(--font-heading), Georgia, serif', fontSize: 18, fontWeight: 700, color: '#2A3550', marginBottom: 12 }}>{card.title}</h3>
                <p style={{ fontFamily: 'var(--font-body), Georgia, serif', fontSize: 15, color: 'rgba(42,53,80,0.62)', lineHeight: 1.72, margin: 0 }}>{card.body}</p>
              </motion.div>
            ))}
          </div>
        </section>

        <Contact />
      </main>
    </>
  )
}
