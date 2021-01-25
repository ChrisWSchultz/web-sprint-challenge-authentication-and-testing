const jwt = require("jsonwebtoken");

module.exports = (request, response, next) => {
    try {
        let token = request.cookies.token ?? false;

        if (token) {
            jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
                if(error) {
                    return response.status(401).json("token invalid");
                } else {
                    request.token = decoded;

                    next();
                }
            });
        } else {
            return response.status(401).json("token required");
        }

    } catch (error) {
        next(error);
    }
};
