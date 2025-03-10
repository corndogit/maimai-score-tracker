export const calculateGrade = (percent: number): string => {
  if (percent >= 100.0) {return "SSS"}
  if (percent >=  99.5) {return "SS+"}
  if (percent >=  99.0) {return "SS"}
  if (percent >=  98.0) {return "S"}
  if (percent >=  97.0) {return "S"}
  if (percent >=  94.0) {return "AAA"}
  if (percent >=  90.0) {return "AA"}
  if (percent >=  80.0) {return "A"}
  return "B"
}