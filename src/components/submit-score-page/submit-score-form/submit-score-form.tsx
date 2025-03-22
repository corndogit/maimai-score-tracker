import { faPlus, faSave, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useChartStore } from "../../../hooks/store";
import { useState } from "react";
import { Chart } from "../../../models/chart";
import { calculateGrade } from "../../../utils/score-tools";
import { ClearType, Judgements } from "../../../models/score";

export const SubmitScoreForm = () => {
  const charts = useChartStore();
  const [searchField, setSearchField] = useState("");
  const [filteredCharts, setFilteredCharts] = useState<Array<Chart>>(
    charts.getAllCharts()
  );
  const [selectedChart, setSelectedChart] = useState<Chart>();
  const [percent, setPercent] = useState("");
  const [judgements, setJudgements] = useState<Judgements>({
    perfect: 0,
    great: 0,
    good: 0,
    miss: 0,
  });
  const [dateObtained, setDateObtained] = useState("");
  const [clearType, setClearType] = useState(ClearType.PLAYED);

  const handleSearch = (): void => {
    const filtered = charts.getAllCharts(searchField);
    setFilteredCharts(filtered);
  };

  const handleGradeCalculation = (percentString: string): string => {
    const grade =
      percentString.length > 0
        ? calculateGrade(parseFloat(percentString))
        : calculateGrade(0);
    return grade;
  };

  return (
    <Form>
      <Form.Group className="mb-3">
        <Form.Label>Song title</Form.Label>
        <Row className="mb-3">
          <Col xs={12}>
            <Form.Select
              aria-label="Search results"
              onChange={(e) => {
                setSelectedChart(charts.getByKey(e.currentTarget.value));
              }}
            >
              <option>
                Select title... {`(${filteredCharts.length} results)`}
              </option>
              {filteredCharts.map((chart) => {
                return (
                  <option
                    key={`${chart.id}-${chart.difficulty}`}
                    value={`${chart.id}-${chart.difficulty}`}
                  >{`${chart.song} (${chart.difficulty} ${chart.level})`}</option>
                );
              })}
            </Form.Select>
          </Col>
        </Row>
        <Row>
          <Col xs={10}>
            <Form.Control
              placeholder="Search (e.g. Oshama Scramble)"
              value={searchField}
              onInput={(e) => setSearchField(e.currentTarget.value)}
            />
          </Col>
          <Col xs={2} className="p-0">
            <Button onClick={() => handleSearch()}>Search</Button>
          </Col>
        </Row>
      </Form.Group>
      <Form.Group
        className="mb-3 d-inline-flex"
        controlId="submitScoreForm.ScoreFields"
      >
        <Row>
          <Col md={3}>
            <Form.Label>Percent</Form.Label>
            <Form.Control
              type="number"
              min={0}
              value={percent}
              onChange={(e) => {
                setPercent(e.currentTarget.value);
              }}
            />
          </Col>
          <Col md={3}>
            <Form.Label>Grade</Form.Label>
            <Form.Control
              plaintext
              readOnly
              min={0}
              value={handleGradeCalculation(percent)}
            />
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
        <Form.Select
          aria-label="Clear Type"
          onChange={(e) =>
            setClearType(
              ClearType[e.currentTarget.value as keyof typeof ClearType]
            )
          }
        >
          <option>Select...</option>
          <option value={ClearType.PLAYED}>{ClearType.PLAYED}</option>
          <option value={ClearType.FULL_COMBO}>{ClearType.FULL_COMBO}</option>
          <option value={ClearType.ALL_PERFECT}>{ClearType.ALL_PERFECT}</option>
          <option value={ClearType.ALL_PERFECT_PLUS}>
            {ClearType.ALL_PERFECT_PLUS}
          </option>
        </Form.Select>
      </Form.Group>
      <Form.Group
        className="mb-3 d-inline-flex"
        controlId="submitScoreForm.JudgementsFields"
      >
        <Row>
          <Col>
            <Form.Label>Perfect</Form.Label>
            <Form.Control
              type="number"
              min={0}
              value={judgements.perfect}
              onChange={(e) =>
                setJudgements({
                  ...judgements,
                  perfect: e.currentTarget.value
                    ? parseInt(e.currentTarget.value)
                    : 0,
                })
              }
            />
          </Col>
          <Col>
            <Form.Label>Great</Form.Label>
            <Form.Control
              type="number"
              min={0}
              value={judgements.great}
              onChange={(e) =>
                setJudgements({
                  ...judgements,
                  great: e.currentTarget.value
                    ? parseInt(e.currentTarget.value)
                    : 0,
                })
              }
            />
          </Col>
          <Col>
            <Form.Label>Good</Form.Label>
            <Form.Control
              type="number"
              min={0}
              value={judgements.good}
              onChange={(e) =>
                setJudgements({
                  ...judgements,
                  good: e.currentTarget.value
                    ? parseInt(e.currentTarget.value)
                    : 0,
                })
              }
            />
          </Col>
          <Col>
            <Form.Label>Miss</Form.Label>
            <Form.Control
              type="number"
              min={0}
              value={judgements.miss}
              onChange={(e) =>
                setJudgements({
                  ...judgements,
                  miss: e.currentTarget.value
                    ? parseInt(e.currentTarget.value)
                    : 0,
                })
              }
            />
          </Col>
        </Row>
      </Form.Group>
      <Form.Group className="mb-3" controlId="submitScoreForm.DateTimeField">
        <Form.Label>Date Obtained</Form.Label>
        <Form.Control
          type="datetime-local"
          onChange={(e) => setDateObtained(e.currentTarget.value)}
        />
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
