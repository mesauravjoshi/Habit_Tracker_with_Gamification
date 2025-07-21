const express = require('express');
const router = express.Router();
const User = require('../models/user'); // Use lowercase 'user'
const {jwtAuthMiddleware } = require('../jwt');

router.get('/profile', jwtAuthMiddleware, async (req, res) => {
    console.log('gettting profile');

    try {
        const user = await User.findById(req.user.id).select("-password"); 
        console.log('working');
        
        if (!user) return res.status(404).json({ message: "User not found" });
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;