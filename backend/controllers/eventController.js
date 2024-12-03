import Event from "../models/events.js";

// Create a new event
export const createEvent = async (req, res) => {
  try {
    const eventData = req.body;
    const newEvent = new Event(eventData);
    await newEvent.save();
    res
      .status(201)
      .json({ message: "Event created successfully!", event: newEvent });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all events
export const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find().populate("organizer attendees");
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
