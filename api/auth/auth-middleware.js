const User = require('./auth-model');

const validateUserData = () => {
    return async (request, response, next) => {
        try {
            let data = {
                username: request.body.username ?? false,
                password: request.body.password ?? false
            };

            if (data.username && data.password) {
                request.userData = data;

                next();
            } else {
                return response.status(400).json("username and password required");
            }
        } catch (error) {
            next(error);
        }
    };
};

const userExists = () => {
    return async (request, response, next) => {
        try {
            let data = {
                username: request.body.username ?? false,
                password: request.body.password ?? false
            };

            if (data.username && data.password) {
                request.extantUser = await User.getByUsername(data.username);

                next();
            }
        } catch (error) {
            next(error);
        }
    };
};

module.exports = {
    validateUserData,
    userExists
};