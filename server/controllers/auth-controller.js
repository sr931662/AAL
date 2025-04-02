// // // const bcrypt = require("bcryptjs")
// // // const User = require("../DB/userSchema")
// // const { useEffect } = require("react")
// // const e = require("express")


// // const home = async (req, res) => {
// //     try {
// //         res
// //         .status(200)
// //         .send(
// //             "Home page with authorization"
// //         )
// //     }
// //     catch (err) {
// //         res.status(400).send({Message : "Page not found"})
// //     }
// // }



// // const login = async (req, res) => {

// //     try { 
// //         const { email, pass } = req.body
// //         const userExist = await User.findOne({ email })
// //         // console.log(userExist)

// //         if (!userExist) {
// //             return res.status(400).json({ message : "Invalid Credentials" })
// //         }

// //         const user = bcrypt.compare(pass, userExist.pass)

// //         if (user) {
// //             res.status(200).json({
// //                 msg: "Login Successful",
// //                 token: await userExist.generateToken(),
// //                 userID: userExist._id.toString(),
// //                 fname: userExist.fname.toString()
// //             })
// //         }
// //         else {
// //             res.status(401).json({ message : "Invalid email or password" })
// //         }
// //     }
// //     catch (err) {
// //         res.status(500).json({ message: "Internal server error" });
// //     }
// // }

// // const register = async (req, res) => {
// //     try {
// //         console.log(req.body)
// //         const { fname, lname, phone, email, pass, repass } = req.body

// //         const userExists = await User.findOne({ email: email })

// //         if (userExists) {
// //             return res.status(400).json({ msg : "Email already exists" })
// //         }
// //         else {
// //             const userCreated = await User.create({ fname, lname, phone, email, pass, repass })
// //             res.status(201).json({
// //                 msg: "Registration Successful",
// //                 token: await userCreated.generateToken(),
// //                 userId: userCreated._id.toString(),
// //             });
// //         }

// //     }
// //     catch (err) {
// //         res.status(500).json({ Message : err })
// //     }
// // }
// // module.exports = {home, login, register}















// // const register = async (req, res) => {
// //     try {
// //         console.log("Received Data:", req.body); // Debugging line

// //         const { fname, lname, phone, email, pass, repass, address, role, mname } = req.body;
// //         if (!fname || !lname || !phone || !email || !pass || !repass || !address || !role) {
// //             return res.status(400).json({ message: "All fields are required" });
// //         }

// //         if (pass !== repass) {
// //             return res.status(400).json({ message: "Passwords do not match" });
// //         }

// //         const userExists = await User.findOne({ email });

// //         if (userExists) {
// //             return res.status(400).json({ message: "Email already exists" });
// //         }

// //         const hashedPassword = await bcrypt.hash(pass, 10);

// //         const newUser = new User({
// //             fname,
// //             mname: mname || "", // Ensure mname is always present
// //             lname,
// //             phone,
// //             email,
// //             pass: hashedPassword,
// //             address,
// //             role
// //         });

// //         await newUser.save();

// //         res.status(201).json({
// //             msg: "Registration Successful",
// //             userId: newUser._id.toString(),
// //         });
// //     } catch (err) {
// //         res.status(500).json({ message: "Internal server error", error: err });
// //     }
// // };

// // const login = async (req, res) => {
// //     try {
// //         const { email, pass } = req.body;

// //         if (!email || !pass) {
// //             return res.status(400).json({ message: "Please provide both email and password" });
// //         }

// //         const userExist = await User.findOne({ email });

// //         if (!userExist) {
// //             return res.status(400).json({ message: "Invalid credentials" });
// //         }
// //         console.log("User Exist:", userExist);
// //         console.log("Entered Password:", pass);
// //         console.log("Stored Hashed Password:", userExist.pass);
        
// //         const isMatch = await bcrypt.compare(pass, userExist.pass);
// //         // console.log("Password Match:", isMatch);
// //         if (!isMatch) {

// //             return res.status(401).json({ message: "Invalid email or password" });
// //         }

// //         const token = jwt.sign({ id: userExist._id, role: userExist.role }, process.env.JWT_SECRET, { expiresIn: "7d" });

// //         res.status(200).json({
// //             msg: "Login Successful",
// //             token,
// //             userID: userExist._id.toString(),
// //             fname: userExist.fname
// //         });
// //     } catch (err) {
// //         res.status(500).json({ message: "Internal server error" });
// //     }
// // };

























// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken"); // Assuming you will use JWT for token generation
// const User = require("../database/userSchema")

// const home = async (req, res) => {
//     try {
//         res.status(200).send("Home page with authorization");
//     } catch (err) {
//         res.status(400).send({ message: "Page not found" });
//     }
// };


// const login = async (req, res) => {
//     try {
//         const { email, pass } = req.body;
//         if (!email || !pass) {
//             return res.status(400).json({ message: "Please provide both email and password" });
//         }

//         const userExist = await User.findOne({ email });

//         if (!userExist) {
//             return res.status(400).json({ message: "Invalid credentials" });
//         }

//         console.log("User Exist:", userExist);
//         console.log("Entered Password:", pass);
//         console.log("Stored Hashed Password:", userExist.pass);
        
//         const isMatch = await bcrypt.compare(pass, userExist.pass);
//         console.log("Password Match:", isMatch);

//         if (!isMatch) {
//             return res.status(401).json({ message: "Invalid email or password" });
//         }

//         const token = jwt.sign(
//             { id: userExist._id, role: userExist.role },
//             process.env.JWT_SECRET,
//             { expiresIn: "7d" }
//         );

//         res.status(200).json({
//             msg: "Login Successful",
//             token,
//             userID: userExist._id.toString(),
//             fname: userExist.fname
//         });
//     } catch (err) {
//         res.status(500).json({ message: "Internal server error" });
//     }
// };


// const register = async (req, res) => {
//     try {
//         const { fname, lname, phone, email, pass, repass, address, role, mname } = req.body;

//         if (!fname || !lname || !phone || !email || !pass || !repass || !address || !role) {
//             return res.status(400).json({ message: "All fields are required" });
//         }

//         if (pass !== repass) {
//             return res.status(400).json({ message: "Passwords do not match" });
//         }

//         const userExists = await User.findOne({ email });
//         if (userExists) {
//             return res.status(400).json({ message: "Email already exists" });
//         }

//         // 🔹 Ensure password is hashed before storing in DB
//         const hashedPassword = await bcrypt.hash(pass, 10);
//         console.log("Stored Hashed Password:", hashedPassword); // Debugging line

//         const newUser = new User({
//             fname,
//             mname: mname || "", 
//             lname,
//             phone,
//             email,
//             pass: hashedPassword, // Ensure hashed password is stored
//             address,
//             role
//         });

//         await newUser.save();

//         res.status(201).json({
//             msg: "Registration Successful",
//             userId: newUser._id.toString(),
//         });
//     } catch (err) {
//         res.status(500).json({ message: "Internal server error", error: err });
//     }
// };


// const userData = async (req, res) => {
//     try {
//         const userInfo = req.user;
//         res.status(200).json({ userInfo });
//     } catch (error) {
//         console.log(`Error from the user route ${error}`);
//         res.status(500).json({ message: "Internal server error" });
//     }
// };


// module.exports = { home, login, register, userData };



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



// ✅ GET USER DATA
const userData = async (req, res) => {
    try {
        res.status(200).json({ userInfo: req.user });
    } catch (error) {
        console.error("🔴 User Data Fetch Error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
module.exports = { home, login, register, userData };
