import { useState, useEffect } from 'react';
import { FaStar } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import '../style/detail.scss';
import { IoIosArrowBack } from "react-icons/io";
import { Link } from 'react-router-dom';
import { BsBookmarkDash, BsBookmarkFill } from "react-icons/bs";


const Detail = () => {
    const [movieDetail, setMovieDetail] = useState({});
    const [director, setDirector] = useState("");
    const [isBookmarked, setIsBookmarked] = useState(false);
    const API_KEY ='a84563b9fc258f126e4ae4f2f9062597';
    const { id } = useParams();

    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`)
            .then(response => response.json())
            .then(data => {
                setMovieDetail(data);
               
                localStorage.setItem('movieId', id);
                localStorage.setItem('movieTitle', data.title);
            });

        fetch(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}`)
            .then(response => response.json())
            .then(data => {
                const director = data.crew.find(member => member.job === "Director");
                setDirector(director ? director.name : "");
            });
            
    
        const bookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]');
        const isAlreadyBookmarked = bookmarks.some(bookmark => bookmark.id === parseInt(id));
        setIsBookmarked(isAlreadyBookmarked);
    }, [id, API_KEY]);

    const formatDate = (date) => {
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
    };

    const handleBookmark = () => {
        const bookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]');
        
        if (isBookmarked) {
         
            const updatedBookmarks = bookmarks.filter(bookmark => bookmark.id !== movieDetail.id);
            localStorage.setItem('bookmarks', JSON.stringify(updatedBookmarks));
            setIsBookmarked(false);
        } else {

            const currentDate = new Date();
            const formattedDate = formatDate(currentDate); 
            
            const movieToBookmark = {
                id: movieDetail.id,
                title: movieDetail.title,
                poster_path: movieDetail.poster_path,
                vote_average: movieDetail.vote_average,
                runtime: movieDetail.runtime,
                genres: movieDetail.genres,
                bookmarkedDate: formattedDate
            };
            
            bookmarks.push(movieToBookmark);
            localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
            setIsBookmarked(true);
        }
    };

    return (
        <>
            <header className="detail-header">
                <div className="detail-header-container">
                    <Link to="/"><IoIosArrowBack className="detail-header-arrow" /></Link>
                    <div className="detail-header-title">
                        <h1 className="detail-header-title-text">Details Movie</h1>
                    </div>
                    {isBookmarked ? (
                        <BsBookmarkFill id='bookmark' className="detail-bookmark-icon active" onClick={handleBookmark} />
                    ) : (
                        <BsBookmarkDash id='bookmark' className="detail-bookmark-icon" onClick={handleBookmark} />
                    )}
                </div>
            </header>
            {movieDetail.poster_path && (
                <div className="poster-container">
                    <img
                        src={`https://image.tmdb.org/t/p/original${movieDetail.poster_path}`}
                        alt={movieDetail.title}
                        className="detail-poster"
                        />
                </div>
            )}
            <div className="detail-container">
                <div className="detail-content">
                    <div className="detail-info">
                        <div className="detail-header-content">
                            <h1 className="detail-title">{movieDetail.title}</h1>
                            <div className="detail-header-info">
                                <p className="detail-director">Director: {director} </p>
                                <div className="detail-rating">
                                    <span>|</span>  <FaStar />
                                    <p>{movieDetail.vote_average?.toFixed(1)}</p>
                                </div>
                            </div>
                        </div>
                        <div className='detail-tags'>
                            {movieDetail.genres?.map((genre, index) => (
                                <p key={index}>{genre.name}</p>
                            ))}<p>{movieDetail.runtime} min</p>
                        </div>
                        <h2>Synopsis</h2>
                        <p className="detail-overview">{movieDetail.overview?.slice(0, 150)}... <span className="see-more">Read More</span></p>
                    </div>
                </div>
            </div>
            <div className="book-ticket-container">
                <Link to="/ticket" className="book-ticket-button">Book Ticket</Link>
            </div>        </>
    );
};

export default Detail;