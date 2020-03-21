//Here we will create our APIs
const express = require('express');
//Connect to database 
require('./db/mongoose');
//Get our models
const User = require('./models/user');
const Task = require('./models/task');

const app = express();
const port = process.env.PORT || 3000;

//So that express can understand what we send from the body of request - json format
app.use(express.json());

app.post('/users', (req,res) => {
    const user = new User(req.body);
    user.save().then(() => {
        res.status(201).send(user);
    }).catch((error) => {
        res.status(400).send(error);
    });
});

app.get('/users', (req,res) => {
    User.find({}).then((users) => {
        res.send(users);
    }).catch((error) => {
        res.status(500).send(error);
    }); 
});

app.get('/users/:id', (req,res) => {
    const id = req.params.id;
    User.findById(id).then((user) => {
        if (!user){
            return res.status(404).send();
        } 
        res.send(user);
    }).catch((error) => {
        res.status(500).send(error);
    });
});

app.post('/tasks', (req,res) => {
    const task = new Task(req.body);
    task.save().then(() => {
        res.status(201).send(task);
    }).catch((error) => {
        res.status(400).send(error);
    });
});

app.listen(port, () => {
    console.log('Listening to port ' + port);
});