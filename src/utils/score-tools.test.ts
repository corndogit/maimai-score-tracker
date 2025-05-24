import { describe, expect, it } from "vitest";
import {
  calculateClearType,
  calculateGrade,
  calculateMaxScore,
  sortScoreDataByTime,
} from "./score-tools";
import { Judgements, ScoreData } from "../models/score";
import { EXAMPLE_SCORE } from "./test-helpers.support";

const { MAX_SCORE, TEST_CHART } = EXAMPLE_SCORE;

describe("calculateGrade", () => {
  it.each`
    score                 | grade
    ${{ val: MAX_SCORE }} | ${"SSS+"}
    ${{ val: 100.0 }}     | ${"SSS"}
    ${{ val: 99.5 }}      | ${"SS+"}
    ${{ val: 99.0 }}      | ${"SS"}
    ${{ val: 98.0 }}      | ${"S+"}
    ${{ val: 97.0 }}      | ${"S"}
    ${{ val: 94.0 }}      | ${"AAA"}
    ${{ val: 90.0 }}      | ${"AA"}
    ${{ val: 80.0 }}      | ${"A"}
    ${{ val: 79.0 }}      | ${"B"}
  `("returns $grade", ({ grade, score }) => {
    expect(calculateGrade(score.val, MAX_SCORE)).toEqual(grade);
  });
});

describe("calculateMaxScore", () => {
  it("calculates the correct score", async () => {
    const result = calculateMaxScore(TEST_CHART);
    expect(result.toFixed(2)).toEqual(MAX_SCORE.toString());
  });
});

describe("calculateClearType", () => {
  const defaultJudgements: Judgements = {
    perfect: 0,
    great: 0,
    good: 0,
    miss: 0,
  };
  const maxNotes = TEST_CHART.notes;
  it("returns ... if no chart is selected", async () => {
    expect(
      calculateClearType(
        defaultJudgements,
        "0",
        MAX_SCORE.toString(),
        undefined
      )
    ).toEqual("...");
  });

  it("returns ... if judgements do not add up to the chart total", async () => {
    expect(
      calculateClearType(
        defaultJudgements,
        "0",
        MAX_SCORE.toString(),
        TEST_CHART
      )
    ).toEqual("...");
  });

  it.each`
    clearType         | percent                          | judgements
    ${"ALL PERFECT+"} | ${{ val: MAX_SCORE.toString() }} | ${{ val: { ...defaultJudgements, perfect: maxNotes } }}
    ${"ALL PERFECT"}  | ${{ val: 100.0 }}                | ${{ val: { ...defaultJudgements, perfect: maxNotes } }}
    ${"FULL COMBO"}   | ${{ val: 98.0 }}                 | ${{ val: { ...defaultJudgements, perfect: maxNotes - 1, great: 1 } }}
    ${"CLEAR"}        | ${{ val: 97.0 }}                 | ${{ val: { ...defaultJudgements, perfect: maxNotes - 1, miss: 1 } }}
    ${"FAILED"}       | ${{ val: 0 }}                    | ${{ val: { ...defaultJudgements, miss: maxNotes } }}
  `("returns $clearType", ({ clearType, percent, judgements }) => {
    expect(
      calculateClearType(
        judgements.val,
        percent.val,
        MAX_SCORE.toString(),
        TEST_CHART
      )
    ).toEqual(clearType);
  });
});

describe("sortScoreDataByTime", () => {
  const timestamps = [5, 2, 3, undefined, 1, 4];
  const sortedTimestamps = [undefined, 1, 2, 3, 4, 5];
  const scores: ScoreData[] = timestamps.map(
    (t) => ({ timeAchieved: t } as ScoreData)
  );
  const mapScoresToTimes = (scores: ScoreData[]): (number | undefined)[] => {
    return scores.map((score) => score.timeAchieved);
  };
  it("sorts scores in descending order", async () => {
    const sortedScores = scores.sort(sortScoreDataByTime);
    expect(mapScoresToTimes(sortedScores)).toEqual(
      [...sortedTimestamps].reverse()
    );
  });
  it("sorts scores in ascending order", async () => {
    const sortedScores = scores.sort((a, b) => sortScoreDataByTime(a, b, true));
    expect(mapScoresToTimes(sortedScores)).toEqual(sortedTimestamps);
  });
});
