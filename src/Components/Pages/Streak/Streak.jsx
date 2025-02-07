import { useEffect, useState } from 'react';
import Nav from '../../Nav/Nav';
import Slider from '../../Slider/Slider';
import './Streak.css'
import './StreakUpdate.css'
import StreakUpdate from './StreakUpdate';

function Streak() {
  const [streakData, setStreakData] = useState({});
  console.log(streakData.length);
  
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
    // today.setHours(0, 0, 0, 0);

    const targetDate = new Date(TargetDuration); // Convert TargetDuration to Date
    // targetDate.setHours(0, 0, 0, 0);

    // Calculate difference in time (in milliseconds)
    const timeDiff = targetDate - today;
    const daysLeft = Math.floor(timeDiff / (1000 * 60 * 60 * 24)) +1;

    if (daysLeft > 0) {
      // const daysLeft = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
      return (daysLeft);
    }
    else if (daysLeft === 0) {
      return 0;
    } 
    else{
      // console.log('ram');
      return "Completed";
    }
  }

  // Function to Calculate progress dynamically
  const calculateTotal_Days = (TargetDuration, StartedDate) => {

    // Set both dates to midnight (00:00:00) to count full days
    const startDateMidnight = new Date(StartedDate);
    startDateMidnight.setHours(0, 0, 0, 0);

    const targetDateMidnight = new Date(TargetDuration);
    targetDateMidnight.setHours(0, 0, 0, 0);

    // Subtract the two dates to get the difference in milliseconds
    const targetDay = targetDateMidnight - startDateMidnight;

    // Calculate the difference in full days
    const totalDays = Math.floor(targetDay / (1000 * 60 * 60 * 24)) + 1; // Adding 1 to include both start and end day

    // console.log("Total Days Difference: " + totalDays);
    return totalDays;
  }



  return (
    <>
      <Slider />
      <Nav />
      <div>
        <h1> Habit list {totalStreak} </h1>
        <div className="Streak">
          {streakData && streakData.length > 0 &&
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
                    TargetDuration={streak.TargetDuration}
                    index={index}
                    streakData={streakData}
                  />
                  <p>Number of days left: {daysLeft}</p>

                  {/* Progress Bar */}
                  <div style={{display: 'flex'}}>
                  <div
                    className="progress-container"
                    style={{ "--progress": `${progress}%` }}
                  >
                    <div className="progress-bar"></div>
                  </div> <p> {progress}%</p>
                  </div>
                  <div className="TotalDaysCompleted">
                    Total Days Completed: {streak.TotalDaysCompleted}
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
