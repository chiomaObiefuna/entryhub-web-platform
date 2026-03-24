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
// =======================
// Get all screens
// =======================
exports.getScreens = async (req, res) => {
  try {
    const screens = await Screen.find();

    res.status(200).json({
      success: true,
      count: screens.length,
      screens
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching screens",
      error: error.message
    });
  }
};


// =======================
// Get screen by ID (with seats)
// =======================
exports.getScreenById = async (req, res) => {
  try {
    const { id } = req.params;

    const screen = await Screen.findById(id);

    if (!screen) {
      return res.status(404).json({
        success: false,
        message: "Screen not found"
      });
    }

    // fetch seats for this screen
    const seats = await Seat.find({ screen: id }).sort({ row: 1, number: 1 });

    res.status(200).json({
      success: true,
      screen,
      seats
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching screen",
      error: error.message
    });
  }
};