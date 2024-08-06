import { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserInfo } from "../redux/actions";

const UserProfile = () => {
  const dispatch = useDispatch();
  const token = localStorage.getItem("Bearer");

  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  const [isEditing, setIsEditing] = useState(false);

  const user = useSelector((state) => state.user.user_info);

  useEffect(() => {
    dispatch(fetchUserInfo(token));
  }, []);

  useEffect(() => {
    setName(user.name);
    setSurname(user.surname);
    setUsername(user.username);
    setEmail(user.email);
  }, [user]);

  return (
    <Container fluid className="user-profile-page-container">
      {user && (
        <Row className="user-profile-section-container">
          <Col sm={3} className="user-profile-image-container">
            {user.avatarURL && <img src={user.avatarURL} alt={`${user.name}'s profile picture`}></img>}
          </Col>
          <Col sm={9} className="user-profile-form-container">
            <Form>
              <Row className="mb-3">
                <Form.Group as={Col} controlId="name">
                  <Form.Label>Name</Form.Label>
                  <Form.Control type="text" placeholder="Insert your name" disabled value={name} />
                </Form.Group>

                <Form.Group as={Col} controlId="surname">
                  <Form.Label>Surname</Form.Label>
                  <Form.Control type="text" placeholder="Insert your surname" disabled value={surname} />
                </Form.Group>
              </Row>

              <Row>
                <Form.Group controlId="username">
                  <Form.Label>Username</Form.Label>
                  <Form.Control type="text" placeholder="Insert your username" disabled value={username} />
                </Form.Group>
              </Row>
              <Row>
                <Form.Group controlId="email" aria-disabled>
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" placeholder="Insert your email" disabled value={email} />
                </Form.Group>
              </Row>
              <div className="user-profile-form-buttons-container">
                {/*<Col sm={3}> */}
                <Button variant="primary" type="text" onClick={() => setIsEditing(!isEditing)}>
                  Edit profile
                </Button>
                {/* </Col>*/}
              </div>
              {/* <Form.Group className="mb-3" id="formGridCheckbox">
                <Form.Check type="checkbox" label="Check me out" />
              </Form.Group>

              <Button variant="primary" type="submit">
                Submit
              </Button> */}
            </Form>
          </Col>
        </Row>
      )}
      {/* <h1>{user.name}</h1> */}
    </Container>
  );
};

export default UserProfile;
