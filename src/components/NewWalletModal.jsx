import { Modal, Button, Form, Col, Row } from "react-bootstrap";

const NewWalletModal = ({
  show,
  handleClose,
  handleSubmit,
  showNamingOptionNewWallet,
  handlePersonal,
  handleShared,
  setName,
}) => (
  <Modal show={show} onHide={handleClose} centered>
    <Modal.Header closeButton>
      <Modal.Title>Modal heading</Modal.Title>
    </Modal.Header>
    <Row className="wallet-type-modal-container">
      {!showNamingOptionNewWallet ? (
        <>
          <Col className="wallet-type-modal" xs={5} onClick={handlePersonal}>
            Personal
          </Col>
          <Col className="wallet-type-modal" xs={5} onClick={handleShared}>
            Shared
          </Col>
        </>
      ) : (
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="newWalletName">
            <Form.Label>Wallet Name</Form.Label>
            <Form.Control type="name" placeholder="Enter wallet name" onChange={(e) => setName(e.target.value)} />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      )}
    </Row>
  </Modal>
);

export default NewWalletModal;
