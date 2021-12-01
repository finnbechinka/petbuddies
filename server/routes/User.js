const express = require('express')
const router = express.Router()
const { User } = require('../models');
const bcrypt = require('bcrypt');

router.post('/', async (req, res) => {
    const {username, password, type} = req.body;
    const user = await User.findOne({ where: {username: username}});
    if(!user){
        bcrypt.hash(password, 10).then((hash) => {
            User.create({
                username: username,
                password: hash,
                type: type
            });
            res.json("SUCCESS");
        });
    }else{
        res.json({error: "username is taken"});
    }
});

router.post('/login', async (req, res) =>{
    const {username, password} = req.body;

    const user = await User.findOne({ where: {username: username}});
    if(!user) res.json({error: "no such user"});
    bcrypt.compare(password, user.password).then((match) => {
        if(!match) res.json({error: "wrong password"});

        res.json("login successful");
    });
});

module.exports = router;