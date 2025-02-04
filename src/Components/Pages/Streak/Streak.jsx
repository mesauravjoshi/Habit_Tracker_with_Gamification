import { useEffect, useState } from 'react';
import Nav from '../../Nav/Nav';
import Slider from '../../Slider/Slider';
import './Streak.css'
import './StreakUpdate.css'

function Streak() {
  const [streakData, setStreakData] = useState({});

  useEffect(() => {
    const getHabit_from_localStorage = localStorage.getItem('Habit Track');
    const habitJSON_data = JSON.parse(getHabit_from_localStorage);
    // calculate day left 
    const calculateDayLeft = (TargetDuration) => {
      const today = new Date(); // Get today's date
      // console.log(today);
      
      const targetDate = new Date(TargetDuration); // Convert TargetDuration to Date

      // Calculate difference in time (in milliseconds)
      const timeDiff = targetDate - today;
      if (timeDiff > 0) {
        // Convert milliseconds to days
        const daysLeft = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
        return daysLeft;
      }
    }

    const updatedStreakData = habitJSON_data.map((item, index) => {
      const dayLeft = calculateDayLeft(item.TargetDuration);
      return { ...item, DaysLeft: dayLeft }
    })
    // calculate day left 
    setStreakData(updatedStreakData);
    localStorage.setItem('Habit Track', JSON.stringify(updatedStreakData));
  }, [])

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

  const totalStreak = Array.isArray(streakData)
    ? streakData.reduce((acc, habit) => acc + habit.StreakRecord.TotalStreak, 0)
    : 0;

  return (
    <>
      <Slider />
      <Nav />
      <div>
        <h1> Habit list {totalStreak} </h1>
        <div className="Streak">
          {streakData.length > 0 &&
            streakData.map((streak, index) => (
              <div key={index} className="Habit-Card">
                <h3>{streak.Habit}</h3>
                <p>🔥 Streak: {streak.StreakRecord.TotalStreak} Days</p>
                <div style={{ display: 'flex', gap: '13px' }}>
                  <label className="checkbox-container">
                    <input
                      type="checkbox"
                      defaultChecked={isMarkedToday(streak.StreakRecord.LastUpdate)} // Use defaultChecked instead of checked
                      disabled={isMarkedToday(streak.StreakRecord.LastUpdate)} // Disable checkbox if marked today
                    />
                  </label>
                  <button
                    className="StreakUpdate-button"
                    onClick={() => handleMarkAsDone(index)} // Handle the "Mark as Done" button click
                    disabled={isMarkedToday(streak.StreakRecord.LastUpdate)} // Disable button if marked today
                  >
                    Mark as Done
                  </button>
                </div>
                <p>Number of days left: {streak.DaysLeft}</p>
                <p>Progress: [██████░░░░░░] 60%</p>
              </div>
            ))}
        </div>
      </div>
    </>
  )
}

export default Streak
