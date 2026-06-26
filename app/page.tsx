'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import IntroCurtain from '@/components/IntroCurtain'
import './home.css'

type Tab = 'home' | 'projects' | 'vibe' | 'about' | 'connect'

const PROJECTS = [
  { num: '01', title: 'FlairX',             sub: 'Redesigning the Recruiter Workflow',         cat: 'AI Recruiting',    href: '/projects/flairx' },
  { num: '02', title: 'AI Trust Meter',     sub: 'Confidence states for AI answers',           cat: 'AI Product',       href: 'https://ai-trust-meter.vercel.app', external: true },
  { num: '03', title: 'Fireside Interactive', sub: 'Wildfire Education Platform',             cat: 'Education',        href: '/projects/fireside' },
  { num: '04', title: 'GetUp Nutrition',    sub: 'Pre-Launch Campaign & Pop-Up',               cat: 'Brand Design',     href: '/projects/getup' },
  { num: '05', title: 'Aura',               sub: 'An Online Florist Built Around the Gift',    cat: 'UX · Mobile',      href: '/projects/aura' },
]

const EXPLORATIONS = [
  {
    tag: 'OpenRouter', num: '01',
    title: '500 models. I still couldn\'t pick one.',
    desc:  'Designed a recommendation wizard that takes you from zero context to a working API call in four questions.',
    href: '/explorations/openrouter', status: 'Live prototype',
  },
  {
    tag: 'Amazon', num: '02',
    title: 'Alexa remembers your cart. Not you.',
    desc:  'Designed a memory layer that carries context across sessions: past purchases, preferences, family patterns.',
    href: 'https://alexa-for-shopping.vercel.app', external: true, status: 'Live prototype',
  },
  {
    tag: 'Hackathon', num: '03',
    title: 'Finalist: Women in Product × Lovable 2026',
    desc:  'Built a working referral network for the WIP community in one sprint. Team of 5. Shipped, presented, placed.',
    href: 'https://wip-spark-connect.lovable.app', external: true, status: 'Finalist',
  },
]

const TABS: { id: Tab; label: string }[] = [
  { id: 'projects', label: 'Projects' },
  { id: 'vibe',     label: 'Vibe Coding' },
  { id: 'about',    label: 'A little about' },
  { id: 'connect',  label: 'Connect' },
]

