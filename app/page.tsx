'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import './home-v2.css'

export default function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [marqueePaused, setMarqueePaused] = useState(false)
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

    /* ── reveal on scroll ── */
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target) }
    }, { threshold: 0.14 })
    document.querySelectorAll('.home-v2 .reveal').forEach((el, i) => {
      ;(el as HTMLElement).style.transitionDelay = (Math.min(i, 6) * 0.05) + 's'
      io.observe(el)
    })
    // bento tiles get their own local stagger (the global delay above flattens past index 6)
    document.querySelectorAll('.home-v2 .bento .reveal').forEach((el, j) => {
      ;(el as HTMLElement).style.transitionDelay = (j * 0.06) + 's'
    })

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

    return () => {
      window.removeEventListener('pointermove', onMove)
      window.clearInterval(intervalId)
      io.disconnect()
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
            <Link href="/recruiters" className="status status-link"><span className="dot" /> Currently looking for a role <span className="status-cta">· see if we&rsquo;re a match ↗</span></Link>
          </div>
          <div className="nav-right">
            <div className={`navlinks${menuOpen ? ' open' : ''}`}>
              <a href="#work" onClick={() => setMenuOpen(false)}>Work</a>
              <a href="#daily-ui" onClick={() => setMenuOpen(false)}>Daily UI</a>
              <a href="#about" onClick={() => setMenuOpen(false)}>About</a>
              <Link href="/fun" onClick={() => setMenuOpen(false)}>Fun</Link>
              <a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a>
              <Link href="/recruiters" className="only-mobile" onClick={() => setMenuOpen(false)}>See if we&rsquo;re a match ↗</Link>
            </div>
            <a className="nav-resume" href="/resume.pdf?v=0722" target="_blank" rel="noopener noreferrer">Résumé ↗</a>
            <button className="nav-toggle" aria-label="Menu" aria-expanded={menuOpen} onClick={() => setMenuOpen(v => !v)}>
              <span /><span /><span />
            </button>
          </div>
        </nav>

        <div className="hero">
          <div className="mid">
            <p className="hello">Hello
              <span className="avatar-wrap">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className="avatar" src="/images/sanjana.jpg" alt="Sanjana"
                  onError={(e) => { (e.currentTarget as HTMLImageElement).src = '/images/sanjana-hero.png' }} />
              </span>
              I&apos;m Sanjana</p>
            <span className="pill">Product Designer · designs &amp; ships</span>
            <h1>Designing better human experiences for an AI-first world.</h1>
            <p className="sub">Seven years in design, three in product, mostly AI and fintech. The messier the problem, the more I like it.</p>
            <div className="divider" />
            <div className="prev">
              <span className="lbl">Previously in</span>
              <span className="p">AI</span><span className="p">HR Tech</span><span className="p">SaaS</span>
              <span className="p">EDU Tech</span><span className="p">E-Commerce</span>
            </div>
          </div>
        </div>

        <p className="hint">move your cursor, a little trail of me ✦</p>

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
          <p className="eyebrow reveal">Selected work</p>

          <div className="work-table reveal">
            {[
              { num: '01', name: 'FlairX', tag: 'AI · HR Tech', impact: 'Recruiters spent 2 hours just getting candidates into the system. I got it to 30 minutes. The whole flow, from research to ship.', href: '/projects/flairx' },
              { num: '02', name: 'Fireside', tag: 'Hardware · 0→1', impact: 'A 3D projected table a 9-year-old understood in 15 seconds, with no instructions. Designed for hands, not manuals.', href: '/projects/fireside' },
              { num: '03', name: 'Meridian', tag: 'Fintech · Risk', impact: 'Wealth advisors were spending 40 minutes hunting for over-exposed clients. I redesigned the risk console. Now it takes 30 seconds.', href: '/projects/meridian' },
              { num: '04', name: 'Aura', tag: 'E-Commerce · 0→1', impact: 'Gifting, rebuilt around how people actually browse, decide, and check out. The full flow, end to end.', href: '/projects/aura' },
            ].map((p) => (
              <Link
                key={p.name}
                className="wt-row"
                href={p.href}
                onMouseEnter={showPreview}
                onMouseMove={movePreview}
                onMouseLeave={hidePreview}
              >
                <span className="wt-c-num">{p.num}</span>
                <span className="wt-c-mid">
                  <span className="wt-c-name">{p.name}</span>
                  <span className="wt-c-tag">{p.tag}</span>
                  <span className="wt-c-impact">{p.impact}</span>
                </span>
                <span className="wt-c-arrow" aria-hidden="true">→</span>
              </Link>
            ))}
          </div>

          {/* Cursor-follow "view" cue for the work rows. */}
          <div className="wt-preview" ref={previewRef} aria-hidden="true">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M1.5 12S5 5 12 5s10.5 7 10.5 7-3.5 7-10.5 7S1.5 12 1.5 12Z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
          </div>

          <p className="eyebrow reveal wt-other-label">Other work</p>
          <div className="bento bento-2">
            <a className="tile ttile b-aitm reveal" href="https://ai-trust-meter.vercel.app" target="_blank" rel="noopener noreferrer"><span className="k">Self-initiated · live</span><p className="t">AI Trust Meter shows how grounded an AI answer really is.</p><span className="cta">Try live demo ↗</span></a>
            <div className="tile ttile b-pov reveal"><span className="k">POV · OpenRouter</span><p className="t">500+ AI models, no guidance. I designed a wizard that gets you to a working API call in four questions.</p><span className="cta">Live prototype →</span></div>
          </div>
        </div>
      </section>

      {/* ══ DAILY UI ══ */}
      <section className="daily-ui" id="daily-ui">
        <div className="wrap">
          <div className="du-header reveal">
            <p className="eyebrow">Daily UI Challenge</p>
            <span className="du-counter">Day 4 of 100</span>
          </div>
          <div className="du-subrow reveal">
            <a href="/daily-ui" className="du-see-all">See all →</a>
          </div>
          <div className="du-grid reveal">
            {([
              { day: '01', prompt: 'Sign Up',              video: '/daily-ui/001.mp4', href: '#' },
              { day: '02', prompt: 'Credit Card Checkout', video: '/daily-ui/002.mp4', href: '#' },
              { day: '04', prompt: 'Calculator',           video: '/daily-ui/004.mov', href: '#' },
            ] as { day: string; prompt: string; video: string; href: string }[]).map((item) => (
              <a key={item.day} href={item.href} target="_blank" rel="noopener noreferrer" className="du-card">
                <div className="du-video-wrap">
                  <video src={item.video} autoPlay muted loop playsInline className="du-video" />
                </div>
                <div className="du-info">
                  <span className="du-day">Day {item.day}</span>
                  <span className="du-prompt">{item.prompt}</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

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
              <p className="a-story">Shipped AI tools, fintech products, e-commerce. I do my best work before the wireframe exists, in the messy middle where nobody&apos;s sure what they&apos;re solving yet. That&apos;s the part most designers skip. I don&apos;t.</p>
              <div className="a-actions">
                <Link className="solid" href="/about">Full story →</Link>
                <a className="ghost" href="/resume.pdf?v=0722" target="_blank" rel="noopener noreferrer">Résumé ↗</a>
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
              <a className="btn btn-ghost" href="/resume.pdf?v=0722" target="_blank" rel="noopener noreferrer">Résumé ↗</a>
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
    </div>
  )
}
