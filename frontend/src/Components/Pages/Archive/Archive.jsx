import React, { useEffect, useState, useContext } from 'react';
import HabitCard from '../HabitCard/HabitCard';
import BlankHabitCard from '../HabitCard/BlankHabitCard';
import { url } from '../../../URL/Url';
import { AuthContext } from '../../Context/AuthContext';
import { ArchiveContext } from '../../Context/ArchiveContext';
import TotalStreakAndXP from '../TotalStreak&XP/TotalStreak&XP';

function Archive() {
  const { user, token } = useContext(AuthContext);
  const { archiveHabits } = useContext(ArchiveContext);
  const [archivedHabit, setArchivedHabit] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHabits = async () => {
      if (!token || user === null) {
        console.log("No token found, user is not logged in");
        setLoading(false);
        return;
      }
      try {
        const response = await fetch(`${url}/habit/habits`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          }
        });
        const data = await response.json();
        const edit = data.filter(habit => archiveHabits.includes(habit._id));
        setArchivedHabit(edit.reverse());
      } catch (error) {
        console.error('Error fetching habits:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchHabits();
  }, [user, archiveHabits, token]);

  return (
    <div className='Badge'>
      <div className='Habit-list'>
        <h1> Archived Habits </h1>
        <TotalStreakAndXP />
      </div>
      {
        user ? (
          loading ? (
            <BlankHabitCard/>
          ) : archivedHabit.length > 0 ? (
            <HabitCard
              habitData={archivedHabit}
              setHabitData={setArchivedHabit}
              insideArchive={true}
              archivedHabit={archivedHabit}
              setArchivedHabit={setArchivedHabit}
            />
          ) : (
            <h2>No habit added to Archive yet...</h2>
          )
        ) : (
          <p>Please login first</p>
        )
      }
    </div>
  );
}

export default Archive;
