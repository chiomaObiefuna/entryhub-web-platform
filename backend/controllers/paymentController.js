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

      res.sendStatus(200);
    } else {
      console.log("⚠️ Webhook received but not a successful payment");
      res.sendStatus(200);
    }

  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};