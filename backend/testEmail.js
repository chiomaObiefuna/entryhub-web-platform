require('dotenv').config();
const nodemailer = require("nodemailer");

async function sendTestEmail() {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,  // your Gmail
        pass: process.env.EMAIL_PASS   // must be an App Password
      }
    });

    const info = await transporter.sendMail({
      from: `"EventHub Test" <${process.env.EMAIL_USER}>`,
      to: "stepabod@yahoo.com", // replace with your Yahoo test email
      subject: "Test Email from EventHub",
      text: "Hello! This is a plain text test email from EventHub. ✅"
    });

    console.log("Test email sent:", info.response);
  } catch (err) {
    console.error("Error sending test email:", err);
  }
}

// Run it
sendTestEmail();