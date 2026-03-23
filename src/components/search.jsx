  import { useState, useEffect } from 'react';
  import '../style/search.scss';
  import { IoIosSearch } from "react-icons/io";
  import { useNavigate } from 'react-router-dom';

  const API_KEY = 'a84563b9fc258f126e4ae4f2f9062597';
  const BASE_URL = 'https://api.themoviedb.org/3';
  const SEARCH_URL = `${BASE_URL}/search/movie?api_key=${API_KEY}`;

  const Search = () => {
      const [searchResults, setSearchResults] = useState([]);
      const [searchQuery, setSearchQuery] = useState('');
      const navigate = useNavigate();

      useEffect(() => {
          const searchMovies = async () => {
              if (searchQuery.trim() === '') {
                  setSearchResults([]);
                  return;
              }

              const response = await fetch(`${SEARCH_URL}&query=${encodeURIComponent(searchQuery)}&sort_by=popularity.desc`);
              const data = await response.json();
              const popularMovies = data.results.filter(movie => movie.vote_count > 100);
              setSearchResults(popularMovies.slice(0, 10));
          };

          const debounceTimer = setTimeout(() => {
              searchMovies();
          }, 500);

          return () => clearTimeout(debounceTimer);
      }, [searchQuery]);

      const handleMovieClick = (movieId) => {
          navigate(`/detail/${movieId}`);
      };

      return (
          <div className="search-container">
              <input
                  type="text"
                  placeholder="Search your favourite movie"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="search-input"
              /><IoIosSearch className='search-icon' />
            
              <div className="search-results">
                  {searchResults.map((movie) => (
                      <div key={movie.id} className="movie-slide-item" onClick={() => handleMovieClick(movie.id)}>
                          <img
                              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                              alt={movie.title}
                              className="movie-poster"
                          />
                          <div className='movie-info'>
                              <h3 className="movie-title">{movie.title}</h3>
                              <p>{new Date(movie.release_date).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}</p>
                          </div>
                      </div>
                  ))}
              </div>
          </div>
      );
  };

  export default Search;
