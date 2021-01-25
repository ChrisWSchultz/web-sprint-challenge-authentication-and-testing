const jwt = require("jsonwebtoken");

module.exports = (request, response, next) => {
    try {
        let token = request.cookies.token ?? false;

        if (token) {
            jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
                if(error) {
                    return response.status(400).json("token invalid");
                } else {
                    request.token = decoded;

                    next();
                }
            });
        } else {
            return response.status(400).json("token required");
        }

    } catch (error) {
        console.log(error);
        return response.status(500).json({'message': 'an error occurred'});
    }
};
