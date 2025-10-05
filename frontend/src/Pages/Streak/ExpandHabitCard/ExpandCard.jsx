import React, { useEffect, useRef } from "react";
import "./ExpandCard.css";
import StreakUpdate from '../MarkStreakDone/StreakUpdate';
import CircularProgressBar from "./CircularProgressBar";
import CalendarDaily from "@/Components/Calendar/CalendarDaily";
import CalendarWeek from "@/Components/Calendar/CalendarWeek";

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
    <div className="expandHabitCard-overlay fixed inset-0 w-full h-full backdrop-blur-sm flex flex-col justify-center items-center z-[1000] animate-fadeIn">

      {/* Close button */}
      <div
        onClick={() => handleClose_expandHabitCard()}
        className="text-xl cursor-pointer"
      >
        ✖
      </div>

      <div
        ref={expandRef}
        className="expandHabitCard bg-slate-50 dark:bg-gray-900 w-[78vw] h-[97vh] overflow-y-auto grid grid-cols-2 gap-x-[4vw] gap-y-[25px] rounded-lg border border-[#ff416d5e] text-[#db386f] p-[20px_5px_20px_13px] m-4 shadow-lg text-center animate-fadeIn scrollbar-thin scrollbar-thumb-[#e4942332] scrollbar-track-transparent"
      >
        {/* Top details */}
        <div>
          <h2>
            Habit: {streak.HabitName} <span>({streak.Frequency})</span>
          </h2>
          <p>Started: {streak.StartedDate.slice(0, 15)}</p>
          <p>End : {String(new Date(streak.TargetDuration)).slice(0, 15)}</p>
        </div>

        <div>
          <p>🔥 Streak: {streak.StreakRecord.TotalStreak}</p>
          <p>XP Points: +{streak.StreakRecord.XPPoints}</p>
        </div>

        {/* Progress Bar */}
        <div>
          <CircularProgressBar progress={calculateProgress()} />
          {insideArchive ? (
            <button className="StreakUpdate-button" disabled>
              Archived
            </button>
          ) : (
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
          )}
        </div>

        {/* Target Info */}
        <p>
          {streak.Frequency === "Daily"
            ? `Target: ${streak.Total_Target_Time} Days`
            : `Target: ${streak.Total_Target_Time} Weeks`}
          <br />
          {streak.Frequency === "Daily"
            ? `Days Completed ${streak.TotalDaysCompleted} Days`
            : `Weeks Completed ${streak.TotalWeeksCompleted} Weeks`}
          <br />
          {streak.timeLeft}
        </p>

        {/* Calendar Details */}
        <div className="calendar-detail-container col-span-2">
          <hr className="hr-expandCard w-[90%] m-0" />
          <h2 className="mb-[15px]">Streak Tracking Summary</h2>

          <div className="color-identiy flex gap-1 justify-evenly">
            <div id="Categorical-Color" className="flex items-center">
              <div className="color-box1 mr-[9px] w-[15px] h-[15px] rounded bg-[#86612b7d]"></div>
              <p>Selected Habit</p>
            </div>
            <div id="Categorical-Color" className="flex items-center">
              <div className="color-box2 mr-[9px] w-[15px] h-[15px] rounded bg-[seagreen]"></div>
              <p>Marked</p>
            </div>
            <div id="Categorical-Color" className="flex items-center">
              <div className="color-box3 mr-[9px] w-[15px] h-[15px] rounded bg-[#c52f2f]"></div>
              <p>Not marked</p>
            </div>
          </div>

          <div className="calendar-detail col-span-2 mb-[18px] flex justify-start gap-[20px] w-full h-[18em] overflow-y-scroll scrollbar-thin scrollbar-thumb-[rgba(255,255,255,0.2)] hover:scrollbar-thumb-[rgba(255,255,255,0.4)] scrollbar-track-transparent">
            {streak.Frequency === "Daily" ? (
              <CalendarDaily
                startDate={streak.StartedDate}
                endDate={streak.TargetDuration}
                CalendarData={streak.CalendarData}
              />
            ) : (
              <CalendarWeek
                startDate={streak.StartedDate}
                endDate={streak.TargetDuration}
                CalendarData={streak.CalendarData}
              />
            )}
          </div>

          <hr className="hr-expandCard w-[90%] m-0" />
        </div>

        {/* Badge Details */}
        <div className="expandHabitCard-badge-details">
          <h2>Badge Details</h2>
          <h5>Badge Earned: {streak.BadgeRecord.Badge}</h5>
          <h5>XP Points Earn: +{plusPointCalculate(streak.BadgeRecord.Badge)}</h5>
          <h5>Achieved On: {streak.BadgeRecord.AchievedOn.slice(0, 15)}</h5>
        </div>
      </div>
    </div>
  );
}

export default ExpandCard;