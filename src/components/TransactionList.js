import React, { useContext, useState } from "react";
import { Form, Table } from "react-bootstrap";
import TransactionContext from "../contexts/TransactionContext";
import IncomeExpenseChart from "./IncomeExpenseChart";

const TransactionList = () => {
  const { transactions } = useContext(TransactionContext);

  // Filtrlar uchun state
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");

  // Filtrlash funktsiyasi
  const filterTransactions = () => {
    let filteredTransactions = [...transactions];

    // Sana oralig‘iga filtrlash
    if (startDate) {
      filteredTransactions = filteredTransactions.filter(
        (transaction) => new Date(transaction.date) >= new Date(startDate)
      );
    }

    if (endDate) {
      filteredTransactions = filteredTransactions.filter(
        (transaction) => new Date(transaction.date) <= new Date(endDate)
      );
    }

    // Kategoriya bo‘yicha filtrlash
    if (categoryFilter) {
      filteredTransactions = filteredTransactions.filter(
        (transaction) =>
          transaction.category.toLowerCase() === categoryFilter.toLowerCase()
      );
    }

    return filteredTransactions;
  };

  const filteredTransactions = filterTransactions();

  return (
    <div>
      <h3>Tranzaksiya ro‘yxati</h3>

      {/* Filtrlar */}
      <Form>
        <Form.Group>
          <Form.Label>Sana oralig‘i</Form.Label>
          <div className="d-flex">
            <Form.Control
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="me-2"
            />
            <Form.Control
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Kategoriya bo‘yicha filtr</Form.Label>
          <Form.Control
            type="text"
            placeholder="Kategoriya nomini kiriting"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          />
        </Form.Group>
      </Form>

      {/* Tranzaksiyalar jadvali */}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Sana</th>
            <th>Kategoriya</th>
            <th>Miqdor</th>
            <th>Izoh</th>
            <th>Tur</th>
          </tr>
        </thead>
        <tbody>
          {filteredTransactions.map((transaction, index) => (
            <tr key={index}>
              <td>{transaction.date}</td>
              <td>{transaction.category}</td>
              <td>
                {new Intl.NumberFormat().format(transaction.amount)}{" "}
                {transaction.currency}{" "}
              </td>
              <td>{transaction.description}</td>
              <td>{transaction.type === "income" ? "Daromad" : "Xarajat"}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Grafik */}
      <IncomeExpenseChart filteredTransactions={filteredTransactions} />
    </div>
  );
};

export default TransactionList;
