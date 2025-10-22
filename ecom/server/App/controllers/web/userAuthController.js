const { transporter } = require("../../config/mailConfig");
const { profileModel } = require("../../models/profileModel");
const { userModel } = require("../../models/userModel");
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');

let userOTP = new Map();

let sendOtp = async (req, res) => {

    let { userEmail } = req.body;
    let otp = (Math.random() * 9999999).toString().split(".")[0].slice(0, 4);

    // console.log(otp);

    // Email OTP 
    const info = await transporter.sendMail({
        from: `"MONSTA" <${process.env.GMAIL_APP_USERNAME}>`, // sender address
        to: userEmail, // list of receivers
        subject: "MONSTA | REGISTER OTP",
        text: `Your OTP is ${otp}`, // plain‑text body
        html: `
            <div style="font-family: 'Segoe UI', Arial, sans-serif; background: #f7f7f7; padding: 40px;">
                <div style="max-width: 420px; margin: auto; background: #fff; border-radius: 12px; box-shadow: 0 4px 24px rgba(0,0,0,0.08); overflow: hidden;">
                <div style="background: linear-gradient(90deg, #C09578 0%, #f7c873 100%); padding: 24px 0; text-align: center;">
                    <img src="https://wscubetech.co/Assignments/furniture/storage/app/public/uploads/images/company-profile/logo/cccfbdab-3bec-439f-88b9-5694698cd302-1670132652.png" alt="MONSTA" style="height: 40px; margin-bottom: 12px;" />
                    <h2 style="color: #fff; margin: 0; font-size: 1.5rem;">Your MONSTA OTP</h2>
                </div>
                <div style="padding: 32px 24px; text-align: center;">
                    <p style="font-size: 1.1rem; color: #333; margin-bottom: 24px;">
                    Use the code below to verify your email address and complete your registration.
                    </p>
                    <div style="display: inline-block; background: #f7c873; color: #222; font-size: 2rem; font-weight: bold; letter-spacing: 8px; padding: 16px 32px; border-radius: 8px; margin-bottom: 24px;">
                    ${otp}
                    </div>
                    <p style="color: #888; font-size: 0.95rem;">
                    This OTP is valid for 10 minutes. If you did not request this, please ignore this email.
                    </p>
                </div>
                <div style="background: #f7f7f7; padding: 16px 24px; text-align: center; color: #aaa; font-size: 0.9rem;">
                    &copy; ${new Date().getFullYear()} MONSTA. All rights reserved.
                </div>
                </div>
            </div>
        `, // html body
    });

    // Store OTP against user email in Backend

    userOTP.set("userotp", otp);

    // console.log("Message sent: %s", info.messageId);

    // Get local time for OTP expiry
    const otpExpiryDate = new Date(Date.now() + 10 * 60 * 1000);
    const otpExpiryLocal = otpExpiryDate.toLocaleString();

    let resObj = {
        status: "success",
        message: "OTP sent successfully",
        // otp: otp,
        otpExpiry: otpExpiryLocal,
        // messageId: info.messageId
    }

    res.send(resObj);

}

let createuser = async (req, res) => {
    let { userName, userEmail, userPhone, userPassword, otp } = req.body;

    // Check if user already exists
    let existingUser = await userModel.findOne({ userEmail: userEmail });

    if (existingUser) {
        let resObj = {
            status: "failed",
            message: "User already exists with this email",
        }
        res.send(resObj);
        return;
    }
    // Verify OTP
    let backendotp = userOTP.get("userotp");

    if (otp == backendotp) {
        const hash = await bcrypt.hash(userPassword, saltRounds);
        let userObj = {
            userName,
            userEmail,
            userPhone,
            userPassword: hash
        }
        let user = new userModel(userObj);
        let userRes = await user.save();

        let resObj = {
            status: "success",
            message: "OTP verified successfully. User registered.",
            userRes
        }
        res.send(resObj);
    }
    else {
        let resObj = {
            status: "failed",
            message: "Invalid OTP. Please try again.",
        }
        res.send(resObj);
    }
}

