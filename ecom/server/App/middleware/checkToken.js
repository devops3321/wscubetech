var jwt = require('jsonwebtoken');

let checkToken = (req, res, next) => {

    let token = req.headers['authorization'].split(' ')[1];

    if (token) {
        var decoded = jwt.verify(token, process.env.TOKENKEY);

        if(decoded) {
            let {id} = decoded;
            req.body.id = id;
            return next();
        }
        else {
            resObj = {
                status: "failed",
                message: "Invalid token"
            }
            res.send(resObj);
        }
    }
    else {
        resObj = {
            status: "failed",
            message: "Token is missing"
        }
        res.send(resObj);
    }
}

module.exports = { checkToken };