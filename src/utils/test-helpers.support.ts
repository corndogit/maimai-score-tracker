import { Chart } from "../models/chart";
import { ScoreData } from "../models/score";

export const EXAMPLE_SCORE = {
  MAX_SCORE: 100.45,
  TEST_CHART: {
    id: 787,
    song: "SHINY DAYS",
    category: "Pops & Anime",
    difficulty: "Basic",
    level: "3",
    chartConstant: 3,
    notes: 98,
    tap: 86,
    hold: 7,
    slide: 2,
    break: 3,
  } as Chart,
  TEST_SCORE: {
    identifier: "787",
    matchType: "inGameID",
    lamp: "CLEAR",
    difficulty: "Basic",
    percent: 99.56,
    judgements: {
      perfect: 92,
      great: 3,
      good: 2,
      miss: 1,
    },
    hitMeta: {
      fast: 3,
      slow: 2,
    },
    breakJudgements: {
      breakPerfect: 3,
      breakGreat: 0,
      breakGood: 0,
      breakMiss: 0,
      totalScore: 120000, // not accurate
      breakScore: 7800,
    },
    timeAchieved: 1747994400000,
  } as ScoreData,
};
