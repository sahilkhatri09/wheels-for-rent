const catchAsync = require('../utils/catchAsync');
const Vehicle = require('../models/vehicleModel');
const Booking = require('../models/bookingModel');
const User = require('../models/userModel');
const AppError = require('../utils/appError');
// const stripe = require('stripe')('procees.env.StripeKey')
// const { v4: uuidv4 } = require('uuid');



exports.bookVehicle = catchAsync(async (req, res, next) => {
    // const token = req.body.token;
    const bookingData = {
        vehicle: req.params.id,
        user: req.user._id,
        transactionId: "sample",
        fromDate: req.body.fromDate,
        toDate: req.body.toDate,
        amount: req.body.amount * 1,
    }

    // const customer = await stripe.customers.create({
    //     email: token.email,
    //     source: token.id
    // })

    // const payment = await stripe.charges.create(
    //     {
    //         amount: req.body.amount * 100,
    //         customer: customer.id,
    //         currency: 'usd',
    //         receipt_email: token.email
    //     }, {
    //     idempotencyKey: uuidv4()
    // }
    // )

    const booking = await Booking.create(bookingData);

    if (!booking) {
        return next(new AppError('something went wrong with booking', 404));
    }
    const vehicle = await Vehicle.findById({ _id: req.params.id });
    vehicle.currentbookings.push({
        fromDate: req.body.fromDate,
        toDate: req.body.toDate,
        bookingId: booking._id,
        status: "booked"
    })
    await vehicle.save();
    res.status(201).json({
        status: "success",
        data: booking
    })
})

exports.deleteBooking = catchAsync(async (req, res, next) => {

    const vehicleId = req.body.vehicleId;
    const bookingId = req.body.bookingId;

    const booking = await Booking.findById({ _id: bookingId });
    const bookedAt = new Date(booking.createdAt).getTime();
    const current = new Date(Date.now()).getTime();
    const diff = (current - bookedAt) / 3600000;
    if (diff > 24.00) {
        return res.status(200).json({
            status: 'fail',
            message: 'You cannot cancel this booking'
        })
    }


    booking.status = "canceled";
    await booking.save();

    const vehicle = await Vehicle.findById({ _id: vehicleId });
    vehicle.currentbookings = vehicle.currentbookings.filter((booking) => {
        return booking.bookingId != bookingId
    })
    await vehicle.save();
    res.status(200).json({
        status: 'success',
        message: "booking canceled"
    })

})


exports.getAllbooking = catchAsync(async (req, res, next) => {
    const bookings = await Booking.find().populate("vehicle").populate('user');
    res.status(200).json({
        status: 'success',
        data: bookings
    })
})