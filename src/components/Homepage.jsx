import { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { fetchUserInfo, fetchUserWallets } from "../redux/actions";
import { useDispatch } from "react-redux";

const Homepage = () => {
  const token = localStorage.getItem("Bearer");
  const dispatch = useDispatch();
  useEffect(() => {
    console.log("sono nello useEffect, che sballo!");
    dispatch(fetchUserInfo(token));
    dispatch(fetchUserWallets(token));
  }, []);

  return (
    <Container className="homepage-container">
      <Row>
        <Col>
          <h1>CIAOOOO</h1>
        </Col>
      </Row>
    </Container>
  );
};

export default Homepage;
