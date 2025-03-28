import { DateTime } from "luxon";
import { allowedDifficulties, allowedLamps } from "../models/chart";
import { ScoreData } from "../models/score";

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
    isNumeric(score.timeAchieved) &&
    DateTime.fromMillis(score.timeAchieved).isValid === true
  );
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
