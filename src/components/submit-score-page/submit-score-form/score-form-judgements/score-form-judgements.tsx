import { Col, Container, FloatingLabel, Form, Row } from "react-bootstrap";
import { Judgements } from "../../../../models/score";
import { ScoreFormValidation } from "../../../../models/score-form-validation";
import { Chart } from "../../../../models/chart";

type ScoreFormProps = {
  selectedChart?: Chart;
  validated: ScoreFormValidation;
  judgements: Judgements;
  setJudgements: (judgements: Judgements) => void;
  setValidated: (validation: ScoreFormValidation) => void;
};

const sumJudgements = (judgements: Judgements): number => {
  return (
    judgements.perfect + judgements.great + judgements.good + judgements.miss
  );
};

export const ScoreFormJudgements = ({
  validated,
  judgements,
  selectedChart,
  setJudgements,
  setValidated,
}: ScoreFormProps) => {
  const handleJudgementChange = (
    judgements: Judgements,
    value: string,
    judgementType: string
  ): void => {
    let newJudgements = judgements;
    newJudgements[judgementType as keyof Judgements] = value
      ? parseInt(value)
      : 0;
    setJudgements(newJudgements);
    validateJudgements(newJudgements);
  };

  const validateJudgements = (judgements: Judgements): void => {
    const totalJudgements =
      judgements.perfect + judgements.great + judgements.good + judgements.miss;
    setValidated({
      ...validated,
      isJudgementsValid: totalJudgements === selectedChart?.notes,
    });
  };

  return (
    <>
      <Form.Group
        className="mb-3 d-inline-flex"
        controlId="submitScoreForm.JudgementsFields"
      >
        <Container className="ps-0  ">
          <Row>
            <Col xs={12}>
              <Form.Label>Judgements</Form.Label>
            </Col>
          </Row>
          <Row>
            <Col className="mb-2" xs={12} lg={3}>
              <FloatingLabel label="Perfect">
                <Form.Control
                  min={0}
                  defaultValue={0}
                  value={judgements.perfect}
                  disabled={!selectedChart}
                  isValid={validated.isJudgementsValid}
                  onChange={(e) =>
                    handleJudgementChange(
                      judgements,
                      e.currentTarget.value,
                      "perfect"
                    )
                  }
                />
              </FloatingLabel>
            </Col>
            <Col className="mb-2" xs={12} lg={3}>
              <FloatingLabel label="Great">
                <Form.Control
                  min={0}
                  defaultValue={0}
                  value={judgements.great}
                  disabled={!selectedChart}
                  isValid={validated.isJudgementsValid}
                  onChange={(e) =>
                    handleJudgementChange(
                      judgements,
                      e.currentTarget.value,
                      "great"
                    )
                  }
                />
              </FloatingLabel>
            </Col>
            <Col className="mb-2" xs={12} lg={3}>
              <FloatingLabel label="Good">
                <Form.Control
                  min={0}
                  defaultValue={0}
                  value={judgements.good}
                  disabled={!selectedChart}
                  isValid={validated.isJudgementsValid}
                  onChange={(e) =>
                    handleJudgementChange(
                      judgements,
                      e.currentTarget.value,
                      "good"
                    )
                  }
                />
              </FloatingLabel>
            </Col>
            <Col className="mb-2" xs={12} lg={3}>
              <FloatingLabel label="Miss">
                <Form.Control
                  min={0}
                  defaultValue={0}
                  value={judgements.miss}
                  disabled={!selectedChart}
                  isValid={validated.isJudgementsValid}
                  onChange={(e) =>
                    handleJudgementChange(
                      judgements,
                      e.currentTarget.value,
                      "miss"
                    )
                  }
                />
              </FloatingLabel>
            </Col>
          </Row>
        </Container>
      </Form.Group>
      <Row>
        <Col xs={12}>
          <Form.Text id="notesHelper" muted>
            Judgements must add up to the song's total notes.{" "}
            {selectedChart &&
              `(total notes: ${
                selectedChart.notes
              }, current total is ${sumJudgements(judgements)})`}
          </Form.Text>
        </Col>
      </Row>
    </>
  );
};
