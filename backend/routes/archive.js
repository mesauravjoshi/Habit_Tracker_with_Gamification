const express = require('express');
const router = express.Router();
const Archive = require('../models/archive'); 
const {jwtAuthMiddleware } = require('../jwt');

router.post('/addToArchive/:habitId', jwtAuthMiddleware, async (req, res) => {
    try {
        const { habitId } = req.params;
        if (!habitId) return res.status(400).json({ message: "habitId is required" });

        console.log('Habit received:', habitId);

        // Check if habit ID is already archived
        const isAlreadyArchived = await Archive.findOne({ 'habitId': habitId });
        if (isAlreadyArchived) {
            return res.status(400).json({ message: 'Habit already archived' });
        }
        // Archive the habit
        const habit = new Archive({ habitId });
        await habit.save();

        res.json({ message: "Habit archived successfully", data: habit });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to archive habit' });
    }
});


router.get('/archive',jwtAuthMiddleware, async (req, res) => {
    console.log('calling');

    try {
        const {habitId} = req.body;
        let newHabit = {
            habitId,
        };
        // const habit = new Habit(newHabit);
        const habit = new Archive(newHabit);
        await habit.save();

        res.json({ message: "Habit Archived successfully", data: habit });
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Failed to save habit' });
    }
});

module.exports = router;