'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import TyperHero from '@/components/TyperHero'
import ResumeModal from '@/components/ResumeModal'
import { Clock01Icon, RocketIcon, Award01Icon } from 'hugeicons-react'
import { HugeiconsIcon } from '@hugeicons/react'
import { Linkedin01FreeIcons, Menu01FreeIcons, Cancel01FreeIcons } from '@hugeicons/core-free-icons'
import './home-v2.css'

export default function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [marqueePaused, setMarqueePaused] = useState(false)
  const [resumeOpen, setResumeOpen] = useState(false)
  const [hlIdx, setHlIdx] = useState(0)
  const [hlVisible, setHlVisible] = useState(true)

  const highlights = [
    { tag: 'Lovable Hackathon', text: 'Finalist — shipped a full AI product in 48h' },
    { tag: 'FlairX', text: 'Cut recruiter screening time by 75% (2 hr → 30 min)' },
    { tag: 'Northern Trust', text: 'Surfaced portfolio risk in 30 sec, down from 40 min' },
  ]

  useEffect(() => {
    const iv = setInterval(() => {
      setHlVisible(false)
      setTimeout(() => { setHlIdx(i => (i + 1) % 3); setHlVisible(true) }, 350)
    }, 3800)
    return () => clearInterval(iv)
  }, [])
  const previewRef = useRef<HTMLDivElement>(null)

  // Small "view" cue (eye) that follows the cursor while hovering a work row.
  const placePreview = (x: number, y: number) => {
    const box = previewRef.current
    if (!box) return
    box.style.left = x + 'px'
    box.style.top = y + 'px'
  }
  const showPreview = (e: React.MouseEvent) => {
    const box = previewRef.current
    if (!box) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (window.matchMedia('(hover: none)').matches) return
    placePreview(e.clientX, e.clientY)
    box.classList.add('on')
  }
  const movePreview = (e: React.MouseEvent) => {
    placePreview(e.clientX, e.clientY)
  }
  const hidePreview = () => {
    previewRef.current?.classList.remove('on')
  }
  useEffect(() => {
    const host = document.body
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    // Respect reduced motion: start the skill marquees paused (WCAG 2.3.3).
    if (reduceMotion) setMarqueePaused(true)

    /* ── cursor sticker trail (hero only) — skipped under reduced motion,
       same as every other animated bit of this page. */
    const stickers = ['☕','🎨','🏔️','🐶','🧁','🥾','🎙️','🪨','🎧','🌸','✦']
    let idx = 0, lastX: number | null = null, lastY: number | null = null
    const GAP = 78, MAX = 14
    const spawn = (x: number, y: number) => {
      if (reduceMotion) return
      const el = document.createElement('div')
      el.className = 'trail'
      el.textContent = stickers[idx % stickers.length]; idx++
      el.style.left = x + 'px'; el.style.top = y + 'px'
      el.style.setProperty('--rot', (((idx * 47) % 20) - 10) + 'deg')
      host.appendChild(el)
      requestAnimationFrame(() => el.classList.add('show'))
      setTimeout(() => { el.classList.remove('show'); el.classList.add('hide') }, 500)
      setTimeout(() => el.remove(), 1030)
      const live = host.querySelectorAll('.trail')
      if (live.length > MAX) live[0].remove()
    }
    const seamEl = document.querySelector('.home-v2 .seam') as HTMLElement | null
    const onMove = (e: PointerEvent) => {
      if (seamEl && e.clientY >= seamEl.getBoundingClientRect().top) { lastX = e.clientX; lastY = e.clientY; return }
      if (lastX == null || lastY == null) { lastX = e.clientX; lastY = e.clientY; spawn(e.clientX, e.clientY); return }
      if (Math.hypot(e.clientX - lastX, e.clientY - lastY) < GAP) return
      lastX = e.clientX; lastY = e.clientY; spawn(e.clientX, e.clientY)
    }
    window.addEventListener('pointermove', onMove)

    /* ── skill marquee + highlight ── */
    type Item = { t: string; fun?: number; href?: string }
    const rowA: Item[] = [
      { t: 'UI Design' }, { t: 'Product Design' }, { t: '🧁 loves baking', fun: 1 }, { t: 'Prototyping' },
      { t: 'Wireframing' }, { t: 'Figma' }, { t: '☕ makes a mean coffee', fun: 1 }, { t: 'Framer' }, { t: 'Webflow' }, { t: 'After Effects' },
    ]
    const rowB: Item[] = [
      { t: 'User Experience' }, { t: 'Research' }, { t: '🥾 weekend hiker', fun: 1 }, { t: 'Interaction Design' },
      { t: 'Design Systems' }, { t: '🎙️ recently on a podcast', fun: 1, href: 'https://open.spotify.com/episode/7I5EGVw51a9Y68yW5Aqv7z' }, { t: 'Journey Mapping' },
      { t: 'AI-assisted design' }, { t: '🎨 paints rocks', fun: 1 }, { t: 'Creative thinking' }, { t: 'Problem solving' },
    ]
    const fill = (el: HTMLElement | null, arr: Item[]) => {
      if (!el) return
      el.innerHTML = (arr.map(o => o.href
        ? `<a class="tag${o.fun ? ' fun' : ''} link" data-skill="${o.t}" href="${o.href}" target="_blank" rel="noopener noreferrer">${o.t}</a>`
        : `<span class="tag${o.fun ? ' fun' : ''}" data-skill="${o.t}">${o.t}</span>`).join('')).repeat(2)
    }
    const rowAEl = document.getElementById('rowA')
    const rowBEl = document.getElementById('rowB')
    fill(rowAEl, rowA); fill(rowBEl, rowB)
    const order = [...rowA, ...rowB].filter(o => !o.fun).map(o => o.t)
    let hi = 0
    const intervalId = window.setInterval(() => {
      document.querySelectorAll('.home-v2 .tag.on').forEach(t => t.classList.remove('on'))
      const skill = order[hi % order.length]; hi++
      document.querySelectorAll(`.home-v2 .tag[data-skill="${skill}"]`).forEach(t => t.classList.add('on'))
    }, 650)


    /* ── fortune cookies (event delegation) ── */
    const fortunes = [
      "The thing you're overthinking is already good enough to ship.",
      "Someone will hire you for exactly the way your brain works.",
      "The messy middle is your home turf. Stay a beat longer.",
      "A small honest detail you shipped today will outlive the project.",
      "The right opportunity is closer than your doubt admits.",
    ]
    const cookiesEl = document.querySelector('.home-v2 .cookies') as HTMLElement | null
    const slip = document.getElementById('slip')
    const slipMsg = document.getElementById('slipMsg')
    const refill = document.getElementById('refill')
    const totalCookies = cookiesEl ? cookiesEl.querySelectorAll('.ck').length : 0
    let usedCount = 0
    const onCookieClick = (e: Event) => {
      const ck = (e.target as HTMLElement).closest('.ck') as HTMLElement | null
      if (!ck || !cookiesEl?.contains(ck) || !slip || !slipMsg || !refill) return
      slipMsg.textContent = fortunes[Number(ck.dataset.i)] || fortunes[0]
      slip.hidden = false
      slip.classList.remove('in'); void (slip as HTMLElement).offsetWidth; slip.classList.add('in')
      if (!ck.classList.contains('used')) { ck.classList.add('used'); usedCount++ }
      if (usedCount >= totalCookies) refill.hidden = false
    }
    const onRefill = (e: Event) => {
      e.stopPropagation()
      cookiesEl?.querySelectorAll('.ck').forEach(c => c.classList.remove('used'))
      usedCount = 0
      if (refill) refill.hidden = true
      if (slip) slip.hidden = true
    }
    cookiesEl?.addEventListener('click', onCookieClick)
    refill?.addEventListener('click', onRefill)

    /* ── entrance animation via cube-motion (pills only) ── */
    import('cube-motion').then(({ rise }) => {
      rise('.home-v2 .prev', { targets: 'children', stagger: 60 })
    })

    /* ── scroll reveal (synchronous IO — StrictMode-safe) ── */
    const revealIOs: IntersectionObserver[] = []
    const revealedEls: HTMLElement[] = []

    const hide = (el: HTMLElement) => {
      el.style.opacity = '0'
      el.style.translate = '0 12px'
      revealedEls.push(el)
    }
    const show = (el: HTMLElement, delay = 0) => {
      const go = () => {
        el.style.transition = 'opacity 640ms cubic-bezier(0.2,0,0,1), translate 640ms cubic-bezier(0.2,0,0,1)'
        requestAnimationFrame(() => { el.style.opacity = ''; el.style.translate = '' })
      }
      delay ? setTimeout(go, delay) : go()
    }

    // Single elements
    const singles = Array.from(document.querySelectorAll('[data-reveal]')) as HTMLElement[]
    singles.forEach(hide)
    const io1 = new IntersectionObserver(entries => {
      entries.forEach(e => { if (!e.isIntersecting) return; show(e.target as HTMLElement); io1.unobserve(e.target) })
    }, { rootMargin: '0px 0px -10% 0px' })
    singles.forEach(el => io1.observe(el))
    revealIOs.push(io1)

    // Work table rows (staggered)
    const wt = document.getElementById('work-table')
    if (wt) {
      const kids = Array.from(wt.children) as HTMLElement[]
      kids.forEach(hide)
      const io2 = new IntersectionObserver(entries => {
        entries.forEach(e => { if (!e.isIntersecting) return; kids.forEach((el, i) => show(el, i * 70)); io2.disconnect() })
      }, { rootMargin: '0px 0px -10% 0px' })
      io2.observe(wt)
      revealIOs.push(io2)
    }

    return () => {
      window.removeEventListener('pointermove', onMove)
      window.clearInterval(intervalId)
      revealIOs.forEach(io => io.disconnect())
      revealedEls.forEach(el => { el.style.opacity = ''; el.style.translate = ''; el.style.transition = '' })
      cookiesEl?.removeEventListener('click', onCookieClick)
      refill?.removeEventListener('click', onRefill)
      if (rowAEl) rowAEl.innerHTML = ''
      if (rowBEl) rowBEl.innerHTML = ''
      document.querySelectorAll('.home-v2 .trail').forEach(el => el.remove())
    }
  }, [])

  return (
    <div className="home-v2">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img id="sky" src="/sky.png" alt="" />
      <div className="sky-tint" />

      {/* ══ HERO ══ */}
      <div className="hero-screen">
        <nav>
          <div className="nav-left">
            <span className="brand">Sanjana Gangishetty</span>
            <Link href="/recruiters" className="status status-link"><span className="dot" /> Currently looking for a role</Link>
          </div>
          <div className="nav-right">
            <div className={`navlinks${menuOpen ? ' open' : ''}`}>
              <a href="#work" onClick={() => setMenuOpen(false)}>Work</a>
              <a href="#about" onClick={() => setMenuOpen(false)}>About</a>
              <Link href="/playground" onClick={() => setMenuOpen(false)}>Playground</Link>
              <Link href="/recruiters" className="only-mobile" onClick={() => setMenuOpen(false)}>See if we&rsquo;re a match ↗</Link>
            </div>
            <a href="https://www.linkedin.com/in/sanjana-gangishetty" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" style={{ display: 'flex', alignItems: 'center', color: '#002448', opacity: 0.7, transition: 'opacity 0.15s', flexShrink: 0 }} onMouseEnter={e => (e.currentTarget.style.opacity='1')} onMouseLeave={e => (e.currentTarget.style.opacity='0.7')}>
              <HugeiconsIcon icon={Linkedin01FreeIcons} size={22} color="currentColor" strokeWidth={1.5} />
            </a>
            <button className="nav-resume" onClick={() => setResumeOpen(true)}>Résumé ↗</button>
            <button className="nav-toggle" aria-label="Menu" aria-expanded={menuOpen} onClick={() => setMenuOpen(v => !v)}>
              <HugeiconsIcon icon={menuOpen ? Cancel01FreeIcons : Menu01FreeIcons} size={20} color="currentColor" strokeWidth={1.5} />
            </button>
          </div>
        </nav>

        <div className="hero">
          <div className="mid">
            <p className="hello">Hello
              <span className="avatar-wrap">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className="avatar" src="/images/sanjana-new.jpeg" alt="Sanjana"
                  onError={(e) => { (e.currentTarget as HTMLImageElement).src = '/images/sanjana.jpg' }} />
              </span>
              I&apos;m Sanjana</p>
            <span className="pill">Product Designer · designs &amp; ships</span>
            <TyperHero />
            <p className="sub">3 years in product, 7 in design. Mostly AI and fintech. The messier the problem, the more I like it.</p>
            <div className="hero-highlights">
              <span className="hero-hl-label">Highlights</span>
              <div className="hero-hl-track">
                <span className="hero-hl-tag">{highlights[hlIdx].tag}</span>
                <span className="hero-hl-text" style={{ opacity: hlVisible ? 1 : 0, transform: hlVisible ? 'translateY(0)' : 'translateY(6px)', transition: 'opacity 0.3s ease, transform 0.3s ease' }}>
                  {highlights[hlIdx].text}
                </span>
              </div>
            </div>
            <div className="divider" />
            <div className="prev">
              <span className="lbl">Previously in</span>
              <span className="p">Fintech</span><span className="p">AI</span><span className="p">SaaS</span>
            </div>
            <p className="hint">move your cursor, a little trail of me ✦</p>
          </div>
        </div>

        <div className={`wall${marqueePaused ? ' paused' : ''}`}>
          <div className="mrow-wrap"><div className="mrow" id="rowA" /></div>
          <div className="mrow-wrap"><div className="mrow rev" id="rowB" /></div>
          <button
            type="button"
            className="marquee-toggle"
            aria-pressed={marqueePaused}
            aria-label={marqueePaused ? 'Play scrolling skills' : 'Pause scrolling skills'}
            onClick={() => setMarqueePaused(v => !v)}
          >
            {marqueePaused ? '▶' : '‖'}
          </button>
        </div>
      </div>

      {/* ══ SEAM ══ */}
      <div className="seam" />

      {/* ══ WORK ══ */}
      <section className="work" id="work">
        <div className="wrap">
          <p className="eyebrow" data-reveal>Selected work</p>

          <div className="cards-grid">

            {/* FlairX */}
            <Link className="pc" href="/projects/flairx">
              <div className="pc-img pc-img-fx">
                <div className="fx-wrap">
                  <div className="fx-header">
                    <span className="fx-hdr-lbl">Top candidates</span>
                    <span className="fx-hdr-count">12 screened</span>
                  </div>
                  <div className="fx-cand fx-cand-active">
                    <div className="fx-av fx-av-1" />
                    <div style={{flex:1}}>
                      <div className="fx-name">Alex Rivera</div>
                      <div className="fx-sub">Sr. Product Designer · NYC · 8 yrs</div>
                    </div>
                    <div className="fx-badge">87%</div>
                  </div>
                  <div className="fx-cand fx-cand-dim">
                    <div className="fx-av fx-av-2" />
                    <div style={{flex:1}}>
                      <div className="fx-name">Jordan Chen</div>
                      <div className="fx-sub">Product Designer · SF · 5 yrs</div>
                    </div>
                    <div className="fx-badge fx-badge-dim">73%</div>
                  </div>
                  <div className="fx-bar">
                    <div className="fx-blbl"><span>AI match · Alex Rivera</span><span style={{color:'#00254B'}}>87/100</span></div>
                    <div className="fx-trk"><div className="fx-fill" style={{width:'87%'}} /></div>
                  </div>
                  <div className="fx-chips">
                    <span className="fx-chip">B2B SaaS</span>
                    <span className="fx-chip">AI</span>
                  </div>
                </div>
                <div className="pc-arrow pc-arrow-fx">↗</div>
              </div>
              <div className="pc-body">
                <div className="pc-eye pc-eye-fx">Product Design · FlairX AI</div>
                <div className="pc-title">Redesigning the Recruiter Workflow</div>
                <div className="pc-desc">AI-powered résumé screening that cuts processing time and removes guesswork from the shortlist.</div>
                <div className="pc-stats">
                  <div className="pc-stat"><span className="pc-check pc-check-fx">✓</span>Résumé batch: 2 hrs → 30 min per cycle</div>
                  <div className="pc-stat"><span className="pc-check pc-check-fx">✓</span>130 hires sourced through the new flow in 6 months</div>
                </div>
                <span className="pc-tag">B2B SaaS</span>
              </div>
            </Link>

            {/* Meridian */}
            <Link className="pc" href="/projects/meridian">
              <div className="pc-img pc-img-md">
                <div className="md-wrap">
                  <div className="md-panel">
                    <div className="md-head">
                      <span className="md-th">Client</span>
                      <span className="md-th">Risk</span>
                      <span className="md-th">Exposure</span>
                    </div>
                    <div className="md-row"><span className="md-client">Hartwell, D.</span><span className="md-pill p-r">High</span><span className="md-val">68.4%</span></div>
                    <div className="md-row"><span className="md-client">Osei, K.</span><span className="md-pill p-a">Review</span><span className="md-val">51.2%</span></div>
                    <div className="md-row"><span className="md-client">Patel, R.</span><span className="md-pill p-g">Safe</span><span className="md-val">29.7%</span></div>
                  </div>
                  <div className="md-kpi-row">
                    <span className="md-kpi">40 min → 30 sec</span>
                    <span className="md-sub">to surface at-risk clients</span>
                  </div>
                </div>
                <div className="pc-arrow pc-arrow-md">↗</div>
              </div>
              <div className="pc-body">
                <div className="pc-eye pc-eye-md">Simplified Management · Private Wealth</div>
                <div className="pc-title">A Risk Console for Wealth Advisors</div>
                <div className="pc-desc">Surfaces over-exposed clients in seconds — replacing a 40-minute manual spreadsheet review.</div>
                <div className="pc-stats">
                  <div className="pc-stat"><span className="pc-check pc-check-md">✓</span>40 min → 30 sec to identify at-risk clients</div>
                  <div className="pc-stat"><span className="pc-check pc-check-md">✓</span>200-client prototype: real sort, filter, and drill-down</div>
                </div>
                <span className="pc-tag">B2B Fintech</span>
              </div>
            </Link>

            {/* Fireside */}
            <Link className="pc" href="/projects/fireside">
              <div className="pc-img pc-img-fs">
                <svg viewBox="0 0 400 244" preserveAspectRatio="xMidYMid slice" style={{position:'absolute',inset:0,width:'100%',height:'100%'}}>
                  <path d="M0,195 Q45,155 90,168 Q135,181 180,130 Q225,79 270,102 Q315,125 360,85 L400,75 L400,244 L0,244Z" fill="rgba(255,134,65,0.07)"/>
                  <path d="M0,212 Q55,178 110,190 Q165,202 220,158 Q275,114 330,132 Q365,144 400,118 L400,244 L0,244Z" fill="rgba(255,134,65,0.04)"/>
                  <path d="M0,195 Q45,155 90,168 Q135,181 180,130 Q225,79 270,102 Q315,125 360,85 L400,75" fill="none" stroke="rgba(255,134,65,0.55)" strokeWidth="1.5"/>
                  <path d="M0,212 Q55,178 110,190 Q165,202 220,158 Q275,114 330,132 Q365,144 400,118" fill="none" stroke="rgba(255,134,65,0.32)" strokeWidth="1"/>
                  <path d="M0,228 Q60,208 120,215 Q180,222 240,185 Q300,148 360,162 L400,155" fill="none" stroke="rgba(255,134,65,0.18)" strokeWidth="0.8"/>
                  <ellipse cx="225" cy="118" rx="38" ry="22" fill="rgba(255,134,65,0.09)" stroke="rgba(255,134,65,0.45)" strokeWidth="1" strokeDasharray="3,3"/>
                  <text x="210" y="122" fontSize="7.5" fill="rgba(192,74,32,0.75)" fontFamily="monospace">Fire Zone</text>
                </svg>
                <div className="fs-wrap">
                  <div className="fs-panel">
                    <div className="fs-lbl">Live Conditions · Zone 4-B</div>
                    <div className="fs-grid">
                      <div className="fs-cell"><div className="fs-clbl">Wind</div><div className="fs-cval">14mph</div></div>
                      <div className="fs-cell"><div className="fs-clbl">Humidity</div><div className="fs-cval">9%</div></div>
                      <div className="fs-cell"><div className="fs-clbl">Spread</div><div className="fs-cval" style={{color:'#e06020'}}>Fast</div></div>
                    </div>
                  </div>
                  <div className="fs-panel">
                    <div className="fs-lbl">Fuel Load by Terrain</div>
                    <div className="fs-brow"><span className="fs-blbl">Ridge top</span><div className="fs-trk"><div className="fs-fill" style={{width:'82%'}} /></div></div>
                    <div className="fs-brow"><span className="fs-blbl">Valley</span><div className="fs-trk"><div className="fs-fill" style={{width:'47%'}} /></div></div>
                  </div>
                  <div className="fs-tags"><span className="fs-tag">Physical UX</span><span className="fs-tag">CU Boulder</span></div>
                </div>
                <div className="pc-arrow pc-arrow-fs">↗</div>
              </div>
              <div className="pc-body">
                <div className="pc-eye pc-eye-fs">Physical UX · CU Boulder · 2024</div>
                <div className="pc-title">A Wildfire Exhibit Anyone Could Use</div>
                <div className="pc-desc">Interaction design for a physical 3D terrain table — teaching fire behavior through touch, not text.</div>
                <div className="pc-stats">
                  <div className="pc-stat"><span className="pc-check pc-check-fs">✓</span>Deployed at 4 public science events</div>
                  <div className="pc-stat"><span className="pc-check pc-check-fs">✓</span>0 instructions needed — usable in under 10 seconds</div>
                </div>
                <span className="pc-tag">Physical UX</span>
              </div>
            </Link>

            {/* Aura */}
            <Link className="pc" href="/projects/aura">
              <div className="pc-img pc-img-au">
                <div className="au-wrap">
                  <div className="au-hdr">
                    <span className="au-nm">Aura</span>
                    <span className="au-step">Step 1 · Pick delivery date</span>
                  </div>
                  <div className="au-list">
                    <div className="au-row"><div><div className="au-fn">Summer Blush Bouquet</div><div className="au-fp">₹890</div></div><span className="au-s ok">In stock</span></div>
                    <div className="au-row"><div><div className="au-fn">Golden Garden Mix</div><div className="au-fp">₹1,100</div></div><span className="au-s lo">3 left</span></div>
                    <div className="au-row"><div><div className="au-fn">White Elegance</div><div className="au-fp">₹750</div></div><span className="au-s ok">In stock</span></div>
                  </div>
                  <div className="au-cta">Build your own bouquet →</div>
                </div>
                <div className="pc-arrow pc-arrow-au">↗</div>
              </div>
              <div className="pc-body">
                <div className="pc-eye pc-eye-au">Google UX Certificate · E-Commerce · 2023</div>
                <div className="pc-title">A Florist App Built Around Gifting</div>
                <div className="pc-desc">Mobile app for a Hyderabad florist with no digital presence — designed end-to-end from scratch.</div>
                <div className="pc-stats">
                  <div className="pc-stat"><span className="pc-check pc-check-au">✓</span>0 → 5/5 task completion after checkout reorder</div>
                  <div className="pc-stat"><span className="pc-check pc-check-au">✓</span>3 rounds of usability testing, end-to-end</div>
                </div>
                <span className="pc-tag">E-Commerce</span>
              </div>
            </Link>

          </div>

        </div>
      </section>

      {/* ══ DAILY UI ══ */}

      {/* ══ ABOUT ══ */}
      <section className="about" id="about">
        <div className="wrap">
          <div className="a-grid">
            <div className="a-photo">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/sanjana-hero.png" alt="Sanjana Gangishetty"
                onError={(e) => { (e.currentTarget as HTMLImageElement).src = '/images/sanjana.jpg' }} />
            </div>
            <div className="a-text">
              <p className="eyebrow2">Nice to meet you</p>
              <h2>I&apos;m Sanjana, Product Designer</h2>
              <p className="a-story">Shipped AI tools, fintech products, e-commerce. I do my best work before the wireframe exists, in the messy middle where nobody&apos;s sure what they&apos;re solving yet. That&apos;s the part I care about most.</p>
              <div className="a-stats">
                <div className="a-stat-card">
                  <div className="a-stat-num-row"><Clock01Icon size={18} className="a-stat-icon" /><span className="a-stat-num">3+</span></div>
                  <span className="a-stat-lbl">Years of Experience</span>
                </div>
                <div className="a-stat-card">
                  <div className="a-stat-num-row"><RocketIcon size={18} className="a-stat-icon" /><span className="a-stat-num">10+</span></div>
                  <span className="a-stat-lbl">Projects Shipped</span>
                </div>
                <div className="a-stat-card">
                  <div className="a-stat-num-row"><Award01Icon size={18} className="a-stat-icon" /><span className="a-stat-num">Finalist</span></div>
                  <span className="a-stat-lbl">Lovable Hackathon · 2024</span>
                </div>
              </div>
              <div className="a-actions">
                <Link className="solid" href="/about">Full story →</Link>
                <button className="ghost" onClick={() => setResumeOpen(true)}>Résumé ↗</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ reverse seam ══ */}
      <div className="seam-up" />

      {/* ══ CONTACT / FOOTER ══ */}
      <footer className="foot" id="contact">
        <div className="wrap">
          <div className="foot-left">
            <p className="eyebrow2">Let&apos;s connect</p>
            <h3>Let&apos;s talk.</h3>
            <div className="cta-row">
              <a className="btn btn-solid" href="mailto:gangishettysanjana084@gmail.com">Email me →</a>
              <a className="btn btn-ghost" href="https://www.linkedin.com/in/sanjana-gangishetty" target="_blank" rel="noopener noreferrer">LinkedIn ↗</a>
              <button className="btn btn-ghost" onClick={() => setResumeOpen(true)}>Résumé ↗</button>
            </div>
            <p className="meta">Sanjana Gangishetty · Product Designer · open to work · 2026</p>
          </div>

          <div className="fortune">
            <div className="slip" id="slip" hidden>
              <div className="crack">
                <p className="strip"><span id="slipMsg" /></p>
              </div>
              <button className="again" id="refill" hidden>refill the plate ↻</button>
            </div>
            <div className="bowl">
              <div className="plate" />
              <div className="cookies">
                <button className="ck c-bl" data-i="0" aria-label="Fortune cookie 1 of 5">🥠</button>
                <button className="ck c-br" data-i="1" aria-label="Fortune cookie 2 of 5">🥠</button>
                <button className="ck c-fl" data-i="2" aria-label="Fortune cookie 3 of 5">🥠</button>
                <button className="ck c-fr" data-i="3" aria-label="Fortune cookie 4 of 5">🥠</button>
                <button className="ck c-top" data-i="4" aria-label="Fortune cookie 5 of 5">🥠</button>
              </div>
            </div>
            <p className="fhint">pick a cookie ✦</p>
          </div>
        </div>
      </footer>
      {resumeOpen && <ResumeModal onClose={() => setResumeOpen(false)} />}
    </div>
  )
}
