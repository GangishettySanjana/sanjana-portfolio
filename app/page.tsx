'use client'
import { useEffect } from 'react'
import IntroCurtain from '@/components/IntroCurtain'
import './home.css'

export default function HomePage() {
  useEffect(() => {
    document.body.setAttribute('data-tabview', '1')
    return () => document.body.removeAttribute('data-tabview')
  }, [])

  return (
    <>
      <IntroCurtain onComplete={() => {}} />

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
              <button className="pt-nav-btn">Projects</button>
              <button className="pt-nav-btn">Vibe Coding</button>
              <button className="pt-nav-btn">A little about</button>
              <button className="pt-nav-btn">Connect</button>
            </nav>

            <div className="pt-left-footer">
              <p className="pt-footer-left">Make it exist first then make it better</p>
              <p className="pt-footer-right">© Sanjana 2026</p>
            </div>
          </div>
        </aside>

        {/* RIGHT PANEL */}
        <main className="pt-right">
          <div className="pt-right-bg" style={{ backgroundImage: 'url("https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260611_133301_d5f2a94a-b22e-4e4a-a6b6-eacdddf1f5b0.png&w=1280&q=85")' }} >
            <div className="pt-content">
              <h2 className="pt-headline">I think about the whole product, not just the screen.</h2>
              <p className="pt-body">From the first user interview to the shipped build, and everything in between. I care about all of it.</p>
            </div>

            <div className="pt-input-wrap">
              <input type="text" placeholder="Ask me anything" className="pt-input" />
            </div>
          </div>
        </main>
      </div>
    </>
  )
}
