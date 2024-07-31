import { Card, Col } from "react-bootstrap";

const BalancePreview = ({ TransactionType, balance }) => {
  console.log(TransactionType, balance);
  return (
    <Card className="balance-preview-container">
      <Card.Body>
        <Card.Title className="balance-preview-type">{TransactionType}</Card.Title>
        <Card.Text className="balance-preview-balance">{balance}</Card.Text>
        <Card.Text className="balance-preview-footer">This wallet made an extra N dollars this month</Card.Text>
      </Card.Body>
    </Card>
    // <div className="balance-preview-container">
    //   <p className="balance-preview-type">{TransactionType}</p>

    //   <h3 className="balance-preview-amount">{amount}</h3>

    //   <p className="balance-preview-footer">This wallet made an extra N dollars this month </p>
    // </div>
  );
};

export default BalancePreview;
