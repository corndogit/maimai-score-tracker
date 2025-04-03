import { DateTime } from "luxon";
import { Form } from "react-bootstrap";
import { ScoreFormValidation } from "../../../../models/score-form-validation";

type ScoreFormDatePickerProps = {
  dateObtained: string;
  validated: ScoreFormValidation;
  setDateObtained: (date: string) => void;
  setValidated: (validation: ScoreFormValidation) => void;
};

const timeIsInPast = (dateObtained: string): boolean => {
  return DateTime.fromISO(dateObtained).toMillis() < DateTime.now().toMillis();
};

export const ScoreFormDatePicker = ({
  dateObtained,
  validated,
  setDateObtained,
  setValidated,
}: ScoreFormDatePickerProps) => {
  const isInvalid = !!dateObtained && !timeIsInPast(dateObtained);
  return (
    <Form.Group className="mb-3" controlId="submitScoreForm.DateTimeField">
      <Form.Label>Date Obtained</Form.Label>
      <Form.Control
        type="datetime-local"
        required
        isInvalid={isInvalid}
        value={dateObtained}
        onChange={(e) => {
          const value = e.currentTarget.value;
          const isPast = timeIsInPast(e.currentTarget.value);
          setDateObtained(value);
          setValidated({
            ...validated,
            isDateObtainedValid: !!value && isPast,
          });
        }}
      />
      {isInvalid && (
        <Form.Text id="invalid-date-text" className="text-danger">
          Date must be in the past
        </Form.Text>
      )}
    </Form.Group>
  );
};
