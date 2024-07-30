import { Container, Col } from "react-bootstrap";

const SingleWallet = ({ wallet, onSelect }) => (
  <Col className="wallet-preview" onClick={onSelect}>
    <Container className="wallet-name-container">
      <h3 className="wallet-name">{wallet.name}</h3>
    </Container>
    {/* <Container className="wallet-balance-container">
      <p className="wallet-balance">{wallet.balance}:-</p>
    </Container> */}
  </Col>
);

export default SingleWallet;
