import { PageTitles } from "../shared/page-titles";
import { BasePage } from "../shared/base-page";
import { ScoreData } from "../../models/score";
import ScoresTable from "../shared/scores-table/scores-table";

const testScoreData: ScoreData[] = [
  {
    identifier: "751",
    matchType: "inGameID",
    lamp: "CLEAR",
    difficulty: "Advanced",
    percent: 99.59,
    judgements: { perfect: 376, great: 11, good: 0, miss: 1 },
    timeAchieved: 1736274480000,
  },
  {
    identifier: "850",
    matchType: "inGameID",
    lamp: "FULL COMBO",
    difficulty: "Advanced",
    percent: 100.15,
    judgements: { perfect: 351, great: 7, good: 0, miss: 0 },
    timeAchieved: 1738606920000,
  },
];

export const ViewScoresPage = () => {
  return (
    <BasePage>
      <PageTitles
        title="View Scores"
        subtitle="View and search for submitted scores"
      />
      <ScoresTable scoreData={testScoreData} />
    </BasePage>
  );
};
