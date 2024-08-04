import { Row, Col } from "react-bootstrap";
// import { PencilSquare, Trash } from "react-bootstrap-icons";
import { formatDateTime } from "../utils/utils";

const SingleTransaction = ({ transaction }) => {
  const formattedDate = formatDateTime(transaction.date);
  return (
    // <ListGroup.Item>
    //   {transaction.name}
    //   <span>{transaction.amount}</span>
    //   <Button variant="link">
    //     <PencilSquare />
    //   </Button>
    //   <Button variant="link" onClick={handleDelete}>
    //     <Trash />
    //   </Button>
    // </ListGroup.Item>

    <Row>
      <Col>{transaction.name}</Col>
      <Col>{transaction.amount.toFixed(2)}</Col>
      <Col>{formattedDate}</Col>
      <Col>{transaction.category.name}</Col>
      {/* <Col>Description</Col> */}
      <Col>{transaction.category.transactionType === "OUTCOME" ? "Expense" : "Income"}</Col>
      <Col>{transaction.transactionRecurrence}</Col>
    </Row>
  );
};

export default SingleTransaction;
