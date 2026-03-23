import { IoIosArrowBack } from 'react-icons/io';
import '../style/ticket.scss';
import '../style/validation.scss';
import { useNavigate } from 'react-router-dom';
import Seats from '../components/seat';
import { useEffect, useRef, useState } from 'react';

const cinemas = [
    { id: 1, name: "Viva Cinema" },
    { id: 2, name: "EbonyLife Cinema" }
];

function Ticket() {
    const navigate = useNavigate();
    const cinemaDropdownRef = useRef(null);
    const [selectedCinema, setSelectedCinema] = useState(() => {
        return localStorage.getItem('selectedCinema') || '';
    });

    const [error, setError] = useState('');
    const [isCinemaOpen, setIsCinemaOpen] = useState(false);

    const handleBack = () => {
        navigate(-1);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (cinemaDropdownRef.current && !cinemaDropdownRef.current.contains(event.target)) {
                setIsCinemaOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleCinemaChange = (cinemaName) => {
        setSelectedCinema(cinemaName);
        localStorage.setItem('selectedCinema', cinemaName);
        setError('');
        setIsCinemaOpen(false);
    };

    const handleCheckout = (e) => {
        e.preventDefault();
        if (!selectedCinema) {
            setError('Please select a cinema');
            return;
        }
        navigate('/checkout');
    };

    return (
        <>
            <header className="ticket">
                <nav className="ticket__nav">
                    <button onClick={handleBack} className="ticket__back-link"><IoIosArrowBack /></button>
                    <h1 className="ticket__title">Select Seats</h1>
                </nav>
            </header>
            <div className="ticket__selection">
                <p className="ticket__label">Cinema</p>
                <div
                    className={`ticket__cinema-dropdown ${isCinemaOpen ? 'is-open' : ''} ${error ? 'is-invalid' : ''}`}
                    ref={cinemaDropdownRef}
                >
                    <button
                        type="button"
                        className="ticket__cinema-select"
                        onClick={() => setIsCinemaOpen((current) => !current)}
                        aria-haspopup="listbox"
                        aria-expanded={isCinemaOpen}
                    >
                        <span>{selectedCinema || 'Select Cinema'}</span>
                    </button>

                    {isCinemaOpen && (
                        <ul className="ticket__cinema-menu" role="listbox" aria-label="Cinema options">
                            {cinemas.map((cinema) => (
                                <li key={cinema.id}>
                                    <button
                                        type="button"
                                        className={`ticket__cinema-option ${selectedCinema === cinema.name ? 'is-selected' : ''}`}
                                        onClick={() => handleCinemaChange(cinema.name)}
                                    >
                                        {cinema.name}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
                <div className="ticket__datetime">
                    <div>
                        <p className="ticket__label">Date</p>
                        <input
                            type="date"
                            className="ticket__date-select"
                            defaultValue={new Date().toISOString().split('T')[0]}
                        />
                    </div>
                    <div>
                        <p className="ticket__label">Time</p>
                        <input
                            type="time"
                            className="ticket__time-select"
                            defaultValue={new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' })}
                            step="1800"
                            min="09:00"
                            max="23:00"
                        />
                    </div>
                </div>
                <div className="ticket__seats">
                    <Seats />  
                </div>
                {error && <p className="ticket__error">{error}</p>}
                <div className="ticket__checkout">
                   
                    <button onClick={handleCheckout} className="ticket__book-button">Checkout</button>
                </div>
            </div>
        </>
    );
}

export default Ticket;