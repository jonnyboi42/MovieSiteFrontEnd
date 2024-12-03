import React from 'react';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Showtimes = () => {
  return (
    



    // <Container className=' showtime-container d-flex justify-content-center'>
    //   <Row className="showtime-row">
    //     <h1>Showtimes</h1>
    //     <Col md={2} sm={4} xs={6} className="text-center">
    //       <button className="showtime">12:45</button>
    //     </Col>
    //     <Col md={2} sm={4}  xs={6} className="text-center">
    //       <button className="showtime">12:45</button>
    //     </Col>
    //     <Col md={2} sm={4}  xs={6} className="text-center">
    //       <button className="showtime">12:45</button>
    //     </Col>
    //     <Col md={2} sm={4}  xs={6} className="text-center">
    //       <button className="showtime">12:45</button>
    //     </Col>
    //     <Col md={2} sm={4}  xs={6} className="text-center">
    //       <button className="showtime">12:45</button>
    //     </Col>
    //     <Col md={2} sm={4}  xs={6} className="text-center">
    //       <button className="showtime">12:45</button>
    //     </Col>
    //     <Col md={2} sm={4}  xs={6} className="text-center">
    //       <button className="showtime">12:45</button>
    //     </Col>

    //   </Row>
       
    // </Container>

    <Container id='showtime-section'>
      <section >
      <div className="showtimes">
        <button className='showtime'>12:45</button>
        <button className='showtime'>12:45</button>
        <button className='showtime'>12:45</button>
        <button className='showtime'>12:45</button>
        <button className='showtime'>12:45</button>
        <button className='showtime'>12:45</button>
        
        
      </div>
    </section>

    </Container>
    
  );
};

export default Showtimes;
