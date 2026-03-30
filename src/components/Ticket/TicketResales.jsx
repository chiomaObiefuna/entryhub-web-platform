import { useState } from "react";
import { useNavigate } from "react-router-dom";
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

  // Price Logic
  const price = 28000;
  const serviceFee = 400;
  const totalPayout = price - serviceFee;

  const isFormValid = 
    formData.fullName.trim().length > 2 && 
    formData.email.includes("@") && 
    formData.phone.trim().length >= 10 &&
    formData.accountNumber.trim().length === 10 && 
    formData.bankName !== "";

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    // Prevent non-numeric characters for specific fields
    if ((name === "accountNumber" || name === "phone") && !/^\d*$/.test(value)) {
      return;
    }
    
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const banks = ["Access Bank", "First Bank", "GTBank", "Kuda Bank", "MoniePoint", "Opay", "Zenith Bank"];

  const formatNGN = (val) => "₦" + val.toLocaleString();

  return (
    <div className="resale-page-wrapper">
      
      {/* STEP 1: PREVIEW */}
      {currentStep === 1 && (
        <div className="step-container animate-in">
          <div className="hero-poster-container">
            <img src={POSTER_URL} alt="Event" className="poster-fit" />
          </div>
          <div className="details-white-card">
            <div className="details-text-side">
              <h2 className="t-type">VIP Ticket <span className="resale-pill">Resale</span></h2>
              <p className="price-main">{formatNGN(price)}</p>
              <p className="price-orig">Market Value: <span>{formatNGN(30000)}</span></p>
            </div>
            <button className="orange-btn" onClick={() => setCurrentStep(2)}>List for Sale</button>
          </div>
        </div>
      )}

      {/* STEP 2: FORM & ACCOUNT DETAILS */}
      {currentStep === 2 && (
        <div className="step-container animate-in">
          <div className="gray-group-box">
            <p className="summary-title">Payout Summary</p>
            <div className="s-line"><span>Listing Price</span> <span>{formatNGN(price)}</span></div>
            <div className="s-line fee"><span>Service Fee</span> <span>-{formatNGN(serviceFee)}</span></div>
            <div className="s-total"><span>You Receive</span> <span>{formatNGN(totalPayout)}</span></div>
          </div>

          <div className="gray-group-box">
            <p className="input-group-label">Personal Info</p>
            <div className="input-row">
              <label>Full Name</label>
              <input name="fullName" type="text" placeholder="John Doe" value={formData.fullName} onChange={handleInputChange} />
            </div>
            <div className="input-row">
              <label>Email Address</label>
              <input name="email" type="email" placeholder="email@example.com" value={formData.email} onChange={handleInputChange} />
            </div>
            <div className="input-row">
              <label>Phone Number</label>
              <input name="phone" type="tel" maxLength={11} placeholder="080..." value={formData.phone} onChange={handleInputChange} />
            </div>
          </div>

          <div className="gray-group-box">
            <p className="input-group-label">Payment Destination</p>
            <div className="input-row">
              <label>Account Number (10 digits)</label>
              <input name="accountNumber" type="text" maxLength={10} placeholder="0123456789" value={formData.accountNumber} onChange={handleInputChange} />
            </div>
            <div className="input-row">
              <label>Bank Name</label>
              <select name="bankName" value={formData.bankName} onChange={handleInputChange} className="bank-select">
                <option value="">Select Bank</option>
                {banks.map(bank => <option key={bank} value={bank}>{bank}</option>)}
              </select>
            </div>
          </div>

          <div className="action-footer">
             <button 
              className={`orange-btn-full ${!isFormValid ? "disabled" : ""}`} 
              onClick={() => setCurrentStep(3)}
              disabled={!isFormValid}
            >
              Confirm Listing
            </button>
            <button className="text-link-btn" onClick={() => setCurrentStep(1)}>Go Back</button>
          </div>
        </div>
      )}
      
      {/* STEP 3: SUCCESS */}
      {currentStep === 3 && (
        <div className="success-screen animate-in">
          <div className="success-icon-green">✓</div>
          <h2 className="success-title">Successfully Listed!</h2>
          <p className="success-sub">We will notify you once a buyer is found.</p>
          <button className="orange-btn-full" onClick={() => navigate("/")}>Return Home</button>
        </div>
      )}

    </div>
  );
};

export default TicketResales;