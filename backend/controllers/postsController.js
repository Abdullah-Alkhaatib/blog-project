const fs = require("fs"); // File system module for file operations
const path = require("path");
const asyncHandler = require("express-async-handler"); // Middleware for handling async errors
const {Post, validateCreatePost} = require("../models/PostModel");
const {cloudinaryUploadImage, cloudinaryRemoveImage} = require("../utils/cloudinary"); // تعميل رفع الصور على كلاوديناري
const {validateUpdatePost} = require("../models/PostModel");

/**--------------------------------------------
 * @desc    Create new post
 * @route   /api/posts
 * @method  POST
 * @access  private (only logged in user)
 ---------------------------------------------*/

 const createPostCtrl = asyncHandler(async (req, res) => {
    // 1. Validation for image
    if(!req.file){ // اذا ما في صورة جايه من العميل
        return res.status(400).json({message: "no image provided"});
    }

    // 2. Validation for data
    const {error} = validateCreatePost(req.body); //req.body يعني البيانات اللي بعتها مع الطلب (زي العنوان والمحتوى).
    if(error){
        return res.status(400).json({message: error.details[0].message});
    }

    // 3. Upload photo
    const imagePath = path.join(__dirname, `../images/${req.file.filename}`); // بعمل مسار للصورة المرفوعة
    const result = await cloudinaryUploadImage(imagePath); // رفع الصورة على كلاوديناري

    // 4. Create new post and save it to DB
    const newPost = new Post({
        title: req.body.title,
        description: req.body.description,
        category: req.body.category,
        user: req.user.id, // ID of the user creating the post
        image: {
            url: result.secure_url,
            publicId: result.public_id,
        }
    })
    await newPost.save();

    // 5. Send response to the client
    res.status(201).json(newPost);

    // 6. Remove image from the server
    fs.unlinkSync(imagePath);
 });


 /**--------------------------------------------
 * @desc    Get all posts
 * @route   /api/posts
 * @method  GET
 * @access  public
 ---------------------------------------------*/
 const getAllPostsCtrl = asyncHandler(async (req, res) => {
    const POST_PER_PAGE = 3; // كل صفحه بدي ارسل 3 بوستات
    const {pageNumber, category } = req.query; // استخرج رقم الصفحة والفئة من استعلام الطلب
    let posts;

    if(pageNumber){
        posts = await Post.find()
            .skip((pageNumber - 1) * POST_PER_PAGE) // تخطي عدد البوستات في الصفحات السابقة
            .limit(POST_PER_PAGE) // تحديد عدد البوستات في الصفحة الحالية
            .sort({createdAt: -1})
            .populate("user", ["-password"]); 
    } else if(category){
        posts = await Post.find({category}).sort({createdAt: -1}) // 127.0.0.1:8000/api/posts/?category=music
            .populate("user", ["-password"]); 
    } else{
        posts = await Post.find().sort({createdAt: -1}) // إذا لم يتم تحديد رقم الصفحة أو الفئة، استرجاع جميع البوستات بترتيب تنازلي حسب تاريخ الإنشاء
            .populate("user", ["-password"]); // استرجاع معلومات المستخدم مع استبعاد كلمة المرور
    }

    res.status(200).json(posts);
});


 /**--------------------------------------------
 * @desc    Get single post
 * @route   /api/posts/:id
 * @method  GET
 * @access  public
 ---------------------------------------------*/
 const getSinglePostCtrl = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const post = await Post.findById(id).populate("user", ["-password"]); // استرجاع البوست بناءً على ID الخاص به
    if(!post){
        return res.status(404).json({message: "Post not found"});
    }

    res.status(200).json(post);
});


 /**--------------------------------------------
 * @desc    Get posts count
 * @route   /api/posts/count
 * @method  GET
 * @access  public
 ---------------------------------------------*/
 const getCountPostCtrl = asyncHandler(async (req, res) => {
    const count = await Post.countDocuments();
    res.status(200).json(count);
});


 /**--------------------------------------------
 * @desc    Delete post
 * @route   /api/posts/:id
 * @method  DELETE
 * @access  private (only admin or owner of the post)
 ---------------------------------------------*/
 const deletePostCtrl = asyncHandler(async (req, res) => {
    const post = await Post.findById(req.params.id);
    if(!post){
        return res.status(404).json({message: "Post not found"});
    }

    // post.user.toString() => حولته ل من اوبجكت ل سترينغ
    if(req.user.isAdmin || req.user.id === post.user.toString()){ // إذا كان المستخدم هو المسؤول أو مالك البوست
        await Post.findByIdAndDelete(req.params.id); // حذف البوست من قاعدة البيانات
        await cloudinaryRemoveImage(post.image.publicId); // حذف الصورة من كلاوديناري

        // @TODO - Delete all comments that belong to this post

        res.status(200).json({message: "Post has been deleted successfully", postId: post._id});
    } else{
        res.status(403).json({message: "You are not authorized to delete this post"});
    }

});


