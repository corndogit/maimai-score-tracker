import { DateTime } from "luxon";
import { Button, OverlayTrigger, Table, Tooltip } from "react-bootstrap";
import { ScoreData } from "../../../models/score";
import { calculateGrade, calculateMaxScore } from "../../../utils/score-tools";
import {
  getChartByKey,
  useChartStore,
  useScoreDataStore,
} from "../../../hooks/store";
import "./scores-table.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHourglass, faTrash } from "@fortawesome/free-solid-svg-icons";
import "../../shared/css/clear-type.css";
import { getClearTypeCssClass } from "../css/clear-type";
import { IndividualScoreModal } from "./individual-score-modal/individual-score-modal";
import { useState } from "react";
import { JudgementDisplay } from "./judgement-display/judgement-display";

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

type ScoreModalState = {
  showModal: boolean;
  score: ScoreData;
};

const defaultScoreModalState: ScoreModalState = {
  showModal: false,
  score: {} as ScoreData,
};

const ScoresTable = ({ scoreData, editable }: ScoresTableProps) => {
  const scoreDataStore = useScoreDataStore();
  const [scoreModalState, setScoreModalState] = useState(
    defaultScoreModalState
  );

  const handleCloseScoreModal = () => {
    setScoreModalState({ ...scoreModalState, showModal: false });
  };

  return scoreData && scoreData.length > 0 ? (
    <>
      <Table striped bordered responsive>
        <thead>
          <tr>
            <td align="center">Song</td>
            <td align="center">Difficulty</td>
            <td align="center">Percent</td>
            <td align="center">Lamp</td>
            <td align="center">Judgements</td>
            <td align="center">Date</td>
            {editable && <td align="center">Options</td>}
          </tr>
        </thead>
        <tbody>
          {scoreData.map((score) => {
            const chart = getChartByKey(
              useChartStore.getState(),
              `${score.identifier}-${score.difficulty}`
            );
            return (
              <tr key={score.uuid}>
                <td align="center" valign="middle">
                  <a
                    onClick={() => {
                      setScoreModalState({ showModal: true, score });
                    }}
                    style={{ textDecoration: "underline", cursor: "pointer" }}
                  >
                    {chart?.song}
                  </a>
                </td>
                <td
                  align="center"
                  valign="middle"
                  className={`difficulty-${score.difficulty
                    .replace(":", "")
                    .toLowerCase()}`}
                >
                  {score.difficulty} <br />
                  {chart?.level}
                </td>
                <td
                  align="center"
                  valign="middle"
                  className={getClearTypeCssClass(score.lamp)}
                  style={{ fontWeight: 700 }}
                >
                  {score.lamp}
                </td>
                <td
                  align="center"
                  valign="middle"
                  style={{ fontWeight: 700 }}
                  className={getGradeColor(score.percent)}
                >
                  <span>
                    {chart &&
                      calculateGrade(score.percent, calculateMaxScore(chart))}
                  </span>
                  <br />
                  {score.percent.toFixed(2)}%
                </td>
                <td align="center" valign="middle">
                  <JudgementDisplay judgements={score.judgements} />
                  {score.hitMeta && (
                    <div>
                      <OverlayTrigger
                        placement="right"
                        overlay={
                          <Tooltip>
                            Fast: {score.hitMeta.fast}
                            <br />
                            Slow: {score.hitMeta.slow}
                          </Tooltip>
                        }
                      >
                        <FontAwesomeIcon icon={faHourglass} />
                      </OverlayTrigger>
                    </div>
                  )}
                </td>
                <td align="center" valign="middle">
                  {score.timeAchieved
                    ? DateTime.fromMillis(score.timeAchieved).toLocaleString(
                        DateTime.DATETIME_MED
                      )
                    : "Not set"}
                </td>
                {editable && (
                  <td align="center" valign="middle">
                    <Button
                      variant="danger"
                      onClick={() => scoreDataStore.removeScore(score.uuid)}
                    >
                      <FontAwesomeIcon className="m-0 p-0" icon={faTrash} />
                    </Button>
                  </td>
                )}
              </tr>
            );
          })}
        </tbody>
      </Table>
      <IndividualScoreModal
        score={scoreModalState.score}
        show={scoreModalState.showModal}
        handleClose={handleCloseScoreModal}
      />
    </>
  ) : (
    <p>No score data.</p>
  );
};

export default ScoresTable;
