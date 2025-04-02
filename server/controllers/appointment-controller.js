const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../database/userSchema");
const Pet = require("../database/petSchema");
const Appointment = require("../database/appointSchema");

// ✅ BOOK APPOINTMENT FUNCTION
const bookAppointment = async (req, res) => {
    try {
        const { petId, date, time, careType } = req.body;

        if (!petId || !date || !time || !careType) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // 🔹 Check if the logged-in user exists
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        // 🔹 Check if the selected pet belongs to the logged-in user
        const pet = await Pet.findById(petId);
        if (!pet) {
            return res.status(400).json({ message: "Pet not found" });
        }

        if (pet.owner.toString() !== req.user.id.toString()) {
            return res.status(400).json({ message: "You can only book appointments for your own pets" });
        }

        // 🔹 Create new appointment
        const newAppointment = new Appointment({
            userId: req.user.id, // The logged-in user
            petId,
            date,
            time,
            careType,
        });

        await newAppointment.save();

        res.status(201).json({
            message: "Appointment booked successfully!",
            appointmentId: newAppointment._id,
        });

    } catch (err) {
        console.error("🔴 Booking Appointment Error:", err);
        res.status(500).json({ message: "Internal server error", error: err.message });
    }
};

// ✅ GET USER APPOINTMENTS FUNCTION
const getUserAppointments = async (req, res) => {
    try {
        // Fetch appointments for the logged-in user
        const appointments = await Appointment.find({ userId: req.user.id }).populate("petId", "pname");

        if (!appointments.length) {
            return res.status(404).json({ message: "No appointments found" });
        }

        res.status(200).json({ appointments });
    } catch (err) {
        console.error("🔴 Fetching Appointments Error:", err);
        res.status(500).json({ message: "Internal server error", error: err.message });
    }
};

// ✅ GET PET APPOINTMENTS FUNCTION
const getPetAppointments = async (req, res) => {
    try {
        const petId = req.params.petId;

        // Fetch appointments for a specific pet
        const appointments = await Appointment.find({ petId })
            .populate("userId", "fname lname");

        if (!appointments.length) {
            return res.status(404).json({ message: "No appointments found for this pet" });
        }

        res.status(200).json({ appointments });
    } catch (err) {
        console.error("🔴 Fetching Pet Appointments Error:", err);
        res.status(500).json({ message: "Internal server error", error: err.message });
    }
};


module.exports = { bookAppointment, getUserAppointments, getPetAppointments }