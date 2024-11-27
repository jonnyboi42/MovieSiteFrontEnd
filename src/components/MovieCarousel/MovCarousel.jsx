import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Dropdown from 'react-bootstrap/Dropdown';

const MovCarousel = () => {
    // Single state for toggling between Now Playing and Coming Soon
    const [isNowPlaying, setIsNowPlaying] = useState(true);

    // State for location dropdown
    const [selectedLocation, setSelectedLocation] = useState('Roundrock'); // Default to 'Round Rock'
    const [movies, setMovies] = useState([]);

    // Fetch movie data based on the current state
    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = isNowPlaying
                    ? await fetch(`http://localhost:3000/${selectedLocation}`)
                    : await fetch(`http://localhost:3000/comingsoon`);
                
                const data = await response.json();
                setMovies(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchMovies();
    }, [selectedLocation, isNowPlaying]); // Re-fetch when location or state changes

    // Toggle between Now Playing & Coming Soon
    const handleNowPlayingClick = (e) => {
        e.preventDefault();
        setIsNowPlaying(true);
    };

    const handleComingSoonClick = (e) => {
        e.preventDefault();
        setIsNowPlaying(false);
    };

    // Location Dropdown Logic
    const handleSelectLocation = (option) => {
        setSelectedLocation(option); // Update selected location
    };

    //Movie Click 
    const handleMovieClick = (e, id, movieTickets) =>  {
        e.preventDefault();
        console.log('Movie ID', id);
        console.log('Available Tickets', movieTickets);

    }

    return (
        <Container className="container-lg">
            <Row>
                <Col className="col-12 options">
                    <div className="now-playing-coming-soon">
                        <a
                            href="#"
                            className={`lead nowplaying ${isNowPlaying ? 'active' : ''}`}
                            onClick={handleNowPlayingClick}
                        >
                            NOW PLAYING
                        </a>
                        <a
                            href="#"
                            className={`lead comingsoon ${!isNowPlaying ? 'active' : ''}`}
                            onClick={handleComingSoonClick}
                        >
                            COMING SOON
                        </a>
                    </div>

                    <Dropdown className='location-dropdown'>
                        <Dropdown.Toggle variant="success" id="dropdown-basic" className="location-field">
                            {selectedLocation} {/* Show selected location */}
                        </Dropdown.Toggle>

                        <Dropdown.Menu className="inner-dropdown">
                            <Dropdown.Item className='dropdown-item'  onClick={() => handleSelectLocation('Roundrock')}>Round Rock</Dropdown.Item>
                            <Dropdown.Item  className='dropdown-item' onClick={() => handleSelectLocation('Mueller')}>Mueller</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Col>
            </Row>
            <Row>
                {movies.map((movie) => (
                    <Col key={movie.id} xs={6} sm={6} md={6} lg={3} className="mb-4">
                        <div className="card movie-card">
                            <a href="" onClick={(e) => handleMovieClick(e ,movie.id, movie.ticketsAvailable)}>
                                <img
                                    src={movie.src}
                                    alt={movie.alt}
                                    className="movie-image img-fluid"
                                />
                            </a>
                        </div>
                        <div className="movie-info">
                            <p className="movie-runtime">{movie.runtime}</p>
                            <p className='category'>{movie.category}</p>
                        </div>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default MovCarousel;
