import React, { useState, useEffect, useRef } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

const MovieInfo = () => {
    const { id } = useParams();
    const { state } = useLocation();
    const selectedLocation = useSelector((state) => state.movie.selectedLocation) || 'Roundrock';
    const selectedMovieCategory = useSelector((state) => state.movie.category);
    const [movie, setMovie] = useState(null);

    // Ref for the showtimes section
    const showtimesRef = useRef(null);

    useEffect(() => {
        const fetchMovie = async () => {
            try {
                console.log("Selected Location (Redux):", selectedLocation);
                console.log('Selected Category:', selectedMovieCategory);

                let response;

                if (selectedMovieCategory === 'Coming Soon') {
                    response = await fetch(`https://moviesitebackend.onrender.com/comingsoon/${selectedLocation.toLowerCase()}/movie/${id}`);
                } else {
                    response = await fetch(`https://moviesitebackend.onrender.com/nowplaying/${selectedLocation.toLowerCase()}/movie/${id}`);
                }

                const data = await response.json();
                setMovie(data);
            } catch (error) {
                console.error('Error fetching movie data:', error);
            }
        };

        fetchMovie();
    }, [id, selectedMovieCategory, selectedLocation]);

    if (!movie) {
        return <div>Loading...</div>;
    }

    // Function to scroll to the showtimes section
    const scrollToShowtimes = () => {
        if (showtimesRef.current) {
            showtimesRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <>
            <Container
                className="specific-movie-info"
                fluid
                style={{
                    backgroundImage: `url(${movie.src?.[1] || ''})`,
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                }}
            >
                <Row>
                    <Col className="specific-movie-info-inner-col">
                        <img src={movie.src?.[0] || ''} alt={movie.title || 'Movie'} />
                        <div className="specific-movie-info-data">
                            <h1>{movie.title}</h1>
                            <p>{`${movie.category || 'Unknown'} / ${movie.runtime || 'Unknown'} / ${movie.releaseDate || 'TBA'}`}</p>
                            <div className="specific-movie-info-buttons">
                                <Button className="trailer-button" onClick={() => console.log('Watch Trailer')}>
                                    WATCH TRAILER
                                </Button>
                                <Button className="showtime-button" onClick={scrollToShowtimes}>
                                    SHOWTIMES
                                </Button>
                            </div>
                            <div className="specific-movie-description">
                                <p>{movie.description || 'No description available.'}</p>
                                <p>Director: {movie.director || 'Unknown'}</p>
                                <p>Genre: {movie.category || 'Unknown'}</p>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>

            {/* Showtimes Section */}
            <Container ref={showtimesRef} className="showtimes-section">
                <h2>Showtimes</h2>
                {/* Add your showtimes content here */}
            </Container>
        </>
    );
};

export default MovieInfo;
