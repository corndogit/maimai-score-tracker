import { v4 } from "uuid";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import chartsJson from "../data/charts.json";
import { Chart } from "../models/chart";
import { DanRank } from "../models/dan-rank";
import { ScoreData } from "../models/score";
import { TachiScoreData } from "../models/tachi-request";

const chartDataRecord: Record<string, Chart> = chartsJson;

interface ScoreDataState {
  scoreData: ScoreData[]; // may want to replace with a map of <uuid, score>
  danRank?: DanRank;
  addScore: (score: ScoreData) => void;
  setDanRank: (rank: DanRank) => void;
  removeScore: (uuid?: string) => void;
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
      addScore: (score: ScoreData | TachiScoreData) => {
        const scoreToPersist =
          (score as ScoreData).uuid === undefined
            ? { ...score, uuid: v4() }
            : score;
        set({ scoreData: [...get().scoreData, scoreToPersist] });
      },
      setDanRank: (danRank: DanRank) => set({ danRank }),
      removeScore: (uuid?: string) => {
        if (!uuid) return;
        set({
          scoreData: get().scoreData.filter((score) => score.uuid !== uuid),
        });
      },
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
