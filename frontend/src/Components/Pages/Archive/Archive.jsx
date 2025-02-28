import React, { useEffect, useState, useContext } from 'react';
import HabitCard from '../HabitCard/HabitCard'
import { url } from '../../../URL/Url';
import { AuthContext } from '../../Context/AuthContext';
import { ArchiveContext } from '../../Context/ArchiveContext';

function Archive() {
  const { user, token } = useContext(AuthContext); // Access user from context
  const { archiveHabits } = useContext(ArchiveContext);
  const [archivedHabit, setArchivedHabit] = useState([]);

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
      } catch (error) {
        console.error('Error fetching habits:', error);
      }
    };
    fetchHabits();
  }, [user, archiveHabits]);

  return (
    <>
      <div className='Badge'>
        {
          user ?
            <>  {
              archivedHabit.length > 0 ?
              <HabitCard
              streakData={archivedHabit}
              setStreakData={setArchivedHabit}
              insideArchive={true}
              archivedHabit={archivedHabit}
              setArchivedHabit={setArchivedHabit}
              />  : <h2>no habit added yet ...</h2>
            }</>
            :
            <p>Please login first </p>
        }
      </div>
    </>
  )
}

export default Archive