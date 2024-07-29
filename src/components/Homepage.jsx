import { useEffect, useReducer, useState } from "react";
import { Button, Col, Container, ListGroup, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  addNewPersonalWalletAction,
  addNewSharedWalletAction,
  addNewTransactionAction,
  deleteTransactionAction,
  fetchAllCategories,
  fetchUserInfo,
  // fetchUserSpecificWalletAction,
  fetchUserWallets,
} from "../redux/actions";
import SingleWallet from "./SingleWallet";
import SingleExpense from "./SingleExpense";
import TransactionModal from "./TransactionModal";
import NewWalletModal from "./NewWalletModal";

const Homepage = () => {
  const token = localStorage.getItem("Bearer");
  const dispatch = useDispatch();

  const [ignored, forceUpdate] = useReducer((x) => x + 1, 0);

  const [selectedWalletIndex, setSelectedWalletIndex] = useState(0);
  const [name, setName] = useState("");
  const [showNamingOptionNewWallet, setShowNamingOptionNewWallet] = useState(false);
  const [typeNewWalletShared, setTypeNewWalletShared] = useState(false);
  const [showNewTransactionModal, setShowNewTransactionModal] = useState(false);

  const wallets = useSelector((state) => state.user.user_wallets);
  const selectedWallet = useSelector((state) => state.user.user_wallets[selectedWalletIndex]);
  const transactionCategories = useSelector((state) => state.transaction_categories);
  // const selectedWalletTransactions = useSelector((state) => state.user.user_wallets[selectedWalletIndex].transactions);

  const [incomeOptions, setIncomeOptions] = useState([]);
  const [outcomeOptions, setOutcomeOptions] = useState([]);

  const [show, setShow] = useState(false);

  useEffect(() => {
    dispatch(fetchUserInfo(token));
    dispatch(fetchUserWallets(token));
    dispatch(fetchAllCategories(token));
  }, []);

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

  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
    setShowNamingOptionNewWallet(false);
  };

  const handleCloseNewTransaction = () => setShowNewTransactionModal(false);
  const handleShowNewTransaction = () => setShowNewTransactionModal(true);

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
    setTypeNewWalletShared(false);
    setShowNamingOptionNewWallet(true);
  };
  const handleClickOnNewSharedWalletModal = () => {
    setTypeNewWalletShared(true);
    setShowNamingOptionNewWallet(true);
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

  // Modify an existing transaction
  // const handleModifyTransaction = (transactionId) => {
  // };

  return (
    <Container className="homepage-container">
      <Row>
        {wallets.length > 0 &&
          wallets.map((wallet, index) => (
            <SingleWallet key={wallet.id} wallet={wallet} onSelect={() => handleWalletSelection(index)} />
          ))}
        <Col>
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
        </Col>
      </Row>
      <Row>
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
      </Row>
    </Container>
  );
};

export default Homepage;
