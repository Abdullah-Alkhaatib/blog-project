const express = require("express");

const router = express.Router();
const { sendResetPasswordLinkCtrl, getResetPasswordLinkCtrl, resetPasswordCtrl } = require("../controllers/passwordController");

//  /api/password/reset-password-link
router.post("/reset-password-link", sendResetPasswordLinkCtrl);

//  /api/password/reset-password/:userId/:token
router.get("/reset-password/:userId/:token", getResetPasswordLinkCtrl);
router.post("/reset-password/:userId/:token", resetPasswordCtrl);

module.exports = router;