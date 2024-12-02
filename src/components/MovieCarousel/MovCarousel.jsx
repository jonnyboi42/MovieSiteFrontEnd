import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Dropdown from 'react-bootstrap/Dropdown';

const MovCarousel = () => {
    const [isNowPlaying, setIsNowPlaying] = useState(true);
    const [selectedLocation, setSelectedLocation] = useState('Roundrock');
    const [movies, setMovies] = useState([]);
    const navigate = useNavigate(); // Initialize useNavigate

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
    }, [selectedLocation, isNowPlaying]);

  
    const handleMovieClick = (e, selectedLocation, id, movieName, movieTickets, isNowPlaying) => {
        e.preventDefault();
    
        // Determine the route based on whether it's Now Playing or Coming Soon
        const route = isNowPlaying
            ? `/${selectedLocation.toLowerCase()}/movie/${id}` // Location-specific for Now Playing
            : `/comingsoon/movie/${id}`; // Shared route for Coming Soon
        
        console.log('Navigating to route:', route);
        navigate(route, {
            state: {
                location: isNowPlaying ? selectedLocation : 'Coming Soon', // Provide context
                id,
                name: movieName,
                ticketsAvailable: movieTickets,
                category: isNowPlaying ? 'Now Playing' : 'Coming Soon',
            },
        });
    };


    return (
        <Container className="container-lg">
            <Row>
                <Col className="col-12 options">
                    <div className="now-playing-coming-soon">
                        <a
                            href="#"
                            className={`lead nowplaying ${isNowPlaying ? 'active' : ''}`}
                            onClick={(e) => { e.preventDefault(); setIsNowPlaying(true); }}
                        >
                            NOW PLAYING
                        </a>
                        <a
                            href="#"
                            className={`lead comingsoon ${!isNowPlaying ? 'active' : ''}`}
                            onClick={(e) => { e.preventDefault(); setIsNowPlaying(false); }}
                        >
                            COMING SOON
                        </a>
                    </div>

                    <Dropdown className="location-dropdown">
                        <Dropdown.Toggle variant="success" id="dropdown-basic" className="location-field">
                            {selectedLocation}
                        </Dropdown.Toggle>
                        <Dropdown.Menu className="inner-dropdown">
                            <Dropdown.Item onClick={() => setSelectedLocation('Roundrock')}>
                                Round Rock
                            </Dropdown.Item>
                            <Dropdown.Item onClick={() => setSelectedLocation('Mueller')}>
                                Mueller
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Col>
            </Row>
            <Row>
                {movies.map((movie) => (
                    <Col key={movie.id} xs={6} sm={6} md={6} lg={3} className="mb-4">
                        <div className="card movie-card">
                            <a
                                href="#"
                                onClick={(e) =>
                                    handleMovieClick(e, selectedLocation, movie.id, movie.title, movie.ticketsAvailable, isNowPlaying)
                                }
                            >
                                <img
                                    src={movie.src[0]}
                                    alt={movie.alt}
                                    className="movie-image img-fluid"
                                />
                            </a>
                        </div>
                        <div className="movie-info">
                            <p className="movie-runtime">{movie.runtime}</p>
                            <p className="category">{movie.category}</p>
                        </div>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default MovCarousel;
