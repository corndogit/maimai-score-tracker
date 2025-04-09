import { DateTime } from "luxon";
import { allowedDifficulties, allowedLamps, Chart } from "../models/chart";
import { Judgements, ScoreData } from "../models/score";

export const isNumeric = (value?: number): boolean => {
  return value !== undefined && !isNaN(value) && isFinite(value);
};

export const isInteger = (value?: number): boolean => {
  return value !== undefined && isNumeric(value) && Number.isInteger(value);
};

const isValidIdentifier = (
  score: ScoreData,
  validIdentifiers: Set<string>
): boolean => {
  return validIdentifiers.has(score.identifier);
};

const isValidClearType = (score: ScoreData): boolean => {
  return allowedLamps.includes(score.lamp);
};

const isValidDifficulty = (score: ScoreData): boolean => {
  return allowedDifficulties.includes(score.difficulty);
};

const isValidHitMeta = (score: ScoreData): boolean => {
  const hitMeta = score.hitMeta;
  if (!hitMeta) {
    return true;
  }
  return isNumeric(hitMeta.fast) && isNumeric(hitMeta.slow);
};

const isValidJudgements = (score: ScoreData): boolean => {
  return (
    isInteger(score.judgements.perfect) &&
    isInteger(score.judgements.great) &&
    isInteger(score.judgements.good) &&
    isInteger(score.judgements.miss)
  );
};

const isValidTimeAchieved = (score: ScoreData): boolean => {
  return (
    !score.timeAchieved ||
    (isNumeric(score.timeAchieved) &&
      DateTime.fromMillis(score.timeAchieved).isValid === true)
  );
};

export const isClear = (percent: string): boolean => {
  return parseFloat(percent) >= 80.0;
};

export const isFailed = (percent: string): boolean => {
  return parseFloat(percent) < 80.0;
};

export const isFullCombo = (
  judgements: Judgements,
  chart: Chart | undefined
) => {
  return (
    judgements.perfect +
      judgements.great +
      judgements.good -
      judgements.miss ===
    chart?.notes
  );
};

export const isAllPerfect = (
  judgements: Judgements,
  selectedChart: Chart | undefined
) => {
  return (
    judgements.perfect === selectedChart?.notes &&
    judgements.great === 0 &&
    judgements.good === 0 &&
    judgements.miss === 0
  );
};

export const isAllPerfectPlus = (
  judgements: Judgements,
  selectedChart: Chart | undefined,
  percent: string | number,
  maxPercent: string | number
) => {
  return isAllPerfect(judgements, selectedChart) && percent === maxPercent;
};

export const validateScoreImport = (
  score: ScoreData,
  chartIdentifiers: Set<string>
): Array<string> => {
  const errors: string[] = [];
  if (!isValidIdentifier(score, chartIdentifiers)) {
    errors.push("identifier");
  }
  if (!isValidClearType(score)) {
    errors.push("lamp");
  }
  if (!isValidDifficulty(score)) {
    errors.push("difficulty");
  }
  if (!isNumeric(score.percent)) {
    errors.push("percent");
  }
  if (!isValidJudgements(score)) {
    errors.push(
      "judgements (requires 'perfect', 'great', 'good' and 'miss' as numbers)"
    );
  }
  if (!isValidHitMeta(score)) {
    errors.push("hitMeta (requires 'fast' and 'slow' as numbers)");
  }
  if (!isValidTimeAchieved(score)) {
    errors.push("timeAchieved");
  }
  return errors;
};

export const validateClearType = (
  clearType: string,
  judgements: Judgements,
  percent: string,
  maxPercent: string,
  selectedChart?: Chart
): boolean => {
  switch (clearType) {
    case "FAILED":
      return isFailed(percent);
    case "CLEAR":
      return isClear(percent);
    case "FULL COMBO":
      return isFullCombo(judgements, selectedChart);
    case "ALL PERFECT":
      return isAllPerfect(judgements, selectedChart);
    case "ALL PERFECT+":
      return isAllPerfectPlus(judgements, selectedChart, percent, maxPercent);
    default:
      return false;
  }
};
