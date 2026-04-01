import { useState, useEffect } from "react";
import { IoCheckmarkCircle, IoCloseCircle, IoSearch } from "react-icons/io5";

function ScanPage() {
  const [message, setMessage] = useState("Verifying Ticket...");
  const [ticketInfo, setTicketInfo] = useState(null);
  const [status, setStatus] = useState("pending"); // pending | success | error

  useEffect(() => {
    const verifyTicketWithBackend = async () => {
      const params = new URLSearchParams(window.location.search);
      const token = params.get("token");

      if (!token) {
        setMessage("No ticket token found.");
        setStatus("error");
        return;
      }

      try {
        // ✅ CONNECTING TO YOUR RENDER BACKEND
        const response = await fetch(`https://eventhub-backend-pxoz.onrender.com/api/tickets/verify/${token}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
        });

        const data = await response.json();

        if (response.ok) {
          // TICKET VALID & FIRST TIME SCAN
          setMessage("Access Granted! Welcome to EntryHub.");
          setStatus("success");
          setTicketInfo(data.ticket); 
        } else {
          // HANDLES "ALREADY USED" (400) OR "NOT FOUND" (404)
          setMessage(data.message || "Invalid Ticket: Not in System");
          setStatus("error");
          if (data.ticket) setTicketInfo(data.ticket);
        }
      } catch (err) {
        setMessage("Connection Error: Backend is unreachable.");
        setStatus("error");
      }
    };

    // 1.5s delay to make the "Scanning" animation feel real
    const timer = setTimeout(verifyTicketWithBackend, 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div style={{ 
      textAlign: "center", 
      padding: "40px 20px", 
      fontFamily: "'Plus Jakarta Sans', sans-serif",
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: status === "success" ? "#f0fff4" : status === "error" ? "#fff5f5" : "#f4f2ec",
      transition: "background-color 0.5s ease"
    }}>
      <div style={{
        maxWidth: "420px",
        width: "100%",
        padding: "40px 30px",
        borderRadius: "30px",
        backgroundColor: "#fff",
        boxShadow: "0 20px 50px rgba(0,0,0,0.08)",
        border: `2px solid ${status === "success" ? "#2f855a" : status === "error" ? "#c53030" : "transparent"}`
      }}>
        
        {/* DYNAMIC ICON SECTION */}
        <div style={{ marginBottom: "25px" }}>
          {status === "pending" && <IoSearch style={{ fontSize: "70px", color: "#ff9f2b", animation: "pulse 1.5s infinite" }} />}
          {status === "success" && <IoCheckmarkCircle style={{ fontSize: "80px", color: "#2f855a" }} />}
          {status === "error" && <IoCloseCircle style={{ fontSize: "80px", color: "#c53030" }} />}
        </div>

        <h1 style={{ 
          color: status === "success" ? "#2f855a" : status === "error" ? "#c53030" : "#5c7269",
          fontSize: "1.7rem",
          fontWeight: "800",
          marginBottom: "10px",
          lineHeight: "1.2"
        }}>
          {message}
        </h1>

        {status === "pending" && (
          <p style={{ color: "#a0afa8", fontWeight: "600" }}>Querying backend database...</p>
        )}

        {/* TICKET DATA CARD */}
        {ticketInfo && (
          <div style={{ 
            textAlign: "left", 
            backgroundColor: status === "success" ? "#f9fbf9" : "#fffafa",
            padding: "25px",
            borderRadius: "20px",
            border: `1px solid ${status === "success" ? "#e6eee6" : "#f5e6e6"}`,
            marginTop: "25px"
          }}>
            <p style={{ margin: "10px 0", color: "#2c3e36", fontSize: "0.95rem" }}>
              <strong style={{ color: "#a0afa8", textTransform: "uppercase", fontSize: "0.7rem", display: "block" }}>Event</strong> 
              {ticketInfo.eventTitle || "Burna Boy Live (BLIC 5)"}
            </p>
            
            <div style={{ display: "flex", gap: "20px", marginTop: "15px" }}>
               <p style={{ margin: "0", color: "#2c3e36" }}>
                 <strong style={{ color: "#a0afa8", textTransform: "uppercase", fontSize: "0.7rem", display: "block" }}>Seat</strong> 
                 {ticketInfo.seat}
               </p>
               <p style={{ margin: "0", color: "#2c3e36" }}>
                 <strong style={{ color: "#a0afa8", textTransform: "uppercase", fontSize: "0.7rem", display: "block" }}>Row</strong> 
                 {ticketInfo.row}
               </p>
            </div>

            <p style={{ margin: "15px 0 0 0", fontSize: "0.75rem", color: "#cbd5e1", borderTop: "1px solid #eee", paddingTop: "12px" }}>
              <strong>Verified Token:</strong> {ticketInfo.qrToken}
            </p>
          </div>
        )}

        <button 
          onClick={() => window.location.href = "/"}
          style={{
            marginTop: "35px",
            width: "100%",
            padding: "18px",
            backgroundColor: "#ff9f2b",
            color: "#fff",
            border: "none",
            borderRadius: "16px",
            fontWeight: "800",
            fontSize: "1rem",
            cursor: "pointer",
            boxShadow: "0 10px 25px rgba(255, 159, 43, 0.25)",
            transition: "transform 0.2s"
          }}
          onMouseOver={(e) => e.target.style.transform = "scale(1.02)"}
          onMouseOut={(e) => e.target.style.transform = "scale(1)"}
        >
          Return to Dashboard
        </button>
      </div>

      <style>
        {`
          @keyframes pulse {
            0% { transform: scale(1); opacity: 1; }
            50% { transform: scale(1.1); opacity: 0.7; }
            100% { transform: scale(1); opacity: 1; }
          }
        `}
      </style>
    </div>
  );
}

export default ScanPage;