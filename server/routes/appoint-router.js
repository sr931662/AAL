const express = require("express");
const router = express.Router();
const appointmentsController = require("../controllers/appointment-controller");  // Assuming you've created this controller
const authMiddleware = require("../mid/auth-mid");  // Using the existing auth middleware

// ✅ Route to book a new pet care appointment
router.route("/").post(authMiddleware, appointmentsController.bookAppointment);

// ✅ Route to fetch all appointments for the logged-in user
router.route("/").get(authMiddleware, appointmentsController.getUserAppointments);

// ✅ Route to fetch appointments for a specific pet by petId
router.route("/pet/:petId").get(authMiddleware, appointmentsController.getPetAppointments);

module.exports = router;
