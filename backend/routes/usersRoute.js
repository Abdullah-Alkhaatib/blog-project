// routes
const express = require("express");

const router = express.Router();

const {getAllUsersCtrl, getUserProfileCtrl, updateUserProfileCtrl, getUsersCountCtrl, profilePhotoUploadCtrl} = require("../controllers/usersController");
const {verifyTokenAndAdmin, verifyTokenAndUser, verifyToken} = require("../middlewares/verifyToken");
const validateObjectId = require("../middlewares/validateObjectId");
const photoUpload = require("../middlewares/photoUpload");

// /api/users/profile
router.get('/profile', verifyTokenAndAdmin, getAllUsersCtrl);

// /api/users/profile/:id
router.get('/profile/:id', validateObjectId, getUserProfileCtrl);

// /api/users/profile/:id
router.put('/profile/:id', validateObjectId, verifyTokenAndUser, updateUserProfileCtrl);

// /api/users/count
router.get('/count', verifyTokenAndAdmin, getUsersCountCtrl);

//  api/users/profile/profile-photo-upload
router.post('/profile/profile-photo-upload', photoUpload.single("image"), verifyToken, profilePhotoUploadCtrl); // single يعني تحميل صورة واحدة

module.exports = router;