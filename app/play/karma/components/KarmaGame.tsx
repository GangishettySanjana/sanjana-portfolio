'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { BOARD_SIZE } from '../board-config'
import {
  getPassageAt,
  isLadder,
  pathSquares,
  resolveRoll,
  rollDie,
} from '../lib/board'
import Board from './Board'
import PassageMoment, { type PassageMomentData } from './PassageMoment'

type PlayerId = 0 | 1

const HUMAN: PlayerId = 0
const COMPUTER: PlayerId = 1
const STEP_MS = 180
const PASSAGE_HOLD_MS = 1400
const COMPUTER_PAUSE_MS = 700
const FOCUS_RING =
  'outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--play-ink)]'

function actorName(player: PlayerId): 'You' | 'Computer' {
  return player === HUMAN ? 'You' : 'Computer'
}

function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const sync = () => setReduced(mq.matches)
    sync()
    mq.addEventListener('change', sync)
    return () => mq.removeEventListener('change', sync)
  }, [])
  return reduced
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => {
    window.setTimeout(resolve, ms)
  })
}

export default function KarmaGame() {
  const reducedMotion = usePrefersReducedMotion()
  const [positions, setPositions] = useState<[number, number]>([0, 0])
  const [visualPositions, setVisualPositions] = useState<[number, number]>([0, 0])
  const [currentPlayer, setCurrentPlayer] = useState<PlayerId>(HUMAN)
  const [lastRoll, setLastRoll] = useState<number | null>(null)
  const [busy, setBusy] = useState(false)
  const [activeSquare, setActiveSquare] = useState<number | null>(null)
  const [activePassageFrom, setActivePassageFrom] = useState<number | null>(null)
  const [announcement, setAnnouncement] = useState<PassageMomentData | null>(null)
  const [status, setStatus] = useState('Your turn. Roll the die.')
  const [winner, setWinner] = useState<PlayerId | null>(null)

  // Generation token: bump to abandon an in-flight turn (reset / unmount).
  const runIdRef = useRef(0)
  const positionsRef = useRef(positions)
  positionsRef.current = positions

  useEffect(() => {
    const id = runIdRef.current
    return () => {
      if (runIdRef.current === id) runIdRef.current += 1
    }
  }, [])

  const isActiveRun = (runId: number) => runIdRef.current === runId

  const setVisualFor = useCallback((player: PlayerId, square: number) => {
    setVisualPositions((prev) => {
      const next: [number, number] = [...prev]
      next[player] = square
      return next
    })
  }, [])

  const commitPosition = useCallback(
    (player: PlayerId, square: number) => {
      setPositions((prev) => {
        const next: [number, number] = [...prev]
        next[player] = square
        return next
      })
      positionsRef.current = (() => {
        const next: [number, number] = [...positionsRef.current]
        next[player] = square
        return next
      })()
      setVisualFor(player, square)
    },
    [setVisualFor],
  )

  const walkTo = useCallback(
    async (runId: number, player: PlayerId, from: number, to: number) => {
      const steps = pathSquares(from, to)
      if (steps.length === 0) return
      if (reducedMotion) {
        if (!isActiveRun(runId)) return
        setActiveSquare(to)
        setVisualFor(player, to)
        return
      }
      for (const square of steps) {
        if (!isActiveRun(runId)) return
        setActiveSquare(square)
        setVisualFor(player, square)
        await sleep(STEP_MS)
      }
    },
    [reducedMotion, setVisualFor],
  )

  const travelPassage = useCallback(
    async (
      runId: number,
      player: PlayerId,
      from: number,
      to: number,
      name: string,
      kind: 'ladder' | 'snake',
    ) => {
      const actor = actorName(player)
      if (!isActiveRun(runId)) return
      setActivePassageFrom(from)
      setAnnouncement({ kind, name, actor, from, to })
      if (kind === 'ladder') {
        setStatus(
          actor === 'You'
            ? `You found ${name}, and climb to ${to}.`
            : `Computer found ${name}, and climbs to ${to}.`,
        )
      } else {
        setStatus(
          actor === 'You'
            ? `You hit ${name}, and slide to ${to}.`
            : `Computer hit ${name}, and slides to ${to}.`,
        )
      }
      await sleep(PASSAGE_HOLD_MS)
      if (!isActiveRun(runId)) return
      setVisualFor(player, to)
      if (!reducedMotion) await sleep(320)
      if (!isActiveRun(runId)) return
      setActivePassageFrom(null)
      setAnnouncement(null)
    },
    [reducedMotion, setVisualFor],
  )

  const runTurn = useCallback(
    async (
      runId: number,
      player: PlayerId,
    ): Promise<'won' | 'continue' | 'cancelled'> => {
      if (!isActiveRun(runId)) return 'cancelled'

      const from = positionsRef.current[player]
      const roll = rollDie()
      setLastRoll(roll)
      setStatus(`${actorName(player)} rolled ${roll}.`)

      const landing = resolveRoll(from, roll)
      if (landing === null) {
        setStatus(
          `${actorName(player)} rolled ${roll}. Needs an exact landing on ${BOARD_SIZE}.`,
        )
        setActiveSquare(null)
        return isActiveRun(runId) ? 'continue' : 'cancelled'
      }

      await walkTo(runId, player, from, landing)
      if (!isActiveRun(runId)) return 'cancelled'

      let finalSquare = landing
      const passage = getPassageAt(landing)
      if (passage) {
        await travelPassage(
          runId,
          player,
          passage.from,
          passage.to,
          passage.name,
          isLadder(passage) ? 'ladder' : 'snake',
        )
        finalSquare = passage.to
      }
      if (!isActiveRun(runId)) return 'cancelled'

      commitPosition(player, finalSquare)
      setActiveSquare(finalSquare)

      if (finalSquare >= BOARD_SIZE) {
        setWinner(player)
        setStatus(player === HUMAN ? 'You win.' : 'Computer wins.')
        return 'won'
      }

      return 'continue'
    },
    [commitPosition, travelPassage, walkTo],
  )

  const handleRoll = async () => {
    if (busy || winner !== null || currentPlayer !== HUMAN) return
    setBusy(true)
    const runId = runIdRef.current

    const humanResult = await runTurn(runId, HUMAN)
    if (humanResult !== 'continue' || !isActiveRun(runId)) {
      setBusy(false)
      return
    }

    setCurrentPlayer(COMPUTER)
    setStatus('Computer is taking a turn.')
    await sleep(COMPUTER_PAUSE_MS)
    if (!isActiveRun(runId)) {
      setBusy(false)
      return
    }

    const computerResult = await runTurn(runId, COMPUTER)
    if (computerResult !== 'continue' || !isActiveRun(runId)) {
      setBusy(false)
      return
    }

    setCurrentPlayer(HUMAN)
    setStatus('Your turn. Roll the die.')
    setBusy(false)
  }

  const handleReset = () => {
    runIdRef.current += 1
    setPositions([0, 0])
    setVisualPositions([0, 0])
    positionsRef.current = [0, 0]
    setCurrentPlayer(HUMAN)
    setLastRoll(null)
    setBusy(false)
    setActiveSquare(null)
    setActivePassageFrom(null)
    setAnnouncement(null)
    setWinner(null)
    setStatus('Your turn. Roll the die.')
  }

  const yourTurn = currentPlayer === HUMAN && winner === null && !busy

  return (
    <div className="flex flex-col gap-6 font-body min-[980px]:flex-row min-[980px]:items-start min-[980px]:gap-8">
      <div className="relative w-full max-w-[min(100%,640px)]">
        <Board
          visualPositions={visualPositions}
          activeSquare={activeSquare}
          activePassageFrom={activePassageFrom}
          currentPlayer={currentPlayer}
          reducedMotion={reducedMotion}
        />
        {announcement ? <PassageMoment moment={announcement} /> : null}
      </div>

      {/* Status, die, controls and legend — kept on the right beside the board. */}
      <div className="flex w-full flex-col gap-5 min-[980px]:flex-1">
        <div className="flex flex-wrap items-center gap-4">
          <div
            className="flex h-16 w-16 items-center justify-center border-2 border-[var(--play-ink)] bg-[var(--play-paper)] font-heading text-h2 text-[var(--play-ink)]"
            aria-label={lastRoll === null ? 'No roll yet' : `Last roll ${lastRoll}`}
            role="img"
          >
            {lastRoll ?? '—'}
          </div>

          <div className="flex min-w-0 flex-1 flex-col gap-1 text-body text-[var(--play-ink)]">
            <p aria-live="polite">{status}</p>
            <p>
              You:{' '}
              {positions[0] < 1 ? 'start' : `square ${positions[0]}`}
              {yourTurn ? ' · your turn' : ''}
            </p>
            <p>
              Computer:{' '}
              {positions[1] < 1 ? 'start' : `square ${positions[1]}`}
              {currentPlayer === COMPUTER && winner === null ? ' · playing' : ''}
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              className={`${FOCUS_RING} border-2 border-[var(--play-ink)] bg-[var(--play-butter)] px-5 py-3 font-label text-body text-[var(--play-ink)] disabled:cursor-not-allowed disabled:opacity-50`}
              onClick={handleRoll}
              disabled={busy || winner !== null || currentPlayer !== HUMAN}
            >
              Roll the die
            </button>
            <button
              type="button"
              className={`${FOCUS_RING} border-2 border-[var(--play-ink)] bg-[var(--play-paper)] px-5 py-3 font-label text-body text-[var(--play-ink)]`}
              onClick={handleReset}
            >
              Start over
            </button>
          </div>
        </div>

        <ul className="flex list-none flex-col gap-2 p-0 text-body text-[var(--play-ink)]/80">
        <li className="flex items-center gap-2">
          <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" aria-hidden>
            <path
              d="M12 2.5 L21.5 20.5 H2.5 Z"
              fill="var(--play-peri)"
              stroke="var(--play-ink)"
              strokeWidth="2"
              strokeLinejoin="round"
            />
          </svg>
          You are the periwinkle triangle
        </li>
        <li className="flex items-center gap-2">
          <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" aria-hidden>
            <path
              d="M12 2.2 L21.8 12 L12 21.8 L2.2 12 Z"
              fill="var(--play-butter)"
              stroke="var(--play-ink)"
              strokeWidth="2"
              strokeLinejoin="round"
            />
          </svg>
          Computer is the butter diamond
        </li>
        <li className="flex items-center gap-2">
          <span
            className="inline-block h-1 w-6"
            style={{ backgroundColor: 'var(--play-sage)' }}
            aria-hidden
          />
          Ladders climb from a foot bar
        </li>
        <li className="flex items-center gap-2">
          <span
            className="inline-block h-2.5 w-2.5 rounded-full"
            style={{ backgroundColor: 'var(--play-rose)' }}
            aria-hidden
          />
          Snakes start at a head and taper down
        </li>
      </ul>
      </div>
    </div>
  )
}
