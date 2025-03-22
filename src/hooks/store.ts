import { create } from "zustand";
import { ScoreData } from "../models/score";
import { Chart } from "../models/chart";
import chartsJson from "../data/charts.json";
import songNamesJson from "../data/song_names.json";
import testScoreData from "../data/placeholder/maimai-scores-1740695287.json";

const songNames: Record<string, string> = songNamesJson;
const chartData: Record<string, Chart> = chartsJson;

interface ScoreDataState {
  scoreData: ScoreData[];
}

interface ChartState {
  chartData: Chart[];
  getAllCharts: (searchTerm?: string) => Chart[];
  getById: (id: number, difficulty: string) => Chart;
  getByKey: (key: string) => Chart;
}

interface SongNamesState {
  songNames: Record<string, string>;
  getAllNames: (search: string) => string[];
  getByIdentifier: (identifier: string) => string;
}

// to be used for fetching scores from an API
export const useScoreDataStore = create<ScoreDataState>((set) => ({
  scoreData: testScoreData["scores"],
  addScore: (score: ScoreData) =>
    set((state) => ({ scoreData: [...state.scoreData, score] })),
  removeAllScores: () => set({ scoreData: [] }),
  updateScores: (scores: ScoreData[]) => set({ scoreData: scores }),
}));

// todo: remove and replace uses with useChartsStore
export const useSongNameStore = create<SongNamesState>(() => ({
  songNames,
  getAllNames: () => Object.values(songNames), // this is really shit
  getByIdentifier: (identifier: string) => songNames[identifier],
}));

export const useChartStore = create<ChartState>(() => ({
  chartData: Object.values(chartData).sort((a, b) =>
    a.song.localeCompare(b.song)
  ),
  getAllCharts: (searchTerm: string = "") => {
    const charts = Object.values(chartData).sort((a, b) =>
      a.song.localeCompare(b.song)
    );
    if (searchTerm) {
      return charts.filter((chart) =>
        chart.song.toLowerCase().includes(searchTerm.toLowerCase())
      );
    } else {
      return charts;
    }
  },
  getById: (id: number, difficulty: string) => {
    const key = `${id}-${difficulty}` as keyof typeof chartsJson;
    return chartsJson[key];
  },
  getByKey: (key: string) => {
    return chartsJson[key as keyof typeof chartsJson];
  },
}));
