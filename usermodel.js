const mongoose = require('mongoose');

// Connect to MongoDB with proper options and error handling
mongoose.connect('mongodb://localhost:27017/crud', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("MongoDB connected successfully");
}).catch(err => {
    console.error("MongoDB connection error:", err);
});

// Define the schema correctly
const userSchema = new mongoose.Schema({  // Fixed incorrect function
    name: String,
    email: String
});

// Export the user model
module.exports = mongoose.model("User", userSchema);
