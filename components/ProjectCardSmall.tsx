'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { type Project } from '@/data/projects'

interface Props {
  project: Project
  index: number
}

export default function ProjectCardSmall({ project, index }: Props) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
      style={{ height: '100%' }}
    >
      <Link href={`/projects/${project.slug}`} style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', height: '100%' }}>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          borderRadius: 18,
          background: '#fff',
          overflow: 'hidden',
          border: '1px solid rgba(0,0,0,0.08)',
          transition: 'box-shadow 0.2s, transform 0.2s',
        }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 32px rgba(20,28,50,0.1)'
            ;(e.currentTarget as HTMLElement).style.transform = 'translateY(-3px)'
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLElement).style.boxShadow = 'none'
            ;(e.currentTarget as HTMLElement).style.transform = 'translateY(0)'
          }}
        >
          {/* Image */}
          <div style={{
            background: 'linear-gradient(145deg, #F0F2F7 0%, #E8EBF4 100%)',
            height: 200,
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px 28px',
            flexShrink: 0,
          }}>
            {project.images?.overview ? (
              <img
                src={project.images.overview}
                alt={project.title}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                  borderRadius: 10,
                  boxShadow: '0 8px 24px rgba(20,28,50,0.14)',
                }}
              />
            ) : (
              <div style={{
                width: '100%', height: '100%', borderRadius: 10,
                background: 'rgba(0,0,0,0.04)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <p style={{ fontFamily: 'var(--font-heading), Georgia, serif', fontSize: 15, color: 'rgba(0,0,0,0.2)', margin: 0 }}>{project.title}</p>
              </div>
            )}
          </div>

          {/* Text */}
          <div style={{ padding: '24px 26px 28px', display: 'flex', flexDirection: 'column', gap: 12, flex: 1 }}>

            {/* Context tag */}
            {project.cardContext && (
              <p style={{
                fontFamily: 'var(--font-label), sans-serif',
                fontSize: 9, letterSpacing: '0.09em',
                textTransform: 'uppercase',
                color: '#6B7280', margin: 0,
              }}>
                {project.cardContext}
              </p>
            )}

            {/* Title */}
            <h3 style={{
              fontFamily: 'var(--font-heading), Georgia, serif',
              fontSize: 'clamp(16px, 1.4vw, 19px)',
              fontWeight: 800,
              color: '#111827',
              lineHeight: 1.2,
              margin: 0,
              letterSpacing: '-0.015em',
            }}>
              {project.title}
            </h3>

            {/* tldr */}
            <p style={{
              fontFamily: 'var(--font-body), Georgia, serif',
              fontSize: 13.5,
              color: '#374151',
              lineHeight: 1.6,
              margin: 0,
              flex: 1,
            }}>
              {project.tldr}
            </p>

            {/* Stats row */}
            {project.stats.length > 0 && (
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 4 }}>
                {project.stats.slice(0, 2).map(stat => (
                  <div key={stat.label} style={{
                    border: '1px solid rgba(0,0,0,0.09)',
                    borderRadius: 8,
                    padding: '8px 12px',
                    flex: 1,
                  }}>
                    <p style={{ fontFamily: 'var(--font-heading), Georgia, serif', fontSize: 13, fontWeight: 700, color: '#111827', margin: '0 0 3px', lineHeight: 1.1 }}>{stat.value}</p>
                    <p style={{ fontFamily: 'var(--font-label), sans-serif', fontSize: 9, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#4B5563', margin: 0 }}>{stat.label}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Arrow CTA */}
            <div style={{
              display: 'flex', alignItems: 'center', gap: 8,
              fontFamily: 'var(--font-label), sans-serif',
              fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase',
              color: '#111827', fontWeight: 700, marginTop: 4,
            }}>
              <span>View Case Study</span>
              <svg fill="none" height="12" viewBox="0 0 24 24" width="12">
                <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
              </svg>
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  )
}
