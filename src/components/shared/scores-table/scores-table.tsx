import { Table } from "react-bootstrap";
import { Judgements, ScoreData } from "../../../models/score";
import { DateTime } from "luxon";

interface ScoreTableData {
  scoreData: ScoreData[];
}

const stringifyJudgements = (judgements: Judgements) => {
  return `${judgements.perfect}-${judgements.great}-${judgements.good}-${judgements.miss}`;
};

const ScoresTable = ({ scoreData }: ScoreTableData) => {
  return scoreData.length > 0 ? (
    <Table striped bordered hover>
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
            <tr>
              <td>{score.displayName ?? `Song ID: ${score.identifier}`}</td>
              <td>{score.difficulty}</td>
              <td>
                {"<grade>"}
                <br />
                {score.percent}
              </td>
              <td>{stringifyJudgements(score.judgements)}</td>
              <td>{DateTime.fromMillis(score.timeAchieved).toISO()}</td>
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
