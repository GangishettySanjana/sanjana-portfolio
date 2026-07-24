'use client'

import { useEffect } from 'react'
import './home-v2.css'

export default function HomePage() {
  useEffect(() => {
    const host = document.body

    /* ── cursor sticker trail (hero only) ── */
    const stickers = ['☕','🎨','🏔️','🐶','🧁','🥾','🎙️','🪨','🎧','🌸','✦']
    let idx = 0, lastX: number | null = null, lastY: number | null = null
    const GAP = 78, MAX = 14
    const spawn = (x: number, y: number) => {
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
      if (lastX == null) { lastX = e.clientX; lastY = e.clientY; spawn(e.clientX, e.clientY); return }
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
            <span className="status"><span className="dot" /> Currently looking for a role</span>
          </div>
          <div className="navlinks">
            <a href="#work">Work</a><a href="#about">About</a><a href="#contact">Contact</a>
            <a className="nav-resume" href="/resume.pdf?v=0722" target="_blank" rel="noopener noreferrer">Résumé ↗</a>
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
            <h1>I look for the harmony between what people need and what a product can do. Then I build it, to see if I found it.</h1>
            <p className="sub">I design across AI, fintech, and e-commerce. Last project, I cut a recruiter&apos;s intake from 2 hours to 30 minutes.</p>
            <div className="divider" />
            <div className="prev">
              <span className="lbl">Previously in</span>
              <span className="p">AI</span><span className="p">HR Tech</span><span className="p">SaaS</span>
              <span className="p">EDU Tech</span><span className="p">E-Commerce</span>
            </div>
          </div>
        </div>

        <p className="hint">move your cursor — a little trail of me ✦</p>

        <div className="wall">
          <div className="mrow-wrap"><div className="mrow" id="rowA" /></div>
          <div className="mrow-wrap"><div className="mrow rev" id="rowB" /></div>
        </div>
      </div>

      {/* ══ SEAM ══ */}
      <div className="seam" />

      {/* ══ WORK ══ */}
      <section className="work" id="work">
        <div className="wrap">
          <p className="eyebrow reveal">Selected work</p>
          <h2 className="title reveal">Things I designed, then built</h2>
          <p className="lede reveal">Different problems, same question underneath: why does this feel harder than it should?</p>

          <div className="features">
            <div className="feature reveal">
              <div className="fwrap">
                <div className="ffig embed"><iframe src="/flairx-cover.html" title="FlairX case-study cover" scrolling="no" /></div>
                <div className="ftxt">
                  <span className="fidx">01 / 03</span>
                  <p className="ftag">Product Design · AI recruiting</p>
                  <h3>FlairX</h3>
                  <p className="fhook">Recruiters spent 2 hours just getting candidates into the system. I got it to 30 minutes — the whole flow, from research to ship.</p>
                  <a className="fgo" href="/projects/flairx">View case study →</a>
                </div>
              </div>
            </div>

            <div className="feature flip reveal">
              <div className="fwrap">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <div className="ffig match"><img src="/projects/fireside/exhibit-in-use.png" alt="Fireside exhibit" /></div>
                <div className="ftxt">
                  <span className="fidx">02 / 03</span>
                  <p className="ftag">Interactive exhibit · CU Boulder</p>
                  <h3>Fireside</h3>
                  <p className="fhook">A 3D projected table a 9-year-old understood in 15 seconds, with no instructions. Designed for hands, not manuals.</p>
                  <a className="fgo" href="/projects/fireside">View case study →</a>
                </div>
              </div>
            </div>

            <div className="feature reveal">
              <div className="fwrap">
                <div className="ffig embed"><iframe src="/aura-cover.html" title="Aura case-study cover" scrolling="no" /></div>
                <div className="ftxt">
                  <span className="fidx">03 / 03</span>
                  <p className="ftag">Mobile app · e-commerce</p>
                  <h3>Aura</h3>
                  <p className="fhook">Gifting, rebuilt around how people actually browse, decide, and check out — the full UX flow end to end.</p>
                  <a className="fgo" href="/projects/aura">View case study →</a>
                </div>
              </div>
            </div>
          </div>

          <div className="bento">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <a className="tile b-getup reveal" href="/projects/getup"><div className="imgwrap"><img src="/images/getup.png" alt="" /></div><span className="cap">GetUp · brand</span></a>
            <a className="tile ttile b-aitm reveal" href="https://ai-trust-meter.vercel.app" target="_blank" rel="noopener noreferrer"><span className="k">Self-initiated · live</span><p className="t">AI Trust Meter — shows how grounded an AI answer really is.</p><span className="cta">Try live demo ↗</span></a>
            <div className="tile ttile b-stat reveal"><span className="k">Selected work</span><div className="big">5</div><span className="t">case studies, shipped end-to-end</span></div>
            <div className="tile ttile b-pov reveal"><span className="k">POV · OpenRouter</span><p className="t">500+ AI models, no guidance. I designed a wizard that gets you to a working API call in four questions.</p><span className="cta">Live prototype →</span></div>
            <a className="tile ttile b-pod reveal" href="https://open.spotify.com/episode/7I5EGVw51a9Y68yW5Aqv7z" target="_blank" rel="noopener noreferrer"><span className="k">▶ Podcast</span><p className="t">I talked through my whole path into design.</p><span className="cta">Listen →</span></a>
            <div className="tile ttile b-bake reveal"><span className="k">Off the clock</span><p className="t">Baking, hiking, and painting little rocks. Coffee, always.</p></div>
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
                <a className="solid" href="/about">Full story →</a>
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
                <button className="ck c-bl" data-i="0" aria-label="fortune cookie">🥠</button>
                <button className="ck c-br" data-i="1" aria-label="fortune cookie">🥠</button>
                <button className="ck c-fl" data-i="2" aria-label="fortune cookie">🥠</button>
                <button className="ck c-fr" data-i="3" aria-label="fortune cookie">🥠</button>
                <button className="ck c-top" data-i="4" aria-label="fortune cookie">🥠</button>
              </div>
            </div>
            <p className="fhint">pick a cookie ✦</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
