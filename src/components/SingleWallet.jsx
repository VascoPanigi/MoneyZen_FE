import { Container, Col } from "react-bootstrap";

const SingleWallet = ({ wallet, onSelect }) => (
  <Col className="wallet-preview" onClick={onSelect}>
    <Container className="wallet-header-container">
      <p className="wallet-name">{wallet.name}</p>
      <i className="bi bi-pencil wallet-mnodify-icon"></i>
    </Container>

    <Container className="wallet-balance-container">
      <p className="wallet-balance">&#8364;{wallet.balance}</p>
    </Container>
  </Col>
);

export default SingleWallet;
