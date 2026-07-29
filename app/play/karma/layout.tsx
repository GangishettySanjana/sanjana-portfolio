import type { Metadata } from 'next'
import type { ReactNode } from 'react'

export const metadata: Metadata = {
  title: 'Three Refusals · Play · Sanjana Gangishetty',
  description:
    'A single-player snakes and ladders game about when to refuse a roll. Working title: Three Refusals.',
  robots: { index: false, follow: false },
}

export default function KarmaLayout({ children }: { children: ReactNode }) {
  return children
}
