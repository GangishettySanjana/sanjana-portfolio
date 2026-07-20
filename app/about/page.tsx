'use client'

import { motion, useReducedMotion } from 'framer-motion'

/* ─────────────────────────────────────────────────────────────────
   About page — four sections, each with one visual anchor:
     1. Opener + portrait   (side by side)
     2. The journey         (three beats on a line, alternating)
     3. The human bit       (principles + off-the-clock + right now)
     4. What I'm looking for (full-bleed dark close, CTAs rolled in)

   All copy is carried over verbatim. The only writing that does not
   survive is the four collapsed timeline beats, which the brief
   explicitly asked to compress into a single "along the way" line.
   ───────────────────────────────────────────────────────────────── */

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

const GRAIN = "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E\")"

const CARD_COLORS = ['#A880D4', '#2BB5C2', '#F59E0B', '#4ade80', '#F472B6', '#60A5FA']

/* The three beats that carry the story. The rest collapse to one line. */
const BIG_BEATS = [timeline[0], timeline[3], timeline[7]]
const NOW_BEAT = timeline[8]

const SERIF = 'var(--font-serif), Georgia, serif'
const SANS = "'Satoshi', sans-serif"
const PAD_X = 'clamp(32px, 7vw, 96px)'

const EMAIL = 'gangishettysanjana084@gmail.com'
const LINKEDIN = 'https://www.linkedin.com/in/sanjana-gangishetty'
const RESUME = '/resume.pdf?v=0622'

