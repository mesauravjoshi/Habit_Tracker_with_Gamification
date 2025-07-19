import { useEffect, useState, useRef, useContext, useReducer } from 'react';
import './HabitCard.css'
import { DotsIcon, ShareIcon, Archive, Unarchive, Delete, ViewCard } from "../../../assets/Icons/Icons";
import { url } from '../../../URL/Url';
import StreakUpdate from '../Streak/MarkStreakDone/StreakUpdate';
import DeleteConfirmUI from '../Streak/DeleteUI/DeleteConfirmUI';
import ExpandCard from '../Streak/ExpandHabitCard/ExpandCard';
import { AuthContext } from '../../Context/AuthContext';
import { ArchiveContext } from '../../Context/ArchiveContext';

// ✅ Initial State
const initialState = {
  isExpandVisible: false,
  selectedStreakHabitCard: null,
  handleViewOption: false,
  selectedMenuCard: null,
  displayDelUI: false,
  selectedStreakID: null,
};

// ✅ Reducer Function
const reducer = (state, action) => {
  switch (action.type) {
    case "TOGGLE_EXPAND":
      return { ...state, isExpandVisible: action.payload };
    case "SET_SELECTED_HABIT":
      return { ...state, selectedStreakHabitCard: action.payload };
    case "TOGGLE_MENU":
      return {
        ...state,
        handleViewOption: action.payload.viewOption,
        selectedMenuCard: action.payload.menuCard,
      };
    case "SHOW_DELETE_UI":
      return { ...state, displayDelUI: true, selectedStreakID: action.payload };
    case "HIDE_DELETE_UI":
      return { ...state, displayDelUI: false, selectedStreakID: null };
    default:
      return state;
  }
};

