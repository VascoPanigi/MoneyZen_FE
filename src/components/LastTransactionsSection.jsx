import { Col, Row } from "react-bootstrap";
import { formatDate } from "../utils/utils";

const LastTransactionsSection = ({ transaction }) => {
  const formattedDate = formatDate(transaction.date);

  return (
    <Row className="last-transactionms-section-single-transaction-container">
      <Col>{transaction.name}</Col>
      <Col>&#8364;{transaction.amount.toFixed(2)}</Col>
      <Col>{formattedDate}</Col>
      <Col>{transaction.category.name}</Col>
    </Row>
  );
};

export default LastTransactionsSection;
