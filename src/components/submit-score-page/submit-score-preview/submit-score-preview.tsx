import { ScoreData } from "../../../models/score";
import ScoresTable from "../../shared/scores-table/scores-table";

interface ScorePreviewProps {
  scoreData: ScoreData[];
}

export const SubmitScorePreview = ({ scoreData }: ScorePreviewProps) => {
  const displayLimit = 10;
  const totalScores = scoreData.length;
  return (
    <>
      <h4>Scores previously added</h4>
      <ScoresTable scoreData={scoreData.slice(0, displayLimit)} />
      {totalScores > displayLimit && (
        <p>
          Showing {Math.min(totalScores, displayLimit)} out of {totalScores}{" "}
          score
          {totalScores !== 1 && "s"}.
        </p>
      )}
    </>
  );
};
