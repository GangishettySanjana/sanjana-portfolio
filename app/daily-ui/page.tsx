'use client'

import './daily-ui.css'

const entries = [
  {
    day: '01', prompt: 'Sign Up', video: '/daily-ui/001.mp4', href: '#',
    note: 'A signup screen with email and password fields, floating labels, and an inline error state. I was working out how errors should feel. Informative without making you feel like you did something wrong.',
  },
  {
    day: '02', prompt: 'Credit Card Checkout', video: '/daily-ui/002.mp4', href: '#',
    note: 'The card number field is the most anxious moment in any checkout. I worked on the flip animation between front and back, and figured out that timing it wrong makes the whole thing feel fake.',
  },
  {
    day: '03', prompt: 'Landing Page', video: '/daily-ui/003.mp4', href: '#',
    note: 'A landing page for an architecture studio. Full-bleed imagery, minimal navigation, a lot of negative space. I was working out how much the typeface and spacing carry the brand feeling before anyone reads a word.',
  },
  {
    day: '04', prompt: 'Calculator', video: '/daily-ui/004.mp4', href: '#',
    note: 'A calorie calculator for a health app. The challenge is not the math. It\'s getting someone to actually log their food without it feeling like homework. I focused on making input fast and the results feel worth seeing.',
  },
  {
    day: '05', prompt: 'User Profile', video: '/daily-ui/005.mp4', href: '#',
    note: 'A music profile is about taste as much as activity. What you\'ve played, what you\'ve saved, who you listen with. I got into how to make those numbers feel like a portrait of someone rather than just their listening data.',
  },
  {
    day: '07', prompt: '404 Page', video: '/daily-ui/007.mp4', href: '#',
    note: 'A 404 page is already a failure. I wanted to know what it takes to make that moment feel intentional rather than broken. Turns out the copy matters as much as the illustration.',
  },
  {
    day: '08', prompt: 'Music Player', video: '/daily-ui/008.mp4', href: '#',
    note: 'A music player for a car dashboard. Controls that work at a glance, large enough to tap without looking, and a display that gives you what you need without making you read. Different constraints than a phone UI.',
  },
  {
    day: '09', prompt: 'Social Share', video: '/daily-ui/009.mp4', href: '#',
    note: 'A share screen is a small surface with a big job. You\'re asking someone to put their name behind something. I got into what makes that feel easy versus what makes it feel like a commitment.',
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
            Daily UI gives you a prompt a day for 100 days. I design each one, come up with a concept, then build it in code using AI tools like Claude Code, Cursor, and Replit. The learning is about better prompting, token usage, and building design systems that AI can actually understand. Hover any card to see the notes.
          </p>
        </div>
      </div>

      <main className="dui-gallery">
        {entries.map((item) => (
          <a key={item.day} href={item.video} target="_blank" rel="noopener noreferrer" className="dui-card" aria-label={`${item.prompt} — view recording`}>
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

    </div>
  )
}