function Kicker({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) {
  return (
    <p style={{
      fontFamily: SANS, fontSize: 11, fontWeight: 700,
      letterSpacing: '0.14em', textTransform: 'uppercase',
      color: dark ? 'rgba(255,255,255,0.35)' : 'rgba(13,13,13,0.35)',
      margin: '0 0 16px',
    }}>{children}</p>
  )
}

export default function AboutPage() {
  const reduce = useReducedMotion()
  /* One reveal used everywhere, disabled wholesale under reduced motion
     so nothing is ever gated behind an animation that will not run. */
  const rise = reduce
    ? {}
    : {
        initial: { opacity: 0, y: 18 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: '-60px' },
        transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
      }

  return (
    <main style={{ background: '#F7F3EE' }}>

      {/* ── 1 · OPENER + PORTRAIT ─────────────────────────────── */}
      <section style={{
        background: '#FDFAF5', position: 'relative', overflow: 'hidden',
        padding: `var(--section-pad-lg) ${PAD_X}`,
      }}>
        <div style={{ position: 'absolute', inset: 0, zIndex: 0, opacity: 0.25, backgroundImage: GRAIN, backgroundRepeat: 'repeat', backgroundSize: '180px 180px', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: -120, right: '18%', width: 460, height: 460, background: 'radial-gradient(circle, rgba(168,128,212,0.10) 0%, transparent 70%)', borderRadius: '50%', pointerEvents: 'none' }} />

        <div className="about-opener" style={{ position: 'relative', zIndex: 1, maxWidth: 1180, margin: '0 auto' }}>
          {/* text column */}
          <motion.div {...rise}>
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: 7,
              background: 'rgba(74,222,128,0.1)', border: '1px solid rgba(74,222,128,0.3)',
              borderRadius: 999, padding: '6px 14px', marginBottom: 28,
              fontFamily: SANS, fontSize: 11, fontWeight: 700,
              color: '#16a34a', letterSpacing: '0.06em', textTransform: 'uppercase',
            }}>
              <span style={{ position: 'relative', display: 'inline-flex' }}>
                <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#4ade80', display: 'block' }} />
                {!reduce && <span style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: '#4ade80', animation: 'ping 1.5s cubic-bezier(0,0,0.2,1) infinite', opacity: 0.5 }} />}
              </span>
              Open to work
            </span>

            <h1 style={{
              fontFamily: SERIF, fontWeight: 400,
              fontSize: 'clamp(36px, 4.6vw, 60px)', lineHeight: 1.1,
              letterSpacing: '0.01em', color: '#111827', margin: '0 0 26px',
            }}>
              hi, it means a lot<br />that you&apos;re here ✦
            </h1>

            <p style={{ fontFamily: SANS, fontSize: 'clamp(15px, 1.3vw, 17px)', color: '#555', lineHeight: 1.6, margin: '0 0 16px' }}>
              I&apos;m Sanjana. ~7 years in design, ~3 in product, studying it, working in it, thinking about it. I started in interior spaces and moved into product design. That background shapes how I work now. It just means I learned early how to figure out what something needs to feel like before anyone has words for it.
            </p>
            <p style={{ fontFamily: SANS, fontSize: 'clamp(15px, 1.3vw, 17px)', color: '#555', lineHeight: 1.6, margin: '0 0 32px' }}>
              These days I design digital products. AI workflows, interactive exhibits, things people actually want to use. What I care about most is the gap between <em style={{ fontStyle: 'italic', color: '#111' }}>technically works</em> and <em style={{ fontStyle: 'italic', color: '#111' }}>actually good.</em>
            </p>

            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              <a href={`mailto:${EMAIL}`} className="about-cta-solid" style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '13px 28px', borderRadius: 999, background: '#111', color: '#fff',
                fontFamily: SANS, fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', textDecoration: 'none',
              }}>Let&apos;s talk →</a>
              <a href={RESUME} target="_blank" rel="noopener noreferrer" className="about-cta-ghost" style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '13px 28px', borderRadius: 999, border: '1.5px solid rgba(0,0,0,0.18)', color: '#111',
                fontFamily: SANS, fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', textDecoration: 'none', background: 'transparent',
              }}>Resume ↗</a>
            </div>
          </motion.div>

          {/* portrait */}
          <motion.div {...rise} transition={{ ...(rise as { transition?: object }).transition, delay: 0.12 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/sanjana-hero.png"
              alt="Sanjana Gangishetty, photographed outdoors against greenery"
              style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 20, display: 'block', maxHeight: 560 }}
            />
          </motion.div>
        </div>
      </section>

      {/* ── 2 · THE JOURNEY ───────────────────────────────────── */}
      <section style={{ background: '#F7F3EE', position: 'relative', overflow: 'hidden', padding: `var(--section-pad) ${PAD_X}` }}>
        <div style={{ position: 'absolute', inset: 0, zIndex: 0, opacity: 0.3, backgroundImage: GRAIN, backgroundRepeat: 'repeat', backgroundSize: '180px 180px', pointerEvents: 'none' }} />
        <div style={{ position: 'relative', zIndex: 1, maxWidth: 1100, margin: '0 auto' }}>
          <motion.div {...rise}>
            <Kicker>The journey</Kicker>
            <h2 style={{ fontFamily: SERIF, fontWeight: 400, fontSize: 'clamp(32px, 4.2vw, 54px)', lineHeight: 1.1, letterSpacing: '0.01em', color: '#111827', margin: '0 0 clamp(40px, 5vw, 64px)' }}>
              Interior design to product. Five years, two countries.
            </h2>
          </motion.div>

          {/* the line the beats hang off */}
          <div className="about-journey" style={{ position: 'relative' }}>
            <div className="about-journey-line" aria-hidden="true" />
            {BIG_BEATS.map((beat, i) => (
              <motion.div key={beat.year + beat.title} className={`about-beat ${i % 2 ? 'about-beat-right' : 'about-beat-left'}`} {...rise}>
                <span className="about-beat-watermark" aria-hidden="true" style={{ fontFamily: SERIF }}>{beat.year}</span>
                <div className="about-beat-card" style={{ borderTop: `3px solid ${beat.color}`, background: beat.pivot ? 'rgba(43,181,194,0.07)' : '#fff' }}>
                  <span style={{ fontFamily: SANS, fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: beat.color }}>
                    {beat.year} · {beat.tag}{beat.pivot ? ' · the pivot' : ''}
                  </span>
                  <h3 style={{ fontFamily: SERIF, fontWeight: 400, fontSize: 'clamp(21px, 2.1vw, 28px)', lineHeight: 1.15, color: '#111827', margin: '10px 0 8px' }}>{beat.title}</h3>
                  <p style={{ fontFamily: SANS, fontSize: 13, color: 'rgba(13,13,13,0.45)', margin: '0 0 12px', fontStyle: 'italic' }}>{beat.whisper}</p>
                  <p style={{ fontFamily: SANS, fontSize: 15, color: 'rgba(13,13,13,0.62)', lineHeight: 1.6, margin: 0 }}>{beat.detail}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* everything else, compressed to one line */}
          <motion.p className="about-alongtheway" {...rise}>
            <span style={{ fontFamily: SANS, fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(13,13,13,0.4)' }}>Along the way</span>
            <span style={{ fontFamily: SANS, fontSize: 15, color: 'rgba(13,13,13,0.62)' }}>
              Google UX cert · moved to Boulder · shipped Aura · six interiors, mostly solo
            </span>
          </motion.p>

          <motion.p className="about-alongtheway" {...rise} style={{ borderTop: 'none', marginTop: 0 }}>
            <span style={{ fontFamily: SANS, fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#16a34a' }}>Now</span>
            <span style={{ fontFamily: SANS, fontSize: 15, color: 'rgba(13,13,13,0.62)' }}>{NOW_BEAT.detail}</span>
          </motion.p>
        </div>
      </section>

      {/* ── 3 · THE HUMAN BIT ─────────────────────────────────── */}
      <section style={{ background: '#fff', position: 'relative', overflow: 'hidden', padding: `var(--section-pad) 0` }}>
        <div style={{ position: 'absolute', inset: 0, zIndex: 0, opacity: 0.25, backgroundImage: GRAIN, backgroundRepeat: 'repeat', backgroundSize: '180px 180px', pointerEvents: 'none' }} />
        <div style={{ position: 'relative', zIndex: 1, maxWidth: 1100, margin: '0 auto', padding: `0 ${PAD_X}` }}>

          <motion.div {...rise}>
            <Kicker>How I work</Kicker>
            <h2 style={{ fontFamily: SERIF, fontWeight: 400, fontSize: 'clamp(32px, 4.2vw, 54px)', lineHeight: 1.1, letterSpacing: '0.01em', color: '#111827', margin: '0 0 36px' }}>
              Six things that don&apos;t change.
            </h2>
          </motion.div>

          {/* compact two-column, not the old 36px-padded full-width rows */}
          <div className="about-principles">
            {principles.map((card, i) => (
              <motion.div key={card.title} className="about-principle" {...rise}>
                <span style={{ fontFamily: SANS, fontWeight: 700, fontSize: 12, color: CARD_COLORS[i], letterSpacing: '0.06em' }}>0{i + 1}</span>
                <h3 style={{ fontFamily: SANS, fontSize: 16, fontWeight: 700, color: '#111827', margin: '6px 0 6px', lineHeight: 1.25 }}>{card.title}</h3>
                <p style={{ fontFamily: SANS, fontSize: 14, color: 'rgba(13,13,13,0.55)', lineHeight: 1.6, margin: 0 }}>{card.body}</p>
              </motion.div>
            ))}
          </div>

          <motion.div {...rise} style={{ marginTop: 'clamp(48px, 6vw, 72px)', paddingTop: 'clamp(40px, 5vw, 56px)', borderTop: '1px solid rgba(13,13,13,0.1)' }}>
            <Kicker>Outside of design</Kicker>
            <h3 style={{ fontFamily: SERIF, fontWeight: 400, fontSize: 'clamp(26px, 3.2vw, 40px)', lineHeight: 1.15, letterSpacing: '0.01em', color: '#111827', margin: '0 0 18px' }}>
              I exist outside of Figma, I promise.
            </h3>
            <p style={{ fontFamily: SANS, fontSize: 'clamp(15px, 1.3vw, 17px)', color: 'rgba(13,13,13,0.55)', lineHeight: 1.6, margin: 0, maxWidth: '68ch' }}>
              Outside of work I am usually in the kitchen. Baking something I found at 11pm, or cooking for people I love. I travel whenever I get the chance. I watch shows with a level of commitment that is honestly a little embarrassing. Some of my best ideas show up on long flights or over a really good meal.
            </p>
            {/* interests, one inline line rather than a second marquee */}
            <p style={{ fontFamily: SANS, fontSize: 13, color: 'rgba(13,13,13,0.42)', margin: '18px 0 0', letterSpacing: '0.02em' }}>
              Baking ✦ Travelling ✦ Cooking ✦ Hanging with friends ✦ Binge-watching shows
            </p>
          </motion.div>
        </div>

        {/* the section's visual anchor: one full-bleed photo marquee */}
        <motion.div {...rise} style={{ position: 'relative', zIndex: 1, width: '100vw', left: '50%', transform: 'translateX(-50%)', overflow: 'hidden', margin: 'clamp(36px, 4vw, 52px) 0 0' }}>
          <div className="about-photostrip" style={{ display: 'flex', gap: 12, width: 'max-content' }}>
            {[...Array(2)].map((_, rep) => (
              <div key={rep} style={{ display: 'flex', gap: 12, flexShrink: 0 }} aria-hidden={rep === 1}>
                {[
                  { src: '/About/IMG_0298.jpg', width: 220 },
                  { src: '/About/IMG_0476.jpg', width: 320 },
                  { src: '/About/IMG_7265.jpg', width: 220 },
                  { src: '/About/IMG_8183.jpg', width: 260 },
                  { src: '/About/IMG_0675.jpg', width: 220 },
                  { src: '/About/IMG_5333.jpg', width: 320 },
                  { src: '/About/IMG_7161.jpg', width: 260 },
                ].map((photo, i) => (
                  <div key={i} style={{ flexShrink: 0, width: photo.width, height: 280, borderRadius: 12, overflow: 'hidden', border: '1px solid rgba(13,13,13,0.06)' }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={photo.src} alt={rep === 0 ? 'A moment from life outside design' : ''} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </motion.div>

        {/* right now — kept with its colour-coded left borders */}
        <div style={{ position: 'relative', zIndex: 1, maxWidth: 1100, margin: '0 auto', padding: `clamp(44px, 5vw, 64px) ${PAD_X} 0` }}>
          <motion.div {...rise}><Kicker>Right now</Kicker></motion.div>
          <div className="about-now-grid">
            {[
              { label: 'Reading', value: "Clock In by Emily the Recruiter. Genuinely a little funny that I'm reading a career book mid-job-search, but here we are. It's making me think harder about what I actually want, not just what I think I'm supposed to want.", color: '#D97706' },
              { label: 'Building', value: "Learning to build real things with Claude Code. I'm a designer who can now ship her own ideas without waiting on anyone. Still wrapping my head around that one.", color: '#0BB4CC' },
              { label: 'Thinking about', value: "Why seamlessness is so rare. Most products get close and then sort of... stop. I think about this more than is probably healthy.", color: '#9B5DE5' },
            ].map(item => (
              <motion.div key={item.label} {...rise} style={{ borderLeft: `3px solid ${item.color}`, paddingLeft: 18 }}>
                <span style={{ fontFamily: SANS, fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: item.color }}>{item.label}</span>
                <p style={{ fontFamily: SANS, fontSize: 14, color: 'rgba(13,13,13,0.62)', lineHeight: 1.6, margin: '8px 0 0' }}>{item.value}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4 · WHAT I'M LOOKING FOR + CONTACT ────────────────── */}
      <motion.section {...rise} style={{ background: '#111827', position: 'relative', overflow: 'hidden', padding: `var(--section-pad) ${PAD_X}` }}>
        <div style={{ position: 'absolute', inset: 0, zIndex: 0, opacity: 0.4, backgroundImage: GRAIN, backgroundRepeat: 'repeat', backgroundSize: '180px 180px', pointerEvents: 'none' }} />
        <div aria-hidden="true" style={{ position: 'absolute', top: -10, right: 32, fontSize: 'clamp(120px, 16vw, 200px)', lineHeight: 1, fontFamily: SERIF, color: 'rgba(255,255,255,0.05)', pointerEvents: 'none', userSelect: 'none', zIndex: 0 }}>&rdquo;</div>

        <div style={{ position: 'relative', zIndex: 1, maxWidth: 1100, margin: '0 auto' }}>
          <Kicker dark>What I&apos;m looking for</Kicker>
          <h2 style={{ fontFamily: SERIF, fontWeight: 400, fontSize: 'clamp(28px, 3.6vw, 48px)', lineHeight: 1.15, letterSpacing: '0.01em', color: '#fff', margin: '0 0 18px', maxWidth: '20ch' }}>
            I want to work somewhere that starts with the person, not the feature list.
          </h2>
          <p style={{ fontFamily: SANS, fontSize: 'clamp(15px, 1.3vw, 17px)', color: 'rgba(255,255,255,0.5)', lineHeight: 1.6, margin: '0 0 36px', maxWidth: '62ch' }}>
            The kind of place where someone can say &ldquo;this works but it doesn&apos;t feel right&rdquo; and the room takes it seriously. I&apos;ve been in rooms like that. I want back in.
          </p>

          {/* Contact rolled in, so the page ends on one moment */}
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
            <a href={`mailto:${EMAIL}`} className="about-cta-solid" style={{
              display: 'inline-flex', alignItems: 'center', gap: 8, padding: '14px 28px', borderRadius: 999,
              background: '#fff', color: '#111827', fontFamily: SANS, fontSize: 12, fontWeight: 700,
              letterSpacing: '0.08em', textTransform: 'uppercase', textDecoration: 'none',
            }}>Let&apos;s talk →</a>
            <a href={LINKEDIN} target="_blank" rel="noopener noreferrer" className="about-cta-dark-ghost" style={{
              display: 'inline-flex', alignItems: 'center', gap: 8, padding: '14px 28px', borderRadius: 999,
              border: '1.5px solid rgba(255,255,255,0.25)', color: '#fff', fontFamily: SANS, fontSize: 12, fontWeight: 700,
              letterSpacing: '0.08em', textTransform: 'uppercase', textDecoration: 'none',
            }}>LinkedIn ↗</a>
            <a href={RESUME} target="_blank" rel="noopener noreferrer" className="about-cta-dark-ghost" style={{
              display: 'inline-flex', alignItems: 'center', gap: 8, padding: '14px 28px', borderRadius: 999,
              border: '1.5px solid rgba(255,255,255,0.25)', color: '#fff', fontFamily: SANS, fontSize: 12, fontWeight: 700,
              letterSpacing: '0.08em', textTransform: 'uppercase', textDecoration: 'none',
            }}>Résumé ↗</a>
          </div>
          <p style={{ fontFamily: SANS, fontSize: 13, color: 'rgba(255,255,255,0.4)', margin: '22px 0 0' }}>{EMAIL}</p>
        </div>
      </motion.section>
    </main>
  )
}
