const { transporter } = require("../../config/mailConfig");

let userOTP = new Map();

let sendOtp = async (req, res) => {

    let { userEmail } = req.body;
    let otp = (Math.random() * 9999999).toString().split(".")[0].slice(0, 4);

    console.log(otp);

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

    userOTP.set(userEmail, { otp, expiry: Date.now() + 10 * 60 * 1000 });

    console.log("Message sent: %s", info.messageId);

    res.send("OTP sent successfully");

}

module.exports = { sendOtp };