export default function HomePage() {
  const [tab, setTab] = useState<Tab>('home')

  useEffect(() => {
    document.body.setAttribute('data-tabview', '1')
    return () => document.body.removeAttribute('data-tabview')
  }, [])

  const pick = (id: Tab) => setTab(prev => prev === id ? 'home' : id)

  return (
    <>
      <IntroCurtain onComplete={() => {}} />

      <div className="pt-shell">
        {/* ── LEFT RAIL ── */}
        <aside className="pt-rail">
          <div>
            <div className="pt-brand">
              <span className="pt-name">Sanjana<br />Gangishetty</span>
              <span className="pt-mark" aria-hidden>🌻</span>
            </div>

            <div className="pt-lines">
              <span>Product &amp; UX design</span>
              <span>for AI &amp; 0→1 teams.</span>
              <span>Open to full-time.</span>
            </div>

            <nav className="pt-tabs">
              {TABS.map(({ id, label }) => (
                <button
                  key={id}
                  className={`pt-tab${tab === id ? ' is-active' : ''}`}
                  onClick={() => pick(id)}
                >
                  {label}
                </button>
              ))}
            </nav>
          </div>

          <div className="pt-foot">
            <span className="pt-copy">© Sanjana 2025</span>
          </div>
        </aside>

        {/* ── RIGHT PANEL ── */}
        <main className="pt-panel">
            <div className={tab === 'home' ? 'pt-home' : 'pt-content pt-fade-in'}>
              {tab === 'home' && (
                <div
                  className="pt-home-img"
                  style={{ backgroundImage: 'url("https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260611_133301_d5f2a94a-b22e-4e4a-a6b6-eacdddf1f5b0.png&w=1280&q=85")' }}
                >
                  <span className="pt-badge">Product Designer · AI &amp; 0→1</span>
                </div>
              )}

              {tab === 'projects' && (
                <>
                  <div className="pt-section-head">
                    <p className="pt-eyebrow">Selected Work</p>
                    <h2 className="pt-h2">Case Studies</h2>
                  </div>
                  <div className="pt-proj-grid">
                    {PROJECTS.map(p => (
                      <a
                        key={p.num}
                        href={p.href}
                        target={p.external ? '_blank' : undefined}
                        rel={p.external ? 'noopener noreferrer' : undefined}
                        className="pt-proj-card"
                      >
                        <span className="pt-proj-num">{p.num}</span>
                        <div className="pt-proj-body">
                          <span className="pt-proj-cat">{p.cat}</span>
                          <h3 className="pt-proj-title">{p.title}</h3>
                          <p className="pt-proj-sub">{p.sub}</p>
                        </div>
                        <span className="pt-proj-arr" aria-hidden>→</span>
                      </a>
                    ))}
                  </div>
                </>
              )}

              {tab === 'vibe' && (
                <>
                  <div className="pt-section-head">
                    <p className="pt-eyebrow">Explorations</p>
                    <h2 className="pt-h2">Vibe Coding Projects</h2>
                    <p className="pt-section-sub">AI products I built or redesigned for fun. Sometimes it became a case study.</p>
                  </div>
                  <div className="pt-exp-grid">
                    {EXPLORATIONS.map(e => (
                      <a
                        key={e.num}
                        href={e.href}
                        target={e.external ? '_blank' : undefined}
                        rel={e.external ? 'noopener noreferrer' : undefined}
                        className="pt-exp-card"
                      >
                        <div className="pt-exp-top">
                          <span className="pt-exp-tag">{e.tag}</span>
                          <span className="pt-exp-num">{e.num}</span>
                        </div>
                        <h3 className="pt-exp-title">{e.title}</h3>
                        <p className="pt-exp-desc">{e.desc}</p>
                        <div className="pt-exp-foot">
                          <span className="pt-exp-status">{e.status} →</span>
                        </div>
                      </a>
                    ))}
                  </div>
                </>
              )}

              {tab === 'about' && (
                <>
                  <div className="pt-section-head">
                    <p className="pt-eyebrow">About</p>
                    <h2 className="pt-h2">I started in rooms.<br /><em>Turns out software has the same problems.</em></h2>
                  </div>
                  <div className="pt-about-body">
                    <p>Interior design trained me to obsess over how a space makes you feel before you can explain why. Same obsession, different material. The questions didn&apos;t change. Just the rooms got smaller and moved to screens.</p>
                    <p>Shipped AI tools, fintech products, e-commerce. I do my best work before the wireframe exists, in the messy middle where nobody&apos;s sure what they&apos;re actually solving yet.</p>
                  </div>
                  <div className="pt-info-grid">
                    <div><span className="pt-info-k">Based in</span><span className="pt-info-v">United States</span></div>
                    <div><span className="pt-info-k">Focus</span><span className="pt-info-v">Product · AI · SaaS</span></div>
                    <div><span className="pt-info-k">Education</span><span className="pt-info-v">CU Boulder MS &apos;25</span></div>
                    <div><span className="pt-info-k">Status</span><span className="pt-info-v pt-open">Open to full-time ✦</span></div>
                  </div>
                  <div className="pt-btns">
                    <Link href="/about" className="pt-btn-dark">Full Story →</Link>
                    <a href="/resume.pdf?v=0622" target="_blank" rel="noopener noreferrer" className="pt-btn-ghost">Resume ↗</a>
                  </div>
                </>
              )}

              {tab === 'connect' && (
                <>
                  <div className="pt-section-head">
                    <p className="pt-eyebrow">Connect</p>
                    <h2 className="pt-h2">Don&apos;t hesitate<br /><em>to reach out.</em></h2>
                  </div>
                  <p className="pt-connect-sub">Open to full-time product design. Happy to talk if you&apos;re building something and want a second brain.</p>
                  <div className="pt-btns">
                    <a href="mailto:gangishettysanjana084@gmail.com" className="pt-btn-dark">Email me ↗</a>
                    <a href="https://www.linkedin.com/in/sanjana-gangishetty" target="_blank" rel="noopener noreferrer" className="pt-btn-ghost">LinkedIn ↗</a>
                    <a href="/resume.pdf?v=0622" target="_blank" rel="noopener noreferrer" className="pt-btn-ghost">Resume ↗</a>
                  </div>
                </>
              )}
            </div>
        </main>
      </div>
    </>
  )
}
