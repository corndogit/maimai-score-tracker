import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { BasePage } from "../shared/base-page";
import { PageTitles } from "../shared/page-titles";
import { DanRank, DanRankDisplayName } from "../../models/dan-rank";
import { useScoreDataStore } from "../../hooks/store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFire } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

export const SettingsPage = () => {
  const scoreDataStore = useScoreDataStore();
  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);
  const handleCancel = () => setShow(false);
  const handleClearAllScores = () => {
    scoreDataStore.removeAllScores();
    setShow(false);
  };
  return (
    <BasePage>
      <PageTitles title={"Settings"} />
      <Form>
        <Row className="mb-5">
          <Col xs={12}>
            <Form.Label>Highest Course (Dan Rank)</Form.Label>
            <Form.Select
              style={{ maxWidth: "300px" }}
              defaultValue={useScoreDataStore().danRank}
              onChange={(e) => {
                scoreDataStore.setDanRank(
                  DanRank[e.currentTarget.value as keyof typeof DanRank]
                );
              }}
            >
              <option value={undefined}>No Rank</option>
              {Object.keys(DanRank).map((rank) => {
                return (
                  <option key={rank} value={rank}>
                    {DanRankDisplayName[rank]}
                  </option>
                );
              })}
            </Form.Select>
            <Form.Text>
              Will be included in the score JSON and used by Kamaitachi
            </Form.Text>
          </Col>
        </Row>
        <Row xl={6}>
          <Col>
            <Button
              variant="danger"
              className="w-100 mb-1"
              onClick={handleShow}
            >
              <FontAwesomeIcon icon={faFire} /> Clear All Scores
            </Button>
          </Col>
        </Row>
      </Form>
      <Modal show={show} onHide={handleCancel}>
        <Modal.Header closeButton>
          <Modal.Title>Clear all scores?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          This will clear all scores saved in local storage.{" "}
          <span className="text-bold">
            Please make sure you have exported any scores you wish to save!
          </span>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCancel}>
            Close
          </Button>
          <Button variant="danger" onClick={handleClearAllScores}>
            Clear All Scores
          </Button>
        </Modal.Footer>
      </Modal>
    </BasePage>
  );
};
