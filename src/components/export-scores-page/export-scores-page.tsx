import { Button, Form } from "react-bootstrap";
import { BasePage } from "../shared/base-page";
import { PageTitles } from "../shared/page-titles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import { faCopy } from "@fortawesome/free-solid-svg-icons/faCopy";
import placeholderJSON from "../../data/placeholder/maimai-scores-1740695287.json";
import "./export-scores-page.css";

export const ExportScoresPage = () => {
  return (
    <BasePage>
      <PageTitles
        title="Export Scores"
        subtitle="Save all your scores in JSON format"
      />
      <Form>
        <Form.Label>Output</Form.Label>
        <Form.Control as="textarea" readOnly style={{ height: "400px" }}>
          {JSON.stringify(placeholderJSON, null, 2)}
        </Form.Control>
        <Button variant="primary" className="mt-2 me-2">
          <FontAwesomeIcon icon={faDownload} /> Save
        </Button>
        <Button variant="secondary" className="mt-2">
          <FontAwesomeIcon icon={faCopy} />
          Copy JSON
        </Button>
      </Form>
    </BasePage>
  );
};
