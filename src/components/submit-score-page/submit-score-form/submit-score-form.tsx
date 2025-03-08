import { Button, Col, Form, Row } from "react-bootstrap";

export const SubmitScoreForm = () => {
  return (
    <Form>
      <Form.Group className="mb-3" controlId="submitScoreForm.SongTitleField">
        <Form.Label>Song title</Form.Label>
        <Form.Control placeholder="e.g. Oshama Scramble" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="submitScoreForm.DifficultySelect">
        <Form.Label>Difficulty</Form.Label>
        <Form.Select aria-label="Clear Type">
          <option>Select...</option>
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
            <Form.Control type="number" min={0} />
          </Col>
          <Col md={3}>
            <Form.Label>Grade</Form.Label>
            <Form.Control disabled min={0} />
          </Col>
          <Col md={3}>
            <Form.Label>Rating</Form.Label>
            <Form.Control disabled type="number" min={0} />
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
      <Row>
        <Button variant="primary">Submit</Button>
      </Row>
    </Form>
  );
};
