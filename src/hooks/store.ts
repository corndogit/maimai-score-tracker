import { create } from 'zustand';
import { ScoreData } from '../models/score';
import songNamesJson from '../data/song_names.json';

const songNames: Record<string, string> = songNamesJson;

interface ScoreDataState {
  scoreData: ScoreData[]
}

interface SongNamesState {
  songNames: Record<string, string>
  getAllNames: () => string[]
  getByIdentifier: (identifier: string) => string
}

// to be used for fetching scores from an API
export const useScoreDataStore = create<ScoreDataState>((set) => ({
  scoreData: [],
  addScore: (score: ScoreData) => set((state) => ({ scoreData: [...state.scoreData, score] })),
  removeAllScores: () => set({ scoreData: [] }),
  updateScores: (scores: ScoreData[]) => set({ scoreData: scores }),
}));

export const useSongNameStore = create<SongNamesState>(() => ({
  songNames,
  getAllNames: () => Object.values(songNames),
  getByIdentifier: (identifier: string) => songNames[identifier]
}))