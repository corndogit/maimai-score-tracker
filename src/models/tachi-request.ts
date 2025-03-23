import { ScoreData } from "./score";

export type TachiRequest = {
  meta: { game: string; service: string; playtype: string };
  scores: ScoreData[];
  classes?: { dan: string };
};

export const requestTemplate: TachiRequest = {
  meta: { game: "maimai", service: "manual", playtype: "Single" },
  scores: [],
};
