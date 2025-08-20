const mongoose = require('mongoose');
const joi = require("joi"); 

// Post schema 
const postSchema = new mongoose.Schema({
    title: { type: String, required: true, trim: true, minlength: 2, maxlength: 200 },
    description: { type: String, required: true, trim: true, minlength: 10 },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
    category: { type: String, required: true },
    image: { 
        type: Object, 
        default: {
            url: "",
            publicId: null,
        }
    },
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User" // بقدر اجيب معلومات اليوزر اللي ب UserModel
        }
    ]
}, { 
    timestamps: true, 
    toJSON: {virtuals: true}, // عشان اقدر استخدم الفيرتشوال في ال API
    toObject: {virtuals: true} 
});

// Populate comment for this post
postSchema.virtual( "comments", { // عند الحاجه افتراضي مو حقيقي
    ref: "Comment", // Model name
    foreignField: "postId", // من Comment Model
    localField: "_id" 
})

// Post Model
const Post = mongoose.model("Post", postSchema);

// Validate create post
function validateCreatePost(post){ // اليوزر لما يعمل نيو بوست لازم يعطينا title description category
    const schema = joi.object({
        title: joi.string().trim().min(2).max(200).required(),
        description: joi.string().trim().min(10).required(),
        category: joi.string().trim().required(),
    });
    return schema.validate(post);
}

// Validate update post
function validateUpdatePost(post){
    const schema = joi.object({
        title: joi.string().trim().min(2).max(200),
        description: joi.string().trim().min(10),
        category: joi.string().trim(),
    });
    return schema.validate(post);
}

module.exports = {
    Post,
    validateCreatePost,
    validateUpdatePost
};
