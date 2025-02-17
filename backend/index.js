const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
// const connectDB = require('./db'); 
const Habit = require('./models/habits');

const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/habit');
    console.log('db connected');
}

// require('dotenv').config();

// connectDB().catch(err => console.log(err)); // Call connectDB function

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.post('/habits', async (req, res) => {

    try {
        const { HabitName, Category, Frequency, Priority, TargetDuration, StartedDate, StreakRecord } = req.body;

        let newHabit = {
            HabitName,
            Category,
            Frequency,
            Priority,
            TargetDuration,
            StartedDate,
            StreakRecord: {
                LastUpdate: "",
                TotalStreak: 0
            },
            IsCompleted: false,
            XPPoints: 0
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

app.get('/habits', async (req, res) => {
    try {
        const habits = await Habit.find(); // Fetch all habits from MongoDB
        res.json(habits);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to fetch habits" });
    }
});

app.put('/markAsDone/:id', async (req, res) => {
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


const PORT = process.env.PORT || 3000;
// console.log(PORT);

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});