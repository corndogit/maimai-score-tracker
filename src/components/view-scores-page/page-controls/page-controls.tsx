import { useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import "./page-controls.css";

type Props = {
  pageCount: number;
  setPage: (pageNum: number) => void;
  setPageSize: (size: number) => void;
  setSearchTerm: (term: string) => void;
};

type FormState = {
  page: number;
  pageSize: number;
  searchInput: string;
};

const defaultFormState: FormState = {
  page: 1,
  pageSize: 10,
  searchInput: "",
};

export const PageControls = ({
  pageCount,
  setPage,
  setPageSize,
  setSearchTerm,
}: Props) => {
  const [formState, setFormState] = useState<FormState>(defaultFormState);

  const handlePageSelection = (pageNum: number): void => {
    setFormState({ ...formState, page: pageNum });
    setPage(pageNum);
  };

  const handlePageSizeSelection = (pageSize: number): void => {
    setFormState({ ...formState, pageSize, page: 1 });
    setPageSize(pageSize);
    setPage(1);
  };
  return (
    <>
      <Form className="mb-3">
        <Form.Group className="mb-3">
          <Row>
            <Col>
              <Form.Label>Search by name</Form.Label>
              <Form.Control
                value={formState.searchInput}
                placeholder="Song name"
                onChange={(e) => {
                  const newValue = e.currentTarget.value;
                  setFormState({
                    ...formState,
                    searchInput: newValue,
                  });
                  setSearchTerm(newValue);
                }}
              />
            </Col>
          </Row>
        </Form.Group>
        <Form.Group style={{ display: "inline-block" }} className="me-2">
          <Form.Label>Page</Form.Label>
          <Form.Select
            value={formState.page}
            onChange={(e) =>
              handlePageSelection(parseInt(e.currentTarget.value))
            }
          >
            {[...Array(Math.ceil(pageCount)).keys()]
              .map((i) => i + 1)
              .map((pageNum) => {
                return (
                  <option key={`page-option-${pageNum}`}>{pageNum}</option>
                );
              })}
          </Form.Select>
        </Form.Group>
        <Form.Group style={{ display: "inline-block" }}>
          <Form.Label>Scores per page</Form.Label>
          <Form.Select
            value={formState.pageSize}
            onChange={(e) =>
              handlePageSizeSelection(parseInt(e.currentTarget.value))
            }
          >
            {[10, 25, 50, 100].map((size) => {
              return (
                <option key={`page-size-option-${size}`} value={size}>
                  {size}
                </option>
              );
            })}
          </Form.Select>
        </Form.Group>
      </Form>
    </>
  );
};
