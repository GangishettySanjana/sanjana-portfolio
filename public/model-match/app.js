/* ============================================================
   OpenRouter — Model Match  |  app.js
   ============================================================ */

/* ---------- State ---------- */
const state = {
  picker: {
    useCase:      null,
    quality:      'balanced',
    volume:       'under-10k',
    promptLength: null
  },
  codeLang: 'node'
};

/* ---------- Questions ---------- */
const QUESTIONS = [
  {
    id: 'useCase',
    num: '01',
    title: 'What are you building?',
    sub: 'This shapes how much we weight reliability vs. cost.',
    options: [
      { value: 'product',   icon: '🛠', label: 'A product feature',        desc: 'Customer support, search, content generation', chip: 'Product feature' },
      { value: 'prototype', icon: '🧪', label: 'A prototype or experiment', desc: 'Exploring what\'s possible',                    chip: 'Prototyping' },
      { value: 'internal',  icon: '🏢', label: 'Internal tooling',          desc: 'Dashboards, automation, data pipelines',         chip: 'Internal tooling' }
    ]
  },
  {
    id: 'quality',
    num: '02',
    title: 'Quality or speed?',
    sub: 'Most use cases live somewhere in the middle.',
    options: [
      { value: 'speed',    icon: '⚡', label: 'Speed first',  desc: 'Sub-second responses, good enough is fine',  chip: 'Speed first' },
      { value: 'quality',  icon: '🎯', label: 'Quality first', desc: 'Accuracy over speed, complex reasoning',     chip: 'Quality first' },
      { value: 'balanced', icon: '⚖️', label: 'Balanced',      desc: 'Good quality, reasonable latency',           chip: 'Balanced' }
    ]
  },
  {
    id: 'volume',
    num: '03',
    title: 'Monthly request volume?',
    sub: 'Volume decides whether free tier is enough or cost-per-token dominates.',
    options: [
      { value: 'under-10k', icon: '🌱', label: 'Under 10,000',  desc: 'Prototyping, free tier probably covers you', chip: 'Under 10K/mo' },
      { value: '10k-500k',  icon: '🚀', label: '10K – 500K',    desc: 'Production app, cost efficiency matters',     chip: '10K–500K/mo' },
      { value: '500k+',     icon: '🏢', label: '500K+',          desc: 'High volume, cost per token is everything',  chip: '500K+/mo' }
    ]
  },
  {
    id: 'promptLength',
    num: '04',
    title: 'How long are your prompts?',
    sub: 'Longer prompts need bigger context windows and cost more per call.',
    options: [
      { value: 'short',  icon: '📝', label: 'Short (under 500 tokens)',   desc: 'Chat messages, classifications',              chip: 'Short prompts' },
      { value: 'medium', icon: '📄', label: 'Medium (500-2000 tokens)',   desc: 'Documents, summaries, short analysis',        chip: 'Medium prompts' },
      { value: 'long',   icon: '📚', label: 'Long (over 2000 tokens)',    desc: 'Codebases, research papers, long docs',       chip: 'Long prompts' }
    ]
  }
];

/* ---------- Code samples ---------- */
const CODE = {
  node: `// Model Match: generated config
// Use case: customer support bot
// Model: Claude Haiku 4.5 (best match for your answers)

import OpenAI from "openai";

const client = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
});

// Change this line to swap models. Nothing else needs to change.
const MODEL = "anthropic/claude-haiku-4-5-20251001";

// Fallback chain, auto-configured by Model Match
const FALLBACK_MODELS = [
  "openai/gpt-4o-mini",
  "meta-llama/llama-3.3-70b-instruct"
];

async function supportBot(userMessage, history) {
  const response = await client.chat.completions.create({
    model: MODEL,
    messages: [
      {
        role: "system",
        content: "You are a helpful support agent. Be concise and friendly."
      },
      ...history,
      { role: "user", content: userMessage }
    ],
    max_tokens: 500,   // tuned for support responses
    temperature: 0.3,  // lower = more consistent answers
    route: { fallback: FALLBACK_MODELS }
  });

  return response.choices[0].message.content;
}`,

  python: `# OpenRouter: Model Match generated config
# Use case: customer support bot
# Model: Claude Haiku 4.5 (best match for your answers)

import os
from openai import OpenAI

client = OpenAI(
    base_url="https://openrouter.ai/api/v1",
    api_key=os.environ.get("OPENROUTER_API_KEY"),
)

# Swap model ID here. Nothing else in your code changes.
MODEL = "anthropic/claude-haiku-4-5-20251001"

# Fallback chain, auto-configured by Model Match
FALLBACK_MODELS = [
    "openai/gpt-4o-mini",
    "meta-llama/llama-3.3-70b-instruct",
]

def support_bot(user_message, history):
    response = client.chat.completions.create(
        model=MODEL,
        messages=[
            {
                "role": "system",
                "content": "You are a helpful support agent. Be concise and friendly.",
            },
            *history,
            {"role": "user", "content": user_message},
        ],
        max_tokens=500,
        temperature=0.3,
        extra_body={"route": {"fallback": FALLBACK_MODELS}},
    )

    return response.choices[0].message.content`,

  curl: `# OpenRouter: Model Match generated config
# Use case: customer support bot
# Model: Claude Haiku 4.5 (best match for your answers)

curl https://openrouter.ai/api/v1/chat/completions \\
  -H "Authorization: Bearer $OPENROUTER_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "anthropic/claude-haiku-4-5-20251001",
    "messages": [
      {
        "role": "system",
        "content": "You are a helpful support agent. Be concise and friendly."
      },
      { "role": "user", "content": "How do I reset my password?" }
    ],
    "max_tokens": 500,
    "temperature": 0.3,
    "route": {
      "fallback": ["openai/gpt-4o-mini", "meta-llama/llama-3.3-70b-instruct"]
    }
  }'`
};

