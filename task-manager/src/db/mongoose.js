//All database related goes in here
const mongoose = require('mongoose');

//Connect to MongoDB database
mongoose.connect("mongodb://localhost:27017/task-manager-api", {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})

//Create the models 
const User = mongoose.model('User', {
    name: {
        type:String
    },
    age : {
        type:Number
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
// const me = new User({
//     name: 'Ted',
//     age : 29
// });

// me.save().then(() => {
//     console.log(me);
// }).catch((error) => {
//     console.log('Error!', error);
// })

//Insert a task 
const task = new Task({
    description : 'Go to supermarket',
    completed : false
});

task.save().then(() => {
    console.log(task);
}).catch((error) => {
    console.log(error);
});
