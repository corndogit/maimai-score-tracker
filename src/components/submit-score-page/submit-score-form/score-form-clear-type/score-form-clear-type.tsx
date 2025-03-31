import { Form } from "react-bootstrap";
import { ScoreFormValidation } from "../../../../models/score-form-validation";
import { Chart } from "../../../../models/chart";
import { Judgements } from "../../../../models/score";
import { validateClearType } from "../../../../utils/parse-tools";

type ScoreFormClearTypeProps = {
  clearType: string;
  validated: ScoreFormValidation;
  judgements: Judgements;
  percent: string;
  maxPercent: string;
  selectedChart?: Chart;
  setClearType: (value: string) => void;
  setValidated: (validation: ScoreFormValidation) => void;
};

export const ScoreFormClearType = ({
  clearType,
  validated,
  judgements,
  percent,
  maxPercent,
  selectedChart,
  setClearType,
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

  return (
    <Form.Group className="mb-3" controlId="submitScoreForm.ClearTypeSelect">
      <Form.Label>Clear Type</Form.Label>
      <Form.Select
        aria-label="Clear Type"
        required
        isInvalid={
          !(
            clearType === "CLEAR" ||
            clearType === "FAILED" ||
            validated.isClearTypeValid
          )
        }
        disabled={!selectedChart}
        value={clearType}
        onChange={(e) => {
          const value = e.currentTarget.value;
          setClearType(value);
          setValidatedClearType(value);
        }}
      >
        <option value="FAILED">Failed</option>
        <option value="CLEAR">Clear</option>
        <option value="FULL COMBO">Full Combo</option>
        <option value="ALL PERFECT">All Perfect</option>
        <option value="ALL PERFECT+">All Perfect+</option>
      </Form.Select>
    </Form.Group>
  );
};
