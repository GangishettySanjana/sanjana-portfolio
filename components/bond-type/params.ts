// "Sanjana" = 7 letters (6 gaps, 7 dy)
// "Design"  = 6 letters (5 gaps, 6 dy)

export const TICKS = 61;
export const FPS = 32;

export const EASE_MOVE = [
  0, 0.014, 0.044, 0.193, 0.317, 0.545, 0.621, 0.735, 0.777, 0.838, 0.868,
  0.908, 0.924, 0.95, 0.962, 0.979, 0.985, 0.994, 0.996, 1,
];

export const EASE_RETURN = [
  0.0, 0.0115, 0.023, 0.0475, 0.072, 0.1835, 0.295, 0.3645,
  0.434, 0.534, 0.634, 0.667, 0.7, 0.7495, 0.799, 0.8175,
  0.836, 0.862, 0.888, 0.8995, 0.911, 0.9275, 0.944, 0.949,
  0.954, 0.9685, 0.983, 0.985, 0.987, 0.9915, 0.996, 0.998, 1.0,
];

export const GREEN = "#f5333f";
export const WHITE = "#fdfefd";

export const CAP_H = 56 / 304;
export const FONT_FAMILY = '"Press Start 2P", monospace';
export const FONT_WEIGHT = 400;

export const BASELINE_1 = 140 / 304;
export const LINE_PITCH = 67.5 / 304;

export const JITTER_CELLS = 1;
export const JITTER_S = 5.2;
export const JITTER_GATE = 0.975;
export const JITTER_EASE_TICKS = 6;

export const BOND_CELL_SCALE = 0.5;
export const CAP_PIXELS = 9;
export const BOND_AIR_CELLS = 2;
export const BOND_MIN_CELLS = 1;
export const BOND_WEIGHT_CELLS = 2;
export const BOND_BOW_CELLS = 1;
export const BOND_BOW_S = 7;
export const BOND_ON_TICK = 3;
export const BOND_OFF_BEFORE_HOME = 2;

export const LINES = ["Sanjana", "Design"] as const;

export interface Pose {
  gaps: number[][];
  shift: number[];
  dy: number[][];
}

export const POSES: Pose[] = [
  // Pose 0 — vee (line 0) / ascending (line 1)
  {
    gaps: [
      [44, 52, 46, 56, 48, 50].map((v) => v / 304),
      [58, 64, 52, 60, 56].map((v) => v / 304),
    ],
    shift: [4.5 / 304, -8.0 / 304],
    dy: [
      [-30, -13, -6, 0, -6, -13, -30].map((v) => v / 304),
      [8, 19, 30, 41, 52, 30].map((v) => v / 304),
    ],
  },
  // Pose 1 — wave (line 0) / wave-down (line 1)
  {
    gaps: [
      [50, 44, 56, 52, 46, 48].map((v) => v / 304),
      [60, 52, 68, 56, 58].map((v) => v / 304),
    ],
    shift: [-3.8 / 304, 12.0 / 304],
    dy: [
      [-6, -30, -54, -30, -6, -30, -6].map((v) => v / 304),
      [48, 30, 8, 30, 48, 30].map((v) => v / 304),
    ],
  },
  // Pose 2 — descending rake (line 0) / two-step (line 1)
  {
    gaps: [
      [46, 54, 44, 50, 52, 48].map((v) => v / 304),
      [62, 58, 52, 68, 54].map((v) => v / 304),
    ],
    shift: [-13.0 / 304, 6.5 / 304],
    dy: [
      [-6, -18, -30, -42, -54, -42, -30].map((v) => v / 304),
      [8, 8, 8, 52, 52, 52].map((v) => v / 304),
    ],
  },
  // Pose 3 — double-vee (line 0) / arc (line 1)
  {
    gaps: [
      [54, 46, 60, 44, 58, 52].map((v) => v / 304),
      [56, 66, 54, 60, 58].map((v) => v / 304),
    ],
    shift: [-4.5 / 304, -2.8 / 304],
    dy: [
      [-27, -6, -33, -54, -33, -6, -27].map((v) => v / 304),
      [30, 46, 52, 46, 30, 46].map((v) => v / 304),
    ],
  },
  // Pose 4 — step (line 0) / wave (line 1)
  {
    gaps: [
      [52, 48, 58, 44, 56, 50].map((v) => v / 304),
      [66, 54, 62, 56, 60].map((v) => v / 304),
    ],
    shift: [4.8 / 304, -11.5 / 304],
    dy: [
      [-54, -54, -27, -6, -27, -54, -54].map((v) => v / 304),
      [52, 30, 8, 30, 52, 30].map((v) => v / 304),
    ],
  },
  // Pose 5 — wave+drop (line 0) / ascending-arc (line 1)
  {
    gaps: [
      [44, 50, 54, 46, 52, 48].map((v) => v / 304),
      [58, 62, 54, 66, 52].map((v) => v / 304),
    ],
    shift: [-1.2 / 304, 8.5 / 304],
    dy: [
      [-30, -13, -6, -13, -30, -13, -6].map((v) => v / 304),
      [8, 19, 30, 41, 52, 41].map((v) => v / 304),
    ],
  },
];

export const SCATTERS_MIN = 2;
export const SCATTERS_MAX = 4;
export const MOVE_TICKS = 20;
export const RETURN_TICKS = 17;
export const HOLD_TICKS = 8;
export const ARRIVE_SPREAD = 0.08;
