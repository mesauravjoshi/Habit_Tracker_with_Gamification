const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user'); // Use lowercase 'user'

router.post('/signup', async (req, res) => {
    try {
        const { name, username, password } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash the password before saving (recommended for security)
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log(hashedPassword);

        // Save user data to MongoDB
        const newUser = new User({
            name,
            username,
            password: hashedPassword
        });
        console.log(newUser);
        await newUser.save();

        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {        
        res.status(500).json({ error: error });
    }
});

// Login Route
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        // Find user by username
        const user = await User.findOne({ username });
        if (!user) return res.status(400).json({ message: "Invalid credentials" });

        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

        // Generate JWT Token
        const token = jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET, { expiresIn: "72h" });

        res.json({ message: "Login successful", token });

    } catch (error) {
        res.status(500).json({ error: error });
    }
});

module.exports = router;