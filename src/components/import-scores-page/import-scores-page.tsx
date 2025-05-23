import { useState } from "react";
import { Alert, Button, Form } from "react-bootstrap";
import { useChartStore, useScoreDataStore } from "../../hooks/store";
import { ScoreData } from "../../models/score";
import { TachiRequest } from "../../models/tachi-request";
import { validateScoreImport } from "../../utils/parse-tools";
import { BasePage } from "../shared/base-page";
import { PageTitles } from "../shared/page-titles";

const maxFileSize = 20 * 1024 * 1024; // 20MB
const allowedExtensions = ["json", "txt"];

type InvalidScore = {
  score: ScoreData;
  message: string;
};

export const ImportScoresPage = () => {
  const chartIdentifiers = useChartStore().chartIdentifiers;
  const addScore = useScoreDataStore().addScore;
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [content, setFileContent] = useState("");

  const handleFileUpload = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const { files } = event.target;
    if (!files || files.length === 0) {
      return;
    }
    const file = files[0];
    const fileExtension = file.name.split(".").pop()?.toLowerCase();
    if (!fileExtension || !allowedExtensions.includes(fileExtension)) {
      setErrorMessage(
        `Invalid file format. Supported extensions are: ${allowedExtensions}`
      );
      return;
    }
    if (file.size > maxFileSize) {
      setErrorMessage(
        `Fize size exceeds the maximum of ${maxFileSize}. Please try a smaller file or reach out for help on Github.`
      );
      return;
    }

    const fileReader = new FileReader();
    fileReader.onload = (e) => {
      if (e.target?.result) {
        const contentString = e.target.result as string;
        setFileContent(contentString);
        setErrorMessage("");
        setSuccessMessage("");
      }
    };
    fileReader.readAsText(file);
  };

  const handleScoreImport = () => {
    let scoreJson: TachiRequest | ScoreData[];
    let scores: ScoreData[];
    try {
      scoreJson = JSON.parse(content);
      if (scoreJson.constructor.name === "Array") {
        scores = scoreJson as ScoreData[];
      } else {
        scores = (scoreJson as TachiRequest).scores;
      }
    } catch (error: unknown) {
      const message =
        error instanceof Error
          ? `Error parsing the JSON file: ${error.message}`
          : "An unknown error occurred while parsing the file.";
      setErrorMessage(message);
      return;
    }
    const validScores: ScoreData[] = [];
    const invalidScores: InvalidScore[] = [];
    scores.forEach((score) => {
      const errors = validateScoreImport(score, chartIdentifiers);
      if (errors.length > 0) {
        invalidScores.push({
          message: `Invalid fields: ${errors.join(", ")}`,
          score,
        });
      } else {
        validScores.push(
          // strips maxCombo from maitea imports
          score.hitMeta
            ? {
                ...score,
                hitMeta: { fast: score.hitMeta.fast, slow: score.hitMeta.slow },
              }
            : score
        );
      }
    });
    if (invalidScores.length > 0) {
      console.error("Invalid scores, expand to see more:", invalidScores);
      setErrorMessage(
        `${invalidScores.length} score(s) had errors and were excluded - see console`
      );
    }
    if (validScores.length > 0) {
      validScores.forEach((score) =>
        addScore({ ...score, matchType: "inGameID" })
      );
      setSuccessMessage(`Added ${validScores.length} score(s).`);
    }
  };

  return (
    <BasePage>
      <PageTitles
        title="Import Scores"
        subtitle="Import your scores from another source"
      />
      {errorMessage && (
        <Alert variant="danger" className="mb-3">
          {errorMessage}
        </Alert>
      )}
      {successMessage && (
        <Alert variant="success" className="mb-3">
          {successMessage}
        </Alert>
      )}
      <Form>
        <Form.Group controlId="formFile" className="mb-3">
          <Form.Label>Upload JSON</Form.Label>
          <Form.Control type="file" onChange={handleFileUpload} />
        </Form.Group>
        <Button variant="primary" onClick={handleScoreImport}>
          Submit
        </Button>
      </Form>
    </BasePage>
  );
};
