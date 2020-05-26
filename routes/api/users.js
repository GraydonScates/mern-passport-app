const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');

const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');

const User = require('../../models/User');
const Def = require('../../models/Def');
const Skills = require('../../models/Skills');
const Lib = require('../../models/Lib');
const Cat = require('../../models/Cat');

router.post('/register', (req, res) => {
    const { errors, isValid } = validateRegisterInput(req.body);

    if(!isValid) return res.status(400).json(errors);

    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const password = req.body.password;
    const address1 = req.body.address1;
    const address2 = req.body.address2;
    const city = req.body.city;
    const st = req.body.st;
    const zip = req.body.zip;
    const phone = req.body.phone;
    const phoneType = req.body.phoneType;
    

    User.findOne({ email }).then(user => {
        if(user) return res.status(400).json({ email: "Email already exists" });

        const newUser = new User({
            firstName,
            lastName,
            email,
            password,
            address1,
            address2,
            city,
            st,
            zip,
            phone,
            phoneType
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

            jwt.sign(payload, keys.cypher, { expiresIn: 31556926 }, (err, token) => {
                if(err) return res.status(400).json({ tokenerror: "There was a problem updating your security token" });
                
                res.json({
                    success: true,
                    token: "Bearer " + token
                });
            });
        });

        console.log("new user payload")
        console.log(user)

// Add Category
router.post('/newcat', (req, res) => {

    const catName = req.body.catName;
    
    Cat.findOne({ catName }).then(cat => {
        if(cat) return res.status(400).json({ catName: "Category already exists" });

        const newCat = new Cat({
            catName
        });
    
        newCat.save()
        .then(cat => res.json(cat))
        .catch(err => console.log(err));
    
    });
});

// Find All Categories
router.get('/allcat', (req, res) => {
    Cat.find({}).then(function(data) {res.send(data)})
    .catch(err => console.log(err))
});

// Delete A Category by name
router.delete('/delCatName', (req, res)=>{
    catName = req.body.catName;
    Cat.deleteOne({catName}, (err, result) =>{
        if(err) return res.send(err)
        res.send(result)
    });
});

// Delete a Category by id
router.delete('/delCatId', (req, res)=>{
    _id = req.body._id;
    Cat.findByIdAndDelete({_id}, (err, result) =>{
        if(err) return res.send(err)
        res.send(result)
    });
});

/* router.get('/getid', (req, res)=>{
    email = req.email;
    console.log(email);
    User.findOne({ email }, (err, result)=>{
        console.log(result);
        if(err) return res.send(err);
        res.send(result._id);
    })
}) */



}); // end post scope for login
}); // end scope login

module.exports = router;