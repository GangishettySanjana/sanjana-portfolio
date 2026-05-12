# Sanjana Gangishetty — Portfolio

Personal portfolio for Sanjana Gangishetty, Product Designer.

Built with Next.js 14, Tailwind CSS, Framer Motion, and the Anthropic API.

---

## Quick start

```bash
npm install
cp .env.example .env.local
# Add your ANTHROPIC_API_KEY to .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Setup checklist

### 1. Add your photo

Drop your photo into:
```
public/images/sanjana.jpg
```
The hero and about page both reference this file. Any JPEG or PNG works — it gets cropped to fill the stamp shape.

### 2. Add your API key

```bash
cp .env.example .env.local
```

Edit `.env.local` and add your key:
```
ANTHROPIC_API_KEY=sk-ant-...
```

Get a key at [console.anthropic.com](https://console.anthropic.com).

### 3. Swap in your real fonts (optional but recommended)

The build currently uses Google Fonts equivalents. To use the approved typefaces:

**LUNALENA** (display — hero name):
1. Add your font files to `public/fonts/LUNALENA.woff2`
2. In `app/layout.tsx`, replace the Cormorant import with:
```typescript
import localFont from 'next/font/local'
const displayFont = localFont({
  src: '../public/fonts/LUNALENA.woff2',
  variable: '--font-display',
})
```

**Hatton** (headings) and **Molenilo** (labels): same pattern, variables `--font-heading` and `--font-label`.

**YSABEAU INFANT** is already the real font — loaded from Google Fonts.

### 4. Add project cover images

Replace the stamp placeholders with real screenshots in `public/images/`:
- `cover-flairx.jpg`
- `cover-fireside.jpg`
- `cover-aura.jpg`
- `cover-getup.jpg`

Then in `components/ProjectCard.tsx`, swap the placeholder div for an `<Image>` tag.

---

## Project structure

```
app/
  layout.tsx           root layout, font imports, metadata
  page.tsx             home: Hero + Projects + About + Contact
  globals.css          design tokens, stamp CSS, base styles
  about/page.tsx       full about page
  projects/[slug]/     case study pages (static generated)
  api/chat/route.ts    AI chat API route (key never client-exposed)

components/
  Navigation.tsx       fixed nav with mobile hamburger menu
  Hero.tsx             animated hero with stamp photo + name reveal
  StampImage.tsx       reusable stamp-shaped image component
  Projects.tsx         project grid section
  ProjectCard.tsx      stamp-style project card
  CaseStudy.tsx        case study with Recruiter/Full Story toggle
  About.tsx            about section (home page)
  AboutTimeline.tsx    career timeline
  Contact.tsx          dark contact section
  ChatWidget.tsx       floating AI chat powered by Claude

data/
  projects.ts          all project content — edit here to update
```

---

## Design tokens

| Color | Hex | Role |
|-------|-----|------|
| Old Lace | `#F6F3EE` | Page background |
| Freshly Roasted | `#4B2E1F` | Primary text |
| Butter | `#F4E6A6` | Accent, CTAs |
| Oyster Bay | `#DCECEF` | About section |
| Dark bg | `#2E1C10` | Contact section |

Fonts: `--font-display` / `--font-heading` / `--font-body` / `--font-label`

---

## Deploy to Vercel

```bash
npm i -g vercel && vercel
```

Add `ANTHROPIC_API_KEY` in the Vercel environment variables dashboard.
