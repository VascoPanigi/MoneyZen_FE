import { Card } from "react-bootstrap";

const BalancePreview = ({ TransactionType, balance, balanceChange, balanceVariation }) => {
  // console.log(TransactionType, balance);

  const balanceChangeClass = balanceChange < 0 ? "negative-balance" : "positive-balance";
  const totalBalanceVariationClass = balanceVariation < 0 ? "negative-balance" : "positive-balance";
  const formattedBalanceChange = balanceChange.toFixed(2);

  let keyword = "";
  // let lessMore = balanceChange < 0 ? "less" : "more";

  if (TransactionType === "Income") {
    keyword = "Gained";
  } else if (TransactionType === "Total") {
    keyword = "Total";
  } else {
    keyword = "Spent";
  }

  return (
    <Card className="balance-preview-container">
      <Card.Body className="balance-preview-body">
        <Card.Title className="balance-preview-type">{keyword}</Card.Title>
        <Card.Text className="balance-preview-balance">&#8364;{balance.toFixed(2)}</Card.Text>
      </Card.Body>
      {TransactionType === "Total" ? (
        <Card.Footer className="balance-preview-footer">
          {balanceVariation < 0 ? (
            <p>
              You lost{" "}
              <span className={`${totalBalanceVariationClass}`}>&#8364;{Math.abs(balanceVariation).toFixed(2)}</span>{" "}
              this month
            </p>
          ) : (
            <p>
              You&#8217;re up{" "}
              <span className={`${totalBalanceVariationClass}`}>&#8364;{balanceVariation.toFixed(2)}</span> this month
            </p>
          )}
        </Card.Footer>
      ) : (
        <Card.Footer className="balance-preview-footer">
          {TransactionType === "Income" ? (
            <p>
              You {keyword} <span className={`${balanceChangeClass}`}>{formattedBalanceChange}%</span> this month
            </p>
          ) : (
            <p>
              You {keyword} <span className={`${balanceChangeClass}`}>{formattedBalanceChange}%</span> this month
            </p>
          )}
        </Card.Footer>
      )}
    </Card>
  );
};

export default BalancePreview;
