import { Form } from "react-bootstrap";
import { ScoreFormValidation } from "../../../../models/score-form-validation";
import { Chart } from "../../../../models/chart";
import { Judgements } from "../../../../models/score";

type ScoreFormClearTypeProps = {
  clearType: string;
  validated: ScoreFormValidation;
  judgements: Judgements;
  selectedChart?: Chart;
  setClearType: (value: string) => void;
  setValidated: (validation: ScoreFormValidation) => void;
};

export const ScoreFormClearType = ({
  clearType,
  validated,
  judgements,
  selectedChart,
  setClearType,
  setValidated,
}: ScoreFormClearTypeProps) => {
  const validateClearType = (
    clearType: string,
    judgements: Judgements
  ): void => {
    let valid = false;
    if (!clearType || clearType === "Select...") {
      valid = false;
    } else if (clearType === "PLAYED" || clearType === "FAILED") {
      valid = true;
    } else if (clearType === "FULL COMBO") {
      const totalMinusMisses =
        judgements.perfect +
        judgements.great +
        judgements.good -
        judgements.miss;
      valid = totalMinusMisses === selectedChart?.notes;
    } else {
      valid =
        judgements.perfect === selectedChart?.notes &&
        judgements.great === 0 &&
        judgements.good === 0 &&
        judgements.miss === 0;
    }
    setValidated({ ...validated, isClearTypeValid: valid });
  };

  return (
    <Form.Group className="mb-3" controlId="submitScoreForm.ClearTypeSelect">
      <Form.Label>Clear Type</Form.Label>
      <Form.Select
        aria-label="Clear Type"
        required
        isInvalid={
          (clearType !== "PLAYED" || "FAILED") && !validated.isClearTypeValid
        }
        disabled={!selectedChart}
        onChange={(e) => {
          const value = e.currentTarget.value;
          setClearType(value);
          validateClearType(value, judgements);
        }}
      >
        <option value="FAILED">Failed</option>
        <option value="PLAYED">Played</option>
        <option value="FULL COMBO">Full Combo</option>
        <option value="ALL PERFECT">All Perfect</option>
        <option value="ALL PERFECT+">All Perfect+</option>
      </Form.Select>
    </Form.Group>
  );
};
