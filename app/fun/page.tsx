import Link from 'next/link'
import type { Metadata } from 'next'
import '../home-v2.css'

export const metadata: Metadata = {
  title: 'Fun stuff · Sanjana Gangishetty',
  description: 'Little games and experiments — go on, play with them.',
}

export default function FunPage() {
  return (
    <div className="home-v2">
      <img id="sky" src="/sky.png" alt="" />
      <div className="sky-tint" />

      <section className="funstuff" id="fun" style={{ background: 'transparent' }}>
        <div className="wrap">
          <Link href="/" className="fgo" style={{ display: 'inline-block', marginBottom: 20 }}>← Back home</Link>
          <p className="eyebrow">Off the clock</p>
          <h2 className="title">Fun stuff</h2>
          <p className="lede">Little games and experiments I build to keep my hands moving, so go on and play.</p>

          {/* To add a game: uncomment an <iframe> and set src to the hosted URL.
              Duplicate a .fun-item per game; delete that slot's .fun-ph once its iframe is in. */}
          <div className="fun-grid">
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
    </div>
  )
}
