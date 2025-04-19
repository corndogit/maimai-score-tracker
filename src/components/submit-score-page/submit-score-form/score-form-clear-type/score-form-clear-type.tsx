import { Form } from "react-bootstrap";
import { Chart } from "../../../../models/chart";
import { Judgements } from "../../../../models/score";
import { ScoreFormValidation } from "../../../../models/score-form-validation";
import { validateClearType } from "../../../../utils/parse-tools";
import { calculateClearType } from "../../../../utils/score-tools";
import "../../../shared/css/clear-type.css";
import "./score-form-clear-type.css";
import { getClearTypeCssClass } from "../../../shared/css/clear-type";

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

  return (
    <Form.Group className="mb-3" aria-readonly>
      <Form.Label>Clear Type</Form.Label>
      <Form.Text
        id="score-form-clear-type"
        className={`clear-type-display ${getClearTypeCssClass(clearType)}`}
        onChange={() => setValidatedClearType(clearType)}
      >
        {clearType}
      </Form.Text>
    </Form.Group>
  );
};
