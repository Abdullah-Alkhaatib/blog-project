const mongoose = require("mongoose");

module.exports = (req, res, next) => {
    if(!mongoose.Types.ObjectId.isValid(req.params.id)){ // req.params.id القيمة اللي جايه من اليوزر في الرابط
        return res.status(400).json({message: "Invalid ID"});
    }
    next();
};