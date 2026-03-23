import { useState, useEffect } from 'react';
import '../style/topmovies.scss';
import { FaStar } from 'react-icons/fa';

function TopMovies() {
    const [movies, setMovies] = useState([]);
    const API_KEY = 'a84563b9fc258f126e4ae4f2f9062597';

    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`)
            .then(response => response.json())
            .then(data => setMovies(data.results));
    }, [API_KEY]);

    const handleMovieClick = (movieId) => {
        window.location.href = `/detail/${movieId}`;
    };

    return (
        <>
            <div className="movie-grid">
                {movies.map(movie => (
                    <div key={movie.id} className="movie-card" onClick={() => handleMovieClick(movie.id)}>
                        <img
                            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                            alt={movie.title}
                        />
                        <h3>{movie.title}</h3>
                        <p>
                            <span>
                                <FaStar className='star-icon' />
                                <FaStar className='star-icon' />
                                <FaStar className='star-icon' />
                                <FaStar className='star-icon' />
                                <FaStar className='star-icon' />
                            </span>
                        </p>
                    </div>
                ))}
            </div>
        </>
    );
}

export default TopMovies;