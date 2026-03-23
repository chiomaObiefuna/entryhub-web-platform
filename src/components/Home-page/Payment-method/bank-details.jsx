import Dashboardlayout from "../../Dashboard-Layout/DashboardLayout";
import { useState } from "react";
import check from "./check.png";
import failed from "./failed.png";
import { useRef, useEffect } from "react";

import "./payment-method.css";

function BankDetails() {
  const [paymentData, setPaymentData] = useState({
    ticketQty: 2,
    ticketPrice: 15000,
  });
  const totalAmount = paymentData.ticketQty * paymentData.ticketPrice;

  const [paymentStatus, setPaymentStatus] = useState("idle");

  const handleCompletePayment = () => {
    setPaymentStatus("pending");

    // simulate backend delay
    setTimeout(() => {
      const outcomes = ["success", "failed"];
      const result = outcomes[Math.floor(Math.random() * outcomes.length)];

      setPaymentStatus(result);
    }, 3000);
  };

  const statusRef = useRef(null);

  useEffect(() => {
    if (statusRef.current) {
      statusRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
  return (
    <Dashboardlayout title="Bank Transfer Details">
      {paymentStatus === "idle" && (
        <div className="bank-content">
          <div className="details-cons">
            <div className="sub-details">
              <p className="d-name">Bank Name</p>
              <p className="d-info">Flutterwave</p>
            </div>
            <div className="sub-details">
              <p className="d-name">Account Number</p>
              <p className="d-info">0123456789</p>
            </div>
            <div className="sub-details">
              <p className="d-name">Account Number</p>
              <p className="d-info">Flutterwave</p>
            </div>
            <div className="sub-details">
              <p className="d-name">Account Name</p>
              <p className="d-info">Entry Hub</p>
            </div>
            <div className="sub-details">
              <p className="d-name">Amount</p>
              <p className="d-info">₦15,000</p>
            </div>
          </div>

          <div className="ticket-detail-con">
            <div className="ticket-details">
              <p className="ticket-info">Ticket</p>
              <p>{paymentData.ticketQty}</p>
            </div>
            <div className="ticket-details">
              <p className="ticket-info">Ticket Price</p>
              <p>₦{paymentData.ticketPrice}</p>
            </div>
            <div className="ticket-details">
              <p className="ticket-info">Total Amount</p>
              <p>₦{totalAmount}</p>
            </div>
          </div>

          <div className="bank-details-btn-con">
            <button
              className="bank-details-btn  .go-home-btn"
              onClick={handleCompletePayment}
            >
              Complete Payment ₦{totalAmount}
            </button>
          </div>
        </div>
      )}

      {paymentStatus === "pending" && (
        <div className="center-state" ref={statusRef}>
          <div className="spinner"></div>
          <p className="pending">Processing payment... </p>
        </div>
      )}

      {paymentStatus === "success" && (
        <div className="center-state success">
          <img src={check} alt="Check sign" className="check-img" />

          <h2 className="payment-succes">Payment Successful</h2>
          <p className="success-message">
            Your ticket has been sent to your email, kindly check to confirm and
            download
          </p>

          <button
            className="go-home-btn"
            onClick={() => setPaymentStatus("idle")}
          >
            <svg
              width="24"
              height="25"
              viewBox="0 0 24 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="go-home-icon"
            >
              <path
                d="M23.4138 10.5853L13.4138 0.585323C13.0387 0.210534 12.5302 0 12 0C11.4698 0 10.9613 0.210534 10.5863 0.585323L0.586262 10.5853C0.399643 10.7706 0.251711 10.991 0.151067 11.234C0.0504232 11.4769 -0.000923321 11.7374 1.25669e-05 12.0003V24.0003C1.25669e-05 24.2655 0.10537 24.5199 0.292906 24.7074C0.480442 24.895 0.734796 25.0003 1.00001 25.0003H9.00001C9.26523 25.0003 9.51958 24.895 9.70712 24.7074C9.89466 24.5199 10 24.2655 10 24.0003V17.0003H14V24.0003C14 24.2655 14.1054 24.5199 14.2929 24.7074C14.4804 24.895 14.7348 25.0003 15 25.0003H23C23.2652 25.0003 23.5196 24.895 23.7071 24.7074C23.8947 24.5199 24 24.2655 24 24.0003V12.0003C24.0009 11.7374 23.9496 11.4769 23.849 11.234C23.7483 10.991 23.6004 10.7706 23.4138 10.5853ZM22 23.0003H16V16.0003C16 15.7351 15.8947 15.4808 15.7071 15.2932C15.5196 15.1057 15.2652 15.0003 15 15.0003H9.00001C8.7348 15.0003 8.48044 15.1057 8.29291 15.2932C8.10537 15.4808 8.00001 15.7351 8.00001 16.0003V23.0003H2.00001V12.0003L12 2.00032L22 12.0003V23.0003Z"
                fill="#FCFBFA"
              />
            </svg>
            Go Back Home
          </button>
        </div>
      )}

      {paymentStatus === "failed" && (
        <div className="center-state failed">
          <img src={failed} alt="Error sign" className="check-img failed-img" />

          <h2 className="payment-succes">Payment Failed</h2>
          {paymentStatus === "failed" && (
            <button
              className="go-home-btn"
              onClick={() => setPaymentStatus("idle")}
            >
              Please Try Again
            </button>
          )}
        </div>
      )}
    </Dashboardlayout>
  );
}

export default BankDetails;
