
const express = require('express');

const router = express.Router();  

const jwt = require('jsonwebtoken');

const bcrypt = require('bcryptjs');

const Users = require('../users/users-model');

const secrets = require('../config/secrets');

router.post('/register', async (req, res) => {
let user = req.body;
const hash = bcrypt.hashSync(user.password, 14)
user.password = hash;

try {
    const saved = await Users.add(user);
    res.status(201).json(saved)
} catch (err) {
    console.log(err);
    res.status(500).json({message:'Unable to register user'})
}

});

router.post('/login', async (req, res) => {
    let { username, password } = req.body;
   
try {
    const user = await Users.findBy({ username }).first();
    if(user && bcrypt.compareSync(password, user.password)){
        const token = generateToken(user);

        res.status(200).json({
            message:'',
            token
        })
} else {
    res.status(401).json({message:'You shall not pass'})
}
} catch(err) {
    res.status(500).json(err)
}

  
});

function generateToken(user) {
   const payload = {
    userid: user.id,
    username: user.username,


   };
   const options = {expiresIn: '1h'};
   const token = jwt.sign(payload, secrets.jwtSecret, options);
   
   return token;
}

module.exports = router;