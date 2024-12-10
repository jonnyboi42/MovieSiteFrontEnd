import React from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const PurchaseTicket = () => {
  return (
    <Container>
      <Row>
        <Col lg={6} className='mx-auto '>
            <div className='purchase-ticket-info'>
                <h1>Purchase Tickets</h1>
                <p>Blade runner 2049</p>
                <p>Tickets: x2</p>
                <p>Total: $35.99</p>
                <button className='purchase-button'>Buy</button>
            </div>
        
        </Col>
        <Col lg={4} className='mx-auto '>
            <div className='purchase-ticket-info'>
                <h1>Summary</h1>
                <p>Blade runner 2049</p>
                <p>Tickets: x2</p>
                <p>Total: $35.99</p>
                <h1>Purchase Tickets</h1>
                <p>Blade runner 2049</p>
                <p>Tickets: x2</p>
                <p>Total: $35.99</p>
                <button className='purchase-button'>Buy</button>
            </div>
        
        </Col>
      </Row>
    </Container>
    
  )
}

export default PurchaseTicket