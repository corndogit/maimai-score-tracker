export type ScoreFormValidation = {
  isChartSelectedValid: boolean;
  isPercentValid: boolean;
  isClearTypeValid: boolean;
  isJudgementsValid: boolean;
  isDateObtainedValid: boolean;
};

export const defaultValidation: ScoreFormValidation = {
  isChartSelectedValid: false,
  isPercentValid: false,
  isClearTypeValid: true,
  isJudgementsValid: false,
  isDateObtainedValid: false,
};

export const getInvalidFields = (
  fields: ScoreFormValidation
): Array<string> => {
  const invalidFields = [
    !fields.isChartSelectedValid ? "Chart Selected" : "",
    !fields.isPercentValid ? "Percent" : "",
    !fields.isClearTypeValid ? "Clear Type" : "",
    !fields.isJudgementsValid ? "Judgements" : "",
    !fields.isDateObtainedValid ? "Date Obtained" : "",
  ];
  return invalidFields.filter((field) => field !== "");
};
