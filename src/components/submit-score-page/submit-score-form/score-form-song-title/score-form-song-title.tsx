import { Button, Col, Form, Row } from "react-bootstrap";
import { Chart } from "../../../../models/chart";

type Props = {
  filteredCharts: Chart[];
  selectedChartKey: string;
  searchField: string;
  handleSearchResultSelection: (selection: string) => void;
  setSearchField: (term: string) => void;
  handleSearch: () => void;
};
export const ScoreFormSongTitle = ({
  filteredCharts,
  selectedChartKey,
  searchField,
  handleSearchResultSelection,
  setSearchField,
  handleSearch,
}: Props) => {
  return (
    <Form.Group className="mb-3">
      <Form.Label>Song title</Form.Label>
      <Row className="mb-3">
        <Col xs={12}>
          <Form.Select
            aria-label="Search results"
            required
            value={selectedChartKey}
            onChange={(e) => handleSearchResultSelection(e.currentTarget.value)}
          >
            <option value={undefined}>
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
  );
};
