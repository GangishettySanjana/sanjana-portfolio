'use client'

import { useState } from 'react'
import Link from 'next/link'
import '../home-v2.css'
import './recruiters.css'

/**
 * SKETCH — "For recruiters" JD matcher.
 * Paste a job description; it maps the role against Sanjana's real experience
 * and shows where she lines up, where she's close, and where she'd ramp.
 * Fit-forward framing on purpose: gaps read as "how I'd grow into it", never
 * a flat "I can't". Matching is a client-side keyword heuristic for now — a
 * real version would run this through the AI. Kept local, not deployed.
 */

type Cap = { label: string; keywords: string[]; evidence: string }

// Core strengths — things that line up as a real fit, each with proof.
const PROFILE: Cap[] = [
  { label: 'Product design, end to end', keywords: ['product design', 'product designer', 'end-to-end', 'end to end', '0 to 1', '0-1', 'mvp', 'ship features', 'own the'], evidence: 'Seven years in design, three in product. I take features from research to a live product, not just mockups.' },
  { label: 'AI / ML products', keywords: ['ai', 'artificial intelligence', 'machine learning', ' ml ', 'llm', 'generative', 'genai', 'model', 'chatbot', 'agent'], evidence: 'FlairX (AI recruiting) and my live AI Trust Meter. AI is where I do most of my work.' },
  { label: 'Fintech', keywords: ['fintech', 'finance', 'financial', 'payments', 'banking', 'trading', 'crypto', 'wallet'], evidence: 'Shipped fintech product work across flows and dashboards.' },
  { label: 'E-commerce', keywords: ['e-commerce', 'ecommerce', 'commerce', 'retail', 'checkout', 'shopping', 'marketplace', 'gifting'], evidence: 'Aura — a gifting app rebuilt around how people actually browse, decide, and check out.' },
  { label: 'UX research & discovery', keywords: ['research', 'discovery', 'interview', 'usability', 'user testing', 'insight', 'validate'], evidence: 'I do my best work in the fuzzy early stage, running discovery before anyone is sure what the real problem is.' },
  { label: 'Prototyping & interaction', keywords: ['prototype', 'prototyping', 'interaction', 'motion', 'micro-interaction', 'animation', 'framer'], evidence: 'I prototype in code and in Figma/Framer. This whole portfolio is a working prototype I built.' },
  { label: 'A designer who builds', keywords: ['code', 'front-end', 'frontend', 'react', 'html', 'css', 'engineer', 'technical', 'ship it', 'build'], evidence: "I don't stop at mockups. I build working, coded product (this site, live demos, small games) with AI tools." },
  { label: 'Visual & UI craft', keywords: ['ui', 'visual design', 'interface', 'ui design', 'typography', 'brand', 'visual'], evidence: 'Strong UI craft across the case studies, plus a full brand project (GetUp).' },
  { label: 'Making complex things simple', keywords: ['complex', 'simplify', 'usable', 'clarity', 'intuitive', 'streamline', 'reduce friction'], evidence: 'My whole thing: taking confusing, technical products and making them feel obvious. FlairX went from a 2-hour job to 30 minutes.' },
]

// Stretch areas — matched honestly, but framed as ramp, not "no".
const RAMP: Cap[] = [
  { label: 'Leading or managing a team', keywords: ['manage', 'managing', 'lead a team', 'people management', 'mentor', 'direct report', 'head of', 'principal designer', 'staff designer', 'team lead'], evidence: "I've driven projects end to end and set direction, but not managed a design team yet. It's a natural next step I'd ramp into." },
  { label: 'Enterprise B2B SaaS at scale', keywords: ['enterprise', 'b2b saas', 'saas platform', 'large-scale', 'at scale', 'fortune 500', 'thousands of'], evidence: 'My SaaS work is real but not huge-enterprise scale. Closest match: the AI and fintech products I have shipped.' },
  { label: 'Deep native mobile (iOS/Android)', keywords: ['ios', 'android', 'swift', 'kotlin', 'native app', 'swiftui'], evidence: "I design mobile (Aura) but I'm web-first in what I build. I'd pick up native-specific patterns fast." },
  { label: 'Heavy data visualization', keywords: ['data visualization', 'data viz', 'dataviz', 'charts', 'graphs', 'analytics dashboard'], evidence: "I've built dashboards; heavy data-viz would be a stretch I'd enjoy growing into." },
]

