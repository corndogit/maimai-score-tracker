import { useScoreDataStore } from "../../../hooks/store";
import ScoresTable from "../../shared/scores-table/scores-table";

export const SubmitScorePreview = () => {
  const testScoreData = useScoreDataStore();
  return (
    <>
      <h4>Scores to be added</h4>
      <ScoresTable scoreData={testScoreData.scoreData.slice(0, 3)} />
    </>
  );
};