let login = async (req, res) => {
    try {
        const { userEmail, userPassword } = req.body;
        const checkuser = await userModel.findOne({ userEmail });

        if (!checkuser) return res.send({ status: "failed", message: "User not found" });

        if (!checkuser.userStatus) return res.send({ status: "failed", message: "User is disabled" });

        // Guard: if no password stored (OAuth account), instruct client to use provider or set password
        if (!checkuser.userPassword) {
            return res.send({
                status: "failed",
                message: "No local password set. Use Google login or reset/set a password."
            });
        }

        const checkPassword = await bcrypt.compare(userPassword, checkuser.userPassword);

        //Create JWT Token
        let token = jwt.sign({ id: checkuser._id }, process.env.TOKENKEY, { expiresIn: '1h' });

        if (!checkPassword) return res.send({ status: "failed", message: "Invalid password" });

        return res.send({ status: "success", message: "Login successful", user: checkuser, token: token });
    } catch (err) {
        return res.send({ status: "failed", message: "Login error", error: err.message });
    }
}

let googleLogin = async (req, res) => {
    try {
        const { userName, userEmail, providerId } = req.body;

        if (!userEmail) {
            return res.send({ status: "failed", message: "Email is required" });
        }

        // find existing user
        let checkuser = await userModel.findOne({ userEmail: userEmail });

        // if user exists -> allow login only if userStatus is true
        if (checkuser) {
            if (checkuser.userStatus === false) {
                return res.send({ status: "failed", message: "User is disabled" });
            }

            // --- ADD: Ensure profile exists for Google user ---
            let profile = await profileModel.findById(checkuser._id).lean();
            if (!profile) {
                await profileModel.create({
                    _id: checkuser._id,
                    title: "Mr",
                    name: checkuser.userName,
                    email: checkuser.userEmail,
                    mobileNumber: checkuser.userPhone || "",
                    address: ""
                });
            }
            // --- END ADD ---

            const userResp = {
                _id: checkuser._id,
                userName: checkuser.userName,
                userEmail: checkuser.userEmail
            };

            // generate token for existing user
            const token = jwt.sign({ id: checkuser._id }, process.env.TOKENKEY, { expiresIn: '1h' });

            return res.send({ status: "success", message: "Login successful", user: userResp, token });
        }

        // User does not exist -> register using provider metadata (no plaintext password)
        const finalUserName = userName && userName.trim() ? userName.trim() : userEmail.split("@")[0];

        let userObj = {
            userName: finalUserName,
            userEmail,
            authProvider: "google",
            providerId: providerId || null,
            userStatus: true
        };

        let user = new userModel(userObj);
        let userRes = await user.save();

        // --- ADD: Create profile for new Google user ---
        await profileModel.create({
            _id: userRes._id,
            title: "Mr",
            name: userRes.userName,
            email: userRes.userEmail,
            mobileNumber: userRes.userPhone || "",
            address: ""
        });
        // --- END ADD ---

        const userResp = {
            _id: userRes._id,
            userName: userRes.userName,
            userEmail: userRes.userEmail
        };

        // generate token for newly created user
        const token = jwt.sign({ id: userRes._id }, process.env.TOKENKEY, { expiresIn: '1h' });

        return res.send({ status: "success", message: "User registered and logged in", user: userResp, token });
    }
    catch (err) {
        return res.send({ status: "failed", message: "Login error", error: err.message });
    }
}

// VIEW USERS with optional searchTerm, page, limit
let viewuser = async (req, res) => {
    try {
        let skip = 0;
        let limit = 10;

        if (req.query.limit) {
            limit = parseInt(req.query.limit);
        }
        if (req.query.page) {
            skip = (parseInt(req.query.page) - 1) * limit;
        }

        const term = req.query.searchTerm ? req.query.searchTerm.trim() : "";
        let searchObj = {};

        if (term) {
            searchObj = {
                $or: [
                    { userName: { $regex: term, $options: "i" } },
                    { userEmail: { $regex: term, $options: "i" } }
                ]
            };
        }

        let users = await userModel.find(searchObj).skip(skip).limit(limit).lean();
        let total = await userModel.countDocuments(searchObj);

        let resObj = {
            status: "success",
            message: "Users fetched successfully",
            users,
            length: total,
            totalPage: Math.ceil(total / limit)
        };
        res.send(resObj);
    }
    catch (err) {
        let resObj = {
            status: "failed",
            message: "Error fetching users",
            error: err
        }
        res.send(resObj);
    }
}

