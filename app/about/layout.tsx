import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About · Sanjana Gangishetty',
  description: '~7 years in design, ~3 in product. Started in interior spaces, moved into product design. Now building AI-powered products that people actually trust.',
}

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
