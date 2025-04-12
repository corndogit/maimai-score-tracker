import { Col, FloatingLabel, Form, Row } from "react-bootstrap";
import { HitMeta } from "../../../../models/score";
import { Chart } from "../../../../models/chart";

type Props = {
  hitMeta: HitMeta;
  selectedChart?: Chart;
  setHitMeta: (nextHitMeta: HitMeta) => void;
};

export const ScoreFormTiming = ({
  hitMeta,
  selectedChart,
  setHitMeta,
}: Props) => {
  return (
    <Form.Group>
      <Row>
        <Col xs={12}>
          <Form.Label>Timing</Form.Label>
        </Col>
      </Row>
      <Row>
        <Col className="mb-2" xs={12} lg={3}>
          <FloatingLabel label="Fast">
            <Form.Control
              className="judgement-input"
              min={0}
              value={hitMeta.fast}
              disabled={!selectedChart}
              onChange={(e) =>
                setHitMeta({
                  ...hitMeta,
                  fast: e.currentTarget.value
                    ? parseInt(e.currentTarget.value)
                    : 0,
                })
              }
            />
          </FloatingLabel>
        </Col>
        <Col className="mb-2" xs={12} lg={3}>
          <FloatingLabel label="Slow">
            <Form.Control
              className="judgement-input"
              min={0}
              value={hitMeta.slow}
              disabled={!selectedChart}
              onChange={(e) =>
                setHitMeta({
                  ...hitMeta,
                  slow: e.currentTarget.value
                    ? parseInt(e.currentTarget.value)
                    : 0,
                })
              }
            />
          </FloatingLabel>
        </Col>
      </Row>
    </Form.Group>
  );
};
