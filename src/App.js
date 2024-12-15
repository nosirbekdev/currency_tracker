import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import CurrencyConverter from "./components/CurrencyConverter";
import TransactionForm from "./components/TransactionForm";
import TransactionList from "./components/TransactionList";
import { TransactionProvider } from "./contexts/TransactionContext";
import { getExchangeRates } from "./utils/api";

const App = () => {
  const [exchangeRates, setExchangeRates] = useState({});

  useEffect(() => {
    const fetchRates = async () => {
      const rates = await getExchangeRates();
      setExchangeRates(rates);
    };
    fetchRates();
  }, []);

  return (
    <TransactionProvider>
      <Container>
        <Row>
          <Col xs={12} md={6} className="mt-4">
            <CurrencyConverter exchangeRates={exchangeRates} />
            <TransactionForm />
          </Col>
          <Col xs={12} md={6} className="mt-4">
            <TransactionList />
          </Col>
        </Row>
      </Container>
    </TransactionProvider>
  );
};

export default App;
