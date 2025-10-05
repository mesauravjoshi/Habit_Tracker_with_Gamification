import { useEffect, useState, useContext } from 'react';
import HabitCard from '../HabitCard/HabitCard';
import { url } from '@/URL/Url';
import { AuthContext } from "@/Context/AuthContext";
import TotalStreakAndXP from '../TotalStreak&XP/TotalStreak&XP';
import BlankHabitCard from '../HabitCard/BlankHabitCard';
// import HabitCardSkeleton from '../HabitCard/HabitCardSkeleton'; // Import skeleton loader

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
        const response = await fetch(`${url}/habit/habits`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}` // Include JWT token
          }
        });

        const data = await response.json();
        setCompletedHabit(data.filter(item => item.IsCompleted === true)); // Update state with fetched data
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
        <TotalStreakAndXP heading={'Completed Habits'}/>
      {user ? (
        loading ? (
          <BlankHabitCard/>
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
