import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { IoArrowBack, IoLibraryOutline, IoChevronForward } from "react-icons/io5";
import "./PaymentComplete.css";

function FloatInput({ label, value, onChange, type = "text", maxLength }) {
  const [focused, setFocused] = useState(false);
  return (
    <div className={`float-wrap ${focused ? "focused" : ""}`}>
      <label className="float-label">{label}</label>
      <input
        className="float-input"
        type={type}
        value={value}
        maxLength={maxLength}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        autoComplete="off"
      />
    </div>
  );
}

export default function PaymentComplete() {
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [fullName, setFullName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");

  const _raw = JSON.parse(localStorage.getItem("ticketData") || "{}");
  const tickets = Number(_raw.quantity) || 1;
  const total = tickets * (Number(_raw.price) || 15000);

  const handleCard = (e) => {
    const raw = e.target.value.replace(/\D/g, "").slice(0, 16);
    const groups = raw.match(/.{1,4}/g);
    setCardNumber(groups ? groups.join(" ") : raw);
  };

  const handleExpiry = (e) => {
    let raw = e.target.value.replace(/\D/g, "");
    if (raw.length > 2) raw = raw.slice(0, 2) + "/" + raw.slice(2, 4);
    setExpiry(raw);
  };

 const handlePay = () => {
  if (!fullName || cardNumber.length < 19 || !expiry || cvv.length < 3) {
    toast.error("Please fill in all card details correctly");
    return;
  }

  setIsProcessing(true);
  const loadingToast = toast.loading("Verifying with Bank...");

  setTimeout(() => {
    toast.dismiss(loadingToast);
    
    // 1. Generate a mock token (In a real app, this comes from your database)
    const mockToken = "TKT-" + Math.random().toString(36).substr(2, 9).toUpperCase();
    
    // 2. Create the ticket object
    const newTicket = {
      qrToken: mockToken,
      seat: _raw.seat || "7",
      row: _raw.row || "4",
      eventTitle: _raw.eventTitle || "Black Panther",
      isUsed: false, // Important for ScanPage logic
      customerName: fullName
    };

    // 3. Save to the "mockTickets" array for the ScanPage to find
    const existingTickets = JSON.parse(localStorage.getItem("mockTickets") || "[]");
    localStorage.setItem("mockTickets", JSON.stringify([...existingTickets, newTicket]));

    toast.success("Payment Successful!");

    // 4. Navigate to the success screen, passing the token so we can "view" it
    navigate(`/completePayment?token=${mockToken}`);
  }, 2500);
};

  return (
    <div className="payment-complete-container">
      <div className="payment-content-body">
        <button className="bank-back-btn" onClick={() => navigate(-1)}>
          <IoArrowBack /> Back
        </button>

        <p className="secure-label">Secure Checkout</p>
        <h2 className="section-heading">Card Information</h2>

        <div className="fields-stack">
          <FloatInput label="Full Name" value={fullName} onChange={(e) => setFullName(e.target.value)} />
          <FloatInput label="Card Number" value={cardNumber} onChange={handleCard} maxLength={19} />
          <div className="row-half">
            <FloatInput label="MM/YY" value={expiry} onChange={handleExpiry} maxLength={5} />
            <FloatInput label="CVV" value={cvv} onChange={(e) => setCvv(e.target.value.replace(/\D/g, "").slice(0, 3))} type="password" />
          </div>
        </div>

        <div className="or-divider">
          <span className="or-line" />
          <span className="or-text">or pay with</span>
          <span className="or-line" />
        </div>

        <button className="method-row" onClick={() => navigate("/bankdetails")}>
          <span className="method-lhs">
            <IoLibraryOutline className="method-ico" />
            Bank Transfer
          </span>
          <IoChevronForward className="pay-chev" />
        </button>

        <div className="payment-footer-combined">
          <div className="summary-section">
            <div className="sum-item">
              <span className="sum-key">Tickets:</span>
              <span className="sum-val">{tickets}</span>
            </div>
            <div className="sum-item">
              <span className="sum-key">Total Payable:</span>
              <span className="sum-val orange">₦{total.toLocaleString()}</span>
            </div>
          </div>

          <div className="footer-actions">
            <button className="btn-cancel" onClick={() => navigate('/')}>Cancel</button>
            <button className="btn-pay-now" onClick={handlePay} disabled={isProcessing}>
              {isProcessing ? "Verifying..." : `Pay ₦${total.toLocaleString()}`}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}