import { Button, Form } from "react-bootstrap";
import { BasePage } from "../shared/base-page";
import { PageTitles } from "../shared/page-titles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import { faCopy } from "@fortawesome/free-solid-svg-icons/faCopy";
import "./export-scores-page.css";

const placeholderJSON: String = `{
  "meta": { "game": "maimai", "service": "manual", "playtype": "Single" },
  "scores": [
    {
      "identifier": "751",
      "matchType": "inGameID",
      "lamp": "CLEAR",
      "difficulty": "Advanced",
      "percent": 99.59,
      "judgements": { "perfect": 376, "great": 11, "good": 0, "miss": 1 },
      "timeAchieved": 1736274480000
    },
    {
      "identifier": "850",
      "matchType": "inGameID",
      "lamp": "FULL COMBO",
      "difficulty": "Advanced",
      "percent": 100.15,
      "judgements": { "perfect": 351, "great": 7, "good": 0, "miss": 0 },
      "timeAchieved": 1738606920000
    },
    {
      "identifier": "381",
      "matchType": "inGameID",
      "lamp": "CLEAR",
      "difficulty": "Advanced",
      "percent": 94.24,
      "judgements": { "perfect": 441, "great": 39, "good": 6, "miss": 16 },
      "timeAchieved": 1736272920000
    }
  ],
  "classes": { "dan": "DAN_6" }
}
`;

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
          {placeholderJSON}
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
