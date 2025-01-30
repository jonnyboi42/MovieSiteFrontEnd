import React, { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setLocation, setSelectedMovie, setCategory } from '../../redux/movieSlice';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Dropdown from 'react-bootstrap/Dropdown';

const Movies = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Get the currently selected movie data from Redux state
    const selectedLocation = useSelector((state) => state.movie.selectedLocation);
    const selectedCategory = useSelector((state) => state.movie.category);

    const [movies, setMovies] = React.useState([]);
    const [error, setError] = React.useState(null);

    // Initialize the location in Redux state on mount if not set
    useEffect(() => {
        if (!selectedLocation) {
            dispatch(setLocation('Roundrock')); // Set a default location
        }
    }, [dispatch, selectedLocation]);

    // Fetch movies based on the location and category
    useEffect(() => {
        const fetchMovies = async () => {
            try {
                let endpoint;
                if (selectedCategory === "Now Playing") {
                    endpoint = `https://moviesitebackend.onrender.com/${selectedLocation || 'Roundrock'}`;
                } else {
                    endpoint = selectedLocation === 'Mueller'
                        ? `https://moviesitebackend.onrender.com/comingsoonmueller`
                        : `https://moviesitebackend.onrender.com/comingsoonroundrock`;
                }
                
                const response = await fetch(endpoint);
                if (!response.ok) {
                    throw new Error('Failed to fetch movies');
                }
                const data = await response.json();
                setMovies(data);
                setError(null);  // Reset error if successful
            } catch (error) {
                console.error('Error fetching data:', error);
                setError(error.message);  // Set error state
            }
        };

        fetchMovies();
    }, [selectedLocation, selectedCategory]); // Use selectedCategory here

    // Handle location change from dropdown
    const handleLocationChange = (location) => {
        dispatch(setLocation(location)); // Update location in Redux store
    };

    // Handle movie click
    const handleMovieClick = (e, movie) => {
        e.preventDefault();
        dispatch(
            setSelectedMovie({
                id: movie.id,
                name: movie.title,
                ticketPrice: movie.ticketPrice,
                showTime: movie.showTime,
                director: movie.director,
                runtime: movie.runtime,
            })
        );

        const route = selectedCategory === 'Now Playing'
            ? `/${selectedLocation.toLowerCase()}/movie/${movie.id}`
            : `/comingsoon/movie/${movie.id}`;

        navigate(route, {
            state: {
                location: selectedCategory,
                id: movie.id,
                name: movie.title,
                ticketsAvailable: movie.ticketsAvailable,
                category: selectedCategory,
            },
        });
    };

    return (
        <Container className="container-lg">
            {error && <div className="error-message">{error}</div>} {/* Display error if present */}
            <Row>
                <Col className="col-12 options">
                    <div className="now-playing-coming-soon">
                        <a
                            href="#"
                            className={`lead nowplaying ${selectedCategory === 'Now Playing' ? 'active' : ''}`}
                            onClick={(e) => {
                                e.preventDefault();
                                dispatch(setCategory('Now Playing'));
                            }}
                        >
                            NOW PLAYING
                        </a>
                        <a
                            href="#"
                            className={`lead comingsoon ${selectedCategory !== 'Now Playing' ? 'active' : ''}`}
                            onClick={(e) => {
                                e.preventDefault();
                                dispatch(setCategory('Coming Soon'));
                            }}
                        >
                            COMING SOON
                        </a>
                    </div>

                    <Dropdown className="location-dropdown">
                        <Dropdown.Toggle variant="success" id="dropdown-basic" className="location-field">
                            {selectedLocation || 'Roundrock'}
                        </Dropdown.Toggle>
                        <Dropdown.Menu className="inner-dropdown">
                            <Dropdown.Item onClick={() => handleLocationChange('Roundrock')}>
                                Round Rock
                            </Dropdown.Item>
                            <Dropdown.Item onClick={() => handleLocationChange('Mueller')}>
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
                                    handleMovieClick(e, movie)
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

export default Movies;
