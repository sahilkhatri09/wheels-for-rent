const catchAsync = require('../utils/catchAsync')
const User = require('../models/userModel')
const jwt = require('jsonwebtoken');
const AppError = require('../utils/appError');

const signToken = id => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    })
}

const createSendToken = (user, statusCode, req, res) => {
    const token = signToken(user._id);
    const options = {
        expires: new Date(
            Date.now() + (process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000)
        ),
        httpOnly: true,
    }

    user.password = undefined;

    res.status(statusCode).cookie("token", token, options).json({
        status: "success",
        token,
        data: user

    })

}

exports.signup = catchAsync(async (req, res, next) => {

    const user = await User.find({ email: req.body.email });

    if (user.length !== 0) {
        res.status(200).json({
            status: 'fail',
            message: "User with this email already exist"
        })
        return;
    }

    const newUser = await User.create({
        name: req.body.name,
        email: req.body.email,
        licenceNo: req.body.licenceNo,
        phoneNo: req.body.phoneNo,
        password: req.body.password,
        passwordConfirm: req.body.passwordConfirm,
        gender: req.body.gender,
        role: 'user'
    })

    createSendToken(newUser, 201, req, res);
})

exports.login = catchAsync(async (req, res, next) => {
    const { email, password } = req.body;
    //1) check if email password exist
    if (!email || !password) {
        return next(new AppError('Please provide email and password', 400));
    }

    //2) check if user exist
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
        return res.status(200).json({
            status: 'fail',
            message: "please enter correct email and password"
        });
    }

    //3) check if password is correct
    const isCorrect = await user.correctPassword(password, user.password);
    if (!isCorrect) {
        return res.status(200).json({
            status: 'fail',
            message: "please enter correct email and password"
        });
    }

    createSendToken(user, 200, req, res);
})

exports.logout = catchAsync(async (req, res, next) => {
    res.cookie('token', null, {
        expires: new Date(Date.now()),
        httpOnly: true,
    });
    res.user = undefined;
    res.status(200).json({
        status: "success",
        message: "Logout Success"
    });
})