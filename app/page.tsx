'use client'
import { useEffect, useRef } from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { CustomEase } from 'gsap/CustomEase'
import './home.css'

const BirdScene = dynamic(() => import('@/components/BirdScene'), { ssr: false })

export default function HomePage() {
  const runHeroRef = useRef<(() => void) | null>(null)
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger, CustomEase)

    /* ─────────────────────────────────────────────
       CUSTOM EASES
    ───────────────────────────────────────────── */
    CustomEase.create('reveal', 'M0,0 C0.16,1 0.3,1 1,1')
    CustomEase.create('spring', 'M0,0 C0.14,0 0.242,1.121 0.374,1 0.518,0.876 0.694,1 1,1')

    /* ─────────────────────────────────────────────
       UTILITIES
    ───────────────────────────────────────────── */

    // Split text into individual chars wrapped in spans
    function splitChars(el: HTMLElement, className = 'char') {
      const text = el.textContent || ''
      el.innerHTML = Array.from(text).map(ch =>
        ch === ' '
          ? ' '
          : `<span class="${className}" style="display:inline-block;will-change:transform,opacity">${ch}</span>`
      ).join('')
      return el.querySelectorAll(`.${className}`)
    }

    // Split into word spans (word-inner pattern)
    function splitWords(el: HTMLElement) {
      const text = el.textContent || ''
      el.innerHTML = text.split(' ').map(w =>
        `<span class="word" style="display:inline-block;overflow:hidden;vertical-align:bottom"><span class="word-inner" style="display:inline-block;transform:translateY(110%)">${w}</span></span>`
      ).join(' ')
      return el.querySelectorAll('.word-inner')
    }

    /* ─────────────────────────────────────────────
       1. CURSOR GLOW
    ───────────────────────────────────────────── */
    const handleMouseMove = (e: MouseEvent) => {
      gsap.to('#glow', { x: e.clientX, y: e.clientY, duration: 0.5, ease: 'power2.out' })
    }
    window.addEventListener('mousemove', handleMouseMove)

    /* ─────────────────────────────────────────────
       3. HERO SEQUENCE (fires after intro)
    ───────────────────────────────────────────── */
    function runHero() {
      // Headline: word-by-word clip reveal
      const hHead = document.getElementById('hHead')
      if (!hHead) return
      const headWords = splitWords(hHead)

      const tl = gsap.timeline({ delay: 0.05 })
      tl
        .to('#hGreeting', {
          opacity: 1, y: 0, duration: 0.55, ease: 'power3.out',
        })
        .to(headWords, {
          y: '0%', duration: 0.7, ease: 'reveal', stagger: 0.06,
        }, '-=0.15')
        .to('#hBody', {
          opacity: 1, y: 0, duration: 0.6, ease: 'power3.out',
        }, '-=0.3')
        .to('#hCta', {
          opacity: 1, y: 0, duration: 0.55, ease: 'spring',
        }, '-=0.25')
        .to('#hLoc', {
          opacity: 1, duration: 0.4, ease: 'power2.out',
        }, '-=0.15')
        .to('#hPhoto', {
          opacity: 1, x: 0, duration: 0.8, ease: 'power3.out',
        }, '-=0.8')
        .to('#scrollCue', {
          opacity: 1, duration: 0.5, ease: 'power2.out',
        }, '-=0.2')
    }
    // expose runHero so the intro curtain can fire it when it lifts
    runHeroRef.current = runHero

    // If the curtain didn't render (already seen this session → it skipped and
    // unmounted), reveal the hero ourselves. On the play path the curtain stays
    // on screen for several seconds, so this check finds it and does nothing —
    // the curtain reveals the hero itself when it lifts.
    setTimeout(() => {
      // Curtain is on screen (first visit) → let it reveal the hero when it lifts.
      if (document.querySelector('.scenery-video')) return
      // Curtain skipped (already seen this session) → reveal the hero instantly.
      // gsap.set is idempotent, so StrictMode/double-calls just re-assert the final state.
      const hHead = document.getElementById('hHead')
      if (hHead && !hHead.querySelector('.word-inner')) splitWords(hHead)
      gsap.set('#hHead .word-inner', { y: '0%', opacity: 1 })
      gsap.set(['#hGreeting', '#hBody', '#hCta', '#hLoc', '#hPhoto', '#scrollCue'], { opacity: 1, y: 0, x: 0 })
    }, 150)

    /* ─────────────────────────────────────────────
       4. SCROLL PROGRESS BAR
    ───────────────────────────────────────────── */
    gsap.to('#progress-bar', {
      scaleX: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: 'body',
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.3,
      },
    })

    /* ─────────────────────────────────────────────
       5. HERO PARALLAX — photo drifts up as you scroll
    ───────────────────────────────────────────── */
    gsap.to('#hPhoto', {
      y: -60,
      ease: 'none',
      scrollTrigger: {
        trigger: '.hero-section',
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
      },
    })
    // Hero text drifts slightly slower
    gsap.to('.hero-text', {
      y: -30,
      ease: 'none',
      scrollTrigger: {
        trigger: '.hero-section',
        start: 'top top',
        end: 'bottom top',
        scrub: 1.2,
      },
    })

    /* ─────────────────────────────────────────────
       6. SCROLL CUE — fade out when scrolling starts
    ───────────────────────────────────────────── */
    ScrollTrigger.create({
      trigger: '.work-section',
      start: 'top 90%',
      onEnter: () => gsap.to('#scrollCue', { opacity: 0, y: 10, duration: 0.4 }),
    })

    /* ─────────────────────────────────────────────
       7. WORK HEADER
    ───────────────────────────────────────────── */
    gsap.to('#workHead', {
      opacity: 1, y: 0, duration: 0.75, ease: 'power3.out',
      scrollTrigger: { trigger: '#workHead', start: 'top 85%', toggleActions: 'play none none none' },
    })

    /* ─────────────────────────────────────────────
       8. PROJECT CARDS — staggered inner content
    ───────────────────────────────────────────── */
    gsap.utils.toArray<HTMLElement>('.project-card').forEach((card) => {
      const title    = card.querySelector('.card-title')
      const subtitle = card.querySelector('.card-subtitle')
      const desc     = card.querySelector('.card-desc')
      const stats    = card.querySelectorAll('.stat')
      const btn      = card.querySelector('.card-btn')
      const image    = card.querySelector('.card-right')
      const topRow   = card.querySelector('.card-top-row')

      // Set initial states on inner elements. Content stays visible by
      // default (no opacity:0), the reveal is a positional enhancement
      // only — if the ScrollTrigger below never fires, nothing is hidden.
      gsap.set([title, subtitle, desc, btn, topRow], { y: 28 })
      gsap.set(stats, { y: 20 })
      if (image) gsap.set(image, { x: 30 })

      const st = {
        trigger: card,
        start: 'top 86%',
        toggleActions: 'play none none none',
      }

      // Card itself slides up
      gsap.to(card, {
        opacity: 1, y: 0, duration: 0.9, ease: 'power3.out',
        scrollTrigger: st,
        onStart() { card.classList.add('in-view') },
      })

      // Inner content staggers
      const innerTl = gsap.timeline({ scrollTrigger: { ...st, start: 'top 84%' } })
      innerTl
        .to(topRow,    { opacity: 1, y: 0, duration: 0.4, ease: 'power3.out' })
        .to(title,     { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }, '-=0.1')
        .to(subtitle,  { opacity: 1, y: 0, duration: 0.45, ease: 'power3.out' }, '-=0.2')
        .to(desc,      { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }, '-=0.2')
        .to(stats,     { opacity: 1, y: 0, duration: 0.4, ease: 'power3.out', stagger: 0.07 }, '-=0.2')
        .to(btn,       { opacity: 1, y: 0, duration: 0.45, ease: 'spring' }, '-=0.1')
        .to(image,     { opacity: 1, x: 0, duration: 0.8, ease: 'power3.out' }, '-=0.7')
    })

    /* ─────────────────────────────────────────────
       9. STAT COUNTERS — numbers count up
    ───────────────────────────────────────────── */
    document.querySelectorAll<HTMLElement>('.stat-val[data-count]').forEach(el => {
      const target = parseInt(el.dataset.count || '0', 10)
      const prefix = el.dataset.prefix || ''
      const obj    = { val: 0 }

      gsap.to(obj, {
        val: target,
        duration: 1.4,
        ease: 'power2.out',
        onUpdate() { el.textContent = prefix + Math.round(obj.val) },
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      })
    })

    /* ─────────────────────────────────────────────
       11. CARD 3D TILT + MAGNETIC BUTTONS
    ───────────────────────────────────────────── */
    document.querySelectorAll<HTMLElement>('.project-card').forEach(card => {
      card.addEventListener('mousemove', (e: MouseEvent) => {
        const r = card.getBoundingClientRect()
        const x = (e.clientX - r.left) / r.width  - 0.5
        const y = (e.clientY - r.top)  / r.height - 0.5
        gsap.to(card, {
          rotateY: x * 3, rotateX: -y * 2,
          duration: 0.4, ease: 'power2.out',
          transformPerspective: 1400,
        })
      })
      card.addEventListener('mouseleave', () => {
        gsap.to(card, {
          rotateY: 0, rotateX: 0,
          duration: 0.9, ease: 'elastic.out(1, 0.5)',
        })
      })
    })

    // Magnetic pull on CTA buttons
    document.querySelectorAll<HTMLElement>('.hero-btn-primary, .hero-btn-secondary, .nav-cta').forEach(btn => {
      btn.addEventListener('mousemove', (e: MouseEvent) => {
        const r   = btn.getBoundingClientRect()
        const cx  = r.left + r.width  / 2
        const cy  = r.top  + r.height / 2
        const dx  = (e.clientX - cx) * 0.35
        const dy  = (e.clientY - cy) * 0.35
        gsap.to(btn, { x: dx, y: dy, duration: 0.3, ease: 'power2.out' })
      })
      btn.addEventListener('mouseleave', () => {
        gsap.to(btn, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.4)' })
      })
    })

    /* ─────────────────────────────────────────────
       12. NAV LINK UNDERLINE ANIM
    ───────────────────────────────────────────── */
    document.querySelectorAll<HTMLElement>('.nav-link').forEach(link => {
      link.style.position = 'relative'
      const line = document.createElement('span')
      line.style.cssText = `
        position:absolute; bottom:2px; left:12px; right:12px;
        height:1px; background:#111;
        transform:scaleX(0); transform-origin:left;
        transition:transform 0.22s ease;
      `
      link.appendChild(line)
      link.addEventListener('mouseenter', () => { line.style.transform = 'scaleX(1)' })
      link.addEventListener('mouseleave', () => { line.style.transform = 'scaleX(0)' })
    })

    /* ─────────────────────────────────────────────
       13. ABOUT SECTION
    ───────────────────────────────────────────── */
    const aboutST = { start: 'top 86%', toggleActions: 'play none none none' }

    // Card entry — same feel as project cards
    gsap.to('#aboutCard', {
      opacity: 1, y: 0, duration: 1.0, ease: 'power3.out',
      scrollTrigger: { trigger: '#aboutCard', start: 'top 88%', toggleActions: 'play none none none' },
    })

    gsap.to('#aboutEye', {
      opacity: 1, y: 0, duration: 0.55, ease: 'power3.out',
      scrollTrigger: { trigger: '#aboutEye', ...aboutST },
    })

    // Word clip reveal on headlines
    ScrollTrigger.create({
      trigger: '#aboutH1', ...aboutST,
      onEnter() {
        const h1 = document.getElementById('aboutH1')
        const h2 = document.getElementById('aboutH2')
        if (h1) {
          gsap.to(splitWords(h1), {
            y: '0%', duration: 0.65, ease: 'reveal', stagger: 0.07,
          })
        }
        if (h2) {
          gsap.to(splitWords(h2), {
            y: '0%', duration: 0.6, ease: 'power3.out', stagger: 0.05, delay: 0.3,
          })
        }
      },
    })

    gsap.to('#aboutB1', {
      opacity: 1, y: 0, duration: 0.7, ease: 'power3.out',
      scrollTrigger: { trigger: '#aboutB1', ...aboutST },
    })
    gsap.to('#aboutB2', {
      opacity: 1, y: 0, duration: 0.7, ease: 'power3.out',
      scrollTrigger: { trigger: '#aboutB2', ...aboutST },
    })

    // Info cells cascade in one by one
    gsap.to('.about-info-cell', {
      opacity: 1, y: 0, duration: 0.45, ease: 'power3.out',
      stagger: 0.08,
      scrollTrigger: { trigger: '#aboutInfo', ...aboutST },
    })

    gsap.to('#aboutBtns', {
      opacity: 1, y: 0, duration: 0.55, ease: 'spring',
      scrollTrigger: { trigger: '#aboutBtns', ...aboutST },
    })

    // Photo slides in from right
    gsap.to('#aboutRight', {
      opacity: 1, x: 0, duration: 0.85, ease: 'power3.out',
      scrollTrigger: { trigger: '#aboutRight', start: 'top 88%', toggleActions: 'play none none none' },
    })

    // Photo parallax — drifts up slowly as you scroll past (like hero photo)
    gsap.to('#aboutRight', {
      y: -40,
      ease: 'none',
      scrollTrigger: {
        trigger: '.about-section',
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1.2,
      },
    })

    // Photo 3D tilt on hover — same as project cards
    const aboutPhotoWrap = document.querySelector<HTMLElement>('.about-photo-wrap')
    if (aboutPhotoWrap) {
      aboutPhotoWrap.addEventListener('mousemove', (e: MouseEvent) => {
        const r = aboutPhotoWrap.getBoundingClientRect()
        const x = (e.clientX - r.left) / r.width  - 0.5
        const y = (e.clientY - r.top)  / r.height - 0.5
        gsap.to(aboutPhotoWrap, {
          rotateY: x * 8, rotateX: -y * 6,
          duration: 0.4, ease: 'power2.out',
          transformPerspective: 1000,
        })
      })
      aboutPhotoWrap.addEventListener('mouseleave', () => {
        gsap.to(aboutPhotoWrap, {
          rotateY: 0, rotateX: 0,
          duration: 0.9, ease: 'elastic.out(1, 0.5)',
        })
      })
    }

    // Magnetic pull on about buttons
    document.querySelectorAll<HTMLElement>('.about-btn-dark, .about-btn-outline').forEach(btn => {
      btn.addEventListener('mousemove', (e: MouseEvent) => {
        const r  = btn.getBoundingClientRect()
        const dx = (e.clientX - r.left - r.width  / 2) * 0.3
        const dy = (e.clientY - r.top  - r.height / 2) * 0.3
        gsap.to(btn, { x: dx, y: dy, duration: 0.25, ease: 'power2.out' })
      })
      btn.addEventListener('mouseleave', () => {
        gsap.to(btn, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.4)' })
      })
    })

    /* ─────────────────────────────────────────────
       14. CONNECT SECTION
    ───────────────────────────────────────────── */
    ScrollTrigger.create({
      trigger: '#conInner',
      start: 'top 82%',
      toggleActions: 'play none none none',
      onEnter() {
        // 1. headline word reveal
        const conHead = document.getElementById('conHead')
        if (conHead) {
          gsap.to(splitWords(conHead), {
            y: '0%', duration: 0.75, ease: 'reveal', stagger: 0.06,
          })
        }
        // 2. pills pop in scattered
        gsap.to('.con-pill', {
          opacity: 1, y: 0, scale: 1,
          duration: 0.55, ease: 'back.out(1.6)',
          stagger: { each: 0.08, from: 'random' },
          delay: 0.2,
        })
        // 3. sub + buttons fade up
        gsap.to('#conSub', {
          opacity: 1, y: 0, duration: 0.6, ease: 'power3.out', delay: 0.5,
        })
        gsap.to('#conBtns', {
          opacity: 1, y: 0, duration: 0.6, ease: 'spring', delay: 0.65,
        })
      },
    })

    // Pills idle float — each at its own rhythm
    document.querySelectorAll<HTMLElement>('.con-pill').forEach((pill, i) => {
      const amp = 5 + (i % 3) * 3
      const dur = 2.6 + i * 0.4
      gsap.set(pill, { y: 10, scale: 0.9 }) // start state before reveal
      gsap.to(pill, {
        y: -amp, duration: dur, ease: 'sine.inOut',
        yoyo: true, repeat: -1, delay: i * 0.25,
      })
      gsap.to(pill, {
        rotation: (i % 2 === 0 ? 1 : -1) * 2.5,
        duration: dur * 1.4, ease: 'sine.inOut',
        yoyo: true, repeat: -1, delay: i * 0.3 + 0.15,
      })
    })

    // Magnetic on CTA buttons
    document.querySelectorAll<HTMLElement>('.con-btn-primary, .con-btn-ghost').forEach(btn => {
      btn.addEventListener('mousemove', (e: MouseEvent) => {
        const r  = btn.getBoundingClientRect()
        const dx = (e.clientX - r.left - r.width  / 2) * 0.25
        const dy = (e.clientY - r.top  - r.height / 2) * 0.25
        gsap.to(btn, { x: dx, y: dy, duration: 0.25, ease: 'power2.out' })
      })
      btn.addEventListener('mouseleave', () => {
        gsap.to(btn, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.5)' })
      })
    })

    gsap.to('#conFooter', {
      opacity: 1, y: 0, duration: 0.5, ease: 'power2.out',
      scrollTrigger: { trigger: '#conFooter', start: 'top 95%', toggleActions: 'play none none none' },
    })

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill())
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  useEffect(() => {
    const video = document.getElementById('hero-video') as HTMLVideoElement | null
    if (!video) return
    // Skip the ~29MB background video on mobile entirely — the gradient
    // overlay + hero content read fine without it, and it's not worth the
    // bandwidth on a small screen. Deferring the src assignment (instead of
    // setting it in JSX) also keeps the browser's preload scanner from
    // fetching it before anything else on the page.
    if (window.matchMedia('(max-width: 767px)').matches) return
    video.src = 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260328_083109_283f3553-e28f-428b-a723-d639c617eb2b.mp4'
    video.muted = true; video.defaultMuted = true; video.playsInline = true
    const FADE_DUR = 0.5
    let rafId = 0
    const tryPlay = () => { const p = video.play(); if (p && p.catch) p.catch(() => {}) }
    // only reveal the video while it's genuinely playing — never a frozen frame (so Safari
    // can't slap its play-button glyph on a paused frame)
    const tick = () => {
      const { currentTime, duration, paused } = video
      if (!paused && currentTime > 0) {
        video.style.transition = 'opacity 0.6s ease'
        let opacity = 1
        if (duration && !Number.isNaN(duration) && currentTime > duration - FADE_DUR) {
          opacity = Math.max(0, (duration - currentTime) / FADE_DUR)
        }
        video.style.opacity = String(opacity)
      }
      rafId = requestAnimationFrame(tick)
    }
    const onEnded = () => {
      video.style.opacity = '0'
      setTimeout(() => { video.currentTime = 0; tryPlay() }, 80)
    }

    video.addEventListener('ended', onEnded)
    video.addEventListener('canplay', tryPlay)
    video.addEventListener('loadeddata', tryPlay)
    tryPlay()
    rafId = requestAnimationFrame(tick)

    // Safari / Low Power Mode blocks autoplay — keep retrying on any interaction
    const onInteract = () => tryPlay()
    document.addEventListener('pointerdown', onInteract)
    document.addEventListener('touchstart', onInteract, { passive: true })
    document.addEventListener('scroll', onInteract, { passive: true })

    return () => {
      cancelAnimationFrame(rafId)
      video.removeEventListener('ended', onEnded)
      video.removeEventListener('canplay', tryPlay)
      video.removeEventListener('loadeddata', tryPlay)
      document.removeEventListener('pointerdown', onInteract)
      document.removeEventListener('touchstart', onInteract)
      document.removeEventListener('scroll', onInteract)
    }
  }, [])

  return (
    <>
      <BirdScene />

      {/* Scroll progress */}
      <div id="progress-bar"></div>

      <div className="cursor-glow" id="glow"></div>

      {/* HERO */}
      <section className="hero-section">
        {/* Video background */}
        <video
          id="hero-video"
          muted
          playsInline
          preload="none"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0, transition: 'opacity 0.05s linear', zIndex: 0 }}
        />
        {/* Gradient overlay top + bottom */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, var(--page-bg) 0%, transparent 30%, transparent 70%, var(--page-bg) 100%)', zIndex: 1, pointerEvents: 'none' }} />
        <div className="hero-card" style={{ position: 'relative', zIndex: 2 }}>
          <div className="hero-text">
            {/* Name + location — always visible at top */}
            <div className="hero-nameplate" id="hGreeting">
              <span className="hero-nameplate-name">Sanjana Gangishetty</span>
              <span className="hero-nameplate-dot">·</span>
              <span className="hero-nameplate-loc">Based in the US · CU Boulder MS &apos;25</span>
            </div>
            {/* Lead with the headline */}
            <h1 className="hero-headline" id="hHead">I don&apos;t wait until I know how. I build until I do.</h1>
            <p className="hero-body" id="hBody">I research how people think, then design around it. Especially when &ldquo;it&rdquo; is an AI that has to earn trust before anyone lets it do anything useful.</p>
            {/* Industry tags as pills */}
            <div className="hero-worked-in">
              <span className="worked-label">Previously in</span>
              <span className="worked-pill">AI</span>
              <span className="worked-pill">HR Tech</span>
              <span className="worked-pill">SaaS</span>
              <span className="worked-pill">EDU Tech</span>
              <span className="worked-pill">E-Commerce</span>
            </div>
            <div className="hero-cta-row" id="hCta">
              <a href="#work" className="hero-btn-primary">See my work <span className="arrow">→</span></a>
              <a href="/resume.pdf?v=0622" target="_blank" rel="noopener noreferrer" className="hero-btn-secondary">Resume ↗</a>
            </div>
            <p className="hero-proof">Recruiters spent 2 hrs just getting candidates into the system. I got it to 30 minutes.</p>
          </div>
          <div className="hero-photo" id="hPhoto">
            <img
              src="/images/sanjana-hero.png"
              alt="Portrait of Sanjana Gangishetty, Product Designer"
              onError={(e) => {
                const img = e.target as HTMLImageElement
                img.style.display = 'none'
                const next = img.nextElementSibling as HTMLElement
                if (next) next.style.display = 'flex'
              }}
            />
            <div className="photo-placeholder" style={{display:'none'}}>Sanjana Gangishetty</div>
          </div>
          <div className="scroll-cue" id="scrollCue">
            <span>Scroll</span>
            <div className="scroll-line"></div>
          </div>
        </div>
      </section>

      {/* WORK */}
      <section className="work-section" id="work">
        <div className="container">
          <div className="work-header" id="workHead">
            <div>
              <p className="work-eyebrow">Selected Work</p>
              <h2 className="work-title">Case Studies</h2>
            </div>
            <p className="work-sub">Three projects. Different problems, same question: why does this feel harder than it should?</p>
          </div>

          <div className="cards-wrap">

            {/* 01 FlairX */}
            <div className="project-card card-flairx">
              <div className="card-inner">
                <div className="card-num-bg">01</div>
                <div className="card-top-row">
                  <span className="card-index">01 / 03</span>
                  <span className="card-category">Product design · AI recruiting</span>
                </div>
                <div className="card-content-row">
                  <div className="card-left">
                    <h3 className="card-title">FlairX</h3>
                    <p className="card-hook">Recruiters spent 2 hrs just getting candidates into the system. I got it to 30 minutes.</p>
                    <div className="card-stats">
                      <div className="stat">
                        <span className="stat-val">2h → 30m</span>
                        <span className="stat-label">Workflow time</span>
                      </div>
                      <Link
                        href="/projects/flairx#impact"
                        className="stat"
                        title="Founder-reported, from pipeline data. The redesign owns the intake, not the hiring call. See the impact section for the full context."
                        style={{ textDecoration: 'none', color: 'inherit', cursor: 'pointer' }}
                      >
                        <span className="stat-val" data-count="130" data-prefix="+">+130</span>
                        <span className="stat-label" style={{ borderBottom: '1px dotted currentColor', width: 'fit-content' }}>Hires sourced</span>
                      </Link>
                      <div className="stat">
                        <span className="stat-val" data-count="3">3</span>
                        <span className="stat-label">Upload paths</span>
                      </div>
                    </div>
                    <Link href="/projects/flairx" className="card-btn">View Case Study <span className="btn-arrow">→</span></Link>
                  </div>
                  <div className="card-right">
                    <img src="/images/cover-flairx.jpg" alt="FlairX" style={{ width: '100%', height: '100%', objectFit: 'cover' }}/>
                  </div>
                </div>
              </div>
            </div>

            {/* 02 AI Trust Meter */}
            <div className="project-card card-ai-trust-meter">
              <div className="card-inner">
                <div className="card-num-bg">02</div>
                <div className="card-top-row">
                  <span className="card-index">02 / 03</span>
                  <span className="card-category">Self-initiated · live product</span>
                </div>
                <div className="card-content-row">
                  <div className="card-left">
                    <h3 className="card-title">The AI Trust Meter</h3>
                    <p className="card-hook">I designed, built, and shipped a system that shows how grounded an AI answer really is.</p>
                    <div className="card-stats">
                      <div className="stat">
                        <span className="stat-val">3</span>
                        <span className="stat-label">Confidence states</span>
                      </div>
                      <div className="stat">
                        <span className="stat-val">Solo</span>
                        <span className="stat-label">Design + build</span>
                      </div>
                      <div className="stat">
                        <span className="stat-val">Live</span>
                        <span className="stat-label">Next.js on Vercel</span>
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                      <Link href="/projects/ai-trust-meter" className="card-btn">View Case Study <span className="btn-arrow">→</span></Link>
                      <a href="https://ai-trust-meter.vercel.app" target="_blank" rel="noopener noreferrer" className="card-btn" style={{ background: 'transparent', border: '1.5px solid rgba(220,223,251,0.4)', color: '#DCDFFB' }}>Try the demo <span className="btn-arrow">↗</span></a>
                    </div>
                  </div>
                  <div className="card-right" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '10px' }}>
                    <div style={{ width: '100%', aspectRatio: '1.4', borderRadius: '10px', overflow: 'hidden', boxShadow: '0 12px 40px rgba(0,0,0,0.25)' }}>
                      <img src="/images/ai-trust-meter-og.svg" alt="AI Trust Meter" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'left top' }}/>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 03 Fireside */}
            <div className="project-card card-fireside">
              <div className="card-inner">
                <div className="card-num-bg">03</div>
                <div className="card-top-row">
                  <span className="card-index">03 / 03</span>
                  <span className="card-category">Interactive exhibit · CU Boulder</span>
                </div>
                <div className="card-content-row">
                  <div className="card-left">
                    <h3 className="card-title">Fireside</h3>
                    <p className="card-hook">A 3D projected table a 9-year-old understood in 15 seconds, with no instructions.</p>
                    <div className="card-stats">
                      <div className="stat">
                        <span className="stat-val">4</span>
                        <span className="stat-label">Public events</span>
                      </div>
                      <div className="stat">
                        <span className="stat-val">8–80</span>
                        <span className="stat-label">Ages reached</span>
                      </div>
                      <div className="stat">
                        <span className="stat-val">0</span>
                        <span className="stat-label">Instructions needed</span>
                      </div>
                    </div>
                    <Link href="/projects/fireside" className="card-btn">View Case Study <span className="btn-arrow">→</span></Link>
                  </div>
                  <div className="card-right">
                    <img src="/projects/fireside/exhibit-in-use.png" alt="Fireside" style={{ width: '100%', height: '100%', objectFit: 'cover' }}/>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* ── Beyond the case studies — quieter bento band ── */}
          <div className="beyond-band">
            <p className="beyond-eyebrow">Beyond the case studies</p>
            <div className="bento-grid">

              <div className="bento-tile bento-tile--stat">
                <span className="bento-stat-num">5</span>
                <span className="bento-stat-label">Case studies</span>
              </div>

              <div className="bento-tile bento-tile--text">
                <p className="bento-tag">Currently building</p>
                <p className="bento-text">Learning to build real things with Claude Code. A designer who can now ship her own ideas without waiting on anyone.</p>
              </div>

              <a className="bento-tile bento-tile--project" href="/projects/getup">
                <div className="bento-project-img">
                  <img
                    src="/images/getup.png"
                    alt="GetUp"
                    onError={(e) => {
                      const img = e.target as HTMLImageElement
                      img.style.display = 'none'
                      const next = img.nextElementSibling as HTMLElement
                      if (next) next.style.display = 'flex'
                    }}
                  />
                  <div className="img-placeholder" style={{display:'none'}}>GetUp</div>
                </div>
                <p className="bento-tag">Brand · GetUp</p>
              </a>

              <a className="bento-tile bento-tile--project" href="/projects/aura">
                <div className="bento-project-img">
                  <img
                    src="/images/aura.png"
                    alt="Aura"
                    onError={(e) => {
                      const img = e.target as HTMLImageElement
                      img.style.display = 'none'
                      const next = img.nextElementSibling as HTMLElement
                      if (next) next.style.display = 'flex'
                    }}
                  />
                  <div className="img-placeholder" style={{display:'none'}}>Aura</div>
                </div>
                <p className="bento-tag">Mobile app · Aura</p>
              </a>

              <div className="bento-tile bento-tile--text bento-tile--feature">
                <p className="bento-tag">Finalist · WIP × Lovable</p>
                <p className="bento-text">Built a working referral network for the Women in Product community in one 48-hour sprint. Team of 5, shipped and placed.</p>
                <a className="bento-cta" href="/projects/sparkconnect">View case study <span className="cta-arrow">→</span></a>
              </div>

              <div className="bento-tile bento-tile--text">
                <p className="bento-tag">On my mind</p>
                <p className="bento-text">Why seamlessness is so rare. Most products get close and then sort of&nbsp;&hellip; stop.</p>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* EXPLORATIONS */}
      <section className="explorations-section" id="explorations">
        <div className="container">
          <div className="work-header">
            <div>
              <p className="work-eyebrow">Explorations</p>
              <h2 className="work-title">Use Cases &amp; POVs</h2>
            </div>
            <p className="work-sub">Takes on AI products: how they feel to use, where they fall short. More on the way.</p>
          </div>

          <div className="exp-grid">

            {/* Exploration 01 — OpenRouter Model Match */}
            <a className="exp-card exp-card--linked" href="/explorations/openrouter">
              <div className="exp-card-top">
                <span className="exp-tag">OpenRouter</span>
                <span className="exp-num">01</span>
              </div>
              <h3 className="exp-title">500 models. I still couldn&apos;t pick one.</h3>
              <p className="exp-desc">OpenRouter gives developers access to 500+ AI models, but no guidance on which one to use. I designed a recommendation wizard that takes you from zero context to a working API call in four questions. Live prototype included.</p>
              <div className="exp-footer">
                <span className="exp-status exp-status--live">Live prototype →</span>
              </div>
            </a>

            {/* Exploration 02 — Alexa for Shopping Memory Layer */}
            <a className="exp-card exp-card--linked" href="https://alexa-for-shopping.vercel.app" target="_blank" rel="noopener noreferrer">
              <div className="exp-card-top">
                <span className="exp-tag">Amazon</span>
                <span className="exp-num">02</span>
              </div>
              <h3 className="exp-title">Alexa remembers your cart. Not you.</h3>
              <p className="exp-desc">Alexa for Shopping treats every session as a blank slate. I designed a memory layer that carries context across sessions: past purchases, preferences, family patterns. With it, Alexa can give recommendations that actually fit your life. Live prototype included.</p>
              <div className="exp-footer">
                <span className="exp-status exp-status--live">Live prototype →</span>
              </div>
            </a>

          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section className="about-section" id="about">
        <div className="container">
          <div className="about-card" id="aboutCard">
          <div className="about-grid">

            {/* LEFT: narrative copy + info grid */}
            <div className="about-left">
              <p className="about-eyebrow" id="aboutEye">About</p>
              <h2 className="about-headline" id="aboutH1">I started in rooms.</h2>
              <p className="about-headline-italic" id="aboutH2">Turns out software has the same problems.</p>

              <p className="about-body" id="aboutB1">Interior design trained me to obsess over how a space makes you feel before you can explain why. Same obsession, different material. The questions didn&apos;t change. Just the rooms got smaller and moved to screens.</p>

              <p className="about-body" id="aboutB2">Shipped AI tools, fintech products, e-commerce. I do my best work before the wireframe exists, in the messy middle where nobody&apos;s sure what they&apos;re actually solving yet. That&apos;s the part most designers skip. I don&apos;t.</p>

              {/* Info grid */}
              <div className="about-info-bar" id="aboutInfo">
                <div className="about-info-cell">
                  <p className="info-key">Based in</p>
                  <p className="info-val">United States</p>
                </div>
                <div className="about-info-cell">
                  <p className="info-key">Focus</p>
                  <p className="info-val">Product · AI · SaaS</p>
                </div>
                <div className="about-info-cell">
                  <p className="info-key">Education</p>
                  <p className="info-val">CU Boulder MS &apos;25</p>
                </div>
                <div className="about-info-cell">
                  <p className="info-key">Status</p>
                  <p className="info-val open">Open to full-time ✦</p>
                </div>
              </div>

              <div className="about-btns" id="aboutBtns">
                <Link href="/about" className="about-btn-dark">Full Story →</Link>
                <a href="/resume.pdf?v=0622" target="_blank" rel="noopener noreferrer" className="about-btn-outline">Resume ↗</a>
              </div>
            </div>

            {/* RIGHT: photo */}
            <div className="about-right" id="aboutRight">
              <div className="about-photo-wrap">
                <img
                  src="/images/sanjana.jpg"
                  alt="Sanjana Gangishetty at CU Boulder"
                  onError={(e) => {
                    const img = e.target as HTMLImageElement
                    img.style.display = 'none'
                    const next = img.nextElementSibling as HTMLElement
                    if (next) next.style.display = 'flex'
                  }}
                />
                <span className="about-photo-ph" style={{display:'none'}}>Sanjana Gangishetty</span>
              </div>
            </div>

          </div>
          </div>
        </div>
      </section>

      {/* CONNECT */}
      <section className="connect-section" id="connect">
        <div className="container">
          <div className="connect-inner" id="conInner">

            {/* floating pills */}
            <span className="con-pill con-pill-1">Open to work ✦</span>
            <span className="con-pill con-pill-2">Product Design</span>
            <span className="con-pill con-pill-3">Let&apos;s talk</span>
            <span className="con-pill con-pill-4">AI · SaaS</span>
            <span className="con-pill con-pill-5">Full-time roles</span>
            <span className="con-pill con-pill-6">Figma → Code</span>
            <span className="con-pill con-pill-7">Based in US</span>

            {/* headline */}
            <h2 className="connect-headline" id="conHead">
              Don&apos;t hesitate <br/><em>to reach out.</em>
            </h2>

            {/* sub */}
            <p className="connect-sub" id="conSub">Open to full-time product design. Happy to talk if you&apos;re building something and want a second brain.</p>

            {/* CTAs */}
            <div className="connect-btns" id="conBtns">
              <a href="mailto:gangishettysanjana084@gmail.com" className="con-btn-primary">Email me ↗</a>
              <a href="https://www.linkedin.com/in/sanjana-gangishetty" target="_blank" rel="noopener noreferrer" className="con-btn-ghost">LinkedIn ↗</a>
              <a href="/resume.pdf?v=0622" target="_blank" rel="noopener noreferrer" className="con-btn-ghost">Resume ↗</a>
            </div>

          </div>

          <div className="connect-footer-row" id="conFooter">
            <span>Sanjana Gangishetty © 2026</span>
            <span>Built with Figma, GSAP, and 47 Stack Overflow tabs</span>
          </div>
        </div>
      </section>
    </>
  )
}
