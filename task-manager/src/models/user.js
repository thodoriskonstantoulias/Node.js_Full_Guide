//User model schema
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
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
        unique: true,
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
    },
    tokens : [{
        token : {
            type: String,
            required: true
        }
    }]
});

userSchema.methods.generateAuthToken = async function() {
    const user = this;
    const token = jwt.sign({_id:user._id.toString()}, 'thisismysecret');
     //Add token to user document
     user.tokens = user.tokens.concat({token: token});
     await user.save();

    return token;
};

userSchema.statics.findByCredentials = async (email,password) => {
    //Find user by email and then confirm the password
    const user = await User.findOne({email: email})
    if(!user) {
        throw new Error('Wrong email provided');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error('Password does not match');
    }

    return user;
};

//Create our middleware to run when we save a document-- here to hash the passwords
userSchema.pre('save', async function(next) {
    const user = this;

    if (user.isModified('password')){
        user.password = await bcrypt.hash(user.password, 8);
    }

    next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;