import { Col, Container, FloatingLabel, Form, Row } from "react-bootstrap";
import { BreakJudgements } from "../../../../models/score";
import { Chart } from "../../../../models/chart";

type Props = {
  selectedChart?: Chart;
  breakJudgements: BreakJudgements;
  setBreakJudgements: (nextBreakJudgements: BreakJudgements) => void;
};

export const ScoreFormBreakJudgements = ({
  selectedChart,
  breakJudgements,
  setBreakJudgements,
}: Props) => {
  const handleBreakJudgementChange = (
    breakJudgements: BreakJudgements,
    nextValue: string,
    key: string
  ): void => {
    const newBreakJudgements = breakJudgements;
    newBreakJudgements[key as keyof BreakJudgements] = nextValue
      ? parseInt(nextValue)
      : 0;
    setBreakJudgements({ ...newBreakJudgements });
  };
  return (
    <Form.Group>
      <Container className="ps-0  ">
        <Row>
          <Col xs={12}>
            <Form.Label>Break Judgements</Form.Label>
          </Col>
        </Row>
        <Form.Text>
          Break judgements are only used to calculate DX rating and are not sent
          to Kamaitachi
        </Form.Text>
        <Row>
          <Col className="mb-2" xs={12} lg={3}>
            <FloatingLabel label="Perfect">
              <Form.Control
                className="judgement-input"
                min={0}
                value={breakJudgements.breakPerfect}
                disabled={!selectedChart}
                onChange={(e) =>
                  handleBreakJudgementChange(
                    breakJudgements,
                    e.currentTarget.value,
                    "breakPerfect"
                  )
                }
              />
            </FloatingLabel>
          </Col>
          <Col className="mb-2" xs={12} lg={3}>
            <FloatingLabel label="Great">
              <Form.Control
                className="judgement-input"
                min={0}
                value={breakJudgements.breakGreat}
                disabled={!selectedChart}
                onChange={(e) =>
                  handleBreakJudgementChange(
                    breakJudgements,
                    e.currentTarget.value,
                    "breakGreat"
                  )
                }
              />
            </FloatingLabel>
          </Col>
          <Col className="mb-2" xs={12} lg={3}>
            <FloatingLabel label="Good">
              <Form.Control
                className="judgement-input"
                min={0}
                value={breakJudgements.breakGood}
                disabled={!selectedChart}
                onChange={(e) =>
                  handleBreakJudgementChange(
                    breakJudgements,
                    e.currentTarget.value,
                    "breakGood"
                  )
                }
              />
            </FloatingLabel>
          </Col>
          <Col className="mb-2" xs={12} lg={3}>
            <FloatingLabel label="Miss">
              <Form.Control
                className="judgement-input"
                min={0}
                value={breakJudgements.breakMiss}
                disabled={!selectedChart}
                onChange={(e) =>
                  handleBreakJudgementChange(
                    breakJudgements,
                    e.currentTarget.value,
                    "breakMiss"
                  )
                }
              />
            </FloatingLabel>
          </Col>
          <Col className="mb-2" xs={12} lg={12}>
            <FloatingLabel label="Total Score">
              <Form.Control
                min={0}
                value={breakJudgements.totalScore}
                disabled={!selectedChart}
                onChange={(e) =>
                  handleBreakJudgementChange(
                    breakJudgements,
                    e.currentTarget.value,
                    "totalScore"
                  )
                }
              />
            </FloatingLabel>
          </Col>
          <Col className="mb-2" xs={12} lg={12}>
            <FloatingLabel label="Break Score">
              <Form.Control
                min={0}
                value={breakJudgements.breakScore}
                disabled={!selectedChart}
                onChange={(e) =>
                  handleBreakJudgementChange(
                    breakJudgements,
                    e.currentTarget.value,
                    "breakScore"
                  )
                }
              />
            </FloatingLabel>
          </Col>
        </Row>
      </Container>
    </Form.Group>
  );
};
