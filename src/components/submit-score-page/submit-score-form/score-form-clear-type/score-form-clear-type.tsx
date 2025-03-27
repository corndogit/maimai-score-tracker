import { Form } from "react-bootstrap";
import { ScoreFormValidation } from "../../../../models/score-form-validation";
import { Chart } from "../../../../models/chart";
import { Judgements } from "../../../../models/score";

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

const validateClearType = (
  clearType: string,
  judgements: Judgements,
  percent: string,
  maxPercent: string,
  selectedChart?: Chart
): boolean => {
  const isFullCombo =
    judgements.perfect +
      judgements.great +
      judgements.good -
      judgements.miss ===
    selectedChart?.notes;
  const isAllPerfect =
    judgements.perfect === selectedChart?.notes &&
    judgements.great === 0 &&
    judgements.good === 0 &&
    judgements.miss === 0;

  let valid = false;
  if (!clearType || clearType === "Select...") {
    valid = false;
  } else if (clearType === "PLAYED" || clearType === "FAILED") {
    valid = true;
  } else if (clearType === "FULL COMBO") {
    valid = isFullCombo;
  } else if (clearType === "ALL PERFECT+") {
    valid = isAllPerfect && percent === maxPercent;
  } else {
    valid = isAllPerfect;
  }
  return valid;
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
          (clearType !== "PLAYED" || "FAILED") && !validated.isClearTypeValid
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
        <option value="PLAYED">Played</option>
        <option value="FULL COMBO">Full Combo</option>
        <option value="ALL PERFECT">All Perfect</option>
        <option value="ALL PERFECT+">All Perfect+</option>
      </Form.Select>
    </Form.Group>
  );
};
