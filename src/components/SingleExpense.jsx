import { ListGroup, Button } from "react-bootstrap";
import { PencilSquare, Trash } from "react-bootstrap-icons";

const SingleExpense = ({ transaction, handleDelete, handleModify }) => {
  return (
    <ListGroup.Item>
      {transaction.name}
      <span>{transaction.amount}</span>
      <Button variant="link">
        <PencilSquare />
      </Button>
      <Button variant="link" onClick={handleDelete}>
        <Trash />
      </Button>
    </ListGroup.Item>
  );
};

export default SingleExpense;
