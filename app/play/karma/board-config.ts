// Board layout for Three Refusals.
// Names are placeholders. Replace once the real history is verified.

export type Passage = {
  from: number;
  to: number;
  name: string;
};

export const LADDERS: Passage[] = [
  { from: 4,  to: 25, name: "patience" },
  { from: 13, to: 46, name: "honesty" },
  { from: 33, to: 49, name: "courage" },
  { from: 42, to: 63, name: "generosity" },
  { from: 50, to: 69, name: "restraint" },
  { from: 62, to: 81, name: "forgiveness" },
  { from: 74, to: 92, name: "humility" },
];

export const SNAKES: Passage[] = [
  { from: 27, to: 5,  name: "envy" },
  { from: 40, to: 3,  name: "greed" },
  { from: 43, to: 18, name: "vanity" },
  { from: 54, to: 31, name: "anger" },
  { from: 66, to: 45, name: "deceit" },
  { from: 76, to: 58, name: "indulgence" },
  { from: 89, to: 53, name: "pride" },
  { from: 99, to: 41, name: "contempt" },
];

export const BOARD_SIZE = 100;
export const REFUSALS_PER_PLAYER = 3;

/**
 * Win rule. Flip to 'overshoot' to allow finishing past 100.
 * 'exact'  — must land on 100; a roll that would pass stays put.
 * 'overshoot' — any roll that reaches or passes 100 wins (clamped to 100).
 */
export type WinRule = 'exact' | 'overshoot'
export const WIN_RULE: WinRule = 'exact'
