'use client'

import { playTokens } from '@/app/play/tokens'
import { BOARD_SIZE, LADDERS, SNAKES } from '../board-config'
import { squareToCell } from '../lib/board'
import PassagesOverlay from './PassagesOverlay'

type PlayerId = 0 | 1

const PASSAGE_NAME_AT = new Map<number, string>([
  ...LADDERS.map((p) => [p.from, p.name] as const),
  ...SNAKES.map((p) => [p.from, p.name] as const),
])

type BoardProps = {
  visualPositions: [number, number]
  activeSquare: number | null
  activePassageFrom: number | null
  currentPlayer: PlayerId
  reducedMotion: boolean
}

/** You: flat triangle. Computer: flat diamond. Shape carries identity, not only color. */
function TokenShape({ player, isCurrent }: { player: PlayerId; isCurrent: boolean }) {
  const fill = player === 0 ? playTokens.peri : playTokens.butter
  const edge = isCurrent ? 2.4 : 1.8

  if (player === 0) {
    return (
      <svg viewBox="0 0 24 24" className="h-full w-full overflow-visible" aria-hidden="true">
        <path
          d="M12 2.5 L21.5 20.5 H2.5 Z"
          fill={fill}
          stroke={playTokens.ink}
          strokeWidth={edge}
          strokeLinejoin="round"
        />
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 24 24" className="h-full w-full overflow-visible" aria-hidden="true">
      <path
        d="M12 2.2 L21.8 12 L12 21.8 L2.2 12 Z"
        fill={fill}
        stroke={playTokens.ink}
        strokeWidth={edge}
        strokeLinejoin="round"
      />
    </svg>
  )
}

function TokenMark({
  player,
  isCurrent,
  label,
}: {
  player: PlayerId
  isCurrent: boolean
  label: string
}) {
  return (
    <div
      className="h-9 w-9 shrink-0"
      aria-label={label}
      role="img"
    >
      <TokenShape player={player} isCurrent={isCurrent} />
    </div>
  )
}

function BoardToken({
  player,
  square,
  isCurrent,
  nudge,
  reducedMotion,
}: {
  player: PlayerId
  square: number
  isCurrent: boolean
  nudge: { x: number; y: number }
  reducedMotion: boolean
}) {
  if (square < 1) return null

  const { col, row } = squareToCell(square)
  const left = `${(col + 0.5) * 10 + nudge.x}%`
  const top = `${(row + 0.5) * 10 + nudge.y}%`

  return (
    <div
      className="absolute z-20 h-[8%] w-[8%] -translate-x-1/2 -translate-y-1/2"
      style={{
        left,
        top,
        transition: reducedMotion ? undefined : 'left 160ms linear, top 160ms linear',
      }}
      aria-label={`${player === 0 ? 'You' : 'Computer'}, on square ${square}`}
      role="img"
    >
      <TokenShape player={player} isCurrent={isCurrent} />
    </div>
  )
}

export default function Board({
  visualPositions,
  activeSquare,
  activePassageFrom,
  currentPlayer,
  reducedMotion,
}: BoardProps) {
  const sameSquare =
    visualPositions[0] >= 1 && visualPositions[0] === visualPositions[1]

  const cells = Array.from({ length: BOARD_SIZE }, (_, i) => {
    const square = i + 1
    const { col, row } = squareToCell(square)
    const isA = (row + col) % 2 === 0
    const isActive = activeSquare === square

    return (
      <div
        key={square}
        className="relative"
        style={{
          gridColumn: col + 1,
          gridRow: row + 1,
          backgroundColor: isA ? playTokens.paper : playTokens.shell,
          boxShadow: isActive
            ? `inset 0 0 0 2px ${playTokens.ink}`
            : undefined,
        }}
        aria-hidden="true"
      >
        <span
          className="pointer-events-none absolute left-[5%] top-[5%] select-none font-label leading-none"
          style={{
            fontSize: 'clamp(0.5rem, 1.3vw, 0.72rem)',
            color: playTokens.ink,
          }}
        >
          {square}
        </span>
      </div>
    )
  })

  const passageLabels = Array.from(PASSAGE_NAME_AT.entries()).map(
    ([square, name]) => {
      const { col, row } = squareToCell(square)
      const isNamedActive = activePassageFrom === square
      return (
        <div
          key={`label-${square}`}
          className="pointer-events-none absolute z-[12] flex items-end justify-center px-[3%] pb-[5%]"
          style={{
            left: `${col * 10}%`,
            top: `${row * 10}%`,
            width: '10%',
            height: '10%',
          }}
          aria-hidden="true"
        >
          <span
            className="max-w-full truncate px-[3px] py-[1px] text-center font-label capitalize leading-tight"
            style={{
              fontSize: 'clamp(0.42rem, 1.15vw, 0.62rem)',
              color: playTokens.ink,
              backgroundColor: playTokens.paper,
              fontWeight: isNamedActive ? 600 : 500,
              boxShadow: `0 0 0 1px ${playTokens.paper}`,
            }}
          >
            {name}
          </span>
        </div>
      )
    },
  )

  const youWaiting = visualPositions[0] < 1
  const computerWaiting = visualPositions[1] < 1

  return (
    <div className="flex w-full max-w-[min(100%,640px)] items-end gap-3">
      <div
        className="relative aspect-square min-w-0 flex-1 border-2 border-[var(--play-ink)]"
        role="img"
        aria-label="Snakes and ladders board, squares 1 to 100. Passage names sit on ladder feet and snake heads. Square 1 is bottom left. Square 100 is top left."
      >
        <div
          className="absolute inset-0 grid grid-cols-10 grid-rows-10"
          aria-hidden="true"
        >
          {cells}
        </div>

        <PassagesOverlay activeFrom={activePassageFrom} />

        <div
          className="pointer-events-none absolute inset-0 z-[6] mix-blend-soft-light opacity-[0.055]"
          aria-hidden="true"
          style={{
            backgroundImage: `url("data:image/svg+xml,${encodeURIComponent(
              `<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'>
                <filter id='g'>
                  <feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/>
                  <feColorMatrix type='matrix' values='0 0 0 0 0.55  0 0 0 0 0.55  0 0 0 0 0.55  0 0 0 0.35 0'/>
                </filter>
                <rect width='100%' height='100%' filter='url(%23g)'/>
              </svg>`,
            )}")`,
            backgroundSize: '160px 160px',
          }}
        />

        <div className="pointer-events-none absolute inset-0 z-[12]" aria-hidden="true">
          {passageLabels}
        </div>

        <BoardToken
          player={0}
          square={visualPositions[0]}
          isCurrent={currentPlayer === 0}
          nudge={sameSquare ? { x: -1.2, y: -1.2 } : { x: 0, y: 0 }}
          reducedMotion={reducedMotion}
        />
        <BoardToken
          player={1}
          square={visualPositions[1]}
          isCurrent={currentPlayer === 1}
          nudge={sameSquare ? { x: 1.2, y: 1.2 } : { x: 0, y: 0 }}
          reducedMotion={reducedMotion}
        />
      </div>

      {/* Start tray: tokens wait here, side by side, on the right of the board. */}
      <div
        className="flex shrink-0 flex-col items-center gap-2 pb-1"
        aria-label="Starting pieces"
      >
        <p className="font-label text-label uppercase tracking-[0.08em] text-[var(--play-ink)]/60">
          Start
        </p>
        <div className="flex items-center gap-2">
          {youWaiting ? (
            <TokenMark
              player={0}
              isCurrent={currentPlayer === 0}
              label="You, waiting to start"
            />
          ) : (
            <div className="h-9 w-9" aria-hidden />
          )}
          {computerWaiting ? (
            <TokenMark
              player={1}
              isCurrent={currentPlayer === 1}
              label="Computer, waiting to start"
            />
          ) : (
            <div className="h-9 w-9" aria-hidden />
          )}
        </div>
      </div>
    </div>
  )
}
