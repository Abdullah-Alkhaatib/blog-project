const asyncHandler = require("express-async-handler");
const {Category, validateCreateCategory} = require("../models/CategoryModel");



/**--------------------------------------------
 * @desc    Create new category
 * @route   /api/categories
 * @method  POST
 * @access  private (only admin)
 ---------------------------------------------*/
const createCategoryCtrl = asyncHandler(async (req, res) => {
    const {error} = validateCreateCategory(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }

    const category = await Category.create({
        title: req.body.title,
        user: req.user.id, // Assuming req.user is set by an authentication middleware
    });

    res.status(201).json(category);
});


/**--------------------------------------------
 * @desc    Get all categories
 * @route   /api/categories
 * @method  GET
 * @access  public
 ---------------------------------------------*/
const getAllCategoriesCtrl = asyncHandler(async (req, res) => {
    //fffff //\\backend\\controllers\\categoriesController.js:34:5\n
    const categories = await Category.find();
    res.status(200).json(categories);
});


/**--------------------------------------------
 * @desc    Delete category
 * @route   /api/categories/:id
 * @method  DELETE
 * @access  private (only admin)
 ---------------------------------------------*/
const deleteCategoryCtrl = asyncHandler(async (req, res) => {
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) {
        return res.status(404).json({ message: "Category not found" });
    }

    await Category.findByIdAndDelete(req.params.id); // Delete the category

    res.status(200).json({message: "Category has been deleted successfully", categoryId: category._id});
});

module.exports = {
    createCategoryCtrl,
    getAllCategoriesCtrl,
    deleteCategoryCtrl
};