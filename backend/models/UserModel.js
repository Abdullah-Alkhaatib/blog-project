const mongoose = require("mongoose");
const joi = require('joi'); // validation
const jwt = require("jsonwebtoken");

// User Schema
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, trim: true, minlength: 2, maxlength: 100 },
    email: { type: String, required: true, trim: true, minlength: 5, maxlength: 100, unique: true },
    password: { type: String, required: true, trim: true, minlength: 8 },
    profilePhoto: {
        type: Object,
        default: {
            url: "https://static.vecteezy.com/system/resources/previews/036/280/650/non_2x/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-illustration-vector.jpg",
            publicId: null,
        }
    },
    bio: { type: String },
    isAdmin: { type: Boolean, default: false },
    isAccountVerified: { type: Boolean, default: false },
}, { 
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// Populate posts that belongs to this user when he/she get his/her profile
userSchema.virtual("posts", {
    ref: "Post",
    foreignField: "user", // الحقل في نموذج البوستات الذي يشير إلى المستخدم
    localField: "_id",
})

// Generate Auth Token
userSchema.methods.generateAuthToken = function (){
    return jwt.sign({id: this._id, isAdmin: this.isAdmin}, process.env.JWT_SECRET, {expiresIn: "30d"}); // id: this._id
}

// User Model
const User = mongoose.model("User", userSchema);

// validate register User
function validateRegisterUser(user){
    const schema = joi.object({
        username: joi.string().trim().min(2).max(100).required(),
        email: joi.string().trim().min(5).max(100).required().email(),
        password: joi.string().trim().min(8).required(),
    });
    return schema.validate(user);
};

// validate login User
function validateLoginUser(user){
    const schema = joi.object({
        email: joi.string().trim().min(5).max(100).required().email(),
        password: joi.string().trim().min(8).required(),
    });
    return schema.validate(user);
};

// validate update User
function validateUpdateUser(user){
    const schema = joi.object({
        username: joi.string().trim().min(2).max(100),
        password: joi.string().trim().min(8),
        bio: joi.string(),
    });
    return schema.validate(user);
}

module.exports = {
    User,
    validateRegisterUser,
    validateLoginUser,
    validateUpdateUser
};