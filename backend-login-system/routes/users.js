const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.get('/', async (req, res) => {
    try {
        const users = await User.find().select('email');
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// router.get('/:id', getUser, async (req, res) => {
//     res.send(res.user.username);
// });

router.post('/', async (req, res) => {
    const user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        birthday: req.body.birthday,
        gender: req.body.gender,
        password: req.body.password,
        email: req.body.email
    });
    try {
        const newUser = await user.save();
        res.status(201).json(newUser);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// router.patch('/:id', getUser, async (req, res) => {
//     if (req.body.username != null) {
//         res.user.username = req.body.username;
//     }
//     if (req.body.type != null) {
//         res.user.type = req.body.type;
//     }
//     try {
//         const updatedUser = await res.user.save();
//         res.json(updatedUser);
//     } catch (err) {
//         res.status(400).json({ message: err.message });
//     }
// });

router.delete('/:id', getUser, async (req, res) => {
    try {
        await User.findOneAndDelete(res.user._id);
        res.json({ message: 'Deleted User' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get('/isUserExist', isUserExist, async (req, res) => {
    if (res.userExists) {
        res.status(200).json({ message: 'User exists' });
    } else {
        res.status(404).json({ message: 'User not found' });
    }
});

async function isUserExist(req, res, next) {
    const { email } = req.body;
    try {
        const user = await User.findOne({ email });
        if (user) {
            res.userExists = true;
        } else {
            res.userExists = false;
        }
        next();
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

async function getUser(req, res, next) {
    let user;
    try {
        user = await User.findById(req.params.id);
        if (user == null) {
            return res.status(404).json({ message: 'Cannot find user' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }

    res.user = user;
    next();
}

module.exports = router;