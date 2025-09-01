const mongoose = require("mongoose");
const Joi = require("joi");

// Category schema
const categorySchema = new mongoose.Schema({
    user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
    title: {
        type: String,
        required: true,
        trim: true
    }
}, {
    timestamps: true,
});

// Category Model
const Category = mongoose.model("Category", categorySchema);

// Validate create category
function validateCreateCategory(data) {
    const schema = Joi.object({
        title: Joi.string().trim().required().label("Title"),
    });
    return schema.validate(data);
}

module.exports = {
    Category,
    validateCreateCategory
};