const { adminModel } = require("../../models/adminModel");
const { companyProfileModel } = require("../../models/companyprofileModel");
const { adminProfileModel } = require("../../models/adminprofileModel");

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

// View company profile (no id required)
let viewCompanyProfile = async (req, res) => {
    try {
        let profile = await companyProfileModel.findOne();
        if (!profile) {
            return res.send({
                status: "failed",
                message: "Company profile not found",
                data: null,
                staticPath: process.env.COMPANY_PROFILE_IMAGE_PATH
            });
        }
        res.send({
            status: "success",
            message: "Company profile fetched successfully",
            data: profile,
            staticPath: process.env.COMPANY_PROFILE_IMAGE_PATH
        });
    } catch (err) {
        res.send({
            status: "failed",
            message: "Error fetching company profile",
            error: err.message
        });
    }
};

// Update company profile (no id required)
let companyProfileUpdate = async (req, res) => {
    try {
        let profile = await companyProfileModel.findOne();

        // Prepare update data
        let updateData = {
            name: req.body.name,
            email: req.body.email,
            mobile: req.body.mobile,
            address: req.body.address,
            mapUrl: req.body.mapUrl,
            facebook: req.body.facebook,
            youtube: req.body.youtube,
            instagram: req.body.instagram,
            twitter: req.body.twitter,
        };

        // Only set avatar if a new file is uploaded
        if (req.files && req.files.avatar && req.files.avatar[0]) {
            updateData.avatar = req.files.avatar[0].filename;
        } else if (profile && profile.avatar) {
            updateData.avatar = profile.avatar; // Keep existing avatar
        } else {
            updateData.avatar = ""; // No avatar at all
        }

        if (!profile) {
            // Create new profile
            let newProfile = new companyProfileModel(updateData);
            await newProfile.save();
            return res.send({
                status: "success",
                message: "Company profile created successfully",
                data: newProfile,
                staticPath: process.env.COMPANY_PROFILE_IMAGE_PATH
            });
        } else {
            // Update existing profile
            let updated = await companyProfileModel.findByIdAndUpdate(
                profile._id,
                { $set: updateData },
                { new: true }
            );
            return res.send({
                status: "success",
                message: "Company profile updated successfully",
                data: updated
            });
        }
    } catch (err) {
        res.send({
            status: "failed",
            message: "Error updating company profile",
            error: err.message
        });
    }
};

let adminProfileUpdate = async (req, res) => {
    try {
        // Extract fields from body
        const { adminName, adminEmail, adminMobile } = req.body;
        let updateData = {
            adminName,
            adminEmail,
            adminMobile,
        };

        // Handle avatar upload
        if (req.files && req.files.adminAvatar && req.files.adminAvatar[0]) {
            updateData.adminAvatar = req.files.adminAvatar[0].filename;
        }

        // Find existing profile by email (unique)
        let profile = await adminProfileModel.findOne({ adminEmail });

        if (!profile) {
            // Create new profile if not exists
            let newProfile = new adminProfileModel(updateData);
            await newProfile.save();
            return res.send({
                status: "success",
                message: "Admin profile created successfully",
                data: newProfile,
                staticPath: process.env.ADMIN_PROFILE_IMAGE_PATH
            });
        } else {
            // Update existing profile
            let updated = await adminProfileModel.findByIdAndUpdate(
                profile._id,
                { $set: updateData },
                { new: true }
            );
            return res.send({
                status: "success",
                message: "Admin profile updated successfully",
                data: updated,
                staticPath: process.env.ADMIN_PROFILE_IMAGE_PATH
            });
        }
    } catch (err) {
        res.send({
            status: "failed",
            message: "Error updating admin profile",
            error: err.message,
        });
    }
}

let viewAdminProfile = async (req, res) => {
    try {
        // You can use req.query.adminEmail or req.body.adminEmail if you want to filter by email
        // For now, fetch the first admin profile (assuming single admin)
        let profile = await adminProfileModel.findOne();
        if (!profile) {
            return res.send({
                status: "failed",
                message: "Admin profile not found",
                data: null,
                staticPath: process.env.ADMIN_PROFILE_IMAGE_PATH
            });
        }
        res.send({
            status: "success",
            message: "Admin profile fetched successfully",
            data: profile,
            staticPath: process.env.ADMIN_PROFILE_IMAGE_PATH
        });
    } catch (err) {
        res.send({
            status: "failed",
            message: "Error fetching admin profile",
            error: err.message,
            data: null
        });
    }
}

module.exports = { adminLogin, changePassword, companyProfileUpdate, viewCompanyProfile, adminProfileUpdate, viewAdminProfile };