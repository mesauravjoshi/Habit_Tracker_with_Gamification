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
    const data = req.body;
    console.log(data);

    try {
        // Check if the frequency is Daily or Weekly and handle accordingly
        let newHabitData = {
            Habit: data.Habit,
            Category: data.Category,
            Frequency: data.Frequency,
            Priority: data.Priority,
            TargetDuration: new Date(data.TargetDuration),
            StartedDate: new Date(data.StartedDate),
            StreakRecord: {
                LastUpdate: data.StreakRecord.LastUpdate || null,
                TotalStreak: data.StreakRecord.TotalStreak || 0,
                LastDayForWeek: data.Frequency === 'Weekly' ? new Date(data.StreakRecord.LastDayForWeek) : null,
            },
            IsCompleted: false,
            TotalDaysCompleted: data.Frequency === 'Daily' ? 0 : null,
            TotalWeeksCompleted: data.Frequency === 'Weekly' ? 0 : null,
        };

        // Create the habit and save it
        const newHabit = new Habit(newHabitData);
        await newHabit.save();
        console.log('Habit saved successfully:', newHabit);

        res.send({ message: 'Habit saved successfully', data: newHabit });
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

const PORT = process.env.PORT || 3000;
console.log(PORT);

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});