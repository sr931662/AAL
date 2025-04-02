const mongodb = require("mongoose");

const appointmentSchema = new mongodb.Schema({
    aid: {
        type: String,
        required: true
    },
    pet_id: {
        type: String,
        required: true
    },
    vet_id: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ["Scheduled", "Completed", "Cancelled"],
        required: true
    },
    notes: {
        type: String,
        required: false
    }
});

module.exports = mongodb.model("APPOINTMENT", appointmentSchema);
