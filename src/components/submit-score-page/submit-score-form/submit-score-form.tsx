import {
  faFire,
  faPlus,
  faSave,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { DateTime } from "luxon";
import { useState } from "react";
import { Alert, Button, Col, Form, Row } from "react-bootstrap";
import {
  getChartByKey,
  useChartStore,
  useScoreDataStore,
} from "../../../hooks/store";
import { Chart } from "../../../models/chart";
import { Judgements, ScoreData } from "../../../models/score";
import {
  defaultValidation,
  getInvalidFields,
  ScoreFormValidation,
} from "../../../models/score-form-validation";
import { calculateMaxScore } from "../../../utils/score-tools";
import { ScoreFormJudgements } from "./score-form-judgements/score-form-judgements";
import { ScoreFormPercentStats } from "./score-form-percent-stats/score-form-percent-stats";
import "./submit-score-form.css";
import { ScoreFormClearType } from "./score-form-clear-type/score-form-clear-type";

interface ScoreFormProps {
  addToSubmitScores: (score: ScoreData) => void;
}

export const SubmitScoreForm = ({ addToSubmitScores }: ScoreFormProps) => {
  const [searchField, setSearchField] = useState<string>("");
  const [filteredCharts, setFilteredCharts] = useState<Array<Chart>>(
    useChartStore.getState().chartData
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

  const getAllCharts = (searchTerm: string = ""): Chart[] => {
    const chartData = useChartStore.getInitialState().chartData;
    if (!searchTerm) {
      return chartData;
    }
    const searchTermLower = searchTerm.toLowerCase();
    const filtered: Chart[] = [];

    for (let i = 0; i < chartData.length; i++) {
      const chart = chartData[i];
      if (chart.song.toLowerCase().indexOf(searchTermLower) >= 0) {
        filtered.push(chart);
      }
    }
    return filtered;
  };

  const handleSearch = (): void => {
    const filtered = getAllCharts(searchField);
    setFilteredCharts(filtered);
  };

  const isValidated = (): boolean => {
    return (
      Object.values(validated).filter((validation) => !validation).length === 0
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
    setFilteredCharts(getAllCharts());
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
                const chart = getChartByKey(
                  useChartStore.getState(),
                  e.currentTarget.value
                );
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

      <ScoreFormPercentStats
        percent={percent}
        maxPercent={maxPercent}
        selectedChart={selectedChart}
        validated={validated}
        rate={rate}
        setValidated={setValidated}
        setPercent={setPercent}
        setRate={setRate}
      />

      <ScoreFormJudgements
        validated={validated}
        judgements={judgements}
        selectedChart={selectedChart}
        setJudgements={setJudgements}
        setValidated={setValidated}
      />

      <ScoreFormClearType
        clearType={clearType}
        validated={validated}
        judgements={judgements}
        percent={percent}
        maxPercent={maxPercent}
        selectedChart={selectedChart}
        setClearType={setClearType}
        setValidated={setValidated}
      />

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
          <Button variant="danger" type="reset" className="w-100 mb-1">
            <FontAwesomeIcon icon={faTrash} /> Clear
          </Button>
        </Col>
        <Col sm={3} xs={12}>
          <Button
            variant="danger"
            className="w-100 mb-1"
            onClick={useScoreDataStore().removeAllScores}
          >
            <FontAwesomeIcon icon={faFire} /> Reset
          </Button>
        </Col>
      </Row>
      {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
    </Form>
  );
};
