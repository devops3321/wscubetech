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

let changePassword = async (req, res) => {
    let { id } = req.params;

    let { oldPassword, newPassword, confirmPassword } = req.body;

    // Check if new password and confirm password match
    if (newPassword !== confirmPassword) {
        return res.send({
            status: "failed",
            message: "New password and confirm password do not match",
        });
    }

    // Find admin by id and old password
    let checkAdmin = await adminModel.findOne({
        _id: id,
        adminPassword: oldPassword
    });

    if (!checkAdmin) {
        return res.send({
            status: "failed",
            message: "Old password is incorrect",
        });
    }

    // Prevent setting the same password
    if (oldPassword === newPassword) {
        return res.send({
            status: "failed",
            message: "New password must be different from existing password",
        });
    }

    // Update password
    let updateAdmin = await adminModel.updateOne(
        { _id: id },
        { $set: { adminPassword: newPassword } }
    );

    if (updateAdmin.modifiedCount > 0) {
        return res.send({
            status: "success",
            message: "Password changed successfully",
        });
    } else {
        return res.send({
            status: "failed",
            message: "Password change failed",
        });
    }
}

module.exports = { adminLogin, changePassword };