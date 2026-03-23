import React from 'react';
import '../style/navbar.scss';
import { Link, useLocation } from 'react-router-dom';
import HomeIcon from '../pic/icons/home.svg';
import ExploreIcon from '../pic/icons/explore.svg';
import BookmarkIcon from '../pic/icons/bookmark.svg';
import PersonIcon from '../pic/icons/person.svg';


const Navbar = () => {
    const location = useLocation();

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <div className="navbar-icons">
                    <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}>
                            <img src={HomeIcon} alt="Home" />
                    </Link>
                    <Link to="/explore" className={`nav-link ${location.pathname === '/explore' ? 'active' : ''}`}>
                            <img src={ExploreIcon} alt="Explore" />
                    </Link>
                    <Link to="/bookmarks" className={`nav-link ${location.pathname === '/bookmarks' ? 'active' : ''}`}>
                            <img src={BookmarkIcon} alt="Bookmark" />
                    </Link>
                    <Link to="/settings" className={`nav-link ${location.pathname === '/settings' ? 'active' : ''}`}>
                            <img src={PersonIcon} alt="Person" />
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;