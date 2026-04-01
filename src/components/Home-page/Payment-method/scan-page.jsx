import { useState, useEffect } from "react";

function ScanPage() {
  const [message, setMessage] = useState("Verifying Ticket...");
  const [ticketInfo, setTicketInfo] = useState(null);
  const [status, setStatus] = useState("pending"); // pending | success | error

  useEffect(() => {
    // Simulate a brief delay so the "Scanning" state is actually seen
    const timer = setTimeout(() => {
      // 1️⃣ Get token from URL
      const params = new URLSearchParams(window.location.search);
      const token = params.get("token");

      if (!token) {
        setMessage("No ticket token found.");
        setStatus("error");
        return;
      }

      // 2️⃣ Get tickets from localStorage
      const tickets = JSON.parse(localStorage.getItem("mockTickets") || "[]");
      
      // Find the ticket and its index
      const ticketIndex = tickets.findIndex((t) => t.qrToken === token);
      const ticket = tickets[ticketIndex];

      // 3️⃣ Handle invalid token
      if (!ticket) {
        setMessage("Invalid Ticket: Not in System");
        setStatus("error");
        return;
      }

      // 4️⃣ Handle first scan vs already used
      if (ticket.isUsed) {
        setMessage("Access Denied: Ticket Already Used");
        setStatus("error");
        setTicketInfo(ticket); 
      } else {
        // ✅ GRANT ACCESS
        setMessage("Access Granted! Welcome.");
        setStatus("success");
        
        // Update local storage
        tickets[ticketIndex].isUsed = true; 
        localStorage.setItem("mockTickets", JSON.stringify(tickets));
        
        setTicketInfo(ticket);
      }
    }, 1500); // 1.5 second delay for "Verification" feel

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
        maxWidth: "400px",
        width: "100%",
        padding: "40px 30px",
        borderRadius: "30px",
        backgroundColor: "#fff",
        boxShadow: "0 20px 40px rgba(0,0,0,0.05)",
        border: `2px solid ${status === "success" ? "#2f855a" : status === "error" ? "#c53030" : "transparent"}`
      }}>
        
        {/* BIG VISUAL ICON */}
        <div style={{ fontSize: "70px", marginBottom: "20px" }}>
          {status === "pending" && "🔍"}
          {status === "success" && "✅"}
          {status === "error" && "❌"}
        </div>

        <h1 style={{ 
          color: status === "success" ? "#2f855a" : status === "error" ? "#c53030" : "#5c7269",
          fontSize: "1.6rem",
          fontWeight: "800",
          marginBottom: "10px"
        }}>
          {message}
        </h1>

        {status === "pending" && (
          <p style={{ color: "#a0afa8", fontWeight: "600" }}>Please wait while we validate the QR code...</p>
        )}

        {ticketInfo && (
          <div style={{ 
            textAlign: "left", 
            backgroundColor: "#f9fbf9",
            padding: "20px",
            borderRadius: "15px",
            border: "1px solid #eee",
            marginTop: "20px"
          }}>
            <p style={{ margin: "8px 0", color: "#5c7269" }}><strong>Event:</strong> {ticketInfo.eventTitle || "Standard Event"}</p>
            <p style={{ margin: "8px 0", color: "#5c7269" }}><strong>Seat:</strong> {ticketInfo.seat}</p>
            <p style={{ margin: "8px 0", color: "#5c7269" }}><strong>Row:</strong> {ticketInfo.row}</p>
            <p style={{ margin: "15px 0 0 0", fontSize: "0.7rem", color: "#a0afa8", borderTop: "1px solid #eee", paddingTop: "10px" }}>
              <strong>Token:</strong> {ticketInfo.qrToken}
            </p>
          </div>
        )}

        <button 
          onClick={() => window.location.href = "/"}
          style={{
            marginTop: "30px",
            width: "100%",
            padding: "16px",
            backgroundColor: "#ff9f2b",
            color: "#fff",
            border: "none",
            borderRadius: "15px",
            fontWeight: "800",
            fontSize: "1rem",
            cursor: "pointer",
            boxShadow: "0 10px 20px rgba(255, 159, 43, 0.2)"
          }}
        >
          Return to Dashboard
        </button>
      </div>
    </div>
  );
}

export default ScanPage;