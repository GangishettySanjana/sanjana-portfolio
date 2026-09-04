'use client'

import './daily-ui.css'

const entries = [
  {
    day: '01', prompt: 'Sign Up', video: '/daily-ui/001.mp4', href: '#',
    note: 'Exploring form hierarchy and accessible input states. Where do labels live, how does error feel vs function, and what does trust look like at the moment someone hands over an email.',
  },
  {
    day: '02', prompt: 'Credit Card Checkout', video: '/daily-ui/002.mp4', href: '#',
    note: 'Payment UX is all about trust signals at the exact moment of hesitation. Explored card flip animation with CSS transforms and how visual rhythm affects perceived security.',
  },
  {
    day: '03', prompt: 'Landing Page', video: '/daily-ui/003.mp4', href: '#',
    note: 'Hero composition and visual hierarchy — specifically how type pairing and whitespace carry a message before anyone reads a word. Exploring scroll momentum as a design tool.',
  },
  {
    day: '04', prompt: 'Calculator', video: '/daily-ui/004.mp4', href: '#',
    note: 'Grid layout precision and interaction state logic. Constraints in a calculator surface reveal a lot about how affordances communicate intent — every key has to feel inevitable.',
  },
  {
    day: '05', prompt: 'User Profile', video: '/daily-ui/005.mp4', href: '#',
    note: 'Data-dense layouts that stay readable. Exploring stat cards, avatar systems, and how to make personal data feel like a portrait rather than a database row.',
  },
  {
    day: '07', prompt: '404 Page', video: '/daily-ui/007.mp4', href: '#',
    note: 'Error states as a design moment. Turning friction into something worth pausing on — exploring how illustration and tone can make a dead end feel intentional.',
  },
  {
    day: '08', prompt: 'Music Player', video: '/daily-ui/008.mp4', href: '#',
    note: 'Vinyl UI metaphors and playback state animation. How physical object logic translates into interaction — and when the analogy starts to break in interesting ways.',
  },
  {
    day: '09', prompt: 'Settings', video: '/daily-ui/009.mp4', href: '#',
    note: 'Toggle design systems and preference UIs. Exploring how to make configuration feel like control — not a form, not a menu, but a space that feels like yours.',
  },
]

export default function DailyUIPage() {
  return (
    <div className="dui-page">
      <img className="dui-sky" src="/sky.png" alt="" />
      <div className="dui-header">
        <div className="dui-header-inner">
          <h1 className="dui-title">Daily UI Challenge</h1>
          <p className="dui-subtitle">
            Daily UI prompts built with Claude Code — each one an experiment at the intersection of design and AI-assisted building.
          </p>
          <div className="dui-header-actions">
            <a href="mailto:sanjanagangishetty0@gmail.com" className="dui-about-link">Drop me an email</a>
            <a href="#" className="dui-about-link dui-about-link--cta">Book a call</a>
          </div>
        </div>
      </div>

      <main className="dui-gallery">
        {entries.map((item) => (
          <a key={item.day} href={item.href} target="_blank" rel="noopener noreferrer" className="dui-card">
            <div className="dui-video-wrap">
              <video src={item.video} autoPlay muted loop playsInline className="dui-video" />
              <div className="dui-overlay" aria-hidden="true">
                <p className="dui-overlay-prompt">{item.prompt}</p>
                <p className="dui-overlay-note">{item.note}</p>
              </div>
            </div>
          </a>
        ))}
      </main>

    </div>
  )
}
