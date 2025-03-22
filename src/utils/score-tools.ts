import { Chart } from "../models/chart";

export const calculateGrade = (percent: number): string => {
  if (percent >= 100.0) {
    return "SSS";
  }
  if (percent >= 99.5) {
    return "SS+";
  }
  if (percent >= 99.0) {
    return "SS";
  }
  if (percent >= 98.0) {
    return "S";
  }
  if (percent >= 97.0) {
    return "S";
  }
  if (percent >= 94.0) {
    return "AAA";
  }
  if (percent >= 90.0) {
    return "AA";
  }
  if (percent >= 80.0) {
    return "A";
  }
  return "B";
};

const calculateMaxRawScore = (chart: Chart): number => {
  return (
    chart.notes * 500 +
    chart.hold * 1000 +
    chart.slide * 1500 +
    chart.break * 2600
  );
};

export const calculateMaxScore = (chart: Chart): number => {
  const rawScore = calculateMaxRawScore(chart);
  return (rawScore / (rawScore - chart.break * 100)) * 100;
};
