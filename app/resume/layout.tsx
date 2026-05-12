import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Résumé — Sanjana Gangishetty',
  description: 'UX Designer · AI-first workflows · CU Boulder MS',
}

export default function ResumeLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
