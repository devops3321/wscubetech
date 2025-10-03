const { adminModel } = require("../../models/adminModel");

let adminLogin = async (req, res) => {
    let { adminEmail, adminPassword } = req.body;

    let checkAdmin = await adminModel.findOne({
        adminEmail: adminEmail,
        adminPassword: adminPassword
    });

    if (checkAdmin) {
        let resObj = {
            status: "success",
            message: "Admin logged in successfully",
            adminData: checkAdmin,
        }
        res.send(resObj);
    }
    else {
        let resObj = {
            status: "failed",
            message: "Invalid admin credentials",
            adminData: null
        }
        res.send(resObj);
    }
}

module.exports = { adminLogin };