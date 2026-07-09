import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'OpenRouter Model Match · Self-Initiated Exploration · Sanjana Gangishetty',
  description: 'OpenRouter gives developers access to 500+ AI models with no guidance on which one to use. A self-initiated recommendation wizard that takes you from zero context to a working API call in four questions.',
}

export default function OpenRouterLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
