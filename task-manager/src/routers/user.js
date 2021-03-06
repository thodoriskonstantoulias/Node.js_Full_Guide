//Router for user 
const express = require('express');
const router = new express.Router();

//Import our auth service 
const auth = require('../middleware/auth');

const multer = require('multer');

//Get our models
const User = require('../models/user');

//Get the mail module 
const {sendWelcomeEmail} = require('../emails/account');

//Users document
router.post('/users', async (req,res) => {
    const user = new User(req.body);

    //Same functionality using async-await
    try {
        await user.save();
        //Send welcome email
        //sendWelcomeEmail(user.email, user.name);

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
        //res.send({user : user.getPublicProfile(), token});
        //2nd way of hiding data -- go to user model
        res.send({user, token});
    } catch (error) {
        res.status(400).send(error);
    }
});

//Logout functionality
router.post('/users/logout', auth, async (req,res) => {
    try {
        //Delete the token from the user
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token;
        });
        await req.user.save();
        res.send();
    } catch (error) {
        res.status(500).send();
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

// router.patch('/users/:id', auth, async (req,res) => {
//     const id = req.params.id;
//     try {
//         //Change of code so the middleware can work 
//         const updates = Object.keys(req.body);
//         const user = await User.findById(id);
//         updates.forEach((update) => {
//             return user[update] = req.body[update];
//         });
//         await user.save();

//         //const user = await User.findByIdAndUpdate(id, req.body, {new:true, runValidators:true});
//         if (!user) {
//             return res.status(404).send();
//         }
//         res.send(user);
//     } catch (error) {
//         res.status(500).send(error);
//     }
// });

router.patch('/users/me', auth, async (req,res) => {
    try {
        //Change of code so the middleware can work 
        const updates = Object.keys(req.body);
        
        updates.forEach((update) => {
            return req.user[update] = req.body[update];
        });
        await req.user.save();

        res.send(req.user);
    } catch (error) {
        res.status(500).send(error);
    }
});

// router.delete('/users/:id', async (req,res) => {
//     const id = req.params.id;
//     try {
//         const user = await User.findByIdAndDelete(id);
//         if (!user) {
//             return res.status(404).send();
//         }
//         res.send(user);
//     } catch (error) {
//         res.status(500).send(error);
//     }
// });

router.delete('/users/me', auth, async (req,res) => {
    try {
        // const user = await User.findByIdAndDelete(req.user._id);
        // if (!user) {
        //     return res.status(404).send();
        // }
        await req.user.remove();

        res.send(req.user);
    } catch (error) {
        res.status(500).send(error);
    }
});

//Image upload route 
const upload = multer({
    limits : {
        fileSize : 1000000
    },
    fileFilter(req,file,cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return cb(new Error('please upload an image'));
        }

        cb(undefined,true);
    }
});

router.post('/users/me/avatar', auth, upload.single('avatar'), async (req,res) => {
    //Get the binary format of the upload and save to db
    req.user.avatar = req.file.buffer;
    await req.user.save();

    res.send();
}, (error,req,res,next) => {
    res.status(400).send({error : error.message});
});

router.delete('/users/me/avatar', auth, async (req,res) => {
    //Delete the avatar from the user
    req.user.avatar = undefined;
    await req.user.save();

    res.send();
});

//Setup route for client to show the image 
router.get('/users/:id/avatar', async (req,res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user || !user.avatar) {
            throw new Error();
        }
        res.set('Content-Type','image/jpg');
        res.send(user.avatar);

    } catch (error) {
        res.status(400).send();
    }
});

module.exports = router;