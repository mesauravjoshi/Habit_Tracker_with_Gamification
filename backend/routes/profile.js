const express = require('express');
const router = express.Router();
const User = require('../models/user'); // Use lowercase 'user'
const { jwtAuthMiddleware } = require('../jwt');
const bcrypt = require('bcryptjs');
const checkPassword = require('../Utils/ComparePassword');

router.get('/profile', jwtAuthMiddleware, async (req, res) => {

    try {
        const user = await User.findById(req.user.id).select("-password");

        if (!user) return res.status(404).json({ message: "User not found" });
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

router.patch('/profile', jwtAuthMiddleware, async (req, res) => {

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

router.patch('/chnagePassword', jwtAuthMiddleware, async (req, res) => {

    try {
        const userId = req.user.id;
        const { currentPassword, newPassword, confirmPassword } = req.body;
        console.log(currentPassword);
        console.log(newPassword);
        console.log(confirmPassword);

        if (!currentPassword || !newPassword || !confirmPassword) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        if (newPassword !== confirmPassword) {
            return res.status(400).json({ message: 'New passwords do not match' });
        }

        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: 'User not found' });

        const isMatch = await checkPassword(currentPassword, user.password);

        if (!isMatch) {
            console.log('isMatch', isMatch);
            return res.status(404).json({ message: 'Incorrect Password' });
        }

        const hashedNewPassword = await bcrypt.hash(newPassword, 10);

        user.password = hashedNewPassword;
        await user.save();

        res.json({ message: 'Password chnaged successfully! ' });
    } catch (error) {
        console.error('Update error:', error);
        res.status(500).json({ message: 'Server error' });
    }

});

module.exports = router;