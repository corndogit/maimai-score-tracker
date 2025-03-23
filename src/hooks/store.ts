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

export const getAllCharts = (
  charts: ChartState,
  searchTerm: string = ""
): Chart[] => {
  if (!searchTerm) {
    return charts.chartData;
  }
  const searchTermLower = searchTerm.toLowerCase();
  const filtered: Chart[] = [];

  for (let i = 0; i < charts.chartData.length; i++) {
    const chart = charts.chartData[i];
    if (chart.song.toLowerCase().indexOf(searchTermLower)) {
      filtered.push(chart);
    }
  }
  return filtered;
};

export const getChartByKey = (charts: ChartState, key: string): Chart => {
  return charts.chartDataRecord[key as keyof typeof charts.chartDataRecord];
};
