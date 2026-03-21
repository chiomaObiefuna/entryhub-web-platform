const mongoose = require("mongoose");

const screenSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  // Optional: for grouping cinemas later
  location: {
    type: String
  }
}, {
  timestamps: true
});

module.exports = mongoose.model("Screen", screenSchema);