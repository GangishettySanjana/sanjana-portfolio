import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Aura · Bouquet Customization App · Sanjana Gangishetty',
  description: 'A mobile app for a Hyderabad florist after COVID. Custom bouquets, live inventory, a checkout that feels helped, not processed.',
}

export default function AuraLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
