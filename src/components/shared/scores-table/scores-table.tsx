import { DateTime } from "luxon";
import { Button, Table } from "react-bootstrap";
import { Judgements, ScoreData } from "../../../models/score";
import { calculateGrade } from "../../../utils/score-tools";
import {
  getChartByKey,
  useChartStore,
  useScoreDataStore,
} from "../../../hooks/store";

interface ScoresTableProps {
  scoreData: ScoreData[];
  editable?: boolean;
}

const stringifyJudgements = (judgements: Judgements) => {
  return `${judgements.perfect}-${judgements.great}-${judgements.good}-${judgements.miss}`;
};

const ScoresTable = ({ scoreData, editable }: ScoresTableProps) => {
  const scoreDataStore = useScoreDataStore();
  return scoreData && scoreData.length > 0 ? (
    <Table striped bordered responsive>
      <thead>
        <tr>
          <td>Song</td>
          <td>Difficulty</td>
          <td>Percent</td>
          <td>Judgements</td>
          <td>Date</td>
          {editable && <td></td>}
        </tr>
      </thead>
      <tbody>
        {scoreData.map((score) => {
          return (
            <tr key={`${score.identifier}-${score.timeAchieved}`}>
              <td>
                {
                  getChartByKey(
                    useChartStore.getState(),
                    `${score.identifier}-${score.difficulty}`
                  ).song
                }
              </td>
              <td>{score.difficulty}</td>
              <td>
                {calculateGrade(score.percent)}
                <br />
                {score.percent}%
              </td>
              <td>{stringifyJudgements(score.judgements)}</td>
              <td>
                {DateTime.fromMillis(score.timeAchieved).toLocaleString(
                  DateTime.DATETIME_MED
                )}
              </td>
              {editable && (
                <td align="center" valign="middle">
                  <Button
                    variant="danger"
                    onClick={() => scoreDataStore.removeScore(score.uuid)}
                  >
                    X
                  </Button>
                </td>
              )}
            </tr>
          );
        })}
      </tbody>
    </Table>
  ) : (
    <p>No score data.</p>
  );
};

export default ScoresTable;
