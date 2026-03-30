import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import QRCode from "react-qr-code"; 
import check from "./check.png";
import failed from "./failed.png";
import "./payment-method.css";

const generateUniqueSeat = (usedSeats) => {
  let seat;
  do {
    const row = String.fromCharCode(65 + Math.floor(Math.random() * 10)); 
    const number = Math.floor(Math.random() * 20) + 1; 
    seat = `${row}${number}`;
  } while (usedSeats.includes(seat));
  return seat;
};

function BankDetails() {
  const navigate = useNavigate();
  const [paymentData, setPaymentData] = useState({
    ticketQty: 0,
    ticketPrice: 0,
    bankName: "Flutterwave (EntryHub)",
    accountNumber: "0067100155",
  });

  const [tickets, setTickets] = useState([]); 
  const [currentTicket, setCurrentTicket] = useState(null); 
  const [paymentStatus, setPaymentStatus] = useState("idle"); 
  const [copied, setCopied] = useState(false);
  const statusRef = useRef(null);

  useEffect(() => {
    const storedData = localStorage.getItem("ticketData");
    const storedTickets = localStorage.getItem("mockTickets");
    
    if (storedData) {
      const parsed = JSON.parse(storedData);
      setPaymentData((prev) => ({
        ...prev,
        ticketQty: parsed.quantity || 1,
        ticketPrice: Number(parsed.price) || 0, // Ensure it's a number
      }));
    }
    if (storedTickets) setTickets(JSON.parse(storedTickets));
  }, []);

  useEffect(() => {
    if (statusRef.current && paymentStatus !== "idle") {
      statusRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [paymentStatus]);

  const totalAmount = paymentData.ticketQty * paymentData.ticketPrice;

  const handleCopy = () => {
    navigator.clipboard.writeText(paymentData.accountNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCompletePayment = () => {
    setPaymentStatus("pending");

    // Mocking an API call delay
    setTimeout(() => {
      const usedSeats = tickets.map((t) => t.seat);
      const seat = generateUniqueSeat(usedSeats);
      const qrToken = `ETH-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

      const ticket = {
        seat,
        qrToken,
        buyerEmail: "user@example.com",
        isUsed: false,
        row: seat.charAt(0),
        number: parseInt(seat.slice(1)),
        purchaseDate: new Date().toLocaleDateString()
      };

      const updatedTickets = [...tickets, ticket];
      setTickets(updatedTickets);
      setCurrentTicket(ticket);

      localStorage.setItem("mockTickets", JSON.stringify(updatedTickets));
      setPaymentStatus("success");
    }, 2500);
  };

  return (
    <div className="bank-details-wrapper">
      {paymentStatus === "idle" && (
        <div className="bank-content">
          <h3 className="bank-title">Transfer to Bank Account</h3>
          <p className="bank-instruction">Please make a transfer to the account below via your banking app.</p>
          
          <div className="details-cons">
            <div className="sub-details">
              <p className="d-name">Bank Name</p>
              <p className="d-info">{paymentData.bankName}</p>
            </div>
            <div className="sub-details">
              <p className="d-name">Account Number</p>
              <div className="account-copy-row">
                <p className="d-info">{paymentData.accountNumber}</p>
                <button className="copy-btn" onClick={handleCopy}>
                  {copied ? "Copied!" : "Copy"}
                </button>
              </div>
            </div>
            <div className="sub-details">
              <p className="d-name">Amount to Pay</p>
              <p className="d-info highlight-price">₦{totalAmount.toLocaleString()}</p>
            </div>
          </div>

          <div className="ticket-detail-con">
            <div className="ticket-details">
              <p className="ticket-info">Ticket(s)</p>
              <p>{paymentData.ticketQty} x ₦{paymentData.ticketPrice.toLocaleString()}</p>
            </div>
            <div className="ticket-details total-row">
              <p className="ticket-info">Total Payable</p>
              <p className="total-val">₦{totalAmount.toLocaleString()}</p>
            </div>
          </div>

          <div className="bank-details-btn-con">
            <button className="bank-details-btn" onClick={handleCompletePayment}>
              I have Made the Transfer
            </button>
          </div>
        </div>
      )}

      {paymentStatus === "pending" && (
        <div className="center-state" ref={statusRef}>
          <div className="custom-loader"></div>
          <p className="pending-text">Confirming payment with your bank...</p>
        </div>
      )}

      {paymentStatus === "success" && currentTicket && (
        <div className="center-state success-container animate-fade-in">
          <img src={check} alt="Success" className="check-img bounce-in" />
          <h2 className="payment-success-title">Payment Received!</h2>
          <p className="success-message">Your seat has been reserved successfully.</p>

          <div className="ticket-card-ui">
             <div className="qr-wrapper">
                <QRCode
                  value={`https://entryhub.vercel.app/scan?token=${currentTicket.qrToken}`}
                  size={160}
                  level="H"
                />
             </div>
             <div className="ticket-meta">
                <p className="meta-label">SEAT NUMBER</p>
                <p className="meta-value">{currentTicket.seat}</p>
             </div>
          </div>

          <button className="finish-btn" onClick={() => navigate("/")}>
            View in "My Tickets"
          </button>
        </div>
      )}
    </div>
  );
}

export default BankDetails;