let express = require("express");   
let userAuthRoutes = express.Router();
const { sendOtp, createuser, login, googleLogin, viewuser, deleteuser, userStatusUpdate } = require("../../controllers/web/userAuthController");

userAuthRoutes.post("/send-otp",sendOtp);

userAuthRoutes.post("/create-user",createuser);

userAuthRoutes.post("/login", login);

userAuthRoutes.post("/google-login", googleLogin);

userAuthRoutes.get("/view-user", viewuser);

userAuthRoutes.delete("/delete", deleteuser);

userAuthRoutes.post("/statusupdate", userStatusUpdate);

module.exports = { userAuthRoutes };