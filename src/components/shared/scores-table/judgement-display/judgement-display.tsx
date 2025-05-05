import { Judgements } from "../../../../models/score";
import "./judgement-display.css";

interface Props {
  judgements: Judgements;
  className?: string;
}

export const JudgementDisplay = ({ judgements, className }: Props) => {
  return (
    <span className={"styled-judgements" + ` ${className}`}>
      <span style={{ color: "#91880b" }}>{judgements.perfect}</span>-
      <span style={{ color: "#f36f83" }}>{judgements.great}</span>-
      <span style={{ color: "#26a826" }}>{judgements.good}</span>-
      <span style={{ color: "var(--bs-body-color)" }}>{judgements.miss}</span>
    </span>
  );
};
