'use client'

import { motion } from 'framer-motion'
import FolderStack from './FolderStack'

export default function Projects() {
  return (
    <section id="work" className="py-[var(--section-gap)] bg-white">
      <div className="container-main">

        {/* Section header */}
        <div className="work-header flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="font-label text-label uppercase tracking-widest text-text-muted mb-3">
              Selected Work
            </p>
            <h2 className="font-heading text-h1 text-roasted">
              Case Studies
            </h2>
          </motion.div>

          <motion.p
            className="font-body text-body text-text-muted max-w-[360px]"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            Four projects. Different problems, same question: why does
            this feel harder than it should?
          </motion.p>
        </div>

        {/* ── Folder stack ── */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <FolderStack />
        </motion.div>

        {/* Bottom divider */}
        <motion.div
          className="mt-20 pt-8 border-t border-[var(--color-border)] flex items-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="font-label text-label uppercase tracking-widest text-text-muted">
            Open to full-time roles.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
