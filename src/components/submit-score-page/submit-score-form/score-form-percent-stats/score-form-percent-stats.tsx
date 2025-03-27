import { Col, Form, Row } from "react-bootstrap";
import { MaimaiRate } from "rg-stats";
import { Chart } from "../../../../models/chart";
import { ScoreFormValidation } from "../../../../models/score-form-validation";
import { calculateGrade } from "../../../../utils/score-tools";
import "./score-form-percent-stats.css";

type ScoreFormPercentStatsProps = {
  percent: string;
  maxPercent: string;
  selectedChart?: Chart;
  validated: ScoreFormValidation;
  rate: number;
  setValidated: (validation: ScoreFormValidation) => void;
  setPercent: (value: string) => void;
  setRate: (value: number) => void;
};

const handleGradeCalculation = (percentString: string): string => {
  return percentString.length > 0
    ? calculateGrade(parseFloat(percentString))
    : calculateGrade(0);
};

export const ScoreFormPercentStats = ({
  percent,
  maxPercent,
  selectedChart,
  validated,
  rate,
  setValidated,
  setPercent,
  setRate,
}: ScoreFormPercentStatsProps) => {
  const isValidPercent = (percent: string): boolean => {
    const percentNumber = parseFloat(percent);
    return (
      !!percentNumber &&
      percentNumber > 0 &&
      percentNumber <= parseFloat(maxPercent)
    );
  };

  const handlePercentChange = (value: string): void => {
    setPercent(value);
    setValidated({
      ...validated,
      isPercentValid: isValidPercent(value),
    });
    if (selectedChart && isValidPercent(value) && value) {
      setRate(
        MaimaiRate.calculate(
          parseFloat(value),
          parseFloat(maxPercent),
          selectedChart.chartConstant
        )
      );
    } else {
      setRate(0);
    }
  };

  return (
    <Form.Group
      className="mb-3 d-inline-flex"
      controlId="submitScoreForm.PercentStats"
    >
      <Row>
        <Col md={3} sm={6}>
          <Form.Label>Percent</Form.Label>
          <Form.Control
            type="number"
            className="percent-input"
            min={0}
            max={maxPercent ? parseFloat(maxPercent) : 0}
            value={percent}
            required
            isInvalid={!!percent && !isValidPercent(percent)}
            disabled={!selectedChart}
            onChange={(e) => {
              handlePercentChange(e.currentTarget.value);
            }}
          />
        </Col>
        <Col md={3} sm={6}>
          <Form.Label>Max %</Form.Label>
          <Form.Control
            className="readonly-percent-stat"
            plaintext
            readOnly
            value={maxPercent}
          />
        </Col>
        <Col md={3} sm={6}>
          <Form.Label>Grade</Form.Label>
          <Form.Control
            className="readonly-percent-stat"
            plaintext
            readOnly
            min={0}
            value={handleGradeCalculation(percent ?? "")}
          />
        </Col>
        <Col md={3} sm={6}>
          <Form.Label>Rating</Form.Label>
          <Form.Control
            className="readonly-percent-stat"
            plaintext
            readOnly
            value={isValidPercent(percent) ? rate.toLocaleString() : "??"}
          />
        </Col>
      </Row>
    </Form.Group>
  );
};
