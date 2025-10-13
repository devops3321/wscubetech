let express = require("express");   
let adminauthRoutes = express.Router();
const { adminLogin, changePassword  } = require("../../controllers/admin/adminAuthController");

let multer = require("multer");

const upload = multer();

adminauthRoutes.post("/login", upload.none(), adminLogin);

adminauthRoutes.put("/changepassword/:id", upload.none(), changePassword);

module.exports = { adminauthRoutes };