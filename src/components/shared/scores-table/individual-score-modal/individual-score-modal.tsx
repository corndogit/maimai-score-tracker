import { Button, Modal } from "react-bootstrap";
import { ScoreData } from "../../../../models/score";
import {
  calculateGrade,
  calculateMaxScore,
  getSongNameByIdentifier,
} from "../../../../utils/score-tools";
import { JudgementDisplay } from "../judgement-display/judgement-display";
import { DateTime } from "luxon";
import "./individual-score-modal.css";
import { getChartByKey, useChartStore } from "../../../../hooks/store";
import { Chart } from "../../../../models/chart";

type Props = {
  score: ScoreData;
  show: boolean;
  handleClose: (score: ScoreData) => void;
};
export const IndividualScoreModal = ({
  score,
  show,
  handleClose: setSelectedScore,
}: Props) => {
  const chartStore = useChartStore();
  const chart: Chart | undefined = getChartByKey(
    chartStore,
    `${score.identifier}-${score.difficulty}`
  );
  return (
    <Modal show={show}>
      <Modal.Header>
        <Modal.Title>{getSongNameByIdentifier(score.identifier)}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ul id="score-info">
          <li>
            <span className="score-info-subheading">Name</span>:{" "}
            {getSongNameByIdentifier(score.identifier)}
          </li>
          <li>
            <span className="score-info-subheading">Difficulty</span>:{" "}
            {score.difficulty} {chart?.level}
          </li>
          <li>
            <span className="score-info-subheading">Lamp</span>: {score.lamp}
          </li>
          <li>
            <span className="score-info-subheading">Score</span>:{" "}
            {chart
              ? calculateGrade(score.percent, calculateMaxScore(chart))
              : ""}{" "}
            - {score.percent}%
          </li>
          <li>
            <span className="score-info-subheading">Judgements</span>:{" "}
            <JudgementDisplay judgements={score.judgements} />
          </li>
          <li>
            <span className="score-info-subheading">Timing</span>:{" "}
            {score.hitMeta
              ? `Fast: ${score.hitMeta.fast} - Slow: ${score.hitMeta.slow}`
              : "Not set"}
          </li>
          <li>
            <span className="score-info-subheading">Time achieved</span>:{" "}
            {score.timeAchieved
              ? DateTime.fromMillis(score.timeAchieved).toLocaleString(
                  DateTime.DATETIME_MED
                )
              : "Not set"}
          </li>
        </ul>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={() => setSelectedScore({} as ScoreData)}
        >
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
