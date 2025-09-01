require("dotenv").config();
const sendEmail = require("./utils/sendEmail");

(async () => {
  try {
    await sendEmail(
      "abdullahalkhatib64@gmail.com", // اكتب ايميلك هون عشان يوصلك التست
      "Test Email",
      "<h1>✅Email is working!</h1>"
    );
    console.log("Sending email succeeded 🎉");
  } catch (err) {
    console.error("Sending email failed:", err);
  }
})();
