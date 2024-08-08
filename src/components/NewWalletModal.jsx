import { Modal, Button, Form, Col, Row } from "react-bootstrap";

const NewWalletModal = ({
  show,
  handleClose,
  handleSubmit,
  showNamingOptionNewWallet,
  isChoosingSharedWalletOption,
  handlePersonal,
  handleShared,
  handleCreateNewSharedWallet,
  handleJoinSharedWallet,
  setName,
  joinSharedWallet,
  setWalletId,
}) => (
  <Modal show={show} onHide={handleClose} centered>
    <Modal.Header closeButton>
      {!showNamingOptionNewWallet && !isChoosingSharedWalletOption ? (
        <Modal.Title>Choose Wallet Type</Modal.Title>
      ) : isChoosingSharedWalletOption ? (
        <Modal.Title>Choose Shared Wallet Option</Modal.Title>
      ) : joinSharedWallet ? (
        <Modal.Title>Enter Wallet ID</Modal.Title>
      ) : (
        <Modal.Title>Choose a Name for Your Wallet</Modal.Title>
      )}
    </Modal.Header>
    <Row className="wallet-type-modal-container">
      {!showNamingOptionNewWallet && !isChoosingSharedWalletOption ? (
        <>
          <Col className="wallet-type-modal" xs={5}>
            <Button type="button" onClick={handlePersonal}>
              Personal
            </Button>
          </Col>
          <Col className="wallet-type-modal" xs={5}>
            <Button type="button" onClick={handleShared}>
              Shared
            </Button>
          </Col>
        </>
      ) : isChoosingSharedWalletOption ? (
        <>
          <Col className="wallet-type-modal" xs={5}>
            <Button type="button" onClick={handleCreateNewSharedWallet}>
              Create New Shared Wallet
            </Button>
          </Col>
          <Col className="wallet-type-modal" xs={5}>
            <Button type="button" onClick={handleJoinSharedWallet}>
              Join Shared Wallet
            </Button>
          </Col>
        </>
      ) : joinSharedWallet ? (
        <Form onSubmit={handleSubmit}>
          <Form.Group className="form-group-wallet-name" controlId="walletId">
            <Form.Label>Wallet ID</Form.Label>
            <Form.Control type="text" placeholder="Enter Wallet ID" onChange={(e) => setWalletId(e.target.value)} />
          </Form.Group>
          <div className="new-wallet-button-container">
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </div>
        </Form>
      ) : (
        <Form onSubmit={handleSubmit}>
          <Form.Group className="form-group-wallet-name" controlId="newWalletName">
            <Form.Label>Wallet Name</Form.Label>
            <Form.Control type="text" placeholder="Enter wallet name" onChange={(e) => setName(e.target.value)} />
          </Form.Group>
          <div className="new-wallet-button-container">
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </div>
        </Form>
      )}
    </Row>
  </Modal>
);

export default NewWalletModal;
