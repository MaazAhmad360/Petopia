import Event from "../models/events.js";

// Create a new event
export const createEvent = async (req, res) => {
  try {
    console.log("Request body:", req.body); // Log incoming data
    const newEvent = new Event(req.body);
    await newEvent.save(); // Try saving the event
    res.status(201).json({ message: "Event created successfully!", event: newEvent });
  } catch (error) {
    console.error("Error in createEvent controller:", error.message); // Log backend error
    res.status(500).json({ error: error.message });
  }
};


// Get all events
export const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find().populate("organizer attendees"); // Fetch all events
    res.status(200).json({events}); // Send all events as response
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Get a single event by ID
export const getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: "Event not found." });
    }
    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
