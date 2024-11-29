import Appointment from "../models/appointment.js";

// Schedule an appointment
export const scheduleAppointment = async (req, res) => {
  try {
    const appointmentData = req.body;
    const newAppointment = new Appointment(appointmentData);
    await newAppointment.save();
    res.status(201).json({
      message: "Appointment scheduled successfully!",
      appointment: newAppointment,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all appointments
export const getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find().populate("veterinarian pet");
    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
