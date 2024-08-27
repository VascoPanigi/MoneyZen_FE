import { useState, useEffect } from "react";
import { Modal, Button, Form, Row } from "react-bootstrap";

const TransactionModal = ({ show, handleClose, handleSubmit, incomeOptions, outcomeOptions }) => {
  const [transactionName, setTransactionName] = useState("");
  const [transactionAmount, setTransactionAmount] = useState(null);
  // const [transactionType, setTransactionType] = useState("Outcome");
  const [transactionCategory, setTransactionCategory] = useState("");
  const [transactionDescription, setTransactionDescription] = useState("");
  const [transactionRecurrence, setTransactionRecurrence] = useState("NONE");
  const [transactionDate, setTransactionDate] = useState(null);
  const [radio, setRadio] = useState(0);
  const [options, setOptions] = useState({});

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

  const handleFormSubmit = (e) => {
    handleSubmit(
      e,
      transactionName,
      transactionAmount,
      transactionCategory,
      transactionDescription,
      transactionRecurrence,
      transactionDate
    );
    setOptions({});
    setTransactionDate(null);
    setRadio(0);
    setTransactionDescription("");
  };

  return (
    <Modal show={show} onHide={handleClose} centered className="new-transaction-modal-container">
      <Modal.Header closeButton>
        <Modal.Title>New Transaction</Modal.Title>
      </Modal.Header>
      <Row className="new-transaction-form-container">
        <Form onSubmit={(e) => handleFormSubmit(e)}>
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
              placeholder="Enter transaction amount"
              onChange={(e) => setTransactionAmount(e.target.value)}
            />
          </Form.Group>
          <Form.Group required className="mb-3" onChange={(e) => setRadio(e.target.value)}>
            <Form.Check type="radio" label="Outcome" name="group1" value={1} />
            <Form.Check type="radio" label="Income" name="group1" value={2} />
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
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Row>
    </Modal>
  );
};

export default TransactionModal;
