import { useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import Dashboardlayout from "../Dashboard-Layout/DashboardLayout";
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
  const { id } = useParams(); // Gets the ID from the URL

  // ── API & Event State ──
  const [eventData, setEventData] = useState(null);
  const [loading, setLoading] = useState(true);

  // ── Personal info state (Starting Blank) ──
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");

  // ── UI interaction state ──
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [payMethod, setPayMethod] = useState("");
  const [toast, setToast] = useState({ show: false, msg: "" });

  // ── Read ticket data from localStorage (passed from BookEvents) ──
  const stored = JSON.parse(localStorage.getItem("ticketData") || "{}");
  const quantity = stored.quantity || 1;
  const ticketPrice = stored.price || 0;
  const totalAmount = quantity * ticketPrice;
  const sector = stored.sector || "N/A";
  const row = stored.row || "N/A";
  const ticketType = stored.ticketType || "Standard";
  const seat = stored.seat || "N/A";

  // Fetch specific event details from your API
  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await fetch(`https://eventhub-backend-pxoz.onrender.com/api/events/${id}`);
        const data = await res.json();
        setEventData(data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching payment event details:", err);
        setLoading(false);
      }
    };
    if (id) fetchEvent();
  }, [id]);

  const showToast = (msg) => {
    setToast({ show: true, msg });
    setTimeout(() => setToast({ show: false, msg: "" }), 2600);
  };

  const handleProceed = () => {
    if (!fullName.trim()) return showToast("Please enter your full name.");
    if (!email.trim()) return showToast("Please enter your email.");
    if (!payMethod) return showToast("Please choose a payment method.");

    // Update localStorage with final user choices
    localStorage.setItem("ticketData", JSON.stringify({
      ...stored,
      fullName: fullName.trim(),
      email: email.trim(),
      payMethod,
      eventTitle: eventData?.title
    }));

    navigate("/completePayment");
  };

  if (loading) return <Dashboardlayout title="Loading..."><div className="ed-loading">Preparing checkout...</div></Dashboardlayout>;

  return (
    <Dashboardlayout title="Checkout Details">
      <div className="ed-page">
        <div className="ed-card">
          
          {/* ── Dynamic Event Header ── */}
          <div className="ed-event-row">
            <div className="poster-wrap">
               <img 
                 src={eventData?.image || "https://via.placeholder.com/300"} 
                 alt={eventData?.title} 
                 className="ed-dynamic-img"
                 style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '12px' }}
               />
            </div>

            <div className="ed-event-info">
              <p className="ed-ev-title">{eventData?.title || "Unknown Event"}</p>
              <p className="ed-ev-cat">{eventData?.category || "Cinema"}</p>
              <p className="ed-ev-date">
                {eventData?.date ? new Date(eventData.date).toDateString() : "Date Pending"}
              </p>
              <p className="ed-ev-loc">📍 {eventData?.location || "Venue Pending"}</p>
            </div>

            <div className="ed-ev-icons">
              <button className="ed-icon-btn" onClick={() => setLiked(!liked)}>
                <svg width="22" height="20" viewBox="0 0 24 22" fill={liked ? "#f5a623" : "none"} stroke={liked ? "#f5a623" : "#bbb"} strokeWidth="2">
                   <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                </svg>
              </button>
            </div>
          </div>

          <h2 className="ed-sec-title">Booking Summary</h2>
          <div className="ed-chips-row">
            <div className="ed-chip"><span className="ed-chip-lbl">Tickets</span><span className="ed-chip-val">{quantity}</span></div>
            <div className="ed-chip"><span className="ed-chip-lbl">Seat</span><span className="ed-chip-val">{seat}</span></div>
            <div className="ed-chip"><span className="ed-chip-lbl">Price</span><span className="ed-chip-val">₦{ticketPrice.toLocaleString()}</span></div>
          </div>

          <div className="ed-total-row">
            <span className="ed-total-lbl">Total Amount</span>
            <span className="ed-total-val">₦{totalAmount.toLocaleString()}</span>
          </div>

          <h2 className="ed-sec-title">Personal Information</h2>
          <div className="ed-fields">
            <div className="ed-field">
              <label className="ed-field-lbl">Full Name</label>
              <input className="ed-field-input" type="text" value={fullName} onChange={e => setFullName(e.target.value)} placeholder="Type your full name" />
            </div>
            <div className="ed-field">
              <label className="ed-field-lbl">Email Address</label>
              <input className="ed-field-input" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Type your email" />
            </div>
          </div>

          <h2 className="ed-sec-title">Choose Payment Method</h2>
          <div className="ed-methods">
            <PayMethod label="Bank Transfer" selected={payMethod === "Bank Transfer"} onClick={() => setPayMethod("Bank Transfer")} />
            <PayMethod label="Credit Card" selected={payMethod === "Credit Card"} onClick={() => setPayMethod("Credit Card")} />
          </div>

          <div className="ed-footer">
            <button className="ed-btn ed-btn-home" onClick={() => navigate("/")}>Home</button>
            <button className="ed-btn ed-btn-proceed" onClick={handleProceed}>Proceed To Payment</button>
          </div>
        </div>

        <div className={`ed-toast${toast.show ? " show" : ""}`}>{toast.msg}</div>
      </div>
    </Dashboardlayout>
  );
};

export default DetailsEvents; 