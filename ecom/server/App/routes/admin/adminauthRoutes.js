let express = require("express");
let adminauthRoutes = express.Router();
const { adminLogin, changePassword, companyProfileUpdate, viewCompanyProfile } = require("../../controllers/admin/adminAuthController");

const multer = require("multer");
const path = require("path");

// Set up multer for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/companyprofile/");
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});
const upload = multer({ storage: storage });

adminauthRoutes.post("/login", upload.none(), adminLogin);

adminauthRoutes.put("/changepassword/:id", upload.none(), changePassword);

adminauthRoutes.post("/companyprofileupdate", upload.fields([{ name: "avatar", maxCount: 1 }]), companyProfileUpdate);

adminauthRoutes.get("/view-company-profile", viewCompanyProfile);

module.exports = { adminauthRoutes };