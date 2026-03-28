import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Dashboardlayout from "../Dashboard-Layout/DashboardLayout";
import "./TicketResales.css";

const POSTER_URL = "https://image.tmdb.org/t/p/w780/mYLOqiStMxDK3fYZFirgrMt8z5d.jpg";

const TicketResales = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    accountNumber: "",
    bankName: ""
  });

  // ✅ 1. VALIDATION LOGIC (Placed inside component, before return)
  const isFormValid = 
    formData.fullName.trim() !== "" && 
    formData.email.trim() !== "" && 
    formData.phone.trim() !== "" &&
    formData.accountNumber.trim().length >= 10 && 
    formData.bankName !== "";

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const banks = ["Access Bank", "First Bank", "GTBank", "Kuda Bank", "MoniePoint", "Opay", "Zenith Bank"];

  return (
    <Dashboardlayout title={currentStep === 2 ? "Check out" : "Ticket Resale"}>
      <div className="resale-page-wrapper">
        
        {/* STEP 1: LANDING */}
        {currentStep === 1 && (
          <div className="step-container animate-in">
            <div className="hero-poster-container">
              <img src={POSTER_URL} alt="Movie Poster" className="poster-fit" />
            </div>
            <div className="details-white-card">
              <div className="details-text-side">
                <h2 className="t-type">VIP Ticket <span className="resale-pill">Resale</span></h2>
                <p className="price-main">₦28,000</p>
                <p className="price-orig">Original : <span>₦30,000</span></p>
              </div>
              <button className="orange-btn" onClick={() => setCurrentStep(2)}>Sale Ticket</button>
            </div>
          </div>
        )}

        {/* STEP 2: CHECKOUT */}
        {currentStep === 2 && (
          <div className="step-container animate-in">
            <div className="gray-group-box">
              <p className="summary-title">Summary</p>
              <div className="s-line"><span>Price</span> <span>₦28,000</span></div>
              <div className="s-total"><span>Total</span> <span>₦27,600</span></div>
            </div>

            <div className="gray-group-box">
              <div className="input-row">
                <label>Full Name</label>
                <input name="fullName" type="text" placeholder="Your Name" value={formData.fullName} onChange={handleInputChange} />
              </div>
              <div className="input-row">
                <label>Email Address</label>
                <input name="email" type="email" placeholder="email@example.com" value={formData.email} onChange={handleInputChange} />
              </div>
              <div className="input-row">
                <label>Phone Number</label>
                <input name="phone" type="tel" placeholder="+234..." value={formData.phone} onChange={handleInputChange} />
              </div>
            </div>

            <div className="gray-group-box">
              <div className="input-row">
                <label>Account Number</label>
                <input name="accountNumber" type="text" placeholder="Account Number" value={formData.accountNumber} onChange={handleInputChange} />
              </div>
              <div className="input-row">
                <label>Bank Name</label>
                <select name="bankName" value={formData.bankName} onChange={handleInputChange} className="bank-select">
                  <option value="">Select Bank</option>
                  {banks.map(bank => <option key={bank} value={bank}>{bank}</option>)}
                </select>
              </div>
            </div>

            {/* ✅ 2. THE LOCKED BUTTON (Inside Step 2) */}
            <button 
              className="orange-btn-full" 
              onClick={() => setCurrentStep(3)}
              disabled={!isFormValid}
              style={{ 
                opacity: isFormValid ? 1 : 0.5, 
                cursor: isFormValid ? "pointer" : "not-allowed",
                marginTop: "20px"
              }}
            >
              Proceed to Payment
            </button>

            {!isFormValid && (
              <p style={{ color: "#d9534f", fontSize: "12px", marginTop: "10px", textAlign: "center", fontWeight: "600" }}>
                * Fill all details (10-digit Account No.) to proceed.
              </p>
            )}
          </div>
        )}
        
        {/* STEP 3: SUCCESS */}
        {currentStep === 3 && (
          <div className="success-screen animate-in">
            <div className="success-icon-green">✓</div>
            <h2>Successfully Listed!</h2>
            <button className="orange-btn-full" onClick={() => navigate("/")}>Go Home</button>
          </div>
        )}

      </div>
    </Dashboardlayout>
  );
};

export default TicketResales;