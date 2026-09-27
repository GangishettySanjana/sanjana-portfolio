'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import RiskExplorer from './RiskExplorer'
import './meridian.css'

/* ── Page ─────────────────────────────────────────────────────── */
export default function MeridianPage() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const NAV = [
      { id: 'context',       num: '01', label: 'Context'   },
      { id: 'problem',       num: '02', label: 'Problem'   },
      { id: 'current-state', num: '03', label: 'Before'    },
      { id: 'approach',      num: '04', label: 'Approach'  },
      { id: 'decisions',     num: '05', label: 'Decisions' },
      { id: 'prototype',     num: '06', label: 'Prototype' },
      { id: 'reflection',    num: '07', label: 'Reflection'},
    ]

    const sections = NAV.map(n => document.getElementById(n.id)).filter(Boolean) as HTMLElement[]
    const vLinks   = Array.from(document.querySelectorAll('.mx-v-link')) as HTMLElement[]
    const fill     = document.querySelector('.mx-v-fill') as HTMLElement | null
    const total    = sections.length

    function activate(index: number) {
      if (fill) {
        gsap.to(fill, { height: `${((index + 1) / total) * 100}%`, duration: 0.55, ease: 'power3.out' })
      }
      vLinks.forEach((link, i) => link.classList.toggle('mx-v-on', i === index))
    }

    sections.forEach((sec, i) => {
      ScrollTrigger.create({
        trigger: sec,
        start: 'top 55%',
        end:   'bottom 45%',
        onEnter:     () => activate(i),
        onEnterBack: () => activate(i),
      })
    })

    activate(0)
    return () => { ScrollTrigger.getAll().forEach(t => t.kill()) }
  }, [])

  return (
    <div className="mx-page" style={{ paddingTop: 64 }}>

      {/* ── SCROLLSPY NAV ──────────────────────────────── */}
      <nav className="mx-v-nav" aria-label="Page sections">
        <div className="mx-v-track">
          <div className="mx-v-fill" style={{ height: '16.6%' }}></div>
        </div>
        <div className="mx-v-items">
          {[
            { href: '#context',       n: '01', label: 'Context'    },
            { href: '#problem',       n: '02', label: 'Problem'    },
            { href: '#current-state', n: '03', label: 'Before'     },
            { href: '#approach',      n: '04', label: 'Approach'   },
            { href: '#decisions',     n: '05', label: 'Decisions'  },
            { href: '#prototype',     n: '06', label: 'Prototype'  },
            { href: '#reflection',    n: '07', label: 'Reflection' },
          ].map(({ href, n, label }) => (
            <a key={href} href={href} className="mx-v-link">
              <span className="mx-v-num">{n}</span>
            </a>
          ))}
        </div>
      </nav>

      {/* ── HERO ──────────────────────────────────────── */}
      <section className="mx-hero" id="hero">
        <div className="mx-container">
          <Link href="/#work" className="mx-back-link" onClick={() => sessionStorage.setItem('skipIntro', '1')}>← Back to work</Link>
          <p className="mx-eyebrow">Self-Initiated · Private Wealth · B2B Fintech</p>
          <h1 className="mx-hero-title">When finding risk takes 40 minutes</h1>
          <p className="mx-hero-sub">
            Wealth advisors had no way to see over-exposed clients at a glance.
            I designed a risk console that surfaces the right clients in 30 seconds, not 40 minutes.
          </p>

          {/* key stats */}
          <div className="mx-stats">
            {[
              { value: '80×', label: 'Faster — 40 min to 30 sec to surface at-risk clients' },
              { value: '200 clients',     label: 'Generated data powering the prototype' },
              { value: '3 dimensions',    label: 'Rate · Credit · Concentration risk' },
            ].map(({ value, label }) => (
              <div key={label} className="mx-stat">
                <div className="mx-stat-value">{value}</div>
                <div className="mx-stat-label">{label}</div>
              </div>
            ))}
          </div>

          {/* summary card */}
          <div className="mx-summary-card">
            <div className="mx-summary-top">
              <p className="mx-summary-hmw">
                <strong>The challenge:</strong> Build a risk explorer that makes the right clients obvious, not a dashboard nobody reads. Three risk factors, 200 clients, one sorted table.
              </p>
              <span className="mx-status-concept">Self-initiated</span>
            </div>
            <div className="mx-summary-meta">
              <div className="mx-smeta-item">
                <span className="mx-smeta-k">Type</span>
                <span className="mx-smeta-v">Self-initiated case study</span>
              </div>
              <div className="mx-smeta-item">
                <span className="mx-smeta-k">Domain</span>
                <span className="mx-smeta-v">Private wealth · B2B fintech</span>
              </div>
              <div className="mx-smeta-item">
                <span className="mx-smeta-k">Deliverables</span>
                <span className="mx-smeta-v">Case study + working prototype</span>
              </div>
              <div className="mx-smeta-item">
                <span className="mx-smeta-k">Year</span>
                <span className="mx-smeta-v">2026</span>
              </div>
            </div>
            <div className="mx-summary-cols">
              <div className="mx-sum-col mx-sum-problem">
                <div className="mx-sum-head"><span className="mx-sum-label">The Problem</span></div>
                <ul>
                  <li>No way to see over-exposed clients without cross-referencing spreadsheets</li>
                  <li>Reviews took 40 minutes per cycle. That was just to find the problem clients.</li>
                  <li>Nothing surfaced risk proactively. Everything was reactive.</li>
                </ul>
              </div>
              <div className="mx-sum-col mx-sum-approach">
                <div className="mx-sum-head"><span className="mx-sum-label">What I did</span></div>
                <ul>
                  <li>Designed a risk explorer that ranks clients by exposure automatically</li>
                  <li>Three risk dimensions computed per client, shown as a sortable table</li>
                  <li>Drill-down panel with the full position breakdown on click</li>
                </ul>
              </div>
              <div className="mx-sum-col mx-sum-result">
                <div className="mx-sum-head"><span className="mx-sum-label">Result</span></div>
                <ul>
                  <li><strong>30 seconds</strong> to surface the most at-risk clients, down from 40 minutes</li>
                  <li>Working prototype with 200 generated clients: real sort, real filter, real drill-down</li>
                  <li>Full case study showing before-state, rationale, and decision log</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 01 CONTEXT ──────────────────────────────── */}
      <section className="mx-sec" id="context">
        <div className="mx-container">
          <p className="mx-sec-label">01 · Context</p>
          <h2 className="mx-sec-title">A proxy for private-wealth work I can't show.</h2>

          <div className="mx-prose">
            <p>
              Most of my design work at Northern Trust is under NDA. Rather than leave that domain off my portfolio, I built Meridian: a self-initiated concept that addresses a real problem I saw in private-wealth risk tooling, using generated data so nothing proprietary surfaces.
            </p>
            <p>
              Meridian is not a Northern Trust product. It&apos;s a design exercise. The point is to show I can work through complex financial data: information density, what advisors actually need to see, and how to keep a high-stakes interface from becoming noise.
            </p>
          </div>

          <div className="mx-spec-strip">
            {[
              { label: 'Company',       value: 'Fictional (concept)' },
              { label: 'Domain',        value: 'Private wealth management' },
              { label: 'Users',         value: 'Wealth advisors, portfolio analysts' },
              { label: 'Data',          value: '200 generated clients, 3 risk factors each' },
              { label: 'What&apos;s real', value: 'The problem space, the design decisions' },
            ].map(({ label, value }) => (
              <div key={label} className="mx-spec-item">
                <div className="mx-spec-key" dangerouslySetInnerHTML={{ __html: label }} />
                <div className="mx-spec-val" dangerouslySetInnerHTML={{ __html: value }} />
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── 02 PROBLEM ──────────────────────────────── */}
      <section className="mx-sec mx-sec-alt" id="problem">
        <div className="mx-container">
          <p className="mx-sec-label">02 · The Problem</p>
          <h2 className="mx-sec-title">Identifying over-exposed clients took 40 minutes. That was the baseline.</h2>

          <div className="mx-prose">
            <p>
              Legacy risk tooling in private wealth is <strong>built around reports, not decisions.</strong> An advisor who wanted to know which clients had too much rate exposure had to open a PDF, cross-reference a spreadsheet, and mentally rank dozens of accounts. Every review cycle.
            </p>
            <p>
              Nothing surfaced risk proactively. If a client was dangerously concentrated in rate-sensitive bonds, the tool wouldn&apos;t tell you. You had to go looking. And going looking took <strong>40 minutes of the kind of work that should take 30 seconds.</strong>
            </p>
          </div>

          <ul className="mx-bullets" style={{ marginBottom: 40 }}>
            {[
              'No ranked view. Every client looked the same regardless of exposure level.',
              'Three risk dimensions (rate, credit, concentration) tracked in separate reports',
              'Drill-down required opening a new report for each client, one at a time',
              'Nothing was persistent. The next review cycle started from scratch.',
              'Over-exposure discovered reactively, after the client had already taken on too much risk',
            ].map(item => <li key={item}>{item}</li>)}
          </ul>

          {/* before-state illustration */}
          <div style={{
            background: 'var(--card)',
            border: '1px solid var(--border)',
            borderRadius: 16,
            padding: '28px 32px',
            marginBottom: 0,
          }}>
            <p style={{ fontSize: 'var(--type-xs)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.08em', color: 'var(--dim)', marginBottom: 16 }}>
              Before: what an advisor was working with
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
              {[
                { label: 'Rate Exposure', note: 'Separate PDF report, generated weekly' },
                { label: 'Credit Quality', note: 'Spreadsheet, maintained manually' },
                { label: 'Concentration', note: 'Third system, no connection to the others' },
              ].map(({ label, note }) => (
                <div key={label} style={{ border: '1px solid var(--border)', borderRadius: 10, padding: '16px 18px', background: 'var(--base)' }}>
                  <div style={{ fontSize: 'var(--type-xs)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.06em', color: 'var(--accent)', marginBottom: 6 }}>{label}</div>
                  <div style={{ fontSize: 'var(--type-sm)', color: 'var(--muted)', lineHeight: 1.5 }}>{note}</div>
                  <div style={{ marginTop: 12, height: 6, background: 'var(--surface)', borderRadius: 3 }}>
                    <div style={{ height: '100%', width: '40%', background: 'var(--border-hi)', borderRadius: 3 }} />
                  </div>
                </div>
              ))}
            </div>
            <p style={{ fontSize: 'var(--type-xs)', color: 'var(--dim)', marginTop: 14, fontStyle: 'italic' }}>
              Three disconnected systems. No ranked view. No way to know who needed attention without checking each client manually.
            </p>
          </div>
        </div>
      </section>

      {/* ── 03 CURRENT STATE ────────────────────────── */}
      <section className="mx-sec" id="current-state">
        <div className="mx-container">
          <p className="mx-sec-label">03 · Current State</p>
          <h2 className="mx-sec-title">One client. Six tabs. No cross-portfolio view.</h2>

          <div className="mx-prose">
            <p>
              The existing tool showed one client at a time across six separate tabs.
              To check rate exposure across all 200 clients: open Tab 3 (Risk Metrics),
              review, close, open the next client. Repeat 199 times. That&apos;s the 40-minute baseline. Most advisors had given up and exported to Excel instead.
            </p>
          </div>

          <div className="mx-before-frame">
            <div className="mx-before-bar">
              <span className="mx-before-badge">BEFORE · Meridian Advisor Portal 2.3 · composite mockup of current-state workflow</span>
            </div>
            <div className="mx-before-layout">
              {/* Sidebar */}
              <div className="mx-before-sidebar">
                <div className="mx-before-logo">MERIDIAN</div>
                {['Dashboard', 'Clients', 'Reports', 'Admin'].map((item, i) => (
                  <div key={item} className={`mx-before-nav-item${i === 1 ? ' mx-before-nav-active' : ''}`}>{item}</div>
                ))}
              </div>
              {/* Main */}
              <div className="mx-before-main">
                <div className="mx-before-tabs">
                  {['Overview', 'Portfolio', 'Risk Metrics', 'Holdings Detail', 'Compliance', 'Trade History', 'Notes'].map((tab, i) => (
                    <div key={tab} className={`mx-before-tab${i === 2 ? ' mx-before-tab-active' : ''}`}>{tab}</div>
                  ))}
                </div>
                <div className="mx-before-client-nav">
                  <span className="mx-before-arrow">◀ Previous</span>
                  <span className="mx-before-client-pos">
                    Client 43 of 200
                    <span className="mx-before-warning"> ⚠ 1 compliance flag pending</span>
                  </span>
                  <span className="mx-before-arrow">Next ▶</span>
                </div>
                <div className="mx-before-section-title">RISK METRICS · WILLIAM MORRISON</div>
                <div className="mx-before-metrics">
                  <div className="mx-before-metric">
                    <span className="mx-before-metric-k">Interest Rate Sensitivity</span>
                    <span className="mx-before-metric-v mx-before-high">HIGH · 0.84</span>
                  </div>
                  <div className="mx-before-metric">
                    <span className="mx-before-metric-k">Credit Rating (wtd avg)</span>
                    <span className="mx-before-metric-v mx-before-watch">BBB– · WATCH</span>
                  </div>
                  <div className="mx-before-metric">
                    <span className="mx-before-metric-k">HY Allocation</span>
                    <span className="mx-before-metric-v mx-before-over">23.4% · OVER LIMIT</span>
                  </div>
                  <div className="mx-before-metric">
                    <span className="mx-before-metric-k">Largest Single Position</span>
                    <span className="mx-before-metric-v mx-before-over">MSFT 18.1% · OVER LIMIT</span>
                  </div>
                </div>
                <div className="mx-before-repeat-note">
                  To identify all over-exposed clients: repeat this for clients 1–200, one at a time. ≈ 40 minutes.
                </div>
              </div>
            </div>
          </div>

          <ul className="mx-bullets" style={{ marginTop: 36 }}>
            {[
              'Every client loaded the same way. The tool had no concept of priority or ranking.',
              'Risk data sat in different tabs per client. No side-by-side comparison across the book.',
              'To find all over-exposed clients on rate risk: open 200 records, check Tab 3 on each, make notes.',
              'Most advisors had stopped using it for this. They exported to Excel every morning and built their own filters.',
            ].map(item => <li key={item}>{item}</li>)}
          </ul>
        </div>
      </section>

      {/* ── 04 APPROACH ─────────────────────────────── */}
      <section className="mx-sec mx-sec-alt" id="approach">
        <div className="mx-container">
          <p className="mx-sec-label">04 · Approach</p>
          <h2 className="mx-sec-title">One table. Three risk factors. Sorted by who needs attention.</h2>

          <div className="mx-prose">
            <p>
              The insight was simple: advisors don&apos;t need a dashboard, they need a ranked list. If the most at-risk client is always at the top, you know in seconds who to call. The design work was in figuring out what &quot;at-risk&quot; means across three dimensions, and how to show that without overwhelming anyone.
            </p>
            <p>
              I computed a composite risk score per client using three factors: rate exposure (duration risk relative to the benchmark), credit quality (weighted average credit rating across the portfolio), and concentration (single-name or sector exposure above threshold). Each factor normalizes independently so the overall score is a fair composite, not a sum dominated by one dimension.
            </p>
          </div>

          <ul className="mx-bullets" style={{ marginBottom: 40 }}>
            {[
              'Sorted table: highest composite risk at the top, always, on load',
              'Sortable by any single dimension. Click a column header to isolate a risk type.',
              'Filter by threshold: hide everyone below a risk level so you only see the accounts that matter today',
              'Drill-down panel on row click: full position breakdown without leaving the table',
              '200 generated clients with real variance so the sort and filter interactions have to actually work',
            ].map(item => <li key={item}>{item}</li>)}
          </ul>

          {/* risk dimension illustration */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
            {[
              {
                label: 'Rate Exposure',
                color: '#3b82f6',
                icon: '≈',
                desc: 'Portfolio duration vs. benchmark. Clients with long-duration fixed income in a rising-rate environment surface first.',
              },
              {
                label: 'Credit Quality',
                color: '#fbbf24',
                icon: '◈',
                desc: 'Weighted average credit rating across all positions. Below-investment-grade exposure flags immediately.',
              },
              {
                label: 'Concentration',
                color: '#ef4444',
                icon: '▲',
                desc: 'Single-name or sector weight above threshold. High concentration is often invisible until it isn\'t.',
              },
            ].map(({ label, color, icon, desc }) => (
              <div key={label} style={{
                border: '1px solid var(--border)',
                borderRadius: 14,
                padding: '22px 20px',
                borderTop: `3px solid ${color}`,
              }}>
                <div style={{ fontSize: 22, color, marginBottom: 10, lineHeight: 1 }}>{icon}</div>
                <div style={{ fontSize: 'var(--type-sm)', fontWeight: 700, color: 'var(--text)', marginBottom: 8 }}>{label}</div>
                <div style={{ fontSize: 'var(--type-sm)', color: 'var(--muted)', lineHeight: 1.6 }}>{desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 05 DECISIONS ────────────────────────────── */}
      <section className="mx-sec" id="decisions">
        <div className="mx-container">
          <p className="mx-sec-label">05 · Design Decisions</p>
          <h2 className="mx-sec-title">Three calls that shaped the whole thing.</h2>

          <div className="mx-decisions-list">
            {[
              {
                num: '01',
                title: 'A table, not a dashboard',
                what:  'The primary view is a sortable table, not a collection of cards, not a grid of charts, not a dashboard with tiles.',
                why:   'Advisors already work in tabular contexts. Spreadsheets, CRMs, report exports. A familiar scan pattern reduces training time and cognitive load. A dashboard requires learning a new spatial grammar; a table requires recognizing a pattern you already know.',
                diff:  "I'd want to test with advisors who work primarily on tablets or smaller displays. The table starts to get compressed below certain viewport widths and I haven't solved the mobile view.",
              },
              {
                num: '02',
                title: 'Three risk dimensions, not more',
                what:  'Rate exposure, credit quality, and concentration. Those three. Nothing else in the primary view.',
                why:   'These cover the three things that keep advisors up at night in private wealth: duration risk when rates move, credit blowups, and concentration that looks fine until it doesn\'t. Adding more dimensions creates scan overhead without adding decision value.',
                diff:  "I'd want to talk to advisors about what regularly surprises them. Liquidity exposure, currency risk, ESG constraints. Any of those might deserve a slot. I don't know without asking.",
              },
              {
                num: '03',
                title: 'Generated data, not mockups',
                what:  '200 clients with realistic variance across all three risk factors. The prototype runs on real computed data.',
                why:   'Static mockups let you cheat the UX. If the sort and filter work on a list where someone chose which 8 clients to show, you learn nothing. 200 clients with realistic spread means the table actually needs to sort correctly, the scores have to make sense, and the drill-down has to render sensibly even for the boring cases in the middle of the distribution.',
                diff:  "I'd want to add edge cases: clients at exactly threshold, clients with missing data, clients with zero risk in one dimension. The data right now is uniformly well-formed. Real data isn't.",
              },
            ].map(({ num, title, what, why, diff }) => (
              <div key={num} className="mx-decision">
                <div className="mx-decision-num">{num}</div>
                <div className="mx-decision-body">
                  <h3>{title}</h3>
                  {[
                    { label: 'What I did',              text: what },
                    { label: 'Why',                     text: why  },
                    { label: "What I'd do differently", text: diff },
                  ].map(({ label, text }) => (
                    <div key={label} className="mx-dblock">
                      <span className="mx-dblock-label">{label}</span>
                      <p>{text}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 06 PROTOTYPE ────────────────────────────── */}
      <section className="mx-sec mx-sec-alt" id="prototype">
        <div className="mx-container">
          <p className="mx-sec-label">06 · Live Prototype</p>
          <h2 className="mx-sec-title">The full risk console. 200 clients. Fully interactive.</h2>

          <div className="mx-prose">
            <p>
              Pick a risk factor: Rate, Credit, or Concentration. Sort by any column. Filter to over-exposed clients only.
              Click any row to open the drill-down panel with the full position breakdown.
              The data is generated; the interactions are real.
            </p>
          </div>

          <div className="mx-proto-embed" style={{ marginTop: 32 }}>
            <RiskExplorer />
          </div>
          <p className="mx-proto-caption" style={{ marginTop: 12, textAlign: 'center' }}>
            Built in React · 200 generated clients · sort, filter, and drill-down all work
          </p>
        </div>
      </section>

      {/* ── 07 REFLECTION ───────────────────────────── */}
      <section className="mx-sec" id="reflection">
        <div className="mx-container">
          <p className="mx-sec-label">07 · Reflection</p>
          <h2 className="mx-sec-title">The hardest call was what not to show.</h2>

          <div className="mx-prose">
            <p>
              The first version had a lot more on screen: a risk breakdown chart per client in the table row, a heatmap view, a timeline showing how each client&apos;s composite score had changed over the quarter. It looked thorough. It made the right decisions invisible.
            </p>
            <p>
              The table got stripped back until the most at-risk client was unmistakably at the top and everything else was secondary. Information density in risk tooling is a design trap: <strong>more data feels safer, but it delays the moment the advisor knows who to call.</strong> The entire point is to reduce that delay.
            </p>
          </div>

          <div className="mx-outcomes">
            {[
              {
                num: '01',
                metric: 'What this is and isn\'t',
                desc: 'Meridian is a design exercise, not a shipped product. The 40 min → 30 sec figure is a design target based on task analysis, not measured data from a deployed system. If this were going to production, I\'d want to validate that claim against actual advisor behavior.',
              },
              {
                num: '02',
                metric: 'What I\'d do next',
                desc: 'The prototype is missing two things: a notification layer (tell the advisor when a client crosses a threshold without them having to come looking) and a comparison view (how does this client\'s risk profile compare to similar clients in the book). Both are obvious next steps.',
              },
            ].map(({ num, metric, desc }) => (
              <div key={num} className="mx-outcome-item">
                <div className="mx-outcome-num">{num}</div>
                <div>
                  <p className="mx-outcome-metric">{metric}</p>
                  <p className="mx-outcome-desc">{desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mx-reflection-callout" style={{ marginTop: 32 }}>
            <span className="mx-reflection-label">On self-initiated work</span>
            <p>The advantage of a concept project is that there&apos;s no product manager to negotiate with about scope. The disadvantage is the same thing. Without a real user and a real deadline, the edges stay soft. I kept the scope narrow on purpose. One problem, one view, one decision per risk factor. The goal was to have <strong>something clear to say rather than something comprehensive to show.</strong></p>
          </div>
        </div>
      </section>

      {/* ── FOOTER ──────────────────────────────────── */}
      <footer className="mx-footer">
        <div className="mx-container">
          <Link href="/#work" className="mx-footer-back" onClick={() => sessionStorage.setItem('skipIntro', '1')}>
            ← Back to work
          </Link>
        </div>
      </footer>

    </div>
  )
}
