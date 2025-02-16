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
            IsCompleted: false
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

app.post('/markAsDone', async (req, res) => {
    const habitData = req.body;
    // console.log(habitData);
    try {
        // Check if habit._id exists in request body
        if (!habitData._id) {
            return res.status(400).send({ message: 'Habit _id is required' });
        }

        // Find the habit by _id and update its fields
        const updatedHabit = await Habit.findByIdAndUpdate(
            habitData._id,
            {
                $set: {
                    'StreakRecord.LastUpdate': habitData.StreakRecord.LastUpdate,
                    'StreakRecord.TotalStreak': habitData.StreakRecord.TotalStreak,
                    'StreakRecord.LastDayForWeek': habitData.StreakRecord.LastDayForWeek,
                    'IsCompleted': habitData.IsCompleted,
                    'TotalDaysCompleted': habitData.TotalDaysCompleted,
                    'TargetDuration': habitData.TargetDuration
                }
            },
            { new: true } // Returns the updated document
        );

        if (!updatedHabit) {
            return res.status(404).send({ message: 'Habit not found' });
        }

        // Respond with the updated habit data
        return res.status(200).json(updatedHabit);

    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'Server error' });
    }

})

const PORT = process.env.PORT || 3000;
// console.log(PORT);

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});