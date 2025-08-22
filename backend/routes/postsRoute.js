const express = require("express");
const router = express.Router();
const photoUpload = require("../middlewares/photoUpload");
const {verifyToken} = require("../middlewares/verifyToken");
const validateObjectId = require("../middlewares/validateObjectId");

const {createPostCtrl, getAllPostsCtrl, getSinglePostCtrl, getCountPostCtrl, deletePostCtrl, updatePostCtrl, updatePostImageCtrl, toggleLikeCtrl} = require("../controllers/postsController");

//  /api/posts
router.post("/",verifyToken, photoUpload.single("image"), createPostCtrl);
router.get("/", getAllPostsCtrl);
//  /api/posts/count    
router.get("/count", getCountPostCtrl);
//  /api/posts/:id
router.get("/:id", validateObjectId, getSinglePostCtrl);
//  /api/posts/:id
router.delete("/:id", validateObjectId, verifyToken, deletePostCtrl);
//  /api/posts/:id
router.put("/:id", validateObjectId, verifyToken, updatePostCtrl);
//  /api/posts/update-image/:id
router.put("/update-image/:id", validateObjectId, verifyToken, photoUpload.single("image"), updatePostImageCtrl);

//  /api/posts/like/:id
router.put("/like/:id", validateObjectId, verifyToken, toggleLikeCtrl);

module.exports = router;