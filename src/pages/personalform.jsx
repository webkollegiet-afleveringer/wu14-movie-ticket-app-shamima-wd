import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import "../style/personalform.scss";

const genderOptions = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
  { value: "other", label: "Other" }
];

function PersonalForm() {
  const navigate = useNavigate();
  const genderDropdownRef = useRef(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    gender: "",
    address: ""
  });

  const [submitted, setSubmitted] = useState(false);
  const [isGenderOpen, setIsGenderOpen] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (genderDropdownRef.current && !genderDropdownRef.current.contains(event.target)) {
        setIsGenderOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleGenderSelect = (value) => {
    setFormData({ ...formData, gender: value });
    setIsGenderOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.gender) {
      setSubmitted(false);
      return;
    }

    setSubmitted(true);
    setIsGenderOpen(false);
    setFormData({ name: "", email: "", phone: "", gender: "", address: "" });
  };

  return (
    <div className="personal-form-page">
      <header className="personal-form-page__header">
        <button type="button" className="personal-form-page__header-back" onClick={() => navigate(-1)}>
          <IoIosArrowBack />
        </button>
        <h1>Personal Data</h1>
      </header>

      <div className="form-container">
        {submitted && <p className="success">Data saved successfully!</p>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Phone Number</label>
            <input
              type="tel"
              name="phone"
              placeholder="Enter your phone number"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Gender</label>
            <div
              className={`select-wrapper ${isGenderOpen ? "is-open" : ""} ${!formData.gender && submitted ? "is-invalid" : ""}`}
              ref={genderDropdownRef}
            >
              <button
                type="button"
                className="select-trigger"
                onClick={() => setIsGenderOpen((current) => !current)}
                aria-haspopup="listbox"
                aria-expanded={isGenderOpen}
              >
                <span>{formData.gender ? genderOptions.find((option) => option.value === formData.gender)?.label : "Select Gender"}</span>
              </button>

              {isGenderOpen && (
                <ul className="select-menu" role="listbox" aria-label="Gender options">
                  {genderOptions.map((option) => (
                    <li key={option.value}>
                      <button
                        type="button"
                        className={`select-option ${formData.gender === option.value ? "is-selected" : ""}`}
                        onClick={() => handleGenderSelect(option.value)}
                      >
                        {option.label}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          <div className="form-group">
            <label>Address</label>
            <textarea
              name="address"
              placeholder="Enter your address"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="form-submit-btn">Save Changes</button>
        </form>
        
      </div>
      <Navbar />

    </div>
    
    
  );
}

export default PersonalForm;