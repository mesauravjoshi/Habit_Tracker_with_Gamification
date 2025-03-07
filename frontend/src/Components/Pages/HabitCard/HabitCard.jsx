import { useEffect, useState, useRef, useContext } from 'react';
import './HabitCard.css'
import { DotsIcon, ShareIcon, Archive, Unarchive, Delete, ViewCard } from "../../../assets/Icons/Icons";
import { url } from '../../../URL/Url';
import StreakUpdate from '../Streak/MarkStreakDone/StreakUpdate';
import DeleteConfirmUI from '../Streak/DeleteUI/DeleteConfirmUI';
import ExpandCard from '../Streak/ExpandHabitCard/ExpandCard';
import { AuthContext } from '../../Context/AuthContext';
import { ArchiveContext } from '../../Context/ArchiveContext';
import Calendar from '../AddHabit/Calendar';

function Streak({ habitData, setHabitData, insideArchive, archivedHabit, setArchivedHabit }) {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    console.log("AuthContext is not yet available.");
    return null; // or return a loading indicator
  }

  const { token } = useContext(AuthContext);
  const { archiveHabits, fetchArchivePData } = useContext(ArchiveContext);

  const [isExpandVisible, setIsExpandVisible] = useState(false);
  const [selectedStreakHabitCard, setSelectedStreakHabitCard] = useState([]);

  const [handleViewOption, setHandleViewOption] = useState(false);
  const [selectedMenuCard, setSelectedMenuCard] = useState(null);

  const [displayDelUI, setDisplayDelUI] = useState(false);
  const [selectedStreakID, setSelectedStreakID] = useState(null);

  const menuRef = useRef(null); 
  if (!authContext) {
    console.log("AuthContext is not yet available.");
    return null; 
  }
  useEffect(() => {
    const handleClickOutside = (event) => {

      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setHandleViewOption(false);
        setSelectedMenuCard(null);
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
      // console.log(data.data.habitId);
      const archivedHabitId = data.data.habitId;
      const filterArchived = habitData.filter(item => (item._id != archivedHabitId));
      setHabitData(filterArchived);
      fetchArchivePData();
    } catch (error) {
      console.error('Error deleting habits:', error);
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
      {isExpandVisible &&
        <ExpandCard streak={selectedStreakHabitCard}
          setHabitData={setHabitData}
          setIsExpandVisible={setIsExpandVisible}
          calculateTotalDays={calculateTotalDays}  // for calculating
          calculateTotalWeeks={calculateTotalWeeks} // for calculating
          insideArchive={insideArchive}
        />
      }
      {
        displayDelUI &&
        <DeleteConfirmUI
          setDisplayDelUI={setDisplayDelUI}
          streakID={selectedStreakID}
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
                    {selectedMenuCard === streak._id && handleViewOption && (
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
                        <div onClick={() => setIsExpandVisible(true)} className='delete-icon'>
                          <ViewCard />
                          <p>View</p>
                        </div>
                      </div>
                    )}
                    <div onClick={(event) => {
                      event.stopPropagation();
                      setSelectedMenuCard(selectedMenuCard === streak._id ? null : streak._id);
                      setHandleViewOption(true);
                    }} className='three-dot-elips'>
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
        {/* <Calendar startDate={habitData[0].StartedDate} endDate={habitData[0].TargetDuration} CalendarData={habitData[0].CalendarData} /> */}
      </div>
    </>
  )
}

export default Streak;
