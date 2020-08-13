const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const server = express();

const userRouter = require('../users/users-router');
const authRouter = require('../auth/auth-router');
const restricted = require('../auth/restricted');

server.use(helmet());
server.use(express.json());
server.use(cors());


server.use("/api/auth", authRouter);
server.use("/api/users", restricted, userRouter);

// server.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Authorization, Content-Type, Accept");
//     next();
//   });

server.get('/', (req, res)=> {
    res.json({api: 'running'})
})


module.exports = server;