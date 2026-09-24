'use client'

import { useState } from 'react'
import '../home-v2.css'
import '../daily-ui/daily-ui.css'

const entries = [
  { day: '01', orient: 'landscape', prompt: 'Sign Up', video: '/daily-ui/001.mp4', note: 'A signup screen with email and password fields, floating labels, and an inline error state. I was working out how errors should feel. Informative without making you feel like you did something wrong.' },
  { day: '03', orient: 'landscape', prompt: 'Landing Page', video: '/daily-ui/003.mp4', note: 'A landing page for an architecture studio. Full-bleed imagery, minimal navigation, a lot of negative space. I was working out how much the typeface and spacing carry the brand feeling before anyone reads a word.' },
  { day: '04', orient: 'portrait', prompt: 'Calculator', video: '/daily-ui/004.mp4', note: "A calorie calculator for a health app. The challenge is not the math. It's getting someone to actually log their food without it feeling like homework. I focused on making input fast and the results feel worth seeing." },
  { day: '07', orient: 'landscape', prompt: '404 Page', video: '/daily-ui/007.mp4', note: 'A 404 page is already a failure. I wanted to know what it takes to make that moment feel intentional rather than broken. Turns out the copy matters as much as the illustration.' },
  { day: '08', orient: 'landscape', prompt: 'Music Player', video: '/daily-ui/008.mp4', note: "A music player for a car dashboard. Controls that work at a glance, large enough to tap without looking, and a display that gives you what you need without making you read. Different constraints than a phone UI." },
  { day: '05', orient: 'portrait', prompt: 'User Profile', video: '/daily-ui/005.mp4', note: "A music profile is about taste as much as activity. What you've played, what you've saved, who you listen with. I got into how to make those numbers feel like a portrait of someone rather than just their listening data." },
  { day: '02', orient: 'landscape', prompt: 'Credit Card Checkout', video: '/daily-ui/002.mp4', note: 'The card number field is the most anxious moment in any checkout. I worked on the flip animation between front and back, and figured out that timing it wrong makes the whole thing feel fake.' },
  { day: '09', orient: 'landscape', prompt: 'Social Share', video: '/daily-ui/009.mp4', note: "A share screen is a small surface with a big job. You're asking someone to put their name behind something. I got into what makes that feel easy versus what makes it feel like a commitment." },
]

export default function PlaygroundPage() {
  const [tab, setTab] = useState<'daily-ui' | 'fun'>('daily-ui')

  return (
    <div className="home-v2" style={{ minHeight: '100vh' }}>
      <img id="sky" src="/sky.png" alt="" />
      <div className="sky-tint" />

      {/* header */}
      <div className="wrap" style={{ paddingTop: 'calc(68px + 40px)', paddingBottom: 0, position: 'relative', zIndex: 2 }}>
        <p className="eyebrow">The off-duty stuff</p>
        <h1 className="title" style={{ marginBottom: 12 }}>Playground</h1>
        <p className="lede" style={{ maxWidth: 540, marginBottom: 28 }}>
          Daily UI builds and little experiments. Things I make to keep my hands moving.
        </p>

        {/* tab switcher */}
        <div style={{
          display: 'inline-flex', gap: 4,
          background: 'rgba(255,255,255,0.55)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          border: '1px solid rgba(255,255,255,0.7)',
          borderRadius: 999,
          padding: 4,
          marginBottom: 32,
        }}>
          {(['daily-ui', 'fun'] as const).map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              style={{
                fontFamily: 'var(--font-geist-sans), sans-serif',
                fontSize: 12, fontWeight: 700,
                letterSpacing: '0.07em', textTransform: 'uppercase',
                padding: '8px 20px', borderRadius: 999,
                border: 'none', cursor: 'pointer',
                background: tab === t ? '#002448' : 'transparent',
                color: tab === t ? '#fff' : '#002448',
                transition: 'background 0.18s, color 0.18s',
              }}
            >
              {t === 'daily-ui' ? 'Daily UI' : 'Fun stuff'}
            </button>
          ))}
        </div>
      </div>

      {/* daily ui tab */}
      {tab === 'daily-ui' && (
        <main className="dui-gallery" style={{ position: 'relative', zIndex: 2, paddingTop: 0 }}>
          {entries.map((item) => (
            <a key={item.day} href={item.video} target="_blank" rel="noopener noreferrer"
              className="dui-card" data-orient={item.orient}
              aria-label={`${item.prompt} — view recording`}>
              <div className="dui-video-wrap">
                <video src={item.video} autoPlay muted loop playsInline className="dui-video" />
                <div className="dui-overlay" role="region" aria-label={item.prompt}>
                  <p className="dui-overlay-prompt">{item.prompt}</p>
                  <p className="dui-overlay-note">{item.note}</p>
                </div>
              </div>
              <p className="dui-card-note">{item.note}</p>
            </a>
          ))}
        </main>
      )}

      {/* fun tab */}
      {tab === 'fun' && (
        <section className="funstuff" style={{ background: 'transparent', position: 'relative', zIndex: 2 }}>
          <div className="wrap">
            <div className="fun-grid">
              <div className="fun-item wide">
                <span className="fun-note">📷 Heads up: this one uses your camera for hand tracking, so you&rsquo;ll see your webcam feed on screen. Prefer not to? Say no to the camera and mouse controls still work.</span>
                <div className="fun-embed leaf">
                  <iframe src="/solar-system.html" title="Solar System — steer the planets with your hand" loading="lazy" allow="camera" />
                </div>
                <span className="fun-cap">Solar System · wave your hand at the camera and spin the planets</span>
              </div>
              <div className="fun-item wide">
                <div className="fun-embed wide">
                  <iframe src="/play/karma?embed=1" title="Three Refusals — a karma game" loading="lazy" />
                </div>
                <span className="fun-cap">Three Refusals · snakes, ladders &amp; the ones you refuse</span>
              </div>
              <div className="fun-item wide">
                <div className="fun-embed leaf">
                  <iframe src="/looseleaf.html" title="Looseleaf — write it out, then let it go" loading="lazy" allow="microphone" />
                </div>
                <span className="fun-cap">Looseleaf · write down what&rsquo;s weighing on you, then let it go</span>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
