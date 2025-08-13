// npm i joi bcryptjs express-async-handler

const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const {User, validateRegisterUser, validateLoginUser} = require('../models/UserModel');

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

    // send a response to client
    res.status(201).json({message: "you registered successfully, please login now"});
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

    // generate token (jwt) (في userModel)
    // npm i jsonwebtoken
    const token = user.generateAuthToken();


    // response to client
    res.status(200).json({
        _id: user._id,
        username: user.username,
        isAdmin: user.isAdmin,
        profilePhoto: user.profilePhoto,
        token,
    });
 });

  module.exports = {
    registerUserCtrl,
    loginUserCtrl 
 };
