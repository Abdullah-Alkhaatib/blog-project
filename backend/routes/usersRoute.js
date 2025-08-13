// routes
const express = require("express");

const router = express.Router();

const {getAllUsersCtrl, getUserProfileCtrl, updateUserProfileCtrl, getUsersCountCtrl} = require("../controllers/usersController");
const {verifyTokenAndAdmin, verifyTokenAndUser} = require("../middlewares/verifyToken");
const validateObjectId = require("../middlewares/validateObjectId");

// /api/users/profile
router.get('/profile', verifyTokenAndAdmin, getAllUsersCtrl);

// /api/users/profile/:id
router.get('/profile/:id', validateObjectId, getUserProfileCtrl);

// /api/users/profile/:id
router.put('/profile/:id', validateObjectId, verifyTokenAndUser, updateUserProfileCtrl);

// /api/users/count
router.get('/count', verifyTokenAndAdmin, getUsersCountCtrl);

module.exports = router;