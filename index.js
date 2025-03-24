const express = require('express');
const app = express();

const userModel = require("./usermodel"); // Import model correctly

app.get('/', (req, res) => {
    res.send("hey");
});

// Create a user
app.get('/create', async (req, res) => {  
    try {
        let createdUser = await userModel.create({
            name: "Muneeb",
            email: "graphicmx911@gmail.com"
        });
        res.send(createdUser);
    } catch (error) {
        res.status(500).send({ error: "Error creating user", details: error.message });
    }
});

// Update a user
app.get('/update', async (req, res) => {
    try {
        let updatedUser = await userModel.findOneAndUpdate(
            { name: "Muneeb" }, 
            { name: "Muneeb Ahmad" }, 
            { new: true } // Ensures it returns the updated document
        );
        
        if (!updatedUser) {
            return res.status(404).send({ error: "User not found" });
        }

        res.send(updatedUser);
    } catch (error) {
        res.status(500).send({ error: "Error updating user", details: error.message });
    }
});

// Read user by name
app.get('/read', async (req, res) => {
    try {
        let user = await userModel.findOne({ name: "Muneeb" });
        
        if (!user) {  // Fixed the check for null user
            return res.status(404).send({ message: "User not found" });
        }
        
        res.send(user);
    } catch (error) {
        res.status(500).send({ error: "Error retrieving user", details: error.message });
    }
});

// Use a dynamic port or fallback to 4000
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
