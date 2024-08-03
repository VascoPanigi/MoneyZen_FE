import { Col, Container, Row } from "react-bootstrap";

const LastTransactionsSection = () => {
  return (
    <Container className="last-transactionms-section-container">
      <Row className="last-transactionms-section-title-container">
        <h4>Last transactions</h4>
      </Row>
      <Row className="last-transactionms-section-single-transaction-legenda-container">
        <Col>Name</Col>
        <Col>Amount</Col>
        <Col>Date</Col>
        <Col>Category</Col>
      </Row>
      <Row className="last-transactionms-section-single-transaction-container">
        <Col>Transaction name</Col>
        <Col>Amount</Col>
        <Col>10/10/2000</Col>
        <Col>Category</Col>
      </Row>
      <Row className="last-transactionms-section-single-transaction-container">
        <Col>Transaction name</Col>
        <Col>Amount</Col>
        <Col>10/10/2000</Col>
        <Col>Category</Col>
      </Row>
      <Row className="last-transactionms-section-single-transaction-container">
        <Col>Transaction name</Col>
        <Col>Amount</Col>
        <Col>10/10/2000</Col>
        <Col>Category</Col>
      </Row>
      <Row className="last-transactionms-section-single-transaction-container">
        <Col>Transaction name</Col>
        <Col>Amount</Col>
        <Col>10/10/2000</Col>
        <Col>Category</Col>
      </Row>
    </Container>
  );
};

export default LastTransactionsSection;
