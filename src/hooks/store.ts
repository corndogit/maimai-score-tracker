import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { ScoreData } from "../models/score";
import { Chart } from "../models/chart";
import chartsJson from "../data/charts.json";
import { DanRank } from "../models/dan-rank";

const chartDataRecord: Record<string, Chart> = chartsJson;

interface ScoreDataState {
  scoreData: ScoreData[];
  danRank?: DanRank;
  addScore: (score: ScoreData) => void;
  setDanRank: (rank: DanRank) => void;
  removeAllScores: () => void;
}

interface ChartState {
  chartDataRecord: Record<string, Chart>;
  chartData: Chart[];
}

export const useScoreDataStore = create<ScoreDataState>()(
  persist(
    (set, get) => ({
      scoreData: [],
      addScore: (score: ScoreData) =>
        set({ scoreData: [...get().scoreData, score] }),
      setDanRank: (danRank: DanRank) => set({ danRank }),
      removeAllScores: () => {
        set({ scoreData: [] as ScoreData[] });
      },
    }),
    {
      name: "maimai-scores",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export const useChartStore = create<ChartState>(() => ({
  chartDataRecord,
  chartData: Object.values(chartDataRecord).sort((a, b) =>
    a.song.localeCompare(b.song)
  ),
}));

export const getChartByKey = (charts: ChartState, key: string): Chart => {
  return charts.chartDataRecord[key as keyof typeof charts.chartDataRecord];
};
