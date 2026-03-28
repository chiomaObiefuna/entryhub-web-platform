import { useState, useRef, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import Dashboardlayout from "../Dashboard-Layout/DashboardLayout"; 
import "./BookEvents.css";

const CINEMA_PLACEHOLDER = "https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=500";

const BookEvents = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Gets the ID from the URL (e.g. /event/69bea...)

  const [eventData, setEventData] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Booking States
  const [ticketQuantity, setTicketQuantity] = useState(1);
  const [ticketPrice, setTicketPrice] = useState(15000);
  const [sector, setSector] = useState("107");
  const [row, setRow] = useState("4");
  const [ticketType, setTicketType] = useState("Cinema");
  const [seat, setSeat] = useState("7");

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await fetch(`https://eventhub-backend-pxoz.onrender.com/api/events/${id}`);
        const data = await res.json();
        if (data) {
          setEventData(data);
          if (data.price) setTicketPrice(data.price);
        }
        setLoading(false);
      } catch (err) {
        console.error("Fetch error:", err);
        setLoading(false);
      }
    };
    if (id) fetchEvent();
  }, [id]);

  const totalAmount = ticketQuantity * ticketPrice;

  // Function to save data and navigate
  const handleBooking = () => {
    localStorage.setItem("ticketData", JSON.stringify({
      quantity: ticketQuantity,
      price: ticketPrice,
      sector,
      row,
      seat,
      ticketType,
      eventTitle: eventData?.title
    }));

    // ✅ CRITICAL FIX: Navigate to /eventDetails/ID instead of just /eventDetails
    navigate(`/eventDetails/${id}`);
  };

  return (
    <Dashboardlayout title="Book Event">
      <div className="page-bg">
        <div className="page-inner">
          <div className="card">
            
            {/* --- DYNAMIC HEADER --- */}
            <div className="event-row">
              <div className="poster-wrap">
                <img 
                  src={eventData?.image || CINEMA_PLACEHOLDER} 
                  alt="Poster" 
                  className="dynamic-poster-img"
                  onError={(e) => e.target.src = CINEMA_PLACEHOLDER}
                />
              </div>

              <div className="event-meta">
                <h2 className="ev-title">{eventData?.title || "Loading Movie..."}</h2>
                <p className="ev-cat">{eventData?.category || "Cinema"}</p>
                <p className="ev-loc">📍 {eventData?.location || "Lagos, Nigeria"}</p>
              </div>
            </div>

            {/* --- FORM SECTION --- */}
            <div className="form-section">
              <div className="field-group">
                <label className="field-label">Number of Tickets</label>
                <select className="field-ctrl" value={ticketQuantity} onChange={(e) => setTicketQuantity(Number(e.target.value))}>
                  {[1,2,3,4,5].map(n => <option key={n} value={n}>{n}</option>)}
                </select>
              </div>

              <div className="field-group">
                <label className="field-label">Ticket Type</label>
                <select className="field-ctrl" value={ticketType} onChange={(e) => setTicketType(e.target.value)}>
                  <option value="Cinema">Cinema</option>
                  <option value="VIP">VIP</option>
                </select>
              </div>
            </div>

            <div className="total-preview">
              <span className="total-label">Total</span>
              <span className="total-value">₦{totalAmount.toLocaleString()}</span>
            </div>

            <div className="footer-row">
              <button className="btn btn-home" onClick={() => navigate("/")}>Home</button>
              
              {/* ✅ UPDATED BUTTON: Calls handleBooking function */}
              <button className="btn btn-book" onClick={handleBooking}>
                Book Event
              </button>
            </div>

          </div>
        </div>
      </div>
    </Dashboardlayout>
  );
};

export default BookEvents;