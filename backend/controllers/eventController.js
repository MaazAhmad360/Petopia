import Event from "../models/events.js";
import { getUserId } from "../utils/auth.js"; // Import authentication helper

// Register a user for an event
export const registerForEvent = async (req, res) => {
  try {
    // Get the user ID from the token
    const userId = getUserId(req);
    if (!userId) {
      return res.status(401).json({ error: "Unauthorized: Invalid or missing token." });
    }

    const { eventId } = req.body; // Extract event ID from the request body

    // Find the event
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ error: "Event not found." });
    }

    // Check if the user is already an attendee
    if (event.attendees.includes(userId)) {
      return res.status(400).json({ error: "User already registered for this event." });
    }

    // Add the user to the attendees list
    event.attendees.push(userId);
    await event.save();

    res.status(200).json({ message: "Successfully registered for the event!", event });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

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
