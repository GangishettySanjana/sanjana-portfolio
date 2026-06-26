'use client'
import { useEffect, useState } from 'react'
import ChatWidget from '@/components/ChatWidget'
import './home.css'

type Tab = 'home' | 'projects' | 'vibe' | 'about' | 'connect'

const PROJECTS = [
  { num: '01', title: 'FlairX', sub: 'Redesigning the Recruiter Workflow' },
  { num: '02', title: 'AI Trust Meter', sub: 'Confidence states for AI answers' },
  { num: '03', title: 'Fireside Interactive', sub: 'Wildfire Education Platform' },
  { num: '04', title: 'GetUp Nutrition', sub: 'Pre-Launch Campaign & Pop-Up' },
  { num: '05', title: 'Aura', sub: 'An Online Florist Built Around the Gift' },
]

export default function HomePage() {
  const [tab, setTab] = useState<Tab>('home')

  useEffect(() => {
    document.body.setAttribute('data-tabview', '1')
    return () => document.body.removeAttribute('data-tabview')
  }, [])

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

        {/* RIGHT PANEL */}
        <main className="pt-right">
          {tab === 'home' && (
            <div className="pt-right-bg" style={{ backgroundImage: 'url("https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260611_133301_d5f2a94a-b22e-4e4a-a6b6-eacdddf1f5b0.png&w=1280&q=85")' }} >
              <div className="pt-content">
                <h2 className="pt-headline">I think about the whole product, not just the screen.</h2>
                <p className="pt-body">From the first user interview to the shipped build, and everything in between. I care about all of it.</p>
              </div>

              <div className="pt-input-wrap">
                <input type="text" placeholder="Ask me anything" className="pt-input" />
              </div>
            </div>
          )}

          {tab === 'projects' && (
            <div className="pt-right-bg">
              <div className="pt-content">
                <h2 className="pt-headline">Projects</h2>
              </div>
            </div>
          )}

          {tab === 'vibe' && (
            <div className="pt-right-bg">
              <div className="pt-content">
                <h2 className="pt-headline">Vibe Coding</h2>
              </div>
            </div>
          )}

          {tab === 'about' && (
            <div className="pt-right-bg">
              <div className="pt-content">
                <h2 className="pt-headline">About</h2>
              </div>
            </div>
          )}

          {tab === 'connect' && (
            <div className="pt-right-bg">
              <div className="pt-content">
                <h2 className="pt-headline">Connect</h2>
              </div>
            </div>
          )}
        </main>
      </div>
    </>
  )
}
