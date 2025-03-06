import React, { useEffect, useRef } from "react";
import "./ExpandCard.css";
import StreakUpdate from '../MarkStreakDone/StreakUpdate';
import CircularProgressBar from "./CircularProgressBar";
import Calendar from "../../AddHabit/Calendar";
import CalendarWeek from "../../AddHabit/CalendarWeek";

function ExpandCard({ streak, setHabitData, setIsExpandVisible, calculateTotalDays, calculateTotalWeeks, insideArchive }) {
  const expandRef = useRef(null); // Reference for the menu

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (expandRef.current && !expandRef.current.contains(event.target)) {
        setIsExpandVisible(false);
      }
    };
    // Attach event listener
    document.addEventListener("mousedown", handleClickOutside);
    // Cleanup event listener on unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setIsExpandVisible]);

  const handleClose_expandHabitCard = () => {
    setIsExpandVisible(false)
  }

  const plusPointCalculate = (badgeName) => {
    if (badgeName == '🥈 Silver Badge') {
      return '50'
    } else if (badgeName == '🏆 Gold Badge') {
      return '200'
    } else if (badgeName == '⚜️ Elite Badge') {
      return '500'
    }
  }

  const calculateProgress = () => {
    let progress = 0;
    if (streak.Frequency === 'Daily') {
      progress = Math.min(
        Math.round((streak.TotalDaysCompleted / calculateTotalDays(streak.TargetDuration, streak.StartedDate)) * 100),
        100
      );
      // console.log('Daily progess ; ', progress);
      return progress;
    } else if (streak.Frequency === 'Weekly') {
      progress = Math.min(
        Math.round((streak.TotalWeeksCompleted / calculateTotalWeeks(streak.TargetDuration, streak.StartedDate)) * 100),
        100
      );
      // console.log('Weekly progess ; ', progress);
      return progress;
    }
  }

  return (
    <div className="expandHabitCard-overlay" >

      <div onClick={() => handleClose_expandHabitCard()} className="close-expandHabitCard">
        ✖
      </div>
      <div
        // onClick={(e) => e.stopPropagation()} // Prevent clicks inside from closing
        ref={expandRef}
        className="expandHabitCard">
        {/* <svg xmlns="http://www.w3.org/2000/svg" height="100%" viewBox="0 -960 960 960" width="100%" fill="#9657bd"><path d="M600-160q-134 0-227-93t-93-227q0-133 93-226.5T600-800q133 0 226.5 93.5T920-480q0 134-93.5 227T600-160Zm0-80q100 0 170-70t70-170q0-100-70-170t-170-70q-100 0-170 70t-70 170q0 100 70 170t170 70Zm91-91 57-57-108-108v-144h-80v177l131 132ZM80-600v-80h160v80H80ZM40-440v-80h200v80H40Zm40 160v-80h160v80H80Zm520-200Z" /></svg> */}
        <div className="expandHabitCard-heading">
          <h2>Habit: {streak.HabitName}  <span>({streak.Frequency}) </span> </h2>
          <p> 📅 Started: {streak.StartedDate.slice(0, 15)} </p>
          <p> 📅 End Date: {String(new Date(streak.TargetDuration)).slice(0, 15)} </p>
        </div>
        <div>
          <p>🔥 Streak: {streak.StreakRecord.TotalStreak} </p>
          <p> XP Points: +{streak.StreakRecord.XPPoints} </p>
        </div>

        {/* Progress Bar */}
        <div>
          <CircularProgressBar progress={calculateProgress()} />
          {
            insideArchive ? <button className='StreakUpdate-button' disabled={true}>Archived</button> :
              <StreakUpdate
                setHabitData={setHabitData}
                Frequency={streak.Frequency}
                LastDayForWeek={streak.StreakRecord.LastDayForWeek}
                LastUpdate={streak.StreakRecord.LastUpdate}
                TargetDuration={streak.TargetDuration}
                StartedDate={streak.StartedDate}
                index={0}
                habitData={[streak]}
              />
          }
        </div>

        <p>
          {
            streak.Frequency == "Daily" ?
              `🎯 Target: ${streak.Total_Target_Time} Days` :
              `🎯 Target: ${streak.Total_Target_Time} Weeks`
          }
          <br />
          {
            streak.Frequency == "Daily" ?
              `Days Conpleted ${streak.TotalDaysCompleted} Days` :
              `Weeks Conpleted ${streak.TotalWeeksCompleted} Weeks`
          } <br />
          {streak.timeLeft}
        </p>

        <div className="calendar-detail">
          {
            streak.Frequency == "Daily" ?
              <Calendar startDate={streak.StartedDate} endDate={streak.TargetDuration} CalendarData={streak.CalendarData} />
              :
              <CalendarWeek
              startDate={streak.StartedDate} endDate={streak.TargetDuration}               CalendarData={streak.CalendarData} />
          }
        </div>

        <div className="expandHabitCard-badge-details">
          <h2>Badge Details</h2>
          <h5>Badge Earned: {streak.BadgeRecord.Badge} </h5>
          <h5>XP Points Earn: +{plusPointCalculate(streak.BadgeRecord.Badge)}</h5>
          <h5>Achieved On: {streak.BadgeRecord.AchievedOn.slice(0, 15)} </h5>
        </div>

      </div>
      {/* </div> */}
    </div>
  );
}

export default ExpandCard;