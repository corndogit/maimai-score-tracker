import { faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { DateTime } from "luxon";
import { useState } from "react";
import { Alert, Button, Col, Form, Row } from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";
import { getChartByKey, useChartStore } from "../../../hooks/store";
import { Chart } from "../../../models/chart";
import {
  BreakJudgements,
  HitMeta,
  Judgements,
  ScoreData,
} from "../../../models/score";
import {
  defaultValidation,
  getInvalidFields,
  ScoreFormValidation,
} from "../../../models/score-form-validation";
import { calculateMaxScore } from "../../../utils/score-tools";
import { ScoreFormTiming } from "./score-form-advanced-options/score-form-timing";
import { ScoreFormClearType } from "./score-form-clear-type/score-form-clear-type";
import { ScoreFormDatePicker } from "./score-form-date-picker/score-form-date-picker";
import { ScoreFormJudgements } from "./score-form-judgements/score-form-judgements";
import { ScoreFormPercentStats } from "./score-form-percent-stats/score-form-percent-stats";
import { ScoreFormSongTitle } from "./score-form-song-title/score-form-song-title";
import "./submit-score-form.css";
import { useUserSettingsStore } from "../../../hooks/settings-store";
import { ScoreFormBreakJudgements } from "./score-form-advanced-options/score-form-break-judgements";

interface ScoreFormProps {
  addToSubmitScores: (score: ScoreData) => void;
}

export const SubmitScoreForm = ({ addToSubmitScores }: ScoreFormProps) => {
  const settingsStore = useUserSettingsStore();
  const [searchField, setSearchField] = useState<string>("");
  const [filteredCharts, setFilteredCharts] = useState<Array<Chart>>(
    useChartStore.getState().chartData
  );
  const [selectedChart, setSelectedChart] = useState<Chart>();
  const [selectedChartKey, setSelectedChartKey] = useState<string>("");
  const [percent, setPercent] = useState<string>("");
  const [maxPercent, setMaxPercent] = useState<string>("0");
  const [rate, setRate] = useState<number>(0);
  const [judgements, setJudgements] = useState<Judgements>({
    perfect: 0,
    great: 0,
    good: 0,
    miss: 0,
  });
  const [hitMeta, setHitMeta] = useState<HitMeta>({ fast: 0, slow: 0 });
  const [breakJudgements, setBreakJudgements] = useState<BreakJudgements>({
    breakPerfect: 0,
    breakGreat: 0,
    breakGood: 0,
    breakMiss: 0,
    totalScore: 0,
    breakScore: 0,
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

  const handleSearchResultSelection = (key: string) => {
    const chart = getChartByKey(useChartStore.getState(), key);
    setSelectedChart(chart);
    setSelectedChartKey(key);
    if (chart) {
      setMaxPercent(calculateMaxScore(chart).toFixed(2));
      setValidated({ ...validated, isChartSelectedValid: true });
    } else {
      setMaxPercent("0");
      setValidated({ ...validated, isChartSelectedValid: false });
    }
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
      uuid: uuidv4(),
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
      hitMeta: settingsStore.advancedSubmitEnabled ? hitMeta : undefined,
      breakJudgements: settingsStore.breakJudgementsEnabled
        ? breakJudgements
        : undefined,
      timeAchieved: DateTime.fromISO(dateObtained).toMillis(),
    };
    addToSubmitScores(score);
    clearForm();
  };

  const clearForm = () => {
    setSelectedChart(undefined);
    setSelectedChartKey("");
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
    setBreakJudgements({
      breakPerfect: 0,
      breakGreat: 0,
      breakGood: 0,
      breakMiss: 0,
      totalScore: 0,
      breakScore: 0,
    });
    setHitMeta({ fast: 0, slow: 0 });
    setClearType("FAILED");
    setValidated(defaultValidation);
    setDateObtained("");
    setErrorMessage("");
  };

  return (
    <Form noValidate onReset={clearForm}>
      <ScoreFormSongTitle
        filteredCharts={filteredCharts}
        selectedChartKey={selectedChartKey}
        searchField={searchField}
        setSearchField={setSearchField}
        handleSearch={handleSearch}
        handleSearchResultSelection={handleSearchResultSelection}
      />

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
        percent={percent}
        maxPercent={maxPercent}
        setClearType={setClearType}
        setJudgements={setJudgements}
        setValidated={setValidated}
      />

      <Row className="mt-4 mb-2">
        <Col xl={12}>
          <Form.Switch
            id="toggle-fast-slows"
            label="Add fast/slow counts"
            checked={settingsStore.advancedSubmitEnabled}
            onChange={(e) =>
              settingsStore.setAdvancedSubmitEnabled(e.currentTarget.checked)
            }
          ></Form.Switch>
        </Col>
      </Row>

      <Row className="mt-4 mb-2">
        <Col xl={12}>
          <Form.Switch
            id="toggle-break-judgements"
            label="Add break judgements"
            checked={settingsStore.breakJudgementsEnabled}
            onChange={(e) =>
              settingsStore.setBreakJudgementsEnabled(e.currentTarget.checked)
            }
          ></Form.Switch>
        </Col>
      </Row>

      {settingsStore.advancedSubmitEnabled && (
        <ScoreFormTiming
          hitMeta={hitMeta}
          setHitMeta={setHitMeta}
          selectedChart={selectedChart}
        />
      )}

      {settingsStore.breakJudgementsEnabled && (
        <ScoreFormBreakJudgements
          selectedChart={selectedChart}
          breakJudgements={breakJudgements}
          setBreakJudgements={setBreakJudgements}
        />
      )}

      <ScoreFormClearType
        validated={validated}
        judgements={judgements}
        percent={percent}
        maxPercent={maxPercent}
        selectedChart={selectedChart}
        setValidated={setValidated}
      />

      <ScoreFormDatePicker
        dateObtained={dateObtained}
        setDateObtained={setDateObtained}
        validated={validated}
        setValidated={setValidated}
      />

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
      </Row>
      {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
    </Form>
  );
};
