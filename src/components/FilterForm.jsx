// src/components/FilterForm.jsx
import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";

const FilterForm = ({ onFilter }) => {
  const [startDateTime, setStartDate] = useState("");
  const [endDateTime, setEndDate] = useState("");
  const [minAmount, setMinAmount] = useState("");
  const [maxAmount, setMaxAmount] = useState("");
  const [transactionType, setType] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (transactionType !== "") {
      onFilter({ startDateTime, endDateTime, minAmount, maxAmount, transactionType });
    } else {
      onFilter({ startDateTime, endDateTime, minAmount, maxAmount });
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="startDate">
        <Form.Label>Start Date</Form.Label>
        <Form.Control type="datetime-local" value={startDateTime} onChange={(e) => setStartDate(e.target.value)} />
      </Form.Group>
      <Form.Group controlId="endDate">
        <Form.Label>End Date</Form.Label>
        <Form.Control type="datetime-local" value={endDateTime} onChange={(e) => setEndDate(e.target.value)} />
      </Form.Group>
      <Form.Group controlId="minAmount">
        <Form.Label>Min Amount</Form.Label>
        <Form.Control type="number" value={minAmount} onChange={(e) => setMinAmount(e.target.value)} />
      </Form.Group>
      <Form.Group controlId="maxAmount">
        <Form.Label>Max Amount</Form.Label>
        <Form.Control type="number" value={maxAmount} onChange={(e) => setMaxAmount(e.target.value)} />
      </Form.Group>
      <Form.Group controlId="type">
        <Form.Label>Type</Form.Label>
        <div>
          <Form.Check
            inline
            type="radio"
            label="All"
            value="all"
            checked={transactionType === ""}
            onChange={(e) => setType(e.target.value)}
          />
          <Form.Check
            inline
            type="radio"
            label="Income"
            value="income"
            checked={transactionType === "income"}
            onChange={(e) => setType(e.target.value)}
          />
          <Form.Check
            inline
            type="radio"
            label="Expense"
            value="expense"
            checked={transactionType === "outcome"}
            onChange={(e) => setType(e.target.value)}
          />
        </div>
      </Form.Group>
      <Button variant="primary" type="submit">
        Apply Filters
      </Button>
    </Form>
  );
};

export default FilterForm;
