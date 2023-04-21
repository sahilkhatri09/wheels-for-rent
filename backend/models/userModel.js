const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'please provide your name']
    },
    email: {
        type: String,
        required: [true, 'Please provide email'],
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: [true, 'Please provide password'],
        select: false
    },
    passwordConfirm: {
        type: String,
        required: [true, 'Please confirm your password'],
        validate: {
            validator: function (el) {
                return el == this.password;
            },
            message: 'Password doesNot match'
        },
    },
    licenceNo: {
        type: String,
        required: true
    },
    phoneNo: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    }
})


userSchema.methods.correctPassword = async function (
    canditatePassword, userPassword
) {
    return await bcrypt.compare(canditatePassword, userPassword);
}


userSchema.pre('save', async function (next) {
    // only if password is modified
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 12);

    // delete password Confirm field
    this.passwordConfirm = undefined
    next();
}, { timestamps: true })

const User = mongoose.model('User', userSchema);
module.exports = User;