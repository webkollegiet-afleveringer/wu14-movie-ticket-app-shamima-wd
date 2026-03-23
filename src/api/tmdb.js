import axios from "axios";

const API_KEY = process.env.REACT_APP_TMDB_API_KEY;

const api = axios.create({
  baseURL: "https://api.themoviedb.org/3",
});

export const getNowPlaying = () =>
  api.get(`/movie/now_playing?api_key=${API_KEY}`);

export const getUpcoming = () => api.get(`/movie/upcoming?api_key=${API_KEY}`);

export const searchMovies = (query) =>
  api.get(`/search/movie?api_key=${API_KEY}&query=${query}`);

export const getMovieDetails = (id) =>
  api.get(`/movie/${id}?api_key=${API_KEY}`);

export default api;
