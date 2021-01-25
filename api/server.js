const express = require('express');
const dotenv = require('dotenv');
dotenv.config();

const cors = require('cors');
const helmet = require('helmet');
const cookieParser = require("cookie-parser");

const restrict = require('./middleware/restricted.js');

const authRouter = require('./auth/auth-router.js');
const jokesRouter = require('./jokes/jokes-router.js');

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());
server.use(cookieParser());

server.use('/api/auth', authRouter);
server.use('/api/jokes', restrict, jokesRouter); // only logged-in users should have access!

server.use((error, request, response) => {
    console.log(error);
    return response.status(500).json({'message': 'an error occurred'});
});

module.exports = server;
