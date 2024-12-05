import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setLocation } from '../../redux/movieSlice'; // Import Redux action
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Dropdown from 'react-bootstrap/Dropdown';

const Movies = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Get the location from Redux state
    const selectedLocation = useSelector((state) => state.movie.selectedLocation) || 'Roundrock';

    // Local state for Now Playing or Coming Soon
    const [isNowPlaying, setIsNowPlaying] = React.useState(true);
    const [movies, setMovies] = React.useState([]);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const endpoint = isNowPlaying
                    ? `http://localhost:3000/${selectedLocation}`
                    : `http://localhost:3000/comingsoon`;
                const response = await fetch(endpoint);
                const data = await response.json();
                setMovies(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchMovies();
    }, [selectedLocation, isNowPlaying]);

    const handleLocationChange = (location) => {
        dispatch(setLocation(location)); // Update location in Redux store
    };

    const handleMovieClick = (e, id, movieName, movieTickets, isNowPlaying) => {
        e.preventDefault();

        const route = isNowPlaying
            ? `/${selectedLocation.toLowerCase()}/movie/${id}`
            : `/comingsoon/movie/${id}`;

        navigate(route, {
            state: {
                location: isNowPlaying ? selectedLocation : 'Coming Soon',
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
                                    handleMovieClick(e, movie.id, movie.title, movie.ticketsAvailable, isNowPlaying)
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
