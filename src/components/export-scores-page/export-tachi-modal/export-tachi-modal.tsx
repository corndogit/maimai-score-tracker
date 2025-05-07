import { Alert, Button, Modal } from "react-bootstrap";
import { TachiRequest } from "../../../models/tachi-request";
import axios from "axios";
import { useEffect, useState } from "react";
import { useUserSettingsStore } from "../../../hooks/settings-store";
import { Link } from "react-router";

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
  const [pending, setPending] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [triggerRequest, setTriggerRequest] = useState(false);
  const settingsStore = useUserSettingsStore();

  const handleExport = (): void => {
    setPending(true);
    setTriggerRequest(true);
  };

  useEffect(() => {
    const handleExport = async () => {
      const tachiImportEndpoint =
        "https://kamai.tachi.ac/ir/direct-manual/import";
      const headers = {
        Authorization: `Bearer ${settingsStore.tachiApiKey}`,
        "X-User-Intent": "ir/direct-manual",
      };
      await axios
        .post(tachiImportEndpoint, request, { headers })
        .then(() => setSuccess(true))
        .catch((e: unknown) => {
          const genericError = "Unknown error";
          if (axios.isAxiosError(e)) {
            let errorMessage = genericError;
            if (e.request) {
              errorMessage = e.message;
            }
            if (e.response) {
              errorMessage = `HTTP ${e.response?.status} ${
                e.response?.data?.description
                  ? " - " + e.response?.data?.description
                  : ""
              }`;
            }
            setErrorMessage(errorMessage);
          } else {
            setErrorMessage(genericError);
            console.error("Unknown error exporting to Kamaitachi:", e);
          }
        });
    };
    if (triggerRequest === true) {
      handleExport();
    }
    setTriggerRequest(false);
  }, [triggerRequest, request, settingsStore.tachiApiKey]);

  useEffect(() => {
    if (!success && errorMessage) {
      setPending(false);
    }
  }, [success, errorMessage, setPending]);

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
      {!success && settingsStore.isApiKeySet() ? (
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
            <Button variant="danger" disabled={pending} onClick={handleExport}>
              Export
            </Button>
          </Modal.Footer>
        </>
      ) : (
        <>
          <Modal.Body>
            {success ? (
              <>Scores successfully submitted!</>
            ) : (
              <>
                Your API key is not set, please go to{" "}
                <Link to={"/user/settings"}>settings</Link> and set it. Please
                refer to <Link to={"/help"}>help</Link> to find out how to
                create an API key in Kamaitachi.
              </>
            )}
          </Modal.Body>
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
