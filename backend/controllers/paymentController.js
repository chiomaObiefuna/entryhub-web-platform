const Ticket = require("../models/Ticket");
const crypto = require("crypto");
const QRCode = require("qrcode");
const nodemailer = require("nodemailer");

exports.flutterwaveWebhook = async (req, res) => {
  try {
    const secretHash = process.env.FLW_SECRET_HASH;
    if (req.headers["verif-hash"] !== secretHash) {
      return res.status(401).end();
    }

    const payload = req.body;
    console.log("📦 Webhook payload:", payload);

    // Use the actual structure from your log
    if (payload.status === "successful" && payload.txRef) {
      const tx_ref = payload.txRef; // note: txRef, not data.tx_ref

      const ticket = await Ticket.findOne({ payment_reference: tx_ref });
      if (!ticket) return res.sendStatus(200);

      if (ticket.payment_status === "paid") return res.sendStatus(200);

      ticket.payment_status = "paid";

      if (!ticket.qr_token) ticket.qr_token = crypto.randomBytes(32).toString("hex");

      const verificationUrl = `${process.env.BASE_URL}/api/tickets/verify/${ticket.qr_token}`;
      const qrImage = await QRCode.toDataURL(verificationUrl);

      ticket.qr_image = qrImage;
      await ticket.save();

      console.log("✅ Ticket marked paid and QR saved:", ticket._id);
      // ================================
      // 📧 SEND EMAIL HERE
      // ================================

      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
      });

      await transporter.sendMail({
        from: `"Cinema Tickets 🎟️" <${process.env.EMAIL_USER}>`,
        to: ticket.buyer_email,
        subject: "Your Ticket is Ready 🎉",
        html: `
          <h2>Payment Confirmed ✅</h2>
          <p>Your ticket has been successfully generated.</p>
          
          <p><strong>Seat:</strong> ${ticket.seat?.row || ""}${ticket.seat?.number || ""}</p>

          <p>Please present this QR code at the entrance:</p>
          
          <img src="${qrImage}" alt="QR Code" />

          <p>Enjoy your movie 🍿</p>
        `
      });

      console.log("📧 Email sent to:", ticket.buyer_email);

      return res.sendStatus(200);
    } else {
      console.log("⚠️ Webhook received but not a successful payment");
      return res.sendStatus(200);
    }

  } catch (error) {
    console.error(error);
    return res.sendStatus(500);
  }
};