import { Col, Row } from "react-bootstrap";
import { useScoreDataStore } from "../../hooks/store";
import { sortScoreDataByTime } from "../../utils/score-tools";
import { BasePage } from "../shared/base-page";
import { PageTitles } from "../shared/page-titles";
import { SubmitScoreForm } from "./submit-score-form/submit-score-form";
import { SubmitScorePreview } from "./submit-score-preview/submit-score-preview";

export const SubmitScorePage = () => {
  const scoreData = useScoreDataStore().scoreData;

  return (
    <BasePage>
      <PageTitles
        title="Submit Scores"
        subtitle="Manually submit a score from maimai FiNALE"
      />
      <Row>
        <Col xl={5} className="pe-5">
          <SubmitScoreForm addToSubmitScores={useScoreDataStore().addScore} />
        </Col>
        <Col>
          <SubmitScorePreview
            scoreData={[...scoreData]
              .sort(sortScoreDataByTime)
              .reverse()
              .slice(0, 10)}
          />
        </Col>
      </Row>
    </BasePage>
  );
};
