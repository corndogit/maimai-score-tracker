import { PageTitles } from "../shared/page-titles";
import { BasePage } from "../shared/base-page";
import ScoresTable from "../shared/scores-table/scores-table";
import { useScoreDataStore } from "../../hooks/store";

export const ViewScoresPage = () => {
  const scores = useScoreDataStore();
  return (
    <BasePage>
      <PageTitles
        title="View Scores"
        subtitle="View and search for submitted scores"
      />
      <ScoresTable scoreData={scores.scoreData} />
    </BasePage>
  );
};
