// npm i joi bcryptjs express-async-handler

const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const {User, validateRegisterUser, validateLoginUser} = require('../models/UserModel');
const VerificationToken = require('../models/VerificationToken');
const crypto = require('crypto');
const sendEmail = require("../utils/sendEmail");

/**--------------------------------------------
 * @desc    Register a new user
 * @route   /api/auth/register
 * @method  POST
 * @access  Public
 ---------------------------------------------*/

 const registerUserCtrl = asyncHandler(async (req, res) => {
    // validation (في userModel)
    const {error} = validateRegisterUser(req.body);
    if(error){
        return res.status(400).json({message: error.details[0].message});
    }

    // is user already exists
    let user = await User.findOne({ email: req.body.email });
    if(user){
        return res.status(400).json({message: "User already exists"});
    }

    // hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // new user and save to DB
    user = new User({
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword,
    });
    await user.save();

    // @TODO ---sending email (verify account)

    // Creating new verificationToken and save if toDB
    const verificationToken = new VerificationToken({
        userId: user._id,
        token: crypto.randomBytes(32).toString("hex"), // توليد توكن عشوائي
    });
    await verificationToken.save();

    // Making the link
    const link = `http://localhost:3000/users/${user._id}/verify/${verificationToken.token}`;

    // Putting the link into an html template
    const htmlTemplate = `
        <p>Click on the link below to verify your email:</p>
        <a href="${link}">Verify</a>
    `;

    // Sending email the user
    await sendEmail(user.email, "Verify your email", htmlTemplate);

    // send a response to client
    res.status(201).json({message: "We sent to you an email, please verify your email address"});
 });


 /**--------------------------------------------
 * @desc    Login User
 * @route   /api/auth/login
 * @method  POST
 * @access  Public
 ---------------------------------------------*/    
 const loginUserCtrl = asyncHandler(async (req, res) => {
    // validation (في userModel)
    const {error} = validateLoginUser(req.body);
    if(error){
        return res.status(400).json({message: error.details[0].message});
    }

    // is user exist
    const user = await User.findOne({email: req.body.email});
    if(!user){
        return res.status(404).json({message: "User not found"});
    }

    // check the password
    const isPassword = await bcrypt.compare(req.body.password, user.password); // req.body.password => من الكلاينت , user.password => من الداتا بيس
    if(!isPassword){
        return res.status(401).json({message: "Invalid password"});
    }

    // @TODO ---sending email (verify account if not verified)
    if(!user.isAccountVerified){
        let verificationToken = await VerificationToken.findOne({
            userId: user._id
        });
        if(!verificationToken){
            verificationToken = new VerificationToken({
                userId: user._id,
                token: crypto.randomBytes(32).toString("hex"),
            });
            await verificationToken.save();
        }

        const link = `http://localhost:3000/users/${user._id}/verify/${verificationToken.token}`;
    
        const htmlTemplate = `
            <p>Click on the link below to verify your email:</p>
            <a href="${link}">Verify</a>
        `;

        await sendEmail(user.email, "Verify your email", htmlTemplate);

        return res.status(400).json({message: "We sent to you an email, please verify your email address"});
    }

    // generate token (jwt) (في userModel)
    // npm i jsonwebtoken
    const token = user.generateAuthToken();


    // response to client
    res.status(200).json({
        _id: user._id,
        username: user.username,
        isAdmin: user.isAdmin,
        profilePhoto: user.profilePhoto,
        bio: user.bio,
        token,
    });
 });


 // عشان اغير حالة isAccountVerified من فولس ل ترو
  /**--------------------------------------------
 * @desc    Verify User Account
 * @route   /api/auth/:userId/verify/:token
 * @method  GET
 * @access  Public
 ---------------------------------------------*/
 const verifyUserAccountCtrl = asyncHandler(async (req, res) => {
    const {userId, token} = req.params;    

    const user = await User.findById(userId);
    if(!user){
        return res.status(400).json({message: "Invalid link"});
    }
    
    const verificationToken = await VerificationToken.findOne({
        userId: user._id,
        token: token 
    });
    if(!verificationToken){
        return res.status(400).json({message: "Invalid link"});
    }

    // update user isAccountVerified
    user.isAccountVerified = true;
    await user.save();

    // delete verification token
    await VerificationToken.deleteOne({ userId: user._id });

    res.status(200).json({message: "Your account has been verified"});
})


   module.exports = {
    registerUserCtrl,
    loginUserCtrl,
    verifyUserAccountCtrl
 };