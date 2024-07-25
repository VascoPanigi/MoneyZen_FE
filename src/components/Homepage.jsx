import { useEffect, useState } from "react";
import { Button, Col, Container, Form, ListGroup, Modal, Row } from "react-bootstrap";
import {
  addNewPersonalWalletAction,
  addNewSharedWalletAction,
  addNewTransactionAction,
  fetchAllCategories,
  fetchUserInfo,
  fetchUserWallets,
} from "../redux/actions";
import { useDispatch, useSelector } from "react-redux";

const Homepage = () => {
  const token = localStorage.getItem("Bearer");
  const dispatch = useDispatch();

  const [selectedWalletIndex, setSelectedWalletIndex] = useState(0);
  const [name, setName] = useState("");
  const [transactionName, setTransactionName] = useState("");
  const [transactionAmount, setTransactionAmount] = useState(null);
  const [showNamingOptionNewWallet, setShowNamingOptionNewWallet] = useState(false);
  const [typeNewWalletShared, setTypeNewWalletShared] = useState(false);
  const [showNewTransactionModal, setShowNewTransactionModal] = useState(false);
  const [transactionType, setTransactionType] = useState("Outcome");
  const [transactionCategory, setTransactionCategory] = useState("");
  const [transactionDescription, setTransactionDescription] = useState("");
  const [transactionRecurrence, setTransactionRecurrence] = useState("NONE");
  const [radio, setRadio] = useState(0);
  const [options, setOptions] = useState({});
  const [incomeOptions, setIncomeOptions] = useState([]);
  const [outcomeOptions, setOutcomeOptions] = useState([]);
  const [transactionDate, setTransactionDate] = useState(null);

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
  const transactionCategories = useSelector((state) => state.transaction_categories);
  // console.log(transactionCategories.categories);

  // console.log(wallets.length);

  useEffect(() => {
    console.log("sono nello useEffect, che sballo!");
    dispatch(fetchUserInfo(token));
    dispatch(fetchUserWallets(token));
    dispatch(fetchAllCategories(token));
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

  const handleTransactionTypeChange = (event) => {
    setTransactionType(event.target.value);
    console.log(transactionType);
  };

  const handleCategoryChange = (event) => {
    const selectedOption = event.target.options[event.target.selectedIndex];
    console.log(selectedOption.label);
    setTransactionCategory(selectedOption.label);
    // setTransactionCategory(event.target.value);
  };

  useEffect(() => {
    if (transactionCategories.categories.length > 0) {
      console.log("Initial radio value" + radio);
      // console.log("Initial options " + options);
      const incomeCategories = transactionCategories.categories.filter(
        (category) => category.transactionType === "INCOME"
      );
      // console.log(incomeCategories);
      setIncomeOptions(
        incomeCategories.map((category, index) => ({
          value: index + 1,
          label: category.name,
        }))
      );
      const outcomeCategories = transactionCategories.categories.filter(
        (category) => category.transactionType === "OUTCOME"
      );

      // console.log(outcomeCategories);
      setOutcomeOptions(
        outcomeCategories.map((category, index) => ({
          value: index + 1,
          label: category.name,
        }))
      );

      console.log(outcomeOptions);
      console.log(incomeOptions);
      // console.log(radio);
      // radio === 1 ? setOptions(outcomeOptions) : setOptions(incomeOptions);
      // console.log(options);
    }
  }, [transactionCategories]);

  useEffect(() => {
    if (radio === "2") {
      setOptions(incomeOptions);
    } else if (radio === "1") {
      setOptions(outcomeOptions);
    } else console.log("CAPITU CAPITU");
  }, [radio, incomeOptions, outcomeOptions]);

  function handleRadioButtonsChange(e) {
    // Grab the nodeName and value from
    // the clicked element
    const { nodeName, value } = e.target;

    // Because we're using event delegation (attaching
    // an event listener to a parent element and capturing
    // events from child elements as they "bubble up" the DOM)
    // we need to check to see if the clicked element is an input
    if (nodeName === "INPUT") {
      // Set the state with the input value
      setRadio(value);
      console.log(radio);
    }
  }

  const handleNewTransactionSubmit = (e) => {
    e.preventDefault();
    console.log("Creating a new transaction...");
    const transactionObject = {
      name: transactionName,
      amount: transactionAmount,
      categoryName: transactionCategory,
      description: transactionDescription,
      transactionRecurrence: transactionRecurrence,
      date: transactionDate,
    };

    console.log(transactionObject);

    const walletId = wallets[selectedWalletIndex].id;
    dispatch(addNewTransactionAction(transactionObject, walletId, token));
    dispatch(fetchUserWallets(token));
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
            <Button variant="primary" onClick={handleShowNewTransaction}>
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
                <Form onSubmit={handleNewTransactionSubmit}>
                  <Form.Group className="mb-3" controlId="newTransactionName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      required
                      type="name"
                      placeholder="Enter transaction name"
                      onChange={(e) => setTransactionName(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="transactionDescription">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={2}
                      value={transactionDescription}
                      onChange={(e) => setTransactionDescription(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="transactionAmount">
                    <Form.Label>Insert transaction amount </Form.Label>
                    <Form.Control
                      type="name"
                      placeholder="Enter wallet name"
                      onChange={(e) => setTransactionAmount(e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group required className="mb-3" onChange={handleRadioButtonsChange}>
                    <Form.Check
                      // defaultChecked={true}
                      type="radio"
                      label="Outcome"
                      name="group1"
                      value={1}

                      // onChange={handleTransactionTypeChange}
                      // checked={transactionType === "Outcome"}
                    />
                    <Form.Check
                      type="radio"
                      label="Income"
                      name="group1"
                      value={2}
                      // onChange={handleTransactionTypeChange}
                      // checked={transactionType === "Income"}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Category</Form.Label>

                    <Form.Select required aria-label="Select category" onChange={handleCategoryChange}>
                      {options.length > 0 &&
                        options.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      {/* <option>Open this select menu</option>
                      <option value="1">One</option>
                      <option value="2">Two</option>
                      <option value="3">Three</option> */}
                    </Form.Select>
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Control
                      required
                      type="datetime-local"
                      name="date"
                      placeholder="Date"
                      value={transactionDate}
                      onChange={(e) => setTransactionDate(e.target.value)}
                    ></Form.Control>
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
