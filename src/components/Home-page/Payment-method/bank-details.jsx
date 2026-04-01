import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IoArrowBack, IoHomeOutline, IoCheckmarkCircle } from "react-icons/io5";
import "./payment-method.css";

export default function BankDetails() {
  const navigate = useNavigate();
  const [paymentStatus, setPaymentStatus] = useState("idle"); // idle | pending | success
  const [generatedToken, setGeneratedToken] = useState("");

  const _raw = JSON.parse(localStorage.getItem("ticketData") || "{}");
  const quantity = Number(_raw.quantity) || 1;
  const price = Number(_raw.price) || 0;
  const total = quantity * price;
  const accountNumber = "0123456789";

  const handleCopy = () => {
    navigator.clipboard.writeText(accountNumber);
    // Using a simple alert or you could use your toast library here
    alert("Account Number Copied!");
  };

  const handleConfirmTransfer = () => {
    setPaymentStatus("pending");

    // Simulate bank verification delay (3 seconds)
    setTimeout(() => {
      // 1. Generate the unique token for the ScanPage
      const newToken = "BNK-" + Math.random().toString(36).substr(2, 9).toUpperCase();
      setGeneratedToken(newToken);

      // 2. Create the ticket object
      const newTicket = {
        qrToken: newToken,
        seat: _raw.seat || "7",
        row: _raw.row || "4",
        eventTitle: _raw.eventTitle || "Black Panther",
        isUsed: false,
        customerName: _raw.fullName || "Guest User",
        paymentMethod: "Bank Transfer"
      };

      // 3. Update the "mockTickets" in localStorage so ScanPage can find it
      const existingTickets = JSON.parse(localStorage.getItem("mockTickets") || "[]");
      localStorage.setItem("mockTickets", JSON.stringify([...existingTickets, newTicket]));

      // 4. Move to success state
      setPaymentStatus("success");
    }, 3000);
  };

  if (paymentStatus === "idle") {
    return (
      <div className="bank-details-wrapper">
        <div className="bank-content">
          <button className="bank-back-btn" onClick={() => navigate(-1)}>
            <IoArrowBack /> Back
          </button>
          
          <div className="details-cons">
            <div className="sub-details">
              <p className="d-name">Bank Name</p>
              <p className="d-info">Flutterwave (EntryHub)</p>
            </div>
            <div className="sub-details">
              <p className="d-name">Account Number</p>
              <div className="account-copy-row">
                <p className="d-info" style={{ letterSpacing: '2px', fontWeight: '800' }}>{accountNumber}</p>
                <button className="copy-btn" onClick={handleCopy}>Copy</button>
              </div>
            </div>
            <div className="sub-details">
              <p className="d-name">Account Name</p>
              <p className="d-info">EntryHub Technologies</p>
            </div>
            <div className="sub-details">
              <p className="d-name">Transfer Amount</p>
              <p className="d-info" style={{ color: '#ff9f2b' }}>₦{total.toLocaleString()}</p>
            </div>
          </div>

          <div className="bank-footer-combined">
            <div className="ticket-detail-con">
              <div className="ticket-details"><span>Tickets:</span><span>{quantity}</span></div>
              <div className="ticket-details"><span className="total-label">Total Payable:</span><span className="total-val">₦{total.toLocaleString()}</span></div>
            </div>
            <div className="bank-details-btn-con">
              <button className="bank-details-btn" onClick={handleConfirmTransfer}>
                I have Made Transfer
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="center-state" style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      minHeight: '60vh',
      textAlign: 'center' 
    }}>
      {paymentStatus === "pending" ? (
        <>
          <div className="spinner"></div>
          <h2 style={{ color: '#5c7269', marginTop: '20px' }}>Verifying Transfer...</h2>
          <p style={{ color: '#a0afa8' }}>We are confirming your payment with the bank.</p>
        </>
      ) : (
        <div className="success-view">
          <IoCheckmarkCircle style={{ fontSize: '80px', color: '#2f855a' }} />
          <h2 style={{ color: '#2f855a', fontWeight: '800', margin: '20px 0 10px' }}>Success!</h2>
          <p style={{ color: '#5c7269', marginBottom: '30px' }}>Your payment has been confirmed.</p>
          
          <div style={{ display: 'flex', gap: '15px', justifyContent: 'center' }}>
            <button 
              className="bank-details-btn" 
              style={{ width: 'auto', padding: '12px 25px' }}
              onClick={() => navigate(`/scan?token=${generatedToken}`)}
            >
              🎫 View My Ticket
            </button>
            <button 
              className="bank-details-btn" 
              style={{ width: 'auto', padding: '12px 25px', backgroundColor: '#5c7269' }}
              onClick={() => navigate("/")}
            >
              <IoHomeOutline style={{ marginRight: '8px' }} /> Home
            </button>
          </div>
        </div>
      )}
    </div>
  );
}