import { Col, Row } from "react-bootstrap";
import { BasePage } from "../shared/base-page";
import { PageTitles } from "../shared/page-titles";
import { SubmitScoreForm } from "./submit-score-form/submit-score-form";
import { SubmitScorePreview } from "./submit-score-preview/submit-score-preview";

export const SubmitScorePage = () => {
  return (
    <BasePage>
      <PageTitles
        title="Submit Scores"
        subtitle="Manually submit a score from maimai FiNALE"
      />
      <Row>
        <Col md={5}>
          <SubmitScoreForm />
        </Col>
        <Col md={7}>
          <SubmitScorePreview />
        </Col>
      </Row>
    </BasePage>
  );
};
