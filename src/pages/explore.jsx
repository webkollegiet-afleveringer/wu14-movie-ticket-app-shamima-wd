import { IoIosArrowBack, IoIosSearch } from "react-icons/io";
import '../style/explore.scss';
import Navbar from "../components/navbar";
import { useState } from "react";
import { Link } from "react-router";
import TopMovies from "../components/topmovies";
import Upcoming from "../components/upcoming";
import Recommended from "../components/recommended";


function Explore() {
    const [activeTab, setActiveTab] = useState('nowShowing');

    const renderMovies = () => {
        if (activeTab === 'nowShowing') {
            return (
                <>
                    <div className="explore-movies">
                        <h1>Top Movies</h1>
                        <p>See more</p>
                    </div>
                    <div className="explore-movies-container">
                        <div className="explore-movie">
                            <TopMovies />
                        </div>
                    </div>
                </>
            );
        } else {
            return (
                <>
                    <div className="explore-movies">
                        <h1>Upcoming Movies</h1>
                        <p>See more</p>
                    </div>
                    <div className="explore-movies-container">
                        <div className="explore-movie">
                            <Upcoming />
                        </div>
                    </div>
                </>
            );
        }
    };

    return (
        <>
            <div className="explore-container">
                <header className="explore-header">
                    <Link to="/"><IoIosArrowBack className="explore-arrow" /></Link>
                    <h1>Explore Movie</h1>
                    <IoIosSearch className="explore-search" />
                </header>

                <div className="explore-content">
                    <div className="explore-tabs">
                        <p className={`explore-tab ${activeTab === 'nowShowing' ? 'active' : ''}`} onClick={() => setActiveTab('nowShowing')}>Now Showing</p>
                        <p className={`explore-tab ${activeTab === 'upcoming' ? 'active' : ''}`} onClick={() => setActiveTab('upcoming')}>Upcoming</p>
                    </div>
                </div>
                {renderMovies()}
                <div className="explore-recommended">
                    <h2>Recommended</h2>
                    <p>See more</p>
                </div>
                <div className="explore-recommended-movies">
                    <Recommended />
                </div>
            </div>
            <Navbar />
        </>
    );
}

export default Explore;