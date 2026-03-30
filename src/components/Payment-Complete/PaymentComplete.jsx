import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import "./PaymentComplete.css";

// ─────────────────────────────────────────────────────────────
// FLOATING LABEL INPUT
// ─────────────────────────────────────────────────────────────
function FloatInput({ label, value, onChange, type = "text", maxLength }) {
  const [focused, setFocused] = useState(false);
  const lifted = focused || (value && value.toString().length > 0);

  return (
    <div className={`float-wrap${lifted ? " lifted" : ""}${focused ? " focused" : ""}`}>
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
        spellCheck={false}
      />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// MAIN COMPONENT — PaymentComplete
// ─────────────────────────────────────────────────────────────
export default function PaymentComplete() {
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);

  /* ── Form state ── */
  const [fullName, setFullName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");

  /* ── Summary Data ── */
  const _raw = JSON.parse(localStorage.getItem("ticketData") || "{}");
  const tickets = Number(_raw.quantity) || 1;
  const ticketPrice = Number(_raw.price) || 15000;
  const total = tickets * ticketPrice;

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("ticketData") || "{}");
    if (data.fullName && !fullName) setFullName(data.fullName);
  }, [fullName]);

  /* ── Input formatters ── */
  const handleCard = (e) => {
    const raw = e.target.value.replace(/\D/g, "").slice(0, 16);
    const groups = raw.match(/.{1,4}/g);
    setCardNumber(groups ? groups.join(" ") : raw);
  };

  const handleExpiry = (e) => {
    let raw = e.target.value.replace(/\D/g, "");
    if (raw.length > 2) {
      raw = raw.slice(0, 2) + "/" + raw.slice(2, 4);
    }
    setExpiry(raw);
  };

  const handleCvv = (e) => setCvv(e.target.value.replace(/\D/g, "").slice(0, 4));

  /* ── Validation + pay ── */
  const handlePay = () => {
    if (isProcessing) return;

    if (!fullName?.trim()) {
      toast.error("Please enter your full name.");
      return;
    }
    if (cardNumber.replace(/\s/g, "").length < 16) {
      toast.error("Enter a valid 16-digit card number.");
      return;
    }
    if (expiry.length < 5) {
      toast.error("Enter a valid expiry date (MM/YY).");
      return;
    }
    if (cvv.length < 3) {
      toast.error("Enter a valid CVV.");
      return;
    }

    setIsProcessing(true);
    const loadingToast = toast.loading("Processing payment...");

    // Simulated API call
    setTimeout(() => {
      toast.dismiss(loadingToast);
      toast.success(`✅ Payment of ₦${total.toLocaleString()} confirmed!`);
      
      // Navigate after success
      setTimeout(() => {
        setIsProcessing(false);
        navigate('/');
      }, 2000);
    }, 2500);
  };

  const fmt = (n) => "₦" + n.toLocaleString();

  return (
    <div className="payment-complete-container">
      <div className="payment-card">
        <p className="card-details-label">Secure Checkout</p>

        <h2 className="section-heading">Card Information</h2>

        <div className="fields-stack">
          <FloatInput
            label="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />

          <FloatInput
            label="Card Number"
            value={cardNumber}
            onChange={handleCard}
            maxLength={19}
          />

          <div className="row-half">
            <FloatInput
              label="MM/YY"
              value={expiry}
              onChange={handleExpiry}
              maxLength={5}
            />
            <FloatInput
              label="CVV"
              value={cvv}
              onChange={handleCvv}
              type="password"
              maxLength={4}
            />
          </div>
        </div>

        <div className="or-divider">
          <span className="or-line" />
          <span className="or-text">or pay with</span>
          <span className="or-line" />
        </div>

        <div className="alt-methods">
          <button className="method-row" onClick={() => navigate("/bankdetails")}>
            <span className="method-lhs">
              <svg className="method-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
                <line x1="3" y1="22" x2="21" y2="22"/><line x1="6" y1="18" x2="6" y2="11"/><line x1="10" y1="18" x2="10" y2="11"/><line x1="14" y1="18" x2="14" y2="11"/><line x1="18" y1="18" x2="18" y2="11"/><polygon points="12 2 20 7 4 7"/>
              </svg>
              Bank Transfer
            </span>
            <svg className="chev-r" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="9 18 15 12 9 6"/>
            </svg>
          </button>
        </div>

        <div className="summary">
          <div className="sum-row">
            <span className="sum-key">Items ({tickets})</span>
            <span className="sum-val">{fmt(total)}</span>
          </div>
        </div>

        <div className="footer-row">
          <button className="btn btn-home" onClick={() => navigate('/')} disabled={isProcessing}>
            Cancel
          </button>

          <button 
            className={`btn btn-pay ${isProcessing ? 'loading' : ''}`} 
            onClick={handlePay}
            disabled={isProcessing}
          >
            {isProcessing ? "Verifying..." : `Pay ${fmt(total)}`}
          </button>
        </div>
      </div>
    </div>
  );
}