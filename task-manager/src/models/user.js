//User model schema
const mongoose = require('mongoose');
const validator = require('validator');

const User = mongoose.model('User', {
    name: {
        type:String,
        required: true
    },
    age : {
        type:Number,
        default : 0,
        validate(value) {
            if (value < 0) {
                throw new Error('Age must be positive');
            }
        }
    },
    email : {
        type:String,
        required: true,
        lowercase : true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid');
            }
        }
    },
    password : {
        type: String,
        required: true,
        minlength: 7,
        trim :true,
        validate(value) {
            if (value.includes('password')) {
                throw new Error('Password cannot contain the word password');
            }
        }
    }
});

module.exports = User;