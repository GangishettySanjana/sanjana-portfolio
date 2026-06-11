'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './aura.css'

/* ── Inline Prototype ─────────────────────────────────────────────── */
function AuraPrototype() {
  const [screen, setScreen] = useState(0)
  const [selectedDate, setSelectedDate] = useState('')
  const [stems, setStems] = useState<string[]>([])

  const dates = ['Mon 9 Jun', 'Tue 10 Jun', 'Wed 11 Jun', 'Fri 13 Jun']
  const stemOptions = ['Rose', 'Tulip', 'Sunflower', 'Lily', 'Peony']

  const phoneStyle: React.CSSProperties = {
    width: 280,
    height: 560,
    borderRadius: 36,
    background: '#FFF9F5',
    border: '8px solid #1a1a1a',
    overflow: 'hidden',
    position: 'relative',
    boxShadow: '0 24px 64px rgba(0,0,0,0.18)',
    flexShrink: 0,
  }

  const screens = [
    // Screen 0 — Home
    <div key="home" style={{ height: '100%', display: 'flex', flexDirection: 'column', background: '#FFF9F5' }}>
      <div style={{ padding: '20px 16px 10px', borderBottom: '1px solid #f0e8e0' }}>
        <p style={{ margin: 0, fontSize: 12, color: '#888', fontFamily: 'var(--fx-sans)' }}>Good morning</p>
        <p style={{ margin: 0, fontSize: 20, fontWeight: 700, color: '#1a1a1a', fontFamily: 'var(--fx-sans)' }}>Aura</p>
      </div>
      <div style={{ padding: '12px 16px', overflowY: 'auto', flex: 1 }}>
        <p style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#888', margin: '0 0 8px', fontFamily: 'var(--fx-sans)' }}>Available now</p>
        {[
          { name: 'Summer Blush Bouquet', price: '₹890', tag: '3 left', color: '#FFE4E4' },
          { name: 'Golden Garden Mix', price: '₹1,100', tag: 'In stock', color: '#FFF3D4' },
          { name: 'White Elegance', price: '₹750', tag: 'In stock', color: '#F0F0FF' },
          { name: 'Wild Garden Bundle', price: '₹1,350', tag: 'Low stock', color: '#E8F5E0' },
        ].map(({ name, price, tag, color }) => (
          <div key={name} style={{ background: color, borderRadius: 12, padding: '10px 12px', marginBottom: 8, cursor: 'pointer' }}
            onClick={() => setScreen(1)}>
            <p style={{ margin: 0, fontSize: 12, fontWeight: 600, color: '#1a1a1a', fontFamily: 'var(--fx-sans)' }}>{name}</p>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4 }}>
              <p style={{ margin: 0, fontSize: 11, color: '#555', fontFamily: 'var(--fx-sans)' }}>{price}</p>
              <span style={{ fontSize: 9, padding: '2px 6px', borderRadius: 10, background: 'rgba(0,0,0,0.07)', color: '#555', fontFamily: 'var(--fx-sans)' }}>{tag}</span>
            </div>
          </div>
        ))}
        <button onClick={() => setScreen(1)} style={{
          width: '100%', padding: '12px', marginTop: 4, borderRadius: 14, border: 'none',
          background: '#C75B7A', color: 'white', fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: 'var(--fx-sans)',
        }}>Build your own bouquet →</button>
      </div>
    </div>,

    // Screen 1 — Checkout step 1: Pick delivery date FIRST
    <div key="date" style={{ height: '100%', display: 'flex', flexDirection: 'column', background: '#FFF9F5' }}>
      <div style={{ padding: '16px', borderBottom: '1px solid #f0e8e0', display: 'flex', alignItems: 'center', gap: 10 }}>
        <button onClick={() => setScreen(0)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 16, color: '#555' }}>←</button>
        <div>
          <p style={{ margin: 0, fontSize: 10, color: '#888', fontFamily: 'var(--fx-sans)' }}>Step 1 of 3</p>
          <p style={{ margin: 0, fontSize: 14, fontWeight: 700, color: '#1a1a1a', fontFamily: 'var(--fx-sans)' }}>When do you need it?</p>
        </div>
      </div>
      <div style={{ padding: '16px', flex: 1 }}>
        <p style={{ fontSize: 11, color: '#888', margin: '0 0 14px', fontFamily: 'var(--fx-sans)' }}>Customization will only show flowers available for your chosen date.</p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 16 }}>
          {dates.map(d => (
            <button key={d} onClick={() => setSelectedDate(d)} style={{
              padding: '14px 8px', borderRadius: 12, border: `2px solid ${selectedDate === d ? '#C75B7A' : '#e8ddd7'}`,
              background: selectedDate === d ? '#FFE8EF' : 'white', cursor: 'pointer',
              fontSize: 11, fontWeight: selectedDate === d ? 700 : 400, color: '#1a1a1a', fontFamily: 'var(--fx-sans)',
              transition: 'all 0.15s',
            }}>{d}</button>
          ))}
        </div>
        {selectedDate && (
          <div style={{ background: '#FFF0F4', borderRadius: 12, padding: '10px 12px', marginBottom: 16, border: '1px solid #f0d0da' }}>
            <p style={{ margin: 0, fontSize: 11, color: '#C75B7A', fontFamily: 'var(--fx-sans)' }}>
              Delivery confirmed: <strong>{selectedDate}</strong>. Now pick your flowers.
            </p>
          </div>
        )}
        <button
          onClick={() => selectedDate && setScreen(2)}
          style={{
            width: '100%', padding: '13px', borderRadius: 14, border: 'none',
            background: selectedDate ? '#C75B7A' : '#ddd', color: 'white',
            fontSize: 12, fontWeight: 600, cursor: selectedDate ? 'pointer' : 'not-allowed',
            fontFamily: 'var(--fx-sans)', transition: 'background 0.15s',
          }}
        >{selectedDate ? 'Customize bouquet →' : 'Pick a date to continue'}</button>
      </div>
    </div>,

    // Screen 2 — Bouquet customizer
    <div key="customize" style={{ height: '100%', display: 'flex', flexDirection: 'column', background: '#FFF9F5' }}>
      <div style={{ padding: '16px', borderBottom: '1px solid #f0e8e0', display: 'flex', alignItems: 'center', gap: 10 }}>
        <button onClick={() => setScreen(1)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 16, color: '#555' }}>←</button>
        <div>
          <p style={{ margin: 0, fontSize: 10, color: '#888', fontFamily: 'var(--fx-sans)' }}>Step 2 of 3 · {selectedDate}</p>
          <p style={{ margin: 0, fontSize: 14, fontWeight: 700, color: '#1a1a1a', fontFamily: 'var(--fx-sans)' }}>Build your bouquet</p>
        </div>
      </div>
      <div style={{ padding: '12px 16px', flex: 1, overflowY: 'auto' }}>
        <div style={{ background: '#FFE8EF', borderRadius: 16, height: 110, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 14, flexWrap: 'wrap', gap: 6, padding: 8 }}>
          {stems.length === 0
            ? <p style={{ color: '#C75B7A', fontSize: 11, margin: 0, fontFamily: 'var(--fx-sans)' }}>Add stems to preview your bouquet</p>
            : stems.map((s, i) => <span key={i} style={{ background: '#C75B7A', color: 'white', borderRadius: 20, padding: '3px 10px', fontSize: 10, fontFamily: 'var(--fx-sans)' }}>{s}</span>)
          }
        </div>
        <p style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#888', margin: '0 0 8px', fontFamily: 'var(--fx-sans)' }}>Available for {selectedDate}</p>
        {stemOptions.map(s => (
          <div key={s} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid #f0e8e0' }}>
            <p style={{ margin: 0, fontSize: 12, color: '#1a1a1a', fontFamily: 'var(--fx-sans)' }}>{s}</p>
            <button onClick={() => setStems(prev => [...prev, s])} style={{
              padding: '5px 14px', borderRadius: 20, border: '1.5px solid #C75B7A',
              background: 'transparent', color: '#C75B7A', fontSize: 11, cursor: 'pointer', fontFamily: 'var(--fx-sans)',
            }}>+ Add</button>
          </div>
        ))}
      </div>
      <div style={{ padding: '12px 16px', borderTop: '1px solid #f0e8e0' }}>
        <button
          onClick={() => stems.length > 0 && setScreen(3)}
          style={{
            width: '100%', padding: '13px', borderRadius: 14, border: 'none',
            background: stems.length > 0 ? '#C75B7A' : '#ddd', color: 'white',
            fontSize: 12, fontWeight: 600, cursor: stems.length > 0 ? 'pointer' : 'not-allowed', fontFamily: 'var(--fx-sans)',
          }}
        >{stems.length > 0 ? `Confirm ${stems.length} stem${stems.length > 1 ? 's' : ''} →` : 'Add at least one stem'}</button>
      </div>
    </div>,

    // Screen 3 — Confirmation
    <div key="confirm" style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#FFF9F5', padding: '24px 20px', textAlign: 'center' }}>
      <div style={{ width: 60, height: 60, borderRadius: '50%', background: '#FFE8EF', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16, fontSize: 28 }}>🌸</div>
      <p style={{ margin: '0 0 4px', fontSize: 18, fontWeight: 700, color: '#1a1a1a', fontFamily: 'var(--fx-sans)' }}>Order confirmed</p>
      <p style={{ margin: '0 0 16px', fontSize: 12, color: '#888', fontFamily: 'var(--fx-sans)' }}>We&apos;ll take it from here</p>
      <div style={{ background: '#FFF0F4', border: '1px solid #f0d0da', borderRadius: 14, padding: '14px 18px', marginBottom: 20, width: '100%' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
          <p style={{ margin: 0, fontSize: 11, color: '#888', fontFamily: 'var(--fx-sans)' }}>Delivery date</p>
          <p style={{ margin: 0, fontSize: 11, fontWeight: 600, color: '#1a1a1a', fontFamily: 'var(--fx-sans)' }}>{selectedDate}</p>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
          <p style={{ margin: 0, fontSize: 11, color: '#888', fontFamily: 'var(--fx-sans)' }}>Bouquet</p>
          <p style={{ margin: 0, fontSize: 11, fontWeight: 600, color: '#1a1a1a', fontFamily: 'var(--fx-sans)' }}>{stems.length} stems</p>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <p style={{ margin: 0, fontSize: 11, color: '#888', fontFamily: 'var(--fx-sans)' }}>Order #</p>
          <p style={{ margin: 0, fontSize: 11, fontWeight: 600, color: '#1a1a1a', fontFamily: 'var(--fx-sans)' }}>AUR-{Math.floor(1000 + Math.random() * 9000)}</p>
        </div>
      </div>
      <p style={{ margin: '0 0 16px', fontSize: 11, color: '#888', fontFamily: 'var(--fx-sans)' }}>A receipt is on its way to your email.</p>
      <button onClick={() => { setScreen(0); setStems([]); setSelectedDate('') }} style={{
        padding: '12px 28px', borderRadius: 14, border: 'none',
        background: '#C75B7A', color: 'white', fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: 'var(--fx-sans)',
      }}>Back to home</button>
    </div>,
  ]

  const labels = ['Home', 'Delivery date', 'Customize', 'Confirm']

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24 }}>
      <div style={{ display: 'flex', gap: 8 }}>
        {labels.map((l, i) => (
          <button key={l} onClick={() => setScreen(i)} style={{
            padding: '5px 14px', borderRadius: 20, border: `1.5px solid ${screen === i ? '#C75B7A' : '#e0d5cf'}`,
            background: screen === i ? '#FFE8EF' : 'transparent', color: screen === i ? '#C75B7A' : '#888',
            fontSize: 11, fontWeight: screen === i ? 600 : 400, cursor: 'pointer', fontFamily: 'var(--fx-sans)',
            transition: 'all 0.15s',
          }}>{l}</button>
        ))}
      </div>
      <div style={phoneStyle}>
        {screens[screen]}
      </div>
      <p style={{ fontFamily: 'var(--fx-sans)', fontSize: 11, color: 'var(--dim)', margin: 0 }}>
        Interactive prototype · click through the full gifting flow
      </p>
    </div>
  )
}

