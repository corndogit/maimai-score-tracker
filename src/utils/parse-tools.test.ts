import { describe, expect, it } from "vitest";
import { validateScoreImport } from "./parse-tools";
import { EXAMPLE_SCORE } from "./test-helpers.support";
import { Chart } from "../models/chart";
import chartsJson from "../data/charts.json";

const chartDataRecord: Record<string, Chart> = chartsJson;
const chartIdentifiers = new Set(
  Object.values(chartDataRecord).map((chart) => chart.id.toString())
);
const { TEST_SCORE } = EXAMPLE_SCORE;

describe("validateScoreImport", () => {
  it("can import a score", () => {
    expect(validateScoreImport(TEST_SCORE, chartIdentifiers)).toHaveLength(0);
  });
});
