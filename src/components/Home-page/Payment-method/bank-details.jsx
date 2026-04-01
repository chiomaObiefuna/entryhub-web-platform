import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoArrowBack, IoHomeOutline, IoCheckmarkCircle } from "react-icons/io5";
import "./payment-method.css";

export default function BankDetails() {
  const navigate = useNavigate();
  const [paymentStatus, setPaymentStatus] = useState("idle"); 
  const [generatedToken, setGeneratedToken] = useState("");

  const _raw = JSON.parse(localStorage.getItem("ticketData") || "{}");
  const quantity = Number(_raw.quantity) || 1;
  const price = Number(_raw.price) || 0;
  const total = quantity * price;
  const accountNumber = "0123456789";

  const handleCopy = () => {
    navigator.clipboard.writeText(accountNumber);
    alert("Account Number Copied!");
  };

  const handleConfirmTransfer = async () => {
    setPaymentStatus("pending");

    try {
      const response = await fetch("https://eventhub-backend-pxoz.onrender.com/api/tickets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          event: _raw.eventId || "69c80423974cc4062fc32c5b", 
          seat: { 
            row: _raw.row || "B", 
            number: Number(_raw.seat) || 10 
          },
          buyer_email: _raw.email || "user@entryhub.com"
        })
      });

      const data = await response.json();
      console.log("Full Server Response:", data);

      if (response.ok) {
        // ✅ MATCHES CONSOLE: ticket -> id
        const token = data.ticket?.id || data.id;

        if (token) {
          setGeneratedToken(token);
          setPaymentStatus("success");
        } else {
          console.error("ID missing in response:", data);
          alert("Payment confirmed, but ticket ID retrieval failed.");
          setPaymentStatus("idle");
        }
      } else {
        alert("Verification failed: " + (data.message || "Unknown error"));
        setPaymentStatus("idle");
      }
    } catch (err) {
      console.error("Network Error:", err);
      alert("Server is waking up. Please wait 30 seconds and try again.");
      setPaymentStatus("idle");
    }
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
    <div className="center-state" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '60vh', textAlign: 'center' }}>
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