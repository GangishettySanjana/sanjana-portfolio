import Link from 'next/link'
import KarmaGame from './components/KarmaGame'

export default function KarmaPage({ searchParams }: { searchParams: { embed?: string } }) {
  const embedded = searchParams?.embed === '1'
  return (
    <main className="mx-auto flex min-h-screen max-w-5xl flex-col gap-10 px-6 py-16 font-body">
      <header className="flex flex-col gap-3">
        <p className="font-label text-label uppercase tracking-[0.08em] text-[var(--play-ink)]/70">
          Play · one player
        </p>
        <h1 className="font-heading text-h2 text-[var(--play-ink)]">
          Three Refusals
        </h1>
        {/* TODO: verified history copy */}
        <p className="max-w-prose text-body text-[var(--play-ink)]/85">
          You against the computer. Roll, climb virtues, slide on vices. Exact
          landing on 100 to win.
        </p>
      </header>

      <KarmaGame />

      {!embedded && (
        <p>
          <Link
            href="/"
            className="font-label text-body underline decoration-[var(--play-ink)]/30 underline-offset-4 outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--play-ink)]"
          >
            Back to home
          </Link>
        </p>
      )}
    </main>
  )
}
