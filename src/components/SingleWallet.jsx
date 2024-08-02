import { Container, Col, Button } from "react-bootstrap";

const SingleWallet = ({ wallet, onSelect, isSelected, onEdit }) => (
  <Col className={`wallet-preview ${isSelected ? "selected" : ""}`} onClick={onSelect}>
    <Container className="wallet-header-container">
      <p className="wallet-name">{wallet.name}</p>
      <Button
        variant="light"
        onClick={(e) => {
          e.stopPropagation();
          onEdit();
        }}
      >
        <i className="bi bi-pencil"></i>
      </Button>
      {/* <i className="bi bi-pencil wallet-mnodify-icon"></i> */}
    </Container>

    <Container className="wallet-balance-container">
      <p className="wallet-balance">&#8364;{wallet.balance.toFixed(2)}</p>
    </Container>
  </Col>
);

export default SingleWallet;
