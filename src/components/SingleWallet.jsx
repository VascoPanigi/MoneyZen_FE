import { Container, Col } from "react-bootstrap";

const SingleWallet = ({ wallet, onSelect }) => (
  <Col className="wallet-preview" onClick={onSelect}>
    <Container>
      <h3>{wallet.name}</h3>
    </Container>
    <Container>
      <p>{wallet.balance}:-</p>
    </Container>
  </Col>
);

export default SingleWallet;
