import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Meridian · Risk Console Redesign · Sanjana Gangishetty',
  description: 'Wealth advisors were spending 40 minutes hunting for over-exposed clients. I redesigned the risk console. Now it takes 30 seconds.',
}

export default function MeridianLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
