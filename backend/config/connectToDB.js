const mongoose = require('mongoose');

module.exports = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Connected to MongoDB ^_^")
    } catch (error) {
        console.log("Connection failed to mongoDB!", error);
    }
}