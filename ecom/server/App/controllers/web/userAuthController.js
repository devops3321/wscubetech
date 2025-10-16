const { transporter } = require("../../config/mailConfig");
const { userModel } = require("../../models/userModel");
const bcrypt = require('bcrypt');
const saltRounds = 10;

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
    let { userEmail, userPassword } = req.body;

    let checkuser = await userModel.findOne({ userEmail: userEmail });

    if (checkuser) {
        const checkPassword = await bcrypt.compareSync(userPassword, checkuser.userPassword);
        if (checkPassword) {
            let resObj = {
                status: "success",
                message: "Login successful",
                user: checkuser
            }
            res.send(resObj);
        }
        else {
            let resObj = {
                status: "failed",
                message: "Invalid password",
            }
            res.send(resObj);
        }
    }
    else {
        let resObj = {
            status: "failed",
            message: "User not found",
        }
        res.send(resObj);
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

module.exports = { sendOtp, createuser, login, viewuser, deleteuser, userStatusUpdate };