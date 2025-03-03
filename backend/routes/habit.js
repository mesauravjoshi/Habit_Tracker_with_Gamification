const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Habit = require('../models/habits');
const Archive = require('../models/archive');
const { jwtAuthMiddleware } = require('../jwt');

router.post('/add_habit', jwtAuthMiddleware, async (req, res) => {
    try {
        const { HabitName, Category, Frequency, Priority, TargetDuration, StartedDate, StreakRecord } = req.body;
        const userId = req.user.id; // Get user ID from JWT middleware

        if (!userId) {
            return res.status(401).json({ error: "Unauthorized: User ID not found" });
        }
        let newHabit = {
            userId,
            HabitName,
            Category,
            Frequency,
            Priority,
            TargetDuration,
            StartedDate,
            StreakRecord: {
                Badge: "",
                LastUpdate: "",
                TotalStreak: 0,
                XPPoints: 0
            },
            IsCompleted: false,
        };

        // Add extra fields based on Frequency
        if (Frequency === 'Daily') {
            newHabit.TotalDaysCompleted = 0;
        } else if (Frequency === 'Weekly') {
            newHabit.StreakRecord.LastDayForWeek = StreakRecord.LastDayForWeek;
            newHabit.TotalWeeksCompleted = 0;
        } else {
            return res.status(400).json({ error: "Invalid Frequency" });
        }

        // const habit = new Habit(newHabit);
        const habit = new Habit(newHabit);
        await habit.save();

        res.json({ message: "Habit saved successfully", data: habit });
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Failed to save habit' });
    }
});

router.get('/habits', jwtAuthMiddleware, async (req, res) => {
    const userId = req.user.id; // Extract user ID from JWT
    // console.log('User ID line 58:', userId);
    try {
        const habits = await Habit.find({ 'userId': userId }); // Fetch habits for this user
        res.json(habits);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to fetch habits" });
    }
});

router.put('/markAsDone/:id', jwtAuthMiddleware, async (req, res) => {
    const { id } = req.params; // Extract habit ID from URL
    const updatedFields = req.body; // Extract fields to update
    // console.log(id);
    // console.log(updatedFields);

    try {
        const updatedHabit = await Habit.findByIdAndUpdate(
            id,  // The habit ID to update
            { $set: updatedFields }, // Update only specified fields
            { new: true } // Return the updated document
        );

        if (!updatedHabit) {
            return res.status(404).json({ error: 'Habit not found' });
        }

        res.json({ message: 'Habit updated successfully', data: updatedHabit });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to update habit' });
    }
});

router.delete('/habitDelete/:id', jwtAuthMiddleware, async (req, res) => {
    const { id } = req.params; // Extract habit ID from URL

    try {
        const deletedHabit = await Habit.findByIdAndDelete(id);
        if (!deletedHabit) {
            return res.status(404).json({ error: 'Habit not found' });
        }

        const deletedHabitfromAr = await Archive.findOneAndDelete({ habitId: id });

        // Send a response only once
        const message = deletedHabitfromAr
            ? 'Habit deleted successfully from both'
            : 'Habit deleted successfully';

        return res.json({ message, data: deletedHabit });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to delete habit' });
    }
});

router.get('/totalStreaXP', jwtAuthMiddleware, async (req, res) => {

    const userId = req.user.id; // Extract user ID from JWT
    // console.log('User ID line 58:', userId);
    try {
        const totalStreaXP = await Habit.find({ 'userId': userId }); // Fetch habits for this user

        if (totalStreaXP.length > 0) {
            const totalStreak = Array.isArray(totalStreaXP)
                ? totalStreaXP.reduce((acc, habit) => acc + habit.StreakRecord.TotalStreak, 0)
                : 0;

            const totalxPPoints = Array.isArray(totalStreaXP)
                ? totalStreaXP.reduce((acc, habit) => acc + habit.StreakRecord.XPPoints, 0)
                : 0;

            res.json({ totalStreaAndXP: { totalStreak, totalxPPoints } });
        }
        const totalStreak = 0;
        const totalxPPoints = 0;
        res.json({ totalStreaAndXP: { totalStreak, totalxPPoints } });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to fetch habits" });
    }
});

module.exports = router;