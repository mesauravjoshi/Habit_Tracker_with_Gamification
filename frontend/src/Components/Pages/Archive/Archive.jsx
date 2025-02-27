import React, { useEffect, useState, useContext } from 'react';
import { url } from '../../../URL/Url';
import './Archive.css'
import { AuthContext } from '../../Context/AuthContext';
import { ArchiveContext } from '../../Context/ArchiveContext';

function Archive() {
  const { user, token } = useContext(AuthContext); // Access user from context
  const { archiveHabits ,fetchArchivePData } = useContext(ArchiveContext);
  const [archivedHabit, setArchivedHabit] = useState([]);
  const [updatedArchivedHabit, setUpdatedArchivedHabit] = useState([]);

  useEffect(() => {
    const fetchHabits = async () => {
      if (!token || user === null) {
        console.log("No token found, user is not logged in");
        return;
      }
      try {
        const response = await fetch(`${url}/habit/habits`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}` // Include JWT token
          }
        });
        const data = await response.json();
        const edit = data.filter(habit => archiveHabits.includes(habit._id));
        setArchivedHabit(edit.reverse());
        setUpdatedArchivedHabit(edit);
      } catch (error) {
        console.error('Error fetching habits:', error);
      }
    };
    fetchHabits();
  }, [user, archiveHabits]);

  const handleUnarchive = async (habitId) => {
    console.log(habitId);
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
      console.log(data.habitId);
    } catch (error) {
      console.error('Error deleting habits:', error);
    }
  }

  return (
    <>
      <div className='Badge'>
        <center>
          <h2>Badge</h2>
        </center>
        {
          user ?
            <>
              <h2>Archived habit</h2>
              {
                archivedHabit.map((habit) => {
                  return (
                    <div className="HabitCard-Container" key={habit._id}>
                      <div onClick={() => handleSelectHabitCard(streak, daysLeft, Total_Target_Time)} className="Habit-Card">
                        <h3>{habit.HabitName} ({habit.Frequency}) {habit.BadgeRecord.Badge} </h3>
                        <p>{'🔥 Streak'}</p>
                        <div className='HabitCard-options'>
                          {/* {selectedMenuCard === habit._id && handleViewOption && (
                            <div ref={menuRef} className="Options-details">
                              <div>
                              </div>
                              <div onClick={(event) => handleDelete(event, habit._id)} className='delete-icon'>
                                <MaterialIcon name="delete" />
                                <p>Delete</p>
                              </div>
                              <div onClick={(event) => {
                                event.stopPropagation();
                                handleArchiveHabit(habit._id,habit.HabitName);
                                // setHandleViewOption(false);
                              }} className='delete-icon'>
                                <MaterialIcon name="archive" />
                                <p>Archive</p>
                              </div>
                              <div onClick={() => setIsExpandVisible(true)} className='delete-icon'>
                                <MaterialIcon name="visibility" />
                                <p>View</p>
                              </div>
                            </div>
                          )} */}
                          <div onClick={(event) => {
                            event.stopPropagation();
                            // setSelectedMenuCard(selectedMenuCard === habit._id ? null : habit._id);
                            // setHandleViewOption(true);
                          }} className='three-dot-elips'>
                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#db386f"><path d="M480-160q-33 0-56.5-23.5T400-240q0-33 23.5-56.5T480-320q33 0 56.5 23.5T560-240q0 33-23.5 56.5T480-160Zm0-240q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Zm0-240q-33 0-56.5-23.5T400-720q0-33 23.5-56.5T480-800q33 0 56.5 23.5T560-720q0 33-23.5 56.5T480-640Z" /></svg>
                          </div>
                          <div onClick={(event) => { 
                            handleUnarchive(habit._id);
                            event.stopPropagation(); }} className='share-arrow'>
                          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#db386f"><path d="M480-552.5 337.89-410.38l39.42 39.23 74.81-74.81v177.69h55.96v-177.69l74.8 74.81 39.23-39.23L480-552.5Zm-275.96-89.73v425.88q0 5.39 3.46 8.85t8.85 3.46h527.3q5.39 0 8.85-3.46t3.46-8.85v-425.88H204.04Zm17.81 494.15q-29.43 0-51.6-22.02t-22.17-50.94v-453.88q0-11.48 3.96-22.51 3.96-11.03 11.38-20.26l55.32-68.77q9.38-12.31 23.18-18.88 13.81-6.58 30-6.58h415.39q16.19 0 30.19 6.53t23.54 18.97l55.73 69.5q7.23 9.23 11.19 20.45 3.96 11.22 3.96 22.7v452.62q0 29.23-22.26 51.15-22.26 21.92-51.26 21.92H221.85Zm-2.5-550.11h521.42l-43.62-53.54q-1.92-1.92-4.42-3.08-2.5-1.15-5.19-1.15H271.99q-2.69 0-5.19 1.15-2.5 1.16-4.42 3.08l-43.03 53.54ZM480-423.23Z"/></svg>
                          </div>
                        </div>
                        {/* <StreakUpdate
                          setStreakData={setStreakData}
                          Frequency={habit.Frequency}
                          LastDayForWeek={habit.StreakRecord.LastDayForWeek}
                          LastUpdate={habit.StreakRecord.LastUpdate}
                          TargetDuration={habit.TargetDuration}
                          StartedDate={habit.StartedDate}
                          index={index}
                          streakData={streakData}
                        /> */}
                        <p>{'daysLeft'}</p>

                        {/* Progress Bar */}
                        <div className='progress-outer'>
                          <div className="progress-container"
                          // style={{ "--progress": `${progress}%` }}
                          >
                            <div className="progress-bar"></div>
                          </div>
                          <p> {'progress'}%</p>
                        </div>
                        <div className="TotalDaysCompleted">
                          {'DayWeeksCompeted'}
                        </div>
                      </div>
                    </div>
                  );
                })
              }
            </>
            :
            <p>Please login first </p>
        }
      </div>
    </>
  )
}

export default Archive