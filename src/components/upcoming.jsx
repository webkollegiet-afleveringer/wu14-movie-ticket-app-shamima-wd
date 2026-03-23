import { useState, useEffect } from 'react';
import '../style/upcoming.scss';
import { useNavigate } from 'react-router-dom';

const Upcoming = () => {
    const API_KEY = 'a84563b9fc258f126e4ae4f2f9062597';
    const BASE_URL = 'https://api.themoviedb.org/3/movie/upcoming';
    const UPCOMING_URL = `${BASE_URL}?api_key=${API_KEY}&language=en-US&page=1`;
    const [movies, setMovies] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchMovies = async () => {
            const response = await fetch(UPCOMING_URL);
            const data = await response.json();
            setMovies(data.results);
        };

        fetchMovies();
    }, []);

    const handleMovieClick = (movieId) => {
        navigate(`/detail/${movieId}`);
    };

    return (
        <div className="upcoming-movies-wrapper">
            <div className="movies-grid">
                {movies.map((movie) => (
                    <div key={movie.id} className="movie-card" onClick={() => handleMovieClick(movie.id)}>
                        <img
                            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                            alt={movie.title}
                            className="movie-image"
                        />
                        <div className='movie-details'>
                            <h3 className="movie-heading">{movie.title}</h3>
                            <p className="release-date">{new Date(movie.release_date).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>    
    );
}

export default Upcoming;