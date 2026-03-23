import IconSuccess from '../pic/icons/IconSuccess.svg?react';
import '../style/popup.scss';
import { Link } from 'react-router-dom';

function PopupPayment() {
   return (
      <footer>
         <section className="popup-payment">
            <IconSuccess className="popup-payment__icon" />
            <div className="popup-payment__content">
               <h2 className="popup-payment__title">Your payment was successful</h2>
               <p className="popup-payment__text">Adele is a Scottish heiress whose extremely
                  wealthy family owns estates and grounds.
                  When she was a teenager. Read More</p>
               <Link to="/eticket" className="popup-payment__button">See E-Ticket</Link>
            </div>
         </section>
      </footer>
   );
}

export default PopupPayment;