'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './openrouter.css'

export default function OpenRouterPage() {
  useEffect(() => {
    // Tabler icons
    const iconLink = document.createElement('link')
    iconLink.rel = 'stylesheet'
    iconLink.href = 'https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@3.31.0/dist/tabler-icons.min.css'
    document.head.appendChild(iconLink)

    // ── State ──────────────────────────────────────────────
    const state: { picker: Record<string, string | null>; codeLang: string } = {
      picker: { useCase: null, quality: 'balanced', volume: 'under-10k', promptLength: null },
      codeLang: 'node',
    }

    const QUESTIONS = [
      {
        id: 'useCase', num: '01', title: 'What are you building?',
        sub: 'This shapes how much we weight reliability vs. cost.',
        options: [
          { value: 'product',   icon: '<i class="ti ti-layout-grid"></i>',  label: 'A product feature',        desc: 'Customer support, search, content generation', chip: 'Product feature' },
          { value: 'prototype', icon: '<i class="ti ti-flask"></i>',         label: 'A prototype or experiment', desc: "Exploring what's possible",                    chip: 'Prototyping' },
          { value: 'internal',  icon: '<i class="ti ti-building"></i>',      label: 'Internal tooling',          desc: 'Dashboards, automation, data pipelines',       chip: 'Internal tooling' },
        ],
      },
      {
        id: 'quality', num: '02', title: 'Quality or speed?',
        sub: 'Most use cases live somewhere in the middle.',
        options: [
          { value: 'speed',    icon: '<i class="ti ti-bolt"></i>',           label: 'Speed first',  desc: 'Sub-second responses, good enough is fine', chip: 'Speed first' },
          { value: 'quality',  icon: '<i class="ti ti-focus-2"></i>',        label: 'Quality first', desc: 'Accuracy over speed, complex reasoning',    chip: 'Quality first' },
          { value: 'balanced', icon: '<i class="ti ti-scale"></i>',          label: 'Balanced',      desc: 'Good quality, reasonable latency',          chip: 'Balanced' },
        ],
      },
      {
        id: 'volume', num: '03', title: 'Monthly request volume?',
        sub: 'Volume decides whether free tier is enough or cost-per-token dominates.',
        options: [
          { value: 'under-10k', icon: '<i class="ti ti-seedling"></i>',      label: 'Under 10,000', desc: 'Prototyping, free tier probably covers you', chip: 'Under 10K/mo' },
          { value: '10k-500k',  icon: '<i class="ti ti-trending-up"></i>',   label: '10K – 500K',   desc: 'Production app, cost efficiency matters',    chip: '10K–500K/mo' },
          { value: '500k+',     icon: '<i class="ti ti-server"></i>',        label: '500K+',         desc: 'High volume, cost per token is everything', chip: '500K+/mo' },
        ],
      },
      {
        id: 'promptLength', num: '04', title: 'How long are your prompts?',
        sub: 'Longer prompts need bigger context windows and cost more per call.',
        options: [
          { value: 'short',  icon: '<i class="ti ti-message"></i>',          label: 'Short (under 500 tokens)',  desc: 'Chat messages, classifications',       chip: 'Short prompts' },
          { value: 'medium', icon: '<i class="ti ti-file-text"></i>',        label: 'Medium (500-2000 tokens)',  desc: 'Documents, summaries, short analysis', chip: 'Medium prompts' },
          { value: 'long',   icon: '<i class="ti ti-books"></i>',            label: 'Long (over 2000 tokens)',   desc: 'Codebases, research papers, long docs', chip: 'Long prompts' },
        ],
      },
    ]

    const CODE: Record<string, string> = {
      node: `// Model Match: generated config
// Use case: customer support bot
// Model: Claude Haiku 4.5 (best match for your answers)

import OpenAI from "openai";

const client = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
});

const MODEL = "anthropic/claude-haiku-4-5-20251001";
const FALLBACK_MODELS = [
  "openai/gpt-4o-mini",
  "meta-llama/llama-3.3-70b-instruct"
];

async function supportBot(userMessage, history) {
  const response = await client.chat.completions.create({
    model: MODEL,
    messages: [
      { role: "system", content: "You are a helpful support agent. Be concise and friendly." },
      ...history,
      { role: "user", content: userMessage }
    ],
    max_tokens: 500,
    temperature: 0.3,
    route: { fallback: FALLBACK_MODELS }
  });
  return response.choices[0].message.content;
}`,
      python: `# OpenRouter: Model Match generated config
import os
from openai import OpenAI

client = OpenAI(
    base_url="https://openrouter.ai/api/v1",
    api_key=os.environ.get("OPENROUTER_API_KEY"),
)

MODEL = "anthropic/claude-haiku-4-5-20251001"
FALLBACK_MODELS = ["openai/gpt-4o-mini", "meta-llama/llama-3.3-70b-instruct"]

def support_bot(user_message, history):
    response = client.chat.completions.create(
        model=MODEL,
        messages=[
            { "role": "system", "content": "You are a helpful support agent." },
            *history,
            {"role": "user", "content": user_message},
        ],
        max_tokens=500, temperature=0.3,
        extra_body={"route": {"fallback": FALLBACK_MODELS}},
    )
    return response.choices[0].message.content`,
      curl: `curl https://openrouter.ai/api/v1/chat/completions \\
  -H "Authorization: Bearer $OPENROUTER_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "anthropic/claude-haiku-4-5-20251001",
    "messages": [
      { "role": "system", "content": "You are a helpful support agent." },
      { "role": "user", "content": "How do I reset my password?" }
    ],
    "max_tokens": 500, "temperature": 0.3,
    "route": { "fallback": ["openai/gpt-4o-mini", "meta-llama/llama-3.3-70b-instruct"] }
  }'`,
    }

    function qs(sel: string, ctx?: Element | Document): Element | null {
      return (ctx || document).querySelector(sel)
    }
    function qsAll(sel: string, ctx?: Element | Document): Element[] {
      return Array.from((ctx || document).querySelectorAll(sel))
    }
    function esc(s: string) {
      return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
    }
    function highlight(code: string) {
      const re = /("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`)|(\/\/[^\n]*|#[^\n]*)|\b(const|let|var|async|await|function|return|import|from|new|export|def|if|else|for|in|os|None|True|False)\b|\b(\d+(?:\.\d+)?)\b/g
      let out = '', last = 0, m: RegExpExecArray | null
      while ((m = re.exec(code))) {
        out += esc(code.slice(last, m.index))
        if      (m[1]) out += `<span class="tok-string">${esc(m[1])}</span>`
        else if (m[2]) out += `<span class="tok-comment">${esc(m[2])}</span>`
        else if (m[3]) out += `<span class="tok-keyword">${esc(m[3])}</span>`
        else if (m[4]) out += `<span class="tok-number">${esc(m[4])}</span>`
        last = m.index + m[0].length
      }
      out += esc(code.slice(last))
      return out
    }
    function optionByValue(qid: string, value: string) {
      const q = QUESTIONS.find(x => x.id === qid)
      return q ? q.options.find(o => o.value === value) : null
    }

    function switchTab(name: string) {
      qsAll('.ptab').forEach(t => (t as HTMLElement).classList.toggle('active', (t as HTMLElement).dataset.tab === name))
      qsAll('.pview').forEach(v => v.classList.toggle('active', v.id === `pview-${name}`))
    }

    function renderPicker() {
      const container = qs('#picker-qs')
      if (!container) return
      container.innerHTML = QUESTIONS.map(q => {
        const opts = q.options.map(o => {
          const sel = state.picker[q.id] === o.value
          return `<button class="popt${sel ? ' selected' : ''}" data-question="${q.id}" data-value="${esc(o.value)}">
            <span class="popt-icon">${o.icon}</span>
            <span class="popt-body"><span class="popt-label">${esc(o.label)}</span><span class="popt-desc">${esc(o.desc)}</span></span>
            <span class="popt-check"></span>
          </button>`
        }).join('')
        return `<div class="pq-card">
          <div class="pq-num">${esc(q.num)}</div>
          <div class="pq-title">${esc(q.title)}</div>
          <div class="pq-sub">${esc(q.sub)}</div>
          <div class="pq-opts">${opts}</div>
        </div>`
      }).join('')
      qsAll('.popt', container).forEach(btn => {
        btn.addEventListener('click', () => {
          state.picker[(btn as HTMLElement).dataset.question!] = (btn as HTMLElement).dataset.value!
          refreshPicker()
        })
      })
    }

    function refreshPicker() {
      qsAll('.popt').forEach(btn => {
        btn.classList.toggle('selected', state.picker[(btn as HTMLElement).dataset.question!] === (btn as HTMLElement).dataset.value!)
      })
      renderRecap('#recap-chips')
      renderRecap('#rec-context')
      updateStepper()
      updateContinue()
    }

    function renderRecap(selector: string) {
      const el = qs(selector)
      if (!el) return
      el.innerHTML = QUESTIONS.filter(q => state.picker[q.id]).map(q => {
        const o = optionByValue(q.id, state.picker[q.id]!)
        if (!o) return ''
        return `<span class="recap-chip">${o.icon} ${esc(o.chip)}</span>`
      }).join('')
    }

    function updateStepper() {
      let firstUnanswered: string | null = null
      QUESTIONS.forEach(q => { if (!state.picker[q.id] && !firstUnanswered) firstUnanswered = q.id })
      qsAll('.step').forEach(step => {
        const id = (step as HTMLElement).dataset.step!
        step.classList.toggle('done',   !!state.picker[id])
        step.classList.toggle('active', id === firstUnanswered)
      })
    }

    function allAnswered() { return QUESTIONS.every(q => !!state.picker[q.id]) }

    function updateContinue() {
      const btn  = qs('#picker-continue') as HTMLButtonElement | null
      const hint = qs('#picker-hint')
      const ready = allAnswered()
      if (btn)  btn.disabled = !ready
      if (hint) hint.textContent = ready ? 'All set, see your top 3 models below' : 'Answer all 4 questions to continue'
    }

    function renderCode() {
      const el = qs('#code-block')
      if (el) el.innerHTML = highlight(CODE[state.codeLang])
      qsAll('.ltab').forEach(t => t.classList.toggle('active', (t as HTMLElement).dataset.lang === state.codeLang))
    }

    function animateRouting() {
      const nodes  = qsAll('#routing-diagram .rnode')
      const arrows = qsAll('#routing-diagram .rarrow')
      const btn    = qs('#animate-btn') as HTMLButtonElement | null
      nodes.forEach(n  => n.classList.remove('lit', 'lit-final'))
      arrows.forEach(a => a.classList.remove('lit'))
      if (btn) { btn.disabled = true; btn.textContent = '▶ Animating…' }

      nodes.forEach((node, i) => {
        setTimeout(() => {
          if (i > 0 && arrows[i - 1]) arrows[i - 1].classList.add('lit')
          node.classList.add('lit')
          if (i === nodes.length - 1) {
            node.classList.add('lit-final')
            if (btn) { btn.disabled = false; btn.textContent = '✓ 0.8s · Animate again' }
          }
        }, 120 + i * 250)
      })
    }

    function init() {
      qsAll('.ptab').forEach(tab => {
        tab.addEventListener('click', () => switchTab((tab as HTMLElement).dataset.tab!))
      })
      qsAll('[data-switch]').forEach(el => {
        el.addEventListener('click', () => switchTab((el as HTMLElement).dataset.switch!))
      })
      qsAll('.js-compare').forEach(btn => {
        btn.addEventListener('click', () => {
          const orig = btn.textContent
          btn.textContent = 'Out of scope, prototype only';
          (btn as HTMLButtonElement).disabled = true
          setTimeout(() => { btn.textContent = orig; (btn as HTMLButtonElement).disabled = false }, 1600)
        })
      })
      const continueBtn = qs('#picker-continue')
      if (continueBtn) {
        continueBtn.addEventListener('click', () => { if (allAnswered()) switchTab('recs') })
      }
      qsAll('.ltab').forEach(tab => {
        tab.addEventListener('click', () => { state.codeLang = (tab as HTMLElement).dataset.lang!; renderCode() })
      })
      const copyBtn = qs('#copy-btn') as HTMLButtonElement | null
      if (copyBtn) {
        copyBtn.addEventListener('click', () => {
          const text = CODE[state.codeLang]
          const done = () => {
            copyBtn.textContent = 'Copied!'; copyBtn.classList.add('copied')
            setTimeout(() => { copyBtn.textContent = 'Copy'; copyBtn.classList.remove('copied') }, 2000)
          }
          if (navigator.clipboard?.writeText) { navigator.clipboard.writeText(text).then(done) } else { done() }
        })
      }
      const animBtn = qs('#animate-btn')
      if (animBtn) animBtn.addEventListener('click', animateRouting)

      const fab  = qs('#fab')
      const hero = qs('.hero')
      if (fab && hero) {
        new IntersectionObserver(
          ([entry]) => fab.classList.toggle('visible', !entry.isIntersecting),
          { threshold: 0 }
        ).observe(hero)
        fab.addEventListener('click', () => {
          document.getElementById('prototype')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
        })
      }

      const diagram = qs('#routing-diagram')
      if (diagram && 'IntersectionObserver' in window) {
        let triggered = false
        new IntersectionObserver(entries => {
          if (entries[0].isIntersecting && !triggered) { triggered = true; setTimeout(animateRouting, 300) }
        }, { threshold: 0.4 }).observe(diagram)
      }

      // ── GSAP vertical scrollspy ────────────────────
      gsap.registerPlugin(ScrollTrigger)

      const vSectionIds = ['story', 'problem', 'decisions', 'prototype', 'reflection']
      const vSections   = vSectionIds.map(id => document.getElementById(id)).filter(Boolean) as HTMLElement[]
      const vLinks      = qsAll('.v-nav-link') as HTMLAnchorElement[]
      const vFill       = qs('.v-nav-fill') as HTMLElement | null
      const total       = vSections.length

      function activateSection(index: number) {
        // Animate fill line
        if (vFill) {
          gsap.to(vFill, {
            height: `${((index + 1) / total) * 100}%`,
            duration: 0.55,
            ease: 'power3.out',
          })
        }
        // Animate label colors
        vLinks.forEach((link, i) => {
          gsap.to(link, {
            color: i === index ? 'rgba(0,0,0,0.82)' : 'rgba(0,0,0,0.2)',
            duration: 0.3,
            ease: 'power2.out',
          })
        })
      }

      vSections.forEach((sec, i) => {
        ScrollTrigger.create({
          trigger: sec,
          start: 'top 55%',
          end: 'bottom 45%',
          onEnter:     () => activateSection(i),
          onEnterBack: () => activateSection(i),
        })
      })

      // Fire immediately on load
      activateSection(0)

      renderPicker(); refreshPicker(); renderCode()
    }

    init()

    return () => {
      try { document.head.removeChild(iconLink) } catch (_) {}
      ScrollTrigger.getAll().forEach(t => t.kill())
    }
  }, [])

  return (
    <>
      {/* ── CONTEXT BANNER ──────────────────────────────── */}
      <div style={{ background: '#F3F4F6', borderBottom: '1px solid #E5E7EB', padding: '10px 40px', display: 'flex', alignItems: 'center', gap: '16px', marginTop: '64px' }}>
        <span className="or-banner-label" style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase' as const, color: '#6C47FF', whiteSpace: 'nowrap' as const }}>WHAT IS OPENROUTER?</span>
        <div className="or-banner-sep" style={{ width: '1px', background: '#D1D5DB', height: '14px', flexShrink: 0 }} />
        <span style={{ fontSize: '12px', color: '#6B7280', lineHeight: 1.5 }}>A single API giving developers access to 500+ AI models from 60+ providers. One key, one endpoint. Gives you access to everything but guides you on nothing. That&rsquo;s what this project is about.</span>
      </div>

      <div className="or-page" style={{ paddingTop: 0 }}>

        {/* ── VERTICAL SCROLLSPY NAV ──────────────────── */}
        <nav className="v-nav" aria-label="Page sections">
          <div className="v-nav-track">
            <div className="v-nav-fill" style={{height: '20%'}}></div>
          </div>
          <div className="v-nav-items">
            {[
              { href: '#story',      label: 'The Story' },
              { href: '#problem',    label: 'The Problem' },
              { href: '#decisions',  label: 'Decisions' },
              { href: '#prototype',  label: 'Prototype' },
              { href: '#reflection', label: 'Reflection' },
            ].map(({ href, label }) => (
              <a key={href} href={href} className="v-nav-link">{label}</a>
            ))}
          </div>
        </nav>

        {/* ── HERO ────────────────────────────────────── */}
        <section className="hero" id="hero">
          <div className="container">
            <Link href="/#explorations" className="back-link">← Back to explorations</Link>
            <p className="eyebrow">Product Design · Concept · OpenRouter</p>
            <h1 className="hero-title">OpenRouter has 500&nbsp;models.<br />I still couldn&apos;t pick one.</h1>
            <p className="hero-sub">So I designed a wizard that does the picking. Four questions, one recommendation, copy-paste code to ship.</p>
            <p className="hero-disclaimer">Design exploration based on observed patterns, not validated user research. I&apos;m being upfront about that because it matters.</p>
            <div className="hero-ctas">
              <a href="#prototype" className="btn btn-primary">Try the prototype ↓</a>
              <a href="#problem" className="btn btn-outline">Read the case study</a>
            </div>
            <div className="summary-card">
              <div className="summary-top">
                <p className="summary-hmw"><strong>The challenge:</strong> Take a developer from &ldquo;I need AI&rdquo; to a working API call without requiring them to understand 503 model IDs, pricing tables, or fallback infrastructure.</p>
                <span className="status-live">Live prototype</span>
              </div>
              <div className="summary-meta">
                <div className="smeta-item"><span className="smeta-k">Role</span><span className="smeta-v">Product Designer</span></div>
                <div className="smeta-item"><span className="smeta-k">Company</span><span className="smeta-v">OpenRouter (concept)</span></div>
                <div className="smeta-item"><span className="smeta-k">Timeline</span><span className="smeta-v">8 days</span></div>
                <div className="smeta-item"><span className="smeta-k">Tools</span><span className="smeta-v">Figma · Claude · HTML/CSS/JS</span></div>
              </div>
              <div className="summary-cols">
                <div className="summary-col sum-problem">
                  <div className="sum-col-head"><span className="sum-icon"><i className="ti ti-sparkles"></i></span><span className="sum-label">Highlights</span></div>
                  <ul>
                    <li>503 model IDs, zero guidance on where to start</li>
                    <li>Pricing opaque until you get the bill</li>
                    <li>Production breaks when model IDs change</li>
                  </ul>
                </div>
                <div className="summary-col sum-approach">
                  <div className="sum-col-head"><span className="sum-icon"><i className="ti ti-list-check"></i></span><span className="sum-label">Approach</span></div>
                  <ul>
                    <li>4-question deterministic recommendation engine</li>
                    <li>3 ranked options with plain-language reasoning</li>
                    <li>Pre-configured code output with fallback chain</li>
                  </ul>
                </div>
                <div className="summary-col sum-result">
                  <div className="sum-col-head"><span className="sum-icon"><i className="ti ti-target-arrow"></i></span><span className="sum-label">Result</span></div>
                  <ul>
                    <li><strong>503 → 1</strong> models to a recommendation</li>
                    <li>Predicted cost shown before you commit</li>
                    <li>Copy-paste code on your first visit</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── STORY ───────────────────────────────────── */}
        <section className="sec sec-alt" id="story">
          <div className="container">
            <p className="sec-label">01 — The Story</p>
            <h2 className="sec-title">Meet Casey</h2>

            {/* Casey Persona Card + story side by side */}
            <div className="persona-story-row">
            <div className="persona-wrap">
              <div className="persona-card">
                <div className="persona-header">
                  <div className="persona-avatar">👩‍💻</div>
                  <div>
                    <div className="persona-name">Casey</div>
                    <div className="persona-meta">
                      <div className="persona-meta-item"><span className="persona-meta-dot"></span><span>27 years old</span></div>
                      <div className="persona-meta-item"><span className="persona-meta-dot"></span><span>Full-Stack Engineer, Series A startup</span></div>
                      <div className="persona-meta-item"><span className="persona-meta-dot"></span><span>Austin, TX</span></div>
                    </div>
                  </div>
                </div>
                <div className="persona-group-tags">
                  <span className="persona-tag primary">Building a side project or MVP</span>
                  <span className="persona-tag">Shipping AI features at a startup</span>
                </div>
                <div className="persona-context-box">
                  <div className="persona-context-label">The situation</div>
                  <ul className="persona-context-list">
                    <li>PM dropped a Jira ticket: &ldquo;Add AI chat to the support flow. Sprint ends Friday.&rdquo;</li>
                    <li>Heard about OpenRouter — one API key, every model, automatic failover.</li>
                    <li>Landed on openrouter.ai/models. 503 models stared back.</li>
                    <li>Picked GPT-4o based on a Reddit thread. Cost $47 in week one.</li>
                  </ul>
                </div>
                <div className="persona-grid">
                  <div className="persona-grid-item">
                    <div className="persona-grid-header">
                      <div className="persona-grid-title">Frustrated</div>
                      <div className="persona-grid-icon">😤</div>
                    </div>
                    <div className="persona-grid-text">503 model IDs with no guidance. Pricing that&apos;s opaque until the bill arrives. <span className="highlight">Model IDs that change silently and break production at 2am.</span></div>
                  </div>
                  <div className="persona-grid-item">
                    <div className="persona-grid-header">
                      <div className="persona-grid-title">Touchpoints</div>
                      <div className="persona-grid-icon">🔍</div>
                    </div>
                    <div className="persona-grid-text">Reddit threads 8 months old. Hacker News comments. <span className="highlight">Trustpilot reviews warning about surprise costs.</span> GitHub issues about deprecated model IDs.</div>
                  </div>
                  <div className="persona-grid-item">
                    <div className="persona-grid-header">
                      <div className="persona-grid-title">Goals</div>
                      <div className="persona-grid-icon">🎯</div>
                    </div>
                    <div className="persona-grid-text">Ship the AI feature before Friday. <span className="highlight">Pick the right model without becoming an LLM expert.</span> Not get surprised by the bill next month.</div>
                  </div>
                  <div className="persona-grid-item">
                    <div className="persona-grid-header">
                      <div className="persona-grid-title">Motivation</div>
                      <div className="persona-grid-icon">⚡</div>
                    </div>
                    <div className="persona-grid-text">Wants to build fast and build right. <span className="highlight">Trusts tools that explain their reasoning.</span> Will pay for quality if the cost is predictable upfront.</div>
                  </div>
                </div>
              </div>
            </div>
            </div>{/* end persona-wrap */}

            <div className="story-body">
              <p>Casey is a full-stack developer at a 40-person startup. Last Tuesday her PM dropped a Jira ticket: &ldquo;Add AI chat to the support flow. Sprint ends Friday.&rdquo; Not ML, not infra. Just Casey, a deadline, and a blank file.</p>
              <p>She&apos;d heard about OpenRouter. One key, every model, automatic failover. She went to openrouter.ai/models.</p>
              <p>503 models.</p>
              <p>She didn&apos;t know if she needed Claude or GPT-4o or Llama. She didn&apos;t know what a context window meant for a support bot running roughly 200 conversations a day. She didn&apos;t know if $3.50 per million tokens was cheap or ruinous at that volume.</p>
              <p>She opened Reddit. Found a thread from 8 months ago. Someone said &ldquo;just use GPT-4o.&rdquo; She used GPT-4o. Cost her $47 in the first week. Her PM was not pleased.</p>
              <p>Three weeks later, the model ID she&apos;d hardcoded changed without warning. Feature broke in production. She found out at 2am from an error alert, not from OpenRouter.</p>
              <p>OpenRouter had the right answer the whole time. It just wasn&apos;t findable.</p>
            </div>
            </div>{/* end persona-story-row */}

            <blockquote className="pull-quote">&ldquo;The bottleneck isn&apos;t the model. It&apos;s knowing which model.&rdquo;</blockquote>
            <div className="evidence-row">
              <div className="evidence-card">
                <div className="evidence-head"><span className="evidence-src hn">Hacker News</span><span className="evidence-tag">Choice paralysis</span></div>
                <p>&ldquo;Just grab the top ~30 models on OpenRouter and test them all.&rdquo;</p>
                <a className="evidence-link" href="https://news.ycombinator.com/item?id=46156941" target="_blank" rel="noopener">news.ycombinator.com ↗</a>
              </div>
              <div className="evidence-card">
                <div className="evidence-head"><span className="evidence-src tp">Trustpilot</span><span className="evidence-tag">Unexpected cost</span></div>
                <p>&ldquo;Costs 100 times higher than expected. Nearly $50 for less than 100 lines of output.&rdquo;</p>
                <a className="evidence-link" href="https://www.trustpilot.com/review/openrouter.ai" target="_blank" rel="noopener">trustpilot.com ↗</a>
              </div>
              <div className="evidence-card">
                <div className="evidence-head"><span className="evidence-src tp">Trustpilot</span><span className="evidence-tag">IDs change silently</span></div>
                <p>&ldquo;OpenRouter keeps changing the model ID names, causing errors.&rdquo;</p>
                <a className="evidence-link" href="https://www.trustpilot.com/review/openrouter.ai" target="_blank" rel="noopener">trustpilot.com ↗</a>
              </div>
            </div>
            <p className="evidence-note">Real quotes from public sources. <a href="https://github.com/BerriAI/litellm/issues/20521" target="_blank" rel="noopener">39 OpenRouter models were silently deprecated in a single LiteLLM update ↗</a>, breaking live integrations with no warning.</p>
          </div>
        </section>

        {/* ── PROBLEM ─────────────────────────────────── */}
        <section className="sec" id="problem">
          <div className="container">
            <p className="sec-label">02 — The Problem</p>
            <h2 className="sec-title">A catalog isn&apos;t a recommendation</h2>
            <div className="prose">
              <p>OpenRouter&apos;s own <a href="https://openrouter.ai/state-of-ai" target="_blank" rel="noopener">State of AI report</a> says programming is 40-60% of all paid-model traffic on the platform. The typical OpenRouter user is a developer building something with AI. And most of them are not ML engineers. They&apos;re Casey.</p>
              <p>OpenRouter&apos;s models page is technically complete. Every model is there. The pricing is accurate. The filters exist. But it&apos;s designed for someone who already knows what they want.</p>
              <p>Casey doesn&apos;t know what she wants. She knows she needs &ldquo;AI for a customer support bot.&rdquo; The gap between &ldquo;I need AI&rdquo; and &ldquo;I need <code>anthropic/claude-haiku-4-5-20251001</code> with temperature 0.3 and these fallbacks configured&rdquo; is enormous. Nothing bridges it.</p>
            </div>
            <div className="objection-callout">
              <span className="objection-label">What about Auto Router?</span>
              <p>OpenRouter already has an <a href="https://openrouter.ai/docs/guides/routing/routers/auto-router" target="_blank" rel="noopener">Auto Router</a>. It picks the cheapest provider that meets a quality threshold at runtime. That&apos;s an infrastructure decision. It happens after you&apos;ve already chosen a model category. It doesn&apos;t tell Casey what to build with, or why, or what her bill will look like next month. Model Match is for that earlier moment: before there&apos;s any code at all.</p>
            </div>
            <div className="browser-frame">
              <div className="browser-chrome">
                <span className="dot dot-r"></span><span className="dot dot-y"></span><span className="dot dot-g"></span>
                <span className="browser-url">openrouter.ai/models</span>
              </div>
              <div className="browser-body">
                <div className="anno"><span className="anno-tag">Problem 1</span><span>503 model IDs. No way to know where to start.</span></div>
                <div className="or-header"><span className="or-title">Models</span><span className="or-count">503 models</span></div>
                <div className="or-search"><span className="or-search-icon">⌕</span><span className="or-search-ph">Search models by name, provider, capability…</span></div>
                <div className="anno"><span className="anno-tag">Problem 2</span><span>Filters don&apos;t map to user intent. &ldquo;What should I use for a support bot?&rdquo; has no answer here.</span></div>
                <div className="or-chips">
                  <span className="chip chip-active">All</span><span className="chip">Free</span><span className="chip">Text</span>
                  <span className="chip">Vision</span><span className="chip">JSON</span><span className="chip">Function calling</span>
                  <span className="chip">128K+</span><span className="chip">OpenAI</span><span className="chip">Anthropic</span>
                  <span className="chip">Google</span><span className="chip">Meta</span>
                </div>
                <div className="or-rows">
                  <div className="or-row" style={{opacity:1}}><span className="or-icon">🤖</span><span className="or-model-id">google/gemini-2.5-pro</span><span className="or-meta">1M ctx</span><span className="or-meta">$3.50/M in</span><span className="tag-paid">Paid</span><span className="tag-new">New</span></div>
                  <div className="or-row" style={{opacity:1}}><span className="or-icon">🧠</span><span className="or-model-id">anthropic/claude-sonnet-4-6</span><span className="or-meta">200K ctx</span><span className="or-meta">$3.00/M in</span><span className="tag-paid">Paid</span></div>
                  <div className="or-row" style={{opacity:0.65}}><span className="or-icon">⚡</span><span className="or-model-id">meta-llama/llama-3.3-70b-instruct</span><span className="or-meta">128K ctx</span><span className="or-meta">Free tier</span><span className="tag-free">Free</span></div>
                  <div className="or-row" style={{opacity:0.4}}><span className="or-icon">🔮</span><span className="or-model-id">mistralai/mistral-large-2407</span><span className="or-meta">128K ctx</span><span className="or-meta">$2.00/M in</span><span className="tag-paid">Paid</span></div>
                  <div className="or-row" style={{opacity:0.2}}><span className="or-icon">🌐</span><span className="or-model-id">openai/gpt-4o-mini</span><span className="or-meta">128K ctx</span><span className="or-meta">$0.15/M in</span><span className="tag-paid">Paid</span></div>
                </div>
                <div className="anno"><span className="anno-tag">Problem 3</span><span>Model IDs change without warning. No cost prediction before you commit.</span></div>
              </div>
            </div>
            <div className="journey-label">Where Model Match fits</div>
            <div className="journey">
              <div className="jnode">Casey lands on OpenRouter</div><div className="jarr">→</div>
              <div className="jnode">Sees 503 models</div><div className="jarr">→</div>
              <div className="jnode jnode-gap"><span className="jnode-main">GAP: no guidance</span><span className="jnode-sub">← Model Match goes here</span></div><div className="jarr">→</div>
              <div className="jnode">Narrows to 3 options</div><div className="jarr">→</div>
              <div className="jnode jnode-tool">Compares</div><div className="jarr">→</div>
              <div className="jnode">Picks one</div><div className="jarr">→</div>
              <div className="jnode jnode-tool">Code output</div><div className="jarr">→</div>
              <div className="jnode jnode-done"><i className="ti ti-check"></i> First API call</div>
            </div>
          </div>
        </section>

        {/* ── DESIGN DECISIONS ────────────────────────── */}
        <section className="sec sec-alt" id="decisions">
          <div className="container">
            <p className="sec-label">03 — Design Decisions</p>
            <h2 className="sec-title">Four choices that shaped everything</h2>
            <div className="ruled-out">
              <p className="ruled-out-label">What I ruled out first</p>
              <div className="ruled-out-grid">
                <div className="ruled-out-item"><span className="ruled-out-name">Filter presets</span><p>One click for &ldquo;indie dev prototyping,&rdquo; one for &ldquo;production API.&rdquo; Rejected because it still requires the user to self-identify correctly, which has the same intent-mapping problem as the current filter UI.</p></div>
                <div className="ruled-out-item"><span className="ruled-out-name">AI-powered recommendations</span><p>Let a model pick a model. Rejected because it&apos;s a black box. You can&apos;t explain the reasoning, you can&apos;t audit it. Deterministic is worse on edge cases but far better at building trust.</p></div>
                <div className="ruled-out-item"><span className="ruled-out-name">Side-by-side comparison table</span><p>Show the top 10 models with specs. Rejected because it reproduces the original problem in a smaller box. If Casey could evaluate a comparison table, he wouldn&apos;t need this tool.</p></div>
              </div>
            </div>
            <div className="decisions-list">
              {[
                { num: '01', title: 'Four questions, not two or eight', what: 'I landed on four questions: use case, quality vs. speed, monthly volume, prompt length. Not three. Not six. Four.', why: 'Two questions don\'t give enough signal. Six starts feeling like a form. Four covers the variables that actually change which model I\'d recommend.', diff: 'I\'d want to validate these four against real user decision patterns. Maybe volume matters less than I think. Maybe there\'s a fifth variable: whether they need structured JSON output.' },
                { num: '02', title: 'A recommendation, not a comparison', what: 'Model Match doesn\'t show you a side-by-side table. It picks one and tells you why.', why: 'Casey doesn\'t know enough yet to evaluate a comparison. The recommendation has to be opinionated. "Use this one" is more useful than "here are your options."', diff: 'The current "Compare" button on each card is a bit of a cop-out. If someone clicks Compare, that means my recommendation didn\'t land. I\'d want to understand why.' },
                { num: '03', title: 'Code output as part of the design', what: 'The last step isn\'t "here\'s your model." It\'s a pre-configured code block in Node.js, Python, or curl. Ready to copy.', why: 'The gap between "I picked a model" and "I\'m making API calls" is where most people drop off. Removing that friction is a design decision. Design owns the full journey, not just the screens.', diff: 'Right now the code is static. In a real product, the temperature, max_tokens, and system prompt would all be tuned to your use case.' },
                { num: '04', title: 'Making the fallback chain visible', what: 'Under the recommendations, there\'s a fallback chain: Primary → Fallback 1 → Fallback 2.', why: 'Failover is OpenRouter\'s killer feature. But almost nobody knows it exists because it\'s invisible infrastructure. Making it visible builds trust and explains why OpenRouter is more than a proxy.', diff: 'The current fallback chain is static. In a real product, I\'d show real-time provider uptime next to each fallback option.' },
              ].map(d => (
                <div className="decision" key={d.num}>
                  <div className="decision-num">{d.num}</div>
                  <div className="decision-body">
                    <h3>{d.title}</h3>
                    <div className="decision-block"><span className="dblock-label">What I did</span><p>{d.what}</p></div>
                    <div className="decision-block"><span className="dblock-label">Why</span><p>{d.why}</p></div>
                    <div className="decision-block"><span className="dblock-label">What I&apos;d do differently</span><p>{d.diff}</p></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── PROTOTYPE ───────────────────────────────── */}
        <section className="sec" id="prototype">
          <div className="container">
            <p className="sec-label">04 — The Prototype</p>
            <h2 className="sec-title">Try it yourself</h2>
            <p className="sec-intro">This is what I actually built. Click through it. The recommendations are deterministic (not AI), but the model IDs, pricing, and code are real.</p>
          </div>
          <div className="proto-outer">
            <div className="proto-frame">
              <div className="proto-chrome">
                <div className="chrome-left">
                  <span className="dot dot-r"></span><span className="dot dot-y"></span><span className="dot dot-g"></span>
                  <span className="proto-url">model-match.vercel.app</span>
                </div>
                <div className="proto-tabs" id="proto-tabs">
                  <button className="ptab active" data-tab="picker">The Picker</button>
                  <button className="ptab" data-tab="recs">Recommendations</button>
                  <button className="ptab" data-tab="code">Code + Cost</button>
                  <button className="ptab" data-tab="routing">Routing</button>
                </div>
              </div>
              <div className="proto-body">
                {/* Picker tab */}
                <div className="pview active" id="pview-picker">
                  <div className="pview-inner">
                    <div className="picker-head"><h3>Find your model in 4 questions</h3><p>Answer what you know. We&apos;ll handle the 503 IDs you don&apos;t.</p></div>
                    <div className="recap" id="recap-chips"></div>
                    <div className="stepper" id="stepper">
                      <div className="step" data-step="useCase"><span className="step-n">1</span><span className="step-lbl">Use Case</span></div>
                      <div className="step-line"></div>
                      <div className="step" data-step="quality"><span className="step-n">2</span><span className="step-lbl">Quality</span></div>
                      <div className="step-line"></div>
                      <div className="step" data-step="volume"><span className="step-n">3</span><span className="step-lbl">Volume</span></div>
                      <div className="step-line"></div>
                      <div className="step" data-step="promptLength"><span className="step-n">4</span><span className="step-lbl">Prompt Length</span></div>
                    </div>
                    <div id="picker-qs"></div>
                    <div className="picker-foot">
                      <button className="btn btn-primary" id="picker-continue" disabled>See your recommendations →</button>
                      <span className="picker-hint" id="picker-hint">Answer all 4 questions to continue</span>
                    </div>
                  </div>
                </div>
                {/* Recs tab */}
                <div className="pview" id="pview-recs">
                  <div className="pview-inner">
                    <div className="recs-head"><h3>Your top 3 models</h3><p>Ranked for your answers. Each one comes with a reason, not just a spec sheet.</p></div>
                    <div className="recap recap-sm" id="rec-context"></div>
                    <div className="rec-grid">
                      <div className="rec-card rec-best">
                        <span className="rec-badge badge-best"><i className="ti ti-rosette-discount-check"></i> Best match</span>
                        <div className="rec-name">Claude Haiku 4.5</div>
                        <div className="rec-id">anthropic/claude-haiku-4-5-20251001</div>
                        <div className="rec-stats">
                          <div className="rstat"><span className="rstat-k">Cost</span><span className="rstat-v">$0.80/M</span></div>
                          <div className="rstat"><span className="rstat-k">Latency</span><span className="rstat-v">0.8s</span></div>
                          <div className="rstat"><span className="rstat-k">Context</span><span className="rstat-v">200K</span></div>
                          <div className="rstat"><span className="rstat-k">Est. monthly</span><span className="rstat-v green">~$4</span></div>
                        </div>
                        <div className="rec-why"><span className="rec-why-lbl">Why this model</span><p>Haiku 4.5 is fast enough for live chat and handles multi-turn conversations well. At 10K requests a month you&apos;re looking at under $5 total.</p></div>
                        <div className="rec-actions">
                          <button className="btn btn-primary btn-sm" data-switch="code">Use this model →</button>
                          <button className="btn btn-outline btn-sm js-compare">Compare</button>
                        </div>
                      </div>
                      <div className="rec-card rec-fast">
                        <span className="rec-badge badge-fast"><i className="ti ti-bolt"></i> Fastest</span>
                        <div className="rec-name">Llama 3.3 70B</div>
                        <div className="rec-id">meta-llama/llama-3.3-70b-instruct</div>
                        <div className="rec-stats">
                          <div className="rstat"><span className="rstat-k">Cost</span><span className="rstat-v">Free tier</span></div>
                          <div className="rstat"><span className="rstat-k">Latency</span><span className="rstat-v">0.4s</span></div>
                          <div className="rstat"><span className="rstat-k">Context</span><span className="rstat-v">128K</span></div>
                          <div className="rstat"><span className="rstat-k">Est. monthly</span><span className="rstat-v green">$0</span></div>
                        </div>
                        <div className="rec-why"><span className="rec-why-lbl">Why this model</span><p>Free tier covers your volume: about 333 requests a day. Best choice if you&apos;re still validating whether you need AI at all.</p></div>
                        <div className="rec-actions">
                          <button className="btn btn-primary btn-sm" data-switch="code">Use this model →</button>
                          <button className="btn btn-outline btn-sm js-compare">Compare</button>
                        </div>
                      </div>
                      <div className="rec-card rec-budget">
                        <span className="rec-badge badge-budget"><i className="ti ti-coin"></i> Budget pick</span>
                        <div className="rec-name">GPT-4o Mini</div>
                        <div className="rec-id">openai/gpt-4o-mini</div>
                        <div className="rec-stats">
                          <div className="rstat"><span className="rstat-k">Cost</span><span className="rstat-v">$0.15/M</span></div>
                          <div className="rstat"><span className="rstat-k">Latency</span><span className="rstat-v">0.6s</span></div>
                          <div className="rstat"><span className="rstat-k">Context</span><span className="rstat-v">128K</span></div>
                          <div className="rstat"><span className="rstat-k">Est. monthly</span><span className="rstat-v green">~$0.80</span></div>
                        </div>
                        <div className="rec-why"><span className="rec-why-lbl">Why this model</span><p>Cheapest option if you scale past free tier. Strong on structured JSON output, good if your support bot needs to classify tickets or fill forms.</p></div>
                        <div className="rec-actions">
                          <button className="btn btn-primary btn-sm" data-switch="code">Use this model →</button>
                          <button className="btn btn-outline btn-sm js-compare">Compare</button>
                        </div>
                      </div>
                    </div>
                    <div className="fallback-box">
                      <div className="fallback-title">Your fallback chain <span className="info-tip" tabIndex={0} aria-label="If your primary model is down, OpenRouter automatically tries the next one.">ⓘ</span></div>
                      <div className="fallback-chain">
                        <div className="fb-node fb-primary"><span className="fb-tier">Primary</span><span className="fb-id">claude-haiku-4-5</span></div>
                        <span className="fb-arr">→</span>
                        <div className="fb-node"><span className="fb-tier">Fallback 1</span><span className="fb-id">gpt-4o-mini</span></div>
                        <span className="fb-arr">→</span>
                        <div className="fb-node"><span className="fb-tier">Fallback 2</span><span className="fb-id">llama-3.3-70b</span></div>
                      </div>
                      <p className="fallback-note">If Claude Haiku is down, OpenRouter automatically falls back to GPT-4o Mini, then Llama. Most developers don&apos;t know this exists until their primary provider goes down at 2am.</p>
                    </div>
                  </div>
                </div>
                {/* Code tab */}
                <div className="pview" id="pview-code">
                  <div className="pview-inner">
                    <div className="code-head"><h3>Ready to copy: Claude Haiku 4.5</h3><p>Pre-configured for a support bot. Change the model ID line to swap models. Nothing else changes.</p></div>
                    <div className="code-panel">
                      <div className="code-toolbar">
                        <div className="lang-tabs" id="lang-tabs">
                          <button className="ltab active" data-lang="node">Node.js</button>
                          <button className="ltab" data-lang="python">Python</button>
                          <button className="ltab" data-lang="curl">curl</button>
                        </div>
                        <button className="copy-btn" id="copy-btn">Copy</button>
                      </div>
                      <pre className="code-block"><code id="code-block"></code></pre>
                    </div>
                    <h4 className="cost-title">Cost projection</h4>
                    <div className="cost-table">
                      <div className="cost-row"><span className="cost-k">Monthly requests</span><span className="cost-v">10,000</span></div>
                      <div className="cost-row"><span className="cost-k">Avg tokens per request</span><span className="cost-v">~450 tokens</span></div>
                      <div className="cost-row"><span className="cost-k">Input cost ($0.80/M)</span><span className="cost-v">$2.40</span></div>
                      <div className="cost-row"><span className="cost-k">Output cost ($4.00/M)</span><span className="cost-v">$1.60</span></div>
                      <div className="cost-row cost-total"><span className="cost-k">Total monthly estimate</span><span className="cost-v green">~$4.00/month</span></div>
                      <div className="cost-row"><span className="cost-k">GPT-4o (not matched)</span><span className="cost-v"><s className="muted">~$25/month</s></span></div>
                    </div>
                  </div>
                </div>
                {/* Routing tab */}
                <div className="pview" id="pview-routing">
                  <div className="pview-inner">
                    <div className="routing-head"><h3>How OpenRouter actually works</h3><p>One API call. Automatic failover. Cost optimization. Most people use it for months without realizing all of this is happening.</p></div>
                    <div className="routing-controls">
                      <button className="btn btn-primary" id="animate-btn"><i className="ti ti-player-play"></i> Animate</button>
                    </div>
                    <div className="routing-diagram" id="routing-diagram">
                      <div className="rnode" data-node="0"><div className="rnode-icon"><i className="ti ti-device-mobile"></i></div><div className="rnode-name">Your App</div><div className="rnode-sub">sends a request</div></div>
                      <div className="rarr">→</div>
                      <div className="rnode" data-node="1"><div className="rnode-icon"><i className="ti ti-route"></i></div><div className="rnode-name">OpenRouter</div><div className="rnode-sub">routes + optimizes</div></div>
                      <div className="rarr">→</div>
                      <div className="rnode" data-node="2"><div className="rnode-icon"><i className="ti ti-cpu"></i></div><div className="rnode-name">Anthropic</div><div className="rnode-sub">Claude Haiku 4.5</div></div>
                      <div className="rarr">→</div>
                      <div className="rnode" data-node="3"><div className="rnode-icon"><i className="ti ti-user"></i></div><div className="rnode-name">Your User</div><div className="rnode-sub">gets a response</div></div>
                    </div>
                    <div className="routing-fallback">
                      <div className="rf-title">When Anthropic goes down</div>
                      <div className="routing-diagram routing-diagram-sm">
                        <div className="rnode rnode-down"><div className="rnode-icon"><i className="ti ti-cpu"></i></div><div className="rnode-name">Anthropic</div><div className="rnode-sub rnode-sub-down">Down</div></div>
                        <div className="rarr rarr-fallback">↓ auto-fallback</div>
                        <div className="rnode rnode-up"><div className="rnode-icon"><i className="ti ti-world"></i></div><div className="rnode-name">OpenAI GPT-4o Mini</div><div className="rnode-sub rnode-sub-up">Active</div></div>
                        <div className="rarr">→</div>
                        <div className="rnode"><div className="rnode-icon"><i className="ti ti-circle-check"></i></div><div className="rnode-name">Your users see no error</div><div className="rnode-sub">request completes normally</div></div>
                      </div>
                      <p className="arjun-callback">This is what happened to Casey at 2am. Except he wasn&apos;t using OpenRouter yet.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── REFLECTION ──────────────────────────────── */}
        <section className="sec sec-alt" id="reflection">
          <div className="container">
            <p className="sec-label">05 — Reflection</p>
            <h2 className="sec-title">What I&apos;d do with 6 more weeks</h2>
            <div className="prose">
              <p>This is a concept. I built it in 8 days. Here&apos;s what I know is rough, and what I&apos;d need to actually ship it.</p>
              <p>The recommendation engine is a decision tree, not AI. I made that choice deliberately. Deterministic systems are easier to audit. But it means the recommendations are only as good as my assumptions about how use cases map to models.</p>
            </div>
            <div className="hard-question">
              <span className="hard-question-label">The uncomfortable question I haven&apos;t answered</span>
              <p>Is a wizard even the right form? Wizards work when the problem space is stable. LLM capability and pricing change every few weeks. A static decision tree becomes stale fast. It could be actively misleading within a month if a better cheap model ships or a recommended one gets deprecated. I don&apos;t have a good answer to that yet. It might mean the right product is a recommendation layer that pulls live data from the OpenRouter API, not a hardcoded picker. Or it might mean the whole premise is wrong and the real fix is better documentation. I don&apos;t know. That&apos;s worth saying out loud.</p>
            </div>
            <div className="outcomes-list">
              <div className="outcome-item">
                <div className="outcome-num">01</div>
                <div className="outcome-body"><div className="outcome-label">Primary metric</div><p><strong>What I&apos;d measure:</strong> Time from landing on OpenRouter to first successful API call. I&apos;d guess it goes from 2–3 hours to under 15 minutes. But that&apos;s a guess.</p></div>
              </div>
              <div className="outcome-item">
                <div className="outcome-num">02</div>
                <div className="outcome-body"><div className="outcome-label">Usability test</div><p><strong>What I&apos;d do:</strong> Sit with 5 developers who&apos;ve never used OpenRouter. Watch them use the picker. The four questions feel right to me, but I designed them. That&apos;s not the same as them being right.</p></div>
              </div>
              <div className="outcome-item">
                <div className="outcome-num">03</div>
                <div className="outcome-body"><div className="outcome-label">A/B test</div><p><strong>What I&apos;d test:</strong> Wizard flow vs. current models page on new user cohorts. Measure time-to-first-API-call and 7-day retention.</p></div>
              </div>
            </div>
          </div>
        </section>

        {/* ── FOOTER ──────────────────────────────────── */}
        <footer className="footer">
          <div className="container footer-inner">
            <blockquote className="footer-quote">
              &ldquo;The details are not the details. They make the design.&rdquo;
              <cite>— Charles Eames</cite>
            </blockquote>
            <div className="footer-links">
              <Link href="/">Portfolio</Link>
              <a href="https://linkedin.com/in/sanjana-gangishetty" target="_blank" rel="noopener">LinkedIn</a>
            </div>
            <p className="footer-note">Concept project · Not affiliated with OpenRouter · Designed &amp; built by Sanjana Gangishetty</p>
          </div>
        </footer>

        {/* FAB */}
        <button className="fab" id="fab" aria-label="Try the prototype">Try the prototype ↗</button>

      </div>
    </>
  )
}
