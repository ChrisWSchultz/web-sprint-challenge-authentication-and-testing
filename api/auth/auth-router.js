const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('./auth-model');

const {validateUserData, userExists} = require('./auth-middleware');

router.post('/register', validateUserData(), userExists(), async (request, response, next) => {
    try {
        if(request.extantUser) {
            return response.status(400).json("username taken");
        } else {
            let data = {
                username: request.userData.username,
                password: await bcrypt.hash(request.userData.password, parseInt(process.env.SALT_FACTOR))
            };

            let user = await User.addUser(data);

            return response.status(201).json(user);
        }
    } catch (error) {
        next(error);
    }
    /*
      IMPLEMENT
      You are welcome to build additional middlewares to help with the endpoint's functionality.

      1- In order to register a new account the client must provide `username` and `password`:
        {
          "username": "Captain Marvel", // must not exist already in the `users` table
          "password": "foobar"          // needs to be hashed before it's saved
        }

      2- On SUCCESSFUL registration,
        the response body should have `id`, `username` and `password`:
        {
          "id": 1,
          "username": "Captain Marvel",
          "password": "2a$08$jG.wIGR2S4hxuyWNcBf9MuoC4y0dNy7qC/LbmtuFBSdIhWks2LhpG"
        }

      3- On FAILED registration due to `username` or `password` missing from the request body,
        the response body should include a string exactly as follows: "username and password required".

      4- On FAILED registration due to the `username` being taken,
        the response body should include a string exactly as follows: "username taken".
    */
});

router.post('/login', validateUserData(), userExists(), async (request, response, next) => {
    try {
        if(request.extantUser) {
            let validPassword = bcrypt.compare(request.extantUser.password, request.userData.password);

            if(validPassword) {
                const token = jwt.sign({
                    userId: request.extantUser.id,
                }, process.env.JWT_SECRET);

                response.cookie("token", token);

                return response.status(200).json({
                    "message": `Welcome ${request.extantUser.username}`,
                    "token": token
                });
            } else {
                return response.status(400).json("invalid credentials");
            }
        } else {
            return response.status(400).json("invalid credentials");
        }
    } catch (error) {
        next(error);
    }
    /*
      IMPLEMENT
      You are welcome to build additional middlewares to help with the endpoint's functionality.

      1- In order to log into an existing account the client must provide `username` and `password`:
        {
          "username": "Captain Marvel",
          "password": "foobar"
        }

      2- On SUCCESSFUL login,
        the response body should have `message` and `token`:
        {
          "message": "welcome, Captain Marvel",
          "token": "eyJhbGciOiJIUzI ... ETC ... vUPjZYDSa46Nwz8"
        }

      3- On FAILED login due to `username` or `password` missing from the request body,
        the response body should include a string exactly as follows: "username and password required".

      4- On FAILED login due to `username` not existing in the db, or `password` being incorrect,
        the response body should include a string exactly as follows: "invalid credentials".
    */
});

module.exports = router;
