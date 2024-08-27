import { Button, Col, Container, Form, Modal, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import SingleTransaction from "./SingleTransaction";
import { useEffect, useState } from "react";
import {
  deleteTransactionAction,
  fetchAllCategories,
  fetchFilteredTransactions,
  fetchSpecificWalletTransactionsActions,
  fetchSpecificWalletTransactionsByNameActions,
  getTransactionId,
  modifyTransactionAction,
} from "../redux/actions";
import FilterForm from "./FilterForm";
import { formatDateTimeLocal } from "../utils/utils";

const TransactionPage = () => {
  const token = localStorage.getItem("Bearer");
  const dispatch = useDispatch();
  const selectedWalletTransactions = useSelector((state) => state.transactions.wallet_transactions.content);
  const selectedWalletId = useSelector((state) => state.wallets.selected_wallet_id);
  const selectedTransactionId = useSelector((state) => state.transactions.selected_transaction_id);

  const [pageNum, setPageNum] = useState(0);
  const [sortAmount, setSortAmount] = useState("DESC");
  const [sortOrder, setSortOrder] = useState("DESC");
  const [name, setName] = useState("");
  const [currentFilters, setCurrentFilters] = useState(null);

  //----------------------------------------SINGLE TRANSACTION MODAL STATES-----------------------
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [showTransactionModal, setShowTransactionModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [notification, setNotification] = useState("");

  const handleClickOnDifferentPage = (direction) => {
    const newPageNum = direction === "next" ? pageNum + 1 : pageNum - 1;
    if (currentFilters) {
      dispatch(fetchFilteredTransactions(selectedWalletId, token, { ...currentFilters, pageNumber: newPageNum }));
    } else {
      dispatch(fetchSpecificWalletTransactionsActions(selectedWalletId, token, newPageNum, sortOrder, "date"));
    }
    setPageNum(newPageNum);
    window.scrollTo(0, 0);
  };

  const handleClickOnDateOrder = () => {
    if (sortOrder === "DESC") {
      setPageNum(0);
      setSortOrder("ASC");
    } else {
      setPageNum(0);
      setSortOrder("DESC");
    }
  };

  useEffect(() => {
    dispatch(fetchSpecificWalletTransactionsActions(selectedWalletId, token, 0, "DESC"));
    dispatch(fetchAllCategories(token));
  }, []);

  useEffect(() => {
    if (sortAmount === "DESC") {
      dispatch(fetchSpecificWalletTransactionsActions(selectedWalletId, token, 0, "DESC", "amount"));
    } else {
      dispatch(fetchSpecificWalletTransactionsActions(selectedWalletId, token, 0, "ASC", "amount"));
    }
  }, [sortAmount]);

  useEffect(() => {
    if (sortOrder === "DESC") {
      dispatch(fetchSpecificWalletTransactionsActions(selectedWalletId, token, 0, "ASC"));
    } else {
      dispatch(fetchSpecificWalletTransactionsActions(selectedWalletId, token, 0, "DESC"));
    }
  }, [sortOrder]);

  const handleClickOnAmountOrder = () => {
    if (sortAmount === "DESC") {
      setPageNum(0);
      setSortAmount("ASC");
    } else {
      setPageNum(0);
      setSortAmount("DESC");
    }
  };

  const handleSubmitResearchQuery = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    // dispatch(fetchSpecificWalletTransactionsByNameActions(selectedWalletId, token, name));
    if (name) {
      dispatch(fetchSpecificWalletTransactionsByNameActions(selectedWalletId, token, name));
    } else {
      dispatch(fetchSpecificWalletTransactionsActions(selectedWalletId, token, pageNum, sortOrder, "date"));
    }
  }, [name]);

  // ------------------------------------------------FILTER LOGIC -----------------------------------------

  const [showFilterModal, setShowFilterModal] = useState(false);
  const [hasFiltered, setHasFiltered] = useState(false);

  const handleFilter = (filters) => {
    setShowFilterModal(false);
    setHasFiltered(true);
    setPageNum(0);
    console.log(filters);
    setCurrentFilters(filters);
    dispatch(fetchFilteredTransactions(selectedWalletId, token, filters));
  };

  const handleClickOnClearFiltersButton = () => {
    dispatch(fetchSpecificWalletTransactionsActions(selectedWalletId, token, 0, "ASC"));
    setHasFiltered(false);
    setCurrentFilters(null);
  };

  // ------------------------------------------------HANDLE TRANSACTION MODAL LOGIC -----------------------------------------

  const handleTransactionClick = (transaction) => {
    setSelectedTransaction(transaction);
    dispatch(getTransactionId(transaction.id));

    setTransactionName(transaction.name);
    setTransactionAmount(transaction.amount);
    setTransactionType(transaction.category.transactionType);
    setTransactionDescription(transaction.description);
    setTransactionDate(transaction.date);
    setTransactionRecurrence(transaction.transactionRecurrence);

    setShowTransactionModal(true);
  };

  const handleEditTransaction = () => {
    setShowTransactionModal(false);
    setShowEditModal(true);
    // selectedTransaction.category.transactionType === "OUTCOME" ? setRadio(1) : setRadio(2);

    if (selectedTransaction.category.transactionType === "OUTCOME") {
      setRadio(2);
      setOptions(incomeOptions);
    } else if (radio === "1") {
      setRadio(1);
      setOptions(outcomeOptions);
    }

    setTransactionCategory(selectedTransaction.category.name);
    // setTransactionType()
  };

  const handleDeleteTransaction = () => {
    setShowDeleteConfirmation(true);
  };

  const confirmDeleteTransaction = () => {
    // Dispatch delete action here
    setShowDeleteConfirmation(false);
    setShowTransactionModal(false);
    if (selectedTransactionId !== null) {
      dispatch(deleteTransactionAction(selectedTransactionId, selectedWalletId, token));
    } else {
      console.log("Please select a transaction before performing this action.");
    }
    setNotification("Transaction successfully deleted");
  };

  const handleSaveTransaction = () => {
    let type = "";
    radio === "1" ? (type = "OUTCOME") : (type = "INCOME");
    // Dispatch save action here
    console.log(transactionName);
    console.log(transactionAmount);
    console.log(type);
    console.log(transactionCategory);
    console.log(transactionDescription);
    console.log(transactionDate);

    const transactionObject = {
      name: transactionName,
      amount: transactionAmount,
      categoryName: transactionCategory,
      description: transactionDescription,
      date: transactionDate,
      transactionRecurrence: transactionRecurrence,
    };

    dispatch(modifyTransactionAction(selectedTransactionId, token, selectedWalletId, transactionObject));
    setShowEditModal(false);
    setNotification("Transaction successfully edited");
    setTimeout(() => {
      setNotification("");
    }, 1500);
  };

  const handleCloseNotification = () => {
    setNotification("");
  };

  // ------------------------behaviour modify modal --------------------------------
  const [incomeOptions, setIncomeOptions] = useState([]);
  const [outcomeOptions, setOutcomeOptions] = useState([]);
  const transactionCategories = useSelector((state) => state.transaction_categories);

  const [transactionName, setTransactionName] = useState("");
  const [transactionAmount, setTransactionAmount] = useState(null);
  const [transactionType, setTransactionType] = useState("Outcome");
  const [transactionCategory, setTransactionCategory] = useState("");
  const [transactionDescription, setTransactionDescription] = useState("");
  const [transactionRecurrence, setTransactionRecurrence] = useState("NONE");
  const [transactionDate, setTransactionDate] = useState(null);
  const [radio, setRadio] = useState(0);
  const [options, setOptions] = useState({});

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

  useEffect(() => {
    if (radio === "2") {
      setOptions(incomeOptions);
    } else if (radio === "1") {
      setOptions(outcomeOptions);
    }
  }, [radio, incomeOptions, outcomeOptions]);

  const handleCategoryChange = (event) => {
    const selectedOption = event.target.options[event.target.selectedIndex];
    setTransactionCategory(selectedOption.label);
  };

  return (
    <>
      {selectedWalletTransactions ? (
        <Container className="transaction-page-container">
          <Row className="transaction-page-title-container">
            <Col sm={7}>
              <h1>Transaction history</h1>
            </Col>
            <Col sm={3}>
              <Form onSubmit={handleSubmitResearchQuery}>
                <Row>
                  <Col xs="auto">
                    <Form.Control
                      type="text"
                      placeholder="Search"
                      className=" mr-sm-2"
                      onChange={(e) => setName(e.target.value)}
                    />
                  </Col>
                </Row>
              </Form>
            </Col>
            <Col sm={2}>
              <Row>
                <Col lg={4} sm={12}>
                  <Button onClick={() => setShowFilterModal(true)}>Filter</Button>
                </Col>
                {hasFiltered && (
                  <Col lg={8} sm={12}>
                    <Button variant="outline-primary" onClick={handleClickOnClearFiltersButton}>
                      Clear filters
                    </Button>
                  </Col>
                )}
              </Row>
            </Col>
          </Row>
          <div className="transaction-page-body-container">
            <Row className="transaction-page-legenda-container">
              <Col>Name</Col>
              <Col>
                <Col>Amount</Col>
                <Col className="transaction-page-arrow-section-container" onClick={handleClickOnAmountOrder}>
                  <Container className="transaction-page-arrow-container">
                    {/* up arrow */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 320 512"
                      className={
                        sortAmount === "ASC" ? "transaction-page-date-arrow" : "transaction-page-date-arrow selected"
                      }
                    >
                      <path d="M288.7 352H31.3c-17.8 0-26.7-21.5-14.1-34.1l128.7-128.7c7.8-7.8 20.5-7.8 28.3 0l128.7 128.7c12.6 12.6 3.7 34.1-14.1 34.1z" />
                    </svg>
                    {/* down arrow */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 320 512"
                      className={
                        sortAmount === "DESC" ? "transaction-page-date-arrow" : "transaction-page-date-arrow selected"
                      }
                    >
                      <path d="M31.3 192h257.3c17.8 0 26.7 21.5 14.1 34.1L174.1 354.8c-7.8 7.8-20.5 7.8-28.3 0L17.2 226.1C4.6 213.5 13.5 192 31.3 192z" />
                    </svg>
                  </Container>
                </Col>
              </Col>
              <Col>
                <Col>Date</Col>
                <Col className="transaction-page-arrow-section-container" onClick={handleClickOnDateOrder}>
                  <Container className="transaction-page-arrow-container">
                    {/* up arrow */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 320 512"
                      className={
                        sortOrder === "ASC" ? "transaction-page-date-arrow" : "transaction-page-date-arrow selected"
                      }
                    >
                      <path d="M288.7 352H31.3c-17.8 0-26.7-21.5-14.1-34.1l128.7-128.7c7.8-7.8 20.5-7.8 28.3 0l128.7 128.7c12.6 12.6 3.7 34.1-14.1 34.1z" />
                    </svg>
                    {/* down arrow */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 320 512"
                      className={
                        sortOrder === "DESC" ? "transaction-page-date-arrow" : "transaction-page-date-arrow selected"
                      }
                    >
                      <path d="M31.3 192h257.3c17.8 0 26.7 21.5 14.1 34.1L174.1 354.8c-7.8 7.8-20.5 7.8-28.3 0L17.2 226.1C4.6 213.5 13.5 192 31.3 192z" />
                    </svg>
                  </Container>
                </Col>
              </Col>
              <Col className="transaction-page-category-container">Category</Col>
              <Col className="transaction-page-recurrency-container">Recurrency</Col>
            </Row>

            <Row className="transaction-page-transactions-container">
              {selectedWalletTransactions &&
                selectedWalletTransactions.length > 0 &&
                selectedWalletTransactions.map((transaction) => (
                  <SingleTransaction
                    transaction={transaction}
                    key={transaction.id}
                    onClick={() => handleTransactionClick(transaction)}
                  />
                ))}
            </Row>

            <Row className="transaction-page-footer-directions-container">
              {pageNum > 0 ? (
                <Col onClick={() => handleClickOnDifferentPage("prev")}>PREV</Col>
              ) : (
                <Col className="deactivated-prev-button">PREV</Col>
              )}

              <Col onClick={() => handleClickOnDifferentPage("next")}>NEXT</Col>
            </Row>
          </div>
        </Container>
      ) : (
        <Container className="transaction-page-no-transactions-container">
          <h1>No wallet selected, please try again!</h1>
        </Container>
      )}

      <Modal show={showFilterModal} onHide={() => setShowFilterModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Filter Transactions</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FilterForm onFilter={handleFilter} />
        </Modal.Body>
      </Modal>

      <Modal show={showTransactionModal} onHide={() => setShowTransactionModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Transaction Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedTransaction && (
            <Form>
              <Form.Group controlId="formTransactionName">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" value={selectedTransaction.name} disabled />
              </Form.Group>
              <Form.Group controlId="formTransactionAmount">
                <Form.Label>Amount</Form.Label>
                <Form.Control type="text" value={selectedTransaction.amount} disabled />
              </Form.Group>
              {/* <Form.Group controlId="formTransactionType">
                <Form.Label>Transaction Type</Form.Label>
                <Form.Control type="text" value={selectedTransaction.transactionType} readOnly />
              </Form.Group>
              <Form.Group controlId="formTransactionCategory">
                <Form.Label>Category</Form.Label>
                <Form.Control type="text" value={selectedTransaction.category.name} readOnly />
              </Form.Group> */}

              {selectedTransaction.category.transactionType === "INCOME" ? (
                <Form.Group required className="radio-buttons-container" onChange={(e) => setRadio(e.target.value)}>
                  <Form.Label>Transaction Type</Form.Label>
                  <Form.Check type="radio" label="Expense" name="group1" value={1} disabled />
                  <Form.Check type="radio" label="Income" name="group1" value={2} disabled defaultChecked />
                </Form.Group>
              ) : (
                <Form.Group required className="radio-buttons-container" onChange={(e) => setRadio(e.target.value)}>
                  <Form.Label>Transaction Type</Form.Label>
                  <Form.Check type="radio" label="Expense" name="group1" value={1} disabled defaultChecked />
                  <Form.Check type="radio" label="Income" name="group1" value={2} disabled />
                </Form.Group>
              )}
              <Form.Group className="mb-3">
                <Form.Label>Category</Form.Label>
                <Form.Select required aria-label="Select category" onChange={handleCategoryChange} disabled>
                  <option key={selectedTransaction.id} value={selectedTransaction.category.name}>
                    {selectedTransaction.category.name}
                  </option>
                </Form.Select>
              </Form.Group>
              <Form.Group controlId="formTransactionDescription">
                <Form.Label>Description</Form.Label>
                <Form.Control as="textarea" value={selectedTransaction.description} disabled />
              </Form.Group>
              {/* <Form.Group controlId="formTransactionRecurrence">
                <Form.Label>Recurrence</Form.Label>
                <Form.Control type="text" value={selectedTransaction.transactionRecurrence} readOnly />
              </Form.Group> */}
              <Form.Group controlId="formTransactionDate">
                <Form.Label>Date</Form.Label>
                <Form.Control
                  type="datetime-local"
                  value={formatDateTimeLocal(new Date(selectedTransaction.date))}
                  disabled
                />
              </Form.Group>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleEditTransaction}>
            Edit
          </Button>
          <Button variant="danger" onClick={handleDeleteTransaction}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showEditModal} onHide={() => setShowEditModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit Transaction</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedTransaction && (
            <Form>
              <Form.Group controlId="formTransactionName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  defaultValue={selectedTransaction.name}
                  onChange={(e) => setTransactionName(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="formTransactionAmount">
                <Form.Label>Amount</Form.Label>
                <Form.Control
                  type="text"
                  defaultValue={selectedTransaction.amount}
                  onChange={(e) => setTransactionAmount(e.target.value)}
                />
              </Form.Group>
              {/* <Form.Group controlId="formTransactionType">
                <Form.Label>Transaction Type</Form.Label>
                <Form.Control type="text" defaultValue={selectedTransaction.transactionType} />
              </Form.Group>
              <Form.Group controlId="formTransactionCategory">
                <Form.Label>Category</Form.Label>
                <Form.Control type="text" defaultValue={selectedTransaction.category.name} />
              </Form.Group> */}
              {selectedTransaction.category.transactionType === "INCOME" ? (
                <Form.Group required className="radio-buttons-container" onChange={(e) => setRadio(e.target.value)}>
                  <Form.Label>Transaction Type</Form.Label>
                  <Form.Check type="radio" label="Expense" name="group1" value={1} />
                  <Form.Check type="radio" label="Income" name="group1" value={2} defaultChecked />
                </Form.Group>
              ) : (
                <Form.Group required className="radio-buttons-container" onChange={(e) => setRadio(e.target.value)}>
                  <Form.Label>Transaction Type</Form.Label>
                  <Form.Check type="radio" label="Expense" name="group1" value={1} defaultChecked />
                  <Form.Check type="radio" label="Income" name="group1" value={2} />
                </Form.Group>
              )}
              <Form.Group className="mb-3">
                <Form.Label>Category</Form.Label>
                <Form.Select required aria-label="Select category" onChange={handleCategoryChange}>
                  {options.length > 0 &&
                    options.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  {/* <option key={selectedTransaction.category.id} defaultValue={selectedTransaction.category.name}>
                    {selectedTransaction.category.name}
                  </option> */}
                </Form.Select>
              </Form.Group>
              <Form.Group controlId="formTransactionDescription">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  defaultValue={selectedTransaction.description}
                  onChange={(e) => setTransactionDescription(e.target.value)}
                />
              </Form.Group>
              {/* <Form.Group controlId="formTransactionRecurrence">
                <Form.Label>Recurrence</Form.Label>
                <Form.Control type="text" defaultValue={selectedTransaction.transactionRecurrence} />
              </Form.Group> */}
              <Form.Group controlId="formTransactionDate">
                <Form.Label>Date</Form.Label>
                <Form.Control
                  type="datetime-local"
                  defaultValue={formatDateTimeLocal(new Date(selectedTransaction.date))}
                  onChange={(e) => setTransactionDate(e.target.value)}
                />
              </Form.Group>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>
            Back
          </Button>
          <Button variant="primary" onClick={handleSaveTransaction}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showDeleteConfirmation} onHide={() => setShowDeleteConfirmation(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this transaction?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteConfirmation(false)}>
            No
          </Button>
          <Button variant="danger" onClick={confirmDeleteTransaction}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>

      {notification && (
        <Modal show={true} onHide={handleCloseNotification} centered>
          <Modal.Body>{notification}</Modal.Body>
        </Modal>
      )}
    </>
  );
};

export default TransactionPage;
