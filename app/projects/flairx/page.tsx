'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Reveal, CaseFigure } from '@/components/case/CaseKit'
import './flairx.css'
import '@/app/projects/_case/case-kit.css'
import '@/app/projects/_case/buildnative.css'

/* ── FlairX image map ─────────────────────────────────────────────── */
const FX = {
  before:       '/flairx/Screenshot%202025-12-07%20at%208.54.50%20PM%201.jpg',
  case1:        '/flairx/decision-1.png',
  case2:        '/flairx/decision-2.png',
  entryPoint:   '/flairx/Screenshot%202025-12-08%20at%2011.07.15%20AM%201.jpg',
  singleUpload: '/flairx/single-upload-flow.png',
  bulkUpload:   '/flairx/bulk-upload-1.png',
  csvUpload:    '/flairx/csv-upload.png',
  edgeCase1:    '/flairx/mixed-uploads.png',
  edgeCase2:    '/flairx/missing-fields.png',
  alert1:       '/flairx/unsaved-files-warning.png',
  alert2:       '/flairx/failed-files-notice.png',
  alert3:       '/flairx/empty-pipeline-warning.png',
  alert4:       '/flairx/required-fields-block.png',
  alert5:       '/flairx/duplicate-detection.png',
  flowChart:    '/flairx/Group%20241.png',
  beforeMockup: '/flairx/before-mockup.png',
}

/* ── FlairX flow chart SVG ────────────────────────────────────────── */
function FlairXFlowChart() {
  const stageFill    = 'rgba(43,181,194,0.1)'
  const stageBorder  = 'rgba(43,181,194,0.45)'
  const resultFill   = 'rgba(0,36,72,0.03)'
  const resultBorder = 'rgba(43,181,194,0.18)'
  const lineColor    = 'rgba(43,181,194,0.55)'
  const lw = 1.5
  const font = "var(--font-label), system-ui, sans-serif"
  return (
    <div style={{
      background: '#FFFFFF',
      borderRadius: 20, padding: '36px 24px 28px',
      border: '1px solid rgba(43,181,194,0.18)',
      position: 'relative', overflow: 'hidden',
    }}>
      <svg aria-hidden="true" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.13 }}>
        <defs>
          <pattern id="fxdots" x="0" y="0" width="22" height="22" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1.2" fill="#2BB5C2"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#fxdots)"/>
      </svg>
      <svg viewBox="0 0 720 360" width="100%" style={{ position: 'relative', display: 'block', overflow: 'visible' }}>
        <defs>
          <marker id="fxarrow" markerWidth="7" markerHeight="7" refX="5" refY="3.5" orient="auto">
            <path d="M0,0.5 L6,3.5 L0,6.5 Z" fill={lineColor}/>
          </marker>
          <linearGradient id="topGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#002448"/>
            <stop offset="100%" stopColor="#002448"/>
          </linearGradient>
        </defs>
        <rect x={190} y={8} width={340} height={60} rx={16} fill="url(#topGrad)"/>
        <text x={360} y={34} textAnchor="middle" fill="white" fontSize={13} fontFamily={font} fontWeight={700} letterSpacing="0.08em">UPLOAD YOUR</text>
        <text x={360} y={54} textAnchor="middle" fill="rgba(255,255,255,0.65)" fontSize={11} fontFamily={font} letterSpacing="0.12em">TALENT POOL</text>
        <line x1={360} y1={68} x2={360} y2={104} stroke={lineColor} strokeWidth={lw} markerEnd="url(#fxarrow)"/>
        <line x1={100} y1={110} x2={620} y2={110} stroke={lineColor} strokeWidth={lw}/>
        {[100, 360, 620].map(x => (
          <line key={x} x1={x} y1={110} x2={x} y2={134} stroke={lineColor} strokeWidth={lw} markerEnd="url(#fxarrow)"/>
        ))}
        <rect x={10} y={140} width={180} height={70} rx={13} fill={stageFill} stroke={stageBorder} strokeWidth={lw}/>
        <text x={100} y={165} textAnchor="middle" fill="rgba(43,181,194,0.95)" fontSize={9.5} fontFamily={font} fontWeight={700} letterSpacing="0.14em">STAGE 1</text>
        <text x={100} y={187} textAnchor="middle" fill="#002448" fontSize={13} fontFamily={font} fontWeight={600}>CSV Upload</text>
        <rect x={270} y={140} width={180} height={70} rx={13} fill={stageFill} stroke={stageBorder} strokeWidth={lw}/>
        <text x={360} y={165} textAnchor="middle" fill="rgba(43,181,194,0.95)" fontSize={9.5} fontFamily={font} fontWeight={700} letterSpacing="0.14em">STAGE 2</text>
        <text x={360} y={183} textAnchor="middle" fill="#002448" fontSize={13} fontFamily={font} fontWeight={600}>AI Résumé</text>
        <text x={360} y={199} textAnchor="middle" fill="#002448" fontSize={13} fontFamily={font} fontWeight={600}>Parsing</text>
        <rect x={530} y={140} width={180} height={70} rx={13} fill={stageFill} stroke={stageBorder} strokeWidth={lw}/>
        <text x={620} y={165} textAnchor="middle" fill="rgba(43,181,194,0.95)" fontSize={9.5} fontFamily={font} fontWeight={700} letterSpacing="0.14em">STAGE 3</text>
        <text x={620} y={183} textAnchor="middle" fill="#002448" fontSize={13} fontFamily={font} fontWeight={600}>ATS</text>
        <text x={620} y={199} textAnchor="middle" fill="#002448" fontSize={13} fontFamily={font} fontWeight={600}>Integration</text>
        <line x1={100} y1={210} x2={100} y2={248} stroke={lineColor} strokeWidth={lw} markerEnd="url(#fxarrow)"/>
        <line x1={360} y1={210} x2={360} y2={238} stroke={lineColor} strokeWidth={lw}/>
        <line x1={288} y1={238} x2={432} y2={238} stroke={lineColor} strokeWidth={lw}/>
        <line x1={288} y1={238} x2={288} y2={256} stroke={lineColor} strokeWidth={lw} markerEnd="url(#fxarrow)"/>
        <line x1={432} y1={238} x2={432} y2={256} stroke={lineColor} strokeWidth={lw} markerEnd="url(#fxarrow)"/>
        <line x1={620} y1={210} x2={620} y2={248} stroke={lineColor} strokeWidth={lw} markerEnd="url(#fxarrow)"/>
        <rect x={10} y={252} width={180} height={78} rx={13} fill={resultFill} stroke={resultBorder} strokeWidth={lw}/>
        <text x={100} y={279} textAnchor="middle" fill="rgba(0,36,72,0.7)" fontSize={11.5} fontFamily={font}>No manual time required</text>
        <text x={100} y={297} textAnchor="middle" fill="rgba(0,36,72,0.7)" fontSize={11.5} fontFamily={font}>Clean, structured data</text>
        <rect x={208} y={260} width={155} height={60} rx={13} fill={resultFill} stroke={resultBorder} strokeWidth={lw}/>
        <text x={285} y={286} textAnchor="middle" fill="#002448" fontSize={12.5} fontFamily={font} fontWeight={600}>Single</text>
        <text x={285} y={304} textAnchor="middle" fill="#002448" fontSize={12.5} fontFamily={font} fontWeight={600}>Upload</text>
        <rect x={357} y={260} width={155} height={60} rx={13} fill={resultFill} stroke={resultBorder} strokeWidth={lw}/>
        <text x={434} y={286} textAnchor="middle" fill="#002448" fontSize={12.5} fontFamily={font} fontWeight={600}>Bulk</text>
        <text x={434} y={304} textAnchor="middle" fill="#002448" fontSize={12.5} fontFamily={font} fontWeight={600}>Upload</text>
        <rect x={530} y={252} width={180} height={78} rx={13} fill={resultFill} stroke={resultBorder} strokeWidth={lw}/>
        <text x={620} y={276} textAnchor="middle" fill="rgba(0,36,72,0.7)" fontSize={11.5} fontFamily={font}>Connect to applicant</text>
        <text x={620} y={294} textAnchor="middle" fill="rgba(0,36,72,0.7)" fontSize={11.5} fontFamily={font}>tracking systems</text>
        <text x={620} y={312} textAnchor="middle" fill="rgba(0,36,72,0.7)" fontSize={11.5} fontFamily={font}>Map fields &amp; retrieve data</text>
      </svg>
    </div>
  )
}

