import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/next'
import { Fraunces, Playfair_Display, Ysabeau_Infant, Space_Grotesk, Outfit } from 'next/font/google'
import Navigation from '@/components/Navigation'
import './globals.css'

// DISPLAY — Fraunces: variable optical-size serif, expressive at large sizes, sturdy small
const displayFont = Fraunces({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  variable: '--font-display',
  display: 'swap',
})

// HEADINGS — replaces Hatton until font files are acquired
// To swap: use next/font/local pointing to your Hatton .woff2 files
const headingFont = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  style: ['normal', 'italic'],
  variable: '--font-heading',
  display: 'swap',
})

// BODY — Ysabeau Infant (exact font from your brief — this is the real one)
const bodyFont = Ysabeau_Infant({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-body',
  display: 'swap',
})

// LABELS
const labelFont = Outfit({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-label',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Sanjana Gangishetty — Product Designer',
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
    'Product Designer and UX Designer based in the United States. I make complex things feel obvious — currently open to full-time roles.',
  keywords: [
    'Product Designer', 'UX Designer', 'AI Product Designer',
    'Sanjana Gangishetty', 'Portfolio', 'CU Boulder', 'Design',
  ],
  openGraph: {
    title: 'Sanjana Gangishetty — Product Designer',
    description: 'Product Designer who makes the complex feel obvious.',
    url: 'https://gangishettysanjana.com',
    siteName: 'Sanjana Gangishetty',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sanjana Gangishetty — Product Designer',
    description: 'Product Designer who makes the complex feel obvious.',
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${displayFont.variable} ${headingFont.variable} ${bodyFont.variable} ${labelFont.variable}`}
    >
      <head>
        <link rel="preconnect" href="https://api.fontshare.com"/>
        <link href="https://api.fontshare.com/v2/css?f[]=cabinet-grotesk@300,400,500,600,700,800,900&f[]=satoshi@300,400,500,700&display=swap" rel="stylesheet"/>
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link href="https://fonts.googleapis.com/css2?family=Caveat:wght@500;600;700&display=swap" rel="stylesheet"/>
      </head>
      <body className="bg-white text-roasted antialiased">
        <Navigation />
        {children}
        <Analytics />
      </body>
    </html>
  )
}
