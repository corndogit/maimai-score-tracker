import { describe, expect, it } from "vitest";
import { validateScoreImport } from "./parse-tools";
import { EXAMPLE_SCORE } from "./test-helpers.support";
import { Chart } from "../models/chart";
import chartsJson from "../data/charts.json";
import { HitMeta, ScoreData } from "../models/score";

const chartDataRecord: Record<string, Chart> = chartsJson;
const chartIdentifiers = new Set(
  Object.values(chartDataRecord).map((chart) => chart.id.toString())
);
const { TEST_SCORE } = EXAMPLE_SCORE;

describe("validateScoreImport", () => {
  it("can import a score", () => {
    const importedScore: ScoreData = {
      ...TEST_SCORE,
      hitMeta: { ...TEST_SCORE.hitMeta, maxCombo: 69 } as HitMeta,
    };
    const result = validateScoreImport(importedScore, chartIdentifiers);
    expect(result).toHaveLength(0);
  });
});
