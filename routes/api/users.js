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

        // Add Category, categories are unique
        router.post('/cat', (req, res) => {
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

        //Find Category by name (can get id from this)
        router.get('/catbyname', (req, res)=>{
            const catName = req.body.catName;
            Cat.findOne({catName}, (err, result)=>{
                if(err) return res.send(err);
                res.send(result)
            })
        })

        // Delete A Category by name
        router.delete('/delCatName', (req, res)=>{
            const catName = req.body.catName;
            Cat.deleteOne({catName}, (err, result) =>{
                if(err) return res.send(err)
                res.send(result)
            });
        });

        // Delete a Category by id
        router.delete('/cat', (req, res)=>{
            const _id = req.body._id;
            Cat.findByIdAndDelete({_id}, (err, result) =>{
                if(err) return res.send(err)
                res.send(result)
            });
        });

        //Add a Skill
        router.post('/skill', (req, res)=>{
            const skillsName = req.body.skillsName;
            const User = user.id;
            const Cat = req.body.catId;

            console.log(User, skillsName, Cat);

            const newSkill = new Skills({
                skillsName,
                Cat,
                User
            });

            newSkill.save()
            .then(user => res.json(user))
            .catch(err => res.send(err));
        });

        //Get all skills by user
        router.get('/skill', (req, res)=>{
            Skills.find({User:user.id}).then(function(data) {res.send(data)})
            .catch(err => res.send(err))
        });

        //Delete a skill by id
        router.delete('/skill', (req, res)=>{
            const _id = req.body.skillId;
            Skills.deleteOne({_id}, (err, result) =>{
                if(err) return res.send(err)
                res.send(result)
            });
        });

        //Master a skill by id
        router.put('/skill', (req, res)=>{
            const _id = req.body._id;
            Skills.updateOne({_id}, {$set:{Master:true}}, (err, result)=>{
                if(err) return res.send(err);
                res.send(result);
            });
        });

        //Unmaster a skill
        router.put('/unskill', (req, res)=>{
            const _id = req.body._id;
            Skills.updateOne({_id}, {$set:{Master:false}}, (err, result)=>{
                if(err) return res.send(err);
                res.send(result);
            });
        });

        //Get all mastered skills
        router.get('/allmasteredskill', (req, res)=>{

            Skills.find({$and:[{User:user.id}, {Master:true}]}, (err, data)=>{
                if(err) return res.send(err);
                res.send(data)
            })
        });

        //Get all unmastered skills
        router.get('/allunmasteredskill', (req, res)=>{
            Skills.find({$and:[{User:user.id}, {Master:false}]}, (err, data)=>{
                if(err) return res.send(err);
                res.send(data)
            })
        });

        //New Definition
        router.post('/def', (req, res)=>{
            const defName = req.body.defName;
            const defText = req.body.defText;
            const User = user.id;
            const Cat = req.body.catId;

            const newDef = new Def({
                defName,
                defText,
                Cat,
                User
            });

            newDef.save()
            .then(user => res.json(user))
            .catch(err => res.send(err));
        });

        //Update Def Text
        router.put('/def', (req, res)=>{
            const _id = req.body.defId;
            const defText = req.body.defText;
            Def.updateOne({_id}, {$set:{defText}}, (err, result)=>{
                if(err) return res.send(err);
                res.send(result);
            });
        })

        // Get one definition
        router.get('/def', (req, res)=>{
            const _id = req.body.defId;
            Def.find({_id}, (err, result)=>{
                if(err) return res.send(err);
                res.send(result); 
            });
        });

        // Delete one definition
        router.delete('/def', (req, res)=>{
            const _id = req.body.defId;
            Def.deleteOne({_id}, (err,result)=>{
                if(err) return res.send(err);
                res.send(result);
            });
        });

        //Get all user's definitions
        router.get('/alldef', (req, res)=>{
            const User = user.id;
            Def.find({User}, (err, result)=>{
                if(err) return res.send(err);
                res.send(result);
            });
        });

        //Add a library document
        router.post('/lib', (req, res)=>{
            const libName = req.body.libName;
            const libType = req.body.libType;
            const libURL = req.body.libURL
            const User = user.id;
            const Cat = req.body.catId;

            const newLib = new Lib({
                libName,
                libType,
                libURL,
                User,
                Cat
            });

            newLib.save()
            .then(user => res.json(user))
            .catch(err => res.send(err));
        });

        //Update a library document url
        router.put('/liburl', (req, res)=>{
            const _id = req.body.libId;
            const libURL = req.body.libURL;
            Lib.updateOne({_id}, {$set:{libURL}}, (err, result)=>{
                if(err) return res.send(err);
                res.send(result);
            });
        });

        //Update a library document type
        router.put('/libtype', (req, res)=>{
            const _id = req.body.libId;
            const libType = req.body.libType;
            Lib.updateOne({_id}, {$set:{libType}}, (err, result)=>{
                if(err) return res.send(err);
                res.send(result);
            });
        });

        // Get all library documents for a logged in user
        router.get('/alllib', (req, res)=>{
            const User = user.id;
            Lib.find({User}, (err, result)=>{
                if(err) return res.send(err);
                res.send(result);
            });
        });

        //Get one library document by id
        router.get('/lib', (req, res)=>{
            const _id = req.body.libId;
            Lib.find({_id}, (err, data)=>{
                if(err) return res.send(err);
                res.send(data)
            })
        });

        //Get all video library documents
        router.get('/allvidlib', (req, res)=>{
            Lib.find({$and:[{User:user.id}, {libType:'VIDEO'}]}, (err, data)=>{
                if(err) return res.send(err);
                res.send(data)
            })
        });

        // get all text library documents
        router.get('/alltextlib', (req, res)=>{
            Lib.find({$and:[{User:user.id}, {libType:'TEXT'}]}, (err, data)=>{
                if(err) return res.send(err);
                res.send(data)
            })
        });

        // Delete a library document
        router.delete('/lib', (req, res)=>{
            const _id = req.body.libId;
            Lib.deleteOne({_id}, (err,result)=>{
                if(err) return res.send(err);
                res.send(result);
            });
        });

    }); // end post scope for login
}); // end scope login

module.exports = router;