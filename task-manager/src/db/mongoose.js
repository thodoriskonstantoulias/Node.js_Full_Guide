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
    }
});

const Task = mongoose.model('Tasks', { 
    description : {
        type : String
    },
    completed : {
        type: Boolean
    }
});

//Insert a user
const me = new User({
    name: 'Kostas',
    age : 36,
    email : 'kostas@yahoo.com'
});

me.save().then(() => {
    console.log(me);
}).catch((error) => {
    console.log('Error!', error);
})

//Insert a task 
// const task = new Task({
//     description : 'Go to supermarket',
//     completed : false
// });

// task.save().then(() => {
//     console.log(task);
// }).catch((error) => {
//     console.log(error);
// });
