import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import { setSelectedMovie } from '../../redux/movieSlice';

const Showtimes = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Redux selectors
  const selectedLocation = useSelector((state) => state.movie.selectedLocation);
  const selectedMovieId = useSelector((state) => state.movie.selectedMovie.id);

  // Local state to store fetched movies
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/${selectedLocation}`);
        setMovies(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching movies:', error);
        setLoading(false);
      }
    };

    fetchMovies();
  }, [selectedLocation]);

  const handleShowTimeClick = (e, showTime) => {
    e.preventDefault();

    const selectedMovie = movies.find((movie) => movie.id === selectedMovieId);
    if (!selectedMovie) {
      console.error('No movie selected');
      return;
    }

    dispatch(
      setSelectedMovie({
        ...selectedMovie,
        showTime,
      })
    );

    console.log('Showtime Selected:', showTime);
    navigate('/purchase');
  };

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
                onClick={(e) => handleShowTimeClick(e, time)}
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
