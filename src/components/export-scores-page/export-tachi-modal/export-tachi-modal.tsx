import { Alert, Button, Modal } from "react-bootstrap";
import { TachiRequest } from "../../../models/tachi-request";
import axios from "axios";
import { useEffect, useState } from "react";
import { useUserSettingsStore } from "../../../hooks/settings-store";

type ExportTachiModalProps = {
  request: TachiRequest;
  showModal: boolean;
  handleClose: () => void;
};
export const ExportTachiModal = ({
  request,
  showModal,
  handleClose,
}: ExportTachiModalProps) => {
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [triggerRequest, setTriggerRequest] = useState(false);
  const tachiApiKey = useUserSettingsStore().tachiApiKey;

  useEffect(() => {
    const handleExport = async () => {
      const tachiImportEndpoint =
        "https://kamai.tachi.ac/ir/direct-manual/import";
      const headers = {
        Authorization: `Bearer ${tachiApiKey}`,
        "X-User-Intent": "ir/direct-manual",
      };
      await axios
        .post(tachiImportEndpoint, request, { headers })
        .then(() => setSuccess(true))
        .catch((e: unknown) => {
          if (axios.isAxiosError(e)) {
            setErrorMessage(`${e.message} HTTP ${e.code}`);
          } else {
            setErrorMessage("Unknown error, check console");
            console.error("Unknown error exporting to Kamaitachi:", e);
          }
        });
    };
    if (triggerRequest === true) {
      handleExport();
    }
    setTriggerRequest(false);
  }, [triggerRequest, request, handleClose, tachiApiKey]);

  return (
    <Modal show={showModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Export scores to Kamaitachi</Modal.Title>
      </Modal.Header>
      {!success && errorMessage && (
        <Alert variant="danger" className="p-2">
          Failed to export scores: {errorMessage}
        </Alert>
      )}
      {!success ? (
        <>
          <Modal.Body>
            You are about to export <strong>{request.scores.length}</strong>{" "}
            scores to Kamaitachi. Please ensure that you have checked your
            scores before exporting.
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="danger" onClick={() => setTriggerRequest(true)}>
              Export
            </Button>
          </Modal.Footer>
        </>
      ) : (
        <>
          <Modal.Body>Scores successfully submitted!</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </>
      )}
    </Modal>
  );
};
