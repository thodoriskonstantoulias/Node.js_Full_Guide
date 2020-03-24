//All database related goes in here
const mongoose = require('mongoose');
//const validator = require('validator');

//Connect to MongoDB database
mongoose.connect(process.env.MONGODB_URL, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})

//Create the models -- In the model directory


