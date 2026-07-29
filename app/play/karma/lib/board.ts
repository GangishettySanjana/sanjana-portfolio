import {
  BOARD_SIZE,
  LADDERS,
  SNAKES,
  WIN_RULE,
  type Passage,
  type WinRule,
} from '../board-config'

/** 0 = off the board (before square 1). */
export type Square = number

export function getPassageAt(square: number): Passage | undefined {
  return (
    LADDERS.find((p) => p.from === square) ??
    SNAKES.find((p) => p.from === square)
  )
}

export function isLadder(passage: Passage): boolean {
  return passage.to > passage.from
}

/**
 * Resolve a rolled move against the win rule.
 * Returns the landing square, or null if the roll is refused by 'exact'.
 */
export function resolveRoll(
  from: Square,
  roll: number,
  winRule: WinRule = WIN_RULE,
): Square | null {
  const raw = from + roll
  if (raw === BOARD_SIZE) return BOARD_SIZE
  if (raw < BOARD_SIZE) return raw
  if (winRule === 'overshoot') return BOARD_SIZE
  return null
}

/**
 * Boustrophedon grid: square 1 bottom-left, 100 top-left.
 * Returns 0-based column (0 left) and row from top (0 top).
 */
export function squareToCell(square: number): { col: number; row: number } {
  if (square < 1 || square > BOARD_SIZE) {
    return { col: -1, row: -1 }
  }
  const index = square - 1
  const rowFromBottom = Math.floor(index / 10)
  const colInRow = index % 10
  const col = rowFromBottom % 2 === 0 ? colInRow : 9 - colInRow
  const row = 9 - rowFromBottom
  return { col, row }
}

/** Center of a square as percentages of the board box. */
export function squareCenterPercent(square: number): { x: number; y: number } {
  const { col, row } = squareToCell(square)
  return {
    x: (col + 0.5) * 10,
    y: (row + 0.5) * 10,
  }
}

/** Squares visited when walking from `from` toward `to` by +1 each step (no wrap). */
export function pathSquares(from: Square, to: Square): number[] {
  if (to <= from) return []
  const steps: number[] = []
  for (let s = from + 1; s <= to; s += 1) steps.push(s)
  return steps
}

export function rollDie(): number {
  return 1 + Math.floor(Math.random() * 6)
}
