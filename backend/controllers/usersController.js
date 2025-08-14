const asyncHandler = require('express-async-handler');
const {User, validateUpdateUser} = require("../models/UserModel");
const bcrypt = require('bcryptjs');


/**--------------------------------------------
 * @desc    Get all users profile
 * @route   /api/users/profile
 * @method  GET
 * @access  private (only admin)
 ---------------------------------------------*/
const getAllUsersCtrl = asyncHandler(async (req, res) => {
    // console.log(req.headers.authorization);
    // console.log(req.headers.authorization.split(" ")[1]);

    const users = await User.find().select("-password");
    res.status(200).json(users);
});


/**--------------------------------------------
 * @desc    Get user profile (single user)
 * @route   /api/users/profile/:id
 * @method  GET
 * @access  public
 ---------------------------------------------*/
const getUserProfileCtrl = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id).select("-password"); //عشان ما نرجع الباسورد
    if(!user){
        return res.status(404).json({message: "User not found"});
    }
    res.status(200).json(user);
});

/**--------------------------------------------
 * @desc    Update user profile
 * @route   /api/users/profile/:id
 * @method  PUT
 * @access  private (only user himself)
 ---------------------------------------------*/
 const updateUserProfileCtrl = asyncHandler(async (req, res) => {
    // validation (في userModel)
    const {error} = validateUpdateUser(req.body);
    if(error){
        return res.status(400).json({message: error.details[0].message});
    }

    // check if password is provided
    if(req.body.password){ // اذا في باسورد جاي من العميل 
        const salt = await bcrypt.genSalt(10); 
        req.body.password = await bcrypt.hash(req.body.password, salt); //هاش => يعني نعمل تشفير للباسورد
    }

    // تحديث بيانات المستخدم
    const updatedUser = await User.findByIdAndUpdate(req.params.id, {
        $set: { // (يروح عالداتا بيس يعمل ابديت عاليوزر نيم و الباسوورد والبايو اذا كانت موجوده (اللي موجوده فيهم
            username: req.body.username,
            password: req.body.password,
            bio: req.body.bio
        }
    }, {new: true}).select("-password"); // new: true => يعني رجعلي اليوزر ابديت بعد التحديث

    res.status(200).json(updatedUser);
    
 });


 /**--------------------------------------------
 * @desc    Get users count
 * @route   /api/users/count
 * @method  GET
 * @access  private (only admin)
 ---------------------------------------------*/
const getUsersCountCtrl = asyncHandler(async (req, res) => {
    const count = await User.countDocuments();
    res.status(200).json(count);
});


// npm i multer cloudinary
/**--------------------------------------------
 * @desc    Profile photo upload
 * @route   /api/users/profile/profile-photo-upload
 * @method  POST
 * @access  private (only logged in user)
 ---------------------------------------------*/
const profilePhotoUploadCtrl = asyncHandler(async(req, res) => {
    // console.log(req.file); // req.file يحتوي على معلومات الصورة المرفوعة

    if(!req.file){ //  إذا لم يتم رفع أي ملف
        return res.status(400).json({message: "No file uploaded"});
    }
    
    // تحديث صورة الملف الشخصي للمستخدم
    res.status(200).json({message: "Your profile photo uploaded successfully"});
})

module.exports = {
    getAllUsersCtrl,
    getUserProfileCtrl,
    updateUserProfileCtrl,
    getUsersCountCtrl,
    profilePhotoUploadCtrl
}