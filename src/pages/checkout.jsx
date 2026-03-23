import { Link, useNavigate } from "react-router-dom";
import "../style/checkout.scss";
import "../style/validation.scss";
import { IoIosArrowBack } from "react-icons/io";
import Mastercard from "../components/mastercard";
import PopupPayment from "../components/popup-payment";
import { useState } from "react";

function Checkout() {
  const navigate = useNavigate();
  const totalPrice = localStorage.getItem("totalPrice") || "0";

  const [showPopup, setShowPopup] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    cardholderName: "",
    cardNumber: "",
    date: "",
    cvv: ""
  });

  const [errors, setErrors] = useState({});

  const handleBack = () => {
    navigate(-1);
  };

  const validateForm = () => {
    let tempErrors = {};

    if (!formData.email) {
      tempErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = "Invalid email format";
    }

    if (!formData.cardholderName) {
      tempErrors.cardholderName = "Cardholder name is required";
    }

    if (!formData.cardNumber) {
      tempErrors.cardNumber = "Card number is required";
    } else if (!/^\d{16}$/.test(formData.cardNumber.replace(/\s/g, ""))) {
      tempErrors.cardNumber = "Card number must be 16 digits";
    }

    if (!formData.date) {
      tempErrors.date = "Expiry date is required";
    }

    if (!formData.cvv) {
      tempErrors.cvv = "CVV is required";
    } else if (!/^\d{3,4}$/.test(formData.cvv)) {
      tempErrors.cvv = "Invalid CVV";
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const formatCardNumber = (value) => {
    const cleaned = value.replace(/\D/g, "").slice(0, 16);
    const groups = cleaned.match(/.{1,4}/g);
    return groups ? groups.join(" ") : cleaned;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    let newValue = value;

    if (name === "cardNumber") {
      newValue = formatCardNumber(value);
    }

    if (name === "cvv") {
      newValue = value.replace(/\D/g, "").slice(0, 4);
    }

    setFormData((prev) => ({
      ...prev,
      [name]: newValue
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const handlePayment = () => {
    if (isProcessing) return;

    if (validateForm()) {
      setIsProcessing(true);

      const selectedSeats =
        JSON.parse(localStorage.getItem("selectedSeats")) || [];
      const existingReservedSeats =
        JSON.parse(localStorage.getItem("reservedSeats")) || [];

      const updatedReservedSeats = [
        ...existingReservedSeats,
        ...selectedSeats
      ];

      localStorage.setItem(
        "reservedSeats",
        JSON.stringify(updatedReservedSeats)
      );

      localStorage.removeItem("selectedSeats");
      localStorage.removeItem("totalPrice");

      setTimeout(() => {
        setShowPopup(true);
        setIsProcessing(false);
      }, 700);
    }
  };

  return (
    <>
      <div className={`wrapper ${showPopup ? "overlay" : ""}`}>
        <header className="checkout-header">
          <nav className="checkout__nav">
            <button onClick={handleBack} className="checkout-link">
              <IoIosArrowBack />
            </button>
            <h1 className="checkout__title">Checkout</h1>
          </nav>
        </header>

        <div className="checkout__container">
          <div className="checkout__paymenttext">
            <h2>Payment Method</h2>
            <p>Mastercard</p>
          </div>

          <Mastercard />

          <div className="checkout__payment-details">
            <label>Your Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleInputChange}
              className={errors.email ? "error-input" : ""}
            />
            {errors.email && (
              <span className="error-message">{errors.email}</span>
            )}

            <label>Cardholder Name</label>
            <input
              type="text"
              name="cardholderName"
              placeholder="Full Name"
              value={formData.cardholderName}
              onChange={handleInputChange}
              className={errors.cardholderName ? "error-input" : ""}
            />
            {errors.cardholderName && (
              <span className="error-message">
                {errors.cardholderName}
              </span>
            )}

            <label>Card Number</label>
            <input
              type="text"
              name="cardNumber"
              placeholder="1234 5678 9012 3456"
              value={formData.cardNumber}
              onChange={handleInputChange}
              className={errors.cardNumber ? "error-input" : ""}
            />
            {errors.cardNumber && (
              <span className="error-message">
                {errors.cardNumber}
              </span>
            )}

            <div className="checkout__date-cvv">
              <div className="checkout__date">
                <label>Expiry Date</label>
                <input
                  type="month"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  className={errors.date ? "error-input" : ""}
                />
                {errors.date && (
                  <span className="error-message">{errors.date}</span>
                )}
              </div>

              <div className="checkout__cvv">
                <label>CVV</label>
                <input
                  type="text"
                  name="cvv"
                  placeholder="123"
                  value={formData.cvv}
                  onChange={handleInputChange}
                  className={errors.cvv ? "error-input" : ""}
                />
                {errors.cvv && (
                  <span className="error-message">{errors.cvv}</span>
                )}
              </div>
            </div>

            <button
              className="checkout__pay-button"
              onClick={handlePayment}
              disabled={isProcessing}
            >
              {isProcessing ? "Processing..." : "Pay Now"} | ${totalPrice}
            </button>
          </div>
        </div>
      </div>

      <div className={`popup-container ${showPopup ? "show" : ""}`}>
        {showPopup && <PopupPayment />}
      </div>
    </>
  );
}

export default Checkout;