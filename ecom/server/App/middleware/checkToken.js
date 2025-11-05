var jwt = require('jsonwebtoken');

let checkToken = (req, res, next) => {
    let token = req.headers['authorization']?.split(' ')[1];

    if (token) {
        try {
            var decoded = jwt.verify(token, process.env.TOKENKEY);

            if (decoded) {
                let { id } = decoded;
                req.body = req.body || {};
                req.query = req.query || {};
                req.body.id = id;
                req.query.id = id;
                // Set req.user for downstream controllers
                req.user = { _id: id };
                return next();
            } else {
                res.status(401).json({
                    success: false,
                    status: "failed",
                    message: "Invalid token"
                });
            }
        } catch (err) {
            console.error('Token verification error:', err.message);
            res.status(401).json({
                success: false,
                status: "failed",
                message: "Invalid token"
            });
        }
    } else {
        res.status(401).json({
            success: false,
            status: "failed",
            message: "Token is missing"
        });
    }
}

module.exports = { checkToken };