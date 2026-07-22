'use client'

import Link from 'next/link'

const teal = '#1a7a7a'
const navy = '#002448'
const cream = '#F7F3EE'
const muted = '#6B7280'

export default function ResumePage() {
  return (
    <>
      <style>{`
        @media print {
          .no-print { display: none !important; }
          body { background: #fff !important; }
          .resume-shell { padding: 0 !important; background: #fff !important; }
          .resume-page { box-shadow: none !important; border-radius: 0 !important; max-width: 100% !important; }
          .resume-header { border-radius: 0 !important; }
        }
        .exp-item + .exp-item { border-top: 1px solid rgba(0,0,0,0.07); padding-top: 28px; margin-top: 28px; }
        .skill-chip { display: inline-block; background: rgba(26,122,122,0.08); color: ${teal}; border-radius: 999px; padding: 4px 12px; font-size: 12px; font-family: var(--font-label, sans-serif); letter-spacing: 0.06em; margin: 3px; }
      `}</style>

      {/* Nav strip */}
      <div className="no-print" style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, background: 'rgba(247,243,238,0.92)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(0,0,0,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 32px' }}>
        <Link href="/" style={{ fontFamily: 'var(--font-label, sans-serif)', fontSize: 13, letterSpacing: '0.08em', textTransform: 'uppercase', color: navy, textDecoration: 'none', opacity: 0.7 }}>
          ← Back
        </Link>
        <button onClick={() => window.print()} style={{ fontFamily: 'var(--font-label, sans-serif)', fontSize: 12, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#fff', background: teal, borderRadius: 999, padding: '8px 20px', border: 'none', cursor: 'pointer' }}>
          Save as PDF ↓
        </button>
      </div>

      {/* Shell */}
      <div className="resume-shell" style={{ background: cream, minHeight: '100vh', paddingTop: 80, paddingBottom: 48, paddingLeft: 16, paddingRight: 16 }}>
        <div className="resume-page" style={{ maxWidth: 860, margin: '0 auto', background: '#fff', borderRadius: 20, overflow: 'hidden', boxShadow: '0 8px 48px rgba(0,0,0,0.08)' }}>

          {/* Header */}
          <div className="resume-header" style={{ background: navy, padding: '52px 60px 44px', position: 'relative', overflow: 'hidden' }}>
            {/* decorative arc */}
            <svg style={{ position: 'absolute', bottom: -1, right: -1, opacity: 0.12 }} width="320" height="180" viewBox="0 0 320 180" fill="none">
              <ellipse cx="320" cy="180" rx="260" ry="160" fill={teal}/>
            </svg>

            <p style={{ fontFamily: 'var(--font-label, sans-serif)', fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: teal, margin: '0 0 10px', position: 'relative' }}>
              UX Designer · AI-first workflows
            </p>
            <h1 style={{ fontFamily: 'var(--font-display, Georgia, serif)', fontSize: 'clamp(36px, 5vw, 56px)', fontWeight: 400, color: '#fff', margin: '0 0 6px', lineHeight: 1.05, letterSpacing: '-0.02em', position: 'relative' }}>
              Sanjana <em style={{ fontStyle: 'italic', fontWeight: 300 }}>Gangishetty</em>
            </h1>
            <p style={{ fontFamily: 'var(--font-body, Georgia, serif)', fontSize: 15, color: 'rgba(255,255,255,0.55)', margin: '0 0 32px', position: 'relative' }}>
              MS Human-Computer Interaction · CU Boulder
            </p>

            {/* contact row */}
            <div className="resume-contact-row" style={{ display: 'flex', gap: 24, flexWrap: 'wrap', position: 'relative' }}>
              {[
                { label: 'Email', val: 'gangishettysanjana084@gmail.com', href: 'mailto:gangishettysanjana084@gmail.com' },
                { label: 'LinkedIn', val: 'linkedin.com/in/sanjana-gangishetty', href: 'https://www.linkedin.com/in/sanjana-gangishetty' },
                { label: 'Portfolio', val: 'sanjanagangishetty.com', href: '/' },
              ].map(({ label, val, href }) => (
                <div key={label}>
                  <p style={{ fontFamily: 'var(--font-label, sans-serif)', fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: teal, margin: '0 0 3px' }}>{label}</p>
                  <a href={href} style={{ fontFamily: 'var(--font-label, sans-serif)', fontSize: 13, color: 'rgba(255,255,255,0.8)', textDecoration: 'none' }}>{val}</a>
                </div>
              ))}
            </div>
          </div>

          {/* Body */}
          <div className="resume-body" style={{ padding: '52px 60px', display: 'grid', gridTemplateColumns: '1fr 280px', gap: 52 }}>

            {/* Left column */}
            <div>

              {/* Summary */}
              <Section title="Summary">
                <p style={{ fontFamily: 'var(--font-body, Georgia, serif)', fontSize: 15, color: '#374151', lineHeight: 1.75, margin: 0 }}>
                  Product Designer with 4 years of experience shipping enterprise fintech, AI-native, and consumer products across mobile and web. Owns end-to-end product design from user research and prototyping through to production, with expertise in design systems, interaction design, and React-based design-to-code workflows. Built a 45-component system used daily by 4 engineers.
                </p>
                <div style={{ display: 'flex', gap: 12, marginTop: 16, flexWrap: 'wrap' }}>
                  {['2h → 30m recruiter workflow', '30% faster time-to-insight', '20% conversion lift'].map(m => (
                    <span key={m} style={{ fontFamily: 'var(--font-label, sans-serif)', fontSize: 11, letterSpacing: '0.06em', color: teal, background: 'rgba(26,122,122,0.07)', borderRadius: 6, padding: '5px 10px' }}>{m}</span>
                  ))}
                </div>
              </Section>

              {/* Experience */}
              <Section title="Experience">
                <Experience
                  role="Product Designer"
                  company="Northern Trust"
                  period="Jan 2026 – Present"
                  location="Chicago, IL"
                  bullets={[
                    'Reduced time-to-insight by 30% across 3 core modules by restructuring dense financial workflows into layered, progressive-disclosure views aligned with how operations teams actually reviewed and acted on data.',
                    'Aligned 3 cross-functional groups through findings from 8 user interviews and usage-data analysis, letting Product, Engineering and Compliance resolve workflow requirements before development.',
                    'Accelerated concept validation for an enterprise AI operations platform by prototyping LLM-assisted dashboards in Figma, surfacing trust signals, information hierarchy and interaction behaviour before engineering investment.',
                    'Standardised the internal AI workflow suite by building reusable human-AI interaction patterns and shared design-system conventions for complex financial decision workflows.',
                  ]}
                />
                <Experience
                  role="Founding Product Designer"
                  company="Flairx AI"
                  period="Apr 2025 – Dec 2025"
                  location="Remote"
                  bullets={[
                    'Built a 45-component design system adopted by a 4-engineer team across mobile and web, defining tokens, variants, auto layout, documentation and design-to-code handoff as the founding designer.',
                    'Shipped the 0-to-1 AI hiring MVP in 3 weeks, two months early, owning discovery, wireframing, prototyping and UX/UI across 4 core workflows with zero WCAG 2.1 AA violations at handoff.',
                    'Reduced résumé processing from hours to minutes and interview scheduling by 75%, from two hours to 30 minutes, through single, bulk and CSV upload flows with inline validation and duplicate detection.',
                    'Cut candidate evaluation time from 40 minutes to 5 by redesigning dashboard information architecture, validating workflows through user research and usability testing, and surfacing decision-critical insights up front.',
                  ]}
                />
                <Experience
                  role="Product Designer, UI/UX"
                  company="Getup Nutrition"
                  period="Feb 2025 – Apr 2025"
                  location="Remote"
                  bullets={[
                    'Reduced customer service handling time by 22% by building a scalable design system and refining conversion-focused UX/UI flows across the consumer e-commerce experience.',
                    'Increased sales conversion by 20% by shipping a high-visibility celebrity partnership pop-up connecting brand storytelling, product discovery, checkout and newsletter acquisition.',
                    'Improved internal satisfaction by 30% through cross-functional workshops and rapid Lovable prototypes, validating interaction design decisions and accelerating user-testing cycles without engineering support.',
                  ]}
                />
                <Experience
                  role="Product Designer, UI/UX"
                  company="Keel Foundation"
                  period="Sep 2024 – Feb 2025"
                  location="Boulder, CO"
                  bullets={[
                    'Owned the end-to-end information architecture redesign, reducing navigation complexity by 40% across customer and stakeholder workflows through usability testing with 12 participants, user-flow restructuring and progressive disclosure.',
                    'Increased user satisfaction by 15% by translating research findings into journey maps and evidence-backed user narratives, securing design approval from non-technical leadership for the shipped internal navigation experience.',
                  ]}
                />
                <Experience
                  role="UX Researcher · Distro"
                  company="Applied fintech project"
                  period="Jan 2024 – May 2024"
                  location="CU Boulder"
                  bullets={[
                    'Redirected a 5-month applied fintech project by owning end-to-end foundational and generative user research with financial advisors, uncovering unmet needs through user interviews and structured synthesis.',
                    "Established the team's redesign roadmap through 3 research-to-design deliverables — personas, journey maps and concept flows — translating interview findings into actionable product direction.",
                  ]}
                />
              </Section>

            </div>

            {/* Right column */}
            <div className="resume-right-col">

              {/* Education */}
              <SideSection title="Education">
                <div style={{ marginBottom: 20 }}>
                  <p style={{ fontFamily: 'var(--font-heading, Georgia, serif)', fontSize: 14, fontWeight: 700, color: navy, margin: '0 0 2px' }}>MS · Creative Technology &amp; Design (HCI)</p>
                  <p style={{ fontFamily: 'var(--font-label, sans-serif)', fontSize: 12, color: teal, margin: '0 0 2px', letterSpacing: '0.04em' }}>University of Colorado Boulder</p>
                  <p style={{ fontFamily: 'var(--font-label, sans-serif)', fontSize: 11, color: muted, margin: 0, letterSpacing: '0.04em' }}>2023 – 2025</p>
                </div>
                <div>
                  <p style={{ fontFamily: 'var(--font-heading, Georgia, serif)', fontSize: 14, fontWeight: 700, color: navy, margin: '0 0 2px' }}>Bachelor&rsquo;s in Design (Honors)</p>
                  <p style={{ fontFamily: 'var(--font-label, sans-serif)', fontSize: 12, color: teal, margin: '0 0 2px', letterSpacing: '0.04em' }}>Woxsen School of Arts &amp; Design, India</p>
                  <p style={{ fontFamily: 'var(--font-label, sans-serif)', fontSize: 11, color: muted, margin: 0, letterSpacing: '0.04em' }}>2018 – 2022</p>
                </div>
              </SideSection>

              {/* Skills */}
              <SideSection title="Design Tools">
                {['Figma', 'FigJam', 'ProtoPie', 'Framer', 'Procreate', 'Adobe CC', 'Lovable', 'Rive'].map(s => (
                  <span key={s} className="skill-chip">{s}</span>
                ))}
              </SideSection>

              <SideSection title="UX Disciplines">
                {['User Research', 'Usability Testing', 'Design Systems', 'Design Tokens', 'Hi-fi Prototyping', 'Wireframing', 'Information Architecture', 'Interaction Design', 'Visual / UI Design', 'Journey Mapping', 'Heuristic Analysis', 'Responsive Design', 'Accessibility (WCAG 2.1)', 'A/B Testing'].map(s => (
                  <span key={s} className="skill-chip">{s}</span>
                ))}
              </SideSection>

              <SideSection title="AI-first Workflow">
                {['Claude', 'Claude Code', 'Cursor', 'Prompt Engineering', 'Designing for AI/ML', 'Figma AI', 'v0', 'Lovable', 'Midjourney'].map(s => (
                  <span key={s} className="skill-chip">{s}</span>
                ))}
              </SideSection>

              <SideSection title="Research Methods">
                {['Contextual Inquiry', 'Moderated Testing', 'Unmoderated Testing', 'Survey Design', 'Affinity Mapping', 'Jobs-to-be-Done', 'Persona Development', 'Competitive Analysis'].map(s => (
                  <span key={s} className="skill-chip">{s}</span>
                ))}
              </SideSection>

              <SideSection title="Collaboration & Craft">
                {['Cross-functional Collaboration', 'Systems Thinking', 'Storytelling', 'Design Critique', 'Workshop Facilitation', 'Dev Handoff (Dev Mode)', 'Data-informed Design', 'Amplitude · Mixpanel'].map(s => (
                  <span key={s} className="skill-chip">{s}</span>
                ))}
              </SideSection>

              <SideSection title="Technical">
                {['HTML / CSS', 'React basics', 'Next.js basics', 'Git', 'Storybook'].map(s => (
                  <span key={s} className="skill-chip">{s}</span>
                ))}
              </SideSection>

            </div>
          </div>

          {/* Footer strip */}
          <div className="resume-footer" style={{ background: cream, padding: '20px 60px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(0,0,0,0.06)' }}>
            <p style={{ fontFamily: 'var(--font-label, sans-serif)', fontSize: 11, color: muted, margin: 0, letterSpacing: '0.06em' }}>LAST UPDATED · MAY 2026</p>
            <p style={{ fontFamily: 'var(--font-label, sans-serif)', fontSize: 11, color: muted, margin: 0, letterSpacing: '0.06em' }}>"First, solve the problem."</p>
          </div>

        </div>

        {/* Personalisation note */}
        <p className="no-print" style={{
          fontFamily: 'var(--font-body, Georgia, serif)',
          fontSize: 13,
          fontStyle: 'italic',
          fontWeight: 300,
          color: 'rgba(0,0,0,0.35)',
          textAlign: 'center',
          maxWidth: 620,
          margin: '28px auto 0',
          lineHeight: 1.7,
        }}>
          If the résumé you received looks slightly different from this one, that&apos;s intentional. I tailored it to what mattered most for your role. Consider this the full picture.
        </p>

      </div>
    </>
  )
}

