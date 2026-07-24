'use client'

import { useEffect } from 'react'
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
import './getup.css'
import '@/app/projects/_case/case-kit.css'
import '@/app/projects/_case/buildnative.css'
import '@/app/projects/_case/case-sky.css'

/* ── Page ─────────────────────────────────────────────────────────── */
export default function GetUpPage() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const NAV = [
      { id: 'context',    num: '01', label: 'Context'      },
      { id: 'role',       num: '02', label: 'My Role'       },
      { id: 'brief',      num: '03', label: 'The Brief'     },
      { id: 'design',     num: '04', label: 'The Design'    },
      { id: 'copy',       num: '05', label: 'Copy Process'  },
      { id: 'reflection', num: '06', label: 'Reflection'    },
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
            <div className="fx-v-fill" style={{ height: '16.67%' }}></div>
          </div>
          <div className="fx-v-items">
            {[
              { href: '#context',    n: '01', label: 'Context'    },
              { href: '#role',       n: '02', label: 'Role'       },
              { href: '#brief',      n: '03', label: 'Brief'      },
              { href: '#design',     n: '04', label: 'Design'     },
              { href: '#copy',       n: '05', label: 'Copy'       },
              { href: '#reflection', n: '06', label: 'Reflection' },
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
            <p className="fx-eyebrow">Freelance · Marketing &amp; Brand Design · 2024</p>
            <h1 className="fx-hero-title">A Pre-Order Campaign With No Brief, No Guidelines, Three Weeks</h1>
            <p className="fx-hero-sub">
              GetUp is a health brand backed by Jason Derulo. They were relaunching their caffeinated Energy Bites and needed a pre-order pop-up fast. No copywriter, no brand guidelines. I was the only designer. Three weeks to Figma handoff.
            </p>

            {/* Real constraints from the brief: three weeks, one designer,
                no guidelines. Sits outside .fx-summary-card so it shares the
                hero column's left edge, as on FlairX, Fireside and Aura. */}
            <CaseStats
              items={[
                { value: '3 weeks', label: 'First contact to dev-ready Figma handoff' },
                { value: '1', label: 'Designer: brand voice, copy and design' },
                { value: '0', label: 'Brand guidelines to work from' },
              ]}
            />

            <div className="fx-summary-card">
              <div className="fx-summary-top">
                <p className="fx-summary-hmw">
                  <strong>The challenge:</strong> Derive the brand voice, write the copy, design the pop-up, and deliver a dev-ready Figma package in three weeks with minimal information.
                </p>
                <span className="fx-status-live">Freelance</span>
              </div>
              <div className="fx-summary-meta">
                <div className="fx-smeta-item">
                  <span className="fx-smeta-k">Role</span>
                  <span className="fx-smeta-v">Sole Designer</span>
                </div>
                <div className="fx-smeta-item">
                  <span className="fx-smeta-k">Company</span>
                  <span className="fx-smeta-v">GetUp (Jason Derulo)</span>
                </div>
                <div className="fx-smeta-item">
                  <span className="fx-smeta-k">Year</span>
                  <span className="fx-smeta-v">2024</span>
                </div>
                <div className="fx-smeta-item">
                  <span className="fx-smeta-k">Duration</span>
                  <span className="fx-smeta-v">3 weeks</span>
                </div>
                <div className="fx-smeta-item">
                  <span className="fx-smeta-k">Tools</span>
                  <span className="fx-smeta-v">Figma · Claude</span>
                </div>
              </div>
              <div className="fx-summary-cols">
                <div className="fx-sum-col fx-sum-problem">
                  <div className="fx-sum-head">
                    <span className="fx-sum-label">The Problem</span>
                  </div>
                  <ul>
                    <li>No brand guidelines provided</li>
                    <li>No copywriter on the project</li>
                    <li>High-visibility launch with celebrity backing</li>
                  </ul>
                </div>
                <div className="fx-sum-col fx-sum-approach">
                  <div className="fx-sum-head">
                    <span className="fx-sum-label">What I did</span>
                  </div>
                  <ul>
                    <li>Reverse-engineered the brand voice from existing social content</li>
                    <li>Wrote and pressure-tested copy with Claude</li>
                    <li>Delivered complete Figma package with all variants</li>
                  </ul>
                </div>
                <div className="fx-sum-col fx-sum-result">
                  <div className="fx-sum-head">
                    <span className="fx-sum-label">Outcome</span>
                  </div>
                  <ul>
                    <li>Shipped live and on time, brief to dev-ready handoff in three weeks</li>
                    <li>Brand voice and copy built from scratch, no copywriter, no guidelines</li>
                    <li>Mobile-first pop-up, responsive to desktop, every state annotated for dev</li>
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
            <h2 className="fx-sec-title">A celebrity-backed energy brand. Three weeks. A sparse brief.</h2>

            <CaseSpecStrip
              items={[
                { label: 'Role', value: 'Sole designer: brand voice, copy and design' },
                { label: 'Brand', value: 'GetUp, a Jason Derulo-backed health brand — outdoors-meets-wellness, not hardcore fitness' },
                { label: 'Ask', value: 'A pre-order pop-up for a caffeinated Energy Bites relaunch' },
                { label: 'Brief', value: 'Vibes, not guidelines' },
                { label: 'Constraint', value: 'Three weeks from first contact to Figma handoff' },
              ]}
            />

            <p style={{ fontFamily: 'var(--fx-sans)', fontSize: 'var(--type-base)', color: 'var(--muted)', lineHeight: 'var(--lh-relaxed)', margin: '32px 0 0' }}>
              A pop-up has to land before someone decides to close it. So the layout stays ruthless: one product, one value prop, one CTA, and nothing competing for attention.
            </p>
            </Reveal>
          </div>
        </section>

        {/* ── 02 MY ROLE ──────────────────────────────────── */}
        <section className="fx-sec fx-sec-alt" id="role">
          <div className="fx-container">
            <Reveal>
            <p className="fx-sec-label">02 · My Role</p>
            <h2 className="fx-sec-title">Sole designer: copy, visual direction, and Figma handoff.</h2>

            <p style={{ fontFamily: 'var(--fx-sans)', fontSize: 'var(--type-base)', color: 'var(--muted)', lineHeight: 'var(--lh-relaxed)', margin: '0 0 36px' }}>
              No design lead, no brand guidelines, no copywriter. I derived the visual direction from GetUp&apos;s existing social presence, wrote and tested the copy myself, and delivered a complete Figma package ready for dev in three weeks.
            </p>

            <div className="fx-decisions-list">
              {[
                {
                  num: '01',
                  title: 'Brand Research',
                  text: "Reverse-engineered the brand voice from existing social and web content. Built a mood board to align on tone before touching Figma.",
                },
                {
                  num: '02',
                  title: 'Copy Direction',
                  text: "Wrote and pressure-tested headline options. Used Claude to run multiple drafts fast. Final copy stayed short and plain. A pop-up isn't the place to get clever.",
                },
                {
                  num: '03',
                  title: 'Visual Design',
                  text: "Designed the full pop-up with hero product image, clear value statement, and single CTA. Mobile-first, responsive to desktop.",
                },
                {
                  num: '04',
                  title: 'Dev Handoff',
                  text: "Full Figma component with desktop and mobile variants, interaction states, and annotated notes on hover behavior and close action.",
                },
              ].map(({ num, title, text }) => (
                <div key={num} className="fx-decision">
                  <div className="fx-decision-num">{num}</div>
                  <div className="fx-decision-body">
                    <h3>{title}</h3>
                    <div className="fx-dblock">
                      <p>{text}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            </Reveal>
          </div>
        </section>

        {/* seam: sky fades into the white reading body */}
        <div className="fx-sky-seam" aria-hidden="true" />

        {/* ── 03 THE BRIEF ────────────────────────────────── */}
        <section className="fx-sec" id="brief">
          <div className="fx-container">
            <Reveal>
            <p className="fx-sec-label">03 · The Brief</p>
            <h2 className="fx-sec-title">What they gave me. What I had to figure out.</h2>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginTop: 8 }}>
              <div style={{
                border: '1px solid var(--border)',
                borderRadius: 16,
                overflow: 'hidden',
              }}>
                <div style={{
                  background: 'var(--text)',
                  padding: '14px 20px',
                }}>
                  <span style={{
                    fontFamily: 'var(--fx-sans)',
                    fontSize: 'var(--type-xs)',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.09em',
                    color: 'rgba(255,255,255,0.7)',
                  }}>Given</span>
                </div>
                <div style={{ padding: '20px 22px', background: 'var(--card)' }}>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
                    {[
                      'Product: caffeinated Energy Bites, new SKU',
                      'Goal: drive pre-orders before launch',
                      'Format: pop-up modal, web',
                      'Timeline: 3 weeks to handoff',
                      'Brand: GetUp by Jason Derulo',
                    ].map(item => (
                      <li key={item} style={{
                        fontFamily: 'var(--fx-sans)',
                        fontSize: 'var(--type-sm)',
                        color: 'var(--muted)',
                        lineHeight: 'var(--lh-normal)',
                        paddingLeft: 14,
                        position: 'relative',
                      }}>
                        <span style={{ position: 'absolute', left: 0, color: 'rgba(43,181,194,0.55)' }}>→</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div style={{
                border: '1px solid var(--border)',
                borderRadius: 16,
                overflow: 'hidden',
              }}>
                <div style={{
                  background: 'var(--accent)',
                  padding: '14px 20px',
                }}>
                  <span style={{
                    fontFamily: 'var(--fx-sans)',
                    fontSize: 'var(--type-xs)',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.09em',
                    color: 'rgba(255,255,255,0.95)',
                  }}>Derived by me</span>
                </div>
                <div style={{ padding: '20px 22px', background: 'var(--card)' }}>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
                    {[
                      'Brand voice: outdoorsy-wellness, casual confidence (not gym-bro)',
                      'Visual tone: fresh, bright, green-forward but not aggressive',
                      'Copy direction: punchy headline, one clear subline, no body copy',
                      'CTA language: action-oriented, urgency without desperation',
                      'Hero layout: product image dominant, text secondary',
                    ].map(item => (
                      <li key={item} style={{
                        fontFamily: 'var(--fx-sans)',
                        fontSize: 'var(--type-sm)',
                        color: 'var(--muted)',
                        lineHeight: 'var(--lh-normal)',
                        paddingLeft: 14,
                        position: 'relative',
                      }}>
                        <span style={{ position: 'absolute', left: 0, color: 'rgba(43,181,194,0.55)' }}>→</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            </Reveal>
          </div>
        </section>

        {/* ── 04 THE DESIGN ───────────────────────────────── */}
        <section className="fx-sec fx-sec-alt" id="design">
          <div className="fx-container">
            <Reveal>
            <p className="fx-sec-label">04 · The Design</p>
            <h2 className="fx-sec-title">One product, one shot.</h2>

            <p style={{ fontFamily: 'var(--fx-sans)', fontSize: 'var(--type-base)', color: 'var(--muted)', lineHeight: 'var(--lh-relaxed)', margin: '0 0 24px' }}>
              The whole pop-up is built around a single constraint: you get about one second before someone keeps reading or closes it. The product image is the hero. The headline does one job, make someone want to know more. The CTA is the only interactive element in the viewport.
            </p>

            <CaseFigure
              src="/projects/getup/popup.png"
              alt="The final GetUp Energy Bites pre-order pop-up: one product image, one value proposition and a single call to action"
              caption="One product, one value prop, one CTA. A pop-up has to land before someone decides to close it, so nothing competes for attention."
              width="wide"
              frame="browser"
            />

            <div className="fx-decisions-list">
              {[
                {
                  num: '01',
                  title: 'Product image as hero',
                  text: 'Full bleed product photography anchors the layout. No background patterns, no competing visuals. The Energy Bites packaging is the brand statement.',
                },
                {
                  num: '02',
                  title: 'Color pulled from the product, not invented',
                  text: "With no brand guidelines, I sampled the palette straight from the packaging and GetUp's social presence, warm natural tones with a single high-energy accent. The point was for the pop-up to read as GetUp at a glance, not as a generic launch promo. Full-bleed photography only works if the surrounding color agrees with it.",
                },
                {
                  num: '03',
                  title: 'Headline over subline',
                  text: "Punchy headline does the lifting. One short subline for context. No paragraph copy. People don't read pop-ups. They glance, then decide.",
                },
                {
                  num: '04',
                  title: 'Single CTA, maximum contrast',
                  text: "One button, high contrast. I tested a handful of CTA labels for something that nudges without making anyone nervous. 'Pre-order now' beat every other variant.",
                },
                {
                  num: '05',
                  title: 'Mobile-first scaling',
                  text: 'Designed at 390px first, then scaled to 1280px desktop. Most pop-up traffic on a celebrity launch comes from social, which means mobile.',
                },
              ].map(({ num, title, text }) => (
                <div key={num} className="fx-decision">
                  <div className="fx-decision-num">{num}</div>
                  <div className="fx-decision-body">
                    <h3>{title}</h3>
                    <div className="fx-dblock">
                      <p>{text}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            </Reveal>
          </div>
        </section>

        {/* ── 05 COPY PROCESS ─────────────────────────────── */}
        <section className="fx-sec" id="copy">
          <div className="fx-container">
            <Reveal>
            <p className="fx-sec-label">05 · Copy Process</p>
            <h2 className="fx-sec-title">How I wrote the campaign copy without a copywriter.</h2>

            <div className="fx-reflection-callout" style={{ marginBottom: 32 }}>
              <span className="fx-reflection-label">The principle that made everything faster</span>
              <p>Locking down the brand voice before touching the product meant I always knew what &apos;wrong&apos; sounded like. Every copy decision became faster because there was a filter to run it through. I&apos;d do this first on every project now.</p>
            </div>

            <CaseQuote attribution="The principle that made every copy decision faster, with no copywriter and no guidelines.">
              &ldquo;Brand immersion first. Copy second. Never the other way around.&rdquo;
            </CaseQuote>

            <div className="fx-prose">
              <p>
                Started by building a picture of the brand voice from every piece of existing GetUp content: website, Instagram, product photography. The voice read as: outdoors-meets-wellness, casual confidence, natural energy. Not performance. Not aggression.
              </p>
              <p>
                Used Claude to draft a stack of headline options across different tones, then cut hard against the brand voice. The winning headline was short, active, and product-honest. No hype language that would feel off-brand for a health product.
              </p>
            </div>

            <div style={{ overflowX: 'auto', marginTop: 8 }}>
              <table style={{
                width: '100%',
                borderCollapse: 'collapse',
                fontFamily: 'var(--fx-sans)',
                fontSize: 'var(--type-sm)',
              }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid var(--border)' }}>
                    {['Draft', 'Headline', 'Status'].map(h => (
                      <th key={h} style={{
                        textAlign: 'left',
                        padding: '10px 16px',
                        fontSize: 'var(--type-xs)',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        letterSpacing: '0.09em',
                        color: 'var(--dim)',
                      }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    { draft: 'v1', headline: 'Feel the energy. Pre-order now.', status: 'Cut: could be any brand. Nothing specific to GetUp or Energy Bites.', highlight: false },
                    { draft: 'v2', headline: 'New drop. Caffeinated bites, real ingredients.', status: 'Cut: informational, not motivating. Reads like a press release.', highlight: false },
                    { draft: 'v3', headline: 'Energy Bites are here. Grab yours early.', status: 'Closer: has urgency. But "Energy Bites are here" is circular. No reason to care.', highlight: false },
                    { draft: 'v4', headline: 'Fuel your day. GetUp Energy Bites, pre-order now.', status: '✓ Selected: short, active, product-named, action-forward. Matches the brand voice.', highlight: true },
                  ].map(({ draft, headline, status, highlight }) => (
                    <tr key={draft} style={{
                      borderBottom: '1px solid var(--border)',
                      background: highlight ? 'var(--accent-bg)' : 'transparent',
                    }}>
                      <td style={{ padding: '12px 16px', color: 'var(--dim)', fontWeight: 600 }}>{draft}</td>
                      <td style={{ padding: '12px 16px', color: 'var(--text)' }}>{headline}</td>
                      <td style={{ padding: '12px 16px', color: highlight ? 'var(--accent)' : 'var(--muted)', fontWeight: highlight ? 600 : 400 }}>{status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            </Reveal>
          </div>
        </section>

        {/* ── 06 REFLECTION ───────────────────────────────── */}
        <section className="fx-sec fx-sec-alt" id="reflection">
          <div className="fx-container">
            <Reveal>
            <p className="fx-sec-label">06 · Reflection</p>
            <h2 className="fx-sec-title">A sparse brief is a real-world condition, not an edge case.</h2>

            <div className="fx-prose">
              <p>Most projects don&apos;t come with complete brand guidelines and a fully staffed team. GetUp was a version of reality I&apos;ll work in often: high expectations, limited time, incomplete information.</p>
              <p>The lesson wasn&apos;t how to work fast. It was how to make defensible decisions fast, without waiting for clarity that isn&apos;t coming.</p>
            </div>

            <div className="fx-reflection-callout">
              <span className="fx-reflection-label">What I&apos;d do differently</span>
              <p>I&apos;d push for at least a 48-hour review window with the client on copy before Figma handoff. We moved fast enough that the copy and the visual went out together, which worked, but meant any copy change would have required reopening the design file. Separating copy sign-off from design sign-off is a small process change that prevents a painful late-stage rework.</p>
            </div>
            </Reveal>
          </div>
        </section>

        {/* seam: white body fades back into the sky footer */}
        <div className="fx-sky-seam-up" aria-hidden="true" />

        {/* ── FOOTER ──────────────────────────────────────── */}
        <footer className="fx-footer">
          <div className="fx-container">
            <blockquote className="fx-footer-quote">
              &ldquo;Three weeks with a sparse brief. That&apos;s the job.&rdquo;
              <cite>Personal note, GetUp project</cite>
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
