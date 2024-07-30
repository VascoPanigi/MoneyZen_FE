import { Col } from "react-bootstrap";

const BalancePreview = ({ TransactionType, amount }) => {
  console.log(TransactionType, amount);
  return (
    <div className="balance-preview-container">
      <p className="balance-preview-type">{TransactionType}</p>

      <h3 className="balance-preview-amount">{amount}</h3>

      <p className="balance-preview-footer">This wallet made an extra N dollars this month </p>
    </div>
  );
};

export default BalancePreview;
