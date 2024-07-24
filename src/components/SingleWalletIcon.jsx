import { Col } from "react-bootstrap";

const SingleWalletIcon = ({ wallet }) => {
  console.log(wallet);
  return (
    <Col className="wallet-preview">
      <h3>{wallet.name}</h3> <p>{wallet.balance}:-</p>
    </Col>
  );
};

export default SingleWalletIcon;
