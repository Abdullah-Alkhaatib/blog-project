const express = require('express');
const connectToDB = require("./config/connectToDB");
require("dotenv").config(); // Load environment variables from .env file

// Connection to DB
connectToDB();

// Init App
const app = express();

// Middleware
app.use(express.json()); // // لتحويل بيانات JSON القادمة في الطلب إلى كائنات JavaScript داخل req.body
// app.use(express.urlencoded({ extended: true }));

// Routes
const authRoute = require("./routes/authRoute");
const usersRoute = require("./routes/usersRoute");
const postsRoute = require("./routes/postsRoute");
app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/posts", postsRoute);

// Running the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server is running in port ${PORT}`);
})