const express = require("express");
const router = express.Router();
const photoUpload = require("../middlewares/photoUpload");
const {verifyToken} = require("../middlewares/verifyToken");
const validateObjectId = require("../middlewares/validateObjectId");

const {createPostCtrl, getAllPostsCtrl, getSinglePostCtrl, getCountPostCtrl, deletePostCtrl, updatePostCtrl} = require("../controllers/postsController");

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

module.exports = router;