// ── Sub-components ──────────────────────────────────

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 44 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 24 }}>
        <p style={{ fontFamily: 'var(--font-label, sans-serif)', fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: teal, margin: 0, whiteSpace: 'nowrap' }}>{title}</p>
        <div style={{ flex: 1, height: 1, background: 'rgba(0,0,0,0.08)' }} />
      </div>
      {children}
    </div>
  )
}

function SideSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 28 }}>
      <p style={{ fontFamily: 'var(--font-label, sans-serif)', fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: teal, margin: '0 0 10px', borderBottom: '1px solid rgba(0,0,0,0.07)', paddingBottom: 8 }}>{title}</p>
      {children}
    </div>
  )
}

function Experience({ role, company, period, location, bullets }: {
  role: string; company: string; period: string; location: string; bullets: string[]
}) {
  return (
    <div className="exp-item">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12, marginBottom: 10, flexWrap: 'wrap' }}>
        <div>
          <p style={{ fontFamily: 'var(--font-heading, Georgia, serif)', fontSize: 15, fontWeight: 700, color: navy, margin: '0 0 2px' }}>{role}</p>
          <p style={{ fontFamily: 'var(--font-label, sans-serif)', fontSize: 12, color: teal, margin: 0, letterSpacing: '0.04em' }}>{company}</p>
        </div>
        <div style={{ textAlign: 'right' }}>
          <p style={{ fontFamily: 'var(--font-label, sans-serif)', fontSize: 11, color: muted, margin: '0 0 2px', letterSpacing: '0.04em' }}>{period}</p>
          <p style={{ fontFamily: 'var(--font-label, sans-serif)', fontSize: 11, color: muted, margin: 0, letterSpacing: '0.04em' }}>{location}</p>
        </div>
      </div>
      <ul style={{ margin: 0, paddingLeft: 18, display: 'flex', flexDirection: 'column', gap: 6 }}>
        {bullets.map((b, i) => (
          <li key={i} style={{ fontFamily: 'var(--font-body, Georgia, serif)', fontSize: 14, color: '#374151', lineHeight: 1.65 }}>{b}</li>
        ))}
      </ul>
    </div>
  )
}
