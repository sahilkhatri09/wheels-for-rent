const catchAsync = require("../utils/catchAsync");
const Booking = require('../models/bookingModel');
const Vehicle = require('../models/vehicleModel');
const User = require("../models/userModel");

exports.getBookings = catchAsync(async (req, res, next) => {
    const bookings = await Booking.find({ user: req.user._id }).populate('vehicle');
    res.status(200).json({
        status: 'success',
        data: bookings
    })
})

exports.me = catchAsync(async (req, res, next) => {
    res.status(200).json({
        status: "success",
        data: req.user
    });
})


exports.getAllUser = catchAsync(async (req, res, next) => {
    const users = await User.find();
    res.status(200).json({
        status: "success",
        data: users
    })
})