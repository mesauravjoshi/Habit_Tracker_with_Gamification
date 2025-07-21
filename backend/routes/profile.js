const express = require('express');
const router = express.Router();
const User = require('../models/user'); // Use lowercase 'user'
const { jwtAuthMiddleware } = require('../jwt');

router.get('/profile', jwtAuthMiddleware, async (req, res) => {
    // console.log('working');

    try {
        const user = await User.findById(req.user.id).select("-password");

        if (!user) return res.status(404).json({ message: "User not found" });
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

router.patch('/profile', jwtAuthMiddleware, async (req, res) => {
    console.log('updatinig.......');
    
    try {
        const userId = req.user.id;
        const { name, email } = req.body;

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { name, email },
            { new: true, runValidators: true, select: '-password' }
        );

        if (!updatedUser) return res.status(404).json({ message: 'User not found' });

        res.json(updatedUser);
    } catch (error) {
        console.error('Update error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;