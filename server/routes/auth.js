const express = require("express")
const router = express.Router()
const authController = require("../controllers/auth-controller")
const signupSchema = require("../mid/zod-valid")
const authMiddleware = require("../mid/auth-mid")
const validate = require('../mid/valid-mid')
const petController = require("../controllers/pet-controller")

router.route("/").get(authController.home)

router.route("/login").post(authController.login)

router.route("/sign-up").post(validate(signupSchema), authController.register)

router.route("/user").get(authMiddleware, authController.getAllUsers)

// Route to add a new pet
router.route('/add-pet').post(petController.addPet);
router.route('/pets')
    .get(petController.getAllPets)  // Add this GET endpoint
    .post(petController.addPet);    // Existing POST endpoint

// Add this new route
router.get('/pets/:id', petController.getPetById);


module.exports = router