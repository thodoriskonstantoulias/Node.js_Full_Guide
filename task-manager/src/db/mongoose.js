//All database related goes in here
const mongoose = require('mongoose');
//const validator = require('validator');

//Connect to MongoDB database
mongoose.connect("mongodb://localhost:27017/task-manager-api", {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})

//Create the models -- In the model directory


