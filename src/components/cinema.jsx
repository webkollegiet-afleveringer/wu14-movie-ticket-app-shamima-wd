import '../style/cinema.scss';
import Viva from '../pic/viva.png';
import Ebonylife from '../pic/ebonylife.png';
import { FaStar, FaMapMarkerAlt } from 'react-icons/fa';

const cinemas = [
    {
        id: 1,
        distance: "3 Kilometers",
        name: "via Kong Valdemars Vej/O1",
        description: "Closed 10.00 PM",
        image: Viva,
        rating: "4,9"
    },
    {
        id: 2,
        distance: "3,9 Kilometers",
        name: "RoskildeBio",
        description: "Closed 09.00 PM",
        image: Ebonylife,
        rating: "5,0"
    }
];

const PopularMovies = () => {
    return (
        <div className="cinema-container">
            <div className="cinemas-grid">
                {cinemas.map((cinema) => (
                    <div key={cinema.id} className="cinema-card">
                        <div className="cinema-card-inner">
                            <div className="cinema-image-wrapper">
                                <img
                                    src={cinema.image}
                                    alt={cinema.name}
                                    className="cinema-image"
                                    loading="lazy"
                                    onError={(event) => {
                                        event.currentTarget.src = Viva;
                                    }}
                                />
                            </div>
                            <div className='cinema-content'>
                                <div className='cinema-details'>
                                    <div className='cinema-info'>
                                        <p className="cinema-distance"><FaMapMarkerAlt className='distance-logo' /> {cinema.distance}</p>
                                        <h3 className="cinema-name">{cinema.name}</h3>
                                        <div className='cinema-description-box'>
                                            <p className="cinema-description">{cinema.description}</p>
                                        </div>
                                    </div>
                                    <p className="cinema-rating"><FaStar className='rating-logo' /> {cinema.rating}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PopularMovies;