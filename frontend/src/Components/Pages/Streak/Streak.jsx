import { useEffect, useState } from 'react';
import { url } from '../../../URL/Url';
import './Streak.css'
import StreakUpdate from './StreakUpdate';
import DeleteConfirmUI from './DeleteConfirmUI';
import ExpandCard from './ExpandCard';

function Streak() {
  const [streakData, setStreakData] = useState([]);
  const [updatedStreakData, setUpdatedStreakData] = useState([]);
  const [habitListCategory, setHabitListCategory] = useState('');

  const [isExpandVisible, setIsExpandVisible] = useState(false);
  const [selectedStreakHabitCard, setSelectedStreakHabitCard] = useState([]);

  const [displayDelUI, setDisplayDelUI] = useState(false);
  const [selectedStreakID, setSelectedStreakID] = useState(null);

  useEffect(() => {
    const fetchHabits = async () => {
      try {
        const response = await fetch(`${url}/habits`);
        if (!response.ok) {
          throw new Error('Failed to fetch habits');
        }
        const data = await response.json();
        // console.log(data);
        setStreakData(data.reverse());
        setUpdatedStreakData(data);
      } catch (error) {
        console.error('Error fetching habits:', error);
      }
    };
    fetchHabits();
  }, [])

  const handleHabitListCategory = (val) => {
    setHabitListCategory(val);
    const copy_inside = [...updatedStreakData];

    if (val === "Not Completed") {
      setStreakData(copy_inside.filter(habit => (habit.IsCompleted == false)));
    } else if (val === "Daily") {
      setStreakData(copy_inside.filter(habit => (habit.Frequency == 'Daily')));
    } else if (val === "Weekly") {
      setStreakData(copy_inside.filter(habit => (habit.Frequency == "Weekly")));
    } else if (val === "Silver Badge") {
      setStreakData(copy_inside.filter(habit => (habit.BadgeRecord.Badge == "🥈 Silver Badge")));
    } else if (val === "Gold Badge") {
      setStreakData(copy_inside.filter(habit => (habit.BadgeRecord.Badge == "🏆 Gold Badge")));
    } else {
      setStreakData(copy_inside);
    }
  }

  const totalStreak = Array.isArray(updatedStreakData)
    ? updatedStreakData.reduce((acc, habit) => acc + habit.StreakRecord.TotalStreak, 0)
    : 0;

  const xPPoints = Array.isArray(updatedStreakData)
    ? updatedStreakData.reduce((acc, habit) => acc + habit.StreakRecord.XPPoints, 0)
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

    return totalDays;
  }

  // ✅ Function to Calculate Weeks Left
  const calculateWeekLeft = (TargetDuration) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const targetDate = new Date(TargetDuration);
    targetDate.setHours(0, 0, 0, 0);
    const timeDiff = targetDate - today;
    // console.log(today);
    // console.log(targetDate);

    const daysLeft = Math.floor(timeDiff / (1000 * 60 * 60 * 24)) + 1;
    // console.log(Math.floor(daysLeft/7) +1);
    // console.log(daysLeft);
    if (daysLeft > 0) return (Math.floor(daysLeft / 7));
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
    return Math.ceil(totalDays / 7);
  }

  const handleDelete = (streakID) => {
    setSelectedStreakID(String(streakID));
    setDisplayDelUI(true);
  };

  const handleSelectHabitCard = (streakID, daysLeft, Total_Target_Time) => {
    const seleted = {
      ...streakID,
      timeLeft: daysLeft,
      Total_Target_Time: Total_Target_Time,
    }
    // console.log('selected habit',seleted);
    setSelectedStreakHabitCard(seleted);
    setIsExpandVisible(true);
  };

  return (
    <>
      {isExpandVisible &&
        <ExpandCard streak={selectedStreakHabitCard} setIsExpandVisible={setIsExpandVisible} />
      }
      {
        displayDelUI &&
        <DeleteConfirmUI
          setDisplayDelUI={setDisplayDelUI}
          streakID={selectedStreakID}
          setStreakData={setStreakData}
          streakData={streakData} />
      }
      <div className='strek-container'>
        <div className='Habit-list'>
          <h1> Habit list  </h1>
          <div className="filter-habit">
            <select
              onChange={(e) => handleHabitListCategory(e.target.value)}
              value={habitListCategory}
            >
              <option >All</option>
              <option value="Not Completed">Not Completed</option>
              <option value="Daily">Daily</option>
              <option value="Weekly">Weekly</option>
              <option value="Silver Badge">Silver Badge</option>
              <option value="Gold Badge">Gold Badge</option>
            </select>
          </div>
          <div className='display-streak-XPPoints'>
            <h3 >🔥Total Streak: {totalStreak}</h3>
            <h3 >🎯 XP Points: {xPPoints} </h3>
          </div>
        </div>

        <div className="Streak">
          {streakData.length > 0 &&
            streakData.map((streak, index) => {
              let daysLeft_cal = 0;
              let progress = 0;
              let daysLeft = '';
              let streakUI = '';
              let DayWeeksCompeted = 0;
              const Total_Target_Time = calculateTotalDays(streak.TargetDuration, streak.StartedDate);
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
                daysLeft = `No of Weeks left: ${daysLeft_cal}`;
                streakUI = `🔥 Streak: ${streak.StreakRecord.TotalStreak} Weeks`;
                progress = Math.min(
                  Math.round((streak.TotalWeeksCompleted / calculateTotalWeeks(streak.TargetDuration, streak.StartedDate)) * 100),
                  100
                );

                DayWeeksCompeted = `Total Weeks Completed: ${streak.TotalWeeksCompleted}`;
              }

              return (
                <div className="HabitCard-Container" key={streak._id}>
                  <div onClick={() => handleSelectHabitCard(streak, daysLeft, Total_Target_Time)} className="Habit-Card">
                    <h3>{streak.HabitName} ({streak.Frequency}) {streak.BadgeRecord.Badge} </h3>
                    <p>{streakUI}</p>
                    <StreakUpdate
                      setStreakData={setStreakData}
                      Frequency={streak.Frequency}
                      LastDayForWeek={streak.StreakRecord.LastDayForWeek}
                      LastUpdate={streak.StreakRecord.LastUpdate}
                      TargetDuration={streak.TargetDuration}
                      StartedDate={streak.StartedDate}
                      index={index}
                      streakData={streakData}
                    />
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
                  {/* <div className="habitCard-options">
                    <svg onClick={() => handleDelete(streak._id)} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#dc8a18"><path d="M200-120v-600h-40v-80h200v-40h240v40h200v80h-40v600H200Zm80-80h400v-520H280v520Zm80-80h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" /></svg>
                  </div> */}
                </div>
              );
            })}
        </div>
      </div>
    </>
  )
}

export default Streak;
