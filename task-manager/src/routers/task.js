//Router for task 
const express = require('express');
const router = new express.Router();

//Get our models
const Task = require('../models/task');

//Tasks document
router.post('/tasks',async (req,res) => {
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

router.get('/tasks',async (req,res) => {
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

router.get('/tasks/:id',async (req,res) => {
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

router.patch('/tasks/:id', async (req,res) => {
    const id = req.params.id;
    try {
        //Change of code so the middleware can work 
        const updates = Object.keys(req.body);
        const task = await Task.findById(id);
        updates.forEach((update) => {
            return task[update] = req.body[update];
        });
        await task.save();
        //const task = await Task.findByIdAndUpdate(id, req.body, {new:true, runValidators:true});
        if (!task) {
            return res.status(404).send();
        }
        res.send(task);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.delete('/tasks/:id', async (req,res) => {
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

module.exports = router;