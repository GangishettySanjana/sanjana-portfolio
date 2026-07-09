import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'FlairX · Redesigning the Recruiter Workflow · Sanjana Gangishetty',
  description: 'Recruiters distrust AI when they can\'t see inside it. I redesigned FlairX\'s workflow to make every decision explainable, cutting review time from 2 hours to 30 minutes.',
}

export default function FlairXLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
