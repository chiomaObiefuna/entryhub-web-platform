import { useState } from "react";
import "./DetailsEvents.css";
import { useNavigate, useLocation } from 'react-router-dom';

// ─────────────────────────────────────────────────────────────
// PAYMENT METHOD ROW COMPONENT
// ─────────────────────────────────────────────────────────────
function PayMethod({ icon, label, selected, onClick }) {
  return (
    <button
      className={`pay-row${selected ? " pay-selected" : ""}`}
      onClick={onClick}
      type="button"
    >
      <span className="pay-ico">{icon}</span>
      <span className="pay-lbl">{label}</span>
      <svg className="pay-chev" width="9" height="15" viewBox="0 0 9 15"
        fill="none" stroke="currentColor" strokeWidth="2.2"
        strokeLinecap="round" strokeLinejoin="round">
        <polyline points="1 1 8 7.5 1 14"/>
      </svg>
    </button>
  );
}

// ─────────────────────────────────────────────────────────────
// MAIN COMPONENT — DetailsEvents
// ─────────────────────────────────────────────────────────────
const DetailsEvents = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const movie = location.state?.movie;

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [payMethod, setPayMethod] = useState("");
  const [toast, setToast] = useState({ show: false, msg: "" });

  const stored = JSON.parse(localStorage.getItem("ticketData") || "{}");
  const quantity = stored.quantity || 1;
  const ticketPrice = stored.price || 15000;
  const totalAmount = quantity * ticketPrice;
  const sector = stored.sector || "107";
  const row = stored.row || "4";
  const ticketType = stored.ticketType || "Cinema";
  const seat = stored.seat || "7";

  const showToast = (msg) => {
    setToast({ show: true, msg });
    setTimeout(() => setToast({ show: false, msg: "" }), 2600);
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href).catch(() => {});
    showToast("Link copied to clipboard!");
  };

  const handleProceed = () => {
    if (!fullName.trim()) return showToast("Please enter your full name.");
    if (!email.trim()) return showToast("Please enter your email address.");
    if (!payMethod) return showToast("Please choose a payment method.");

    localStorage.setItem("ticketData", JSON.stringify({
      ...stored,
      fullName: fullName.trim(),
      email: email.trim(),
      payMethod,
      total: totalAmount
    }));

    // Navigate to specific payment pages based on selection
    if (payMethod === "Bank Transfer") navigate("/bankdetails", { state: { movie } });
    else if (payMethod === "New Card") navigate("/completePayment", { state: { movie } });
    else showToast("Bitcoin payment integration coming soon!");
  };

  if (!movie) {
    return (
      <div style={{ padding: "50px", textAlign: "center" }}>
        <p>No event selected. Please start over.</p>
        <button className="ed-btn ed-btn-home" onClick={() => navigate("/")}>Go to Home</button>
      </div>
    );
  }

  const BankIcon = (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><line x1="3" y1="22" x2="21" y2="22"/><line x1="6" y1="18" x2="6" y2="11"/><line x1="10" y1="18" x2="10" y2="11"/><line x1="14" y1="18" x2="14" y2="11"/><line x1="18" y1="18" x2="18" y2="11"/><polygon points="12 2 20 7 4 7"/></svg>);
  const BitcoinIcon = (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M9.5 2H14a3.5 3.5 0 0 1 0 7H9.5V2z"/><path d="M9.5 9H15a3.5 3.5 0 0 1 0 7H9.5V9z"/><line x1="9.5" y1="2" x2="9.5" y2="22"/><line x1="7" y1="2" x2="12" y2="2"/><line x1="7" y1="22" x2="12" y2="22"/></svg>);
  const CardIcon = (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>);

  return (
    <div className="details-events-content">  
      <div className="ed-event-row">
        <div className="poster-wrap">
          <img 
            /* ✅ FIXED: Pathing logic for assets in public folder */
            src={movie.image.startsWith('http') ? movie.image : `/assets/${movie.image.split('/').pop()}`} 
            alt={movie.title} 
            style={{ width: '90px', height: '112px', borderRadius: '6px', objectFit: 'cover' }} 
          />
        </div>

        <div className="ed-event-info">
          <p className="ed-ev-title">{movie.title}</p>
          <p className="ed-ev-cat">{movie.category || "Cinema"}</p>
          <p className="ed-ev-date">{movie.date || "30th March, 2026"} / 5:00 Pm</p>
          <p className="ed-ev-loc">📍 {movie.location || "Abuja"}</p>
        </div>

        <div className="ed-ev-icons">
          <button className="ed-icon-btn" onClick={() => setLiked(!liked)}>
            <svg width="22" height="20" viewBox="0 0 24 22" fill={liked ? "#f5a623" : "none"} stroke={liked ? "#f5a623" : "#bbb"} strokeWidth="2">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
            </svg>
          </button>
          <div className="ed-icons-bottom">
            <button className="ed-icon-btn" onClick={handleShare}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth="2"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg></button>
            <button className="ed-icon-btn" onClick={() => setSaved(!saved)}><svg width="15" height="20" viewBox="0 0 24 28" fill={saved ? "#f5a623" : "none"} stroke={saved ? "#f5a623" : "#bbb"} strokeWidth="2"><path d="M19 27l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg></button>
          </div>
        </div>
      </div>

      <h2 className="ed-sec-title">Ticket Details</h2>
      <div className="ed-chips-row">
        <div className="ed-chip"><span className="ed-chip-lbl">Tickets</span><span className="ed-chip-val">{quantity}</span></div>
        <div className="ed-chip"><span className="ed-chip-lbl">Sector</span><span className="ed-chip-val">{sector}</span></div>
        <div className="ed-chip"><span className="ed-chip-lbl">Row</span><span className="ed-chip-val">{row}</span></div>
        <div className="ed-chip"><span className="ed-chip-lbl">Type</span><span className="ed-chip-val">{ticketType}</span></div>
        <div className="ed-chip"><span className="ed-chip-lbl">Seat</span><span className="ed-chip-val">{seat}</span></div>
        <div className="ed-chip"><span className="ed-chip-lbl">Price</span><span className="ed-chip-val">₦{ticketPrice.toLocaleString()}</span></div>
        <button className="ed-chip-x" onClick={() => navigate(-1)}>×</button>
      </div>

      <div className="ed-total-row">
        <span className="ed-total-lbl">Total Amount</span>
        <span className="ed-total-val">₦{totalAmount.toLocaleString()}</span>
      </div>

      <h2 className="ed-sec-title">Personal Information</h2>
      <div className="ed-fields">
        <div className="ed-field"><label className="ed-field-lbl">Full Name</label><input className="ed-field-input" type="text" value={fullName} onChange={e => setFullName(e.target.value)} placeholder="Enter full name" /></div>
        <div className="ed-field"><label className="ed-field-lbl">Email</label><input className="ed-field-input" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Enter email" /></div>
      </div>

      <h2 className="ed-sec-title">Choose Payment Method</h2>
      <div className="ed-methods">
        <PayMethod icon={BankIcon} label="Bank Transfer" selected={payMethod === "Bank Transfer"} onClick={() => setPayMethod("Bank Transfer")} />
        <PayMethod icon={BitcoinIcon} label="Bitcoin Wallet" selected={payMethod === "Bitcoin Wallet"} onClick={() => setPayMethod("Bitcoin Wallet")} />
        <PayMethod icon={CardIcon} label="New Card" selected={payMethod === "New Card"} onClick={() => setPayMethod("New Card")} />
      </div>

      <div className="ed-footer">
        <button className="ed-btn ed-btn-home" onClick={() => navigate("/")}>Home</button>
        <button className="ed-btn ed-btn-proceed" onClick={handleProceed}>Proceed To Payment</button>
      </div>

      {toast.show && <div className="ed-toast show" role="status">{toast.msg}</div>}
    </div>
  );
};

export default DetailsEvents;