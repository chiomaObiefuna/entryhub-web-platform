import Dashboardlayout from "../../Dashboard-Layout/DashboardLayout";
import { useState, useEffect, useRef } from "react";
import QRCode from "react-qr-code"; // <-- Already imported, but still fine
import check from "./check.png";
import failed from "./failed.png";

import "./payment-method.css";

// Utility to generate a random seat number that hasn't been used yet
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
  const [paymentData, setPaymentData] = useState({
    ticketQty: 0,
    ticketPrice: 0,
    bankName: "Flutterwave",
    accountNumber: "0067100155",
  });

  const [tickets, setTickets] = useState([]); // All tickets generated
  const [currentTicket, setCurrentTicket] = useState(null); // Ticket just purchased
  const [paymentStatus, setPaymentStatus] = useState("idle"); // idle | pending | success
  const statusRef = useRef(null);

  // Load ticket quantity and price from localStorage
  useEffect(() => {
    const storedData = localStorage.getItem("ticketData");
    if (storedData) {
      const parsed = JSON.parse(storedData);
      setPaymentData((prev) => ({
        ...prev,
        ticketQty: parsed.quantity || 1,
        ticketPrice: parsed.price || 0,
      }));
    }
  }, []);

  // Load previously purchased tickets from localStorage
  useEffect(() => {
    const storedTickets = localStorage.getItem("mockTickets");
    if (storedTickets) setTickets(JSON.parse(storedTickets));
  }, []);

  // Scroll to payment status
  useEffect(() => {
    if (statusRef.current && paymentStatus !== "idle") {
      statusRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [paymentStatus]);

  const totalAmount = paymentData.ticketQty * paymentData.ticketPrice;

  const handleCompletePayment = () => {
    setPaymentStatus("pending");

    setTimeout(() => {
      // Generate a unique seat for the ticket
      const usedSeats = tickets.map((t) => t.seat);
      const seat = generateUniqueSeat(usedSeats);

      // Generate a random QR token
      const qrToken = `${seat}-${Date.now()}`;

      // Create mock ticket
      const ticket = {
        seat,
        qrToken,
        buyerEmail: "user@example.com", // Replace with dynamic if needed
        isUsed: false,
        row: seat.charAt(0),
        number: parseInt(seat.slice(1)),
      };

      const updatedTickets = [...tickets, ticket];
      setTickets(updatedTickets);
      setCurrentTicket(ticket);

      // Save tickets locally
      localStorage.setItem("mockTickets", JSON.stringify(updatedTickets));

      setPaymentStatus("success");

      // ---------- NEW CODE ADDED HERE ----------
      // Example logic for safe storage of a new ticket (avoids duplicates)
      const storedTickets =
        JSON.parse(localStorage.getItem("mockTickets")) || [];
      const isAlreadyStored = storedTickets.some(
        (t) => t.qrToken === ticket.qrToken,
      );
      if (!isAlreadyStored) {
        storedTickets.push({ ...ticket, isUsed: false });
        localStorage.setItem("mockTickets", JSON.stringify(storedTickets));
      }
      // ---------- END NEW CODE ----------
    }, 1500);
  };

  // Simulate scanning QR code
  const handleScan = (ticket) => {
    if (ticket.isUsed) {
      alert("Access Denied: Ticket already used");
    } else {
      alert("Access Granted!");
      const updatedTickets = tickets.map((t) =>
        t.qrToken === ticket.qrToken ? { ...t, isUsed: true } : t,
      );
      setTickets(updatedTickets);
      localStorage.setItem("mockTickets", JSON.stringify(updatedTickets));
    }
  };

  return (
    <Dashboardlayout title="Bank Transfer Details">
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
              <p className="d-info">
                ₦{paymentData.ticketPrice.toLocaleString()}
              </p>
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
            <button
              className="bank-details-btn go-home-btn"
              onClick={handleCompletePayment}
            >
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
          <img src={check} alt="Check sign" className="check-img" />
          <h2 className="payment-succes">Payment Successful</h2>
          <p className="success-message">
            Your ticket has been generated! Scan the QR code below.
          </p>

          {/* ---------- NEW QR CODE COMPONENT ADDED HERE ---------- */}
          <div
            style={{ background: "white", padding: "16px", margin: "16px 0" }}
          >
            <QRCode
              value={`http://localhost:3000/scan?token=${currentTicket.qrToken}&seat=${currentTicket.seat}`}
              size={200}
            />
            <p>
              Seat: {currentTicket.seat} | Token: {currentTicket.qrToken}
            </p>
            {/* <button
              className="go-home-btn"
              onClick={() => handleScan(currentTicket)}
            >
              Scan Ticket
            </button> */}
          </div>
          {/* ---------- END QR CODE COMPONENT ---------- */}

          <button
            className="go-home-btn"
            onClick={() => setPaymentStatus("idle")}
          >
            Go Back Home
          </button>
        </div>
      )}

      {paymentStatus === "failed" && (
        <div className="center-state failed">
          <img src={failed} alt="Error sign" className="check-img failed-img" />
          <h2 className="payment-succes">Payment Failed</h2>
          <button
            className="go-home-btn"
            onClick={() => setPaymentStatus("idle")}
          >
            Please Try Again
          </button>
        </div>
      )}
    </Dashboardlayout>
  );
}

export default BankDetails;
