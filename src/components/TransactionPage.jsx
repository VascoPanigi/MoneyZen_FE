import { Button, Col, Container, Form, Modal, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import SingleTransaction from "./SingleTransaction";
import { useEffect, useState } from "react";
import {
  fetchFilteredTransactions,
  fetchSpecificWalletTransactionsActions,
  fetchSpecificWalletTransactionsByNameActions,
} from "../redux/actions";
import FilterForm from "./FilterForm";

const TransactionPage = () => {
  const dispatch = useDispatch();

  const selectedWalletTransactions = useSelector((state) => state.user.wallet_transactions.content);
  const selectedWalletId = useSelector((state) => state.user.selected_wallet_id);
  const [pageNum, setPageNum] = useState(0);
  const [sortOrder, setSortOrder] = useState("DESC");
  const [sortAmount, setSortAmount] = useState("DESC");
  const [name, setName] = useState("");
  const token = localStorage.getItem("Bearer");
  const [currentFilters, setCurrentFilters] = useState(null);

  const handleClickOnDifferentPage = (direction) => {
    const newPageNum = direction === "next" ? pageNum + 1 : pageNum - 1;

    if (currentFilters) {
      dispatch(fetchFilteredTransactions(selectedWalletId, token, { ...currentFilters, pageNumber: newPageNum }));
    } else {
      dispatch(fetchSpecificWalletTransactionsActions(selectedWalletId, token, newPageNum, sortOrder, sortAmount));
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

  useEffect(() => {
    if (sortAmount === "DESC") {
      dispatch(fetchSpecificWalletTransactionsActions(selectedWalletId, token, 0, "DESC", "amount"));
    } else {
      dispatch(fetchSpecificWalletTransactionsActions(selectedWalletId, token, 0, "ASC", "amount"));
    }
  }, [sortAmount]);

  const handleSubmitResearchQuery = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    dispatch(fetchSpecificWalletTransactionsByNameActions(selectedWalletId, token, name));
  }, [name]);

  // ------------------------------------------------FILTER LOGIC -----------------------------------------

  const [showFilterModal, setShowFilterModal] = useState(false);
  const [hasFiltered, setHasFiltered] = useState(false);

  const handleFilter = (filters) => {
    setShowFilterModal(false);
    setHasFiltered(true);
    setPageNum(0);
    // Implement the logic to filter transactions based on the filters object
    console.log(filters);
    setCurrentFilters(filters);

    // Example filter logic: dispatch action to fetch filtered transactions
    // dispatch(fetchSpecificWalletTransactionsActions(selectedWalletId, token, 0, sortOrder, sortAmount, filters));
    dispatch(fetchFilteredTransactions(selectedWalletId, token, filters));
  };

  const handleClickOnClearFiltersButton = () => {
    dispatch(fetchSpecificWalletTransactionsActions(selectedWalletId, token, 0, "ASC"));
    setHasFiltered(false);
    setCurrentFilters(null);
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
                  {/* <Col xs="auto">
            <Button type="submit">Submit</Button>
          </Col> */}
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
              {/* <Col>Description</Col> */}
              {/* <Col>Type</Col> */}
              <Col className="transaction-page-recurrency-container">Recurrency</Col>
            </Row>

            <Row className="transaction-page-transactions-container">
              {selectedWalletTransactions &&
                selectedWalletTransactions.length > 0 &&
                selectedWalletTransactions.map((transaction) => (
                  <SingleTransaction transaction={transaction} key={transaction.id} />
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
    </>
  );
};

export default TransactionPage;
