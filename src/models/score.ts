export type ScoreData = {
  uuid?: string;
  identifier: string;
  matchType: string; // "inGameID"
  lamp: string;
  difficulty: string;
  percent: number;
  judgements: Judgements;
  hitMeta?: HitMeta;
  breakJudgements?: BreakJudgements;
  timeAchieved?: number;
};

export type Judgements = {
  perfect: number;
  great: number;
  good: number;
  miss: number;
};

export type HitMeta = {
  fast: number;
  slow: number;
};

export type BreakJudgements = {
  breakPerfect: number;
  breakGreat: number;
  breakGood: number;
  breakMiss: number;
  breakScore: number;
  totalScore: number;
};
