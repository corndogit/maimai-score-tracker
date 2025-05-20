import {
  BreakJudgements,
  Judgements,
  ScoreData,
} from "../../../../../models/score";
import { NewTabLink } from "../../../utils/new-tab-link";
import { JudgementDisplay } from "../../judgement-display/judgement-display";

type Props = {
  score: ScoreData;
  breaks?: BreakJudgements;
};

const convertBreakJudgements = (breaks: BreakJudgements): Judgements => {
  return {
    perfect: breaks.breakPerfect,
    great: breaks.breakGreat,
    good: breaks.breakGood,
    miss: breaks.breakMiss,
  } as Judgements;
};

const generateDxRatingLink = (
  percent: number,
  breakJudgements: BreakJudgements
): string => {
  const baseUrl = "https://myjian.github.io/mai-tools/dx-achievement";
  const breakJudgementsString = `${breakJudgements.breakPerfect}-${breakJudgements.breakGreat}-${breakJudgements.breakGood}-${breakJudgements.breakMiss}`;
  return (
    baseUrl +
    `/?achv=${percent}&bs=${breakJudgements.breakScore}&ts=${breakJudgements.totalScore}&bj=${breakJudgementsString}`
  );
};

export const BreakJudgementItems = ({ score }: Props) => {
  return (
    <>
      <li>
        <span className="score-info-subheading">Break Judgements</span>:{" "}
        {score.breakJudgements ? (
          <JudgementDisplay
            judgements={convertBreakJudgements(score.breakJudgements)}
          />
        ) : (
          "Not set"
        )}
      </li>
      {score.breakJudgements && (
        <li>
          <span className="score-info-subheading">Total score</span>:{" "}
          {score.breakJudgements.totalScore}
        </li>
      )}
      {score.breakJudgements && (
        <li>
          <span className="score-info-subheading">Break score</span>:{" "}
          {score.breakJudgements.breakScore}
        </li>
      )}
      {score.breakJudgements && (
        <li>
          <span className="score-info-subheading">DX Rating</span>:{" "}
          <NewTabLink
            href={generateDxRatingLink(score.percent, score.breakJudgements)}
          >
            Click here (opens in new tab)
          </NewTabLink>
        </li>
      )}
    </>
  );
};
