import IconSuccess from '../pic/icons/IconSuccess.svg?react';
import '../style/popup.scss';
import { Link } from 'react-router-dom';

function PopupPayment() {
   return (
      <footer>
         <section className="popup-payment">
            <IconSuccess className="popup-payment__icon" />
            <div className="popup-payment__content">
               <h2 className="popup-payment__title">Your payment has been successful</h2>
               <p className="popup-payment__text">Don't try to be funny during a transaction; people want to know exactly where their money is going. Read More</p>
               <Link to="/eticket" className="popup-payment__button">See E-Ticket</Link>
            </div>
         </section>
      </footer>
   );
}

export default PopupPayment;