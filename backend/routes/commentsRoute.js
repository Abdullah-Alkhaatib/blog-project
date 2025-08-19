const express = require("express");
const router = express.Router();

const {verifyToken, verifyTokenAndAdmin} = require("../middlewares/verifyToken");
const validateOjectId = require("../middlewares/validateObjectId");
const {createCommentCtrl, getAllCommentsCtrl, deleteCommentCtrl, updateCommentCtrl} = require("../controllers/commentsController");

//  /api/comments
router.post("/", verifyToken, createCommentCtrl);
router.get("/", verifyTokenAndAdmin, getAllCommentsCtrl);

//  /api/comments/:id
router.delete("/:id",validateOjectId, verifyToken, deleteCommentCtrl);

//  /api/comments/:id
router.put("/:id", validateOjectId, verifyToken, updateCommentCtrl);

module.exports = router;