'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './aura.css'

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
              <p>As the only designer, I owned every phase. Setting my own constraints, making judgment calls without a team to pressure-test them, and learning what it actually takes to go from blank canvas to a working prototype people can use.</p>
            </div>

            <div className="fx-decisions-list">
              {[
                {
                  num: '01',
                  title: 'Conducted screener survey to recruit target users (ages 18-40 with flower-buying experience)',
                },
                {
                  num: '02',
                  title: 'Led user research and journey mapping to identify customer needs and pain points',
                },
                {
                  num: '03',
                  title: 'Created sketches, wireframes, and interactive prototypes',
                },
                {
                  num: '04',
                  title: 'Ran usability tests and iterated on the design based on observed behavior',
                },
                {
                  num: '05',
                  title: 'Refined visual design into a polished high-fidelity prototype',
                },
              ].map(({ num, title }) => (
                <div key={num} className="fx-decision">
                  <div className="fx-decision-num">{num}</div>
                  <div className="fx-decision-body">
                    <h3>{title}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 03 RESEARCH ─────────────────────────────────── */}
        <section className="fx-sec" id="research">
          <div className="fx-container">
            <p className="fx-sec-label">03 · Research</p>
            <h2 className="fx-sec-title">What people actually do when they buy flowers.</h2>

            <div className="fx-prose">
              <p>Research had two phases: a screener survey to find the right participants, then user interviews to understand real behavior. What I found changed the whole direction of the app.</p>
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

        {/* ── 06 REFLECTION ───────────────────────────────── */}
        <section className="fx-sec fx-sec-alt" id="reflection">
          <div className="fx-container">
            <p className="fx-sec-label">06 · Reflection</p>
            <h2 className="fx-sec-title">The thing you think is the feature is sometimes not the hardest design problem.</h2>

            <div className="fx-prose">
              <p>I came into this project thinking I&apos;d design a bouquet customizer. I ended up redesigning the information hierarchy three times. The hard problem was not the picker, it was inventory communication. How do you tell someone something is out of stock without killing the mood? How do you signal low stock without being aggressive?</p>
              <p>Three rounds of usability testing taught me to stop defending my designs and start watching what actually happened. Round one: preview too small. Round two: checkout sequence wrong. Round three: it worked.</p>
            </div>

            <div className="fx-reflection-callout">
              <span className="fx-reflection-label">The process that worked</span>
              <p>Design, watch, fix, repeat. That cadence is the only process that actually produces something usable. I&apos;d known that in theory. This project made it concrete.</p>
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
