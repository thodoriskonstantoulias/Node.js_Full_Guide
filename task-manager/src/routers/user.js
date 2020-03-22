//Router for user 
const express = require('express');
const router = new express.Router();

//Get our models
const User = require('../models/user');

//Users document
router.post('/users', async (req,res) => {
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

router.get('/users',async (req,res) => {
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

router.get('/users/:id', async (req,res) => {
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

router.patch('/users/:id', async (req,res) => {
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

router.delete('/users/:id', async (req,res) => {
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

module.exports = router;