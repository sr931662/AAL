


const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../database/userSchema");
const nodemailer = require('nodemailer');

const home = async (req, res) => {
    try {
        res.status(200).send("Home page with authorization");
    } catch (err) {
        res.status(400).send({ message: "Page not found" });
    }
};

// ✅ LOGIN FUNCTION
const login = async (req, res) => {
    try {
        const { email, pass } = req.body;

        if (!email || !pass) {
            return res.status(400).json({ message: "Please provide both email and password" });
        }

        // 🔹 Check if user exists
        const userExist = await User.findOne({ email });
        if (!userExist) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        // console.log("🔹 User Found:", userExist);
        // console.log("🔹 Entered Password:", pass);
        // console.log("🔹 Stored Hashed Password:", userExist.pass);

        // 🔹 Compare entered password with stored hashed password
        const isMatch = await bcrypt.compare(pass, userExist.pass);
        // console.log("🔹 Password Match:", isMatch);

        if (!isMatch) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        // 🔹 Generate JWT Token
        const token = jwt.sign(
            { id: userExist._id, role: userExist.role },
            process.env.JWT_SECRET || "default_secret",
            { expiresIn: "7d" }
        );

        res.status(200).json({
            message: "Login Successful",
            token,
            userID: userExist._id.toString(),
            fname: userExist.fname,
            role: userExist.role // ⭐ Add role to response
          });

    } catch (err) {
        console.error("🔴 Login Error:", err);
        res.status(500).json({ message: "Internal server error", error: err.message });
    }
};

// ✅ REGISTER FUNCTION
const register = async (req, res) => {
    try {
        const { fname, lname, phone, email, pass, repass, address, role, mname } = req.body;

        if (!fname || !lname || !phone || !email || !pass || !repass || !address || !role) {
            return res.status(400).json({ message: "All fields are required" });
        }

        if (pass !== repass) {
            return res.status(400).json({ message: "Passwords do not match" });
        }

        // 🔹 Check if email is already registered
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: "Email already exists" });
        }

        // 🔹 Hash password before storing
        const hashedPassword = await bcrypt.hash(pass, 10);
        console.log("🔹 Hashed Password:", hashedPassword);

        // 🔹 Create new user
        const newUser = new User({
            fname,
            mname: mname || "",
            lname,
            phone,
            email,
            pass: hashedPassword, // Ensure hashed password is stored
            address,
            role
        });

        await newUser.save();

        res.status(201).json({
            message: "Registration Successful",
            userId: newUser._id.toString(),
            role: newUser.role // ⭐ Add role to response
          });
          

    } catch (err) {
        console.error("🔴 Registration Error:", err);
        res.status(500).json({ message: "Internal server error", error: err.message });
    }
};

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({}, { pass: 0, __v: 0 }); // Exclude password & version key
        res.status(200).json(users);
    } catch (err) {
        console.error("Error fetching users:", err);
        res.status(500).json({ 
            message: "Error fetching users", 
            error: err.message 
        });
    }
};


// ✅ GET USER DATA
const userData = async (req, res) => {
    try {
        res.status(200).json({ userInfo: req.user });
    } catch (error) {
        console.error("🔴 User Data Fetch Error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
module.exports = { home, login, register, userData, getAllUsers };
