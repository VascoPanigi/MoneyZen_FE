import { Card, Col } from "react-bootstrap";

const BalancePreview = ({ TransactionType, balance, balanceChange }) => {
  console.log(TransactionType, balance);

  const balanceChangeClass = balanceChange < 0 ? "negative-balance" : "positive-balance";
  const formattedBalanceChange = balanceChange.toFixed(2);

  const changeText =
    balanceChange < 0
      ? `This wallet lost <span>${formattedBalanceChange}%</span>this month`
      : `This wallet gained ${formattedBalanceChange}% this month`;

  return (
    <Card className="balance-preview-container">
      <Card.Body>
        <Card.Title className="balance-preview-type">{TransactionType}</Card.Title>
        <Card.Text className="balance-preview-balance">{balance}</Card.Text>

        <Card.Text className={`balance-preview-footer ${balanceChangeClass}`}>{changeText}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default BalancePreview;
