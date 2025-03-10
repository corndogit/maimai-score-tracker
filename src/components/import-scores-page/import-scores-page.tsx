import { Form } from "react-bootstrap";
import { BasePage } from "../shared/base-page";
import { PageTitles } from "../shared/page-titles";

export const ImportScoresPage = () => {
  return (
    <BasePage>
      <PageTitles
        title="Import Scores"
        subtitle="Import your scores from another source"
      />
      <Form>
        <Form.Group controlId="formFile" className="mb-3">
          <Form.Label>Upload JSON</Form.Label>
          <Form.Control type="file" />
        </Form.Group>
      </Form>
    </BasePage>
  );
};
