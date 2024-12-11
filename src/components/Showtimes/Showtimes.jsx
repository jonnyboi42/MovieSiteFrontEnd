import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import { setSelectedMovieTime } from '../../redux/movieSlice';

const Showtimes = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Redux selectors
  const selectedLocation = useSelector((state) => state.movie.selectedLocation);
  const selectedMovieId = useSelector((state) => state.movie.selectedMovieId);

  // Local state to store fetched movies
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch movies for the selected location
    const fetchMovies = async () => {
      try {
        console.log(selectedLocation);
        console.log(selectedMovieId);
        const response = await axios.get(`http://localhost:3000/${selectedLocation}`);
        setMovies(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching movies:', error);
        setLoading(false);
      }
    };

    fetchMovies();
  }, [selectedLocation]); // Re-fetch if location changes

  const handleShowTimeClick = (e, showTime) => {
    e.preventDefault(); // Prevent default action of the event
    dispatch(setSelectedMovieTime(showTime));
    console.log('Showtime Selected:', showTime);
    
    navigate('/purchase');
  };

  // Find the selected movie
  const selectedMovie = movies.find((movie) => movie.id === selectedMovieId);

  return (
    <Container id="showtime-container">
      <h1>Showtimes</h1>
      
      {loading ? (
        <p>Loading showtimes...</p>
      ) : selectedMovie ? (
        <section id="showtime-section">
          <div className="showtimes">
            {selectedMovie.showtimes.map((time, index) => (
              <button 
                key={index} 
                className="showtime" 
                onClick={(e) => handleShowTimeClick(e, time)} // Pass both event and time
              >
                {time}
              </button>
            ))}
          </div>
        </section>
      ) : (
        <p>No showtimes available for the selected movie.</p>
      )}
    </Container>
  );
};

export default Showtimes;
