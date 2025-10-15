let express = require("express");   
let userAuthRoutes = express.Router();
const { sendOtp } = require("../../controllers/web/userAuthController");

userAuthRoutes.post("/send-otp",sendOtp);


module.exports = { userAuthRoutes };