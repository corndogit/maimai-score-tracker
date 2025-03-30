import { PageTitles } from "../shared/page-titles";
import { BasePage } from "../shared/base-page";
import ScoresTable from "../shared/scores-table/scores-table";
import { useScoreDataStore } from "../../hooks/store";
import { useState } from "react";
import { Col, Container, Pagination, Row } from "react-bootstrap";

export const ViewScoresPage = () => {
  const scoreDataStore = useScoreDataStore();
  const scores = [...scoreDataStore.scoreData].sort(
    (a, b) => b.timeAchieved - a.timeAchieved
  );
  const pageSize = 10;
  const buttonsPerPagination = 5;
  const pageCount = Math.ceil(scores.length / pageSize);
  const [page, setPage] = useState(1);

  const createPaginationItems = (
    start: number,
    max: number,
    buttonsPerPagination: number
  ) => {
    return [...Array(buttonsPerPagination).keys()]
      .map((i) => i + start)
      .filter((i) => i <= max)
      .map((pageNum) => {
        return (
          <Col
            key={`col-${pageNum}`}
            className="p-0"
            style={{ maxWidth: "50px", minWidth: "40px" }}
          >
            <Pagination.Item
              key={`item-${pageNum}`}
              value={pageNum}
              onClick={() => setPage(pageNum)}
              active={pageNum === page}
            >
              {pageNum}
            </Pagination.Item>
          </Col>
        );
      });
  };

  return (
    <BasePage>
      <PageTitles
        title="View Scores"
        subtitle="View and search for submitted scores"
      />
      <ScoresTable
        scoreData={scores.slice(pageSize * (page - 1), pageSize * page)}
        editable
      />
      {scores?.length > 0 && (
        <>
          <h3>Page</h3>
          <Pagination>
            <Container>
              {[...Array(Math.ceil(pageCount / buttonsPerPagination)).keys()]
                .map((i) => i * buttonsPerPagination + 1)
                .map((rowNum) => {
                  return (
                    <Row className="m-0" xs={"6"} key={`row-${rowNum}`}>
                      {createPaginationItems(
                        rowNum,
                        pageCount,
                        buttonsPerPagination
                      )}
                    </Row>
                  );
                })}
            </Container>
          </Pagination>
        </>
      )}
    </BasePage>
  );
};
