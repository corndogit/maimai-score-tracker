import { faPlus, faSave, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Col, Form, Row } from "react-bootstrap";

export const SubmitScoreForm = () => {
  return (
    <Form>
      <Form.Group className="mb-3" controlId="submitScoreForm.SongTitleSearch">
        <Form.Label>Song title</Form.Label>
        <Row className="mb-3">
          <Col xs={12}>
            <Form.Select aria-label="Search results">
              <option>Select title...</option>
            </Form.Select>
          </Col>
        </Row>
        <Row>
          <Col xs={10}>
            <Form.Control placeholder="Search (e.g. Oshama Scramble)" />
          </Col>
          <Col xs={2} className="p-0">
            <Button>Search</Button>
          </Col>
        </Row>
      </Form.Group>
      <Form.Group className="mb-3" controlId="submitScoreForm.DifficultySelect">
        <Form.Label>Difficulty</Form.Label>
        <Form.Select aria-label="Clear Type">
          <option>Select difficulty...</option>
          <option value="1">Basic (level)</option>
          <option value="2">Advanced (level)</option>
          <option value="3">Expert (level)</option>
          <option value="4">Master (level)</option>
          <option value="5">Re:Master (level)</option>
        </Form.Select>
      </Form.Group>
      <Form.Group
        className="mb-3 d-inline-flex"
        controlId="submitScoreForm.ScoreFields"
      >
        <Row>
          <Col md={3}>
            <Form.Label>Percent</Form.Label>
            <Form.Control type="number" min={0} defaultValue={0.0} />
          </Col>
          <Col md={3}>
            <Form.Label>Grade</Form.Label>
            <Form.Control plaintext readOnly min={0} defaultValue="B" />
          </Col>
          <Col md={3}>
            <Form.Label>Rating</Form.Label>
            <Form.Control
              plaintext
              readOnly
              type="number"
              min={0}
              defaultValue="0.00"
            />
          </Col>
        </Row>
      </Form.Group>
      <Form.Group className="mb-3" controlId="submitScoreForm.ClearTypeSelect">
        <Form.Label>Clear Type</Form.Label>
        <Form.Select aria-label="Clear Type">
          <option>Select...</option>
          <option value="1">Played</option>
          <option value="2">Full Combo</option>
          <option value="3">All Perfect</option>
          <option value="4">All Perfect+</option>
        </Form.Select>
      </Form.Group>
      <Form.Group
        className="mb-3 d-inline-flex"
        controlId="submitScoreForm.JudgementsFields"
      >
        <Row>
          <Col>
            <Form.Label>Perfect</Form.Label>
            <Form.Control type="number" min={0} />
          </Col>
          <Col>
            <Form.Label>Great</Form.Label>
            <Form.Control type="number" min={0} />
          </Col>
          <Col>
            <Form.Label>Good</Form.Label>
            <Form.Control type="number" min={0} />
          </Col>
          <Col>
            <Form.Label>Miss</Form.Label>
            <Form.Control type="number" min={0} />
          </Col>
        </Row>
      </Form.Group>
      <Form.Group className="mb-3" controlId="submitScoreForm.DateTimeField">
        <Form.Label>Date Obtained</Form.Label>
        <Form.Control type="datetime-local" />
      </Form.Group>
      <Row className="justify-content-start">
        <Col sm={3} xs={12}>
          <Button variant="success" className="w-100 mb-1">
            <FontAwesomeIcon icon={faPlus} /> Add
          </Button>
        </Col>
        <Col sm={3} xs={12}>
          <Button variant="primary" className="w-100 mb-1">
            <FontAwesomeIcon icon={faSave} /> Submit
          </Button>
        </Col>
        <Col sm={3} xs={12}>
          <Button variant="danger" className="w-100 mb-1">
            <FontAwesomeIcon icon={faTrash} /> Clear
          </Button>
        </Col>
      </Row>
    </Form>
  );
};
