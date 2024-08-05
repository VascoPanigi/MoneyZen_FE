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
  const [sortOrder, setSortOrder] = useState("DESC");
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

  return (
    <>
      {selectedWalletTransactions ? (
        <Container className="transaction-page-container">
          <Row className="transaction-page-title-container">
            <h1>Here you can find all your transactions</h1>
          </Row>
          <Container className="transaction-page-body-container">
            <Row className="transaction-page-legenda-container">
              <Col>Name</Col>
              <Col>Amount</Col>
              <Col>
                <Col>Date</Col>
                <Col className="transaction-page-date-arrow-section-container" onClick={handleClickOnDateOrder}>
                  <Container className="transaction-page-date-arrow-container">
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
                    {/* {sortOrder === "DESC" ? (
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                        <path d="M413.1 222.5l22.2 22.2c9.4 9.4 9.4 24.6 0 33.9L241 473c-9.4 9.4-24.6 9.4-33.9 0L12.7 278.6c-9.4-9.4-9.4-24.6 0-33.9l22.2-22.2c9.5-9.5 25-9.3 34.3 .4L184 343.4V56c0-13.3 10.7-24 24-24h32c13.3 0 24 10.7 24 24v287.4l114.8-120.5c9.3-9.8 24.8-10 34.3-.4z" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                        <path d="M34.9 289.5l-22.2-22.2c-9.4-9.4-9.4-24.6 0-33.9L207 39c9.4-9.4 24.6-9.4 33.9 0l194.3 194.3c9.4 9.4 9.4 24.6 0 33.9L413 289.4c-9.5 9.5-25 9.3-34.3-.4L264 168.6V456c0 13.3-10.7 24-24 24h-32c-13.3 0-24-10.7-24-24V168.6L69.2 289.1c-9.3 9.8-24.8 10-34.3 .4z" />
                      </svg>
                    )} */}
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
          </Container>
        </Container>
      ) : (
        <Container className="transaction-page-no-transactions-container">
          <h1>No wallet selected, please try again!</h1>
        </Container>
      )}
    </>
  );
};

export default TransactionPage;
