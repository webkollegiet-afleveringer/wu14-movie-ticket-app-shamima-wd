import '../style/mastercard.scss';
import MasterCardLogo from '../pic/icons/mastercard.png';
function Mastercard() {
    return (
        <>
            <div className="checkout__card">
                <div className="card blue-card">
                    <div className="card__logo">
                        <img src={MasterCardLogo} alt="Mastercard" />
                    </div>
                    <div className="card__number">
                        <span className="label">Balance</span>
                        <span className="value">80,580,00.</span>

                    </div>
                    <div className="card__details">
                        <div className="card__holder">
                            <span className="label">Card Holder</span>
                            <span className="value">Peter</span>
                        </div>
                        <div className="card__balance">
                            <span>**** **** **** 61146</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Mastercard;