import { ListGroup, Button } from "react-bootstrap";
import { PencilSquare, Trash } from "react-bootstrap-icons";

const SingleExpense = ({ transaction, onModify, onDelete }) => (
  <ListGroup.Item>
    {transaction.name}
    <span>{transaction.amount}</span>
    <Button variant="link" onClick={onModify}>
      <PencilSquare />
    </Button>
    <Button variant="link" onClick={onDelete}>
      <Trash />
    </Button>
  </ListGroup.Item>
);

export default SingleExpense;
