import { useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import { IoHeartOutline, IoShareSocialOutline, IoBookmarkOutline, IoArrowBack, IoHomeOutline, IoChevronForward } from "react-icons/io5";
import "./DetailsEvents.css";

const DetailsEvents = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [eventData, setEventData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [payMethod, setPayMethod] = useState("");

  const stored = JSON.parse(localStorage.getItem("ticketData") || "{}");
  const { 
    quantity = 1, 
    price = 15000, 
    sector = "107", 
    row = "4", 
    ticketType = "Cinema", 
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
    if (!fullName.trim() || !email.trim() || !payMethod) return;
    localStorage.setItem("ticketData", JSON.stringify({ ...stored, fullName, email, payMethod }));
    payMethod === "bank" ? navigate("/bankdetails") : navigate(`/payment/${id}`);
  };

  if (loading) return <div className="ed-loading">Loading...</div>;

  return (
    <div className="ed-main-wrapper">
      <div className="ed-content-body">
        {/* --- Back Button --- */}
        <button className="bank-back-btn" onClick={() => navigate(-1)}>
          <IoArrowBack /> Back
        </button>

        {/* --- Event Banner --- */}
        <div className="ed-banner-row">
          <div className="poster-wrap">
             <img src={eventData?.image || "https://via.placeholder.com/300"} alt="Poster" />
          </div>

          <div className="ed-event-info">
            <p className="ed-ev-title">{eventData?.title || "Black Panther"}</p>
            <p className="ed-ev-cat">cinema</p>
            <p className="ed-ev-date-orange">30th March, 2026 / 5:00 Pm</p>
            <p className="ed-ev-loc-gray">📍 Lagos</p>
          </div>

          <div className="ed-ev-icons">
             <IoHeartOutline className="ed-ico-orange" />
             <IoShareSocialOutline />
             <IoBookmarkOutline className="ed-ico-orange" />
          </div>
        </div>

        {/* --- Ticket Details --- */}
        <h2 className="ed-sec-title">Ticket Details</h2>
        <div className="ed-summary-grid">
          <div className="ed-sum-pill"><span className="ed-sum-lbl">Tickets</span><span className="ed-sum-val">{quantity}</span></div>
          <div className="ed-sum-pill"><span className="ed-sum-lbl">Sector</span><span className="ed-sum-val">{sector}</span></div>
          <div className="ed-sum-pill"><span className="ed-sum-lbl">Row</span><span className="ed-sum-val">{row}</span></div>
          <div className="ed-sum-pill"><span className="ed-sum-lbl">Type</span><span className="ed-sum-val">{ticketType}</span></div>
          <div className="ed-sum-pill"><span className="ed-sum-lbl">Seat</span><span className="ed-sum-val">{seat}</span></div>
          <div className="ed-sum-pill"><span className="ed-sum-lbl">Price</span><span className="ed-sum-val">₦{price.toLocaleString()}</span></div>
        </div>

        <div className="ed-total-row-inline">
          <span className="ed-total-lbl">Total Amount</span>
          <span className="ed-total-price">₦{totalAmount.toLocaleString()}</span>
        </div>

        {/* --- Personal Info --- */}
        <h2 className="ed-sec-title">Personal Information</h2>
        <div className="ed-input-stack">
          <div className="ed-input-group">
            <label>Full Name</label>
            <input type="text" placeholder="Full name" value={fullName} onChange={e => setFullName(e.target.value)} />
          </div>
          <div className="ed-input-group">
            <label>Email</label>
            <input type="email" placeholder="example@gmail.com" value={email} onChange={e => setEmail(e.target.value)} />
          </div>
        </div>

        {/* --- Payment Methods --- */}
        <h2 className="ed-sec-title">Choose Payment Method</h2>
        <div className="ed-methods-stack">
          <div className={`pay-row ${payMethod === "bank" ? "selected" : ""}`} onClick={() => setPayMethod("bank")}>
            <span className="pay-left-content">🏛️ Bank Transfer</span>
            <IoChevronForward className="pay-chev" />
          </div>
          <div className={`pay-row ${payMethod === "card" ? "selected" : ""}`} onClick={() => setPayMethod("card")}>
            <span className="pay-left-content">💳 New Card</span>
            <IoChevronForward className="pay-chev" />
          </div>
        </div>

        {/* --- Footer Buttons --- */}
        <div className="ed-footer-combined">
          <button className="ed-btn-home" onClick={() => navigate("/")}>
            <IoHomeOutline /> Home
          </button>
          <button className="ed-btn-proceed" onClick={handleProceed}>
            Proceed To Payment
          </button>
        </div>
      </div>
    </div>
  );
};

export default DetailsEvents;