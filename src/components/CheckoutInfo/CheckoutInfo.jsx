import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { useSelector, useDispatch } from "react-redux"; // Import useDispatch

const CheckoutInfo = () => {

  const dispatch = useDispatch(); // Initialize dispatch

  //Access the necessary Data From The Redux store
  const movie = useSelector((state) => state.cart.movieCart.movie);
  const tickets = useSelector((state) => state.cart.movieCart.tickets);
  const location = useSelector((state) => state.cart.movieCart.location);
  const price = useSelector((state) => state.cart.movieCart.price);

  // States for input fields
  const [name, setName] = useState('');
  const [creditCard, setCreditCard] = useState('');
  const [billingAddress, setBillingAddress] = useState('');
  const [state, setState] = useState('');
  const [zip, setZip] = useState('');
  const [email, setEmail] = useState('');

  // Handle form submission
  const handleCheckout = async () => {
    const checkoutData = {
      name,
      credit_card: creditCard,
      billing_address: billingAddress,
      state,
      zip,
      email,
      movie,
      tickets,
      location,
      price,
    };

    try {
      const response = await fetch('http://localhost:3000/api/checkoutinfo/saveCheckout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(checkoutData),
      });

      if (response.ok) {
        const result = await response.json();
        alert(`Checkout successful! Your checkout ID is ${result.checkoutId}.`);
        // Optionally, reset the form after a successful submission
        setName('');
        setCreditCard('');
        setBillingAddress('');
        setState('');
        setZip('');
        setEmail('');
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
              placeholder="Name"
              aria-label="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </InputGroup>
        </Col>
        <Col md={6}>
          <p>Credit Card</p>
          <InputGroup className="mb-3">
            <Form.Control
              placeholder="Credit Card"
              aria-label="Credit Card"
              value={creditCard}
              onChange={(e) => setCreditCard(e.target.value)}
            />
          </InputGroup>
        </Col>
      </Row>
      <Row className="justify-content-center align-items-center">
        <Col md={6}>
          <p>Billing Address</p>
          <InputGroup className="mb-3">
            <Form.Control
              placeholder="Billing Address"
              aria-label="Billing Address"
              value={billingAddress}
              onChange={(e) => setBillingAddress(e.target.value)}
            />
          </InputGroup>
        </Col>
        <Col md={3}>
          <p>State</p>
          <InputGroup className="mb-3">
            <Form.Control
              placeholder="State"
              aria-label="State"
              value={state}
              onChange={(e) => setState(e.target.value)}
            />
          </InputGroup>
        </Col>
        <Col md={3}>
          <p>Zip</p>
          <InputGroup className="mb-3">
            <Form.Control
              placeholder="Zip"
              aria-label="Zip"
              value={zip}
              onChange={(e) => setZip(e.target.value)}
            />
          </InputGroup>
        </Col>
      </Row>
      <Row className="align-items-center">
        <Col md={6}>
          <p>Email</p>
          <InputGroup className="mb-3">
            <Form.Control
              placeholder="Email"
              aria-label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
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
