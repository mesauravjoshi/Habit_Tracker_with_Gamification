import './StreakUpdate.css'

function StreakUpdate({ setStreakData, LastUpdate, index, streakData }) {

  // Function to update the streak when the button is clicked
  const handleMarkAsDone = (index) => {
    // Create a copy of streakData
    const updatedStreakData = [...streakData];

    // Get the current habit
    const habit = updatedStreakData[index];

    // Increase the streak count and update the LastUpdate date
    habit.StreakRecord.TotalStreak += 1;
    habit.StreakRecord.LastUpdate = new Date().toString(); // Update to today's date

    // Set the updated streak data back to state
    setStreakData(updatedStreakData);
    localStorage.setItem('Habit Track', JSON.stringify(streakData));
  };

  // Function to check if the habit has been marked today
  const isMarkedToday = (lastUpdate) => {
    const lastUpdateDate = new Date(lastUpdate);
    const today = new Date();
    // Check if the date matches today's date
    return (
      lastUpdateDate.getDate() === today.getDate() &&
      lastUpdateDate.getMonth() === today.getMonth() &&
      lastUpdateDate.getFullYear() === today.getFullYear()
    );
  };

  return (
    <div style={{ display: 'flex', gap: '13px' }}>
      <button
        className="StreakUpdate-button"
        onClick={() => handleMarkAsDone(index)} // Handle the "Mark as Done" button click
        disabled={isMarkedToday(LastUpdate)} // Disable button if marked today
      >
        ✅ Mark as Done</button>
    </div>
  );
}

export default StreakUpdate;


/*
AI code 

import { useEffect, useState } from 'react';
import './StreakUpdate.css';

function StreakUpdate({ setStreakData, LastUpdate, index, streakData }) {
  const [currentStreak, setCurrentStreak] = useState(streakData[index].StreakRecord.TotalStreak);
  const [totalDaysCompleted, setTotalDaysCompleted] = useState(streakData[index].TotalDaysCompleted);

  useEffect(() => {
    // Ensure that TotalDaysCompleted persists and doesn't reset unnecessarily
    setTotalDaysCompleted(streakData[index].TotalDaysCompleted);
    setCurrentStreak(streakData[index].StreakRecord.TotalStreak);
  }, [index, streakData]);

  // Function to update the streak when the button is clicked
  const handleMarkAsDone = (index) => {
    const updatedStreakData = [...streakData];
    const habit = updatedStreakData[index];

    // Check if today is being marked as done
    const today = new Date().toLocaleDateString();

    // If the streak was already marked today, no changes are made
    if (isMarkedToday(habit.StreakRecord.LastUpdate)) {
      return;
    }

    // If today isn't marked, we can increase TotalDaysCompleted
    habit.TotalDaysCompleted += 1;

    // Check if the habit was missed, and reset the streak if so
    if (isMarkedToday(habit.StreakRecord.LastUpdate)) {
      habit.StreakRecord.TotalStreak += 1;
    } else {
      habit.StreakRecord.TotalStreak = 1; // Reset streak if missed
    }

    habit.StreakRecord.LastUpdate = new Date().toString(); // Update to today's date

    // Set the updated streak data back to state
    setStreakData(updatedStreakData);
    localStorage.setItem('Habit Track', JSON.stringify(updatedStreakData));
  };

  // Function to check if the habit has been marked today
  const isMarkedToday = (lastUpdate) => {
    const lastUpdateDate = new Date(lastUpdate).toLocaleDateString();
    const today = new Date().toLocaleDateString();
    return lastUpdateDate === today;
  };

  return (
    <div style={{ display: 'flex', gap: '13px' }}>
      <button
        className="StreakUpdate-button"
        onClick={() => handleMarkAsDone(index)} // Handle the "Mark as Done" button click
        disabled={isMarkedToday(streakData[index].StreakRecord.LastUpdate)} // Disable button if marked today
      >
        ✅ Mark as Done
      </button>
    </div>
  );
}

export default StreakUpdate;


*/