const express = require('express');
const router = express.Router();
const Archive = require('../models/archive');
const { jwtAuthMiddleware } = require('../jwt');

router.post('/addToArchive/:habitId', jwtAuthMiddleware, async (req, res) => {
    try {
        const userId = req.user.id; // Get user ID from JWT middleware
        console.log('user id: ', userId);

        const { habitId } = req.params;
        if (!habitId) return res.status(400).json({ message: "habitId is required" });

        // console.log('Habit received:', habitId);

        // Check if habit ID is already archived
        const isAlreadyArchived = await Archive.findOne({ 'habitId': habitId });
        if (isAlreadyArchived) {
            return res.status(400).json({ message: 'Habit already archived' });
        }
        // Archive the habit
        const habit = new Archive({
            habitId,
            userId
        });
        await habit.save();

        res.json({ message: "Habit archived successfully", data: habit });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to archive habit' });
    }
});

router.get('/archive', jwtAuthMiddleware, async (req, res) => {
    // console.log('calling');
    const userId = req.user.id; // Extract user ID from JWT

    try {
        const habits = await Archive.find({ 'userId': userId }); // Fetch habits for this user
        res.json(habits);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to archive habit' });
    }
});

router.delete('/unarchive/:habitId', jwtAuthMiddleware, async (req, res) => {
    
    const { habitId } = req.params; // Extract habit ID from URL
    // console.log('unarchiving habit.......: ', habitId);
    try {
        const deletedHabit = await Archive.findOneAndDelete({ habitId: habitId });

        if (!deletedHabit) {
            return res.status(404).json({ error: 'Habit ID not found' });
        }

        res.json({ message: 'Habit unarchived successfully', habitId: deletedHabit.habitId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to unarchive habit' });
    }
});

module.exports = router;