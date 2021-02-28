const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');
const requiresAuth = require('../../config/requiresAuth');

const User = require('../../models/User');

router.get('/me', requiresAuth, (req, res) => {
    User.findById(req.user._id).then(user => {
        if(user) return res.json({ name: user.name, email: user.email });
    }).catch(err => res.json({ error: err.message }));
});

router.post('/register', (req, res) => {
    const { errors, isValid } = validateRegisterInput(req.body);

    if(!isValid) return res.status(400).json(errors);

    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    User.findOne({ email }).then(user => {
        if(user) return res.status(400).json({ email: "Email already exists" });

        const newUser = new User({
            name,
            email,
            password
        });

        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
                if(err) throw err;

                newUser.password = hash;
                newUser.save().then(user => res.json(user)).catch(err => console.log(err));
            });
        });
    });
});

router.post('/login', (req, res) => {
    const { errors, isValid } = validateLoginInput(req.body);

    if(!isValid) return res.status(400).json(errors);

    const email = req.body.email;
    const password = req.body.password;

    User.findOne({ email }).then(user => {
        if(!user) return res.status(404).json({ emailnotfound: "Email not found" });

        bcrypt.compare(password, user.password).then(isMatch => {
            if(!isMatch) return res.status(400).json({ passwordincorrect: "Password incorrect" });

            const payload = {
                id: user.id,
                name: user.name
            };

            jwt.sign(payload, process.env.CYPHER, { expiresIn: 31556926 }, (err, token) => {
                if(err) return res.status(400).json({ tokenerror: "There was a problem updating your security token" });
                
                res.json({
                    success: true,
                    token: "Bearer " + token
                });
            });
        });
    });
});

module.exports = router;