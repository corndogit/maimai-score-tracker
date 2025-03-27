import { DateTime } from "luxon";
import { Table } from "react-bootstrap";
import { Judgements, ScoreData } from "../../../models/score";
import { calculateGrade } from "../../../utils/score-tools";
import { getChartByKey, useChartStore } from "../../../hooks/store";

interface ScoreTableData {
  scoreData: ScoreData[];
}

const stringifyJudgements = (judgements: Judgements) => {
  return `${judgements.perfect}-${judgements.great}-${judgements.good}-${judgements.miss}`;
};

const ScoresTable = ({ scoreData }: ScoreTableData) => {
  return scoreData && scoreData.length > 0 ? (
    <Table striped bordered responsive>
      <thead>
        <tr>
          <td>Song</td>
          <td>Difficulty</td>
          <td>Percent</td>
          <td>Judgements</td>
          <td>Date</td>
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
