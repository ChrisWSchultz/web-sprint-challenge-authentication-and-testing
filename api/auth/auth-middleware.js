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
                return response.status(400).json('username and password required');
            }
        } catch (error) {
            console.log(error);
            return response.status(500).json({'message': 'an error occurred'});
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
            console.log(error);
            return response.status(500).json({'message': 'an error occurred'});
        }
    };
};

module.exports = {
    validateUserData,
    userExists
};