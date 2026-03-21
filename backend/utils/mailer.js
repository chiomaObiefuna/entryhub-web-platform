const nodemailer = require("nodemailer");

try {
  const info = await transporter.sendMail({
    from: `"EventHub" <${process.env.EMAIL_USER}>`,
    to: ticket.buyer_email,
    subject: "Your Ticket & QR Code",
    html: `<h2>Payment Confirmed 🎉</h2><img src="${qrImage}" />`
  });
  console.log("Email sent:", info.response);
} catch (err) {
  console.error("Email error:", err);
}