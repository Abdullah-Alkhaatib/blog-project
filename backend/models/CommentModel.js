const mongoose = require("mongoose");
const joi = require("joi");

// Comment schema 
const commentSchema = new mongoose.Schema({
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    text: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

// Comment Model
const Comment = mongoose.model("Comment", commentSchema);

// Validate create comment
function validateCreateComment(comment) { // obj
    const schema = joi.object({
        postId: joi.string().required().label("Post ID"),
        text: joi.string().trim().required().label("Text"),
    });
    return schema.validate(comment);
}

// Validate update comment
function validateUpdateComment(comment) {
    const schema = joi.object({
        text: joi.string().trim().required(),
    });
    return schema.validate(comment);
}

module.exports = {
    Comment,
    validateCreateComment,
    validateUpdateComment
};
