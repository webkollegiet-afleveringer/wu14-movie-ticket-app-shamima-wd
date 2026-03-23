import { useState, useEffect } from 'react';
import '../style/movies.scss';

const API_KEY = 'a84563b9fc258f126e4ae4f2f9062597';
const UPCOMING_URL = `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1`;

const getMovieImage = (movie) => movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : 'https://via.placeholder.com/500x750?text=No+Image';

const MovieSlideshow = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const controller = new AbortController();

        const fetchMovies = async () => {
            try {
                const response = await fetch(UPCOMING_URL, { signal: controller.signal });
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setMovies((data?.results || []).slice(0, 10));
            } catch (err) {
                if (err.name !== 'AbortError') {
                    setError(err.message);
                }
            } finally {
                setLoading(false);
            }
        };

        fetchMovies();

        return () => {
            controller.abort();
        };
    }, []);

    if (loading) {
        return <div>Loading coming soon movies...</div>;
    }

    if (error) {
        return <div>Coming soon movies are temporarily unavailable.</div>;
    }

    return (
        <div className="movie-slideshow-container">
            <div className="slideshow-content">
                {movies.map((movie, index) => (
                    <div
                        key={movie.id || index}
                        className="movie-slide-item"
                    >
                        <img
                            src={getMovieImage(movie)}
                            alt={movie.title}
                            className="movie-poster"
                        />
                        <div className='movie-info'>
                            <h3 className="movie-title">{movie.title}</h3>
                            <p>{movie.release_date ? `Release: ${movie.release_date}` : 'Release date unavailable'}</p>
                            <p>
                                {typeof movie.vote_average === 'number'
                                    ? `Rating: ${movie.vote_average.toFixed(1)}/10`
                                    : 'Rating unavailable'}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MovieSlideshow;