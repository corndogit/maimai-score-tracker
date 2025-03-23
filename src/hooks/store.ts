import { create } from "zustand";
import { ScoreData } from "../models/score";
import { Chart } from "../models/chart";
import chartsJson from "../data/charts.json";

const chartDataRecord: Record<string, Chart> = chartsJson;

interface ScoreDataState {
  scoreData: ScoreData[];
  addScore: (score: ScoreData) => void;
  removeAllScores: () => void;
}

interface ChartState {
  chartDataRecord: Record<string, Chart>;
  chartData: Chart[];
}

export const useScoreDataStore = create<ScoreDataState>((set) => ({
  scoreData: [],
  addScore: (score: ScoreData) => {
    set((state) => ({ scoreData: [...state.scoreData, score] }));
  },
  removeAllScores: () => {
    set(() => ({ scoreData: [] }));
  },
}));

export const useChartStore = create<ChartState>(() => ({
  chartDataRecord,
  chartData: Object.values(chartDataRecord).sort((a, b) =>
    a.song.localeCompare(b.song)
  ),
}));

export const getChartByKey = (charts: ChartState, key: string): Chart => {
  return charts.chartDataRecord[key as keyof typeof charts.chartDataRecord];
};
