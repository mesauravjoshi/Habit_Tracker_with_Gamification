import { useEffect, useState, useRef } from 'react';
import { url } from '../../../URL/Url';
import './Streak.css'
import StreakUpdate from './StreakUpdate';
import DeleteConfirmUI from './DeleteConfirmUI';
import ExpandCard from './ExpandCard';
import MaterialIcon from './MaterialIcon ';

function Streak() {
  const [streakData, setStreakData] = useState([]);
  const [updatedStreakData, setUpdatedStreakData] = useState([]);
  const [habitListCategory, setHabitListCategory] = useState('');

  const [isExpandVisible, setIsExpandVisible] = useState(false);
  const [selectedStreakHabitCard, setSelectedStreakHabitCard] = useState([]);

  const [handleViewOption, setHandleViewOption] = useState(false);
  const [selectedMenuCard, setSelectedMenuCard] = useState(null);

  const [displayDelUI, setDisplayDelUI] = useState(false);
  const [selectedStreakID, setSelectedStreakID] = useState(null);

  const menuRef = useRef(null); // Reference for the menu

  useEffect(() => {
    
    const fetchHabits = async () => {
      const token = localStorage.getItem('habit token');
      try {
        const response = await fetch(`${url}/habit/habits`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}` // Include JWT token
          }
        }); 
        const data = await response.json();
        // console.log(data);
        setStreakData(data.reverse());
        setUpdatedStreakData(data);
      } catch (error) {
        console.error('Error fetching habits:', error);
      }
    };
    fetchHabits();
    const handleClickOutside = (event) => {

      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setHandleViewOption(false);
        setSelectedMenuCard(null);
        console.log('handleClickOutside');
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
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

  const handleDelete = (event, streakID) => {
    event.stopPropagation(); // Prevents event from bubbling up
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
    // setHandleViewOption(false);
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
                    <div className='HabitCard-options'>
                      {selectedMenuCard === streak._id && handleViewOption && (
                        <div ref={menuRef} className="Options-details">
                          <div>
                          </div>
                          <div onClick={(event) => handleDelete(event, streak._id)} className='delete-icon'>
                            <MaterialIcon name="delete" />
                            <p>Delete</p>
                          </div>
                          <div onClick={(event) => {
                            event.stopPropagation();
                            setHandleViewOption(false);
                          }} className='delete-icon'>
                            <MaterialIcon name="archive" />

                            <p>Archive</p>
                          </div>
                          <div onClick={() => setIsExpandVisible(true)} className='delete-icon'>
                            <MaterialIcon name="visibility" />
                            <p>View</p>
                          </div>
                        </div>
                      )}
                      <div onClick={(event) => {
                        event.stopPropagation();
                        setSelectedMenuCard(selectedMenuCard === streak._id ? null : streak._id);
                        setHandleViewOption(true);
                      }} className='three-dot-elips'>
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#db386f"><path d="M480-160q-33 0-56.5-23.5T400-240q0-33 23.5-56.5T480-320q33 0 56.5 23.5T560-240q0 33-23.5 56.5T480-160Zm0-240q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Zm0-240q-33 0-56.5-23.5T400-720q0-33 23.5-56.5T480-800q33 0 56.5 23.5T560-720q0 33-23.5 56.5T480-640Z" /></svg>
                      </div>
                      <div onClick={(event) => { event.stopPropagation(); }} className='share-arrow'>
                        <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#db386f"><path d="M680-80q-50 0-85-35t-35-85q0-6 3-28L282-392q-16 15-37 23.5t-45 8.5q-50 0-85-35t-35-85q0-50 35-85t85-35q24 0 45 8.5t37 23.5l281-164q-2-7-2.5-13.5T560-760q0-50 35-85t85-35q50 0 85 35t35 85q0 50-35 85t-85 35q-24 0-45-8.5T598-672L317-508q2 7 2.5 13.5t.5 14.5q0 8-.5 14.5T317-452l281 164q16-15 37-23.5t45-8.5q50 0 85 35t35 85q0 50-35 85t-85 35Zm0-80q17 0 28.5-11.5T720-200q0-17-11.5-28.5T680-240q-17 0-28.5 11.5T640-200q0 17 11.5 28.5T680-160ZM200-440q17 0 28.5-11.5T240-480q0-17-11.5-28.5T200-520q-17 0-28.5 11.5T160-480q0 17 11.5 28.5T200-440Zm480-280q17 0 28.5-11.5T720-760q0-17-11.5-28.5T680-800q-17 0-28.5 11.5T640-760q0 17 11.5 28.5T680-720Zm0 520ZM200-480Zm480-280Z" /></svg>
                      </div>
                    </div>
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
                </div>
              );
            })}
        </div>
      </div>
    </>
  )
}

export default Streak;
