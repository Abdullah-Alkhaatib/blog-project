const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const {User, validateEmail, validateNewPassword} = require('../models/UserModel');
const VerificationToken = require('../models/VerificationToken');
const crypto = require('crypto');
const sendEmail = require("../utils/sendEmail");


/**--------------------------------------------
 * @desc    Send reset password link
 * @route   /api/auth/reset-password-link
 * @method  POST
 * @access  public
 ---------------------------------------------*/
 const sendResetPasswordLinkCtrl = asyncHandler(async (req, res) => {
    // 1. Validation
    const {error} = validateEmail(req.body);
    if(error){
        return res.status(400).json({message: error.details[0].message});
    }
    
    // 2. Get the user from DB by email
    const {email} = req.body;
    const user = await User.findOne({ email });
    if(!user){
        return res.status(404).json({message: "User with given email does not exist"});
    }

    // 3. Creating verificationToken
    let verificationToken = await VerificationToken.findOne({userId: user._id});
    if(!verificationToken){
        verificationToken = new VerificationToken({
            userId: user._id,
            token: crypto.randomBytes(32).toString("hex"),
        });
        await verificationToken.save();
    }

    // 4. Creating link
    const link = `${process.env.CLIENT_URL}/reset-password/${user._id}/${verificationToken.token}`;

    // 5. Creating HTML template
    const htmlTemplate = `
        <a href="${link}">Click here to reset your password</a>
    `;

    // 6. Sending email
    await sendEmail(user.email, "Reset Password", htmlTemplate);

    // 7. Response to the client
    res.status(200).json({message: "Password reset link sent to your email, Please check your inbox"});
 });



 /**--------------------------------------------
 * @desc    Get reset password link
 * @route   /api/auth/reset-password-link/:userId/:token
 * @method  GET
 * @access  public
 ---------------------------------------------*/
 const getResetPasswordLinkCtrl = asyncHandler(async (req, res) => {
    const { userId, token } = req.params;

    // 1. Find the user by ID
    const user = await User.findById(userId);
    if (!user) {
        return res.status(400).json({ message: "invalid link" });
    }

    // 2. Find the verification token
    const verificationToken = await VerificationToken.findOne({ 
        userId: user._id,
        token: token
    });
    if (!verificationToken) {
        return res.status(400).json({ message: "Invalid or expired token" });
    }

    // 3. Response to the client
    res.status(200).json({ message: "Valid url" });
 });



  /**--------------------------------------------
 * @desc    Reset password
 * @route   /api/auth/reset-password-link/:userId/:token
 * @method  POST
 * @access  public
 ---------------------------------------------*/
 const resetPasswordCtrl = asyncHandler(async (req, res) => {
    const { userId, token } = req.params;

    // 1. Validation
    const { error } = validateNewPassword(req.body);
    if(error){
        return res.status(400).json({message: error.details[0].message});
    }

    // 2. Find the user by ID
    const user = await User.findById(userId);
    if (!user) {
        return res.status(400).json({ message: "invalid link" });
    }

    // 3. Find the verification token
    const verificationToken = await VerificationToken.findOne({
        userId: user._id,
        token: token
    });
    if (!verificationToken) {
        return res.status(400).json({ message: "Invalid or expired token" });
    }

    if(!user.isAccountVerified){
        user.isAccountVerified = true;
    }

    // 5. Hash the new password
    const { password: newPassword } = req.body;
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // 6. Update the user's password
    user.password = hashedPassword;
    await user.save();

    // 7. Delete the verification token
    await VerificationToken.findByIdAndDelete(verificationToken._id);

    // 8. Response to the client
    res.status(200).json({ message: "Password reset successfully, please login" });
 });

 module.exports = {
    sendResetPasswordLinkCtrl,
    getResetPasswordLinkCtrl,
    resetPasswordCtrl
 }