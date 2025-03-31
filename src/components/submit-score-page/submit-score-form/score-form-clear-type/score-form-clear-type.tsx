import { Form } from "react-bootstrap";
import { ScoreFormValidation } from "../../../../models/score-form-validation";
import { Chart } from "../../../../models/chart";
import { Judgements } from "../../../../models/score";
import { validateClearType } from "../../../../utils/parse-tools";
import { calculateClearType } from "../../../../utils/score-tools";
import "./score-form-clear-type.css";

type ScoreFormClearTypeProps = {
  validated: ScoreFormValidation;
  judgements: Judgements;
  percent: string;
  maxPercent: string;
  selectedChart?: Chart;
  setValidated: (validation: ScoreFormValidation) => void;
};

export const ScoreFormClearType = ({
  validated,
  judgements,
  percent,
  maxPercent,
  selectedChart,
  setValidated,
}: ScoreFormClearTypeProps) => {
  const setValidatedClearType = (clearType: string): void => {
    setValidated({
      ...validated,
      isClearTypeValid: validateClearType(
        clearType,
        judgements,
        percent,
        maxPercent,
        selectedChart
      ),
    });
  };

  const clearType = calculateClearType(
    judgements,
    percent,
    maxPercent,
    selectedChart
  );

  const clearTypeCssClass = `clear-type-display-${clearType
    .toLowerCase()
    .replace(" ", "-")
    .replace("+", "-plus")}`;

  return (
    <Form.Group className="mb-3" controlId="submitScoreForm.ClearTypeSelect">
      <Form.Label>Clear Type</Form.Label>
      <Form.Text
        className={`clear-type-display ${clearTypeCssClass}`}
        onChange={() => setValidatedClearType(clearType)}
      >
        {clearType}
      </Form.Text>
    </Form.Group>
  );
};
