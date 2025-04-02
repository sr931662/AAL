const mongoose = require('mongoose');

// Define the CareTips schema
const careTipSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    category: {
        type: String,
        enum: ['General', 'Health', 'Beauty', 'Personal Care', 'Others'], // You can define categories as per your needs
        default: 'General',
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Assuming you have a User schema and want to track who created the tip
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
    isActive: {
        type: Boolean,
        default: true, // To manage if the care tip is active or archived
    },
});

careTipSchema.pre('save', function(next) {
    // Update the updatedAt field on any save
    this.updatedAt = Date.now();
    next();
});

// Create a model for CareTip
const CareTip = mongoose.model('CareTip', careTipSchema);

module.exports = CareTip;
