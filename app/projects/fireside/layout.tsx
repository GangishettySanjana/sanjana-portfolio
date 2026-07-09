import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Fireside · Interactive Wildfire Exhibit · Sanjana Gangishetty',
  description: 'A 3D projected table that teaches wildfire science to anyone who walks up, no instructions needed. Deployed at 4 public events for CU Boulder, ages 8 to 80.',
}

export default function FiresideLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
