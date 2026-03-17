const mongoose = require("mongoose");

const seatSchema = new mongoose.Schema({
  screen: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Screen",
    required: true
  },
  row: {
    type: String,
    required: true
  },
  number: {
    type: Number,
    required: true
  },
  type: {
    type: String,
    enum: ["regular", "vip"],
    default: "regular"
  }
}, {
  timestamps: true
});

// prevent duplicate seats in same screen
seatSchema.index({ screen: 1, row: 1, number: 1 }, { unique: true });

module.exports = mongoose.model("Seat", seatSchema);