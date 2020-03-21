//All database related goes in here
const mongoose = require('mongoose');
const validator = require('validator');

//Connect to MongoDB database
mongoose.connect("mongodb://localhost:27017/task-manager-api", {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})

//Create the models 
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

const Task = mongoose.model('Tasks', { 
    description : {
        type : String,
        trim: true,
        required : true
    },
    completed : {
        type: Boolean,
        default: false
    }
});

//Insert a user
// const me = new User({
//     name: 'Mary',
//     age : 36,
//     email : 'mary@yahoo.com',
//     password : 'passwod123'
// });

// me.save().then(() => {
//     console.log(me);
// }).catch((error) => {
//     console.log('Error!', error);
// })

//Insert a task 
const task = new Task({
    description : 'Go for shopping'
});

task.save().then(() => {
    console.log(task);
}).catch((error) => {
    console.log(error);
});
