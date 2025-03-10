import { create } from 'zustand';
import { ScoreData } from '../models/score';

interface ScoreDataState {
  scoreData: ScoreData[]
}

// to be used for fetching scores from an API
const useScoreDataStore = create<ScoreDataState>((set) => ({
  scoreData: [],
  addScore: (score: ScoreData) => set((state) => ({ scoreData: [...state.scoreData, score] })),
  removeAllScores: () => set({ scoreData: [] }),
  updateScores: (scores: ScoreData[]) => set({ scoreData: scores }),
}));
