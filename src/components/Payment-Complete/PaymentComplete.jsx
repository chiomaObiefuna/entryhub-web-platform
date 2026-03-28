import { useState, useEffect } from "react";
import "./PaymentComplete.css";
import { useNavigate } from 'react-router-dom';
import Dashboardlayout from "../Dashboard-Layout/DashboardLayout";
import toast, { Toaster } from "react-hot-toast"; // Added Toaster import

// ─────────────────────────────────────────────────────────────
// FLOATING LABEL INPUT
// ─────────────────────────────────────────────────────────────
function FloatInput({ label, value, onChange, type = "text", maxLength }) {
  const [focused, setFocused] = useState(false);
  const lifted = focused || (value && value.length > 0);

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

  /* ── Form state ── */
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
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
    if (data.email && !email) setEmail(data.email);
  }, []);

  /* ── Input formatters ── */
  const handleCard = (e) => {
    const raw = e.target.value.replace(/\D/g, "").slice(0, 16);
    setCardNumber(raw.match(/.{1,4}/g)?.join(" ") ?? raw);
  };

  const handleExpiry = (e) => {
    const raw = e.target.value.replace(/\D/g, "").slice(0, 4);
    setExpiry(raw.length > 2 ? raw.slice(0, 2) + "/" + raw.slice(2) : raw);
  };

  const handleCvv = (e) => setCvv(e.target.value.replace(/\D/g, "").slice(0, 4));

  /* ── Validation + pay ── */
  const handlePay = () => {
    if (!fullName || !fullName.trim()) {
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

    // Processing simulation
    const loadingToast = toast.loading("Processing payment...");

    setTimeout(() => {
      toast.dismiss(loadingToast);
      toast.success(`✅ Payment of ₦${total.toLocaleString()} confirmed!`, {
        duration: 5000,
      });
      
      // Optional: Navigate to a success page after payment
      // setTimeout(() => navigate('/success'), 2000);
    }, 2000);
  };

  const fmt = (n) => "₦" + n.toLocaleString();

  return (
    <Dashboardlayout title="PaymentComplete">
      {/* 1. THE TOASTER MUST BE HERE TO SHOW MESSAGES */}
      <Toaster position="top-center" reverseOrder={false} />

      <div className="card">
        <p className="card-details-label">Card Details</p>

        <h2 className="section-heading">Personal Information</h2>

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
              label="Exp. (MM/YY)"
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
          <span className="or-text">or</span>
          <span className="or-line" />
        </div>

        <h2 className="section-heading">Alternative Methods</h2>

        <div className="alt-methods">
          <button className="method-row" onClick={() => {
            toast.success("Redirecting to Bank Details...");
            setTimeout(() => navigate("/bankdetails"), 1000);
          }}>
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

          <button className="method-row" onClick={() => toast.error("Bitcoin payments are currently disabled.")}>
            <span className="method-lhs">
              <svg className="method-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
                <path d="M9.5 2H14a3.5 3.5 0 0 1 0 7H9.5V2z"/><path d="M9.5 9H15a3.5 3.5 0 0 1 0 7H9.5V9z"/><line x1="6" y1="2" x2="9.5" y2="2"/><line x1="6" y1="9" x2="9.5" y2="9"/><line x1="6" y1="16" x2="9.5" y2="16"/><line x1="6" y1="2" x2="6" y2="16"/><line x1="7.5" y1="0.5" x2="7.5" y2="2"/><line x1="11" y1="0.5" x2="11" y2="2"/><line x1="7.5" y1="16" x2="7.5" y2="17.5"/><line x1="11" y1="16" x2="11" y2="17.5"/>
              </svg>
              Bitcoin Wallet
            </span>
            <svg className="chev-r" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="9 18 15 12 9 6"/>
            </svg>
          </button>
        </div>

        <div className="summary">
          <div className="sum-row">
            <span className="sum-key">Tickets</span>
            <span className="sum-val">{tickets}</span>
          </div>
          <div className="sum-row">
            <span className="sum-key">Ticket Price</span>
            <span className="sum-val">{fmt(ticketPrice)}</span>
          </div>
          <div className="sum-row">
            <span className="sum-key">Total Amount</span>
            <span className="sum-val">{fmt(total)}</span>
          </div>
        </div>

        <div className="footer-row">
          <button className="btn btn-home" onClick={() => navigate('/')}>
            Home
          </button>

          <button className="btn btn-pay" onClick={handlePay}>
            Pay – {fmt(total)}
          </button>
        </div>
      </div>
    </Dashboardlayout>
  );
}