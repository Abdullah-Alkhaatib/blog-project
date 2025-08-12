const express = require('express');
const connectToDB = require("./config/connectToDB");
require("dotenv").config(); // Load environment variables from .env file

// Connection to DB
connectToDB();

// Init App
const app = express();

// Middleware
app.use(express.json()); // // لتحويل بيانات JSON القادمة في الطلب إلى كائنات JavaScript داخل req.body

// Running the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server is running in port ${PORT}`);
})