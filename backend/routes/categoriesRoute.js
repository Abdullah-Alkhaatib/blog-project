const express = require("express");
const router = express.Router();

const {verifyTokenAndAdmin} = require("../middlewares/verifyToken");
const validateObjectId = require("../middlewares/validateObjectId");
const {createCategoryCtrl, getAllCategoriesCtrl, deleteCategoryCtrl} = require("../controllers/categoriesController");

//   /api/categories
router.post("/", verifyTokenAndAdmin, createCategoryCtrl);

//  /api/categories
router.get("/", getAllCategoriesCtrl);

//  /api/categories/:id
router.delete("/:id", validateObjectId, verifyTokenAndAdmin, deleteCategoryCtrl);

module.exports = router;