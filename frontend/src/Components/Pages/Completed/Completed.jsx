import { useEffect, useState } from 'react';
// import './Streak.css'

function Completed() {
  const [streakData, setStreakData] = useState([]);

  useEffect(() => {
    const fetchHabits = async () => {
      try {
        const response = await fetch('http://localhost:3000/habits');
        if (!response.ok) {
          throw new Error('Failed to fetch habits');
        }
        const data = await response.json();
        setStreakData(data.filter(item => (item.IsCompleted == false))); // Update state with fetched data
      } catch (error) {
        console.error('Error fetching habits:', error);
      }
    };
    fetchHabits();
  }, [])

  const totalStreak = Array.isArray(streakData)
    ? streakData.reduce((acc, habit) => acc + habit.StreakRecord.TotalStreak, 0)
    : 0;

  // ✅ Function to Calculate Day Left
  const calculateDayLeft = (TargetDuration) => {
    const today = new Date();
    const targetDate = new Date(TargetDuration);
    const timeDiff = targetDate - today;
    const daysLeft = Math.floor(timeDiff / (1000 * 60 * 60 * 24)) + 1;

    if (daysLeft > 0) return daysLeft;
    else if (daysLeft === 0) return 0;
    else return "Completed";
  }

  // ✅ Function to Calculate Total Days for Progress
  const calculateTotalDays = (TargetDuration, StartedDate) => {
    const startDateMidnight = new Date(StartedDate);
    startDateMidnight.setHours(0, 0, 0, 0);

    const targetDateMidnight = new Date(TargetDuration);
    targetDateMidnight.setHours(0, 0, 0, 0);

    const totalDays = Math.floor((targetDateMidnight - startDateMidnight) / (1000 * 60 * 60 * 24)) + 1;
    // console.log('line 42: ',totalDays);

    return totalDays;
  }

  // ✅ Function to Calculate Weeks Left
  const calculateWeekLeft = (TargetDuration) => {
    const today = new Date();
    const targetDate = new Date(TargetDuration);
    const timeDiff = targetDate - today;
    const daysLeft = Math.floor(timeDiff / (1000 * 60 * 60 * 24)) + 1;

    // console.log(Math.floor(daysLeft/7) +1);
    // console.log(daysLeft);
    
    if (daysLeft > 0) return (Math.floor(daysLeft / 7) + 1);
    else if (daysLeft === 0) return 0;
    else return "Completed";
  }

  // ✅ Function to Calculate Total Days for Progress
  const calculateTotalWeeks = (TargetDuration, StartedDate) => {
    const startDateMidnight = new Date(StartedDate);
    startDateMidnight.setHours(0, 0, 0, 0);

    const targetDateMidnight = new Date(TargetDuration);
    targetDateMidnight.setHours(0, 0, 0, 0);

    const totalDays = Math.floor((targetDateMidnight - startDateMidnight) / (1000 * 60 * 60 * 24)) + 1;
    // console.log('line 71: ',Math.ceil(totalDays/7));
    return Math.ceil(totalDays / 7);
  }

  return (
    <>
      <div>
        <div className='Habit-list'>
          <h1> Completed Habits  </h1>
        </div>
        <div className="Streak">
          {streakData.length > 0 &&
            streakData.map((streak, index) => {
              let daysLeft_cal = 0;
              let progress = 0;
              let daysLeft = '';
              let streakUI = '';
              let DayWeeksCompeted = 0;

              if (streak.Frequency === 'Daily') {
                daysLeft_cal = calculateDayLeft(streak.TargetDuration);
                daysLeft = `No of days left: ${daysLeft_cal}`
                streakUI = `🔥 Streak: ${streak.StreakRecord.TotalStreak} Days`
                progress = Math.min(
                  Math.round((streak.TotalDaysCompleted / calculateTotalDays(streak.TargetDuration, streak.StartedDate)) * 100),
                  100
                );
                DayWeeksCompeted = `Total Days Completed: ${streak.TotalDaysCompleted}`;
              } else if (streak.Frequency === "Weekly") {
                daysLeft_cal = calculateWeekLeft(streak.TargetDuration);
                daysLeft = `No of Weeks: ${daysLeft_cal}`;
                streakUI = `🔥 Streak: ${streak.StreakRecord.TotalStreak} Weeks`;
                progress = Math.min(
                  Math.round((streak.TotalWeeksCompleted / calculateTotalWeeks(streak.TargetDuration, streak.StartedDate)) * 100),
                  100
                );
                // console.log(progress);

                DayWeeksCompeted = `Total Weeks Completed: ${streak.TotalWeeksCompleted}`;
              }

              return (
                <div key={index} className="Habit-Card">
                  <h3>{streak.HabitName}</h3>
                  <p>{streakUI}</p>

                  <p>{daysLeft}</p>

                  {/* Progress Bar */}
                  <div className='progress-outer'>
                    <div className="progress-container" style={{ "--progress": `${progress}%` }}>
                      <div className="progress-bar"></div>
                    </div>
                    <p> {progress}%</p>
                  </div>
                  <div className="TotalDaysCompleted">
                    {DayWeeksCompeted}
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </>
  )
}

export default Completed;