/* ---------- Helpers ---------- */
function $(sel, ctx) { return (ctx || document).querySelector(sel); }
function $all(sel, ctx) { return Array.from((ctx || document).querySelectorAll(sel)); }

function esc(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

/* Strings matched before comments so // or # inside strings aren't flagged */
function highlight(code) {
  const re = /("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`)|(\/\/[^\n]*|#[^\n]*)|\b(const|let|var|async|await|function|return|import|from|new|export|def|if|else|for|in|os|None|True|False)\b|\b(\d+(?:\.\d+)?)\b/g;
  let out = '', last = 0, m;
  while ((m = re.exec(code))) {
    out += esc(code.slice(last, m.index));
    if      (m[1]) out += `<span class="tok-string">${esc(m[1])}</span>`;
    else if (m[2]) out += `<span class="tok-comment">${esc(m[2])}</span>`;
    else if (m[3]) out += `<span class="tok-keyword">${esc(m[3])}</span>`;
    else if (m[4]) out += `<span class="tok-number">${esc(m[4])}</span>`;
    last = m.index + m[0].length;
  }
  out += esc(code.slice(last));
  return out;
}

function optionByValue(qid, value) {
  const q = QUESTIONS.find(x => x.id === qid);
  return q ? q.options.find(o => o.value === value) : null;
}

/* ---------- Proto tab switching ---------- */
function switchTab(name) {
  $all('.ptab').forEach(t => t.classList.toggle('active', t.dataset.tab === name));
  $all('.pview').forEach(v => v.classList.toggle('active', v.id === `pview-${name}`));
}

/* ---------- Picker ---------- */
function renderPicker() {
  const container = $('#picker-qs');
  if (!container) return;

  container.innerHTML = QUESTIONS.map(q => {
    const opts = q.options.map(o => {
      const sel = state.picker[q.id] === o.value;
      return `<button class="popt${sel ? ' selected' : ''}" data-question="${q.id}" data-value="${esc(o.value)}">
        <span class="popt-icon">${o.icon}</span>
        <span class="popt-body">
          <span class="popt-label">${esc(o.label)}</span>
          <span class="popt-desc">${esc(o.desc)}</span>
        </span>
        <span class="popt-check"></span>
      </button>`;
    }).join('');

    return `<div class="pq-card">
      <div class="pq-num">${esc(q.num)}</div>
      <div class="pq-title">${esc(q.title)}</div>
      <div class="pq-sub">${esc(q.sub)}</div>
      <div class="pq-opts">${opts}</div>
    </div>`;
  }).join('');

  $all('.popt', container).forEach(btn => {
    btn.addEventListener('click', () => {
      state.picker[btn.dataset.question] = btn.dataset.value;
      refreshPicker();
    });
  });
}

function refreshPicker() {
  $all('.popt').forEach(btn => {
    btn.classList.toggle('selected',
      state.picker[btn.dataset.question] === btn.dataset.value);
  });
  renderRecap('#recap-chips');
  renderRecap('#rec-context');
  updateStepper();
  updateContinue();
}

function renderRecap(selector) {
  const el = $(selector);
  if (!el) return;
  el.innerHTML = QUESTIONS
    .filter(q => state.picker[q.id])
    .map(q => {
      const o = optionByValue(q.id, state.picker[q.id]);
      if (!o) return '';
      return `<span class="recap-chip">${o.icon} ${esc(o.chip)}</span>`;
    }).join('');
}

function updateStepper() {
  let firstUnanswered = null;
  QUESTIONS.forEach(q => {
    if (!state.picker[q.id] && !firstUnanswered) firstUnanswered = q.id;
  });
  $all('.step').forEach(step => {
    const id = step.dataset.step;
    step.classList.toggle('done',   !!state.picker[id]);
    step.classList.toggle('active', id === firstUnanswered);
  });
}

function allAnswered() {
  return QUESTIONS.every(q => !!state.picker[q.id]);
}

function updateContinue() {
  const btn    = $('#picker-continue');
  const hint   = $('#picker-hint');
  const ready  = allAnswered();
  if (btn)  btn.disabled = !ready;
  if (hint) hint.textContent = ready
    ? 'All set, see your top 3 models below'
    : 'Answer all 4 questions to continue';
}

/* ---------- Code block ---------- */
function renderCode() {
  const el = $('#code-block');
  if (el) el.innerHTML = highlight(CODE[state.codeLang]);
  $all('.ltab').forEach(t => t.classList.toggle('active', t.dataset.lang === state.codeLang));
}

/* ---------- Routing animation (GSAP) ---------- */
function animateRouting() {
  const nodes  = $all('#routing-diagram .rnode');
  const arrows = $all('#routing-diagram .rarrow');
  const btn    = $('#animate-btn');

  nodes.forEach(n  => n.classList.remove('lit', 'lit-final'));
  arrows.forEach(a => a.classList.remove('lit'));
  if (btn) { btn.disabled = true; btn.textContent = '▶ Animating…'; }

  if (typeof gsap !== 'undefined') {
    const tl = gsap.timeline({
      onComplete: () => {
        if (btn) { btn.disabled = false; btn.textContent = '✓ 0.8s · Animate again'; }
      }
    });
    nodes.forEach((node, i) => {
      tl.call(() => {
        if (i > 0 && arrows[i - 1]) arrows[i - 1].classList.add('lit');
        node.classList.add('lit');
        if (i === nodes.length - 1) node.classList.add('lit-final');
      }, null, i * 0.22 + 0.1);
      tl.fromTo(node, { scale: 0.95, opacity: 0.4 }, { scale: 1, opacity: 1, duration: 0.25, ease: 'back.out(1.5)' }, i * 0.22 + 0.1);
    });
  } else {
    /* fallback if GSAP not loaded */
    nodes.forEach((node, i) => {
      setTimeout(() => {
        if (i > 0 && arrows[i - 1]) arrows[i - 1].classList.add('lit');
        node.classList.add('lit');
        if (i === nodes.length - 1) {
          node.classList.add('lit-final');
          if (btn) { btn.disabled = false; btn.textContent = '✓ 0.8s · Animate again'; }
        }
      }, 120 + i * 250);
    });
  }
}

/* ---------- Init ---------- */
function init() {
  /* Proto tabs */
  $all('.ptab').forEach(tab => {
    tab.addEventListener('click', () => switchTab(tab.dataset.tab));
  });

  /* data-switch buttons (e.g. "Use this model →" on rec cards) */
  $all('[data-switch]').forEach(el => {
    el.addEventListener('click', () => switchTab(el.dataset.switch));
  });

  /* Compare / out-of-scope buttons */
  $all('.js-compare').forEach(btn => {
    btn.addEventListener('click', () => {
      const orig = btn.textContent;
      btn.textContent = 'Out of scope, prototype only';
      btn.disabled = true;
      setTimeout(() => { btn.textContent = orig; btn.disabled = false; }, 1600);
    });
  });

  /* Continue button → jump to recs tab */
  const continueBtn = $('#picker-continue');
  if (continueBtn) {
    continueBtn.addEventListener('click', () => {
      if (allAnswered()) switchTab('recs');
    });
  }

  /* Language tabs */
  $all('.ltab').forEach(tab => {
    tab.addEventListener('click', () => { state.codeLang = tab.dataset.lang; renderCode(); });
  });

  /* Copy button */
  const copyBtn = $('#copy-btn');
  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      const text = CODE[state.codeLang];
      const done = () => {
        copyBtn.textContent = 'Copied!';
        copyBtn.classList.add('copied');
        setTimeout(() => { copyBtn.textContent = 'Copy'; copyBtn.classList.remove('copied'); }, 2000);
      };
      if (navigator.clipboard?.writeText) {
        navigator.clipboard.writeText(text).then(done, fallback);
      } else { fallback(); }
      function fallback() {
        const ta = Object.assign(document.createElement('textarea'), { value: text });
        Object.assign(ta.style, { position: 'fixed', opacity: '0' });
        document.body.appendChild(ta);
        ta.select();
        try { document.execCommand('copy'); } catch (_) {}
        document.body.removeChild(ta);
        done();
      }
    });
  }

  /* Routing animate button */
  const animBtn = $('#animate-btn');
  if (animBtn) animBtn.addEventListener('click', animateRouting);

  /* FAB — show after hero leaves viewport */
  const fab  = $('#fab');
  const hero = $('.hero');
  if (fab && hero) {
    new IntersectionObserver(
      ([entry]) => fab.classList.toggle('visible', !entry.isIntersecting),
      { threshold: 0 }
    ).observe(hero);

    fab.addEventListener('click', () => {
      const target = document.getElementById('prototype');
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }

  /* Auto-trigger routing animation when diagram scrolls into view */
  const diagram = $('#routing-diagram');
  if (diagram && 'IntersectionObserver' in window) {
    let triggered = false;
    new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && !triggered) {
        triggered = true;
        setTimeout(animateRouting, 300);
      }
    }, { threshold: 0.4 }).observe(diagram);
  }

  /* Scroll spy — highlight active nav link */
  const navLinks = $all('.nav-links a[href^="#"]');
  const sections = navLinks
    .map(a => document.getElementById(a.getAttribute('href').slice(1)))
    .filter(Boolean);

  function updateActiveNav() {
    const mid = window.scrollY + window.innerHeight / 3;
    let active = sections[0];
    sections.forEach(sec => { if (sec.offsetTop <= mid) active = sec; });
    navLinks.forEach(a => {
      a.classList.toggle('nav-active', a.getAttribute('href') === '#' + active.id);
    });
  }

  window.addEventListener('scroll', updateActiveNav, { passive: true });
  updateActiveNav();

  /* Initial renders */
  renderPicker();
  refreshPicker();
  renderCode();

  /* ---------- GSAP animations ---------- */
  if (typeof gsap !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    /* Hero entrance — staggered reveal */
    const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    heroTl
      .from('.back-link',  { y: 12, opacity: 0, duration: 0.4 })
      .from('.eyebrow',    { y: 12, opacity: 0, duration: 0.4 }, '-=0.2')
      .from('.hero-title', { y: 28, opacity: 0, duration: 0.65 }, '-=0.2')
      .from('.hero-sub',   { y: 18, opacity: 0, duration: 0.5  }, '-=0.35')
      .from('.hero-ctas',  { y: 14, opacity: 0, duration: 0.45 }, '-=0.3')
      .from('.summary-card', { y: 24, opacity: 0, duration: 0.6 }, '-=0.2');

    /* Summary card columns — stagger in */
    heroTl.from('.summary-col', {
      y: 16, opacity: 0, duration: 0.4, stagger: 0.1, ease: 'power2.out'
    }, '-=0.3');

    /* Section reveals on scroll */
    gsap.utils.toArray('.sec-label, .sec-title, .sec-intro').forEach(el => {
      gsap.from(el, {
        y: 20, opacity: 0, duration: 0.55, ease: 'power2.out',
        scrollTrigger: { trigger: el, start: 'top 88%', once: true }
      });
    });

    /* Story prose paragraphs */
    gsap.utils.toArray('.story-body p').forEach((p, i) => {
      gsap.from(p, {
        y: 14, opacity: 0, duration: 0.45, ease: 'power2.out',
        scrollTrigger: { trigger: p, start: 'top 90%', once: true }
      });
    });

    /* Evidence cards */
    gsap.from('.evidence-card', {
      y: 20, opacity: 0, duration: 0.5, stagger: 0.1, ease: 'power2.out',
      scrollTrigger: { trigger: '.evidence-row', start: 'top 85%', once: true }
    });

    /* Decision items */
    gsap.utils.toArray('.decision').forEach(d => {
      gsap.from(d, {
        x: -16, opacity: 0, duration: 0.5, ease: 'power2.out',
        scrollTrigger: { trigger: d, start: 'top 88%', once: true }
      });
    });

    /* Outcome items */
    gsap.utils.toArray('.outcome-item').forEach(o => {
      gsap.from(o, {
        x: -12, opacity: 0, duration: 0.45, ease: 'power2.out',
        scrollTrigger: { trigger: o, start: 'top 88%', once: true }
      });
    });

    /* Pull quote */
    gsap.from('.pull-quote', {
      scale: 0.97, opacity: 0, duration: 0.55, ease: 'power2.out',
      scrollTrigger: { trigger: '.pull-quote', start: 'top 85%', once: true }
    });

    /* Prototype section header */
    gsap.from('#prototype .sec-title', {
      y: 20, opacity: 0, duration: 0.55, ease: 'power3.out',
      scrollTrigger: { trigger: '#prototype', start: 'top 80%', once: true }
    });

    /* Proto frame drop-in */
    gsap.from('.proto-frame', {
      y: 30, opacity: 0, duration: 0.7, ease: 'power3.out',
      scrollTrigger: { trigger: '.proto-frame', start: 'top 85%', once: true }
    });
  }
}

document.addEventListener('DOMContentLoaded', init);
