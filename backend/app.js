const express = require('express');
const connectToDB = require("./config/connectToDB");
const xxs = require("xss-clean"); // في backend, npm install xss-clean
const {errorHandler, notFound} = require("./middlewares/error");
const cors = require("cors");
require("dotenv").config(); // Load environment variables from .env file

// Connection to DB
connectToDB();

// Init App
const app = express();

// Middleware
app.use(express.json()); // // لتحويل بيانات JSON القادمة في الطلب إلى كائنات JavaScript داخل req.body
// app.use(express.urlencoded({ extended: true }));

// حماية ضد هجمات XSS (فوق الراوتس لازم)
// Prevent XSS (cross site scripting) Attacks
app.use(xxs());


// Cors policy
app.use(cors({
    origin: "http://localhost:3000", // Replace with your frontend URL
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true // بتسمح بإرسال الكوكيز مع الطلبات
}));

// Routes
const authRoute = require("./routes/authRoute");
const usersRoute = require("./routes/usersRoute");
const postsRoute = require("./routes/postsRoute");
const commentsRoute = require("./routes/commentsRoute");
const categoriesRoute = require("./routes/categoriesRoute");
const passwordRoute = require("./routes/passwordRoute");

app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/posts", postsRoute);
app.use("/api/comments", commentsRoute);
app.use("/api/categories", categoriesRoute);
app.use("/api/password", passwordRoute);


// Error handler middleware
app.use(notFound);
app.use(errorHandler);

// Running the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server is running in port ${PORT}`);
})