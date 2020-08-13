const express = require('express');

const router = express.Router();

const Users = require('./users-model.js');


router.get('/', (req, res) => {
    Users.find()
    .then(users => {
        res.json(users)
    })
    .catch(err => {
        console.log(err)
    })
})

module.exports = router;