import type { Metadata } from 'next'
import { notFound, redirect } from 'next/navigation'
import CaseStudy from '@/components/CaseStudy'
import Contact from '@/components/Contact'
import { getProjectBySlug, projects } from '@/data/projects'

interface Props {
  params: { slug: string }
}

// Exclude slugs that have their own standalone page.tsx, those take priority.
const STANDALONE_SLUGS = ['flairx', 'fireside', 'aura', 'getup']

// Projects surfaced as a live demo only (no written case study). Visiting the
// old case-study URL redirects straight to the live product.
const DEMO_ONLY: Record<string, string> = {
  'ai-trust-meter': 'https://ai-trust-meter.vercel.app',
}

export function generateStaticParams() {
  return projects
    .filter((p) => !STANDALONE_SLUGS.includes(p.slug))
    .filter((p) => !DEMO_ONLY[p.slug])
    .map((p) => ({ slug: p.slug }))
}

export function generateMetadata({ params }: Props): Metadata {
  const project = getProjectBySlug(params.slug)
  if (!project) return { title: 'Project Not Found' }
  return {
    title: `${project.title} · Sanjana Gangishetty`,
    description: project.tldr,
  }
}

export default function ProjectPage({ params }: Props) {
  const demo = DEMO_ONLY[params.slug]
  if (demo) redirect(demo)

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
