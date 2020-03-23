//Router for task 
const express = require('express');
const router = new express.Router();

//Import our auth service 
const auth = require('../middleware/auth');

//Get our models
const Task = require('../models/task');

//Tasks document
router.post('/tasks', auth, async (req,res) => {
    //const task = new Task(req.body);
    const task = new Task({
        description : req.body.description,
        completed : req.body.completed,
        owner : req.user._id
    });
    //Same functionality using async-await
    try {
        await task.save();
        res.status(201).send(task);
    } catch (error) {
        res.status(400).send(error);
    }
});

router.get('/tasks',auth, async (req,res) => {
    //Same functionality using async-await
    try {
        const tasks = await Task.find({owner : req.user._id});
        //Alternative way to get the tasks of the user -- execute 
        //await req.user.populate('tasks').execPopulate();

        res.send(tasks);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.get('/tasks/:id', auth, async (req,res) => {
    const id = req.params.id;
    //Same functionality using async-await
    try {
        //const task = await Task.findById(id); 
        const task = await Task.findOne({_id : id, owner : req.user._id});

        if (!task){
            return res.status(404).send();
        } 
        res.send(task);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.patch('/tasks/:id', auth, async (req,res) => {
    const id = req.params.id;
    try {
        //Change of code so the middleware can work 
        const updates = Object.keys(req.body);
        const task = await Task.findOne({_id:id, owner : req.user._id});
        if (!task) {
            return res.status(404).send();
        }
        updates.forEach((update) => {
            return task[update] = req.body[update];
        });
        await task.save();
        
        res.send(task);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.delete('/tasks/:id', auth, async (req,res) => {
    const id = req.params.id;
    try {
        const task = await Task.findOneAndDelete({_id : id, owner : req.user._id});
        if (!task) {
            return res.status(404).send();
        }
        res.send(task);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;