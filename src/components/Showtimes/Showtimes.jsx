import React from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Showtimes = () => {


  useEffect(() => {
    const fetchMovies = async () => {
        try {
            const response = await axios.get('http://localhost:3000/roundrock'); // Added 'await' here
            console.log(response.data); // Log the data, not the entire response
        } catch (error) {
            console.error('Error Fetching Data:', error);
        }
    };

    fetchMovies(); // Call the async function
  }, []); // Dependency array ensures the effect runs once on mount

  return (
    
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
