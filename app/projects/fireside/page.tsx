'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './fireside.css'

/* ── Page ─────────────────────────────────────────────────────────── */
export default function FiresidePage() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const NAV = [
      { id: 'context',    num: '01', label: 'Context'        },
      { id: 'role',       num: '02', label: 'My Role'        },
      { id: 'solution',   num: '03', label: 'The Solution'   },
      { id: 'experience', num: '04', label: 'User Experience'},
      { id: 'prototype',  num: '05', label: 'iPad Prototype' },
      { id: 'spatial',    num: '06', label: 'Spatial Design' },
      { id: 'reflection', num: '07', label: 'Reflection'     },
    ]

    const sections   = NAV.map(n => document.getElementById(n.id)).filter(Boolean) as HTMLElement[]
    const vLinks     = Array.from(document.querySelectorAll('.fx-v-link')) as HTMLElement[]
    const fill       = document.querySelector('.fx-v-fill') as HTMLElement | null
    const total      = sections.length

    function activate(index: number) {
      if (fill) {
        gsap.to(fill, { height: `${((index + 1) / total) * 100}%`, duration: 0.55, ease: 'power3.out' })
      }
      vLinks.forEach((link, i) => {
        gsap.to(link, {
          color: i === index ? 'rgba(0,36,72,0.75)' : 'rgba(0,36,72,0.22)',
          duration: 0.3, ease: 'power2.out',
        })
      })
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
      <div className="fx-page" style={{ paddingTop: 64 }}>

        {/* ── VERTICAL SCROLLSPY NAV ──────────────────────── */}
        <nav className="fx-v-nav" aria-label="Page sections">
          <div className="fx-v-track">
            <div className="fx-v-fill" style={{ height: '14.28%' }}></div>
          </div>
          <div className="fx-v-items">
            {[
              { href: '#context',    label: 'Context'    },
              { href: '#role',       label: 'Role'       },
              { href: '#solution',   label: 'Solution'   },
              { href: '#experience', label: 'Experience' },
              { href: '#prototype',  label: 'Prototype'  },
              { href: '#spatial',    label: 'Spatial'    },
              { href: '#reflection', label: 'Reflection' },
            ].map(({ href, label }) => (
              <a key={href} href={href} className="fx-v-link">{label}</a>
            ))}
          </div>
        </nav>

        {/* ── HERO ────────────────────────────────────────── */}
        <section className="fx-hero" id="hero">
          <div className="fx-container">
            <Link href="/#work" className="fx-back-link" onClick={() => sessionStorage.setItem('skipIntro', '1')}>← Back to work</Link>
            <p className="fx-eyebrow">Academic Project · CU Boulder · UX Design</p>
            <h1 className="fx-hero-title">Designing a Wildfire Exhibit Anyone Could Use</h1>
            <p className="fx-hero-sub">
              Wildfires are becoming more frequent and harder to predict. Most education still looks like a pamphlet.
              I designed the interface for a 3D topographic exhibit that lets visitors experience how fire spreads, not just read about it.
            </p>

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
          </div>
        </section>

        {/* ── 01 CONTEXT ──────────────────────────────────── */}
        <section className="fx-sec" id="context">
          <div className="fx-container">
            <p className="fx-sec-label">01 · Context</p>
            <h2 className="fx-sec-title">A wildfire doesn&apos;t wait for you to understand it.</h2>

            <div className="fx-prose" style={{ marginBottom: 32 }}>
              <p>Wildfires are becoming more frequent, more destructive, and harder to predict. But most public education still looks like a pamphlet. The Fireside Interactive project set out to change that, by building a physical exhibit that let visitors actually experience how a wildfire spreads, not just read about it.</p>
              <p>The project was developed as part of CU Boulder&apos;s community wildfire awareness initiative. The audience was everyone: families, school groups, firefighters, and retirees. The exhibit needed to work in a noisy science museum, capture attention in under 10 seconds, and teach something real in under 5 minutes.</p>
            </div>

            <img
              src="/projects/fireside/exhibit-in-use.png"
              alt="Fireside exhibit in use at a public science event"
              style={{ width: '100%', display: 'block', borderRadius: 14, border: '1px solid rgba(0,36,72,0.07)', marginBottom: 40 }}
            />

            <div className="fx-ctx-rows">
              {[
                {
                  label: 'The ask',
                  text: 'Make wildfire science accessible and visceral to a general public audience in a high-traffic exhibit setting.',
                },
                {
                  label: 'The constraint',
                  text: 'No instructions. The exhibit had to be self-explanatory from the moment someone walked up.',
                },
                {
                  label: 'Audience',
                  text: 'Families, school groups, educators, and fire scientists. All in the same room.',
                },
                {
                  label: 'Setting',
                  text: 'Noisy public science museums. Short attention spans. Variable lighting.',
                },
                {
                  label: 'Collaborators',
                  text: 'CU Boulder design team, hardware engineers, fire science researchers.',
                },
              ].map(({ label, text }) => (
                <div key={label} className="fx-ctx-row">
                  <span className="fx-ctx-key">{label}</span>
                  <p className="fx-ctx-val">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 02 MY ROLE ──────────────────────────────────── */}
        <section className="fx-sec fx-sec-alt" id="role">
          <div className="fx-container">
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
          </div>
        </section>

        {/* ── 03 THE SOLUTION ─────────────────────────────── */}
        <section className="fx-sec" id="solution">
          <div className="fx-container">
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
                bullets: [
                  'A fire is already burning. Deploy suppression resources: firebreaks, water drops, evacuation routes.',
                  'High urgency, constrained resources, real tradeoffs.',
                  'Designed to work for 8-year-olds and retired firefighters simultaneously.',
                ],
              },
            ].map(({ barColor, modeLabel, title, img, bullets }) => (
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
                <img src={img} alt={title} className="fx-design-img" />
                <ul className="fx-bullets">
                  {bullets.map(item => <li key={item}>{item}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* ── 04 USER EXPERIENCE ──────────────────────────── */}
        <section className="fx-sec fx-sec-alt" id="experience">
          <div className="fx-container">
            <p className="fx-sec-label">04 · User Experience</p>
            <h2 className="fx-sec-title">Designed for everyone who walks through the door.</h2>

            <div className="fx-prose" style={{ marginBottom: 32 }}>
              <p>The hardest constraint: the exhibit had to be immediately usable without instructions, engaging for a curious 8-year-old, and credible enough for a fire behavior researcher.</p>
            </div>

            <img
              src="/projects/fireside/user-flow.png"
              alt="User flow diagram for the Fireside exhibit"
              style={{ width: '100%', display: 'block', borderRadius: 12, border: '1px solid var(--border)', marginBottom: 40 }}
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
          </div>
        </section>

        {/* ── 05 IPAD PROTOTYPE ───────────────────────────── */}
        <section className="fx-sec" id="prototype">
          <div className="fx-container">
            <p className="fx-sec-label">05 · iPad Prototype</p>
            <h2 className="fx-sec-title">The companion interface, for facilitators and deeper learners.</h2>

            <div className="fx-prose" style={{ marginBottom: 32 }}>
              <p>Alongside the physical table, a tablet interface gives facilitators control over exhibit state, and gives curious visitors a way to go deeper: fire science data, case studies from real events, step-by-step mode explanations.</p>
              <p>The iPad screens went through three design phases: first a dashboard-heavy approach that overwhelmed test users, then a stripped-back information-first layout, and finally the current version, which surfaces only what&apos;s needed for the current mode.</p>
            </div>

            <img
              src="/projects/fireside/intro-screens.png"
              alt="iPad intro screens for Fireside"
              style={{ width: '100%', display: 'block', borderRadius: 14, border: '1px solid var(--border)', marginBottom: 16 }}
            />

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 16 }}>
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

            <img
              src="/projects/fireside/information-mode.png"
              alt="iPad information mode screen"
              style={{ width: '100%', display: 'block', borderRadius: 14, border: '1px solid var(--border)', marginBottom: 40 }}
            />

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
          </div>
        </section>

        {/* ── 06 SPATIAL DESIGN ───────────────────────────── */}
        <section className="fx-sec fx-sec-alt" id="spatial">
          <div className="fx-container">
            <p className="fx-sec-label">06 · Spatial Design</p>
            <h2 className="fx-sec-title">The table is the interface.</h2>

            <div className="fx-prose" style={{ marginBottom: 32 }}>
              <p>Most of the interaction design decisions were actually spatial decisions. Where you place the controls relative to where the effects appear teaches users without words. We went through four floor plan iterations before the cause-and-effect loop felt immediate.</p>
            </div>

            <img
              src="/projects/fireside/spatial-layout.png"
              alt="Spatial layout diagram for the Fireside exhibit"
              style={{ width: '100%', display: 'block', borderRadius: 12, border: '1px solid var(--border)', marginBottom: 40 }}
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
          </div>
        </section>

        {/* ── 07 REFLECTION ───────────────────────────────── */}
        <section className="fx-sec" id="reflection">
          <div className="fx-container">
            <p className="fx-sec-label">07 · Reflection</p>
            <h2 className="fx-sec-title">The hardest design problem was the one I didn&apos;t expect.</h2>

            <div className="fx-prose">
              <p>This was the first time I had to design for a non-screen medium. The projection-on-terrain constraint was genuinely hard, and genuinely interesting. I&apos;d never thought about how pixel density changes meaning when your canvas has hills.</p>
              <p>Or how a control feels intuitive not because of its label but because of where it sits relative to the effect. Designing for physical space forced me to think spatially in a way that screen design never had.</p>
            </div>

            <div className="fx-reflection-callout">
              <span className="fx-reflection-label">What I&apos;m most proud of</span>
              <p>The exhibit works for an 8-year-old and a retired firefighter in the same room, at the same time, without requiring either of them to compromise. That&apos;s hard. We got there by testing obsessively with real people and being willing to throw out work that didn&apos;t survive contact with actual visitors.</p>
            </div>
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