/**--------------------------------------------
 * @desc    Update post
 * @route   /api/posts/:id
 * @method  PUT
 * @access  private (only owner of the post)
 ---------------------------------------------*/
const updatePostCtrl = asyncHandler(async (req, res) => {
    // 1. Validation
    const {error} = validateUpdatePost(req.body);
    if(error){
        return res.status(400).json({message: error.details[0].message});
    }

    // 2. Get the post from DB and check if post exist
    const post = await Post.findById(req.params.id);
    if(!post){
        return res.status(404).json({message: "Post not found"});
    }

    // 3. check if this post belong to logged in user
    if(req.user.id !== post.user.toString()){ // اذا ما كان هذا البوست ل هذا اليوزر
        return res.status(403).json({message: "Access denied, you are not allowed to update this post"});
    }

    // 4. update post 
    const updatedPost = await Post.findByIdAndUpdate(req.params.id, {
        $set: { // تحديث الحقول
            title: req.body.title,
            description: req.body.description,
            category: req.body.category
        }
    }, {new: true})
       .populate("user", ["-password"]); // لإرجاع البوست المحدث

    // 5. Send response to the client
    res.status(200).json(updatedPost);
});


/**--------------------------------------------
 * @desc    Update post image
 * @route   /api/posts/upload-image/:id
 * @method  PUT
 * @access  private (only owner of the post)
 ---------------------------------------------*/
const updatePostImageCtrl = asyncHandler(async (req, res) => {
    // 1. Validation
    if(!req.file){ // اذا ما في صورة جايه من العميل
        return res.status(400).json({message: "No image provided"});
    }

    // 2. Get the post from DB and check if post exist
    const post = await Post.findById(req.params.id);
    if(!post){
        return res.status(404).json({message: "Post not found"});
    }

    // 3. check if this post belong to logged in user
    if(req.user.id !== post.user.toString()){ // اذا ما كان هذا البوست ل هذا اليوزر
        return res.status(403).json({message: "Access denied, you are not allowed to update this post"});
    }

    // 4. delete the old image
    await cloudinaryRemoveImage(post.image.publicId); // حذف الصورة القديمة من كلاوديناري

    // 5. Upload new photo
    const imagePath = path.join(__dirname, `../images/${req.file.filename}`); // بعمل مسار للصورة المرفوعة
    const result = await cloudinaryUploadImage(imagePath); // رفع الصورة الجديدة على كلاوديناري

    // 6. update the image field in the DB
    const updatedPost = await Post.findByIdAndUpdate(req.params.id, {
        $set: { // تحديث الحقول
            image: {
                url: result.secure_url,
                publicId: result.public_id,
            }
        }
    }, {new: true});

       // 7. send response to client
       res.status(200).json(updatedPost);

       // 8. delete image from the server
       fs.unlinkSync(imagePath); // حذف الصورة من السيرفر
});


/**--------------------------------------------
 * @desc    Toggle like
 * @route   /api/posts/like/:id
 * @method  PUT
 * @access  private (only logged in user)
 ---------------------------------------------*/
 const toggleLikeCtrl = asyncHandler(async (req, res) => {
    const loggedInUser = req.user.id;
    const {id: postId} = req.params; // نفسه id

    let post = await Post.findById(postId);
    if(!post){
        return res.status(404).json({message: "Post not found"});
    }

    // checked if user already liked the post
    const isPostAlreadyLiked = post.likes.find((user) => user.toString() === loggedInUser);
    if(isPostAlreadyLiked){ // اذا كان اليوزر عمل لايك على البوست
        post = await Post.findByIdAndUpdate(postId, {
            $pull: {likes: loggedInUser} // ازالة اليوزر من قائمة اللايكات, pull بشتغل مع الاري
        }, {new: true})
    } else{
        post = await Post.findByIdAndUpdate(postId, {
            $push: {likes: loggedInUser} // اضافة اليوزر لقائمة اللايكات
        }, {new: true})
    }

    res.status(200).json(post);
 })

 module.exports = {
    createPostCtrl,
    getAllPostsCtrl,
    getSinglePostCtrl,
    getCountPostCtrl,
    deletePostCtrl,
    updatePostCtrl,
    updatePostImageCtrl,
    toggleLikeCtrl
 }