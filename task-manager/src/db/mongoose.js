//All database related goes in here
const mongoose = require('mongoose');

//Connect to MongoDB database
mongoose.connect("mongodb://localhost:27017/task-manager-api", {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})

//Create the model 
const User = mongoose.model('User', {
    name: {
        type:String
    },
    age : {
        type:Number
    }
});

//Insert a user
const me = new User({
    name: 'Ted',
    age : 29
});

me.save().then(() => {
    console.log(me);
}).catch((error) => {
    console.log('Error!', error);
})

