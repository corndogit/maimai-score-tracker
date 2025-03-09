export type ScoreData = {
  identifier: String
  displayName?: String  // Should replace with a function that maps identifier to name
  matchType: "inGameID";
  lamp: String
  difficulty: String
  percent: number
  judgements: Judgements
  timeAchieved: number
}

export type Judgements = BasicJudgements | AdvancedJudgements;

export type BasicJudgements = {
  perfect: number
  great: number
  good: number
  miss: number
}

export type AdvancedJudgements = BasicJudgements & {
  fast?: number
  late?: number
  breakPerfect?: number
  breakGreat?: number
  breakGood?: number
  breakMiss?: number
}