function Streak({ habitData, setHabitData, insideArchive, archivedHabit, setArchivedHabit }) {
  const authContext = useContext(AuthContext);
  const [state, dispatch] = useReducer(reducer, initialState);
  const { token } = useContext(AuthContext);
  const { archiveHabits, fetchArchivePData } = useContext(ArchiveContext);
  const menuRef = useRef(null);

  if (!authContext) {
    console.log("AuthContext is not yet available.");
    return null;
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        dispatch({ type: "TOGGLE_MENU", payload: { viewOption: false, menuCard: null } });
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [archiveHabits])

  // ✅ Function to Calculate Day Left
  const calculateDayLeft = (TargetDuration) => {
    const today = new Date();
    const targetDate = new Date(TargetDuration);
    const timeDiff = targetDate - today;
    const daysLeft = Math.floor(timeDiff / (1000 * 60 * 60 * 24)) + 1;

    if (daysLeft > 0) return daysLeft;
    else if (daysLeft === 0) return 0;
    else return "Sucess";
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
    event.stopPropagation();
    dispatch({ type: "SHOW_DELETE_UI", payload: streakID });
  };

  // console.log("is handle view option:", state.handleViewOption);
  const handleSelectHabitCard = (streak, daysLeft, Total_Target_Time) => {
    dispatch({
      type: "SET_SELECTED_HABIT",
      payload: { ...streak, timeLeft: daysLeft, Total_Target_Time }
    });
    dispatch({ type: "TOGGLE_EXPAND", payload: true });
  };

  const handleArchiveHabit = async (streakID) => {
    try {
      const response = await fetch(`${url}/archive/addToArchive/${streakID}`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      });
      const data = await response.json();
      console.log(data.data.habitId);
      const archivedHabitId = data.data.habitId;
      const filterArchived = habitData.filter(item => (item._id != archivedHabitId));
      setHabitData(filterArchived);
      fetchArchivePData();
    } catch (error) {
      console.error('Error save archive habit:', error);
    }
  }

  const handleUnarchive = async (habitId) => {
    try {
      const response = await fetch(`${url}/archive/unarchive/${habitId}`, {
        method: 'DELETE',
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      });
      const data = await response.json();
      setArchivedHabit(archivedHabit.filter((habit) => habit._id !== habitId));
      fetchArchivePData();
    } catch (error) {
      console.error('Error deleting habits:', error);
    }
  }

  return (
    <>
      {state.isExpandVisible &&
        <ExpandCard streak={state.selectedStreakHabitCard}
          setHabitData={setHabitData}
          setIsExpandVisible={() => dispatch({ type: "TOGGLE_EXPAND", payload: false })}
          calculateTotalDays={calculateTotalDays}  // for calculating
          calculateTotalWeeks={calculateTotalWeeks} // for calculating
          insideArchive={insideArchive}
        />
      }
      {
        state.displayDelUI &&
        <DeleteConfirmUI
          setDisplayDelUI={() => dispatch({ type: "HIDE_DELETE_UI" })}
          streakID={state.selectedStreakID}
          habitData={habitData}
          setHabitData={setHabitData} />
      }
      <div className="Streak">
        {
          habitData &&
          habitData.map((streak, index) => {
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
              <div className="HabitCard-Container" key={streak.HabitName}>
                <div onClick={() => handleSelectHabitCard(streak, daysLeft, Total_Target_Time)} className="Habit-Card">
                  {/* 1. habit name  */}
                  <h3>{streak.HabitName} ({streak.Frequency}) {streak.BadgeRecord.Badge} </h3>

                  {/* 2 .🔥 Streak */}
                  <p>{streakUI}</p>

                  {/* 3. Options [dot and share icon]  */}
                  <div className='HabitCard-options'>
                    {state.selectedMenuCard === streak._id && state.handleViewOption  && (
                      <div ref={menuRef} className="Options-details">
                        {/* <div>
                        </div> */}
                        <div onClick={(event) => handleDelete(event, streak._id)} className='delete-icon'>
                          <Delete />
                          <p>Delete</p>
                        </div>
                        <div onClick={(event) => {
                          event.stopPropagation();
                          { insideArchive ? handleUnarchive(streak._id) : handleArchiveHabit(streak._id) }
                          // setHandleViewOption(false);
                        }} className='delete-icon'>
                          {
                            insideArchive ?
                              <>
                                <Unarchive />
                                <p>Unarchive</p>
                              </> :
                              <>
                                <Archive />
                                <p>Archive</p>
                              </>
                          }
                        </div>
                        <div onClick={() => dispatch({ type: "TOGGLE_EXPAND", payload: true })} className='delete-icon'>
                          <ViewCard />
                          <p>View</p>
                        </div>
                      </div>
                    )}
                    <div onClick={(event) => { event.stopPropagation(); dispatch({ type: "TOGGLE_MENU", payload: { viewOption: true, menuCard: streak._id } }); }} className='three-dot-elips'>
                      <DotsIcon />
                    </div>
                    <div onClick={(event) => { event.stopPropagation(); }} className='share-arrow'>
                      <ShareIcon />
                    </div>
                  </div>

                  {/* 4. Streak update Button  */}
                  <div style={{ display: 'flex' }}>
                    {
                      insideArchive ? <button className='StreakUpdate-button' disabled={true}>Archived</button> :
                        <StreakUpdate
                          setHabitData={setHabitData}
                          Frequency={streak.Frequency}
                          LastDayForWeek={streak.StreakRecord.LastDayForWeek}
                          LastUpdate={streak.StreakRecord.LastUpdate}
                          TargetDuration={streak.TargetDuration}
                          StartedDate={streak.StartedDate}
                          index={index}
                          habitData={habitData}
                        />
                    }
                  </div>

                  {/* 5. No of days left */}
                  <p>{daysLeft}</p>

                  {/* 6. Progress Bar */}
                  <div className='progress-outer'>
                    <div className="progress-container" style={{ "--progress": `${progress}%` }}>
                      <div className="progress-bar"></div>
                    </div>
                    <p> {progress}%</p>
                  </div>

                  {/* 7. completed days/weeks  */}
                  <div className="TotalDaysCompleted">
                    {DayWeeksCompeted}
                  </div>
                </div>
              </div>
            );
          })
        }
      </div>
    </>
  )
}

export default Streak;