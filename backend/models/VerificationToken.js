const mongoose = require("mongoose");

// Verification token schema
const verificationTokenSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    token: {
        type: String,
        required: true
    },
    createdAt: {
    type: Date,
    default: Date.now,
    expires: 3600 // بعد ساعة بينمسح تلقائي
  }
});

// Verification token modal
const VerificationToken = mongoose.model("VerificationToken", verificationTokenSchema);

module.exports = VerificationToken;
