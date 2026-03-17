const Screen = require("../models/Screen");
const Seat = require("../models/Seat");

exports.createScreen = async (req, res) => {
  try {
    const { name, totalRows, seatsPerRow, vipRows = [] } = req.body;

    const screen = await Screen.create({ name });

    const seats = [];

    for (let i = 0; i < totalRows; i++) {
      const rowLetter = String.fromCharCode(65 + i); // A, B, C...

      for (let j = 1; j <= seatsPerRow; j++) {
        seats.push({
          screen: screen._id,
          row: rowLetter,
          number: j,
          type: vipRows.includes(rowLetter) ? "vip" : "regular"
        });
      }
    }

    await Seat.insertMany(seats);

    res.status(201).json({
      message: "Screen created with seats",
      screen
    });

  } catch (error) {
    res.status(500).json({
      message: "Error creating screen",
      error: error.message
    });
  }
};