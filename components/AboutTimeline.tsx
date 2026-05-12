'use client'

import { motion } from 'framer-motion'

const timeline = [
  {
    year: '2018',
    title: 'Bachelor\'s in Design',
    detail: 'Fell in love with texture, color, and the way function and form work together when someone actually thought it through.',
    tag: 'Education',
  },
  {
    year: '2021',
    title: 'First end-to-end UX project',
    detail: 'Aura, a bouquet customization app for a small Hyderabad florist during COVID. Learned that the thing you think is the feature is rarely the hardest design problem.',
    tag: 'Work',
  },
  {
    year: '2022',
    title: 'Google UX Design Professional Certificate',
    detail: 'Formalized the process. Screener surveys, usability testing, journey mapping, turned instinct into method.',
    tag: 'Education',
  },
  {
    year: '2023',
    title: 'CU Boulder. MS Creative Technology & Design',
    detail: 'Two years in the Rockies designing at the intersection of emerging tech and human experience. Where I got serious about AI-augmented design.',
    tag: 'Education',
  },
  {
    year: '2025',
    title: 'FlairX, Fireside Interactive, GetUp',
    detail: 'Three very different projects. AI recruiter workflows, wildfire simulation exhibits, and a celebrity product launch campaign. Learned to move fast and make defensible decisions.',
    tag: 'Work',
  },
  {
    year: 'Now',
    title: 'Looking for the next thing',
    detail: 'Open to full-time roles as a Product Designer, UX Designer, or AI Product Designer. Preferably something hard.',
    tag: 'Open',
  },
]

const tagColors: Record<string, string> = {
  Education: 'bg-oyster text-roasted',
  Work: 'bg-butter/30 text-roasted',
  Open: 'bg-roasted text-lace',
}

export default function AboutTimeline() {
  return (
    <section className="py-[var(--section-gap)] bg-lace">
      <div className="container-main">
        <p className="font-label text-label uppercase tracking-widest text-text-muted mb-4">Journey</p>
        <h2 className="font-heading text-h2 text-roasted mb-16">How I got here</h2>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-[88px] top-0 bottom-0 w-px bg-[var(--color-border)] hidden md:block" />

          <div className="space-y-10">
            {timeline.map((item, i) => (
              <motion.div
                key={item.year}
                className="grid md:grid-cols-[120px_1fr] gap-4 md:gap-12 items-start"
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.6, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* Year */}
                <div className="flex items-center gap-4 md:justify-end">
                  <span className="font-label text-label uppercase tracking-widest text-text-muted">
                    {item.year}
                  </span>
                  {/* Dot on the line */}
                  <div className="hidden md:block w-3 h-3 rounded-full bg-roasted flex-shrink-0" />
                </div>

                {/* Content */}
                <div className="pb-2">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <h3 className="font-heading text-[20px] text-roasted">{item.title}</h3>
                    <span className={`font-label text-[10px] uppercase tracking-widest px-2 py-1 rounded-full ${tagColors[item.tag]}`}>
                      {item.tag}
                    </span>
                  </div>
                  <p className="font-body text-body text-text-muted leading-relaxed">{item.detail}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
