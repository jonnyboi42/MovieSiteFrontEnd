import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom'; // For accessing `id` and `state`
import { useSelector } from 'react-redux'; // Import Redux hook
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

const MovieInfo = () => {
    const { id } = useParams(); // Access 'id' from URL
    const { state } = useLocation(); // Access state passed via navigate() (if needed)

    // Access location from Redux state
    const selectedLocation = useSelector((state) => state.movie.selectedLocation) || 'Roundrock';
    const selectedMovieCategory = useSelector((state) => state.movie.category); // Correct category access
    const [movie, setMovie] = useState(null);

    useEffect(() => {
        const fetchMovie = async () => {
            try {
                console.log("Selected Location (Redux):", selectedLocation);
                console.log('Selected Category:', selectedMovieCategory);

                let response;

                if (selectedMovieCategory === 'Coming Soon') {
                    // Adjust fetch URL for the specific location of "Coming Soon"
                    response = await fetch(`https://moviesitebackend.onrender.com/comingsoon${selectedLocation.toLowerCase()}/movie/${id}`);
                } else {
                    // Fetch from location-specific route for "Now Playing"
                    response = await fetch(`https://moviesitebackend.onrender.com/${selectedLocation.toLowerCase()}/movie/${id}`);
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

    return (
        <>
            <Container
                className="specific-movie-info"
                fluid
                style={{
                    backgroundImage: `url(${movie.src?.[1] || ''})`, // Avoid crash if src[1] is missing
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
                                    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 16 16" height="1.5em" width="1.5em" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" d="M10.804 8L5 4.633v6.734L10.804 8zm.792-.696a.802.802 0 010 1.392l-6.363 3.692C4.713 12.69 4 12.345 4 11.692V4.308c0-.653.713-.998 1.233-.696l6.363 3.692z" clipRule="evenodd"></path>
                                    </svg>
                                    WATCH TRAILER
                                </Button>
                                <Button className="showtime-button" onClick={() => console.log('Showtimes')}>
                                    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="1.5em" width="1.5em" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M323.9 19.81l-55.2 55.15L285 91.24 272.2 104 256 87.73 19.81 323.9l45.57 45.6c28.5-14.6 56.22-11.7 72.52 4.6 16.3 16.3 19.2 44 4.6 72.5l45.6 45.6 236.1-236.1-16.2-16.3 12.8-12.8 16.3 16.2 55.1-55.1-45.6-45.6c-28.5 14.6-56.2 11.7-72.5-4.6-16.3-16.3-19.2-44.02-4.6-72.52zm-16.2 93.99l33.9 34-12.8 12.8-33.9-34zM256 130.2L381.8 256 222.1 415.8 96.16 289.9 249.6 136.5zm0 25.4L121.6 289.9l100.5 100.5L356.4 256zm108.2 14.8l34 33.9-12.8 12.8-34-33.9z"></path>
                                    </svg>
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
        </>
    );
};

export default MovieInfo;
