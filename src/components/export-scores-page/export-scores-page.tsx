import { Button, Form } from "react-bootstrap";
import { BasePage } from "../shared/base-page";
import { PageTitles } from "../shared/page-titles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import { faCopy } from "@fortawesome/free-solid-svg-icons/faCopy";
import "./export-scores-page.css";
import { requestTemplate, TachiRequest } from "../../models/tachi-request";
import { ScoreData } from "../../models/score";
import { useScoreDataStore } from "../../hooks/store";

const createRequest = (scores: ScoreData[] = []): TachiRequest => {
  return { ...requestTemplate, scores };
};

export const ExportScoresPage = () => {
  const request: TachiRequest = createRequest(useScoreDataStore().scoreData);
  return (
    <BasePage>
      <PageTitles
        title="Export Scores"
        subtitle="Save all your scores in JSON format"
      />
      <Form>
        <Form.Label>Output</Form.Label>
        <Form.Control
          as="textarea"
          readOnly
          value={JSON.stringify(request, null, 2)}
          style={{ height: "400px" }}
        ></Form.Control>
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
