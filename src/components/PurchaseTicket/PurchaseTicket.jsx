import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import ticketIcon from '../../assets/icons/ticketIcon.svg'
import moneyIcon from '../../assets/icons/moneyIcon.svg'
import { Col, Form, Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';

const PurchaseTicket = () => {
  // Get the currently selected Movie Data from Redux
  const movieLocation = useSelector((state) => state.movie.selectedLocation);
  const movieName = useSelector((state) => state.movie.selectedMovie);
  const movieTicketPrice = useSelector((state) => state.movie.selectedMovieTicketPrice);
  const movieShowTime = useSelector((state)=> state.movie.selectedMovieShowTime);

  // States used within
  const [ticketCount, setTicketCount] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0.0);
  const [taxRate] = useState(0.08); // Set tax rate (8%)

  // Update totalPrice whenever ticketCount or taxRate changes
  useEffect(() => {
    const subtotal = ticketCount * movieTicketPrice;
    const taxAmount = subtotal * taxRate;
    const total = subtotal + taxAmount;
    setTotalPrice(total.toFixed(2));
  }, [ticketCount, movieTicketPrice, taxRate]);

  const handleIncrease = () => {
    setTicketCount((prevCount) => prevCount + 1);
  };

  const handleDecrease = () => {
    setTicketCount((prevCount) => (prevCount > 1 ? prevCount - 1 : 1));
  };

  return (
    <Container>
      <Row>
        <Col lg={6} className='mx-auto'>
          <div className='purchase-ticket-info'>
            <h1>PURCHASE TICKETS</h1>
            <p><span className='movie-location'>{movieLocation}</span>- {movieName}</p>
            <p>Showtime: {movieShowTime}</p>
            
            <p> <img src={ticketIcon} alt="" /> Adult Tickets : x{ticketCount}</p>
            <p>Subtotal: ${(ticketCount * movieTicketPrice).toFixed(2)}</p>
            <p>Tax: ${(ticketCount * movieTicketPrice * taxRate).toFixed(2)}</p>
            <p> <img src={moneyIcon} alt="" /> Total: ${totalPrice}</p>

            <Form>
              <Form.Group>
                <Form.Label>Quantity</Form.Label>
                <div className='d-flex align-items-center'>
                  <Button variant='secondary' onClick={handleDecrease} className='me-2'>-</Button>
                  <Form.Control
                    className='quantity-button text-center'
                    type='number'
                    min='1'
                    value={ticketCount}
                    readOnly
                  />
                  <Button variant='secondary' onClick={handleIncrease} className='ms-2'>+</Button>
                </div>
              </Form.Group>
            </Form>

            <button className='purchase-button'>Buy</button>
          </div>
        </Col>

      </Row>
    </Container>
  );
};

export default PurchaseTicket;
