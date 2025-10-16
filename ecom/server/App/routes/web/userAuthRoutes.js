let express = require("express");   
let userAuthRoutes = express.Router();
const { sendOtp, createuser, login, viewuser, deleteuser, userStatusUpdate } = require("../../controllers/web/userAuthController");

userAuthRoutes.post("/send-otp",sendOtp);

userAuthRoutes.post("/create-user",createuser);

userAuthRoutes.post("/login", login);

userAuthRoutes.get("/view-user", viewuser);

// delete expects body: { ids: [id1, id2, ...] }
userAuthRoutes.delete("/delete", deleteuser);

// status update expects body: { ids: [...], status: true|false }
userAuthRoutes.post("/statusupdate", userStatusUpdate);

module.exports = { userAuthRoutes };