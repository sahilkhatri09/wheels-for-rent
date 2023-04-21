const Vehicle = require('../models/vehicleModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.createVehicle = catchAsync(async (req, res, next) => {
    const vehicle = await Vehicle.create({
        name: req.body.name,
        capacity: req.body.capacity * 1,
        type: req.body.type,
        rent: req.body.rent * 1,
        image: req.body.image,
        owner: req.user._id,
        currentbookings: [],
        category: req.body.category,
        address: req.body.address,
        description: req.body.description

    });
    res.status(201).json({
        status: 'success',
        data: {
            data: vehicle
        }
    })
})

exports.getVehicle = catchAsync(async (req, res, next) => {

    const vehicle = await Vehicle.findById(req.params.id);
    if (!vehicle) {
        return next(new AppError('No Document found with that ID', 404));
    }
    res.status(200).json({
        status: 'success',
        data: vehicle

    })
})

exports.updateVehicle = catchAsync(async (req, res, next) => {
    const vehicle = await Model.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });
    if (!doc) {
        return next(new AppError('No vehicle found with this id'), 404)
    }

    res.status(200).json({
        status: 'success',
        data: {
            data: vehicle
        }
    })

});

exports.deleteVehicle = catchAsync(async (req, res, next) => {
    const vehicle = await Vehicle.findById({ _id: req.params.id });
    if (!vehicle) {
        return next(new AppError('No Document found with that id', 404));
    }

    if (vehicle.available === true) {
        vehicle.available = false;
    }
    else {
        vehicle.available = true;
    }
    await vehicle.save();

    res.status(200).json({
        status: 'success',
        message: "deleted success"
    });
})


exports.getAll = catchAsync(async (req, res, next) => {
    // get all the avaiable vehicles 
    const availableVehicle = await Vehicle.find({ available: true })
    // return with code 200 (ok success )
    res.status(200).json({
        status: "success",
        results: availableVehicle.length,
        data: availableVehicle
    })
})

exports.getAllVehicles = catchAsync(async (req, res, next) => {
    const vehicles = await Vehicle.find();
    res.status(200).json({
        status: 'success',
        data: vehicles
    })
})