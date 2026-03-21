exports.paymentWebhook = async (req, res) => {
  try {
    const event = req.body;

    // verify payment success
    if (event.event === "charge.success") {
      const reference = event.data.reference;

      const ticket = await Ticket.findOne({
        payment_reference: reference
      });

      if (!ticket) return res.sendStatus(200);

      // ✅ mark as paid
      ticket.payment_status = "paid";

      // 🔐 generate QR token
      const token = require("crypto").randomBytes(32).toString("hex");
      ticket.qr_token = token;

      await ticket.save();

      // 📧 send email with QR
      await sendTicketEmail(ticket);

    }

    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};