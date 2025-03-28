import { DateTime } from "luxon";
import { Button, Table } from "react-bootstrap";
import { Judgements, ScoreData } from "../../../models/score";
import { calculateGrade } from "../../../utils/score-tools";
import {
  getChartByKey,
  useChartStore,
  useScoreDataStore,
} from "../../../hooks/store";
import "./scores-table.css";

interface ScoresTableProps {
  scoreData: ScoreData[];
  editable?: boolean;
}

const getGradeColor = (percent: number): string => {
  if (percent >= 100.0) {
    return "grade-sss";
  }
  if (percent >= 99.0) {
    return "grade-ss";
  }
  if (percent >= 97.0) {
    return "grade-s";
  }
  return "";
};

const stringifyJudgements = (judgements: Judgements) => {
  return (
    <p className="styled-judgements">
      <span style={{ color: "#91880b" }}>{judgements.perfect}</span>-
      <span style={{ color: "#f36f83" }}>{judgements.great}</span>-
      <span style={{ color: "#26a826" }}>{judgements.good}</span>-
      <span style={{ color: "var(--bs-body-color)" }}>{judgements.miss}</span>
    </p>
  );
};

const ScoresTable = ({ scoreData, editable }: ScoresTableProps) => {
  const scoreDataStore = useScoreDataStore();
  return scoreData && scoreData.length > 0 ? (
    <Table striped bordered responsive>
      <thead>
        <tr>
          <td align="center">Song</td>
          <td align="center">Difficulty</td>
          <td align="center">Percent</td>
          <td align="center">Judgements</td>
          <td align="center">Date</td>
          {editable && <td></td>}
        </tr>
      </thead>
      <tbody>
        {scoreData.map((score) => {
          return (
            <tr key={`${score.identifier}-${score.timeAchieved}`}>
              <td align="center" valign="middle">
                {
                  getChartByKey(
                    useChartStore.getState(),
                    `${score.identifier}-${score.difficulty}`
                  ).song
                }
              </td>
              <td
                align="center"
                valign="middle"
                className={`difficulty-${score.difficulty
                  .replace(":", "")
                  .toLowerCase()}`}
              >
                {score.difficulty}
              </td>
              <td
                align="center"
                valign="middle"
                style={{ fontWeight: 700 }}
                className={getGradeColor(score.percent)}
              >
                <span>{calculateGrade(score.percent)}</span>
                <br />
                {score.percent}%
              </td>
              <td align="center" valign="middle">
                {stringifyJudgements(score.judgements)}
              </td>
              <td align="center" valign="middle">
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
