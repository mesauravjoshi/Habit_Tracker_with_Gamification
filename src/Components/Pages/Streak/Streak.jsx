import { useEffect, useState } from 'react';
import Nav from '../../Nav/Nav';
import Slider from '../../Slider/Slider';
import './Streak.css'
import './StreakUpdate.css'
import StreakUpdate from './StreakUpdate';

function Streak() {
  const [streakData, setStreakData] = useState({});

  useEffect(() => {
    const getHabit_from_localStorage = localStorage.getItem('Habit Track');
    const habitJSON_data = JSON.parse(getHabit_from_localStorage);

    setStreakData(habitJSON_data);
    localStorage.setItem('Habit Track', JSON.stringify(habitJSON_data));
  }, [])

  const totalStreak = Array.isArray(streakData)
    ? streakData.reduce((acc, habit) => acc + habit.StreakRecord.TotalStreak, 0)
    : 0;

  // Function to Calculate Day Left
  const calculateDayLeft = (TargetDuration) => {
    const today = new Date(); // Get today's date

    const targetDate = new Date(TargetDuration); // Convert TargetDuration to Date

    // Calculate difference in time (in milliseconds)
    const timeDiff = targetDate - today;
    if (timeDiff > 0) {
      // Convert milliseconds to days
      const daysLeft = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
      return daysLeft;
    }
  }

  // Function to Calculate progress dynamically
  const calculateTotal_Days = (TargetDuration, StartedDate) => {
    const targetDay = new Date(TargetDuration) - new Date(StartedDate)
    return ((Math.floor(targetDay / (1000 * 60 * 60 * 24)))); // return days
  }

  

  return (
    <>
      <Slider />
      <Nav />
      <div>
        <h1> Habit list {totalStreak} </h1>
        <div className="Streak">
          {streakData.length > 0 &&
            streakData.map((streak, index) => {

              // Calculate Day left 
              const daysLeft = calculateDayLeft(streak.TargetDuration)

              // Calculate progress dynamically
              const progress = Math.min(
                Math.round((streak.TotalDaysCompleted / calculateTotal_Days(streak.TargetDuration, streak.StartedDate) * 100)),
                100
              ); // Ensure progress never exceeds 100%

              return (
                <div key={index} className="Habit-Card">
                  <h3>{streak.Habit}</h3>
                  <p>🔥 Streak: {streak.StreakRecord.TotalStreak} Days</p>
                  <StreakUpdate
                    setStreakData={setStreakData}
                    LastUpdate={streak.StreakRecord.LastUpdate}
                    index={index}
                    streakData={streakData}
                  />
                  <p>Number of days left: {daysLeft}</p>

                  {/* Progress Bar */}
                  <div
                    className="progress-container"
                    style={{ "--progress": `${progress}%` }}
                  >
                    <div className="progress-bar">{progress}%</div>
                  </div>
                </div>
              );
            })}

        </div>
      </div>
    </>
  )
}

export default Streak
