import { useEffect, useState } from "react";
import { Button, Col, Container, Form, ListGroup, Modal, Row } from "react-bootstrap";
import {
  addNewPersonalWalletAction,
  addNewSharedWalletAction,
  fetchUserInfo,
  fetchUserWallets,
} from "../redux/actions";
import { useDispatch, useSelector } from "react-redux";

const Homepage = () => {
  const token = localStorage.getItem("Bearer");
  const dispatch = useDispatch();

  const [selectedWalletIndex, setSelectedWalletIndex] = useState(0);
  const [name, setName] = useState("");
  const [showNamingOptionNewWallet, setShowNamingOptionNewWallet] = useState(false);
  const [typeNewWalletShared, setTypeNewWalletShared] = useState(false);
  const [showNewTransactionModal, setShowNewTransactionModal] = useState(false);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
    setShowNamingOptionNewWallet(false);
  };

  const handleCloseNewTransaction = () => setShowNewTransactionModal(false);
  const handleShowNewTransaction = () => setShowNewTransactionModal(true);

  const wallets = useSelector((state) => state.user.user_wallets);
  const selectedWallet = useSelector((state) => state.user.user_wallets[selectedWalletIndex]);
  // const selectedWalletTransactions = selectedWallet.transactions;

  // console.log(wallets.length);

  useEffect(() => {
    console.log("sono nello useEffect, che sballo!");
    dispatch(fetchUserInfo(token));
    dispatch(fetchUserWallets(token));
  }, []);

  // useEffect(() => {
  //   console.log("User wallets changed!");
  //   dispatch(fetchUserWallets(token));
  // }, [wallets]);

  const handleNewWalletCreation = (e) => {
    e.preventDefault();
    const walletObject = {
      name: name,
    };
    if (typeNewWalletShared) {
      dispatch(addNewSharedWalletAction(walletObject, token));
    } else {
      dispatch(addNewPersonalWalletAction(walletObject, token));
    }
  };

  const handleWalletSelection = (index) => {
    setSelectedWalletIndex(index);
  };

  const handleClickOnNewPersonalWalletModal = () => {
    console.log(showNamingOptionNewWallet);
    setTypeNewWalletShared(false);
    setShowNamingOptionNewWallet(true);
    console.log(showNamingOptionNewWallet);
  };
  const handleClickOnNewSharedWalletModal = () => {
    console.log(showNamingOptionNewWallet);
    setTypeNewWalletShared(true);
    setShowNamingOptionNewWallet(true);
    console.log(showNamingOptionNewWallet);
  };

  return (
    <Container className="homepage-container">
      <Row>
        {wallets.length > 0 &&
          wallets.map((wallet, index) => (
            <Col className="wallet-preview" key={wallet.id} onClick={() => handleWalletSelection(index)}>
              <Container>
                <h3>{wallet.name}</h3>
              </Container>
              <Container>
                <p>{wallet.balance}:-</p>
              </Container>
            </Col>
          ))}
        <>
          <Col>
            <Button variant="primary" onClick={handleShow}>
              +
            </Button>
            <Modal className="new-wallet-modal-container" show={show} onHide={handleClose} centered>
              <Modal.Header closeButton>
                <Modal.Title>Modal heading</Modal.Title>
              </Modal.Header>
              <Row className="wallet-type-modal-container">
                {!showNamingOptionNewWallet ? (
                  <>
                    <Col className="wallet-type-modal" xs={5} onClick={() => handleClickOnNewPersonalWalletModal()}>
                      Personal
                    </Col>
                    <Col className="wallet-type-modal" xs={5} onClick={() => handleClickOnNewSharedWalletModal()}>
                      Shared
                    </Col>
                  </>
                ) : (
                  <Form onSubmit={handleNewWalletCreation}>
                    <Form.Group className="mb-3" controlId="newWalletName">
                      <Form.Label>Wallet Name</Form.Label>
                      <Form.Control
                        type="name"
                        placeholder="Enter wallet name"
                        onChange={(e) => setName(e.target.value)}
                      />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                      Submit
                    </Button>
                  </Form>
                )}
              </Row>
            </Modal>
          </Col>
        </>
      </Row>
      <Row>
        {selectedWallet && (
          <Col className="new-transaction-container">
            <h2>Create a new transaction</h2>
            <h3>{selectedWallet.name}</h3>
            <Button variant="primary" onClick={() => handleShowNewTransaction}>
              New Transaction
            </Button>
            <Modal
              className="new-wallet-modal-container"
              show={showNewTransactionModal}
              onHide={handleCloseNewTransaction}
              centered
            >
              <Modal.Header closeButton>
                <Modal.Title>New Transaction</Modal.Title>
              </Modal.Header>
              <Row className="new-transaction-form-container">
                <Form>
                  <Form.Group className="mb-3" controlId="newWalletName">
                    <Form.Label>Wallet Name</Form.Label>
                    <Form.Control
                      type="name"
                      placeholder="Enter wallet name"
                      onChange={(e) => setName(e.target.value)}
                    />
                  </Form.Group>
                  <Button variant="primary" type="submit">
                    Submit
                  </Button>
                </Form>
              </Row>
            </Modal>
            <p>Balance: {selectedWallet.balance}:-</p>
            <ListGroup>
              {selectedWallet.transactions.length > 0 ? (
                selectedWallet.transactions.map((transaction) => (
                  <ListGroup.Item key={transaction.id}>
                    {transaction.name}
                    <span>{transaction.amount}</span>
                  </ListGroup.Item>
                ))
              ) : (
                <h3>There are no transactions yet!</h3>
              )}
            </ListGroup>
          </Col>
        )}
      </Row>
    </Container>
  );
};

export default Homepage;
