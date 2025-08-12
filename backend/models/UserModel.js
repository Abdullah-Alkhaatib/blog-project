const mongoose = require("mongoose");

// User Schema
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, trim: true, minlength: 2, maxlength: 100 },
    email: { type: String, required: true, trim: true, minlength: 5, maxlength: 100, unique: true },
    password: { type: String, required: true, trim: true, minlength: 8 },
    profilePhoto: {
        type: Object,
        default: {
            url: "https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI=",
            publicId: null,
        }
    },
    bio: { type: String },
    isAdmin: { type: Boolean, default: false },
    isAccountVerified: { type: Boolean, default: false },
}, { timestamps: true } );

// User Model
const User = mongoose.model("User", userSchema);
module.exports = {
    User
};