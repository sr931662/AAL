const express = require("express")
const router = express.Router()
const authController = require("../controllers/auth-controller")
const signupSchema = require("../mid/zod-valid")
const authMiddleware = require("../mid/auth-mid")
const validate = require('../mid/valid-mid')
const petController = require("../controllers/pet-controller")
const bookAppointment = require("../controllers/appointment-controller")

router.route("/").get(authController.home)

router.route("/login").post(authController.login)

router.route("/sign-up").post(validate(signupSchema), authController.register)

router.route("/user").get(authMiddleware, authController.userData)

// Route to add a new pet
router.route('/add-pet').post(petController.addPet);
router.route('/pets')
    .get(petController.getAllPets)  // Add this GET endpoint
    .post(petController.addPet);    // Existing POST endpoint

// Add these routes
router.route('/appointments')
    .post(authMiddleware, bookAppointment.bookAppointment)
    .get(authMiddleware, bookAppointment.getUserAppointments);

router.route('/pets/appointments/:petId')
    .get(authMiddleware, bookAppointment.getPetAppointments);

module.exports = router