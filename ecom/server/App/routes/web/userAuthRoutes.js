let express = require("express");   
let userAuthRoutes = express.Router();
const { sendOtp, createuser, login } = require("../../controllers/web/userAuthController");

userAuthRoutes.post("/send-otp",sendOtp);

userAuthRoutes.post("/create-user",createuser);

userAuthRoutes.post("/login", login);

module.exports = { userAuthRoutes };