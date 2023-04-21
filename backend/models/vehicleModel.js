const mongoose = require("mongoose");

const vehicleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    capacity: {
        type: Number,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    rent: {
        type: Number,
        required: true
    },
    image: [],
    available: {
        type: Boolean,
        default: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,

    },
    currentbookings: [],
    category: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }

}, { timestamps: true })


const Vehicle = mongoose.model('Vehicle', vehicleSchema);
module.exports = Vehicle;