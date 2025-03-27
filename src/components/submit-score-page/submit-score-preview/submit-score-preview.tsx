import { ScoreData } from "../../../models/score";
import ScoresTable from "../../shared/scores-table/scores-table";

interface ScorePreviewProps {
  scoreData: ScoreData[];
}

export const SubmitScorePreview = ({ scoreData }: ScorePreviewProps) => {
  return (
    <>
      <h4>Scores added</h4>
      <ScoresTable scoreData={scoreData} />
    </>
  );
};
