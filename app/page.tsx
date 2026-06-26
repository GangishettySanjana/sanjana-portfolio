'use client'
import { useEffect, useState } from 'react'
import ChatWidget from '@/components/ChatWidget'
import './home.css'

type Tab = 'home' | 'projects' | 'vibe' | 'about' | 'connect'

const PROJECTS = [
  { num: '01', title: 'FlairX', sub: 'Redesigning the Recruiter Workflow', href: '/projects/flairx' },
  { num: '02', title: 'AI Trust Meter', sub: 'Confidence states for AI answers', href: 'https://ai-trust-meter.vercel.app', external: true },
  { num: '03', title: 'Fireside Interactive', sub: 'Wildfire Education Platform', href: '/projects/fireside' },
  { num: '04', title: 'GetUp Nutrition', sub: 'Pre-Launch Campaign & Pop-Up', href: '/projects/getup' },
  { num: '05', title: 'Aura', sub: 'An Online Florist Built Around the Gift', href: '/projects/aura' },
]

export default function HomePage() {
  const [tab, setTab] = useState<Tab>('home')

  useEffect(() => {
    document.body.setAttribute('data-tabview', '1')
    return () => document.body.removeAttribute('data-tabview')
  }, [])

  // Persistent background URL
  const bgUrl = tab === 'home'
    ? 'url("https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260611_133301_d5f2a94a-b22e-4e4a-a6b6-eacdddf1f5b0.png&w=1280&q=85")'
    : 'none'

  return (
    <>
      <ChatWidget />

      <div className="pt-container">
        {/* LEFT RAIL */}
        <aside className="pt-left">
          <div className="pt-left-head">
            <h1 className="pt-title">Sanjana Gangishetty</h1>
            <p className="pt-subtitle">Product Design</p>
          </div>

          <div style={{ flex: 1 }} />

          <div className="pt-left-bottom">
            <nav className="pt-nav">
              <button className={`pt-nav-btn${tab === 'projects' ? ' is-active' : ''}`} onClick={() => setTab('projects')}>Projects</button>
              <button className={`pt-nav-btn${tab === 'vibe' ? ' is-active' : ''}`} onClick={() => setTab('vibe')}>Vibe Coding</button>
              <button className={`pt-nav-btn${tab === 'about' ? ' is-active' : ''}`} onClick={() => setTab('about')}>A little about</button>
              <button className={`pt-nav-btn${tab === 'connect' ? ' is-active' : ''}`} onClick={() => setTab('connect')}>Connect</button>
            </nav>

            <div className="pt-left-footer">
              <p className="pt-footer-left">Make it exist first then make it better</p>
              <p className="pt-footer-right">© Sanjana 2026</p>
            </div>
          </div>
        </aside>

        {/* RIGHT PANEL — persistent shell, only content changes */}
        <main className="pt-right">
          <div className="pt-right-bg" style={{ backgroundImage: bgUrl }}>

            {/* SCROLLABLE CONTENT AREA */}
            <div className="pt-content">

              {/* Home */}
              {tab === 'home' && (
                <div>
                  <h2 className="pt-headline">I think about the whole product, not just the screen.</h2>
                  <p className="pt-body">From the first user interview to the shipped build, and everything in between. I care about all of it.</p>
                </div>
              )}

              {/* Projects */}
              {tab === 'projects' && (
                <div className="pt-section">
                  <h2 className="pt-headline">Projects</h2>
                  <div className="pt-cards-grid">
                    {PROJECTS.map(project => (
                      <a
                        key={project.num}
                        href={project.href}
                        target={project.external ? '_blank' : undefined}
                        rel={project.external ? 'noopener noreferrer' : undefined}
                        className="pt-project-card"
                      >
                        <span className="pt-card-num">{project.num}</span>
                        <h3 className="pt-card-title">{project.title}</h3>
                        <p className="pt-card-sub">{project.sub}</p>
                        <span className="pt-card-arrow" aria-hidden>→</span>
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {/* Vibe Coding */}
              {tab === 'vibe' && (
                <div className="pt-section">
                  <h2 className="pt-headline">Vibe Coding</h2>
                  <p className="pt-intro-text">Building natively with AI coding tools. Prototypes that actually work, shipped faster.</p>
                  <div className="pt-cards-grid">
                    {PROJECTS.slice(0, 3).map(project => (
                      <a
                        key={project.num}
                        href={project.href}
                        target={project.external ? '_blank' : undefined}
                        rel={project.external ? 'noopener noreferrer' : undefined}
                        className="pt-project-card"
                      >
                        <span className="pt-card-num">{project.num}</span>
                        <h3 className="pt-card-title">{project.title}</h3>
                        <p className="pt-card-sub">{project.sub}</p>
                        <span className="pt-card-arrow" aria-hidden>→</span>
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {/* About */}
              {tab === 'about' && (
                <div className="pt-section">
                  <h2 className="pt-headline">About</h2>
                  <div className="pt-bio">
                    <p>I'm Sanjana. Seven years in design, studying it, working in it, thinking about it. I started in interior spaces and moved into product design. That background shapes how I work now. It just means I learned early how to figure out what something needs to feel like before anyone has words for it.</p>
                    <p>These days I design digital products. AI workflows, interactive exhibits, things people actually want to use. What I care about most is the gap between <em>technically works</em> and <em>actually good.</em></p>
                  </div>
                </div>
              )}

              {/* Connect */}
              {tab === 'connect' && (
                <div className="pt-section">
                  <h2 className="pt-headline">Connect</h2>
                  <ul className="pt-links-list">
                    <li>
                      <a href="LINKEDIN_URL" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                    </li>
                    <li>
                      <a href="mailto:EMAIL">Email</a>
                    </li>
                    <li>
                      <a href="RESUME_URL" target="_blank" rel="noopener noreferrer">Resume</a>
                    </li>
                  </ul>
                </div>
              )}

            </div>

          </div>

          {/* PERSISTENT INPUT — stays fixed at bottom across all tabs */}
          <div className="pt-input-wrap">
            <input type="text" placeholder="Ask me anything" className="pt-input" aria-label="Ask Sanja anything" />
          </div>
        </main>
      </div>
    </>
  )
}
