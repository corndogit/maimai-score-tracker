export type Chart = {
  id: number;
  song: string;
  category: string;
  difficulty: string;
  level: string;
  chartConstant: number;
  notes: number;
  tap: number;
  hold: number;
  slide: number;
  break: number;
};

export const allowedLamps = [
  "FAILED",
  "CLEAR",
  "FULL COMBO",
  "ALL PERFECT",
  "ALL PERFECT+",
];

export const allowedDifficulties = [
  "Basic",
  "Advanced",
  "Expert",
  "Master",
  "Re:Master",
];