/* ── Page ─────────────────────────────────────────────────────────── */
export default function AuraPage() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const NAV = [
      { id: 'context',    num: '01', label: 'Context'      },
      { id: 'role',       num: '02', label: 'My Role'      },
      { id: 'research',   num: '03', label: 'Research'     },
      { id: 'direction',  num: '04', label: 'Direction'    },
      { id: 'design',     num: '05', label: 'Final Design' },
      { id: 'prototype',  num: '05.5', label: 'Prototype'  },
      { id: 'reflection', num: '06', label: 'Reflection'   },
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
            <div className="fx-v-fill" style={{ height: '16.67%' }}></div>
          </div>
          <div className="fx-v-items">
            {[
              { href: '#context',    label: 'Context'    },
              { href: '#role',       label: 'Role'       },
              { href: '#research',   label: 'Research'   },
              { href: '#direction',  label: 'Direction'  },
              { href: '#design',     label: 'Design'     },
              { href: '#prototype',  label: 'Prototype'  },
              { href: '#reflection', label: 'Reflection' },
            ].map(({ href, label }) => (
              <a key={href} href={href} className="fx-v-link">{label}</a>
            ))}
          </div>
        </nav>

        {/* ── HERO ────────────────────────────────────────── */}
        <section className="fx-hero" id="hero">
          <div className="fx-container">
            <Link href="/#work" className="fx-back-link" onClick={() => sessionStorage.setItem('skipIntro', '1')}>
              ← Back to work
            </Link>
            <p className="fx-eyebrow">Google UX Certificate · E-commerce · Mobile App</p>
            <h1 className="fx-hero-title">An Online Florist Built Around the Gift, Not the Purchase</h1>
            <p className="fx-hero-sub">
              A Hyderabad florist had a loyal customer base and no digital presence. COVID changed that overnight. I designed a mobile app that replicates the personal florist experience online, live inventory, bouquet customization, and a checkout built for gifting.
            </p>

            <div className="fx-summary-card">
              <div className="fx-summary-top">
                <p className="fx-summary-hmw">
                  <strong>The challenge:</strong> Flowers are tactile and personal. Make an app that feels like the florist knows you, not like a generic e-commerce checkout.
                </p>
                <span className="fx-status-live">Case Study</span>
              </div>
              <div className="fx-summary-meta">
                <div className="fx-smeta-item">
                  <span className="fx-smeta-k">Role</span>
                  <span className="fx-smeta-v">Solo UX Designer</span>
                </div>
                <div className="fx-smeta-item">
                  <span className="fx-smeta-k">Company</span>
                  <span className="fx-smeta-v">Google UX Certificate</span>
                </div>
                <div className="fx-smeta-item">
                  <span className="fx-smeta-k">Year</span>
                  <span className="fx-smeta-v">2023</span>
                </div>
                <div className="fx-smeta-item">
                  <span className="fx-smeta-k">Duration</span>
                  <span className="fx-smeta-v">4 months</span>
                </div>
                <div className="fx-smeta-item">
                  <span className="fx-smeta-k">Tools</span>
                  <span className="fx-smeta-v">Figma · Procreate · Google Forms</span>
                </div>
              </div>
              <div className="fx-summary-cols">
                <div className="fx-sum-col fx-sum-problem">
                  <div className="fx-sum-head">
                    <span className="fx-sum-label">The Problem</span>
                  </div>
                  <ul>
                    <li>No digital presence for a foot-traffic-dependent business</li>
                    <li>No way to show live inventory or customize orders online</li>
                    <li>Customers buy flowers for others on a deadline under pressure</li>
                  </ul>
                </div>
                <div className="fx-sum-col fx-sum-approach">
                  <div className="fx-sum-head">
                    <span className="fx-sum-label">What I did</span>
                  </div>
                  <ul>
                    <li>Live inventory browsing with real-time stock signals</li>
                    <li>Bouquet customizer with live preview</li>
                    <li>Delivery scheduling surfaced before you build your bouquet</li>
                  </ul>
                </div>
                <div className="fx-sum-col fx-sum-result">
                  <div className="fx-sum-head">
                    <span className="fx-sum-label">Result</span>
                  </div>
                  <ul>
                    <li>Customization flow reduced to 4 steps through testing</li>
                    <li>3 rounds of iteration based on observed behavior</li>
                    <li>Checkout sequence reordered after round 2 revealed critical flaw</li>
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
            <h2 className="fx-sec-title">A florist with no digital presence, in the middle of a lockdown.</h2>

            <div className="fx-ctx-rows">
              {[
                {
                  label: 'The ask',
                  text: 'Build a mobile app that brings the in-store florist experience online without losing what makes it personal.',
                },
                {
                  label: 'The situation',
                  text: 'Small florists in Hyderabad were entirely foot-traffic dependent. COVID-19 hit and in-person shopping stopped. Loyal customers had nowhere to go.',
                },
                {
                  label: 'Scope',
                  text: 'End-to-end UX project: research, information architecture, wireframes, usability testing, and final prototype.',
                },
                {
                  label: 'Context',
                  text: 'This was completed as part of the Google UX Design Professional Certificate, but the problem was real.',
                },
              ].map(({ label, text }) => (
                <div key={label} className="fx-ctx-row">
                  <span className="fx-ctx-key">{label}</span>
                  <p className="fx-ctx-val">{text}</p>
                </div>
              ))}
            </div>

            <div className="fx-prose" style={{ marginTop: 40 }}>
              <p>Small florists in Hyderabad were entirely foot-traffic dependent. No app, no website, no way to take orders online. When COVID-19 hit and in-person shopping stopped, loyal customers had nowhere to go. Aura was designed to fix that.</p>
              <p>The project was completed as part of the Google UX Design Professional Certificate. A local florist, a real customer base, and no digital solution. I took it from zero.</p>
            </div>
          </div>
        </section>

        {/* ── 02 MY ROLE ──────────────────────────────────── */}
        <section className="fx-sec fx-sec-alt" id="role">
          <div className="fx-container">
            <p className="fx-sec-label">02 · My Role</p>
            <h2 className="fx-sec-title">Sole UX designer, research through final prototype.</h2>

            <div className="fx-prose">
              <p>As the only designer, I owned every phase — research, IA, wireframes, testing, and visual design. What was hard about that wasn&apos;t the workload. It was having no one to pressure-test decisions. When I moved delivery scheduling to step 1 of checkout, there was no design lead to tell me whether that was right or overengineered. I had to run the test and find out. Every major call had that same shape: form a hypothesis, expose it to real users, throw it out or keep it based on what they actually did. There was no shortcut to that process, and no one to defer to when it got uncomfortable.</p>
            </div>
          </div>
        </section>

        {/* ── 03 RESEARCH ─────────────────────────────────── */}
        <section className="fx-sec" id="research">
          <div className="fx-container">
            <p className="fx-sec-label">03 · Research</p>
            <h2 className="fx-sec-title">What people actually do when they buy flowers.</h2>

            <div className="fx-prose">
              <p>Research had two phases: a screener survey to recruit the right participants (20 respondents, 5 selected based on age, flower-buying frequency, and app usage), then user interviews with those 5 participants to understand real behavior. What I found changed the whole direction of the app.</p>
            </div>

            <div className="fx-goal-cards">
              {[
                {
                  title: 'Usage patterns',
                  body: 'How often do people use apps for floral services, and why?',
                },
                {
                  title: 'Expectations',
                  body: 'What do users expect and what leaves them frustrated?',
                },
                {
                  title: "Who's buying",
                  body: 'Demographics, occasions, motivations: who actually buys flowers?',
                },
              ].map(({ title, body }) => (
                <div key={title} className="fx-goal-card">
                  <span className="fx-goal-card-title">{title}</span>
                  <p>{body}</p>
                </div>
              ))}
            </div>

            <blockquote className="fx-pull-quote">
              &ldquo;Most people buy flowers for other people, not themselves, on a deadline, under pressure to get it right.&rdquo;
            </blockquote>

            <div className="fx-research-grid">
              <div className="fx-research-col">
                <span className="fx-research-col-title">What users want</span>
                <ul className="fx-bullets">
                  {[
                    'Fast mobile shopping',
                    'Quick suggestions from a florist',
                    'Gifting for occasions',
                    'Flowers that match their aesthetic',
                  ].map(item => <li key={item}>{item}</li>)}
                </ul>
              </div>
              <div className="fx-research-col">
                <span className="fx-research-col-title">What frustrates them</span>
                <ul className="fx-bullets">
                  {[
                    'Standing in line near major occasions',
                    'Flowers that are not fresh',
                    'Price not matching quality',
                    'No customization',
                    'Fear the real product will not match what is shown',
                  ].map(item => <li key={item}>{item}</li>)}
                </ul>
              </div>
            </div>

            <div className="fx-competitive-grid">
              {[
                {
                  name: 'FNP Ferns N Petals',
                  has: 'Domestic and international delivery, user accounts, add-ons.',
                  missing: 'Ordering flow too long, no customization.',
                },
                {
                  name: 'Local florists',
                  has: 'Personal service, fresh stock.',
                  missing: 'Physical store only, no app, old stock during high demand.',
                },
                {
                  name: 'Grocery stores',
                  has: 'Easy availability.',
                  missing: 'Ready-made only, no customization, no dedicated app.',
                },
              ].map(({ name, has, missing }) => (
                <div key={name} className="fx-competitive-card">
                  <span className="fx-competitive-name">{name}</span>
                  <div className="fx-competitive-row">
                    <span className="fx-competitive-tag">Has</span>
                    <p>{has}</p>
                  </div>
                  <div className="fx-competitive-row">
                    <span className="fx-competitive-tag tag-miss">Missing</span>
                    <p>{missing}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 04 DIRECTION ────────────────────────────────── */}
        <section className="fx-sec fx-sec-alt" id="direction">
          <div className="fx-container">
            <p className="fx-sec-label">04 · Direction</p>
            <h2 className="fx-sec-title">One question that reframed everything.</h2>

            <blockquote className="fx-pull-quote">
              &ldquo;How might we help local florists offer a personalized, seamless online bouquet shopping experience that lets customers view real inventory, customize arrangements, and schedule deliveries with ease?&rdquo;
            </blockquote>

            <div className="fx-prose">
              <p>The HMW reframed the project from &lsquo;build an ordering app&rsquo; to &lsquo;replicate the personal florist experience online.&rsquo; That distinction changed what we designed: not just a product catalog, but a guided customization flow with real inventory signals and a gifting-native checkout.</p>
            </div>

            <div className="fx-principle-cards">
              {[
                {
                  title: 'Real inventory first',
                  body: 'Show only what is actually available. No disappointment at checkout.',
                },
                {
                  title: 'Customization is the product',
                  body: 'The bouquet builder is the differentiator, not just a feature buried in the flow.',
                },
                {
                  title: 'Built for gifting',
                  body: 'Delivery scheduling, occasion messaging, and gift wrapping live front and center.',
                },
              ].map(({ title, body }) => (
                <div key={title} className="fx-principle-card">
                  <span className="fx-principle-card-title">{title}</span>
                  <p>{body}</p>
                </div>
              ))}
            </div>

            <div style={{ marginTop: 40 }}>
              <img
                src="/projects/aura/paper-wireframes.png"
                alt="Paper wireframes"
                style={{ width: '100%', display: 'block', borderRadius: 12 }}
              />
              <span className="fx-img-caption">Paper wireframes</span>
            </div>
          </div>
        </section>

        {/* ── 05 FINAL DESIGN ─────────────────────────────── */}
        <section className="fx-sec" id="design">
          <div className="fx-container">
            <p className="fx-sec-label">05 · Final Design</p>
            <h2 className="fx-sec-title">Four screens that do the work.</h2>

            <div className="fx-prose">
              <p>The final prototype covers the core loop: browse real inventory, customize your bouquet, schedule delivery, confirm. Each screen was tested at least twice before reaching the final form.</p>
            </div>

            {/* Screen 01 */}
            <div className="fx-screen-block">
              <span className="fx-screen-num">01</span>
              <h3 className="fx-screen-title">Home, real-time inventory</h3>
              <p className="fx-screen-body">The home screen balances browsing and discovery. Real-time inventory status is baked in: grayed out means unavailable, soft tags signal low stock. An &lsquo;upcoming collections&rsquo; section keeps returning customers engaged with what is fresh.</p>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <img
                  src="/projects/aura/aura-dashboard.png"
                  alt="Aura home screen, real-time inventory"
                  style={{
                    display: 'block',
                    maxWidth: 320,
                    width: '100%',
                    borderRadius: 32,
                    boxShadow: '0 12px 48px rgba(0,36,72,0.12)',
                  }}
                />
              </div>
            </div>

            {/* Screen 02 */}
            <div className="fx-screen-block">
              <span className="fx-screen-num">02</span>
              <h3 className="fx-screen-title">Create Your Own, bouquet builder</h3>
              <p className="fx-screen-body">A live preview updates as users add stems. Selection is limited to current inventory. Round 2 of testing: the preview was too small. We made it take up 60% of the screen. Completion rates jumped.</p>
              <img
                src="/projects/aura/Bouquet customizer flow.png"
                alt="Bouquet customizer flow"
                style={{ width: '100%', display: 'block', borderRadius: 16 }}
              />
            </div>

            {/* Screen 03 */}
            <div className="fx-screen-block">
              <span className="fx-screen-num">03</span>
              <h3 className="fx-screen-title">Checkout, delivery scheduling up front</h3>
              <p className="fx-screen-body">Round 2 revealed a critical flaw: delivery date selection came too late. Users would build their whole bouquet, then discover their date was not available. We moved scheduling to step 1 of checkout so users know their timeline before they invest in choices.</p>

              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: 16,
                margin: '20px 0',
                padding: '20px',
                background: 'var(--card)',
                border: '1px solid var(--border)',
                borderRadius: 14,
              }}>
                <div>
                  <p style={{ fontFamily: 'var(--fx-sans)', fontSize: 'var(--type-xs)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.09em', color: 'var(--muted)', margin: '0 0 8px' }}>Before round 2</p>
                  <p style={{ fontFamily: 'var(--fx-sans)', fontSize: 'var(--type-sm)', color: 'var(--text)', lineHeight: 'var(--lh-normal)', margin: 0 }}>Browse → Customize bouquet → Add to cart → Enter delivery date → Discover date unavailable → Start over</p>
                </div>
                <div>
                  <p style={{ fontFamily: 'var(--fx-sans)', fontSize: 'var(--type-xs)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.09em', color: 'var(--accent)', margin: '0 0 8px' }}>After round 2</p>
                  <p style={{ fontFamily: 'var(--fx-sans)', fontSize: 'var(--type-sm)', color: 'var(--text)', lineHeight: 'var(--lh-normal)', margin: 0 }}>Browse → Select delivery date → Customize bouquet (within available inventory) → Confirm</p>
                </div>
              </div>
              <p style={{ fontFamily: 'var(--fx-sans)', fontSize: 'var(--type-sm)', color: 'var(--muted)', fontStyle: 'italic', margin: '0 0 20px' }}>
                This reversal was tested in round 3 with 5 participants. No one reached the confirmation screen in round 2 without hitting a dead end. All 5 completed the flow in round 3.
              </p>

              <img
                src="/projects/aura/Checkout flow.png"
                alt="Checkout flow with delivery scheduling"
                style={{ width: '100%', display: 'block', borderRadius: 16 }}
              />
            </div>

            {/* Screen 04 */}
            <div className="fx-screen-block">
              <span className="fx-screen-num">04</span>
              <h3 className="fx-screen-title">Confirmation</h3>
              <p className="fx-screen-body">The confirmation screen had to feel good, not just functional. Order number, purchase date, a promise of an email receipt. The copy is warm because the whole product is about giving someone a gift.</p>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <img
                  src="/projects/aura/Order confirmation.png"
                  alt="Order confirmation screen"
                  style={{
                    display: 'block',
                    maxWidth: 320,
                    width: '100%',
                    borderRadius: 32,
                  }}
                />
              </div>
            </div>
          </div>
        </section>

        {/* ── 05.5 PROTOTYPE ──────────────────────────────── */}
        <section className="fx-sec" id="prototype">
          <div className="fx-container">
            <p className="fx-sec-label">05.5 · Live Prototype</p>
            <h2 className="fx-sec-title">Try the full gifting flow yourself.</h2>

            <div className="fx-prose" style={{ marginBottom: 32 }}>
              <p>This is the core loop: browse inventory, pick your delivery date first, customize your bouquet, confirm. The key design decision is visible in step 1 — you choose your date before you build anything, so you can&apos;t invest in a bouquet and then discover it can&apos;t arrive in time.</p>
            </div>

            <AuraPrototype />
          </div>
        </section>

        {/* ── 06 REFLECTION ───────────────────────────────── */}
        <section className="fx-sec fx-sec-alt" id="reflection">
          <div className="fx-container">
            <p className="fx-sec-label">06 · Reflection</p>
            <h2 className="fx-sec-title">The thing you think is the feature is sometimes not the hardest design problem.</h2>

            <div className="fx-prose">
              <p>I came into this project thinking I&apos;d design a bouquet customizer. I ended up redesigning the checkout sequence after round 2 completely broke the flow — users were building full bouquets only to find their delivery date unavailable. Moving the date picker to step 1 felt obvious in retrospect, but it wasn&apos;t. I had to watch three real users hit that wall before I was willing to restructure the whole checkout.</p>
              <p>The hard problem was not the picker. It was learning to let what I observed override what I&apos;d assumed. Round one: preview too small. Round two: checkout sequence wrong. Round three: it worked. Each fix came from watching people use the prototype, not from design intuition.</p>
            </div>

            <div className="fx-reflection-callout">
              <span className="fx-reflection-label">What I&apos;d do differently</span>
              <p>I&apos;d run a mental simulation of the full gifting scenario before building a single screen: someone buying flowers for another person, under deadline pressure, on a day with limited delivery slots. That scenario would have surfaced the date-selection issue before any prototype existed. I learned to think about pressure cases first, not happy path first.</p>
            </div>
          </div>
        </section>

        {/* ── FOOTER ──────────────────────────────────────── */}
        <footer className="fx-footer">
          <div className="fx-container">
            <blockquote className="fx-footer-quote">
              &ldquo;The preview is too small. We can&apos;t tell what the bouquet will look like.&rdquo;
              <cite>Usability test, round one</cite>
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
