import React, { useContext, useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import "../App.css";
import TransactionContext from "../contexts/TransactionContext";
import { getExchangeRates } from "../utils/api";

const TransactionForm = () => {
  const { addTransaction } = useContext(TransactionContext);

  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("income"); // 'income' or 'expense'
  const [currency, setCurrency] = useState("USD"); // Default currency  USD
  const [currencyRates, setCurrencyRates] = useState({});

  useEffect(() => {
    const fetchRates = async () => {
      const rates = await getExchangeRates();
      setCurrencyRates(rates); // Set the currency rates object
      const savedCurrency = localStorage.getItem("selectedCurrency");
      if (savedCurrency) {
        setCurrency(savedCurrency);
      } else {
        setCurrency("USD"); // Default currency USD
      }
    };
    fetchRates();
  }, []);

  // Handle currency change and save to localStorage
  const handleCurrencyChange = (e) => {
    const selectedCurrency = e.target.value;
    setCurrency(selectedCurrency);
    localStorage.setItem("selectedCurrency", selectedCurrency);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const transaction = {
      amount: parseFloat(amount),
      category,
      date,
      description,
      type,
      currency,
    };
    addTransaction(transaction);
    setAmount("");
    setCategory("");
    setDate("");
    setDescription("");
    setCurrency("USD");
    localStorage.setItem("selectedCurrency", "USD");
  };

  return (
    <div className="mt-3">
      <h3>Tranzaksiya qo‘shish</h3>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Miqdor</Form.Label>
          <Form.Control
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Kategoriya</Form.Label>
          <Form.Control
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Sana</Form.Label>
          <Form.Control
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Izoh</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Tur</Form.Label>
          <div>
            <Form.Check
              type="radio"
              label="Daromad"
              value="income"
              checked={type === "income"}
              onChange={() => setType("income")}
            />
            <Form.Check
              type="radio"
              label="Xarajat"
              value="expense"
              checked={type === "expense"}
              onChange={() => setType("expense")}
            />
          </div>
        </Form.Group>
        <Form.Group>
          <Form.Label>Valyuta</Form.Label>
          <Form.Control
            as="select"
            value={currency}
            onChange={handleCurrencyChange}
          >
            {Object.keys(currencyRates).map((currencyKey) => (
              <option key={currencyKey} value={currencyKey}>
                {currencyKey} ({currencyRates[currencyKey]})
              </option>
            ))}
          </Form.Control>
        </Form.Group>

        <Button type="submit" className="mt-3">
          Tranzaksiyani qo‘shish
        </Button>
      </Form>
    </div>
  );
};

export default TransactionForm;