const SAMPLE = `Product Designer, AI Products

We're looking for a product designer to help shape our AI-powered assistant. You'll work end to end: discovery and user research, prototyping, and shipping polished UI with our engineers. You should be comfortable making complex, technical workflows feel simple and intuitive. Bonus if you can prototype in code (React) and have worked on fintech or SaaS products. Some data visualization experience is a plus.`

type Result = { empty: boolean; verdict: string; strong: Cap[]; ramp: Cap[] }

function matchJD(text: string): Result {
  const t = ` ${(text || '').toLowerCase()} `
  const hit = (kws: string[]) => kws.some((k) => t.includes(k))
  const strong = PROFILE.filter((c) => hit(c.keywords))
  const ramp = RAMP.filter((c) => hit(c.keywords))
  const empty = !text.trim()

  let verdict = ''
  if (empty) verdict = ''
  else if (strong.length >= 4 && ramp.length <= 1) verdict = "Strong match. This is squarely my lane."
  else if (strong.length >= 2) verdict = "Solid match, with a couple of things I'd grow into."
  else verdict = "Partial match. Straight read: some of my strengths line up, but this leans into areas I'd be ramping on."

  return { empty, verdict, strong, ramp }
}

export default function RecruitersPage() {
  const [jd, setJd] = useState('')
  const [result, setResult] = useState<Result | null>(null)

  const run = () => setResult(matchJD(jd))
  const trySample = () => { setJd(SAMPLE); setResult(matchJD(SAMPLE)) }

  return (
    <div className="home-v2">
      <img id="sky" src="/sky.png" alt="" />
      <div className="sky-tint" />

      <section className="rec">
        <div className="wrap">
          <div className="rec-head">
            <p className="eyebrow">For recruiters</p>
            <h2 className="rec-title">Wondering if I&rsquo;m a fit? Paste the role.</h2>
            <p className="lede">Drop in a job description and I&rsquo;ll map it against my real experience: where I line up, and where I&rsquo;d ramp. Honest, no fluff.</p>
          </div>

          <div className="rec-panel">
            <textarea
              className="rec-input"
              placeholder="Paste the job description here…"
              value={jd}
              onChange={(e) => setJd(e.target.value)}
            />
            <div className="rec-actions">
              <button className="rec-go" onClick={run} disabled={!jd.trim()}>See the match</button>
              <button className="rec-sample" onClick={trySample}>Try a sample</button>
            </div>
          </div>

          {result && (
            <div className="rec-result">
              {result.empty ? (
                <p className="rec-empty">Paste a description above and I&rsquo;ll break it down.</p>
              ) : (
                <>
                  <p className="rec-verdict">{result.verdict}</p>

                  {result.strong.length > 0 && (
                    <div className="rec-block">
                      <h3 className="rec-h rec-h-fit">Right in my lane</h3>
                      <ul>
                        {result.strong.map((c) => (
                          <li key={c.label}><span className="rec-cap">{c.label}</span>{c.evidence}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {result.ramp.length > 0 && (
                    <div className="rec-block">
                      <h3 className="rec-h rec-h-ramp">Where I&rsquo;d ramp</h3>
                      <ul>
                        {result.ramp.map((c) => (
                          <li key={c.label}><span className="rec-cap">{c.label}</span>{c.evidence}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {result.strong.length === 0 && result.ramp.length === 0 && (
                    <p className="rec-empty">Nothing jumped out from that text. Try pasting the full description, or the responsibilities section.</p>
                  )}

                  <p className="rec-foot">Want the detail? <Link href="/#work">See the work</Link> or <a href="mailto:gangishettysanjana084@gmail.com">just email me</a>.</p>
                </>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
