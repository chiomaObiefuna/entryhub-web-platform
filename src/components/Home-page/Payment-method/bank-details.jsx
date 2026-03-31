import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoArrowBack, IoHomeOutline } from "react-icons/io5";
import check from "./check.png";
import "./payment-method.css";

export default function BankDetails() {
  const navigate = useNavigate();
  const [paymentStatus, setPaymentStatus] = useState("idle");

  const _raw = JSON.parse(localStorage.getItem("ticketData") || "{}");
  const quantity = Number(_raw.quantity) || 1;
  const price = Number(_raw.price) || 0;
  const total = quantity * price;
  const accountNumber = "0123456789";

  const handleCopy = () => {
    navigator.clipboard.writeText(accountNumber);
    alert("Copied!");
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
              <p className="d-info">Flutterwave</p>
            </div>
            <div className="sub-details">
              <p className="d-name">Account Number</p>
              <div className="account-copy-row">
                <p className="d-info">{accountNumber}</p>
                <button className="copy-btn" onClick={handleCopy}>Copy</button>
              </div>
            </div>
            <div className="sub-details">
              <p className="d-name">Account Name</p>
              <p className="d-info">EntryHub</p>
            </div>
            <div className="sub-details">
              <p className="d-name">Amount</p>
              <p className="d-info">₦{total.toLocaleString()}</p>
            </div>
          </div>

          <div className="bank-footer-combined">
            <div className="ticket-detail-con">
              <div className="ticket-details"><span>Tickets:</span><span>{quantity}</span></div>
              <div className="ticket-details"><span className="total-label">Total Payable:</span><span className="total-val">₦{total.toLocaleString()}</span></div>
            </div>
            <div className="bank-details-btn-con">
              <button className="bank-details-btn" onClick={() => setPaymentStatus("pending")}>I have Made Transfer</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="center-state">
      {paymentStatus === "pending" ? (
        <><div className="spinner"></div><p className="pending">Verifying...</p></>
      ) : (
        <><img src={check} className="check-img" /><h2>Success!</h2><button onClick={() => navigate("/")}>Go Home</button></>
      )}
    </div>
  );
}