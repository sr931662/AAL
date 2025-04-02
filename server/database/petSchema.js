const mongodb = require("mongoose");

const petSchema = new mongodb.Schema({
    pid: {
        type: String,
        required: true
    },
    pname: {
        type: String,
        required: true
    },
    pimage: {
        type: String,
        required: true
    },
    ptype: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        enum: ["male", "female"],
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    likes: {
        type: Number,
        required: true
    },
    shelter_loc: {
        type: String,
        required: true
    },
    v_status: {
        type: String,
        enum: ["Vaccinated", "Non-vaccinated", "In-progress"],
        required: true,
    },
    t_status: {
        type: String,
        enum: ["House trained", "Shelter trained", "K9 trained", "Puppies training"],
        required: true
    }
})

module.exports = mongodb.model("PET", petSchema);