import '../style/seats.scss';
import { useState, useEffect } from 'react';

function Seats() {
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [reservedSeats, setReservedSeats] = useState([]);
    const ticketPrice = 49;

    useEffect(() => {
        const storedReservedSeats = JSON.parse(localStorage.getItem('reservedSeats')) || [];
        setReservedSeats(storedReservedSeats);
    }, []);

    const toggleSeat = (seatId) => {
        let updatedSelectedSeats;
        if (selectedSeats.includes(seatId)) {
            updatedSelectedSeats = selectedSeats.filter(id => id !== seatId);
        } else {
            updatedSelectedSeats = [...selectedSeats, seatId];
        }
        setSelectedSeats(updatedSelectedSeats);
        localStorage.setItem('selectedSeats', JSON.stringify(updatedSelectedSeats));
        localStorage.setItem('totalPrice', ((updatedSelectedSeats.length) * ticketPrice).toString());
    };

    const renderSeat = (seatId, isReserved) => {
        const isSelected = selectedSeats.includes(seatId);
        const isStoredReserved = reservedSeats.includes(seatId);
        return (
            <div
                key={seatId}
                className={`seats__seat ${isStoredReserved || isReserved ? 'reserved' : ''} ${isSelected ? 'selected' : ''}`}
                onClick={() => !isStoredReserved && !isReserved && toggleSeat(seatId)}
            ></div>
        );
    };

    return (
        <div className="seats">
            <div className="seats__container">
                <span className="seats__bluelineglow"><img src="src\pic\bluelineglow.png" alt="" /></span>
                <div className="seats__row">
                    {renderSeat('A1', false)}
                    {renderSeat('A2', false)}
                    {renderSeat('A3', false)}
                    <div className="seats__spacer"></div>
                    {renderSeat('A4', false)}
                    {renderSeat('A5', false)}
                    {renderSeat('A6', false)}
                </div>
                <div className="seats__row">
                    {renderSeat('B1', false)}
                    {renderSeat('B2', false)}
                    {renderSeat('B3', false)}
                    {renderSeat('B4', false)}
                    <div className="seats__spacer"></div>
                    {renderSeat('B5', false)}
                    {renderSeat('B6', false)}
                    {renderSeat('B7', false)}
                    {renderSeat('B8', false)}
                </div>
                <div className="seats__row">
                    {renderSeat('C1', false)}
                    {renderSeat('C2', false)}
                    {renderSeat('C3', false)}
                    {renderSeat('C4', false)}
                    <div className="seats__spacer"></div>
                    {renderSeat('C5', false)}
                    {renderSeat('C6', false)}
                    {renderSeat('C7', false)}
                    {renderSeat('C8', false)}
                </div>
                <div className="seats__row">
                    {renderSeat('D1', true)}
                    {renderSeat('D2', true)}
                    {renderSeat('D3', true)}
                    {renderSeat('D4', true)}
                    <div className="seats__spacer"></div>
                    {renderSeat('D5', true)}
                    {renderSeat('D6', true)}
                    {renderSeat('D7', true)}
                    {renderSeat('D8', true)}
                </div>
                <div className="seats__row">
                    {renderSeat('E1', true)}
                    {renderSeat('E2', true)}
                    {renderSeat('E3', true)}
                    {renderSeat('E4', true)}
                    <div className="seats__spacer"></div>
                    {renderSeat('E5', true)}
                    {renderSeat('E6', true)}
                    {renderSeat('E7', true)}
                    {renderSeat('E8', true)}
                </div>
                <div className="seats__row">
                    {renderSeat('F1', false)}
                    {renderSeat('F2', false)}
                    {renderSeat('F3', false)}
                    <div className="seats__spacer"></div>
                    {renderSeat('F4', false)}
                    {renderSeat('F5', false)}
                    {renderSeat('F6', false)}
                </div>
            </div>

            <div className="seats__info">
                <div className="seats__legend">
                    <div className="seats__legend-item">
                        <div className="dot selected"></div>
                        <span>Selected</span>
                    </div>
                    <div className="seats__legend-item">
                        <div className="dot reserved"></div>
                        <span>Reserved</span>
                    </div>
                    <div className="seats__legend-item">
                        <div className="dot"></div>
                        <span>Available</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Seats;