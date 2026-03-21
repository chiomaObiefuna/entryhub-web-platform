const Ticket = require("../models/Ticket");
const { createVirtualAccount } = require("../services/flutterwave");
const crypto = require("crypto");
const QRCode = require("qrcode");
// 1. Purchase Ticket Logic
exports.purchaseTicket = async (req, res) => {
  try {
    const { event, seat, buyer_email } = req.body;

    // Create pending ticket
    const ticket = await Ticket.create({
      event,
      seat,
      buyer_email,
      payment_status: "pending",
      qr_token: crypto.randomBytes(32).toString("hex")
    });

    const tx_ref = `ticket_${ticket._id}`;

    // VA Creation
    const va = await createVirtualAccount({
      email: buyer_email,
      amount: 15000, // ⚠️ Ideally, fetch this from the Event model
      tx_ref
    });

    ticket.payment_reference = tx_ref;
    await ticket.save();

    res.status(201).json({
      message: "Complete payment using the account below",
      account_number: va.account_number,
      bank_name: va.bank_name,
      amount: va.amount,
      reference: tx_ref
    });

  } catch (error) {
  // ✅ Handle duplicate seat booking
  if (error.code === 11000) {
    return res.status(400).json({
      message: "Seat already booked for this event"
    });
  }

  // fallback for other errors
  res.status(500).json({
    message: "Error creating ticket",
    error: error.message
  });
}
};

exports.getTicket = async (req, res) => {
  try {
    const { id } = req.params;

    const ticket = await Ticket.findById(id).populate("event");

    if (!ticket) {
      return res.status(404).json({ success: false, message: "Ticket not found" });
    }

    // Generate QR image if ticket has a token
    let qrImage = null;
    if (ticket.qr_token) {
      qrImage = await QRCode.toDataURL(ticket.qr_token);
    }

    res.status(200).json({
      success: true,
      ticket: {
        id: ticket._id,
        event: ticket.event.name,
        seat: ticket.seat,
        buyer_email: ticket.buyer_email,
        payment_status: ticket.payment_status,
        qr_token: ticket.qr_token,
        qr_image: qrImage,
        is_used: ticket.is_used,
        scanned_at: ticket.scanned_at
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Error fetching ticket", error: err.message });
  }
};

exports.getAllTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find().populate("event");

    // Optionally generate QR images for all tickets
    const ticketsWithQR = await Promise.all(
      tickets.map(async (ticket) => {
        let qrImage = null;
        if (ticket.qr_token) {
          qrImage = await QRCode.toDataURL(ticket.qr_token);
        }
        return {
          id: ticket._id,
          event: ticket.event.name,
          seat: ticket.seat,
          buyer_email: ticket.buyer_email,
          payment_status: ticket.payment_status,
          qr_token: ticket.qr_token,
          qr_image: qrImage,
          is_used: ticket.is_used,
          scanned_at: ticket.scanned_at,
        };
      })
    );

    res.status(200).json({ success: true, tickets: ticketsWithQR });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Error fetching tickets", error: err.message });
  }
};

// 2. Verification Logic (New)
exports.verifyTicket = async (req, res) => {
  try {
    const { token } = req.params; // This matches /verify/:token in your routes

    // Find the ticket by its ID (or a unique token/QR string if you generate one)
    const ticket = await Ticket.findById(token).populate("event");

    if (!ticket) {
      return res.status(404).json({ success: false, message: "Ticket not found" });
    }

    // Check if the ticket has actually been paid for
    if (ticket.payment_status !== "confirmed") {
      return res.status(400).json({ 
        success: false, 
        message: "Payment for this ticket is still pending or failed" 
      });
    }

    // Check if the ticket has already been used (to prevent double entry)
    if (ticket.is_used) {
      return res.status(400).json({ 
        success: false, 
        message: "This ticket has already been used/scanned" 
      });
    }

    // If all checks pass, mark the ticket as used
    ticket.is_used = true;
    ticket.scanned_at = Date.now();
    await ticket.save();

    res.status(200).json({
      success: true,
      message: "Ticket verified! Grant entry.",
      data: {
        event: ticket.event.name,
        seat: ticket.seat,
        buyer: ticket.buyer_email
      }
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Verification error",
      error: error.message
    });
  }
};