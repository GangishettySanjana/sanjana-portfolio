import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/next'
import { Instrument_Serif } from 'next/font/google'
// Geist isn't in Next 14's next/font/google list — use Vercel's official package
import { GeistSans } from 'geist/font/sans'
import Navigation from '@/components/Navigation'
import SmoothScroll from '@/components/SmoothScroll'
import ChatWidget from '@/components/ChatWidget'
import Intro from '@/components/Intro'
import './globals.css'

// TRUE SERIF — Instrument Serif: editorial contrast for fortune slips, About hero, pull quotes
const instrumentSerifFont = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  style: ['normal', 'italic'],
  variable: '--font-instrument-serif',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Sanjana Gangishetty · Product Designer',
  manifest: '/manifest.json',
  icons: {
    icon: [
      { url: '/favicon-32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon.ico', sizes: '16x16 32x32', type: 'image/x-icon' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    shortcut: '/favicon-32.png',
    apple: '/apple-touch-icon.png',
  },
  description:
    'Product Designer and UX Designer based in the United States. I make complex things feel obvious, and I am currently open to full-time roles.',
  keywords: [
    'Product Designer', 'UX Designer', 'AI Product Designer',
    'Sanjana Gangishetty', 'Portfolio', 'CU Boulder', 'Design',
  ],
  openGraph: {
    title: 'Sanjana Gangishetty · Product Designer',
    description: 'Product Designer who makes the complex feel obvious.',
    url: 'https://gangishettysanjana.com',
    siteName: 'Sanjana Gangishetty',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sanjana Gangishetty · Product Designer',
    description: 'Product Designer who makes the complex feel obvious.',
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${instrumentSerifFont.variable}`}
    >
      <head>
        <link rel="preconnect" href="https://api.fontshare.com"/>
        <link href="https://api.fontshare.com/v2/css?f[]=cabinet-grotesk@300,400,500,600,700,800,900&f[]=satoshi@300,400,500,700&display=swap" rel="stylesheet"/>
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous"/>
      </head>
      <body className="bg-white text-roasted antialiased">
        <Intro />
        <SmoothScroll />
        <Navigation />
        {children}
        <ChatWidget />
        <Analytics />
      </body>
    </html>
  )
}
