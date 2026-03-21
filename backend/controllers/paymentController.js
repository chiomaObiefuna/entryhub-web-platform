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

    if (payload.event === "charge.completed" && payload.data.status === "successful") {
      const tx_ref = payload.data.tx_ref;

      const ticket = await Ticket.findOne({ payment_reference: tx_ref });
      if (!ticket) return res.sendStatus(200);

      // prevent duplicate processing
      if (ticket.payment_status === "paid") return res.sendStatus(200);

      // ✅ mark as paid
      ticket.payment_status = "paid";

      // generate QR token if not exists
      if (!ticket.qr_token) ticket.qr_token = crypto.randomBytes(32).toString("hex");

      // generate QR image
      const qrImage = await QRCode.toDataURL(ticket.qr_token);

      // save QR image to ticket
      ticket.qr_image = qrImage;
      await ticket.save();

      console.log("✅ Ticket marked paid and QR saved:", ticket._id);

      // Optional: send email (non-blocking)
      (async () => {
        try {
          const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
              user: process.env.EMAIL_USER,
              pass: process.env.EMAIL_PASS, // must be app password
            },
          });

          await transporter.sendMail({
            from: `"EventHub" <${process.env.EMAIL_USER}>`,
            to: ticket.buyer_email,
            subject: "🎟️ Your Ticket & QR Code",
            html: `
              <h2>Payment Confirmed 🎉</h2>
              <p>Your ticket is ready.</p>
              <p><strong>Seat:</strong> ${ticket.seat.row}${ticket.seat.number}</p>
              <img src="${qrImage}" />
            `,
          });

          console.log("✅ Ticket email sent:", ticket.buyer_email);
        } catch (err) {
          console.error("⚠️ Failed to send ticket email:", err.message);
        }
      })();
    }

    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};