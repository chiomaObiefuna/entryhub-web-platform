import { useState, useEffect } from "react";

function ScanPage() {
  const [message, setMessage] = useState("Scanning...");
  const [ticketInfo, setTicketInfo] = useState(null);
  const [status, setStatus] = useState("pending"); // pending | success | error

  useEffect(() => {
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
    
    // Find the ticket and its index so we can update it
    const ticketIndex = tickets.findIndex((t) => t.qrToken === token);
    const ticket = tickets[ticketIndex];

    // 3️⃣ Handle invalid token
    if (!ticket) {
      setMessage("Invalid Ticket: This QR code is not in our system.");
      setStatus("error");
      return;
    }

    // 4️⃣ Handle first scan vs already used (Fixed: using isUsed)
    if (ticket.isUsed) {
      setMessage("Access Denied: Ticket already used!");
      setStatus("error");
      setTicketInfo(ticket); // Show info so bouncer can verify
    } else {
      // ✅ GRANT ACCESS
      setMessage("Access Granted! Welcome to EntryHub.");
      setStatus("success");
      
      // Update the local storage so it can't be used again
      tickets[ticketIndex].isUsed = true; 
      localStorage.setItem("mockTickets", JSON.stringify(tickets));
      
      setTicketInfo(ticket);
    }
  }, []);

  return (
    <div style={{ 
      textAlign: "center", 
      padding: "40px 20px", 
      fontFamily: "sans-serif",
      minHeight: "100vh",
      backgroundColor: status === "success" ? "#f0fff4" : status === "error" ? "#fff5f5" : "#fff"
    }}>
      <div style={{
        maxWidth: "400px",
        margin: "0 auto",
        padding: "30px",
        borderRadius: "20px",
        backgroundColor: "#fff",
        boxShadow: "0 10px 25px rgba(0,0,0,0.1)"
      }}>
        <h1 style={{ 
          color: status === "success" ? "#2f855a" : status === "error" ? "#c53030" : "#2d3748",
          fontSize: "1.8rem",
          marginBottom: "20px"
        }}>
          {message}
        </h1>

        {ticketInfo && (
          <div style={{ 
            textAlign: "left", 
            borderTop: "1px solid #eee", 
            paddingTop: "20px",
            marginTop: "20px"
          }}>
            <p style={{ margin: "10px 0" }}><strong>Seat:</strong> {ticketInfo.seat}</p>
            <p style={{ margin: "10px 0" }}><strong>Row:</strong> {ticketInfo.row}</p>
            <p style={{ margin: "10px 0", fontSize: "0.8rem", color: "#777" }}>
              <strong>Token ID:</strong> {ticketInfo.qrToken}
            </p>
          </div>
        )}

        <button 
          onClick={() => window.location.href = "/"}
          style={{
            marginTop: "30px",
            padding: "12px 24px",
            backgroundColor: "#ff9f2b",
            color: "#fff",
            border: "none",
            borderRadius: "50px",
            fontWeight: "bold",
            cursor: "pointer"
          }}
        >
          Back to Home
        </button>
      </div>
    </div>
  );
}

export default ScanPage;