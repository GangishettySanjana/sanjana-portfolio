'use client'
import { useEffect } from 'react'
import Link from 'next/link'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { CustomEase } from 'gsap/CustomEase'
import './home.css'

export default function HomePage() {
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
       2. INTRO CURTAIN — mind map + gold sparkles
    ───────────────────────────────────────────── */
    function initIntro() {
      const GOLD    = '#C9A84C'
      const introEl = document.getElementById('intro')
      if (!introEl) return

      /* Skip intro when returning from a project page */
      if (sessionStorage.getItem('skipIntro')) {
        sessionStorage.removeItem('skipIntro')
        introEl.style.display = 'none'
        return
      }

      /* --- Split name into chars --- */
      const nameEl = document.getElementById('intro-name') as HTMLElement
      if (!nameEl) return
      const nameChars = splitChars(nameEl, 'ichar')
      gsap.set(nameChars, { y: '110%', opacity: 0 })

      /* --- Labels — elliptical orbit positioning --- */
      const labels = [1,2,3,4,5,6,7,8,9,10,11]
        .map(n => document.getElementById(`lbl-${n}`))
        .filter(Boolean) as HTMLElement[]

      const _tilts    = [-6, 4, -3, 7, -5, 3, -7, 4, -4, 5, -3]
      const _startDeg = -100
      const _step     = 360 / 11

      function positionLabelsOnOrbit() {
        const W  = window.innerWidth
        const H  = window.innerHeight
        const isSmall  = W <= 480
        const isMobile = W <= 768
        const aX = isSmall  ? Math.min(W * 0.40, 145) :
                   isMobile ? Math.min(W * 0.32, 230) :
                              Math.min(W * 0.37, 535)
        const aY = isSmall  ? Math.min(H * 0.26, 185) :
                   isMobile ? Math.min(H * 0.17, 148) :
                              Math.min(H * 0.28, 300)
        labels.forEach((lbl, i) => {
          const ang = (_startDeg + i * _step) * Math.PI / 180
          gsap.set(lbl, {
            left:     W / 2 + aX * Math.cos(ang),
            top:      H / 2 + aY * Math.sin(ang),
            xPercent: -50,
            yPercent: -50,
            rotation: _tilts[i],
          })
        })
      }

      const _isMobileDevice = window.innerWidth <= 768

      if (!_isMobileDevice) {
        positionLabelsOnOrbit()
        window.addEventListener('resize', positionLabelsOnOrbit)
        gsap.set(labels, { opacity: 0, y: 12, scale: 0.88 })
        labels.forEach(lbl => {
          lbl.addEventListener('mouseenter', () =>
            gsap.to(lbl, { scale: 1.08, duration: 0.18, ease: 'power2.out', overwrite: 'auto' }))
          lbl.addEventListener('mouseleave', () =>
            gsap.to(lbl, { scale: 1,    duration: 0.18, ease: 'power2.out', overwrite: 'auto' }))
        })
      } else {
        // Keep labels hidden on mobile — just name + sparkles
        gsap.set(labels, { opacity: 0 })
      }

      /* --- Gold star SVG --- */
      function goldStar(size: number) {
        const h = size / 2
        return `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg"><path d="M${h} 0 C${h-1} ${h-1} ${h-1} ${h-1} ${size} ${h} C${h-1} ${h+1} ${h-1} ${h+1} ${h} ${size} C${h+1} ${h+1} ${h+1} ${h+1} 0 ${h} C${h+1} ${h-1} ${h+1} ${h-1} ${h} 0Z" fill="${GOLD}"/></svg>`
      }

      /* --- Build sparkles --- */
      const sparkPos = [
        { x:-260,y:-70 },{ x:-190,y:50  },{ x:-280,y:10  },{ x:-220,y:-30 },
        { x: 265,y:-70 },{ x: 195,y:50  },{ x: 285,y:10  },{ x: 225,y:-30 },
        { x: -90,y:-96 },{ x:  90,y:-96 },{ x:-110,y: 80 },{ x: 110,y: 80 },
        { x:   0,y:-110},{ x:   0,y:100 },{ x:-150,y:-85 },{ x: 150,y:-85 },
      ]
      const sparkSizes = [12,8,16,7,11,14,8,12,9,16,7,10,13,8,9,14]
      // Scale sparkle spread so they stay visible on smaller screens
      const _sw = window.innerWidth
      const sparkScale = _sw <= 480 ? 0.38 : _sw <= 768 ? 0.62 : 1.0
      const sparkEls = sparkPos.map((p, i) => {
        const el = document.createElement('div')
        el.className = 'sparkle'
        el.innerHTML = goldStar(sparkSizes[i])
        const sx = Math.round(p.x * sparkScale)
        const sy = Math.round(p.y * sparkScale)
        el.style.cssText = `left:calc(50% + ${sx}px);top:calc(50% + ${sy}px);margin-left:-${sparkSizes[i]/2}px;margin-top:-${sparkSizes[i]/2}px;`
        introEl.appendChild(el)
        return el
      })

      /* --- Sub-label --- */
      gsap.set('#intro-sub', { opacity: 0, y: 8 })

      /* --- Total duration for progress bar --- */
      const TOTAL_DUR = 8.0
      gsap.to('#intro-progress-fill', { width: '100%', duration: TOTAL_DUR, ease: 'none' })

      /* --- Countdown timer --- */
      const countdownEl = document.getElementById('intro-countdown')
      let remaining = Math.ceil(TOTAL_DUR)
      if (countdownEl) countdownEl.textContent = remaining + 's'
      const countInterval = setInterval(() => {
        remaining = Math.max(0, remaining - 1)
        if (countdownEl) countdownEl.textContent = remaining > 0 ? remaining + 's' : ''
      }, 1000)

      /* --- Skip button --- */
      const skipBtn  = document.getElementById('intro-skip')
      const skipWrap = document.getElementById('intro-skip-wrap')
      let skipped = false
      function doSkip() {
        if (skipped) return
        skipped = true
        clearInterval(countInterval)
        gsap.killTweensOf('#intro-progress-fill')
        gsap.to('#intro-progress-fill', { width: '100%', duration: 0.3, ease: 'power2.out' })
        tl.progress(1).kill()
        labels.forEach(l => gsap.killTweensOf(l))
        introEl!.removeEventListener('mousemove', onMouseMove)
        runHero()
        gsap.to(introEl!, { yPercent: -100, duration: 0.55, ease: 'power4.inOut',
          onComplete: () => { introEl!.style.display = 'none' }
        })
      }
      if (skipBtn) skipBtn.addEventListener('click', doSkip)

      /* --- Sparkle mouse parallax --- */
      function onMouseMove(e: MouseEvent) {
        const cx = window.innerWidth  / 2
        const cy = window.innerHeight / 2
        const dx = (e.clientX - cx) / cx
        const dy = (e.clientY - cy) / cy
        sparkEls.forEach((el, i) => {
          const depth = 0.2 + (i % 5) * 0.12
          gsap.to(el, { x: dx * 28 * depth, y: dy * 20 * depth, duration: 0.9, ease: 'power2.out', overwrite: 'auto' })
        })
      }
      introEl.addEventListener('mousemove', onMouseMove)

      /* --- Label idle float (starts after labels appear) --- */
      function startLabelFloat() {
        labels.forEach((lbl, i) => {
          const amp = 4 + (i % 3) * 2
          const dur = 2.4 + i * 0.28
          gsap.to(lbl, { y: `-=${amp}`, duration: dur, ease: 'sine.inOut', yoyo: true, repeat: -1, delay: i * 0.15 })
          gsap.to(lbl, { rotation: (i % 2 === 0 ? 1.5 : -1.5), duration: dur * 1.4, ease: 'sine.inOut', yoyo: true, repeat: -1, delay: i * 0.2 + 0.1 })
        })
      }

      /* --- Main timeline --- */
      const tl = gsap.timeline()

      if (skipWrap) tl.to(skipWrap, { opacity: 1, duration: 0.4, ease: 'power2.out' }, 0.5)
      tl.call(() => { if (skipBtn) skipBtn.classList.add('skip-pulse') }, undefined, 0.9)

      // 1. Name chars rise up
      tl.to(nameChars, { y: '0%', opacity: 1, duration: 0.7, ease: 'power4.out', stagger: 0.032, delay: 0.2 })

      // 1b. Sub-label
      .to('#intro-sub', { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }, '-=0.1')

      // 2. Gold sparkles burst in
      .to(sparkEls, {
        opacity: 1,
        scale: gsap.utils.wrap([1, 0.75, 1.25, 0.85, 1.1, 0.9, 1.2]),
        rotation: gsap.utils.wrap([0, 45, 22, -22, 15, -15, 30, -45]),
        duration: 0.45, ease: 'back.out(2.5)',
        stagger: { amount: 0.35, from: 'random' },
      }, '-=0.1')

      // 3. Labels: anticipation dip THEN bounce up (desktop only)
      if (!_isMobileDevice) {
        tl.to(labels, { y: '+=6', scale: 0.94, duration: 0.18, ease: 'power2.in', stagger: 0.1 })
          .to(labels, { opacity: 1, y: 0, scale: 1, duration: 0.52, ease: 'back.out(2.2)', stagger: 0.12, onComplete: startLabelFloat }, '-=0.4')
      }
      tl

      // 4. Sparkles twinkle pulse
      .to(sparkEls, {
        scale: gsap.utils.wrap([1.4, 0.65, 1.55, 0.8, 1.3, 0.7, 1.4]),
        rotation: '+=30',
        duration: 0.45, ease: 'sine.inOut',
        stagger: { amount: 0.3, from: 'random' },
        yoyo: true, repeat: 1,
      })

      // 5. Hold
      .to({}, { duration: 0.55 })

      // 6. Everything exits
      .add(() => {
        clearInterval(countInterval)
        labels.forEach(l => gsap.killTweensOf(l))
        gsap.to('#intro-sub', { opacity: 0, y: -6, duration: 0.25, ease: 'power2.in' })
        gsap.to(labels, { opacity: 0, y: -10, scale: 0.88, duration: 0.32, ease: 'power2.in', stagger: 0.05 })
        const _exitScale = window.innerWidth <= 480 ? 0.4 : window.innerWidth <= 768 ? 0.65 : 1.0
        gsap.to(sparkEls, {
          opacity: 0, scale: 0,
          x: gsap.utils.wrap([-80,70,-60,90,-70,60,-50,80,-65,75,-55,85,0,0,-70,70].map(v => v * _exitScale)),
          y: gsap.utils.wrap([-70,-80,-55,40,55,-75,75,-45,65,55,-85,70,-100,110,-60,90].map(v => v * _exitScale)),
          duration: 0.5, ease: 'power2.in',
          stagger: { amount: 0.25, from: 'random' },
        })
        introEl.removeEventListener('mousemove', onMouseMove)
      })
      .to({}, { duration: 0.35 })

      // 7. Name + sub exit upward
      .to(nameChars, { y: '-110%', opacity: 0, duration: 0.48, ease: 'power3.in', stagger: 0.018 })

      // 8. Curtain slides up — fire hero + follow-through
      .to(introEl, {
        yPercent: -100, duration: 1.0, ease: 'power4.inOut',
        onStart: () => {
          runHero()
          gsap.fromTo('.hero-card', { scale: 0.97 }, { scale: 1, duration: 1.1, ease: 'power3.out', delay: 0.2 })
        },
      }, '-=0.15')

      .call(() => { introEl.style.display = 'none' })
    }

    initIntro()

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

      // Set initial states on inner elements
      gsap.set([title, subtitle, desc, btn, topRow], { opacity: 0, y: 28 })
      gsap.set(stats, { opacity: 0, y: 20 })
      if (image) gsap.set(image, { opacity: 0, x: 30 })

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
       10. RECOGNITION
    ───────────────────────────────────────────── */
    const recST = { trigger: '#recCard', start: 'top 88%', toggleActions: 'play none none none' }

    gsap.to('#recEye',  { opacity: 1, y: 0, duration: 0.55, ease: 'power3.out',
      scrollTrigger: { trigger: '#recEye', start: 'top 92%', toggleActions: 'play none none none' } })

    gsap.to('#recCard', { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
      scrollTrigger: recST })

    // Title word reveal inside recognition card
    ScrollTrigger.create({
      trigger: '#recCard',
      start: 'top 84%',
      toggleActions: 'play none none none',
      onEnter() {
        const titleEl = document.querySelector<HTMLElement>('.recognition-title')
        if (!titleEl) return
        const recWords = splitWords(titleEl)
        gsap.to(recWords, { y: '0%', duration: 0.6, ease: 'power4.out', stagger: 0.04 })
      },
    })

    gsap.to('.recognition-tag', {
      opacity: 1, y: 0, duration: 0.45, ease: 'spring', stagger: 0.09,
      scrollTrigger: { ...recST, start: 'top 82%' },
    })
    gsap.to('.recognition-btn', {
      opacity: 1, y: 0, duration: 0.45, ease: 'spring', stagger: 0.1,
      scrollTrigger: { ...recST, start: 'top 80%' },
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

  return (
    <>
      {/* Intro curtain */}
      <div id="intro">
        {/* Center name */}
        <div id="intro-name">Sanjana Gangishetty</div>
        {/* Sub-label */}
        <p id="intro-sub">Product Designer<span>·</span>CU Boulder &apos;25<span>·</span>Looking for full time</p>

        {/* Floating labels — JS positions these on an ellipse around the name */}
        <div className="intro-label" id="lbl-1">Thinks about your business<span className="lbl-tip">Stakeholder-first design</span></div>
        <div className="intro-label" id="lbl-2">Pre-wireframe thinker<span className="lbl-tip">Strategy before pixels</span></div>
        <div className="intro-label" id="lbl-3">Can vibecode<span className="lbl-tip">React · Next.js · Figma → Code</span></div>
        <div className="intro-label" id="lbl-4">Figma<span className="lbl-tip">Variables, components, dev mode</span></div>
        <div className="intro-label" id="lbl-5">Loves to cook<span className="lbl-tip">Has strong opinions on pasta</span></div>
        <div className="intro-label" id="lbl-6">Comfortable in the messy middle<span className="lbl-tip">Discovery phase is my zone</span></div>
        <div className="intro-label" id="lbl-7">Can make amazing Coffee<span className="lbl-tip">V60, pour-over, oat milk</span></div>
        <div className="intro-label" id="lbl-8">Builds with AI<span className="lbl-tip">Shipped 3 products in Lovable</span></div>
        <div className="intro-label" id="lbl-9">Sweats the details<span className="lbl-tip">Spacing, hierarchy, micro-copy</span></div>
        <div className="intro-label" id="lbl-10">Asks the boring questions<span className="lbl-tip">Why? For whom? What&apos;s success?</span></div>
        <div className="intro-label" id="lbl-11">Runs on coffee<span className="lbl-tip">Morning ritual, non-negotiable</span></div>

        {/* Progress bar */}
        <div id="intro-progress"><div id="intro-progress-fill"></div></div>

        {/* Skip + countdown */}
        <div id="intro-skip-wrap">
          <span id="intro-countdown"></span>
          <button id="intro-skip">Skip intro</button>
        </div>
      </div>

      {/* Scroll progress */}
      <div id="progress-bar"></div>

      <div className="cursor-glow" id="glow"></div>

      {/* HERO */}
      <section className="hero-section">
        <div className="hero-card">
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
              <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="hero-btn-secondary">Resume ↗</a>
            </div>
          </div>
          <div className="hero-photo" id="hPhoto">
            <img
              src="/images/sanjana-hero.png"
              alt="Sanjana Gangishetty"
              onError={(e) => {
                const img = e.target as HTMLImageElement
                img.style.display = 'none'
                const next = img.nextElementSibling as HTMLElement
                if (next) next.style.display = 'flex'
              }}
            />
            <div className="photo-placeholder" style={{display:'none'}}>Your photo<br/>343 × 359</div>
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
            <p className="work-sub">Four projects. Different problems, same question: why does this feel harder than it should?</p>
          </div>

          <div className="cards-wrap">

            {/* 01 FlairX */}
            <div className="project-card card-flairx">
              <div className="card-inner">
                <div className="card-num-bg">01</div>
                <div className="card-top-row">
                  <span className="card-index">01 / 04</span>
                  <span className="card-category">Product Design · AI Recruiting</span>
                </div>
                <div className="card-content-row">
                  <div className="card-left">
                    <h3 className="card-title">FlairX</h3>
                    <p className="card-subtitle">Redesigning the Recruiter Workflow</p>
                    <p className="card-desc">Designed the upload and review experience so recruiters could filter hundreds of applicants down to the ones worth an interview, without losing their minds.</p>
                    <div className="card-stats">
                      <div className="stat">
                        <span className="stat-val">4h→30m</span>
                        <span className="stat-label">Workflow time</span>
                      </div>
                      <div className="stat">
                        <span className="stat-val" data-count="130" data-prefix="+">+130</span>
                        <span className="stat-label">Hires attributed</span>
                      </div>
                      <div className="stat">
                        <span className="stat-val" data-count="3">3</span>
                        <span className="stat-label">Upload modes</span>
                      </div>
                    </div>
                    <Link href="/projects/flairx" className="card-btn">View Case Study <span className="btn-arrow">→</span></Link>
                  </div>
                  <div className="card-right">
                    <img src="https://www.figma.com/api/mcp/asset/8a7e1e23-785c-4b7e-a7ec-e2be0900c06e" alt="FlairX"/>
                  </div>
                </div>
              </div>
            </div>

            {/* 02 Fireside */}
            <div className="project-card card-fireside">
              <div className="card-inner">
                <div className="card-num-bg">02</div>
                <div className="card-top-row">
                  <span className="card-index">02 / 04</span>
                  <span className="card-category">Web Design · Education</span>
                </div>
                <div className="card-content-row">
                  <div className="card-left">
                    <h3 className="card-title">Fireside Interactive</h3>
                    <p className="card-subtitle">Wildfire Education Platform</p>
                    <p className="card-desc">Made complex wildfire data legible. Charts and visuals over walls of text, because nobody reads walls of text, especially not in an emergency.</p>
                    <div className="card-stats">
                      <div className="stat">
                        <span className="stat-val">EDU</span>
                        <span className="stat-label">Tech Platform</span>
                      </div>
                      <div className="stat">
                        <span className="stat-val">Data</span>
                        <span className="stat-label">Visualization</span>
                      </div>
                      <div className="stat">
                        <span className="stat-val">UX</span>
                        <span className="stat-label">Research Lead</span>
                      </div>
                    </div>
                    <Link href="/projects/fireside" className="card-btn">View Case Study <span className="btn-arrow">→</span></Link>
                  </div>
                  <div className="card-right">
                    <img src="https://www.figma.com/api/mcp/asset/57a65d9e-f855-41f9-8995-b1df203fecb7" alt="Fireside"/>
                  </div>
                </div>
              </div>
            </div>

            {/* 03 GetUp */}
            <div className="project-card card-getup">
              <div className="card-inner">
                <div className="card-num-bg">03</div>
                <div className="card-top-row">
                  <span className="card-index">03 / 04</span>
                  <span className="card-category">Brand Design · E-Commerce</span>
                </div>
                <div className="card-content-row">
                  <div className="card-left">
                    <h3 className="card-title">GetUp Nutrition</h3>
                    <p className="card-subtitle">Pre-Launch Campaign &amp; Pop-Up</p>
                    <p className="card-desc">Three weeks. No copywriter, no brand guidelines, one celebrity backer. I derived the voice, wrote the copy, and designed the pre-order pop-up from zero.</p>
                    <div className="card-stats">
                      <div className="stat">
                        <span className="stat-val">3wks</span>
                        <span className="stat-label">Timeline</span>
                      </div>
                      <div className="stat">
                        <span className="stat-val">Solo</span>
                        <span className="stat-label">Designer + Copywriter</span>
                      </div>
                      <div className="stat">
                        <span className="stat-val">0→1</span>
                        <span className="stat-label">Brand identity</span>
                      </div>
                    </div>
                    <Link href="/projects/getup" className="card-btn">View Case Study <span className="btn-arrow">→</span></Link>
                  </div>
                  <div className="card-right">
                    <img
                      src="/images/getup.png"
                      alt="GetUp"
                      style={{width:'100%',height:'100%',objectFit:'cover'}}
                      onError={(e) => {
                        const img = e.target as HTMLImageElement
                        img.style.display = 'none'
                        const next = img.nextElementSibling as HTMLElement
                        if (next) next.style.display = 'flex'
                      }}
                    />
                    <div className="img-placeholder" style={{display:'none'}}>GetUp project image</div>
                  </div>
                </div>
              </div>
            </div>

            {/* 04 Aura */}
            <div className="project-card card-aura">
              <div className="card-inner">
                <div className="card-num-bg">04</div>
                <div className="card-top-row">
                  <span className="card-index">04 / 04</span>
                  <span className="card-category">Mobile App · E-commerce</span>
                </div>
                <div className="card-content-row">
                  <div className="card-left">
                    <h3 className="card-title">Aura</h3>
                    <p className="card-subtitle">Gifting Experience Platform</p>
                    <p className="card-desc">A personalized floral and gifting app that cuts through decision fatigue and long queues. Designed end-to-end for a Hyderabad florist as part of the Google UX Certificate.</p>
                    <div className="card-stats">
                      <div className="stat">
                        <span className="stat-val">Mobile</span>
                        <span className="stat-label">Platform</span>
                      </div>
                      <div className="stat">
                        <span className="stat-val">3×</span>
                        <span className="stat-label">Usability rounds</span>
                      </div>
                      <div className="stat">
                        <span className="stat-val">Google</span>
                        <span className="stat-label">UX Certificate</span>
                      </div>
                    </div>
                    <Link href="/projects/aura" className="card-btn">View Case Study <span className="btn-arrow">→</span></Link>
                  </div>
                  <div className="card-right">
                    <img
                      src="/images/aura.png"
                      alt="Aura"
                      style={{width:'100%',height:'100%',objectFit:'cover'}}
                      onError={(e) => {
                        const img = e.target as HTMLImageElement
                        img.style.display = 'none'
                        const next = img.nextElementSibling as HTMLElement
                        if (next) next.style.display = 'flex'
                      }}
                    />
                    <div className="img-placeholder" style={{display:'none'}}>Aura app screenshots</div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* RECOGNITION */}
      <section className="recognition-section">
        <div className="container">
          <p className="recognition-eyebrow" id="recEye">Recognition</p>
          <div className="recognition-card" id="recCard">
            <div className="rec-left">
              <h2 className="recognition-title">Finalist: Women in Product × Lovable Hackathon 2026</h2>
              <p className="recognition-desc">Built a working referral network for the WIP community in one sprint, designed to make cold referral requests feel less awkward and more human. Team of 5. Shipped, presented, placed.</p>
              <div className="recognition-tags">
                <span className="recognition-tag">Lovable</span>
                <span className="recognition-tag">AI-Assisted</span>
                <span className="recognition-tag">48 hrs</span>
                <span className="recognition-tag">Team of 5</span>
              </div>
            </div>
            <div className="rec-right">
              <a href="https://id-preview--e94c1759-cb49-4560-bae0-cee815c16b13.lovable.app" target="_blank" rel="noopener noreferrer" className="recognition-btn">View Project Deck</a>
              <a href="https://wip-spark-connect.lovable.app" target="_blank" rel="noopener noreferrer" className="recognition-btn">View Website</a>
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
              <p className="exp-desc">Alexa for Shopping treats every session as a blank slate. I designed a memory layer that carries context across sessions — past purchases, preferences, family patterns — so Alexa can give recommendations that actually fit your life. Live prototype included.</p>
              <div className="exp-footer">
                <span className="exp-status exp-status--live">Live prototype →</span>
              </div>
            </a>

            {/* More coming */}
            <div className="exp-card exp-card--more">
              <p className="exp-more-text">More concepts in the works — currently exploring, currently building.</p>
            </div>

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

              <p className="about-body" id="aboutB1">Interior design trained me to obsess over how a space makes you feel before you can explain why. Same obsession, different material. The questions didn&apos;t change — just the rooms got smaller and moved to screens.</p>

              <p className="about-body" id="aboutB2">Shipped AI tools, fintech products, e-commerce. I do my best work before the wireframe exists — in the messy middle where nobody&apos;s sure what they&apos;re actually solving yet. That&apos;s the part most designers skip. I don&apos;t.</p>

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
                <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="about-btn-outline">Resume ↗</a>
              </div>
            </div>

            {/* RIGHT: photo */}
            <div className="about-right" id="aboutRight">
              <div className="about-photo-wrap">
                <img
                  src="/images/sanjana.jpg"
                  alt="Sanjana at CU Boulder"
                  onError={(e) => {
                    const img = e.target as HTMLImageElement
                    img.style.display = 'none'
                    const next = img.nextElementSibling as HTMLElement
                    if (next) next.style.display = 'flex'
                  }}
                />
                <span className="about-photo-ph" style={{display:'none'}}>Your photo here</span>
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
              Don&apos;t hesitate<br/><em>to reach out.</em>
            </h2>

            {/* sub */}
            <p className="connect-sub" id="conSub">Open to full-time product design. Happy to talk if you&apos;re building something and want a second brain.</p>

            {/* CTAs */}
            <div className="connect-btns" id="conBtns">
              <a href="mailto:gangishettysanjana084@gmail.com" className="con-btn-primary">Email me ↗</a>
              <a href="https://www.linkedin.com/in/sanjana-gangishetty" target="_blank" rel="noopener noreferrer" className="con-btn-ghost">LinkedIn ↗</a>
              <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="con-btn-ghost">Resume ↗</a>
            </div>

          </div>

          <div className="connect-footer-row" id="conFooter">
            <span>Sanjana Gangishetty © 2025</span>
            <span>Built with Figma, GSAP, and 47 Stack Overflow tabs</span>
          </div>
        </div>
      </section>
    </>
  )
}
