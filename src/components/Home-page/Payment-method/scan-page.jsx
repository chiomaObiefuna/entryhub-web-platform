import { useState, useEffect, useCallback } from "react";
import { IoCheckmarkCircle, IoCloseCircle, IoSearch } from "react-icons/io5";

function ScanPage() {
  const [message, setMessage] = useState("Verifying Ticket...");
  const [ticketInfo, setTicketInfo] = useState(null);
  const [status, setStatus] = useState("pending");
  const [retryCount, setRetryCount] = useState(0);

  const verifyTicket = useCallback(async () => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    // ✅ Error if token is missing
    if (!token || token === "undefined") {
      setMessage("Invalid or missing ticket token.");
      setStatus("error");
      return;
    }

    try {
      // ✅ FIXED ENDPOINT: Removed /verify/ as per your correction
      const response = await fetch(`https://eventhub-backend-pxoz.onrender.com/api/tickets/${token}`, {
        method: "GET",
        headers: { "Accept": "application/json" }
      });

      const data = await response.json();

      if (response.ok) {
        // Success Logic
        setStatus("success");
        setMessage("Access Granted! Welcome.");
        
        // Handle nesting if the backend wraps it in { ticket: ... }
        const ticketData = data.ticket || data;
        setTicketInfo(ticketData); 

        // ✅ IMPORTANT: If the backend doesn't automatically mark it as used via GET,
        // this page currently only READS the data.
      } else {
        setStatus("error");
        setMessage(data.message || "Ticket Not Found");
      }
    } catch (err) {
      // ✅ Render Cold Start Logic (Server waking up)
      if (retryCount < 10) { 
        setMessage(`Please wait ${retryCount + 1}`);
        const timer = setTimeout(() => setRetryCount(prev => prev + 1), 5000); 
        return () => clearTimeout(timer);
      } else {
        setMessage("Connection failed. Please check your internet or refresh.");
        setStatus("error");
      }
    }
  }, [retryCount]);

  useEffect(() => {
    verifyTicket();
  }, [verifyTicket]);

  return (
    <div style={{ 
      textAlign: "center", padding: "40px 20px", fontFamily: "'Plus Jakarta Sans', sans-serif",
      minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
      backgroundColor: status === "success" ? "#f0fff4" : status === "error" ? "#fff5f5" : "#f4f2ec",
      transition: "background-color 0.5s ease"
    }}>
      <div style={{
        maxWidth: "420px", width: "100%", padding: "40px 30px", borderRadius: "30px",
        backgroundColor: "#fff", boxShadow: "0 20px 50px rgba(0,0,0,0.08)",
        border: `2px solid ${status === "success" ? "#2f855a" : status === "error" ? "#c53030" : "transparent"}`
      }}>
        
        <div style={{ marginBottom: "25px" }}>
          {status === "pending" && <IoSearch style={{ fontSize: "70px", color: "#ff9f2b", animation: "pulse 1.5s infinite" }} />}
          {status === "success" && <IoCheckmarkCircle style={{ fontSize: "80px", color: "#2f855a" }} />}
          {status === "error" && <IoCloseCircle style={{ fontSize: "80px", color: "#c53030" }} />}
        </div>

        <h1 style={{ 
          color: status === "success" ? "#2f855a" : status === "error" ? "#c53030" : "#5c7269",
          fontSize: "1.6rem", fontWeight: "800", marginBottom: "10px"
        }}>
          {message}
        </h1>

        {ticketInfo && status !== "pending" && (
          <div style={{ 
            textAlign: "left", backgroundColor: status === "success" ? "#f9fbf9" : "#fffafa",
            padding: "20px", borderRadius: "20px", border: "1px solid #eee", marginTop: "20px"
          }}>
            
            {/* ✅ QR IMAGE FROM BACKEND */}
            {ticketInfo.qr_image && (
              <div style={{ textAlign: 'center', marginBottom: '15px' }}>
                <img 
                  src={ticketInfo.qr_image} 
                  alt="Ticket QR" 
                  style={{ width: '150px', height: '150px', borderRadius: '12px', border: '1px solid #eee' }} 
                />
                <p style={{ fontSize: '0.65rem', color: '#a0afa8', marginTop: '8px' }}>ID: {ticketInfo.id}</p>
              </div>
            )}

            <p style={{ margin: "8px 0", color: "#2c3e36", fontSize: '0.9rem' }}>
              <span style={{ color: "#a0afa8", fontWeight: '700', fontSize: '0.7rem', display: 'block' }}>HOLDER EMAIL</span> 
              {ticketInfo.buyer_email || "Not Provided"}
            </p>

            <div style={{ display: 'flex', gap: '25px', marginTop: '12px' }}>
              <p style={{ margin: "0", color: "#2c3e36", fontSize: '0.9rem' }}>
                <span style={{ color: "#a0afa8", fontWeight: '700', fontSize: '0.7rem', display: 'block' }}>ROW</span> 
                {ticketInfo.seat?.row || "N/A"}
              </p>
              <p style={{ margin: "0", color: "#2c3e36", fontSize: '0.9rem' }}>
                <span style={{ color: "#a0afa8", fontWeight: '700', fontSize: '0.7rem', display: 'block' }}>SEAT</span> 
                {ticketInfo.seat?.number || "N/A"}
              </p>
            </div>

            <div style={{ marginTop: '15px', paddingTop: '10px', borderTop: '1px solid #eee', display: 'flex', justifyContent: 'space-between' }}>
               <span style={{ fontSize: '0.75rem', fontWeight: 'bold', color: ticketInfo.payment_status === 'paid' ? '#2f855a' : '#c53030' }}>
                 PAYMENT: {ticketInfo.payment_status?.toUpperCase()}
               </span>
               {ticketInfo.is_used && (
                 <span style={{ fontSize: '0.75rem', fontWeight: 'bold', color: '#c53030' }}>
                   ALREADY SCANNED
                 </span>
               )}
            </div>
          </div>
        )}

        <button 
          onClick={() => window.location.href = "/"}
          style={{
            marginTop: "30px", width: "100%", padding: "16px", backgroundColor: "#ff9f2b",
            color: "#fff", border: "none", borderRadius: "15px", fontWeight: "800", cursor: "pointer"
          }}
        >
          Return to Home
        </button>
      </div>

      <style>{`
        @keyframes pulse { 
          0% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.1); opacity: 0.7; }
          100% { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
}

export default ScanPage;