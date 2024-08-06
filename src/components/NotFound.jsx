import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <Container fluid className="d-flex justify-content-center align-items-center">
      <Row>
        <Col>
          <h1>
            Are you lost? Click <Link to={"/home"}>here</Link> to find your way back
          </h1>
        </Col>
      </Row>
    </Container>
  );
};

export default NotFound;
