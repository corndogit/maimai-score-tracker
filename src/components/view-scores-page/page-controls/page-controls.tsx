import { Form } from "react-bootstrap";
import "./page-controls.css";
import { useState } from "react";

type Props = {
  pageCount: number;
  setPage: (pageNum: number) => void;
  setPageSize: (size: number) => void;
};

type FormState = {
  page: number;
  pageSize: number;
};

export const PageControls = ({ pageCount, setPage, setPageSize }: Props) => {
  const [formState, setFormState] = useState<FormState>({
    page: 1,
    pageSize: 10,
  });

  const handlePageSelection = (pageNum: number): void => {
    setFormState({ ...formState, page: pageNum });
    setPage(pageNum);
  };

  const handlePageSizeSelection = (pageSize: number): void => {
    setFormState({ pageSize, page: 1 });
    setPageSize(pageSize);
    setPage(1);
  };
  return (
    <>
      <Form className="mb-3">
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
