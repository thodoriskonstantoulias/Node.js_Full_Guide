//Router for user 
const express = require('express');
const router = new express.Router();

//Import our auth service 
const auth = require('../middleware/auth');

//Get our models
const User = require('../models/user');

//Users document
router.post('/users', async (req,res) => {
    const user = new User(req.body);

    //Same functionality using async-await
    try {
        await user.save();
        const token = await user.generateAuthToken();
        res.status(201).send({user, token});
    } catch(e) {
        res.status(400).send(e);
    }

    // user.save().then(() => {
    //     res.status(201).send(user);
    // }).catch((error) => {
    //     res.status(400).send(error);
    // });
});

//Login functionality
router.post('/users/login', async (req,res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password); 
        const token = await user.generateAuthToken();
        res.send({user, token});
    } catch (error) {
        res.status(400).send(error);
    }
});

//We will add authentication to the following routes
//Also we change the route so user can see only his info and not others
router.get('/users/me', auth, async (req,res) => {
    try {
        res.send(req.user);
    } catch (error) {
        res.status(500).send();
    }
     
});

router.get('/users', auth, async (req,res) => {
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
        //Change of code so the middleware can work 
        const updates = Object.keys(req.body);
        const user = await User.findById(id);
        updates.forEach((update) => {
            return user[update] = req.body[update];
        });
        await user.save();

        //const user = await User.findByIdAndUpdate(id, req.body, {new:true, runValidators:true});
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