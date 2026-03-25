const Event = require("../models/Events");
const Screen = require("../models/Screen");

exports.createEvent = async (req, res) => {
  try {
    const { title, description, price, location, date, category, screen } = req.body;

    // ✅ Validate screen exists
    const existingScreen = await Screen.findById(screen);
    if (!existingScreen) {
      return res.status(404).json({
        message: "Screen not found"
      });
    }

    // ✅ Create event with screen reference
    const event = new Event({
      title,
      price,
      description,
      location,
      date,
      category,
      screen
    });

    await event.save();

    res.status(201).json({
      message: "Event created successfully",
      event
    });

  } catch (error) {
    res.status(500).json({
      message: "Error creating event",
      error: error.message
    });
  }
};

exports.getEvents = async (req, res) => {
  try {
    const events = await Event.find().populate("screen");
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching events",
      error: error.message
    });
  }
};

exports.getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id).populate("screen");
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching event",
      error: error.message
    });
  }
};

exports.getEventsByCategory = async (req, res) => {
  try {
    const { category } = req.params;

    const events = await Event.find({ category }).populate("screen");

    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching events",
      error: error.message
    });
  }
};

exports.updateEvent = async (req, res) => {
  try {
    const { screen } = req.body;

    // ✅ If screen is being updated, validate it
    if (screen) {
      const existingScreen = await Screen.findById(screen);
      if (!existingScreen) {
        return res.status(404).json({
          message: "Screen not found"
        });
      }
    }

    const event = await Event.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    ).populate("screen");

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.status(200).json({
      message: "Event updated",
      event
    });

  } catch (error) {
    res.status(500).json({
      message: "Error updating event",
      error: error.message
    });
  }
};

exports.deleteEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });
    res.status(200).json({ message: "Event deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting event", error: error.message });
  }
};

exports.getEventSeats = async (req, res) => {
  res.json({ message: "Seats endpoint working" });
};
