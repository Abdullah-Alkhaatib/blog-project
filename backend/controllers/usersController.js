const asyncHandler = require('express-async-handler');
const {User, validateUpdateUser} = require("../models/UserModel");
const bcrypt = require('bcryptjs');
const path = require("path");
const fs = require("fs"); // fs => file system
const { cloudinaryUploadImage, cloudinaryRemoveImage } = require("../utils/cloudinary");


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

    // 1. validation التحقق من وجود ملف
    if(!req.file){ //  إذا لم يتم رفع أي ملف
        return res.status(400).json({message: "No file uploaded"});
    }

    // 2. Get the path to the image
    const imagePath = path.join(__dirname, `../images/${req.file.filename}`); // بعمل مسار للصورة المرفوعة

    // 3. Upload to cloudinary (عملته ب utils)
    const result = await cloudinaryUploadImage(imagePath);
    // console.log(result); // راح يطبع معلومات الصورة المرفوعة على كلاوديناري
    
    // 4. Get the user from DB
    const user = await User.findById(req.user.id);

    // 5. Delete the old profile photo if exist
    if(user.profilePhoto.publicId !== null){ // إذا كان هناك صورة سابقة
        await cloudinaryRemoveImage(user.profilePhoto.publicId);
    }

    // 6. Change the profilePhoto field in the DB
    user.profilePhoto = {
        url: result.secure_url, // رابط الصورة المرفوعة
        publicId: result.public_id // معرف الصورة المرفوعة
    }
    await user.save(); // حفظ التغييرات في قاعدة البيانات

    // 7. send response to client
    res.status(200).json({message: "Your profile photo uploaded successfully", profilePhoto: {url: result.secure_url, publicId: result.public_id}});

    // 8. Remove image from the server
    fs.unlinkSync(imagePath); // (من فولدر الايمج)حذف الصورة من السيرفر
});


/**--------------------------------------------
 * @desc    Delete user profile (كل Account) 
 * @route   /api/users/profile/:id
 * @method  DELETE
 * @access  private (only admin or user himself) عملت verify في verifytoken
 ---------------------------------------------*/
const deleteUserProfileCtrl = asyncHandler(async (req, res) => {
    // 1. Get the user from DB
    const user = await User.findById(req.params.id);
    if(!user){
        return res.status(404).json({message: "User not found"});
    }

    // @TODO - 2. Get all posts from DB
    // @TODO - 3. Get the public ids from the posts
    // @TODO - 4. Delete all posts image from cloudinary that belong to this user

    // 5. Delete the profile picture from cloudinary
    await cloudinaryRemoveImage(user.profilePhoto.publicId);

    // @TODO - 6. Delete user posts and comments

    // 7. Delete the user himself
    await User.findByIdAndDelete(req.params.id);

    // 8. Send response to the client
    res.status(200).json({message: "Your profile has been deleted successfully"});
})

module.exports = {
    getAllUsersCtrl,
    getUserProfileCtrl,
    updateUserProfileCtrl,
    getUsersCountCtrl,
    profilePhotoUploadCtrl,
    deleteUserProfileCtrl
}