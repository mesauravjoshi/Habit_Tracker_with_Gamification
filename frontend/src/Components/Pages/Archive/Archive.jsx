import React, { useEffect, useState, useContext } from 'react';
import HabitCard from '../HabitCard/HabitCard'
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
      <div className='Badge'>
        {
          user ?
            <>
              <HabitCard
              streakData={archivedHabit}
              setStreakData={setArchivedHabit}
              insideArchive={true}
              archivedHabit={archivedHabit}
              setArchivedHabit={setArchivedHabit}
              />
            </>
            :
            <p>Please login first </p>
        }
      </div>
    </>
  )
}

export default Archive