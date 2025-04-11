import { PageTitles } from "../shared/page-titles";
import { BasePage } from "../shared/base-page";
import ScoresTable from "../shared/scores-table/scores-table";
import { useScoreDataStore } from "../../hooks/store";
import { useState } from "react";
import { sortScoreDataByTime } from "../../utils/score-tools";
import { PageControls } from "./page-controls/page-controls";

export const ViewScoresPage = () => {
  const scoreDataStore = useScoreDataStore();
  const scores = [...scoreDataStore.scoreData].sort(sortScoreDataByTime);
  const [pageSize, setPageSize] = useState(10);
  const pageCount = Math.ceil(scores.length / pageSize);
  const [page, setPage] = useState(1);

  return (
    <BasePage>
      <PageTitles
        title="View Scores"
        subtitle="View and search for submitted scores"
      />
      {scores?.length > 0 && (
        <PageControls
          pageCount={pageCount}
          setPage={setPage}
          setPageSize={setPageSize}
        />
      )}
      <ScoresTable
        scoreData={scores.slice(pageSize * (page - 1), pageSize * page)}
        editable
      />
    </BasePage>
  );
};