/* ── ATS Integration Prototype ───────────────────────────────────── */
function ATSPrototype() {
  const [step, setStep] = useState(0)
  const [connected, setConnected] = useState('')
  const [selected, setSelected] = useState<number[]>([])

  const s: React.CSSProperties = { fontFamily: 'var(--fx-sans)' }
  const eyebrow: React.CSSProperties = { ...s, fontSize: 'var(--type-xs)', fontWeight: 700, textTransform: 'uppercase' as const, letterSpacing: '0.09em', color: 'var(--accent)', margin: 0 }
  const bodyText: React.CSSProperties = { ...s, fontSize: 'var(--type-sm)', color: 'var(--muted)', lineHeight: 'var(--lh-normal)', margin: 0 }
  const headText: React.CSSProperties = { ...s, fontSize: 'var(--type-base)', fontWeight: 700, color: 'var(--text)', margin: 0 }

  const atsSystems = [
    { name: 'Greenhouse', abbr: 'GH', color: '#24a148' },
    { name: 'Lever', abbr: 'LV', color: '#5b4fff' },
    { name: 'Workday', abbr: 'WD', color: '#0875e1' },
    { name: 'BambooHR', abbr: 'BB', color: '#73c41d' },
  ]

  const fieldMap = [
    { ats: 'Full Name',        flairx: 'Candidate Name',    ok: true  },
    { ats: 'Email Address',    flairx: 'Email',             ok: true  },
    { ats: 'Phone',            flairx: 'Contact Number',    ok: true  },
    { ats: 'Current Role',     flairx: 'Job Title',         ok: true  },
    { ats: 'Applied Position', flairx: 'Role Applied For',  ok: false },
  ]

  const candidates = [
    { name: 'Priya Nair',    role: 'Senior Product Designer', score: 94, issue: null         },
    { name: 'Arjun Mehta',   role: 'UX Researcher',           score: 87, issue: null         },
    { name: 'Sakura Tanaka', role: 'Product Designer',        score: 81, issue: 'Missing: Phone' },
    { name: 'Daniel Park',   role: 'UX Lead',                 score: 76, issue: null         },
    { name: 'Aisha Bello',   role: 'Visual Designer',         score: 70, issue: null         },
  ]

  const panelStyle: React.CSSProperties = {
    background: 'var(--card)',
    border: '1px solid var(--border)',
    borderRadius: 16,
    overflow: 'hidden',
  }

  const thStyle: React.CSSProperties = {
    ...s, fontSize: 'var(--type-xs)', fontWeight: 700,
    textTransform: 'uppercase' as const, letterSpacing: '0.09em',
    color: 'var(--dim)', padding: '10px 18px', textAlign: 'left' as const,
  }

  const tdStyle: React.CSSProperties = {
    ...bodyText, padding: '12px 18px', borderTop: '1px solid var(--border)',
  }

  /* ── screens ── */
  const screens = [

    /* 0 · Connect */
    <div key="connect">
      <div style={{ padding: '20px 24px 16px', borderBottom: '1px solid var(--border)' }}>
        <p style={eyebrow}>Stage 3 · ATS Integration</p>
        <p style={{ ...headText, fontSize: 'var(--type-lg)', marginTop: 6 }}>Connect your ATS</p>
        <p style={{ ...bodyText, marginTop: 8 }}>Select the system you use. FlairX pulls your existing candidate records and maps fields automatically.</p>
      </div>
      <div style={{ padding: '20px 24px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        {atsSystems.map(({ name, abbr, color }) => (
          <button key={name} onClick={() => setConnected(name)} style={{
            display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px',
            borderRadius: 12, cursor: 'pointer', textAlign: 'left' as const,
            border: `2px solid ${connected === name ? 'rgba(43,181,194,0.6)' : 'var(--border)'}`,
            background: connected === name ? 'rgba(43,181,194,0.05)' : 'var(--page-bg)',
            transition: 'border-color 0.15s, background 0.15s',
          }}>
            <span style={{
              width: 34, height: 34, borderRadius: 8, background: color,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0, color: '#fff', fontSize: 11, fontWeight: 800, fontFamily: 'var(--fx-sans)',
            }}>{abbr}</span>
            <div>
              <p style={{ ...headText, fontSize: 'var(--type-sm)' }}>{name}</p>
              {connected === name && <p style={{ ...eyebrow, fontSize: 9, marginTop: 2 }}>Selected</p>}
            </div>
          </button>
        ))}
      </div>
      <div style={{ padding: '0 24px 24px' }}>
        <button onClick={() => connected && setStep(1)} style={{
          ...s, width: '100%', padding: '12px', borderRadius: 12, border: 'none', cursor: connected ? 'pointer' : 'not-allowed',
          background: connected ? 'var(--text)' : 'var(--border)',
          color: connected ? '#fff' : 'var(--dim)',
          fontSize: 'var(--type-sm)', fontWeight: 600, transition: 'background 0.15s',
        }}>{connected ? `Connect ${connected} →` : 'Select a system to continue'}</button>
      </div>
    </div>,

    /* 1 · Field mapping */
    <div key="mapping">
      <div style={{ padding: '20px 24px 16px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: 12 }}>
        <button onClick={() => setStep(0)} style={{ ...s, background: 'none', border: 'none', cursor: 'pointer', color: 'var(--dim)', fontSize: 18, lineHeight: 1, padding: 0 }}>←</button>
        <div style={{ flex: 1 }}>
          <p style={eyebrow}>Step 2 · Field Mapping</p>
          <p style={{ ...headText, fontSize: 'var(--type-base)', marginTop: 4 }}>{connected} → FlairX</p>
        </div>
        <span style={{ ...bodyText, fontSize: 'var(--type-xs)', background: 'rgba(43,181,194,0.1)', color: 'var(--accent)', borderRadius: 20, padding: '3px 10px', fontWeight: 600 }}>
          Auto-mapped
        </span>
      </div>
      <div style={{ overflowX: 'auto' as const }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' as const }}>
          <thead>
            <tr style={{ background: 'var(--page-bg)' }}>
              <th style={thStyle}>{connected} field</th>
              <th style={{ ...thStyle, color: 'var(--accent)' }}>FlairX field</th>
              <th style={thStyle}>Status</th>
            </tr>
          </thead>
          <tbody>
            {fieldMap.map(({ ats, flairx, ok }) => (
              <tr key={ats} style={{ background: 'var(--card)' }}>
                <td style={{ ...tdStyle, color: 'var(--text)', fontWeight: 500 }}>{ats}</td>
                <td style={{ ...tdStyle, color: 'var(--text)', fontWeight: 500 }}>{flairx}</td>
                <td style={{ ...tdStyle }}>
                  {ok
                    ? <span style={{ color: 'var(--accent)', fontWeight: 700, fontSize: 'var(--type-xs)' }}>✓ Mapped</span>
                    : <span style={{ color: '#e07040', fontWeight: 700, fontSize: 'var(--type-xs)' }}>⚠ Review</span>
                  }
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div style={{ padding: '16px 24px', borderTop: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <p style={{ ...bodyText, fontSize: 'var(--type-xs)' }}>4 of 5 mapped automatically · 1 needs review</p>
        <button onClick={() => setStep(2)} style={{
          ...s, padding: '10px 22px', borderRadius: 10, border: 'none', cursor: 'pointer',
          background: 'var(--text)', color: '#fff', fontSize: 'var(--type-sm)', fontWeight: 600,
        }}>Pull candidates →</button>
      </div>
    </div>,

    /* 2 · Review & select */
    <div key="review">
      <div style={{ padding: '20px 24px 16px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: 12 }}>
        <button onClick={() => setStep(1)} style={{ ...s, background: 'none', border: 'none', cursor: 'pointer', color: 'var(--dim)', fontSize: 18, lineHeight: 1, padding: 0 }}>←</button>
        <div style={{ flex: 1 }}>
          <p style={eyebrow}>Step 3 · Review Candidates</p>
          <p style={{ ...headText, fontSize: 'var(--type-base)', marginTop: 4 }}>5 candidates found in {connected}</p>
        </div>
        <span style={{ ...bodyText, fontSize: 'var(--type-xs)', fontWeight: 600, color: 'var(--accent)' }}>
          {selected.length} selected
        </span>
      </div>
      <table style={{ width: '100%', borderCollapse: 'collapse' as const }}>
        <thead>
          <tr style={{ background: 'var(--page-bg)' }}>
            <th style={{ ...thStyle, width: 40 }}>
              <div
                onClick={() => setSelected(selected.length === candidates.length ? [] : candidates.map((_, i) => i))}
                style={{
                  width: 16, height: 16, borderRadius: 4, margin: '0 auto',
                  border: `2px solid ${selected.length === candidates.length ? 'var(--accent)' : 'var(--border)'}`,
                  background: selected.length === candidates.length ? 'var(--accent)' : selected.length > 0 ? 'rgba(43,181,194,0.3)' : 'transparent',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#fff', fontSize: 10, cursor: 'pointer',
                }}>{selected.length === candidates.length ? '✓' : selected.length > 0 ? '–' : ''}</div>
            </th>
            <th style={thStyle}>Candidate</th>
            <th style={thStyle}>Match</th>
            <th style={thStyle}>Status</th>
          </tr>
        </thead>
        <tbody>
          {candidates.map(({ name, role, score, issue }, i) => {
            const on = selected.includes(i)
            return (
              <tr key={name} onClick={() => setSelected(p => on ? p.filter(x => x !== i) : [...p, i])}
                style={{ cursor: 'pointer', background: on ? 'rgba(43,181,194,0.04)' : 'var(--card)', transition: 'background 0.12s' }}>
                <td style={{ ...tdStyle, textAlign: 'center' as const }}>
                  <div style={{
                    width: 16, height: 16, borderRadius: 4, margin: '0 auto',
                    border: `2px solid ${on ? 'var(--accent)' : 'var(--border)'}`,
                    background: on ? 'var(--accent)' : 'transparent',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: '#fff', fontSize: 10,
                  }}>{on ? '✓' : ''}</div>
                </td>
                <td style={tdStyle}>
                  <p style={{ ...s, fontSize: 'var(--type-sm)', fontWeight: 600, color: 'var(--text)', margin: 0 }}>{name}</p>
                  <p style={{ ...bodyText, fontSize: 12, marginTop: 2 }}>{role}</p>
                </td>
                <td style={{ ...tdStyle, fontWeight: 700, color: score >= 85 ? 'var(--accent)' : score >= 75 ? 'var(--text)' : 'var(--muted)' }}>
                  {score}%
                </td>
                <td style={tdStyle}>
                  {issue
                    ? <span style={{ ...s, fontSize: 12, color: '#e07040', fontWeight: 600 }}>{issue}</span>
                    : <span style={{ ...s, fontSize: 12, color: 'var(--accent)', fontWeight: 600 }}>Ready</span>
                  }
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
      <div style={{ padding: '16px 24px', borderTop: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <p style={{ ...bodyText, fontSize: 'var(--type-xs)' }}>Duplicates checked automatically before import</p>
        <button onClick={() => selected.length > 0 && setStep(3)} style={{
          ...s, padding: '10px 22px', borderRadius: 10, border: 'none',
          cursor: selected.length > 0 ? 'pointer' : 'not-allowed',
          background: selected.length > 0 ? 'var(--text)' : 'var(--border)',
          color: selected.length > 0 ? '#fff' : 'var(--dim)',
          fontSize: 'var(--type-sm)', fontWeight: 600, transition: 'background 0.15s',
        }}>{selected.length > 0 ? `Import ${selected.length} →` : 'Select candidates'}</button>
      </div>
    </div>,

    /* 3 · Done */
    <div key="done" style={{ padding: '32px 24px', textAlign: 'center' as const }}>
      <div style={{
        width: 52, height: 52, borderRadius: '50%', background: 'rgba(43,181,194,0.1)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px',
        color: 'var(--accent)', fontSize: 22,
      }}>✓</div>
      <p style={{ ...headText, fontSize: 'var(--type-xl)', marginBottom: 6 }}>{selected.length} candidate{selected.length !== 1 ? 's' : ''} imported</p>
      <p style={{ ...bodyText, marginBottom: 24 }}>Fields mapped from {connected}. All records are in the candidate pipeline, ready for review.</p>
      <div style={{ background: 'var(--page-bg)', border: '1px solid var(--border)', borderRadius: 12, padding: '16px 20px', marginBottom: 24, textAlign: 'left' as const }}>
        {[
          ['Source', connected],
          ['Fields mapped', '4 of 5 auto · 1 manual'],
          ['Duplicates caught', '0'],
          ['Candidates imported', `${selected.length}`],
        ].map(([k, v]) => (
          <div key={k} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
            <p style={bodyText}>{k}</p>
            <p style={{ ...s, fontSize: 'var(--type-sm)', fontWeight: 600, color: 'var(--text)', margin: 0 }}>{v}</p>
          </div>
        ))}
      </div>
      <button onClick={() => { setStep(0); setConnected(''); setSelected([]) }} style={{
        ...s, padding: '11px 28px', borderRadius: 10, border: 'none', cursor: 'pointer',
        background: 'var(--text)', color: '#fff', fontSize: 'var(--type-sm)', fontWeight: 600,
      }}>Import another source</button>
    </div>,
  ]

  const stepLabels = ['Connect', 'Map fields', 'Review candidates', 'Done']

  return (
    <div>
      {/* Stepper */}
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: 24, gap: 0, overflowX: 'auto', WebkitOverflowScrolling: 'touch' as const, paddingBottom: 2 }}>
        {stepLabels.map((l, i) => (
          <div key={l} style={{ display: 'flex', alignItems: 'center', flexShrink: 0, flex: i < stepLabels.length - 1 ? '1 0 auto' : '0 0 auto' }}>
            <button onClick={() => setStep(i)} style={{
              ...s, display: 'flex', alignItems: 'center', gap: 8, padding: '7px 0',
              background: 'none', border: 'none', cursor: 'pointer', whiteSpace: 'nowrap' as const,
            }}>
              <span style={{
                width: 22, height: 22, borderRadius: '50%', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: step > i ? 'var(--accent)' : step === i ? 'var(--text)' : 'var(--border)',
                color: step >= i ? '#fff' : 'var(--dim)', fontSize: 11, fontWeight: 700,
              }}>{step > i ? '✓' : i + 1}</span>
              <span style={{ fontSize: 'var(--type-sm)', fontWeight: step === i ? 700 : 400, color: step === i ? 'var(--text)' : 'var(--dim)' }}>{l}</span>
            </button>
            {i < stepLabels.length - 1 && (
              <div style={{ flex: 1, height: 1, background: step > i ? 'var(--accent)' : 'var(--border)', margin: '0 12px', minWidth: 20, opacity: step > i ? 0.5 : 1 }} />
            )}
          </div>
        ))}
      </div>

      {/* Screen panel */}
      <div style={panelStyle}>
        {screens[step]}
      </div>

      <p style={{ ...bodyText, fontSize: 12, marginTop: 14, textAlign: 'center' as const }}>
        Stage 3 · ATS Integration · interactive prototype, click through the full flow
      </p>
    </div>
  )
}

/* ── Page ─────────────────────────────────────────────────────────── */
export default function FlairXPage() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const NAV = [
      { id: 'context',    num: '01', label: 'Context'    },
      { id: 'problem',    num: '02', label: 'Problem'    },
      { id: 'ideation',   num: '03', label: 'Ideation'   },
      { id: 'decisions',  num: '04', label: 'Decisions'  },
      { id: 'finals',        num: '05', label: 'Finals'      },
      { id: 'ats-prototype', num: '06', label: 'ATS Flow'    },
      { id: 'edgecases',     num: '07', label: 'Edge Cases'  },
      { id: 'impact',     num: '08', label: 'Impact'     },
      { id: 'handoff',    num: '09', label: 'Handoff'  },
      { id: 'reflection', num: '10', label: 'Reflection' },
    ]

    const sections   = NAV.map(n => document.getElementById(n.id)).filter(Boolean) as HTMLElement[]
    const vLinks     = Array.from(document.querySelectorAll('.fx-v-link')) as HTMLElement[]
    const fill       = document.querySelector('.fx-v-fill') as HTMLElement | null
    const total      = sections.length

    function activate(index: number) {
      if (fill) {
        gsap.to(fill, { height: `${((index + 1) / total) * 100}%`, duration: 0.55, ease: 'power3.out' })
      }
      vLinks.forEach((link, i) => link.classList.toggle('fx-v-on', i === index))
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
    <>
      <div className="fx-page" style={{ paddingTop: 64 }}>

        {/* ── VERTICAL SCROLLSPY NAV ──────────────────────── */}
        <nav className="fx-v-nav" aria-label="Page sections">
          <div className="fx-v-track">
            <div className="fx-v-fill" style={{ height: '12.5%' }}></div>
          </div>
          <div className="fx-v-items">
            {[
              { href: '#context',       n: '01', label: 'Context'    },
              { href: '#problem',       n: '02', label: 'Problem'    },
              { href: '#ideation',      n: '03', label: 'Ideation'   },
              { href: '#decisions',     n: '04', label: 'Decisions'  },
              { href: '#finals',        n: '05', label: 'Finals'     },
              { href: '#ats-prototype', n: '06', label: 'ATS Flow'   },
              { href: '#edgecases',     n: '07', label: 'Edge Cases' },
              { href: '#impact',        n: '08', label: 'Impact'     },
              { href: '#handoff',       n: '09', label: 'Handoff'    },
              { href: '#reflection',    n: '10', label: 'Reflection' },
            ].map(({ href, n, label }) => (
              <a key={href} href={href} className="fx-v-link">
                <span className="fx-v-num">{n}</span>
                <span className="fx-v-label">{label}</span>
              </a>
            ))}
          </div>
        </nav>

        {/* ── HERO ────────────────────────────────────────── */}
        <section className="fx-hero" id="hero">
          <div className="fx-container">
            <Reveal>
            <Link href="/#work" className="fx-back-link" onClick={() => sessionStorage.setItem('skipIntro', '1')}>← Back to work</Link>
            <p className="fx-eyebrow">Product Design · Live Product · FlairX AI</p>
            <h1 className="fx-hero-title" style={{ whiteSpace: 'nowrap' }}>Redesigning the Recruiter Workflow</h1>
            <p className="fx-hero-sub">
              Recruiters at FlairX were spending 2 hrs just getting candidates into the system.
              I redesigned the intake flow across all three upload paths until that dropped to 30 min.
            </p>

            <div className="cs-hero-figure">
              <CaseFigure
                src={FX.entryPoint}
                alt="FlairX candidate upload screen, the entry point to the redesigned intake flow"
                variant="plain"
                maxWidth={880}
              />
            </div>

            <div className="fx-summary-card">
              <div className="fx-summary-top">
                <p className="fx-summary-hmw">
                  <strong>The challenge:</strong> Make the AI worth using without making recruiters feel like it was making decisions for them. Single upload, bulk, CSV. Three different paths, each with its own way of breaking, each with its own trust problem.
                </p>
                <span className="fx-status-live">Live Product</span>
              </div>
              <div className="fx-summary-meta">
                <div className="fx-smeta-item">
                  <span className="fx-smeta-k">Role</span>
                  <span className="fx-smeta-v">Founding Product Designer</span>
                </div>
                <div className="fx-smeta-item">
                  <span className="fx-smeta-k">Company</span>
                  <span className="fx-smeta-v">FlairX AI</span>
                </div>
                <div className="fx-smeta-item">
                  <span className="fx-smeta-k">Year</span>
                  <span className="fx-smeta-v">2025</span>
                </div>
                <div className="fx-smeta-item">
                  <span className="fx-smeta-k">Duration</span>
                  <span className="fx-smeta-v">Apr – Dec 2025</span>
                </div>
                <div className="fx-smeta-item">
                  <span className="fx-smeta-k">Tools</span>
                  <span className="fx-smeta-v">Figma · Notion · Jira · Lovable · Claude</span>
                </div>
              </div>
              <div className="fx-summary-cols">
                <div className="fx-sum-col fx-sum-problem">
                  <div className="fx-sum-head">
                    <span className="fx-sum-label">The Problem</span>
                  </div>
                  <ul>
                    <li>Every candidate field typed by hand, every time</li>
                    <li>Bulk uploads dropped data. Nobody trusted them.</li>
                    <li>Same candidate could end up entered twice with no warning</li>
                  </ul>
                </div>
                <div className="fx-sum-col fx-sum-approach">
                  <div className="fx-sum-head">
                    <span className="fx-sum-label">What I did</span>
                  </div>
                  <ul>
                    <li>AI fills the form. Recruiters check it.</li>
                    <li>Errors show up where you are, not at the end</li>
                    <li>All three paths rebuilt at the same time</li>
                  </ul>
                </div>
                <div className="fx-sum-col fx-sum-result">
                  <div className="fx-sum-head">
                    <span className="fx-sum-label">Result</span>
                  </div>
                  <ul>
                    <li><strong>2 hrs → 30 min</strong> to process a résumé batch</li>
                    <li>130 hires sourced through the new flow</li>
                    <li>Duplicates caught automatically, no checking required</li>
                  </ul>
                </div>
              </div>
            </div>
            </Reveal>
          </div>
        </section>

        {/* ── 01 CONTEXT ──────────────────────────────────── */}
        <section className="fx-sec" id="context">
          <div className="fx-container">
            <Reveal>
            <p className="fx-sec-label">01 · Context</p>
            <h2 className="fx-sec-title">The intake flow was slow and manual. I had three workflows to fix at once.</h2>

            <div className="fx-ctx-rows">
              {[
                {
                  label: 'The ask',
                  text: 'Make the whole candidate intake process faster, and make the AI that was already built into the product actually worth having.',
                },
                {
                  label: 'What I inherited',
                  text: "Every field typed by hand. Every time. A recruiter couldn't start scheduling until they'd finished data entry, which could take hours depending on the batch size.",
                },
                {
                  label: 'The scope',
                  text: 'Résumé parsing, bulk uploads, and ATS integrations. All three redesigned at the same time, not one at a time.',
                },
                {
                  label: 'The constraint',
                  text: "Recruiters had to stay in control. The automation was there to save time, not to make the system feel like a black box. If it can't tell you what it did, it shouldn't do it quietly.",
                },
                {
                  label: 'Collaborators',
                  text: 'Founder/CEO, product team, frontend and backend engineers.',
                },
                {
                  label: 'Timeline',
                  text: 'Month 1: discovery sprint (6 recruiter interviews, flow mapping, competitive audit). Month 2: design, wireframes, prototypes, 3 rounds of testing with internal users. Month 3: final designs, edge case coverage, dev handoff.',
                },
              ].map(({ label, text }) => (
                <div key={label} className="fx-ctx-row">
                  <span className="fx-ctx-key">{label}</span>
                  <p className="fx-ctx-val">{text}</p>
                </div>
              ))}
            </div>
            </Reveal>
          </div>
        </section>

        {/* ── 02 PROBLEM ──────────────────────────────────── */}
        <section className="fx-sec fx-sec-alt" id="problem">
          <div className="fx-container">
            <Reveal>
            <p className="fx-sec-label">02 · The Problem</p>
            <h2 className="fx-sec-title">Hours of data entry before the first interview. That was the baseline.</h2>

            <ul className="fx-bullets" style={{ marginBottom: 40 }}>
              {[
                'Every candidate field filled in by hand. The AI existed but nothing actually used it.',
                'No batch uploads. One résumé at a time.',
                'CSV uploads scrambled data. Or lost it. Recruiters stopped trusting them.',
                'No duplicate detection, so the same person could end up in the system twice without anyone noticing.',
                'The product had AI built in. Nobody used it.',
              ].map(item => <li key={item}>{item}</li>)}
            </ul>

            <blockquote className="fx-pull-quote">
              &ldquo;Why am I entering the same information again and again?&rdquo;
            </blockquote>

            <p style={{ fontFamily: 'var(--fx-sans)', fontSize: 'var(--type-sm)', color: 'var(--dim)', lineHeight: 'var(--lh-normal)', margin: '0 0 20px', fontStyle: 'italic' }}>
              These quotes came from structured interviews with 6 recruiters at FlairX during a 2-week discovery sprint at the start of the project, before any design work began.
            </p>

            <div className="fx-evidence-row">
              {[
                { src: 'Recruiter', tag: 'Manual entry',   quote: "Why am I entering the same information again and again?" },
                { src: 'Recruiter', tag: 'Bulk uploads',   quote: "Bulk uploads break or miss details. I don't trust it." },
                { src: 'Recruiter', tag: 'Error handling', quote: "If I make one mistake, the entire flow collapses." },
                { src: 'Recruiter', tag: 'Automation',     quote: "I wish the system would just do this for me." },
              ].map(({ src, tag, quote }) => (
                <div key={tag} className="fx-evidence-card">
                  <div className="fx-evidence-head">
                    <span className="fx-evidence-src">{src}</span>
                    <span className="fx-evidence-tag">{tag}</span>
                  </div>
                  <p>&ldquo;{quote}&rdquo;</p>
                </div>
              ))}
            </div>

            <div className="fx-before-row">
              <img src={FX.beforeMockup} alt="The original upload flow before the redesign" className="fx-before-img" />
              <div style={{ flex: 1 }}>
                <span className="fx-before-label">Before</span>
                <ul className="fx-bullets">
                  {[
                    'Scheduling started before anyone had finished entering the data',
                    'No feedback while files were processing. You uploaded and waited.',
                    'Errors showed up at the end, after all the work was already done',
                    'Every field typed by hand, every time',
                  ].map(item => <li key={item}>{item}</li>)}
                </ul>
              </div>
            </div>
            </Reveal>
          </div>
        </section>

        {/* ── 03 IDEATION & FLOW ──────────────────────────── */}
        <section className="fx-sec" id="ideation">
          <div className="fx-container">
            <Reveal>
            <p className="fx-sec-label">03 · Ideation &amp; Flow</p>
            <h2 className="fx-sec-title">Three separate workflows with enough in common to solve at once.</h2>

            <ul className="fx-bullets" style={{ marginBottom: 36 }}>
              {[
                'Started by mapping all three areas: CSV, résumé parsing, and ATS integrations',
                'Ran several directions in parallel before anything got built',
                'Drew a clear line between what the AI should handle and what the recruiter had to decide',
                'Cut anything that made the recruiter do work the system could do itself',
              ].map(item => <li key={item}>{item}</li>)}
            </ul>

            <div style={{ maxWidth: '72%' }}>
              <FlairXFlowChart />
            </div>
            </Reveal>
          </div>
        </section>

        {/* ── 04 DESIGN DECISIONS ─────────────────────────── */}
        <section className="fx-sec fx-sec-alt" id="decisions">
          <div className="fx-container">
            <Reveal>
            <p className="fx-sec-label">04 · Design Decisions</p>
            <h2 className="fx-sec-title">The four calls that actually mattered.</h2>
            <p className="fx-hero-sub" style={{ marginBottom: 40 }}>
              The obvious fix looked like a cleaner form. It wasn&apos;t the problem, and testing it is what proved that.
            </p>

            <div className="fx-ruled-out">
              <span className="fx-ruled-out-label">What I ruled out first</span>
              <div className="fx-ruled-out-grid">
                {[
                  {
                    name: 'Early direction',
                    img: FX.case1,
                    desc: "Cleaner field layout, restructured intake steps. But still manual. The AI was there and completely ignored. It didn't solve the right problem.",
                  },
                  {
                    name: 'Multi-screen flow',
                    img: FX.case2,
                    desc: 'Spread upload, validation, and review across separate pages. It looked organized on paper. In testing, people kept losing track of where they were.',
                  },
                ].map(({ name, img, desc }) => (
                  <div key={name} className="fx-ruled-out-item">
                    <img src={img} alt={name} />
                    <div className="fx-ruled-out-body">
                      <span className="fx-ruled-out-name">{name}</span>
                      <p className="fx-ruled-out-desc">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="fx-decisions-list">
              {[
                {
                  num: '01',
                  title: 'AI-first, not manual-first',
                  what: 'Upload a résumé, the system fills in the fields. You review what it got. You are not starting from a blank form.',
                  why: "If I hand you a pre-filled form and ask you to check it, that is a completely different job than handing you a blank one. You're correcting instead of creating. That shift matters more than it sounds.",
                  diff: "I'd want to test what happens when the AI gets a field wrong. Does a wrong pre-fill feel worse than a blank? I don't actually know. That needs real data.",
                },
                {
                  num: '02',
                  title: 'One page, not multiple screens',
                  what: 'Upload, review, confirm. All one page. No back button, no losing your place.',
                  why: 'Multiple screens failed in testing. People lost track of where they were and what was left. One long page with a clear sense of progress worked better.',
                  diff: "I'd want to test this with someone doing 100+ candidates in a session. At that volume, a page that long might get exhausting. A stepper could work better. I haven't tested it at that scale.",
                },
                {
                  num: '03',
                  title: 'Bulk as a first-class workflow',
                  what: 'Bulk upload has its own dedicated flow: parsing progress in real time, a summary table, inline editing for anything the AI missed.',
                  why: "In the old system it was an afterthought. It lost data and gave you no feedback while it was working. Recruiters doing high-volume hiring needed it to actually be reliable.",
                  diff: "Parsing everything synchronously blocks the UI on large batches. I'd look at async processing with a notification when it finishes so recruiters can do something else while they wait.",
                },
                {
                  num: '04',
                  title: 'Errors where they happen',
                  what: 'If a field is wrong or missing, it shows in the review table right where the problem is. Nothing blocks you until you have actually seen the issue.',
                  why: "A separate error screen means stopping, reading a list, then going back. Inline means you fix the phone number while you're looking at that row. Much less switching around.",
                  diff: "I'd add undo for dismissed warnings. Recruiters close things by accident, and right now the only way to get that back is to reprocess the whole file.",
                },
              ].map(({ num, title, what, why, diff }) => (
                <div key={num} className="fx-decision">
                  <div className="fx-decision-num">{num}</div>
                  <div className="fx-decision-body">
                    <h3>{title}</h3>
                    {[
                      { label: 'What I did',              text: what },
                      { label: 'Why',                     text: why  },
                      { label: "What I'd do differently", text: diff },
                    ].map(({ label, text }) => (
                      <div key={label} className="fx-dblock">
                        <span className="fx-dblock-label">{label}</span>
                        <p>{text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            </Reveal>
          </div>
        </section>

        {/* ── 05 FINAL DESIGNS ────────────────────────────── */}
        <section className="fx-sec" id="finals">
          <div className="fx-container">
            <Reveal>
            <p className="fx-sec-label">05 · Final Designs</p>
            <h2 className="fx-sec-title">What each upload path actually looks like.</h2>

            {[
              {
                title: 'Single upload',
                img: FX.singleUpload,
                alt: 'Single upload flow',
                bullets: [
                  'Drop in a résumé, the system fills in the fields',
                  'Review what it got right. Fix what it missed.',
                  'One page: upload, review, confirm',
                  'You are editing, not entering from scratch',
                ],
              },
              {
                title: 'Bulk upload',
                img: FX.bulkUpload,
                alt: 'Bulk upload flow',
                bullets: [
                  'Drop in a batch of résumés, all processed at once',
                  'Parsing progress shows in real time as files come through',
                  'Incomplete fields show inline in the review table',
                  'Fix errors directly in the table, no separate forms',
                ],
              },
              {
                title: 'CSV upload',
                img: FX.csvUpload,
                alt: 'CSV upload flow',
                bullets: [
                  'For teams who work from spreadsheets',
                  'System maps CSV columns to candidate fields automatically',
                  'Mismatches show before any data gets committed',
                  'Fix conflicts inline before anything is imported',
                ],
              },
            ].map(({ title, img, alt, bullets }) => (
              <div key={title} className="fx-design-block">
                <h3 className="fx-design-title">{title}</h3>
                <CaseFigure src={img} alt={alt} variant="browser" />
                <ul className="fx-bullets">
                  {bullets.map(item => <li key={item}>{item}</li>)}
                </ul>
              </div>
            ))}
            </Reveal>
          </div>
        </section>

        {/* ── 05.5 ATS INTEGRATION PROTOTYPE ─────────────── */}
        <section className="fx-sec fx-sec-alt" id="ats-prototype">
          <div className="fx-container">
            <Reveal>
            <p className="fx-sec-label">06 · Stage 3 · ATS Integration</p>
            <h2 className="fx-sec-title">What connecting to an ATS would look like.</h2>

            <div className="fx-prose" style={{ marginBottom: 36 }}>
              <p>Stage 3 was the most technically opaque part of the flow for recruiters. They knew they needed their ATS data in FlairX, but had no mental model for how that transfer would work. This is what I designed for it: a flow where you can see exactly what&apos;s being pulled, which fields map where, and confirm before anything lands in the pipeline.</p>
            </div>

            <ATSPrototype />
            </Reveal>
          </div>
        </section>

        {/* ── 06 EDGE CASES ───────────────────────────────── */}
        <section className="fx-sec fx-sec-alt" id="edgecases">
          <div className="fx-container">
            <Reveal>
            <p className="fx-sec-label">07 · Edge Cases</p>
            <h2 className="fx-sec-title">Real hiring doesn&apos;t go smoothly. The system had to be ready for that.</h2>

            <div style={{ marginBottom: 48 }}>
              <span className="fx-sub-label">Mixed uploading: some files fail, some go through</span>
              <CaseFigure src={FX.edgeCase1} alt="Mixed upload states" caption="Files split across uploading, failed, and done states" variant="browser" />
              <ul className="fx-bullets">
                {[
                  'One file failing does not stop the others',
                  'Files split into three states: uploading, failed, done',
                  'Parsing stays locked until everything that can be processed is finished',
                  'Cancelling only stops what is still uploading. Completed files stay.',
                ].map(item => <li key={item}>{item}</li>)}
              </ul>
            </div>

            <div style={{ marginBottom: 48 }}>
              <span className="fx-sub-label">When the AI misses fields</span>
              <CaseFigure src={FX.edgeCase2} alt="Missing fields after parsing" caption="Only the fields the AI missed get flagged inline" variant="browser" />
              <ul className="fx-bullets">
                {[
                  'Required fields the AI could not extract show inline in the review table',
                  'Only the broken fields get flagged. Everything else stays clean.',
                  'Fix it in place, without opening anything else',
                  'What used to mean starting over now takes a few seconds',
                ].map(item => <li key={item}>{item}</li>)}
              </ul>
            </div>

            <div>
              <span className="fx-sub-label">Preventive alerts</span>
              <ul className="fx-bullets" style={{ marginBottom: 28 }}>
                {[
                  "Stops you losing work if you navigate away mid-upload",
                  "Won't let a job post until the candidate data is actually ready",
                  "Nothing bad gets in quietly",
                ].map(item => <li key={item}>{item}</li>)}
              </ul>
              <div className="fx-alerts-grid">
                {[
                  {
                    src: FX.alert1,
                    title: 'Unsaved files warning',
                    bullets: [
                      'Shows if you try to leave mid-upload',
                      'Makes you confirm before anything is discarded',
                      'Same behavior in bulk and single sessions',
                    ],
                  },
                  {
                    src: FX.alert2,
                    title: 'Failed files notice',
                    bullets: [
                      'Shows exactly which files failed or are still processing',
                      'Failed files are skipped at the parsing step automatically',
                      'You know before you move on, not after',
                    ],
                  },
                  {
                    src: FX.alert3,
                    title: 'Empty pipeline warning',
                    bullets: [
                      'Fires if you try to post a job with no candidates',
                      'Makes you add at least one candidate first',
                      'A simple check that catches an embarrassing mistake',
                    ],
                  },
                  {
                    src: FX.alert4,
                    title: 'Required fields block',
                    bullets: [
                      'Submission is locked until required fields are filled',
                      'Shows exactly which fields are missing, right there in the row',
                      'Nothing incomplete gets into the system',
                    ],
                  },
                  {
                    src: FX.alert5,
                    title: 'Duplicate detection',
                    bullets: [
                      'Checks if the candidate already exists before adding them',
                      'Flags the duplicate before it lands in the pipeline',
                      'Keeps the database clean without anyone having to look',
                    ],
                  },
                ].map(({ src, title, bullets }) => (
                  <div key={title} className="fx-alert-card">
                    <img src={src} alt={title} />
                    <p className="fx-alert-title">{title}</p>
                    <ul className="fx-bullets">
                      {bullets.map(b => <li key={b} style={{ fontSize: 13.5 }}>{b}</li>)}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
            </Reveal>
          </div>
        </section>

        {/* ── 07 IMPACT ───────────────────────────────────── */}
        <section className="fx-sec" id="impact">
          <div className="fx-container">
            <Reveal>
            <p className="fx-sec-label">08 · Impact</p>
            <h2 className="fx-sec-title">It shipped, it worked, and it changed how the team hired.</h2>

            <div className="fx-outcomes">
              {[
                {
                  num: '01',
                  metric: '2 hrs → 30 min',
                  desc: 'Processing a batch of résumés went from 2 hrs to a coffee break.',
                },
                {
                  num: '02',
                  metric: '130 hires through the flow',
                  desc: '130 candidates were hired from roles sourced and processed entirely through the redesigned intake flow in the first six months (founder-reported, from pipeline data). The redesign owns the intake, not the hiring call, but every one of those hires moved through it.',
                },
                {
                  num: '03',
                  metric: 'Duplicates eliminated',
                  desc: 'The system catches repeated entries automatically. Nobody has to check by hand anymore.',
                },
                {
                  num: '04',
                  metric: 'Bulk uploads got reliable',
                  desc: 'Recruiters stopped dreading high-volume days. They knew what was happening at every step.',
                },
              ].map(({ num, metric, desc }) => (
                <div key={num} className="fx-outcome-item">
                  <div className="fx-outcome-num">{num}</div>
                  <div>
                    <p className="fx-outcome-metric">{metric}</p>
                    <p className="fx-outcome-desc">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
            </Reveal>
          </div>
        </section>

        {/* ── 07.5 HANDOFF ────────────────────────────────── */}
        <section className="fx-sec" id="handoff">
          <div className="fx-container">
            <Reveal>
            <p className="fx-sec-label">09 · Handoff</p>
            <h2 className="fx-sec-title">What the engineers actually received.</h2>

            <div className="fx-prose">
              <p>The design handoff covered all three upload paths, every edge case, and the full alert system. Engineers received a Figma file with component-level annotations, interaction states documented in Notion, and a Jira ticket per feature with acceptance criteria written against observed user behavior, not against design spec.</p>
            </div>

            <div className="fx-decisions-list">
              {[
                {
                  num: '01',
                  title: 'Figma component library',
                  text: 'Every screen in the intake flow built from reusable components with explicit state coverage: default, hover, loading, error, success, disabled.',
                },
                {
                  num: '02',
                  title: 'Interaction annotations',
                  text: 'Inline notes on every non-obvious behavior: what triggers the duplicate detection, what cancels an in-progress upload, how the AI confidence threshold maps to the review table display.',
                },
                {
                  num: '03',
                  title: 'Edge case matrix',
                  text: 'A documented matrix of every failure mode we designed for: mixed upload states, AI misses, unsaved files warning, empty pipeline. Expected behavior for each.',
                },
              ].map(({ num, title, text }) => (
                <div key={num} className="fx-decision">
                  <div className="fx-decision-num">{num}</div>
                  <div className="fx-decision-body">
                    <h3>{title}</h3>
                    <div className="fx-dblock">
                      <p>{text}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            </Reveal>
          </div>
        </section>

        {/* ── 08 REFLECTION ───────────────────────────────── */}
        <section className="fx-sec fx-sec-alt" id="reflection">
          <div className="fx-container">
            <Reveal>
            <p className="fx-sec-label">10 · Reflection</p>
            <h2 className="fx-sec-title">The hardest design call was knowing when to stay quiet.</h2>

            <div className="fx-prose">
              <p>Showing AI reasoning on every card created noise that made people trust the system less, not more. Early prototypes showed everything: the confidence score, the extracted fields, the source data. Recruiters didn&apos;t feel informed. They felt watched.</p>
              <p>The final design shows its reasoning only when confidence is low, or when a recruiter stops to look. When the AI is sure, it just fills the field. When it&apos;s not, it flags it. That calibration wasn&apos;t in the brief. It came out of watching people use the early version and noticing where they flinched.</p>
            </div>

            <div className="fx-reflection-callout">
              <span className="fx-reflection-label">What I&apos;d do differently</span>
              <p>I&apos;d want to sit with recruiters doing 100+ candidates in a day. The single-page flow works fine at normal volume, but at that scale it might get exhausting. A stepper with clear checkpoints could work better. I haven&apos;t tested it and I don&apos;t know for sure.</p>
            </div>
            </Reveal>
          </div>
        </section>

        {/* ── FOOTER ──────────────────────────────────────── */}
        <footer className="fx-footer">
          <div className="fx-container">
            <blockquote className="fx-footer-quote">
              &ldquo;We were paying our recruiter by the hour. This paid for itself.&rdquo;
              <cite>Founder, FlairX</cite>
            </blockquote>
            <Link href="/#work" className="fx-footer-back" onClick={() => sessionStorage.setItem('skipIntro', '1')}>
              ← Back to work
            </Link>
          </div>
        </footer>

      </div>
    </>
  )
}
