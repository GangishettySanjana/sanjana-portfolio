import HeroBeforeAfter from '@/components/HeroBeforeAfter'

export const metadata = {
  title: 'Hero preview — before/after comparator',
  robots: { index: false, follow: false },
}

export default function HeroPreviewPage() {
  return (
    <main>
      <HeroBeforeAfter />
    </main>
  )
}
