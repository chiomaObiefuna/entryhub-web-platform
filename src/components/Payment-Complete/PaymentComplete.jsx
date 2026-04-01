import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { IoArrowBack, IoLibraryOutline, IoChevronForward } from "react-icons/io5";
import "./PaymentComplete.css";

function FloatInput({ label, value, onChange, type = "text", maxLength }) {
  const [focused, setFocused] = useState(false);
  return (
    <div className={`float-wrap ${focused ? "focused" : ""}`}>
      <label className="float-label">{label}</label>
      <input
        className="float-input"
        type={type}
        value={value}
        maxLength={maxLength}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        autoComplete="off"
      />
    </div>
  );
}

export default function PaymentComplete() {
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [fullName, setFullName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");

  const _raw = JSON.parse(localStorage.getItem("ticketData") || "{}");
  const tickets = Number(_raw.quantity) || 1;
  const pricePerTicket = Number(_raw.price) || 15000;
  const total = tickets * pricePerTicket;

  const handleCard = (e) => {
    const raw = e.target.value.replace(/\D/g, "").slice(0, 16);
    const groups = raw.match(/.{1,4}/g);
    setCardNumber(groups ? groups.join(" ") : raw);
  };

  const handleExpiry = (e) => {
    let raw = e.target.value.replace(/\D/g, "");
    if (raw.length > 2) raw = raw.slice(0, 2) + "/" + raw.slice(2, 4);
    setExpiry(raw);
  };

  const handlePay = async () => {
    if (!fullName || cardNumber.length < 19 || !expiry || cvv.length < 3) {
      toast.error("Please fill in all card details correctly");
      return;
    }

    setIsProcessing(true);
    const loadingToast = toast.loading("Verifying transaction...");

    try {
      const response = await fetch("https://eventhub-backend-pxoz.onrender.com/api/tickets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          event: _raw.eventId || "69c80423974cc4062fc32c5b",
          seat: { 
            row: _raw.row || "A", 
            number: Number(_raw.seat) || 7 
          },
          buyer_email: _raw.email || `${fullName.toLowerCase().replace(/\s/g, '')}@entryhub.com`
        })
      });

      const data = await response.json();
      console.log("Full Server Response:", data);

      if (response.ok) {
        toast.dismiss(loadingToast);

        // ✅ MATCHES CONSOLE: ticket -> id
        const realToken = data.ticket?.id || data.id;

        if (realToken) {
          toast.success("Payment Successful!");
          navigate(`/completePayment?token=${realToken}`);
        } else {
          toast.error("Success, but ticket ID retrieval failed.");
          setIsProcessing(false);
        }
      } else {
        toast.dismiss(loadingToast);
        toast.error(data.message || "Payment Failed");
        setIsProcessing(false);
      }
    } catch (err) {
      toast.dismiss(loadingToast);
      toast.error("Server is waking up. Please wait 30 seconds.");
      setIsProcessing(false);
    }
  };

  return (
    <div className="payment-complete-container">
      <div className="payment-content-body">
        <button className="bank-back-btn" onClick={() => navigate(-1)}>
          <IoArrowBack /> Back
        </button>

        <p className="secure-label">Secure Checkout</p>
        <h2 className="section-heading">Card Information</h2>

        <div className="fields-stack">
          <FloatInput label="Full Name" value={fullName} onChange={(e) => setFullName(e.target.value)} />
          <FloatInput label="Card Number" value={cardNumber} onChange={handleCard} maxLength={19} />
          <div className="row-half">
            <FloatInput label="MM/YY" value={expiry} onChange={handleExpiry} maxLength={5} />
            <FloatInput label="CVV" value={cvv} onChange={(e) => setCvv(e.target.value.replace(/\D/g, "").slice(0, 3))} type="password" />
          </div>
        </div>

        <div className="or-divider">
          <span className="or-line" /><span className="or-text">or pay with</span><span className="or-line" />
        </div>

        <button className="method-row" onClick={() => navigate("/bankdetails")}>
          <span className="method-lhs"><IoLibraryOutline className="method-ico" />Bank Transfer</span>
          <IoChevronForward className="pay-chev" />
        </button>

        <div className="payment-footer-combined">
          <div className="summary-section">
            <div className="sum-item"><span>Tickets:</span><span>{tickets}</span></div>
            <div className="sum-item"><span>Total Payable:</span><span className="orange">₦{total.toLocaleString()}</span></div>
          </div>

          <div className="footer-actions">
            <button className="btn-cancel" onClick={() => navigate('/')}>Cancel</button>
            <button className="btn-pay-now" onClick={handlePay} disabled={isProcessing}>
              {isProcessing ? "Verifying..." : `Pay ₦${total.toLocaleString()}`}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}