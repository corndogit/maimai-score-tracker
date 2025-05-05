import { useState } from "react";
import { useScoreDataStore } from "../../hooks/store";
import { ScoreData } from "../../models/score";
import {
  getSongNameByIdentifier,
  sortScoreDataByTime,
} from "../../utils/score-tools";
import { BasePage } from "../shared/base-page";
import { PageTitles } from "../shared/page-titles";
import ScoresTable from "../shared/scores-table/scores-table";
import { PageControls } from "./page-controls/page-controls";

export const ViewScoresPage = () => {
  const scoreDataStore = useScoreDataStore();
  const scores = [...scoreDataStore.scoreData].sort(sortScoreDataByTime);
  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const filterScores = (scores: ScoreData[]): ScoreData[] => {
    return scores.filter(
      (score) =>
        getSongNameByIdentifier(score.identifier)
          .toLocaleLowerCase()
          .indexOf(searchTerm) !== -1
    );
  };
  const filteredScores = filterScores(scores);
  const pageCount = Math.ceil(filteredScores.length / pageSize);

  return (
    <BasePage>
      <PageTitles
        title="View Scores"
        subtitle="View and search for submitted scores"
      />
      <PageControls
        pageCount={filteredScores.length > 0 ? pageCount : 1}
        setPage={setPage}
        setPageSize={setPageSize}
        setSearchTerm={setSearchTerm}
      />
      <ScoresTable
        scoreData={filteredScores.slice(pageSize * (page - 1), pageSize * page)}
        editable
      />
    </BasePage>
  );
};
