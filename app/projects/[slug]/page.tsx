import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import CaseStudy from '@/components/CaseStudy'
import Contact from '@/components/Contact'
import { getProjectBySlug, projects } from '@/data/projects'

interface Props {
  params: { slug: string }
}

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }))
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
