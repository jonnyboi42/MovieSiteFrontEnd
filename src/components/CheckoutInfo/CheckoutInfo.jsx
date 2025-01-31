import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { useSelector } from "react-redux";

const CheckoutInfo = () => {
  const navigate = useNavigate(); // Initialize navigate function

  // Access necessary data from Redux store
  const movie = useSelector((state) => state.cart.movieCart.movie);
  const tickets = useSelector((state) => state.cart.movieCart.tickets);
  const location = useSelector((state) => state.cart.movieCart.location);
  const price = useSelector((state) => state.cart.movieCart.price);

  const [name, setName] = useState('');

  // Prefilled static values for other fields
  const prefilledData = {
    creditCard: '1234123412341234',
    billingAddress: '123 Main St, Apt 4B',
    state: 'CA',
    zip: '90210',
    email: 'user@example.com',
  };

  // Handle form submission
  const handleCheckout = async () => {
    const checkoutData = {
      name,
      credit_card: prefilledData.creditCard,
      billing_address: prefilledData.billingAddress,
      state: prefilledData.state,
      zip: prefilledData.zip,
      email: prefilledData.email,
      movie,
      tickets,
      location,
      price,
    };

    try {
      const response = await fetch('https://moviesitebackend.onrender.com/api/checkoutinfo/saveCheckout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(checkoutData),
      });

      if (response.ok) {
        const result = await response.json();
        alert(`Checkout successful!`);
        setName('');
        navigate('/'); // Navigate to home page after checkout
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.error}`);
      }
    } catch (error) {
      console.error('Error submitting checkout info:', error);
      alert('Failed to submit checkout information. Please try again.');
    }
  };

  return (
    <Container className="checkout-info-container">
      <h1>PAYMENT INFORMATION</h1>
      <Row className="justify-content-center align-items-center">
        <Col md={6}>
          <p>Name</p>
          <InputGroup className="mb-3">
            <Form.Control
              placeholder="Enter your name"
              aria-label="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </InputGroup>
        </Col>
        <Col md={6}>
          <p>Credit Card</p>
          <InputGroup className="mb-3">
            <Form.Control value={prefilledData.creditCard} readOnly />
          </InputGroup>
        </Col>
      </Row>
      <Row className="justify-content-center align-items-center">
        <Col md={6}>
          <p>Billing Address</p>
          <InputGroup className="mb-3">
            <Form.Control value={prefilledData.billingAddress} readOnly />
          </InputGroup>
        </Col>
        <Col md={3}>
          <p>State</p>
          <InputGroup className="mb-3">
            <Form.Control value={prefilledData.state} readOnly />
          </InputGroup>
        </Col>
        <Col md={3}>
          <p>Zip</p>
          <InputGroup className="mb-3">
            <Form.Control value={prefilledData.zip} readOnly />
          </InputGroup>
        </Col>
      </Row>
      <Row className="align-items-center">
        <Col md={6}>
          <p>Email</p>
          <InputGroup className="mb-3">
            <Form.Control value={prefilledData.email} readOnly />
          </InputGroup>
        </Col>
      </Row>
      <Row className="align-items-center">
        <Col md={6}>
          <Button variant="primary" onClick={handleCheckout}>
            Checkout
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default CheckoutInfo;
