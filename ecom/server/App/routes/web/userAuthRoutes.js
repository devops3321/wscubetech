let express = require("express");   
let userAuthRoutes = express.Router();
const { sendOtp, createuser } = require("../../controllers/web/userAuthController");

userAuthRoutes.post("/send-otp",sendOtp);

userAuthRoutes.post("/create-user",createuser);

module.exports = { userAuthRoutes };