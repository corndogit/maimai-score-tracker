import { faPlus, faSave, faTrash } from "@fortawesome/free-solid-svg-icons";
import { DateTime } from "luxon";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useChartStore } from "../../../hooks/store";
import { Chart } from "../../../models/chart";
import { Judgements, ScoreData } from "../../../models/score";
import { calculateGrade } from "../../../utils/score-tools";
import { MaimaiRate } from "rg-stats";

interface ScoreFormProps {
  addToSubmitScores: (score: ScoreData) => void;
}

export const SubmitScoreForm = ({ addToSubmitScores }: ScoreFormProps) => {
  const charts = useChartStore();
  const [searchField, setSearchField] = useState<string>("");
  const [filteredCharts, setFilteredCharts] = useState<Array<Chart>>(
    charts.getAllCharts()
  );
  const [selectedChart, setSelectedChart] = useState<Chart>();
  const [selectedChartKey, setSelectedChartKey] = useState<string>("");
  const [percent, setPercent] = useState<string>("");
  const [rate, setRate] = useState<number>(0);
  const [judgements, setJudgements] = useState<Judgements>({
    perfect: 0,
    great: 0,
    good: 0,
    miss: 0,
  });
  const [dateObtained, setDateObtained] = useState<string>("");
  const [clearType, setClearType] = useState<string>("");

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

  const handlePercentChange = (value: string) => {
    setPercent(value);
    setRate(
      MaimaiRate.calculate(
        percent ? parseFloat(percent) : 0,
        104,
        selectedChart ? selectedChart.chartConstant : 0
      )
    );
  };

  const handleAddScore = () => {
    console.log(selectedChart, clearType);
    if (!selectedChart || !clearType || !dateObtained) {
      return;
    }
    const score: ScoreData = {
      identifier: selectedChart.id.toString(),
      matchType: "inGameID",
      lamp: clearType,
      difficulty: selectedChart.difficulty,
      percent: percent ? parseFloat(percent) : 0,
      judgements: {
        perfect: judgements.perfect,
        great: judgements.great,
        good: judgements.good,
        miss: judgements.miss,
      },
      timeAchieved: DateTime.fromISO(dateObtained).toMillis(),
    };
    addToSubmitScores(score);
    clearForm();
  };

  const clearForm = () => {
    setSelectedChart(undefined);
    setSelectedChartKey("");
    setPercent("");
    setJudgements({
      perfect: 0,
      great: 0,
      good: 0,
      miss: 0,
    });
    setClearType("");
    setDateObtained("");
  };

  return (
    <Form>
      <Form.Group className="mb-3">
        <Form.Label>Song title</Form.Label>
        <Row className="mb-3">
          <Col xs={12}>
            <Form.Select
              aria-label="Search results"
              value={selectedChartKey}
              onChange={(e) => {
                setSelectedChart(charts.getByKey(e.currentTarget.value));
                setSelectedChartKey(e.currentTarget.value);
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
                handlePercentChange(e.currentTarget.value);
              }}
            />
          </Col>
          <Col md={3}>
            <Form.Label>Grade</Form.Label>
            <Form.Control
              plaintext
              readOnly
              min={0}
              value={handleGradeCalculation(percent ?? "")}
            />
          </Col>
          <Col md={3}>
            <Form.Label>Rating</Form.Label>
            <Form.Control plaintext readOnly type="number" value={rate} />
          </Col>
        </Row>
      </Form.Group>
      <Form.Group className="mb-3" controlId="submitScoreForm.ClearTypeSelect">
        <Form.Label>Clear Type</Form.Label>
        <Form.Select
          aria-label="Clear Type"
          onChange={(e) => {
            setClearType(e.currentTarget.value);
          }}
        >
          <option>Select...</option>
          <option value="PLAYED">Played</option>
          <option value="FAILED">Failed</option>
          <option value="FULL COMBO">Full Combo</option>
          <option value="ALL PERFECT">All Perfect</option>
          <option value="ALL PERFECT+">All Perfect+</option>
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
              max={104}
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
          <Button
            variant="success"
            className="w-100 mb-1"
            onClick={() => handleAddScore()}
          >
            <FontAwesomeIcon icon={faPlus} /> Add
          </Button>
        </Col>
        <Col sm={3} xs={12}>
          <Button variant="primary" className="w-100 mb-1" disabled>
            <FontAwesomeIcon icon={faSave} /> Submit
          </Button>
        </Col>
        <Col sm={3} xs={12}>
          <Button
            variant="danger"
            className="w-100 mb-1"
            onClick={() => clearForm()}
          >
            <FontAwesomeIcon icon={faTrash} /> Clear
          </Button>
        </Col>
      </Row>
    </Form>
  );
};
