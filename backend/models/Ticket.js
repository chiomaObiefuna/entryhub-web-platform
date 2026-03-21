const mongoose = require("mongoose"); // ✅ import mongoose

const TicketSchema = new mongoose.Schema({
  event: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Event",
    required: true
  },
  seat: {
    row: { type: String, required: true },
    number: { type: Number, required: true }
  },
  buyer_email: {
    type: String,
    required: true
  },
  payment_status: {
    type: String,
    enum: ["pending", "paid", "confirmed"],
    default: "pending"
  },
  payment_reference: {
    type: String
  },
  qr_token: {
    type: String,
    unique: true,
    sparse: true // allows nulls without violating uniqueness
  },
  is_used: {
    type: Boolean,
    default: false
  },
  scanned_at: {
    type: Date
  }
}, { timestamps: true });

// Optional: compound index to prevent double-booking same seat
TicketSchema.index(
  { event: 1, "seat.row": 1, "seat.number": 1 },
  { unique: true }
);

module.exports = mongoose.model("Ticket", TicketSchema);