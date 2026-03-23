import { useState, useEffect } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import "../style/bookmark.scss";
import Navbar from "../components/navbar";

function Bookmark() {
  const [bookmarkedMovies, setBookmarkedMovies] = useState([]);

  useEffect(() => {
    const bookmarks = JSON.parse(localStorage.getItem("bookmarks") || "[]");
    setBookmarkedMovies(bookmarks);
  }, []);

  const handleDelete = (id) => {
    const updated = bookmarkedMovies.filter((movie) => movie.id !== id);
    setBookmarkedMovies(updated);
    localStorage.setItem("bookmarks", JSON.stringify(updated));
  };

  return (
    <>
      <header className="bookmark">
        <nav className="bookmark__nav">
          <Link to="/" className="bookmark__back-link">
            <IoIosArrowBack />
          </Link>
          <h1 className="bookmark__title">Saved Plan</h1>
        </nav>
      </header>

      <main className="bookmark__main">
        {bookmarkedMovies.length === 0 ? (
          <div className="bookmark__empty">
            <p>No bookmarked movies yet 🎬</p>
          </div>
        ) : (
          <div className="bookmark__container">
            {bookmarkedMovies.map((movie) => (
              <div key={movie.id} className="bookmark__card-wrapper">
                
                {/* Movie Card */}
                <Link to={`/detail/${movie.id}`} className="bookmark__card">
                  <img
                    className="bookmark__poster"
                    src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                    alt={movie.title}
                  />

                  <div className="bookmark__info">
                    <h2>{movie.title}</h2>

                    <div className="bookmark__rating">
                      <FaStar />
                      <span>{movie.vote_average?.toFixed(1) || "0.0"}</span>
                    </div>

                    <div className="bookmark__genres">
                      {movie.genres?.map((g) => g.name).join(", ")}
                    </div>

                    <div className="bookmark__runtime">
                      {movie.runtime
                        ? `${Math.floor(movie.runtime / 60)}h ${
                            movie.runtime % 60
                          }m`
                        : "Runtime unknown"}
                    </div>
                  </div>
                </Link>

                {/* Booking Form */}
                <div className="bookmark__booking">
                  <div className="form-group">
                    <label>Cinema</label>
                    <select>
                      <option>Select cinema</option>
                      <option>Cinema XXI</option>
                      <option>CGV</option>
                      <option>Cinépolis</option>
                    </select>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label>Date</label>
                      <input type="date" />
                    </div>

                    <div className="form-group">
                      <label>Time</label>
                      <input type="time" />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label>Seats</label>
                      <input type="number" min="1" placeholder="Seats" />
                    </div>

                    <div className="form-group">
                      <label>Person</label>
                      <input type="number" min="1" placeholder="People" />
                    </div>
                  </div>

                  <div className="bookmark__actions">
                    <button className="checkout">Checkout</button>
                    <button
                      className="trash"
                      onClick={() => handleDelete(movie.id)}
                    >
                      Trash
                    </button>
                  </div>
                </div>

              </div>
            ))}
          </div>
        )}
      </main>

      <footer>
        <Navbar />
      </footer>
    </>
  );
}

export default Bookmark;