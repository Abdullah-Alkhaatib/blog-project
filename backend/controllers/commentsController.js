const asyncHandler = require('express-async-handler');
const {Comment, validateCreateComment, validateUpdateComment} = require("../models/CommentModel");
const {User} = require("../models/UserModel");


/**--------------------------------------------
 * @desc    Create new comment
 * @route   /api/comments
 * @method  POST
 * @access  private (only logged in user)
 ---------------------------------------------*/
 const createCommentCtrl = asyncHandler(async (req, res) => {
    const {error} = validateCreateComment(req.body); //req.body = البيانات اللي بعتهم المستخدم (postId, user, text)
    if(error){
        return res.status(400).json({message: error.details[0].message});
    }

    const profile = await User.findById(req.user.id);

    const comment = await Comment.create({
        postId: req.body.postId,
        text: req.body.text,
        user: req.user.id, // req.user.id = user id from auth middleware (login)
        username: profile.username 
    });

    const populatedComment = await Comment.findById(comment._id).populate("user", "-password");

    res.status(201).json(populatedComment); // نرسل الكومينت الى الكلاينت
 });


 /**--------------------------------------------
 * @desc    Get all comments
 * @route   /api/comments
 * @method  GET
 * @access  private (only admin)
 ---------------------------------------------*/
 const getAllCommentsCtrl = asyncHandler(async (req, res) => {
    const comments = await Comment.find().populate("user"); // populate => لما تضيف .populate("user")، Mongoose بيروح على collection User ويجيبلك كامل معلومات اليوزر بدل ما يظل مجرد ID.
    res.status(200).json({comments});
 });


  /**--------------------------------------------
 * @desc    Delete comment
 * @route   /api/comments/:id
 * @method  DELETE
 * @access  private (only admin or owner of the comment)
 ---------------------------------------------*/
const deleteCommentCtrl = asyncHandler(async (req, res) => {
    const comment = await Comment.findById(req.params.id);
    if(!comment){
        return res.status(404).json({message: "Comment not found"});
    }

    if(req.user.isAdmin || req.user.id === comment.user.toString()){ // إذا كان المستخدم أدمن أو هو صاحب الكومينت
        await Comment.findByIdAndDelete(req.params.id);
        return res.status(200).json({message: "Comment deleted successfully"});
    } else{
        return res.status(403).json({message: "You are not authorized to delete this comment"});
    }
});


  /**--------------------------------------------
 * @desc    Update comment
 * @route   /api/comments/:id
 * @method  PUT
 * @access  private (only owner of the comment)
 ---------------------------------------------*/
 const updateCommentCtrl = asyncHandler(async (req, res) => {
    const {error} = validateUpdateComment(req.body);
    if(error){
        return res.status(400).json({message: error.details[0].message});
    }

    // ناخذ الكومينت من الداتا بيس ونشوف اذا موجود او لا
    const comment = await Comment.findById(req.params.id);
    if(!comment){
        return res.status(404).json({message: "Comment not found"});
    }

    if(req.user.id !== comment.user.toString()){  // إذا كان المستخدم ليس هو صاحب الكومينت
        return res.status(403).json({message: "You are not authorized to update this comment"});
    }

    const updatedComment = await Comment.findByIdAndUpdate(req.params.id, {
        $set: {
            text: req.body.text
        }
    }, {new : true})

    res.status(200).json({updatedComment});
})

 module.exports = {
     createCommentCtrl,
     getAllCommentsCtrl,
     deleteCommentCtrl,
     updateCommentCtrl
 };