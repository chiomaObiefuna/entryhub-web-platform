import { useState, useEffect } from "react";
import "./PaymentComplete.css";
import { useNavigate } from 'react-router-dom';
import Dashboardlayout from "../Dashboard-Layout/DashboardLayout";


// READ BOOKING DATA FROM localStorage
// BookEvents.jsx saves: { quantity, price }  using JSON.stringify


function getBooking() {
  const data = JSON.parse(localStorage.getItem("ticketData") || "{}");
  return {
    quantity: data.quantity || 1,
    price:    data.price    || 15000,
  };
}

// ─────────────────────────────────────────────────────────────
// FLOATING LABEL INPUT
// ─────────────────────────────────────────────────────────────
function FloatInput({ label, value, onChange, type = "text", maxLength }) {
  const [focused, setFocused] = useState(false);
  const lifted = focused || value.length > 0;

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
  const navigate = useNavigate()

  /* ── Form state ── */
  const [fullName,   setFullName]   = useState("");
  const [email,      setEmail]      = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry,     setExpiry]     = useState("");
  const [cvv,        setCvv]        = useState("");

  /* ── Summary — read DIRECTLY from localStorage on every render ──────────
     No useState/useEffect for ticket data — read raw on each render so
     it ALWAYS reflects what BookEvents / EventDetails last saved.
     This is the most reliable way across all routing strategies.       */
  const _raw        = JSON.parse(localStorage.getItem("ticketData") || "{}");
  const tickets     = Number(_raw.quantity) || 1;
  const ticketPrice = Number(_raw.price)    || 15000;
  const total       = tickets * ticketPrice;
  const payAmount   = total;

  // Pre-fill name & email from EventDetails if available (run once on mount)
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("ticketData") || "{}");
    if (data.fullName && !fullName) setFullName(data.fullName);
    if (data.email    && !email)    setEmail(data.email);
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
    if (!fullName.trim())                          { alert("Please enter your full name.");           return; }
    if (cardNumber.replace(/\s/g,"").length < 16)  { alert("Enter a valid 16-digit card number.");   return; }
    if (expiry.length < 5)                         { alert("Enter a valid expiry date (MM/YY).");     return; }
    if (cvv.length < 3)                            { alert("Enter a valid CVV.");                     return; }
    alert(`✅ Payment of ₦${total.toLocaleString()} confirmed!\n\nThank you, ${fullName.trim()}.`);
  };

  const fmt = (n) => "₦" + n.toLocaleString();

  /* ── Render ── */
  return (
    <Dashboardlayout title="PaymentComplete">

   
    <div className="page-bg">
      <div className="page-inner">

        {/* Page heading */}
        
        {/* Main card */}
        <div className="card">


          {/* "Card Details" subtitle */}
          <p className="card-details-label">Card Details</p>

          {/* ── SECTION 1: Personal Information (card) ── */}
          <h2 className="section-heading">Personal Information</h2>

          <div className="fields-stack">

            {/* Full Name */}
            <FloatInput
              label="Full Name"
              value={fullName}
              onChange={e => setFullName(e.target.value)}
            />

            {/* Card Number */}
            <FloatInput
              label="Card Number"
              value={cardNumber}
              onChange={handleCard}
              maxLength={19}
            />

            {/* Expiry + CVV side by side */}
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

          </div>{/* /fields-stack */}

          {/* ── OR divider ── */}
          <div className="or-divider">
            <span className="or-line" />
            <span className="or-text">or</span>
            <span className="or-line" />
          </div>

          {/* ── SECTION 2: Personal Information (alt methods) ── */}
          <h2 className="section-heading">Personal Information</h2>

          <div className="alt-methods">

            {/* Bank Transfer */}
            <button className="method-row" onClick={() =>{ navigate("/bankdetails");
               alert("Bank Transfer selected")}}>
              <span className="method-lhs">
                {/* Pillared bank building icon */}
                <svg className="method-ico" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="1.75"
                  strokeLinecap="round" strokeLinejoin="round">
                  <line x1="3"  y1="22" x2="21" y2="22"/>
                  <line x1="6"  y1="18" x2="6"  y2="11"/>
                  <line x1="10" y1="18" x2="10" y2="11"/>
                  <line x1="14" y1="18" x2="14" y2="11"/>
                  <line x1="18" y1="18" x2="18" y2="11"/>
                  <polygon points="12 2 20 7 4 7"/>
                </svg>
                Bank Transfer
              </span>
              <svg className="chev-r" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2.5"
                strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6"/>
              </svg>
            </button>

            
            {/* Bitcoin Wallet */}
            <button className="method-row" onClick={() => alert("Bitcoin Wallet selected")}>
              <span className="method-lhs">
                {/* Bitcoin ₿ icon */}
                <svg className="method-ico" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="1.75"
                  strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9.5 2H14a3.5 3.5 0 0 1 0 7H9.5V2z"/>
                  <path d="M9.5 9H15a3.5 3.5 0 0 1 0 7H9.5V9z"/>
                  <line x1="6"   y1="2"   x2="9.5"  y2="2"/>
                  <line x1="6"   y1="9"   x2="9.5"  y2="9"/>
                  <line x1="6"   y1="16"  x2="9.5"  y2="16"/>
                  <line x1="6"   y1="2"   x2="6"    y2="16"/>
                  <line x1="7.5" y1="0.5" x2="7.5"  y2="2"/>
                  <line x1="11"  y1="0.5" x2="11"   y2="2"/>
                  <line x1="7.5" y1="16"  x2="7.5"  y2="17.5"/>
                  <line x1="11"  y1="16"  x2="11"   y2="17.5"/>
                </svg>
                Bitcoin Wallet
              </span>
              <svg className="chev-r" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2.5"
                strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6"/>
              </svg>
            </button>

          </div>{/* /alt-methods */}

          {/* ── Ticket summary ── */}
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

          {/* ── Footer buttons ── */}
          <div className="footer-row">
            <button className="btn btn-home" onClick={() => window.scrollTo(0, 0)}>
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2.4"
                strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                <polyline points="9 22 9 12 15 12 15 22"/>
              </svg>
              Home
            </button>

            <button className="btn btn-pay" onClick={handlePay}>
              Pay – {fmt(payAmount)}
            </button>
          </div>

        </div>{/* /card */}
      </div>
    </div>

     </Dashboardlayout>
  );
}