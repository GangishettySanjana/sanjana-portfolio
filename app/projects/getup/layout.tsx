import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'GetUp · Pre-Order Pop-Up Campaign · Sanjana Gangishetty',
  description: 'Three weeks. No copywriter, no brand guidelines, one celebrity backer. Derived the voice, wrote the copy, designed the pop-up. Shipped on time.',
}

export default function GetUpLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
