//Here we will create our APIs
const express = require('express');
//Connect to database 
require('./db/mongoose');

//Import our routers 
const userRouter = require('./routers/user');
const taskRouter = require('./routers/task');

const app = express();
const port = process.env.PORT || 3000;

//So that express can understand what we send from the body of request - json format
app.use(express.json());

//Register our routers 
app.use(userRouter);
app.use(taskRouter);

app.listen(port, () => {
    console.log('Listening to port ' + port);
});