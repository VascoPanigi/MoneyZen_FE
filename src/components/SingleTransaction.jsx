import { Row, Col } from "react-bootstrap";
// import { PencilSquare, Trash } from "react-bootstrap-icons";
import { formatDateTime, formatDate } from "../utils/utils";

const SingleTransaction = ({ transaction }) => {
  const formattedDateTime = formatDateTime(transaction.date);
  const formattedDate = formatDate(transaction.date);

  return (
    <Row className="single-transaction-container">
      <Col>{transaction.name}</Col>
      <Col className="single-transaction-amount-container">
        &#8364;{transaction.amount.toFixed(2)}{" "}
        {transaction.category.transactionType === "OUTCOME" ? (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="single-transaction-expense-icon">
            <path d="M34.9 289.5l-22.2-22.2c-9.4-9.4-9.4-24.6 0-33.9L207 39c9.4-9.4 24.6-9.4 33.9 0l194.3 194.3c9.4 9.4 9.4 24.6 0 33.9L413 289.4c-9.5 9.5-25 9.3-34.3-.4L264 168.6V456c0 13.3-10.7 24-24 24h-32c-13.3 0-24-10.7-24-24V168.6L69.2 289.1c-9.3 9.8-24.8 10-34.3 .4z" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="single-transaction-income-icon">
            <path d="M34.9 289.5l-22.2-22.2c-9.4-9.4-9.4-24.6 0-33.9L207 39c9.4-9.4 24.6-9.4 33.9 0l194.3 194.3c9.4 9.4 9.4 24.6 0 33.9L413 289.4c-9.5 9.5-25 9.3-34.3-.4L264 168.6V456c0 13.3-10.7 24-24 24h-32c-13.3 0-24-10.7-24-24V168.6L69.2 289.1c-9.3 9.8-24.8 10-34.3 .4z" />
          </svg>
        )}
      </Col>
      <Col className="single-transaction-date-time-container">{formattedDateTime}</Col>
      <Col className="single-transaction-date-container">{formattedDate}</Col>
      <Col className="single-transaction-category-container">{transaction.category.name}</Col>
      {/* <Col>Description</Col> */}
      {/* <Col className="single-transaction-operation-type-container">
        {transaction.category.transactionType === "OUTCOME" ? (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="single-transaction-expense-icon">
            <path d="M34.9 289.5l-22.2-22.2c-9.4-9.4-9.4-24.6 0-33.9L207 39c9.4-9.4 24.6-9.4 33.9 0l194.3 194.3c9.4 9.4 9.4 24.6 0 33.9L413 289.4c-9.5 9.5-25 9.3-34.3-.4L264 168.6V456c0 13.3-10.7 24-24 24h-32c-13.3 0-24-10.7-24-24V168.6L69.2 289.1c-9.3 9.8-24.8 10-34.3 .4z" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="single-transaction-income-icon">
            <path d="M34.9 289.5l-22.2-22.2c-9.4-9.4-9.4-24.6 0-33.9L207 39c9.4-9.4 24.6-9.4 33.9 0l194.3 194.3c9.4 9.4 9.4 24.6 0 33.9L413 289.4c-9.5 9.5-25 9.3-34.3-.4L264 168.6V456c0 13.3-10.7 24-24 24h-32c-13.3 0-24-10.7-24-24V168.6L69.2 289.1c-9.3 9.8-24.8 10-34.3 .4z" />
          </svg>
        )}
      </Col> */}
      <Col className="single-transaction-recurrency-container">{transaction.transactionRecurrence}</Col>
    </Row>
  );
};

export default SingleTransaction;