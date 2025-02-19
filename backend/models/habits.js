const mongoose = require('mongoose');

const habitSchema = new mongoose.Schema({
    HabitName: { type: String, required: true },
    Category: { type: String, required: true },
    Frequency: { type: String, enum: ["Daily", "Weekly"], required: true },
    Priority: { type: String, required: true },
    TargetDuration: { type: String, required: true },
    StartedDate: { type: String, required: true },
    IsCompleted: { type: Boolean, default: false },
    
    // Streak tracking for Daily & Weekly
    StreakRecord: {
        LastUpdate: { type: String, default: "" },
        TotalStreak: { type: Number, default: 0 },
        LastDayForWeek: { type: String },  // Only for Weekly habits
        XPPoints: { type: Number, default: 0 },
    },
    BadgeRecord: {
        AchievedOn: { type: String, default: "" },
        Badge: { type: String, default: "" },
        StreakDuration: { type: Number, default: 0 },
    },

    // Dynamic fields based on Frequency
    TotalDaysCompleted: { type: Number },  // For Daily habits
    TotalWeeksCompleted: { type: Number }, // For Weekly habits
});

const Habit = mongoose.model('Habit', habitSchema);
module.exports = Habit;