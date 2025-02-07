import { useEffect, useState } from 'react'
import './StreakUpdate.css'

function StreakUpdate({ setStreakData, LastUpdate, TargetDuration, index, streakData }) {
  
  const handleMarkAsDone = (index) => {
    // Create a copy of streakData
    const updatedStreakData = [...streakData];
    // Get the current habit
    const habit = updatedStreakData[index];

    const today = new Date();

    const last_date = new Date(habit.StreakRecord.LastUpdate);

    // Calculate difference in time (in milliseconds)
    const timeDiff = today - last_date;
    const timeDiff_inDays = (Math.floor(timeDiff / (1000 * 60 * 60 * 24)));

    if (timeDiff_inDays > 1) {
      // reset streak to 1 and update the LastUpdate date
      habit.StreakRecord.TotalStreak = 1;
      habit.StreakRecord.LastUpdate = new Date().toString(); // Update to today's date
      // console.log(updatedStreakData);
      setStreakData(updatedStreakData);

      // localStorage.setItem('Habit Track', JSON.stringify(streakData));
    } else {
      // Increase the streak count and update the LastUpdate date
      habit.StreakRecord.TotalStreak += 1;
      habit.StreakRecord.LastUpdate = new Date().toString(); // Update to today's date

      // Set the updated streak data back to state
      setStreakData(updatedStreakData);
      // localStorage.setItem('Habit Track', JSON.stringify(streakData));
    }

    const start_date = new Date(habit.StartedDate);
    const totalMilliseconds = today - start_date;

    // Convert milliseconds to days (1000ms * 60s * 60m * 24h)
    const totalDays = Math.floor(totalMilliseconds / (1000 * 60 * 60 * 24));
    // const update_TotalDaysCompleteds = 
    habit.TotalDaysCompleted = (totalDays + 1)
    setStreakData(updatedStreakData);
    console.log('Data after clicking button: ', streakData);

    localStorage.setItem('Habit Track', JSON.stringify(streakData));

  };

  // Function to check if the habit has been marked today
  const isMarkedToday = (lastUpdate) => {
    const lastUpdateDate = new Date(lastUpdate);
    const today = new Date();
    // console.log(lastUpdateDate.getDate() === today.getDate());

    const target_day = new Date(TargetDuration);
    const after_day_completed = today - target_day;
    const daysPassed = Math.floor(after_day_completed / (1000 * 60 * 60 * 24));
    // Check if days Passed from TargetDuration to today then return false & make button disable
    if (daysPassed >= 1) {
      console.log(daysPassed);
      return true
    }

    // Check if the date matches today's date
    return (
      // isDayLeft &&
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