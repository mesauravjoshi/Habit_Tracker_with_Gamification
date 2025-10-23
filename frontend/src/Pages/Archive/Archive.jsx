import { useEffect, useState, useContext } from 'react';
import HabitCard from '@/Components/HabitCard/HabitCard';
import BlankHabitCard from '@/Components/HabitCard/BlankHabitCard';
import { AuthContext } from '@/Context/AuthContext';
import { ArchiveContext } from '@/Context/ArchiveContext';
import TotalStreakAndXP from '@/Components/TotalStreak&XP';
import axiosInstance from "@/api/axiosInstance";
import Filter from '@/Components/FIlter/Filter';
import NoHabit from '@/Components/NoHabit';

function Archive() {
  const { user, token } = useContext(AuthContext);
  const { archiveHabits } = useContext(ArchiveContext);
  const [archivedHabit, setArchivedHabit] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showFilter, setShowFilter] = useState(false);
  const [updatedStreakData, setUpdatedStreakData] = useState([]);

  useEffect(() => {
    const fetchHabits = async () => {
      if (!token || user === null) {
        console.log("No token found, user is not logged in");
        setLoading(false);
        return;
      }
      try {
        const response = await axiosInstance.get("/habit/habits");
        const data = response.data
        const edit = data.filter(habit => archiveHabits.includes(habit._id));
        setArchivedHabit(edit.reverse());
        setUpdatedStreakData(edit);
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
      <TotalStreakAndXP
        heading={'Archived Habits'}
        setShowFilter={setShowFilter}
      />

      {
        showFilter &&
        <Filter
          showFilter={showFilter}
          setShowFilter={setShowFilter}
          setHabitData={setArchivedHabit}
          updatedStreakData={updatedStreakData}
        />
      }

      {
        user ? (
          loading ? (
            <BlankHabitCard />
          ) : archivedHabit.length > 0 ? (
            <HabitCard
              habitData={archivedHabit}
              setHabitData={setArchivedHabit}
              insideArchive={true}
              archivedHabit={archivedHabit}
              setArchivedHabit={setArchivedHabit}
            />
          ) : (
            // <h2>No habit added to Archive yet...</h2>
            <NoHabit title={'No habit added to Archive yet!'} />
          )
        ) : (
          <p>Please login first</p>
        )
      }
    </div>
  );
}

export default Archive;