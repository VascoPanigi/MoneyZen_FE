import { Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import SingleTransaction from "./SingleTransaction";
import { useEffect, useState } from "react";
import { fetchSpecificWalletTransactionsActions } from "../redux/actions";

const TransactionPage = () => {
  const dispatch = useDispatch();

  const selectedWalletTransactions = useSelector((state) => state.user.wallet_transactions.content);
  const selectedWalletId = useSelector((state) => state.user.selected_wallet_id);
  const [pageNum, setPageNum] = useState(0);
  const [isFetching, setIsFetching] = useState(false);
  const token = localStorage.getItem("Bearer");

  const handleClickOnDifferentPage = (direction) => {
    if (direction === "next") {
      dispatch(fetchSpecificWalletTransactionsActions(selectedWalletId, token, pageNum + 1));
      setPageNum(pageNum + 1);
      window.scrollTo(0, 0);
    } else {
      dispatch(fetchSpecificWalletTransactionsActions(selectedWalletId, token, pageNum - 1));
      setPageNum(pageNum - 1);
      window.scrollTo(0, 0);
    }
  };

  return (
    <Container className="transaction-page-container">
      <Row className="transaction-page-title-container">
        <h1>Here you can find all your transactions</h1>
      </Row>
      <Container className="transaction-page-body-container">
        <Row className="transaction-page-legenda-container">
          <Col>Name</Col>
          <Col>Amount</Col>
          <Col>Date</Col>
          <Col>Category</Col>
          {/* <Col>Description</Col> */}
          <Col>Type</Col>
          <Col>Recurrency</Col>
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
      </Container>
    </Container>
  );
};

export default TransactionPage;
