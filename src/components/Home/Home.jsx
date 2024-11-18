import React, { useEffect, useState } from 'react';

const Home = () => {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3000/roundrock')
            .then(response => response.json())
            .then(data => setMovies(data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    return (
        <div>
            {movies.map(movie => (
                <div key={movie.id}>
                    <h2>{movie.title}</h2>
                    <img src={movie.src} alt={movie.alt} />
                    <p>Runtime: {movie.runtime}</p>
                    <p>Release Date: {movie.releaseDate}</p>
                </div>
            ))}
        </div>
    );
};

export default Home;
