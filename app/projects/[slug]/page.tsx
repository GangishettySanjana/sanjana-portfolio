import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import CaseStudy from '@/components/CaseStudy'
import Contact from '@/components/Contact'
import { getProjectBySlug, projects } from '@/data/projects'

interface Props {
  params: { slug: string }
}

// Exclude slugs that have their own standalone page.tsx — those take priority.
const STANDALONE_SLUGS = ['flairx', 'fireside', 'aura', 'getup']

export function generateStaticParams() {
  return projects
    .filter((p) => !STANDALONE_SLUGS.includes(p.slug))
    .map((p) => ({ slug: p.slug }))
}

export function generateMetadata({ params }: Props): Metadata {
  const project = getProjectBySlug(params.slug)
  if (!project) return { title: 'Project Not Found' }
  return {
    title: `${project.title} — Sanjana Gangishetty`,
    description: project.tldr,
  }
}

export default function ProjectPage({ params }: Props) {
  const project = getProjectBySlug(params.slug)
  if (!project) notFound()

  return (
    <>
      <main>
        <CaseStudy project={project} />
        <Contact />
      </main>
    </>
  )
}
