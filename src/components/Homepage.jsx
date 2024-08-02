import { useEffect, useReducer, useState } from "react";
import { Button, Col, Container, Form, ListGroup, Modal, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  addNewPersonalWalletAction,
  addNewSharedWalletAction,
  addNewTransactionAction,
  deleteTransactionAction,
  fetchAllCategories,
  fetchSpecificWalletTransactionsActions,
  fetchUserInfo,
  // fetchUserSpecificWalletAction,
  fetchUserWallets,
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

  const [selectedWalletIndex, setSelectedWalletIndex] = useState(0);
  const [name, setName] = useState("");
  const [showNamingOptionNewWallet, setShowNamingOptionNewWallet] = useState(false);
  const [typeNewWalletShared, setTypeNewWalletShared] = useState(false);
  const [showNewTransactionModal, setShowNewTransactionModal] = useState(false);

  const wallets = useSelector((state) => state.user.user_wallets);
  const user_info = useSelector((state) => state.user.user_info);
  const selectedWallet = useSelector((state) => state.user.user_wallets[selectedWalletIndex]);
  const transactionCategories = useSelector((state) => state.transaction_categories);
  // const selectedWalletTransactions = useSelector((state) => state.user.user_wallets[selectedWalletIndex].transactions);

  const [incomeOptions, setIncomeOptions] = useState([]);
  const [outcomeOptions, setOutcomeOptions] = useState([]);

  const [showNewWalletCreationModal, setShowNewWalletCreationModal] = useState(false);

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

  // Modify an existing transaction
  // const handleModifyTransaction = (transactionId) => {
  // };

  // const settings = {
  //   dots: false,
  //   infinite: false,
  //   speed: 500,
  //   slidesToShow: 6,
  //   slidesToScroll: 3,
  //   initialSlide: 0,
  //   responsive: [
  //     {
  //       breakpoint: 1024,
  //       settings: {
  //         slidesToShow: 4,
  //         slidesToScroll: 4,
  //         infinite: true,
  //         dots: true,
  //       },
  //     },
  //     {
  //       breakpoint: 600,
  //       settings: {
  //         slidesToShow: 4,
  //         slidesToScroll: 4,
  //         initialSlide: 4,
  //       },
  //     },
  //     {
  //       breakpoint: 480,
  //       settings: {
  //         slidesToShow: 3,
  //         slidesToScroll: 3,
  //       },
  //     },
  //   ],
  // };

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
              />
            ))}
          {/* <Col className="wallet-preview-add" onClick={handleShowNewWalletModal}> */}
          <Button variant="primary" onClick={handleShowNewWalletModal} className="wallet-preview-button-add">
            <Container className="wallet-plus-container">
              <i className="bi bi-plus-lg"></i>
              <p className="wallet-plus-text">Add wallet</p>
            </Container>
          </Button>
          {/* <Modal className="new-wallet-modal-container" show={show} onHide={handleClose} centered>
              <Modal.Header>
                <div className="new-wallet-modal-title-subcontainer">
                  <p>Choose the wallet type</p>

                  <i className="bi bi-x-lg" onClick={handleClose}></i>
                </div>
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
            </Modal> */}

          {/* <Button type="text" onClick={()=>handleClickOnNewPersonalWalletModal}> bella</Button> */}

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
