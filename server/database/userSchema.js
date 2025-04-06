const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
    fname: { type: String, required: true },
    mname: { type: String },
    lname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: Number, required: true, unique: true },
    pass: { type: String, required: true },
    address: {
        pincode: { type: Number, required: true },
        houseNo: { type: String, required: true },
        street_name: { type: String, required: true },
        district: { type: String },
        city: { type: String, required: true },
        state: { type: String, required: true },
        country: { type: String, required: true }
    },
    role: {
        type: String,
        enum: ["vet", "visitor", "admin"],
        required: true
    }
});

// Hash password before saving
userSchema.pre("save", async function (next) {
    if (!this.isModified("pass")) return next(); // Only hash if password is modified

    if (this.pass.startsWith("$2")) return next(); // Prevent double hashing

    try {
        const salt = await bcrypt.genSalt(10);
        this.pass = await bcrypt.hash(this.pass, salt);
        next();
    } catch (err) {
        next(err);
    }
});

// Generate JSON Web Token
userSchema.methods.generateToken = async function () {
    try{
        return jwt.sign(
            {
                _id: this._id.toString(),
                email: this.email,
                fname: this.fname
            },
            process.env.SECRET_KEY,
            { expiresIn: "30d" }
        );
    }
    catch (error) {
        console.log("Token Error : ", error);
    }
};

module.exports = mongoose.model("USER", userSchema);
