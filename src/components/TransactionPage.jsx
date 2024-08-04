import { Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import SingleTransaction from "./SingleTransaction";

const TransactionPage = () => {
  const selectedWalletTransactions = useSelector((state) => state.user.wallet_transactions.content);

  return (
    <Container className="transaction-page-container">
      <Row className="transaction-page-title-container">
        <h1>Here you can find all your transactions</h1>
      </Row>
      <Container className="transaction-page-body-container">
        <Row className="transaction-page-legenda-container">
          <Col>Name</Col>
          <Col>Amount</Col>
          <Col>Date</Col>
          <Col>Category</Col>
          {/* <Col>Description</Col> */}
          <Col>Type</Col>
          <Col>Recurrency</Col>
        </Row>

        <Row className="transaction-page-transaction-container">
          {selectedWalletTransactions &&
            selectedWalletTransactions.length > 0 &&
            selectedWalletTransactions.map((transaction) => (
              <SingleTransaction transaction={transaction} key={transaction.id} />
            ))}
        </Row>
      </Container>
    </Container>
  );
};

export default TransactionPage;
