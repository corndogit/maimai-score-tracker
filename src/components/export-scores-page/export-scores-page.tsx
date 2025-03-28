import { Button, Form } from "react-bootstrap";
import { BasePage } from "../shared/base-page";
import { PageTitles } from "../shared/page-titles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faDownload } from "@fortawesome/free-solid-svg-icons";
import { faCopy } from "@fortawesome/free-solid-svg-icons/faCopy";
import "./export-scores-page.css";
import { requestTemplate, TachiRequest } from "../../models/tachi-request";
import { ScoreData } from "../../models/score";
import { useScoreDataStore } from "../../hooks/store";
import { useEffect, useState } from "react";
import { DateTime } from "luxon";
import { DanRank } from "../../models/dan-rank";

const createRequest = (
  scores: ScoreData[] = [],
  danRank?: DanRank
): TachiRequest => {
  const mainBody: TachiRequest = {
    ...requestTemplate,
    scores: scores.map((score) => {
      return { ...score, uuid: undefined };
    }),
  };
  const classes = danRank
    ? { classes: { dan: danRank.toString() } }
    : undefined;
  return classes ? { ...mainBody, ...classes } : mainBody;
};

const handleFileDownload = (data: string) => {
  const timeNow = DateTime.now().toFormat("HHmmss_ddLLyy");
  const filename = `maimai-scores-${timeNow}.json`;
  const file = new Blob([data], { type: "application/json" });

  const element = document.createElement("a");
  element.href = URL.createObjectURL(file);
  element.download = filename;
  document.body.appendChild(element);
  element.click();
};

export const ExportScoresPage = () => {
  const [copiedState, setCopiedState] = useState(false);
  const request: TachiRequest = createRequest(
    useScoreDataStore().scoreData,
    useScoreDataStore().danRank
  );
  const requestJson = JSON.stringify(request, null, 2);

  useEffect(() => {
    const copyJson = async () => {
      await navigator.clipboard.writeText(requestJson);
      const timeout = setTimeout(() => {
        setCopiedState(false);
      }, 1000);
      return () => clearTimeout(timeout);
    };
    copyJson();
  }, [copiedState, requestJson]);

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
          value={requestJson}
          style={{ height: "400px" }}
        ></Form.Control>
        <Button
          variant="primary"
          className="mt-2 me-2"
          onClick={() => handleFileDownload(requestJson)}
        >
          <FontAwesomeIcon icon={faDownload} /> Save
        </Button>
        <Button
          variant={copiedState ? "success" : "secondary"}
          disabled={copiedState}
          className="mt-2"
          onClick={() => setCopiedState(true)}
        >
          <FontAwesomeIcon icon={copiedState ? faCheck : faCopy} />
          {copiedState ? "Copied!" : "Copy JSON"}
        </Button>
      </Form>
    </BasePage>
  );
};
