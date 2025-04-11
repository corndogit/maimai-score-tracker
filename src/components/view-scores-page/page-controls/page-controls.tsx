import { Form } from "react-bootstrap";
import "./page-controls.css";

type Props = {
  pageCount: number;
  setPage: (pageNum: number) => void;
  setPageSize: (size: number) => void;
};

export const PageControls = ({ pageCount, setPage, setPageSize }: Props) => {
  return (
    <>
      <Form className="mb-3">
        <Form.Group style={{ display: "inline-block" }} className="me-2">
          <Form.Label>Page</Form.Label>
          <Form.Select
            onChange={(e) => setPage(parseInt(e.currentTarget.value))}
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
            onChange={(e) => setPageSize(parseInt(e.currentTarget.value))}
          >
            {[10, 25, 50, 100].map((size) => {
              return <option key={`page-size-option-${size}`}>{size}</option>;
            })}
          </Form.Select>
        </Form.Group>
      </Form>
    </>
  );
};
