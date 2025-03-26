import { Alert, Button, Form } from "react-bootstrap";
import { BasePage } from "../shared/base-page";
import { PageTitles } from "../shared/page-titles";
import { useState } from "react";
import { TachiRequest } from "../../models/tachi-request";
import { useScoreDataStore } from "../../hooks/store";

const maxFileSize = 20 * 1024 * 1024; // 20MB
const allowedExtensions = ["json", "txt"];

export const ImportScoresPage = () => {
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
    try {
      const scoreJson: TachiRequest = JSON.parse(content);
      scoreJson.scores.forEach((score) => addScore(score));
      setSuccessMessage(`Added ${scoreJson.scores.length} entries to scores.`);
    } catch (error: unknown) {
      const message =
        error instanceof Error
          ? error.message
          : "An unknown error occurred while parsing the file.";
      setErrorMessage(message);
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
