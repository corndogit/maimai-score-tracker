import { Col, Row } from "react-bootstrap";

type PageTitlesProps = {
  title: string;
  subtitle?: string;
};

export const PageTitles = ({ title, subtitle }: PageTitlesProps) => {
  return (
    <Row className="page-titles">
      <Col>
        <h1>{title}</h1>
        {subtitle && <p className="lead">{subtitle}</p>}
      </Col>
    </Row>
  );
};
