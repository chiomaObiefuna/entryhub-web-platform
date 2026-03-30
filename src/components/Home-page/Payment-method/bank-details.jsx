import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import QRCode from "react-qr-code"; 
import check from "./check.png";
import failed from "./failed.png";

import "./payment-method.css";

// Utility to generate a random seat number
const generateUniqueSeat = (usedSeats) => {
  let seat;
  do {
    const row = String.fromCharCode(65 + Math.floor(Math.random() * 10)); // Rows A-J
    const number = Math.floor(Math.random() * 20) + 1; // Seat numbers 1-20
    seat = `${row}${number}`;
  } while (usedSeats.includes(seat));
  return seat;
};

function BankDetails() {
  const navigate = useNavigate();
  const [paymentData, setPaymentData] = useState({
    ticketQty: 0,
    ticketPrice: 0,
    bankName: "Flutterwave",
    accountNumber: "0067100155",
  });

  const [tickets, setTickets] = useState([]); 
  const [currentTicket, setCurrentTicket] = useState(null); 
  const [paymentStatus, setPaymentStatus] = useState("idle"); // idle | pending | success
  const statusRef = useRef(null);

  // Load data from localStorage
  useEffect(() => {
    const storedData = localStorage.getItem("ticketData");
    const storedTickets = localStorage.getItem("mockTickets");
    
    if (storedData) {
      const parsed = JSON.parse(storedData);
      setPaymentData((prev) => ({
        ...prev,
        ticketQty: parsed.quantity || 1,
        ticketPrice: parsed.price || 0,
      }));
    }
    if (storedTickets) setTickets(JSON.parse(storedTickets));
  }, []);

  // Scroll to status
  useEffect(() => {
    if (statusRef.current && paymentStatus !== "idle") {
      statusRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [paymentStatus]);

  const totalAmount = paymentData.ticketQty * paymentData.ticketPrice;

  const handleCompletePayment = () => {
    setPaymentStatus("pending");

    setTimeout(() => {
      const usedSeats = tickets.map((t) => t.seat);
      const seat = generateUniqueSeat(usedSeats);
      const qrToken = `${seat}-${Date.now()}`;

      const ticket = {
        seat,
        qrToken,
        buyerEmail: "user@example.com",
        isUsed: false,
        row: seat.charAt(0),
        number: parseInt(seat.slice(1)),
      };

      const updatedTickets = [...tickets, ticket];
      setTickets(updatedTickets);
      setCurrentTicket(ticket);

      // Save locally
      localStorage.setItem("mockTickets", JSON.stringify(updatedTickets));
      setPaymentStatus("success");
    }, 1500);
  };

  // ✅ REMOVED <DashboardLayout> wrap
  return (
    <div className="bank-details-wrapper">
      {paymentStatus === "idle" && (
        <div className="bank-content">
          <div className="details-cons">
            <div className="sub-details">
              <p className="d-name">Bank Name</p>
              <p className="d-info">{paymentData.bankName}</p>
            </div>
            <div className="sub-details">
              <p className="d-name">Account Number</p>
              <p className="d-info">{paymentData.accountNumber}</p>
            </div>
            <div className="sub-details">
              <p className="d-name">Amount</p>
              <p className="d-info">₦{paymentData.ticketPrice.toLocaleString()}</p>
            </div>
          </div>

          <div className="ticket-detail-con">
            <div className="ticket-details">
              <p className="ticket-info">Ticket Qty</p>
              <p>{paymentData.ticketQty}</p>
            </div>
            <div className="ticket-details">
              <p className="ticket-info">Ticket Price</p>
              <p>₦{paymentData.ticketPrice.toLocaleString()}</p>
            </div>
            <div className="ticket-details">
              <p className="ticket-info">Total Amount</p>
              <p>₦{totalAmount.toLocaleString()}</p>
            </div>
          </div>

          <div className="bank-details-btn-con">
            <button className="bank-details-btn go-home-btn" onClick={handleCompletePayment}>
              Complete Payment ₦{totalAmount.toLocaleString()}
            </button>
          </div>
        </div>
      )}

      {paymentStatus === "pending" && (
        <div className="center-state" ref={statusRef}>
          <div className="spinner"></div>
          <p className="pending">Processing payment...</p>
        </div>
      )}

      {paymentStatus === "success" && currentTicket && (
        <div className="center-state success">
          <img src={check} alt="Success" className="check-img" />
          <h2 className="payment-success-title">Payment Successful</h2>
          <p className="success-message">Your ticket has been generated!</p>

          <div className="qr-container" style={{ background: "white", padding: "16px", margin: "16px 0", borderRadius: "8px" }}>
            <QRCode
              value={`https://entryhub.vercel.app/scan?token=${currentTicket.qrToken}`}
              size={180}
            />
            <p style={{marginTop: "10px", fontWeight: "600"}}>Seat: {currentTicket.seat}</p>
          </div>

          <button className="go-home-btn" onClick={() => navigate("/")}>
            Finish & Go Home
          </button>
        </div>
      )}

      {paymentStatus === "failed" && (
        <div className="center-state failed">
          <img src={failed} alt="Failed" className="check-img failed-img" />
          <h2 className="payment-error-title">Payment Failed</h2>
          <button className="go-home-btn" onClick={() => setPaymentStatus("idle")}>
            Please Try Again
          </button>
        </div>
      )}
    </div>
  );
}

export default BankDetails;