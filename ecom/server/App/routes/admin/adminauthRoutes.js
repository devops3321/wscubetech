let express = require("express");   
let adminauthRoutes = express.Router();
const { adminLogin } = require("../../controllers/admin/adminAuthController");

let multer = require("multer");

const upload = multer();

adminauthRoutes.post("/login", upload.none(), adminLogin);

module.exports = { adminauthRoutes };