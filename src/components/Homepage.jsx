import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Form, Modal, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  addNewPersonalWalletAction,
  addNewSharedWalletAction,
  addNewTransactionAction,
  addUserToSharedWallet,
  deleteWalletAction,
  fetchAllCategories,
  fetchSpecificWalletTransactionsActions,
  fetchUserInfo,
  // fetchUserSpecificWalletAction,
  fetchUserWallets,
  setSelectedWalletIdAction,
  updateWalletAction,
} from "../redux/actions";
import SingleWallet from "./SingleWallet";
import TransactionModal from "./TransactionModal";
import NewWalletModal from "./NewWalletModal";
import BalancePreview from "./BalancePreview";
import { LargeChart } from "./LargeChart";
import LastTransactionsSection from "./LastTransactionsSection";
import moment from "moment";
import { groupTransactionsByMonth, calculateMonthlyTotals } from "../utils/utils";
import { useNavigate } from "react-router-dom";
import { BarChartHome } from "./BarChartHome";
import { PieChartHome } from "./PieChartHome";

const Homepage = () => {
  const token = localStorage.getItem("Bearer");
  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  const wallets = useSelector((state) => state.wallets.user_wallets);
  const user_info = useSelector((state) => state.user.user_info);
  const selectedWallet = useSelector((state) => state.wallets.user_wallets[selectedWalletIndex]);
  const transactionCategories = useSelector((state) => state.transaction_categories);
  const selectedWalletTransactions = useSelector((state) => state.transactions.wallet_transactions.content);

  const [joinSharedWallet, setJoinSharedWallet] = useState(false);
  const [walletId, setWalletId] = useState("");
  const [isChoosingSharedWalletOption, setIsChoosingSharedWalletOption] = useState(false);
  const [notification, setNotification] = useState("");

  useEffect(() => {
    dispatch(fetchUserInfo(token));
    dispatch(fetchUserWallets(token));
    dispatch(fetchAllCategories(token));
  }, []);

  useEffect(() => {
    if (wallets.length > 0 && selectedWalletIndex < wallets.length) {
      dispatch(fetchSpecificWalletTransactionsActions(wallets[selectedWalletIndex].id, token));
      // dispatch(setSelectedWalletIdAction(wallets[selectedWalletIndex].id, dispatch));
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
    handleNewWalletTypeVariance(false);
    setJoinSharedWallet(false);
    setWalletId("");
    setIsChoosingSharedWalletOption(false);
  };
  const handleShowNewWalletModal = () => {
    console.log("this is the type on show" + typeNewWalletShared);
    setShowNewWalletCreationModal(true);
    setShowNamingOptionNewWallet(false);
  };

  const handleCloseNewTransaction = () => setShowNewTransactionModal(false);
  const handleShowNewTransaction = () => setShowNewTransactionModal(true);

  const handleWalletSelection = (index) => {
    setSelectedWalletIndex(index);
    dispatch(setSelectedWalletIdAction(wallets[index].id));
  };

  const handleNewWalletTypeVariance = (value) => {
    setJoinSharedWallet(false); // Reset join state whenever switching wallet types
    setTypeNewWalletShared(value);
  };

  const handleJoinSharedWallet = () => {
    setIsChoosingSharedWalletOption(false);
    setShowNamingOptionNewWallet(true);
    setJoinSharedWallet(true);
  };

  useEffect(() => {
    console.log(joinSharedWallet);
  }, [joinSharedWallet]);

  const handleClickOnNewPersonalWalletModal = () => {
    setIsChoosingSharedWalletOption(false);
    setShowNamingOptionNewWallet(true);
  };
  const handleClickOnNewSharedWalletModal = () => {
    handleNewWalletTypeVariance(true);
    setShowNamingOptionNewWallet(false);
    setIsChoosingSharedWalletOption(true);
  };

  const handleCreateNewSharedWallet = () => {
    setIsChoosingSharedWalletOption(false);
    setShowNamingOptionNewWallet(true);
  };

  // this useEffect is needed to update the state and send the right newWalletObject
  useEffect(() => {
    console.log(typeNewWalletShared);
  }, [typeNewWalletShared]);

  const handleNewWalletCreation = (e) => {
    e.preventDefault();
    if (typeNewWalletShared && joinSharedWallet) {
      const walletObj = { walletId: walletId };
      dispatch(addUserToSharedWallet(token, walletObj));
    } else {
      const walletObject = { name: name };
      if (typeNewWalletShared) {
        dispatch(addNewSharedWalletAction(walletObject, token));
      } else {
        dispatch(addNewPersonalWalletAction(walletObject, token));
      }
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
    setShowNewTransactionModal(false);
    setNotification("Transaction successfully added");
    setTimeout(() => {
      setNotification("");
    }, 1500);
  };

  // useEffect(() => {
  //   setTimeout(setNotification(""), 3000);
  // }, [notification]);

  const handleEditWalletClick = (index) => {
    setEditWalletIndex(index);
    setEditWalletName(wallets[index].name);
    setShowEditWalletModal(true);
  };

  const handleCloseEditWalletModal = () => {
    setShowEditWalletModal(false);
    setEditWalletName("");
    setEditWalletIndex(null);
  };

  const handleEditWalletSubmit = (e) => {
    e.preventDefault();
    const walletId = wallets[editWalletIndex].id;
    const updatedWallet = {
      name: editWalletName,
    };
    dispatch(updateWalletAction(updatedWallet, walletId, token));
    handleCloseEditWalletModal();
  };

  const handleDeleteWallet = () => {
    const walletId = wallets[editWalletIndex].id;
    dispatch(deleteWalletAction(walletId, token));
    handleCloseEditWalletModal();
  };

  // -----------------------------------------TRANSACTIONS ANALYSIS----------------------------------------------

  // Transactions analysis
  let currentIncome = 0;
  let currentOutcome = 0;
  let incomeChange = 0;
  let outcomeChange = 0;
  let totalBalanceChangeLastMonthInCurrency = 0;

  if (selectedWalletTransactions && selectedWalletTransactions.length > 0) {
    const groupedTransactions = groupTransactionsByMonth(selectedWalletTransactions);
    const monthlyTotals = calculateMonthlyTotals(groupedTransactions);

    const currentMonth = moment().format("YYYY-MM");
    const previousMonth = moment().subtract(1, "months").format("YYYY-MM");

    currentIncome = monthlyTotals[currentMonth]?.income || 0;
    const previousIncome = monthlyTotals[previousMonth]?.income || 0;
    currentOutcome = monthlyTotals[currentMonth]?.outcome || 0;
    const previousOutcome = monthlyTotals[previousMonth]?.outcome || 0;

    incomeChange = ((currentIncome - previousIncome) / (previousIncome || 1)) * 100;
    outcomeChange = ((currentOutcome - previousOutcome) / (previousOutcome || 1)) * 100;

    totalBalanceChangeLastMonthInCurrency = currentIncome - currentOutcome;
  } else {
    console.log("No transactions detected");
  }

  // Handle redirect on transactions page
  const handleCLickOnTransactionPage = () => {
    navigate("/transactions");
  };

  const handleCloseNotification = () => {
    setNotification("");
  };

  // ----------------------------------------------------CHART LOGIC--------------------------------------------------------------

  return (
    <Container className="homepage-container margin-right-navbar-open">
      <Row className="homepage-greeting-container">
        {user_info && (
          <>
            <h1 className="homepage-greeting">
              Hello, <span className="homepage-greeting-name">{user_info.name}</span>!
            </h1>
            {wallets.length > 0 ? (
              <p className="homepage-greating-paragraph">Choose a wallet and start managing your expenses</p>
            ) : (
              <p className="homepage-greating-paragraph">Welcome in MoneyZen</p>
            )}
          </>
        )}
      </Row>
      {wallets.length > 0 ? (
        <>
          <Row className="wallets-preview-container">
            <h5>Your wallets</h5>
            <div className="wallets-scroll-container">
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
              <Button variant="primary" onClick={handleShowNewWalletModal} className="wallet-preview-button-add">
                <Container className="wallet-plus-container">
                  <i className="bi bi-plus-lg"></i>
                  <p className="wallet-plus-text">Add wallet</p>
                </Container>
              </Button>
            </div>
          </Row>

          <Row className="homepage-body-container">
            {selectedWallet && (
              <>
                <Col lg={{ span: 7, order: 1 }}>
                  <Row>
                    <h3>Current month statistics</h3>
                    <Col>
                      <BalancePreview
                        TransactionType={"Income"}
                        balance={currentIncome}
                        balanceChange={incomeChange}
                        balanceVariation={totalBalanceChangeLastMonthInCurrency}
                      />
                    </Col>
                    <Col>
                      <BalancePreview
                        TransactionType={"Expense"}
                        balance={currentOutcome}
                        balanceChange={outcomeChange}
                        balanceVariation={totalBalanceChangeLastMonthInCurrency}
                      />
                    </Col>
                    <Col>
                      <BalancePreview
                        TransactionType={"Total"}
                        balance={selectedWallet.balance}
                        balanceChange={0}
                        balanceVariation={totalBalanceChangeLastMonthInCurrency}
                      />
                    </Col>
                  </Row>
                  {selectedWalletTransactions && selectedWalletTransactions.length > 0 && (
                    <Row>
                      <Col sm={12} lg={6}>
                        <PieChartHome transactions={selectedWalletTransactions} type={"INCOME"} />
                      </Col>
                      <Col sm={12} lg={6}>
                        <PieChartHome transactions={selectedWalletTransactions} type={"OUTCOME"} />
                      </Col>
                    </Row>
                  )}
                </Col>
                <Col lg={{ span: 5, order: 2 }}>
                  <Container className="last-transactionms-title-container">
                    <h3>Last transactions</h3>
                    <Button variant="primary" onClick={handleShowNewTransaction} className="new-transaction-button">
                      New Transaction
                    </Button>
                  </Container>

                  <Container className="last-transactionms-section-container">
                    <Card className="last-transactionms-section-container ">
                      <Row className="last-transactionms-section-single-transaction-legenda-container">
                        <Col>Name</Col>
                        <Col>Amount</Col>
                        <Col>Date</Col>
                        <Col>Category</Col>
                      </Row>
                      {selectedWalletTransactions && selectedWalletTransactions.length > 0 ? (
                        selectedWalletTransactions
                          .slice(0, 5)
                          .map((transaction) => (
                            <LastTransactionsSection transaction={transaction} key={transaction.id} />
                          ))
                      ) : (
                        <div className="d-flex align-items-center justify-content-center my-2">
                          <p>No transactions in your history</p>
                        </div>
                      )}
                      {selectedWalletTransactions && selectedWalletTransactions.length > 0 && (
                        <Row
                          className="last-transactionms-section-footer-redirect "
                          onClick={handleCLickOnTransactionPage}
                        >
                          <p>Click here to see all your transactions</p>
                        </Row>
                      )}
                    </Card>
                  </Container>
                </Col>
              </>
            )}
          </Row>

          {selectedWallet && selectedWalletTransactions && selectedWalletTransactions.length > 0 ? (
            <>
              <Row>
                <Col className="homepage-large-charts-container">
                  <LargeChart transactions={selectedWalletTransactions} balance={selectedWallet.balance} />
                </Col>
              </Row>
              <Row>
                <Col className="homepage-large-charts-container">
                  <BarChartHome transactions={selectedWalletTransactions} />
                </Col>
              </Row>{" "}
            </>
          ) : (
            <></>
          )}
        </>
      ) : (
        <Container className="homepage-no-wallets-container">
          <h1>Create your first wallet!</h1>
          <Button
            variant="primary"
            onClick={handleShowNewWalletModal}
            className="wallet-preview-button-add-homepage-no-wallets"
          >
            <Container className="wallet-plus-container ">
              <i className="bi bi-plus-lg"></i>
              <p className="wallet-plus-text">Add wallet</p>
            </Container>
          </Button>
        </Container>
      )}
      <TransactionModal
        show={showNewTransactionModal}
        handleClose={handleCloseNewTransaction}
        handleSubmit={handleNewTransactionSubmit}
        incomeOptions={incomeOptions}
        outcomeOptions={outcomeOptions}
      />

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
            <Button variant="secondary" type="submit">
              Save Changes
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

      {notification && (
        <Modal show={true} onHide={handleCloseNotification} centered>
          <Modal.Body>{notification}</Modal.Body>
        </Modal>
      )}

      <NewWalletModal
        show={showNewWalletCreationModal}
        handleClose={handleCloseNewWalletModal}
        handleSubmit={handleNewWalletCreation}
        showNamingOptionNewWallet={showNamingOptionNewWallet}
        isChoosingSharedWalletOption={isChoosingSharedWalletOption}
        handlePersonal={handleClickOnNewPersonalWalletModal}
        handleShared={handleClickOnNewSharedWalletModal}
        handleCreateNewSharedWallet={handleCreateNewSharedWallet}
        handleJoinSharedWallet={handleJoinSharedWallet}
        setName={setName}
        setWalletId={setWalletId}
        joinSharedWallet={joinSharedWallet}
      />
    </Container>
  );
};

export default Homepage;
