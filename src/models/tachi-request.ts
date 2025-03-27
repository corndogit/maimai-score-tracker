import { ScoreData } from "./score";

export type TachiScoreData = Omit<ScoreData, "uuid">;

export type TachiRequest = {
  meta: { game: string; service: string; playtype: string };
  scores: TachiScoreData[];
  classes?: { dan: string };
};

export const requestTemplate: TachiRequest = {
  meta: { game: "maimai", service: "manual", playtype: "Single" },
  scores: [],
};
