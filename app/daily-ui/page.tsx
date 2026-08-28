'use client'

import './daily-ui.css'

const entries = [
  { day: '01', prompt: 'Sign Up',              video: '/daily-ui/001.mp4', href: '#' },
  { day: '02', prompt: 'Credit Card Checkout', video: '/daily-ui/002.mp4', href: '#' },
  { day: '03', prompt: 'Landing Page',         video: '/daily-ui/003.mp4', href: '#' },
  { day: '04', prompt: 'Calculator',           video: '/daily-ui/004.mov', href: '#' },
  { day: '05', prompt: 'User Profile',         video: '/daily-ui/005.mov', href: '#' },
]

export default function DailyUIPage() {
  return (
    <div className="dui-page">
      <img className="dui-sky" src="/sky.png" alt="" />
      <div className="dui-header">
        <div className="dui-header-inner">
          <div className="dui-title-row">
            <h1 className="dui-title">Daily UI Challenge</h1>
            <span className="dui-badge">Day {entries.length} of 100</span>
          </div>
        </div>
      </div>

      <main className="dui-gallery">
        {entries.map((item) => (
          <a key={item.day} href={item.href} target="_blank" rel="noopener noreferrer" className="dui-card">
            <div className="dui-video-wrap">
              <video src={item.video} autoPlay muted loop playsInline className="dui-video" />
            </div>
            <div className="dui-meta">
              <span className="dui-day">Day {item.day}</span>
              <span className="dui-prompt">{item.prompt}</span>
            </div>
          </a>
        ))}
      </main>
    </div>
  )
}
