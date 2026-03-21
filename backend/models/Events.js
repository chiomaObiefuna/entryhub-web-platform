const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  location: { type: String },

  // 👇 THIS IS THE KEY ADDITION
  screen: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Screen",
    required: true
  },

  date: { type: Date, required: true },

  category: {
    type: String,
    required: true,
    enum: ["concert", "cinema", "football", "festival", "comedy"]
  }
}, {
  timestamps: true
});

module.exports = mongoose.model("Event", eventSchema);