// routes
const express = require("express");

const router = express.Router();

const {registerUserCtrl} = require("../controllers/authController");

//  /api/auth/register
router.post("/register", registerUserCtrl);

module.exports = router;