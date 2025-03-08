import { Table } from "react-bootstrap";

export const SubmitScorePreview = () => {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <td>Song</td>
          <td>Difficulty</td>
          <td>Percent</td>
          <td>Judgements</td>
          <td>Date</td>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>NATSUMATSURI</td>
          <td>Expert 7</td>
          <td>
            SSS
            <br />
            100.11%
          </td>
          <td>423-8-2-0</td>
          <td>08-03-2025 22:28:00</td>
        </tr>
        <tr>
          <td>7 Girls War</td>
          <td>Master 10</td>
          <td>
            SS
            <br />
            99.13%
          </td>
          <td>379-10-6-0</td>
          <td>08-03-2025 22:28:00</td>
        </tr>
      </tbody>
    </Table>
  );
};
