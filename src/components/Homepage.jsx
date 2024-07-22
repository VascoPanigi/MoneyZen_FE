import { useEffect, useState } from "react";
import { Col, Container, ListGroup, Row } from "react-bootstrap";
import { fetchUserInfo, fetchUserWallets } from "../redux/actions";
import { useDispatch, useSelector } from "react-redux";

const Homepage = () => {
  const token = localStorage.getItem("Bearer");
  const dispatch = useDispatch();

  const [selectedWalletIndex, setSelectedWalletIndex] = useState(0);

  const wallets = useSelector((state) => state.user.user_wallets);
  const selectedWallet = useSelector((state) => state.user.user_wallets[selectedWalletIndex]);
  const selectedWalletTransactions = selectedWallet.transactions;

  console.log(wallets.length);

  useEffect(() => {
    console.log("sono nello useEffect, che sballo!");
    dispatch(fetchUserInfo(token));
    dispatch(fetchUserWallets(token));
  }, []);

  const handleWalletSelection = (index) => {
    setSelectedWalletIndex(index);
  };

  return (
    <Container className="homepage-container">
      <Row>
        {wallets.length > 0 &&
          wallets.map((wallet, index) => (
            <Col className="wallet-preview" key={wallet.id} onClick={() => handleWalletSelection(index)}>
              <h3>{wallet.name}</h3> <p>{wallet.balance}:-</p>
            </Col>
          ))}
      </Row>
      <Row>
        {selectedWallet && (
          <Col className="selected-wallet-details">
            <h2>Selected Wallet Details</h2>
            <h3>{selectedWallet.name}</h3>
            <p>Balance: {selectedWallet.balance}:-</p>
            <ListGroup>
              {selectedWalletTransactions.length > 0 ? (
                selectedWalletTransactions.map((transaction) => (
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