// DELETE users (accepts body.ids array)
let deleteuser = async (req, res) => {
    try {
        const ids = req.body.ids;
        if (!Array.isArray(ids) || ids.length === 0) {
            return res.send({ status: "failed", message: "No ids provided" });
        }

        await userModel.deleteMany({ _id: { $in: ids } });

        res.send({ status: "success", message: "User(s) deleted successfully" });
    } catch (err) {
        res.send({ status: "failed", message: "Error deleting users", error: err });
    }
}

// UPDATE user status (disable/enable). Accepts body.ids array and body.status (true/false)
let userStatusUpdate = async (req, res) => {
    try {
        const ids = req.body.ids;
        const status = req.body.status;

        if (!Array.isArray(ids) || ids.length === 0) {
            return res.send({ status: "failed", message: "No ids provided" });
        }
        if (typeof status !== "boolean") {
            return res.send({ status: "failed", message: "Status must be boolean" });
        }

        const result = await userModel.updateMany(
            { _id: { $in: ids } },
            { $set: { userStatus: status } }
        );

        res.send({
            status: "success",
            message: `Users ${status ? "enabled" : "deactivated"} successfully`,
            modifiedCount: result.modifiedCount
        });
    } catch (err) {
        res.send({ status: "failed", message: "Error updating status", error: err.message });
    }
}

let changePassword = async (req, res) => {
    try {
        const { oldPassword, newPassword, confirmPassword, id } = req.body;

        if (!id || !oldPassword || !newPassword || !confirmPassword) {
            return res.send({ status: "failed", message: "All fields are required" });
        }

        const checkUser = await userModel.findById(id).lean();
        if (!checkUser) {
            return res.send({ status: "failed", message: "User not found" });
        }

        if (!checkUser.userPassword) {
            return res.send({ status: "failed", message: "No local password set for this account" });
        }

        const dbPass = checkUser.userPassword;
        const isOldValid = await bcrypt.compare(oldPassword, dbPass);

        if (!isOldValid) {
            return res.send({ status: "failed", message: "Old password is incorrect" });
        }

        if (newPassword !== confirmPassword) {
            return res.send({ status: "failed", message: "New password and confirm password do not match" });
        }

        const hash = await bcrypt.hash(newPassword, saltRounds);

        await userModel.updateOne(
            { _id: id },
            { $set: { userPassword: hash } }
        );

        return res.send({ status: "success", message: "Password changed successfully" });
    } catch (err) {
        return res.send({ status: "failed", message: "Error changing password", error: err.message });
    }
}

let updateProfile = async (req, res) => {
    try {
        const { id, title, name, email, mobileNumber, address } = req.body;

        if (!id || !title || !name || !email || !mobileNumber || !address) {
            return res.send({ status: "failed", message: "All fields are required" });
        }

        const checkUser = await userModel.findById(id).lean();
        if (!checkUser) {
            return res.send({ status: "failed", message: "User not found" });
        }

        // Update user basic info as well (optional, but keeps user and profile in sync)
        await userModel.updateOne(
            { _id: id },
            {
                $set: {
                    userName: name,
                    userEmail: email,
                    userPhone: mobileNumber
                }
            }
        );

        // Check if profile exists
        let profile;
        const existingProfile = await profileModel.findById(id).lean();

        if (existingProfile) {
            // Update profile
            await profileModel.updateOne(
                { _id: id },
                {
                    $set: {
                        title,
                        name,
                        email,
                        mobileNumber,
                        address
                    }
                }
            );
            profile = await profileModel.findById(id).lean();
        } else {
            // Create new profile
            profile = await profileModel.create({
                _id: id,
                title,
                name,
                email,
                mobileNumber,
                address
            });
        }

        return res.send({ status: "success", message: "Profile updated successfully", profile });
    } catch (err) {
        return res.send({ status: "failed", message: "Error updating profile", error: err.message });
    }
}

let getProfile = async (req, res) => {
    try {
        const { id } = req.query;
        if (!id) return res.send({ status: "failed", message: "User ID required" });

        const profile = await profileModel.findById(id).lean();
        if (!profile) return res.send({ status: "failed", message: "Profile not found" });

        res.send({ status: "success", profile });
    } catch (err) {
        res.send({ status: "failed", message: "Error fetching profile", error: err.message });
    }
}

module.exports = { sendOtp, createuser, login, googleLogin, viewuser, deleteuser, userStatusUpdate, changePassword, updateProfile, getProfile };