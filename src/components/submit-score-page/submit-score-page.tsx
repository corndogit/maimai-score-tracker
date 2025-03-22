import { useState } from "react";
import { Col, Row } from "react-bootstrap";
import { ScoreData } from "../../models/score";
import { BasePage } from "../shared/base-page";
import { PageTitles } from "../shared/page-titles";
import { SubmitScoreForm } from "./submit-score-form/submit-score-form";
import { SubmitScorePreview } from "./submit-score-preview/submit-score-preview";

export const SubmitScorePage = () => {
  const [scoresToSubmit, setScoresToSubmit] = useState<Array<ScoreData>>([]);
  const addToScores = (score: ScoreData) => {
    setScoresToSubmit([...scoresToSubmit, score]);
  };
  return (
    <BasePage>
      <PageTitles
        title="Submit Scores"
        subtitle="Manually submit a score from maimai FiNALE"
      />
      <Row>
        <Col md={5}>
          <SubmitScoreForm addToSubmitScores={addToScores} />
        </Col>
        <Col md={7}>
          <SubmitScorePreview scoreData={scoresToSubmit} />
        </Col>
      </Row>
    </BasePage>
  );
};
