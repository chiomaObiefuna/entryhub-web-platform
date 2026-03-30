import { useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import "./DetailsEvents.css";

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
      <div className="pay-left">
        <span className="pay-ico">{icon}</span>
        <span className="pay-lbl">{label}</span>
      </div>
      <span className="pay-chev">›</span>
    </button>
  );
}

const DetailsEvents = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [eventData, setEventData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Figma Default values
  const [fullName, setFullName] = useState("Korede Bello");
  const [email, setEmail] = useState("koredebello4life@gmail.com");
  const [payMethod, setPayMethod] = useState("");
  const [toast, setToast] = useState({ show: false, msg: "" });

  const stored = JSON.parse(localStorage.getItem("ticketData") || "{}");
  const { 
    quantity = 1, 
    price = 30000, 
    sector = "107", 
    row = "4", 
    ticketType = "cinema", 
    seat = "7" 
  } = stored;

  const totalAmount = quantity * price;

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await fetch(`https://eventhub-backend-pxoz.onrender.com/api/events/${id}`);
        const data = await res.json();
        setEventData(data);
        setLoading(false);
      } catch (err) {
        setLoading(false);
      }
    };
    if (id) fetchEvent();
  }, [id]);

  const handleProceed = () => {
    if (!fullName.trim() || !email.trim() || !payMethod) {
      setToast({ show: true, msg: "Please complete all fields" });
      setTimeout(() => setToast({ show: false, msg: "" }), 2000);
      return;
    }
    navigate("/completePayment");
  };

  if (loading) return <div className="ed-loading">Preparing checkout...</div>;

  return (
    <div className="details-events-content">
      <h1 className="ed-main-page-title">Event Details</h1>
      
      <div className="ed-card">
        
        {/* ── Event Header (White Banner) ── */}
        <div className="ed-event-row">
          <div className="poster-wrap">
             <img src={eventData?.image || "https://via.placeholder.com/300"} alt="Poster" />
          </div>

          <div className="ed-event-info">
            <p className="ed-ev-title">{eventData?.title || "Shelter in Cinema Now"}</p>
            <p className="ed-ev-cat">Cinema</p>
            <p className="ed-ev-date-orange">30th March, 2026 / 5:00 Pm</p>
            <p className="ed-ev-loc-gray">📍 Abuja</p>
          </div>

          <div className="ed-ev-icons">
             <span className="heart-icon-orange">🧡</span>
             <div className="bottom-icons-group">
                <span>🔗</span>
                <span className="bookmark-icon-orange">🔖</span>
             </div>
          </div>
        </div>

        {/* ── Ticket Details Summary Bar ── */}
        <h2 className="ed-sec-title">Ticket Details</h2>
        <div className="ed-summary-bar">
          <div className="ed-sum-item">
            <span className="ed-sum-lbl">Number of tickets</span>
            <span className="ed-sum-val">{quantity}</span>
          </div>
          <div className="ed-sum-item">
            <span className="ed-sum-lbl">Sector</span>
            <span className="ed-sum-val">{sector}</span>
          </div>
          <div className="ed-sum-item">
            <span className="ed-sum-lbl">Row</span>
            <span className="ed-sum-val">{row}</span>
          </div>
          <div className="ed-sum-item">
            <span className="ed-sum-lbl">Ticket type</span>
            <span className="ed-sum-val">{ticketType}</span>
          </div>
          <div className="ed-sum-item">
            <span className="ed-sum-lbl">Seat</span>
            <span className="ed-sum-val">{seat}</span>
          </div>
          <div className="ed-sum-item last">
            <span className="ed-sum-lbl">Price</span>
            <span className="ed-sum-val">₦{price.toLocaleString()}</span>
          </div>
          <button className="ed-sum-close">✕</button>
        </div>

        <div className="ed-total-display">
          <span className="ed-total-lbl">Total Amount</span>
          <span className="ed-total-price">₦{totalAmount.toLocaleString()}</span>
        </div>

        {/* ── Personal Information ── */}
        <h2 className="ed-sec-title">Personal Information</h2>
        <div className="ed-input-stack">
          <div className="ed-input-group">
            <label>Full Name</label>
            <input type="text" value={fullName} onChange={e => setFullName(e.target.value)} />
          </div>
          <div className="ed-input-group">
            <label>Email</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
          </div>
        </div>

        {/* ── Payment Methods ── */}
        <h2 className="ed-sec-title">Choose Payment Method</h2>
        <div className="ed-methods-list">
          <PayMethod icon="🏛️" label="Bank Transfer" selected={payMethod === "bank"} onClick={() => setPayMethod("bank")} />
          <PayMethod icon="₿" label="Bitcoin Wallet" selected={payMethod === "crypto"} onClick={() => setPayMethod("crypto")} />
          <PayMethod icon="💳" label="New Card" selected={payMethod === "card"} onClick={() => setPayMethod("card")} />
        </div>

        {/* ── Action Buttons ── */}
        <div className="ed-footer">
          <button className="ed-btn ed-btn-home" onClick={() => navigate("/")}>🏠 Home</button>
          <button className="ed-btn ed-btn-proceed" onClick={handleProceed}>Proceed To Payment</button>
        </div>
      </div>

      {toast.show && <div className="ed-toast show">{toast.msg}</div>}
    </div>
  );
};

export default DetailsEvents;