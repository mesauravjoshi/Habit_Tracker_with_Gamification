import { useEffect, useState, useContext } from 'react';
import HabitCard from '../../Components/HabitCard/HabitCard';
import { AuthContext } from "@/Context/AuthContext";
import TotalStreakAndXP from '@/Components/TotalStreak&XP/TotalStreak&XP';
import BlankHabitCard from '../../Components/HabitCard/BlankHabitCard';
import axiosInstance from "@/api/axiosInstance";

function Completed() {
  const { user, token } = useContext(AuthContext); // Access user from context
  const [completedHabit, setCompletedHabit] = useState([]);
  const [loading, setLoading] = useState(true);

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
        setCompletedHabit(data.filter(item => item.IsCompleted === true));
      } catch (error) {
        console.error('Error fetching habits:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchHabits();
  }, [user]);

  return (
    // <div className='Complete-streak' style={{ overflowY: 'auto' }}>
    <div className='Complete-streak'>
      {/* <div className='Habit-list'>
        <h1>Completed Habits</h1>
      </div> */}
      <TotalStreakAndXP heading={'Completed Habits'} />
      {user ? (
        loading ? (
          <BlankHabitCard />
        ) : (completedHabit.length > 0 ? (
          <HabitCard habitData={completedHabit} setHabitData={setCompletedHabit} />
        ) : (
          <h2>No habit Completed yet...</h2>
        )
        )
      ) : (
        <h2>Please login first</h2>
      )}
    </div>
  );
}

export default Completed;
