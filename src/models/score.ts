export type ScoreData = {
  uuid?: string;
  identifier: string;
  matchType: string; // "inGameID"
  lamp: string;
  difficulty: string;
  percent: number;
  judgements: Judgements;
  hitMeta?: HitMeta;
  timeAchieved: number;
};

export type Judgements = BasicJudgements | AdvancedJudgements;

export type BasicJudgements = {
  perfect: number;
  great: number;
  good: number;
  miss: number;
};

export type HitMeta = {
  fast: number;
  slow: number;
};

export type AdvancedJudgements = BasicJudgements &
  HitMeta & {
    breakPerfect?: number;
    breakGreat?: number;
    breakGood?: number;
    breakMiss?: number;
  };

export type Colour = {
  name: string;
  display_name: string;
};
