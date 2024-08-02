import { useEffect, useReducer, useState } from "react";
import { Button, Col, Container, Form, ListGroup, Modal, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  addNewPersonalWalletAction,
  addNewSharedWalletAction,
  addNewTransactionAction,
  deleteTransactionAction,
  deleteWalletAction,
  fetchAllCategories,
  fetchSpecificWalletTransactionsActions,
  fetchUserInfo,
  // fetchUserSpecificWalletAction,
  fetchUserWallets,
  updateWalletAction,
} from "../redux/actions";
import SingleWallet from "./SingleWallet";
import SingleExpense from "./SingleExpense";
import TransactionModal from "./TransactionModal";
import NewWalletModal from "./NewWalletModal";
import Slider from "react-slick";
import BalancePreview from "./BalancePreview";
import { LargeChart } from "./LargeChart";

const Homepage = () => {
  const token = localStorage.getItem("Bearer");
  const dispatch = useDispatch();

  // State for wallet
  const [name, setName] = useState("");
  const [selectedWalletIndex, setSelectedWalletIndex] = useState(0);
  const [showNamingOptionNewWallet, setShowNamingOptionNewWallet] = useState(false);
  const [typeNewWalletShared, setTypeNewWalletShared] = useState(false);
  const [showNewWalletCreationModal, setShowNewWalletCreationModal] = useState(false);

  // State for edit wallet modal
  const [showEditWalletModal, setShowEditWalletModal] = useState(false);
  const [editWalletName, setEditWalletName] = useState("");
  const [editWalletIndex, setEditWalletIndex] = useState(null);

  // State for transactions
  const [incomeOptions, setIncomeOptions] = useState([]);
  const [outcomeOptions, setOutcomeOptions] = useState([]);
  const [showNewTransactionModal, setShowNewTransactionModal] = useState(false);

  const wallets = useSelector((state) => state.user.user_wallets);
  const user_info = useSelector((state) => state.user.user_info);
  const selectedWallet = useSelector((state) => state.user.user_wallets[selectedWalletIndex]);
  const transactionCategories = useSelector((state) => state.transaction_categories);
  // const selectedWalletTransactions = useSelector((state) => state.user.user_wallets[selectedWalletIndex].transactions);

  useEffect(() => {
    dispatch(fetchUserInfo(token));
    dispatch(fetchUserWallets(token));
    dispatch(fetchAllCategories(token));
  }, []);

  useEffect(() => {
    if (wallets.length > 0 && selectedWalletIndex < wallets.length) {
      dispatch(fetchSpecificWalletTransactionsActions(wallets[selectedWalletIndex].id, token));
    }
  }, [wallets, selectedWalletIndex]);

  useEffect(() => {
    if (transactionCategories.categories.length > 0) {
      const incomeCategories = transactionCategories.categories.filter(
        (category) => category.transactionType === "INCOME"
      );
      setIncomeOptions(
        incomeCategories.map((category, index) => ({
          value: index + 1,
          label: category.name,
        }))
      );
      const outcomeCategories = transactionCategories.categories.filter(
        (category) => category.transactionType === "OUTCOME"
      );
      setOutcomeOptions(
        outcomeCategories.map((category, index) => ({
          value: index + 1,
          label: category.name,
        }))
      );
    }
  }, [transactionCategories]);

  const handleCloseNewWalletModal = () => {
    setShowNewWalletCreationModal(false);
    // setTypeNewWalletShared(false);
    handleNewWalletTypeVariance(false);

    // setShowNamingOptionNewWallet(false);
  };
  const handleShowNewWalletModal = () => {
    console.log("this is the type on show" + typeNewWalletShared);
    setShowNewWalletCreationModal(true);
    setShowNamingOptionNewWallet(false);
    // setTypeNewWalletShared(false);
  };

  const handleCloseNewTransaction = () => setShowNewTransactionModal(false);
  const handleShowNewTransaction = () => setShowNewTransactionModal(true);

  const handleWalletSelection = (index) => {
    setSelectedWalletIndex(index);
  };

  const handleNewWalletTypeVariance = (value) => {
    switch (value) {
      case true:
        setTypeNewWalletShared(true);
        break;
      case false:
        setTypeNewWalletShared(false);
        break;
      default:
        console.log("An error occured during state change.");
    }
  };

  const handleClickOnNewPersonalWalletModal = () => {
    handleNewWalletTypeVariance(false);
    setShowNamingOptionNewWallet(true);
  };
  const handleClickOnNewSharedWalletModal = () => {
    setShowNamingOptionNewWallet(true);
    handleNewWalletTypeVariance(true);
  };

  // this useEffect is needed to update the state and send the right newWalletObject
  useEffect(() => {
    console.log(typeNewWalletShared);
  }, [typeNewWalletShared]);

  // New wallet creation
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
    handleCloseNewWalletModal();
  };
  // -----------------------------------------TRANSACTIONS CRUD----------------------------------------------

  // new transaction creation
  const handleNewTransactionSubmit = (
    e,
    transactionName,
    transactionAmount,
    transactionCategory,
    transactionDescription,
    transactionRecurrence,
    transactionDate
  ) => {
    e.preventDefault();
    const transactionObject = {
      name: transactionName,
      amount: transactionAmount,
      categoryName: transactionCategory,
      description: transactionDescription,
      transactionRecurrence: transactionRecurrence,
      date: transactionDate,
    };

    const walletId = wallets[selectedWalletIndex].id;
    dispatch(addNewTransactionAction(transactionObject, walletId, token));
    dispatch(fetchUserWallets(token));
  };

  // Delete an existing transaction
  const handleDeleteTransaction = (transactionId) => {
    dispatch(deleteTransactionAction(transactionId, selectedWallet.id, token));
  };

  const handleEditWalletClick = (index) => {
    setEditWalletIndex(index);
    setEditWalletName(wallets[index].name);
    setShowEditWalletModal(true);
    console.log("porcaccia la madonnaccia");
  };

  const handleCloseEditWalletModal = () => {
    setShowEditWalletModal(false);
    setEditWalletName("");
    setEditWalletIndex(null);
  };

  const handleEditWalletSubmit = (e) => {
    e.preventDefault();
    console.log("sto modificando il wallettozzo diddio");
    const walletId = wallets[editWalletIndex].id;
    const updatedWallet = {
      name: editWalletName,
    };
    dispatch(updateWalletAction(updatedWallet, walletId, token));
    handleCloseEditWalletModal();
  };

  const handleDeleteWallet = () => {
    console.log("sto eliminando il wallettozzo noooooooooooooooooooooooo");

    const walletId = wallets[editWalletIndex].id;
    dispatch(deleteWalletAction(walletId, token));
    handleCloseEditWalletModal();
  };

  return (
    <Container className="homepage-container margin-right-navbar-open">
      <Row className="homepage-greeting-container">
        {user_info && (
          <>
            <h1 className="homepage-greeting">
              Hello, <span className="homepage-greeting-name">{user_info.name}</span>!
            </h1>
            <p className="homepage-greating-paragraph">Choose a wallet and start managing your expenses</p>
          </>
        )}
      </Row>
      <Row className="wallets-preview-container">
        <div className="wallets-scroll-container">
          {/* <div className="slider-container">
          <Slider {...settings}> */}
          {wallets.length > 0 &&
            wallets.map((wallet, index) => (
              <SingleWallet
                key={wallet.id}
                wallet={wallet}
                isSelected={index === selectedWalletIndex}
                onSelect={() => handleWalletSelection(index)}
                onEdit={() => handleEditWalletClick(index)}
              />
            ))}
          {/* <Col className="wallet-preview-add" onClick={handleShowNewWalletModal}> */}
          <Button variant="primary" onClick={handleShowNewWalletModal} className="wallet-preview-button-add">
            <Container className="wallet-plus-container">
              <i className="bi bi-plus-lg"></i>
              <p className="wallet-plus-text">Add wallet</p>
            </Container>
          </Button>
          <NewWalletModal
            show={showNewWalletCreationModal}
            handleClose={handleCloseNewWalletModal}
            handleSubmit={handleNewWalletCreation}
            showNamingOptionNewWallet={showNamingOptionNewWallet}
            handlePersonal={handleClickOnNewPersonalWalletModal}
            handleShared={handleClickOnNewSharedWalletModal}
            setName={setName}
          />
          {/* </Col> */}
        </div>
      </Row>
      <Modal show={showEditWalletModal} onHide={handleCloseEditWalletModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit Wallet</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleEditWalletSubmit}>
          <Modal.Body>
            <Form.Group controlId="formWalletName">
              <Form.Label>Wallet Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter wallet name"
                value={editWalletName}
                onChange={(e) => setEditWalletName(e.target.value)}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={handleDeleteWallet}>
              Delete Wallet
            </Button>
            <Button variant="primary" type="submit">
              Save Changes
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
      {/* </Slider>
        </div> */}
      {/* <Col>
          <Button variant="primary" onClick={handleShow}>
            +
          </Button>
          <NewWalletModal
            show={show}
            handleClose={handleClose}
            handleSubmit={handleNewWalletCreation}
            showNamingOptionNewWallet={showNamingOptionNewWallet}
            handlePersonal={handleClickOnNewPersonalWalletModal}
            handleShared={handleClickOnNewSharedWalletModal}
            setName={setName}
          />
        </Col> */}
      {/* </Row>
      <h2>Create a new transaction</h2>
      <h3>{selectedWallet.name}</h3>
      <Button variant="primary" onClick={handleShowNewTransaction}>
        New Transaction
      </Button>
      <TransactionModal
        show={showNewTransactionModal}
        handleClose={handleCloseNewTransaction}
        handleSubmit={handleNewTransactionSubmit}
        categories={transactionCategories}
        incomeOptions={incomeOptions}
        outcomeOptions={outcomeOptions}
      /> */}
      {/* <Row className="homepage-body-container">
        {selectedWallet && (
          <>
            <Col lg={{ span: 6, order: 1 }}>
              <BalancePreview TransactionType={"income"} balance={selectedWallet.balance} />
            </Col>
            <Col lg={{ span: 6, order: 2 }}>
              <BalancePreview TransactionType={"income"} balance={selectedWallet.balance} />
            </Col>
            <Col lg={{ span: 12, order: 2 }}>
              <LargeChart />
            </Col>
          </>
        )}
      </Row>*/}
      {/* <Row>
        {selectedWallet && (
          <Col className="new-transaction-container">
            <h2>Create a new transaction</h2>
            <h3>{selectedWallet.name}</h3>
            <Button variant="primary" onClick={handleShowNewTransaction}>
              New Transaction
            </Button>
            <TransactionModal
              show={showNewTransactionModal}
              handleClose={handleCloseNewTransaction}
              handleSubmit={handleNewTransactionSubmit}
              categories={transactionCategories}
              incomeOptions={incomeOptions}
              outcomeOptions={outcomeOptions}
            />
            <p>Balance: {selectedWallet.balance}:-</p>
            <ListGroup>
              {selectedWallet.transactions.length > 0 ? (
                selectedWallet.transactions.map((transaction) => (
                  <SingleExpense
                    key={transaction.id}
                    transaction={transaction}
                    // onModify={() => handleModify(transaction.id)}
                    handleDelete={() => handleDeleteTransaction(transaction.id)}
                  />
                ))
              ) : (
                <h3>There are no transactions yet!</h3>
              )}
            </ListGroup>
          </Col>
        )}
      </Row> */}
    </Container>
  );
};

export default Homepage;
