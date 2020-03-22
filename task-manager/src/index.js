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

//Users document
app.post('/users', async (req,res) => {
    const user = new User(req.body);

    //Same functionality using async-await
    try {
        await user.save();
        res.status(201).send(user);
    } catch(e) {
        res.status(400).send(e);
    }

    // user.save().then(() => {
    //     res.status(201).send(user);
    // }).catch((error) => {
    //     res.status(400).send(error);
    // });
});

app.get('/users',async (req,res) => {
    //Same functionality using async-await
    try{
        const users = await User.find({});
        res.send(users);
    } catch(e){
        res.status(500).send(e);
    }

    // User.find({}).then((users) => {
    //     res.send(users);
    // }).catch((error) => {
    //     res.status(500).send(error);
    // });  
});

app.get('/users/:id', async (req,res) => {
    const id = req.params.id;
    //Same functionality using async-await
    try{
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).send();
        }
        res.send(user);
    } catch(e){
        res.status(500).send(e);
    }

    // User.findById(id).then((user) => {
    //     if (!user){
    //         return res.status(404).send();
    //     } 
    //     res.send(user);
    // }).catch((error) => {
    //     res.status(500).send(error);
    // });
});

app.patch('/users/:id', async (req,res) => {
    const id = req.params.id;
    try {
        const user = await User.findByIdAndUpdate(id, req.body, {new:true, runValidators:true});
        if (!user) {
            return res.status(404).send();
        }
        res.send(user);
    } catch (error) {
        res.status(500).send(error);
    }
});

app.delete('/users/:id', async (req,res) => {
    const id = req.params.id;
    try {
        const user = await User.findByIdAndDelete(id);
        if (!user) {
            return res.status(404).send();
        }
        res.send(user);
    } catch (error) {
        res.status(500).send(error);
    }
});

//Tasks document
app.post('/tasks',async (req,res) => {
    const task = new Task(req.body);
    //Same functionality using async-await
    try {
        await task.save();
        res.status(201).send(task);
    } catch (error) {
        res.status(400).send(error);
    }

    // task.save().then(() => {
    //     res.status(201).send(task);
    // }).catch((error) => {
    //     res.status(400).send(error);
    // });
});

app.get('/tasks',async (req,res) => {
    //Same functionality using async-await
    try {
        const tasks = await Task.find({});
        res.send(tasks);
    } catch (error) {
        res.status(500).send(error);
    }
    // Task.find({}).then((tasks) => {
    //     res.send(tasks);
    // }).catch((error) => {
    //     res.status(500).send(error);
    // });  
});

app.get('/tasks/:id',async (req,res) => {
    const id = req.params.id;
    //Same functionality using async-await
    try {
        const task = await Task.findById(id); 
        if (!task){
            return res.status(404).send();
        } 
        res.send(task);
    } catch (error) {
        res.status(500).send(error);
    }
    // Task.findById(id).then((task) => {
    //     if (!task){
    //         return res.status(404).send();
    //     } 
    //     res.send(task);
    // }).catch((error) => {
    //     res.status(500).send(error);
    // });
});

app.patch('/tasks/:id', async (req,res) => {
    const id = req.params.id;
    try {
        const task = await Task.findByIdAndUpdate(id, req.body, {new:true, runValidators:true});
        if (!task) {
            return res.status(404).send();
        }
        res.send(task);
    } catch (error) {
        res.status(500).send(error);
    }
});

app.delete('/tasks/:id', async (req,res) => {
    const id = req.params.id;
    try {
        const task = await Task.findByIdAndDelete(id);
        if (!task) {
            return res.status(404).send();
        }
        res.send(task);
    } catch (error) {
        res.status(500).send(error);
    }
});

app.listen(port, () => {
    console.log('Listening to port ' + port);
});