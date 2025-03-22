export type ScoreData = {
  identifier: string;
  matchType: string; // "inGameID"
  lamp: string;
  difficulty: string;
  percent: number;
  judgements: Judgements;
  timeAchieved: number;
};

export type Judgements = BasicJudgements | AdvancedJudgements;

export type BasicJudgements = {
  perfect: number;
  great: number;
  good: number;
  miss: number;
};

export type AdvancedJudgements = BasicJudgements & {
  fast?: number;
  late?: number;
  breakPerfect?: number;
  breakGreat?: number;
  breakGood?: number;
  breakMiss?: number;
};

export type DanRank = {
  name: string;
  display_name: string;
};

export type Colour = {
  name: string;
  display_name: string;
};

export enum ClearType {
  PLAYED = "Played",
  FULL_COMBO = "Full Combo",
  ALL_PERFECT = "All Perfect",
  ALL_PERFECT_PLUS = "All Perfect+",
}
