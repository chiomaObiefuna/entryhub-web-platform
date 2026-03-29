const Ticket = require("../models/Ticket");
const { createVirtualAccount } = require("../services/flutterwave");
const crypto = require("crypto");
const QRCode = require("qrcode");


// =======================
// 1. Purchase Ticket
// =======================
exports.purchaseTicket = async (req, res) => {
  try {
    const { event, seat, buyer_email } = req.body;

    const ticket = await Ticket.create({
      event,
      seat,
      buyer_email,
      payment_status: "pending",
      qr_token: crypto.randomBytes(32).toString("hex")
    });

    const tx_ref = `ticket_${ticket._id}`;

    const va = await createVirtualAccount({
      email: buyer_email,
      amount: 15000,
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

    if (error.code === 11000) {
      return res.status(400).json({
        message: "Seat already booked for this event"
      });
    }

    res.status(500).json({
      message: "Error creating ticket",
      error: error.message
    });
  }
};


// =======================
// 2. Get Single Ticket
// =======================
exports.getTicket = async (req, res) => {
  try {
    const { id } = req.params;

    const ticket = await Ticket.findById(id).populate("event");

    if (!ticket) {
      return res.status(404).json({ success: false, message: "Ticket not found" });
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
        qr_image: ticket.qr_image, // ✅ use stored QR
        is_used: ticket.is_used,
        scanned_at: ticket.scanned_at
      }
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Error fetching ticket",
      error: err.message
    });
  }
};


// =======================
// 3. Get All Tickets
// =======================
exports.getAllTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find().populate("event");

    const formatted = tickets.map(ticket => ({
      id: ticket._id,
      event: ticket.event?.name,
      seat: ticket.seat,
      buyer_email: ticket.buyer_email,
      payment_status: ticket.payment_status,
      qr_token: ticket.qr_token,
      qr_image: ticket.qr_image,
      is_used: ticket.is_used,
      scanned_at: ticket.scanned_at
    }));

    res.status(200).json({
      success: true,
      count: formatted.length,
      tickets: formatted
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Error fetching tickets",
      error: err.message
    });
  }
};


// =======================
// 4. Verify Ticket (SCAN)
// =======================
const nodemailer = require("nodemailer");

exports.verifyTicket = async (req, res) => {
  try {
    const { token } = req.params;

    const ticket = await Ticket.findOne({ qr_token: token }).populate("event");

    if (!ticket) {
      return res.send(`<h1 style="color:red;">❌ Invalid Ticket</h1>`);
    }

    if (ticket.payment_status !== "paid") {
      return res.send(`<h1 style="color:orange;">⚠️ Payment Pending</h1>`);
    }

    if (ticket.is_used){
      return res.send(`<h1 style="color:red;">❌ Ticket Already Used</h1>`);
    }
    ticket.is_used = true;
    ticket.scanned_at = Date.now();
    await ticket.save();

    // ============================
    // 📧 SEND ALERT EMAIL
    // ============================

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    await transporter.sendMail({
      from: `"Cinema Security 🎟️" <${process.env.EMAIL_USER}>`,
      to: ticket.buyer_email,
      subject: "Your Ticket Was Just Used 🎟️",
      html: `
        <h2>Ticket Access Notification</h2>

        <p>Your ticket has just been used for entry.</p>

        <p><strong>Event:</strong> ${ticket.event.title}</p>
        <p><strong>Seat:</strong> ${ticket.seat.row}${ticket.seat.number}</p>
        <p><strong>Time:</strong> ${new Date(ticket.scanned_at).toLocaleString()}</p>

        <hr/>

        <p>If this was NOT you, please call immediately:</p>
        <h3 style="color:red;">📞 08131234567</h3>

        <p>Thank you.</p>
      `
    });

    console.log("📧 Scan alert email sent to:", ticket.buyer_email);

    // ============================

    return res.send(`
      <h1 style="color:green;">✅ Access Granted</h1>
      <p><strong>Event:</strong> ${ticket.event.title}</p>
      <p><strong>Seat:</strong> ${ticket.seat.row}${ticket.seat.number}</p>
      <p><strong>Buyer:</strong> ${ticket.buyer_email}</p>
    `);

  } catch (error) {
    console.error(error);
    res.status(500).send(`<h1>❌ Verification Error</h1>`);
  }
};