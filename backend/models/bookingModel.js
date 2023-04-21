const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
    vehicle: {
        type: mongoose.Schema.ObjectId,
        ref: 'Vehicle',
        required: [true, 'Booking must belong to a vehicle']
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: [true, 'Booking must belong to a user']
    },
    transactionId: {
        type: String,
    },
    fromDate: {
        type: String,
        required: true
    },
    toDate: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        required: true,
        default: "booked"
    }
}, { timestamps: true })




const Booking = mongoose.model('Booking', bookingSchema);
module.exports = Booking;