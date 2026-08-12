import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/next'
import { Source_Sans_3, Space_Grotesk, Outfit, Caveat } from 'next/font/google'
import localFont from 'next/font/local'
// Geist isn't in Next 14's next/font/google list — use Vercel's official package
import { GeistSans } from 'geist/font/sans'
import Navigation from '@/components/Navigation'
import SmoothScroll from '@/components/SmoothScroll'
import ChatWidget from '@/components/ChatWidget'
import Intro from '@/components/Intro'
import './globals.css'

// DISPLAY — Space Grotesk: clean structured grotesk, bold and modern (no serif curves)
const displayFont = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-display',
  display: 'swap',
})

// DISPLAY FONT — General Sans (self-hosted). Confident modern grotesk; carries
// the whole site's display voice on the --font-serif variable (name kept so
// every var(--font-serif)/var(--serif) reference swaps at once).
const serifFont = localFont({
  src: [
    { path: './fonts/GeneralSans-Regular.woff2', weight: '400', style: 'normal' },
    { path: './fonts/GeneralSans-Medium.woff2', weight: '500', style: 'normal' },
    { path: './fonts/GeneralSans-Semibold.woff2', weight: '600', style: 'normal' },
    { path: './fonts/GeneralSans-Bold.woff2', weight: '700', style: 'normal' },
  ],
  variable: '--font-serif',
  display: 'swap',
})

// HEADINGS — Space Grotesk as well, for one coherent heading voice
const headingFont = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-heading',
  display: 'swap',
})

// BODY — Source Sans 3: humanist sans, highly readable for long-form reading,
// pairs cleanly with the serif display/heading fonts.
const bodyFont = Source_Sans_3({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
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

// HANDWRITTEN — Caveat, for the signature name + "work with me!" link
const caveatFont = Caveat({
  subsets: ['latin'],
  weight: ['600', '700'],
  variable: '--font-caveat',
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
      className={`${displayFont.variable} ${headingFont.variable} ${serifFont.variable} ${bodyFont.variable} ${labelFont.variable} ${GeistSans.variable} ${caveatFont.variable}`}
    >
      <head>
        <link rel="preconnect" href="https://api.fontshare.com"/>
        <link href="https://api.fontshare.com/v2/css?f[]=cabinet-grotesk@300,400,500,600,700,800,900&f[]=satoshi@300,400,500,700&display=swap" rel="stylesheet"/>
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
