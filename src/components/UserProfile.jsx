import { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row, Modal, Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserInfo, modifyUserProfileAction, patchUserAvatarAction } from "../redux/actions";
import ImageResizer from "react-image-file-resizer";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = localStorage.getItem("Bearer");

  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [file, setFile] = useState(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const [isEditing, setIsEditing] = useState(false);

  const user = useSelector((state) => state.user.user_info);

  useEffect(() => {
    dispatch(fetchUserInfo(token));
  }, [dispatch, token]);

  useEffect(() => {
    if (user) {
      setName(user.name);
      setSurname(user.surname);
      setUsername(user.username);
      setEmail(user.email);
    }
  }, [user]);

  const optimizedImageResizing = (file) => {
    ImageResizer.imageFileResizer(
      file,
      300,
      300,
      "JPEG",
      100,
      0,
      (uri) => {
        setFile(uri);
      },
      "file"
    );
  };

  const handleFileChange = (e) => {
    optimizedImageResizing(e.target.files[0]);
  };

  const handleNewAvatarSubmit = (e) => {
    e.preventDefault();

    if (file) {
      dispatch(patchUserAvatarAction(file, token)).then(() => {
        setShowModal(false);
        setShowSuccessMessage(true);
        setTimeout(() => setShowSuccessMessage(false), 3000);
      });
    }
  };

  const handleUpdatedProfileSubmit = (e) => {
    e.preventDefault();

    const userObject = {
      name: name,
      surname: surname,
      username: username,
      email: email,
    };

    dispatch(modifyUserProfileAction(token, userObject)).then(() => {
      setIsEditing(false);
      setShowSuccessMessage(true);
      setTimeout(() => setShowSuccessMessage(false), 3000);
    });
  };

  const handleEditingChange = () => {
    setIsEditing(true);
  };
  const handleCloseEditingChange = () => {
    setIsEditing(false);
    setName(user.name);
    setSurname(user.surname);
    setUsername(user.username);
    setEmail(user.email);
  };

  const handleLogout = () => {
    localStorage.removeItem("Bearer");
    navigate("/");
  };

  return (
    <Container fluid className="user-profile-page-container">
      {user && !isEditing ? (
        <Row className="user-profile-section-container">
          <Col sm={3} className="user-profile-image-container">
            <svg
              onClick={() => setShowModal(true)}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              style={{ cursor: "pointer" }}
            >
              <path d="M290.7 93.2l128 128-278 278-114.1 12.6C11.4 513.5-1.6 500.6 .1 485.3l12.7-114.2 277.9-277.9zm207.2-19.1l-60.1-60.1c-18.8-18.8-49.2-18.8-67.9 0l-56.6 56.6 128 128 56.6-56.6c18.8-18.8 18.8-49.2 0-67.9z" />
            </svg>
            {user.avatarURL && (
              <div className="user-profile-image-subcontainer" style={{ backgroundImage: `url(${user.avatarURL})` }}>
                {/* {user.avatarURL && <img src={user.avatarURL} alt={`${user.name}'s profile picture`}></img>} */}
              </div>
            )}
          </Col>
          <Col sm={9} className="user-profile-form-container">
            <div>
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
                <Button variant="danger" type="button" onClick={handleLogout}>
                  Logout
                </Button>
                <Button variant="primary" type="button" onClick={handleEditingChange}>
                  Edit
                </Button>
              </div>
            </div>
          </Col>
        </Row>
      ) : (
        <Row className="user-profile-section-container">
          <Col sm={3} className="user-profile-image-container">
            {user.avatarURL && (
              <div className="user-profile-image-subcontainer" style={{ backgroundImage: `url(${user.avatarURL})` }}>
                {/* {user.avatarURL && <img src={user.avatarURL} alt={`${user.name}'s profile picture`}></img>} */}
              </div>
            )}
          </Col>
          <Col sm={9} className="user-profile-form-container">
            <Form onSubmit={handleUpdatedProfileSubmit}>
              <Row className="mb-3">
                <Form.Group as={Col} controlId="name">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Insert your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="surname">
                  <Form.Label>Surname</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Insert your surname"
                    value={surname}
                    onChange={(e) => setSurname(e.target.value)}
                  />
                </Form.Group>
              </Row>

              <Row>
                <Form.Group controlId="username">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Insert your username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </Form.Group>
              </Row>
              <Row>
                <Form.Group controlId="email" aria-disabled>
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Insert your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Group>
              </Row>

              <div className="user-profile-form-buttons-container-edit">
                <Button variant="outline-primary" type="button" onClick={handleCloseEditingChange}>
                  Back
                </Button>
                <Button variant="primary" type="submit">
                  Save changes
                </Button>
              </div>
            </Form>
          </Col>
        </Row>
      )}

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Upload Avatar</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleNewAvatarSubmit}>
            <Form.Group controlId="formFile">
              <Form.Label>Select an image</Form.Label>
              <Form.Control type="file" onChange={handleFileChange} />
            </Form.Group>
            <Button variant="primary" type="submit" className="mt-3">
              Upload
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Success message */}
      {showSuccessMessage && (
        <Alert
          variant="success"
          className="text-center position-fixed w-100"
          style={{ top: "50%", left: "50%", transform: "translate(-50%, -50%)", zIndex: 1050 }}
        >
          Profile successfully uploaded!
        </Alert>
      )}
    </Container>
  );
};

export default UserProfile;
