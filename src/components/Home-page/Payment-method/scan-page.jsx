import { useState, useEffect } from "react";

function ScanPage() {
  const [message, setMessage] = useState("");
  const [ticketInfo, setTicketInfo] = useState(null);

  useEffect(() => {
    // 1️⃣ Get token from URL
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    // 2️⃣ Get tickets from localStorage
    const tickets = JSON.parse(localStorage.getItem("mockTickets") || "[]");
    const ticket = tickets.find((t) => t.qrToken === token);

    // 3️⃣ Handle invalid token
    if (!ticket) {
      setMessage("Invalid ticket");
      return;
    }

    // 4️⃣ Handle first scan vs already used
    if (ticket.used) {
      setMessage("Ticket already used! Access denied");
    } else {
      setMessage("Access granted");
      ticket.used = true; // mark as used
      localStorage.setItem("mockTickets", JSON.stringify(tickets));
      setTicketInfo(ticket); // optional, show seat number / buyer info
    }
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>{message}</h1>
      {ticketInfo && (
        <div>
          <p>Seat: {ticketInfo.seat}</p>
          <p>Row: {ticketInfo.row}</p>
          <p>Token: {ticketInfo.qrToken}</p>
        </div>
      )}
    </div>
  );
}

export default ScanPage;
