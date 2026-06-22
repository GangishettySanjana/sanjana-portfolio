import Link from 'next/link'

const STYLES = [
  { slug: 'swiss', name: '1 · Swiss-bold grid', desc: 'High-contrast, oversized grotesk, ruled grid, big index numerals. Structured + confident.' },
  { slug: 'studio', name: '2 · Warm studio (material)', desc: 'Committed putty + terracotta + sage. Tactile, premium, your interior-design origin.' },
  { slug: 'drench', name: '3 · Type-drench (cobalt)', desc: 'One bold color owns the page, giant display type, acid accent. Loud + art-directed.' },
  { slug: 'dark', name: '4 · Cinematic warm-dark', desc: 'Warm near-black, amber accent, big imagery. Moody + premium (not techy).' },
  { slug: 'minimal', name: '5 · Quiet-luxury minimal', desc: 'Neutral off-white, tiny refined type, huge whitespace. Restraint = expensive.' },
]

export default function CaseStylesIndex() {
  return (
    <main style={{ minHeight: '100vh', background: '#fff', color: '#111', fontFamily: "'Satoshi', system-ui, sans-serif", padding: 'clamp(60px,10vh,120px) clamp(24px,5vw,80px)' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <p style={{ fontFamily: "'Geist Mono', ui-monospace, monospace", fontSize: 12, color: '#888', marginBottom: 12 }}>case-study direction · pick one</p>
        <h1 style={{ fontFamily: "'Cabinet Grotesk', system-ui, sans-serif", fontWeight: 800, fontSize: 'clamp(32px,5vw,52px)', letterSpacing: '-0.03em', lineHeight: 1.05, margin: '0 0 32px' }}>Five directions</h1>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {STYLES.map((s) => (
            <Link key={s.slug} href={`/case-styles/${s.slug}`}
              style={{ display: 'block', textDecoration: 'none', color: 'inherit', padding: '22px 0', borderTop: '1px solid rgba(0,0,0,0.1)' }}>
              <div style={{ fontFamily: "'Cabinet Grotesk', system-ui, sans-serif", fontWeight: 700, fontSize: 20, marginBottom: 6 }}>{s.name} →</div>
              <div style={{ fontSize: 15, color: 'rgba(0,0,0,0.6)', lineHeight: 1.6 }}>{s.desc}</div>
            </Link>
          ))}
          <div style={{ borderTop: '1px solid rgba(0,0,0,0.1)' }} />
        </div>
      </div>
    </main>
  )
}
