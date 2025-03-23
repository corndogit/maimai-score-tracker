import { faPlus, faSave, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { DateTime } from "luxon";
import { useState } from "react";
import { Alert, Button, Col, Form, Row } from "react-bootstrap";
import { MaimaiRate } from "rg-stats";
import { useChartStore } from "../../../hooks/store";
import { Chart } from "../../../models/chart";
import { Judgements, ScoreData } from "../../../models/score";
import { calculateGrade, calculateMaxScore } from "../../../utils/score-tools";
import "./submit-score-form.css";

interface ScoreFormProps {
  addToSubmitScores: (score: ScoreData) => void;
}

type ScoreFormValidation = {
  isChartSelectedValid: boolean;
  isPercentValid: boolean;
  isClearTypeValid: boolean;
  isJudgementsValid: boolean;
  isDateObtainedValid: boolean;
};

const defaultValidation: ScoreFormValidation = {
  isChartSelectedValid: false,
  isPercentValid: false,
  isClearTypeValid: true,
  isJudgementsValid: false,
  isDateObtainedValid: false,
};

const getInvalidFields = (fields: ScoreFormValidation): Array<String> => {
  let invalidFields = [
    !fields.isChartSelectedValid ? "Chart Selected" : "",
    !fields.isPercentValid ? "Percent" : "",
    !fields.isClearTypeValid ? "Clear Type" : "",
    !fields.isJudgementsValid ? "Judgements" : "",
    !fields.isDateObtainedValid ? "Date Obtained" : "",
  ];
  return invalidFields.filter((field) => field !== "");
};

export const SubmitScoreForm = ({ addToSubmitScores }: ScoreFormProps) => {
  const charts = useChartStore();
  const [searchField, setSearchField] = useState<string>("");
  const [filteredCharts, setFilteredCharts] = useState<Array<Chart>>(
    charts.getAllCharts()
  );
  const [selectedChart, setSelectedChart] = useState<Chart>();
  const [percent, setPercent] = useState<string>("");
  const [maxPercent, setMaxPercent] = useState<string>("0");
  const [rate, setRate] = useState<number>(0);
  const [judgements, setJudgements] = useState<Judgements>({
    perfect: 0,
    great: 0,
    good: 0,
    miss: 0,
  });
  const [dateObtained, setDateObtained] = useState<string>("");
  const [clearType, setClearType] = useState<string>("FAILED");
  const [validated, setValidated] =
    useState<ScoreFormValidation>(defaultValidation);
  const [errorMessage, setErrorMessage] = useState<string>("");

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

  const handlePercentChange = (value: string): void => {
    setPercent(value);
    setValidated({
      ...validated,
      isPercentValid: isValidPercent(value),
    });
    if (selectedChart && isValidPercent(value) && value) {
      setRate(
        MaimaiRate.calculate(
          parseFloat(value),
          parseFloat(maxPercent),
          selectedChart.chartConstant
        )
      );
    } else {
      setRate(0);
    }
  };

  const handleJudgementChange = (
    value: string,
    judgementType: string
  ): void => {
    let newJudgements = judgements;
    newJudgements[judgementType as keyof Judgements] = value
      ? parseInt(value)
      : 0;
    setJudgements(newJudgements);
    validateJudgements(newJudgements);
  };

  const isValidPercent = (percent: string): boolean => {
    const percentNumber = parseFloat(percent);
    return (
      !!percentNumber &&
      percentNumber > 0 &&
      percentNumber <= parseFloat(maxPercent)
    );
  };

  const validateJudgements = (judgements: Judgements): void => {
    const totalJudgements =
      judgements.perfect + judgements.great + judgements.good + judgements.miss;
    setValidated({
      ...validated,
      isJudgementsValid: totalJudgements === selectedChart?.notes,
    });
  };

  const validateClearType = (
    clearType: string,
    judgements: Judgements
  ): void => {
    let valid = false;
    if (!clearType || clearType === "Select...") {
      valid = false;
    } else if (clearType === "PLAYED" || clearType === "FAILED") {
      valid = true;
    } else if (clearType === "FULL COMBO") {
      const totalMinusMisses =
        judgements.perfect +
        judgements.great +
        judgements.good -
        judgements.miss;
      valid = totalMinusMisses === selectedChart?.notes;
    } else {
      valid =
        judgements.perfect === selectedChart?.notes &&
        judgements.great === 0 &&
        judgements.good === 0 &&
        judgements.miss === 0;
    }
    setValidated({ ...validated, isClearTypeValid: valid });
  };

  const isValidated = (): boolean => {
    return (
      Object.values(validated).filter((validation) => !validation).length === 0
    );
  };

  const sumJudgements = (): number => {
    return (
      judgements.perfect + judgements.great + judgements.good + judgements.miss
    );
  };

  const handleAddScore = (): void => {
    if (!isValidated()) {
      const invalidFields = getInvalidFields(validated);
      setErrorMessage(
        `The following fields contained ${
          invalidFields.length
        } errors: ${invalidFields.join(", ")}`
      );
      return;
    }
    const score: ScoreData = {
      identifier: selectedChart!.id.toString(),
      matchType: "inGameID",
      lamp: clearType,
      difficulty: selectedChart!.difficulty,
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
    setSearchField("");
    setFilteredCharts(charts.getAllCharts());
    setPercent("");
    setMaxPercent("0");
    setRate(0);
    setJudgements({
      perfect: 0,
      great: 0,
      good: 0,
      miss: 0,
    });
    setClearType("FAILED");
    setValidated(defaultValidation);
    setDateObtained("");
    setErrorMessage("");
  };

  return (
    <Form noValidate onReset={clearForm}>
      <Form.Group className="mb-3">
        <Form.Label>Song title</Form.Label>
        <Row className="mb-3">
          <Col xs={12}>
            <Form.Select
              aria-label="Search results"
              required
              onChange={(e) => {
                const chart = charts.getByKey(e.currentTarget.value);
                setSelectedChart(chart);
                if (chart) {
                  setMaxPercent(calculateMaxScore(chart).toPrecision(5));
                  setValidated({ ...validated, isChartSelectedValid: true });
                } else {
                  setMaxPercent("0");
                  setValidated({ ...validated, isChartSelectedValid: false });
                }
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
            <Button onClick={handleSearch}>Search</Button>
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
              max={maxPercent ? parseFloat(maxPercent) : 0}
              value={percent}
              required
              isInvalid={!!percent && !isValidPercent(percent)}
              disabled={!selectedChart}
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
            <Form.Label>Max Percent</Form.Label>
            <Form.Control plaintext readOnly value={maxPercent} />
          </Col>
          <Col md={3}>
            <Form.Label>Rating</Form.Label>
            <Form.Control
              plaintext
              readOnly
              type="number"
              value={rate}
              hidden={!isValidPercent(percent)}
            />
          </Col>
        </Row>
      </Form.Group>
      <Form.Group className="mb-3" controlId="submitScoreForm.ClearTypeSelect">
        <Form.Label>Clear Type</Form.Label>
        <Form.Select
          aria-label="Clear Type"
          required
          isInvalid={
            (clearType !== "PLAYED" || "FAILED") && !validated.isClearTypeValid
          }
          disabled={!selectedChart}
          onChange={(e) => {
            const value = e.currentTarget.value;
            setClearType(value);
            validateClearType(value, judgements);
          }}
        >
          <option value="FAILED">Failed</option>
          <option value="PLAYED">Played</option>
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
              value={judgements.perfect}
              disabled={!selectedChart}
              isValid={validated.isJudgementsValid}
              onChange={(e) =>
                handleJudgementChange(e.currentTarget.value, "perfect")
              }
            />
          </Col>
          <Col>
            <Form.Label>Great</Form.Label>
            <Form.Control
              type="number"
              min={0}
              value={judgements.great}
              disabled={!selectedChart}
              isValid={validated.isJudgementsValid}
              onChange={(e) =>
                handleJudgementChange(e.currentTarget.value, "great")
              }
            />
          </Col>
          <Col>
            <Form.Label>Good</Form.Label>
            <Form.Control
              type="number"
              min={0}
              value={judgements.good}
              disabled={!selectedChart}
              isValid={validated.isJudgementsValid}
              onChange={(e) =>
                handleJudgementChange(e.currentTarget.value, "good")
              }
            />
          </Col>
          <Col>
            <Form.Label>Miss</Form.Label>
            <Form.Control
              type="number"
              min={0}
              value={judgements.miss}
              disabled={!selectedChart}
              isValid={validated.isJudgementsValid}
              onChange={(e) =>
                handleJudgementChange(e.currentTarget.value, "miss")
              }
            />
          </Col>
        </Row>
      </Form.Group>
      <Form.Text id="notesHelper" muted>
        Judgements must add up to the song's total notes.{" "}
        {selectedChart &&
          `(total notes: ${
            selectedChart.notes
          }, current total is ${sumJudgements()})`}
      </Form.Text>
      <Form.Group className="mb-3" controlId="submitScoreForm.DateTimeField">
        <Form.Label>Date Obtained</Form.Label>
        <Form.Control
          type="datetime-local"
          required
          onChange={(e) => {
            const value = e.currentTarget.value;
            setDateObtained(value);
            setValidated({
              ...validated,
              isDateObtainedValid: !!value,
            });
          }}
        />
      </Form.Group>
      <Row className="justify-content-start">
        <Col sm={3} xs={12}>
          <Button
            variant="success"
            type="button"
            disabled={!isValidated()}
            className="w-100 mb-1"
            onClick={handleAddScore}
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
          <Button variant="danger" type="reset" className="w-100 mb-1">
            <FontAwesomeIcon icon={faTrash} /> Clear
          </Button>
        </Col>
      </Row>
      {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
    </Form>
  );
};
