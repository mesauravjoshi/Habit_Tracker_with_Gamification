import { useEffect, useState, useContext } from 'react';
import HabitCard from '../HabitCard'
import { url } from '../../../URL/Url';
import { AuthContext } from '../../Context/AuthContext';

function Completed() {
  const { user, token } = useContext(AuthContext); // Access user from context
  const [streakData, setStreakData] = useState([]);

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
        // console.log(data);
        setStreakData(data.filter(item => (item.IsCompleted == true))); // Update state with fetched data
      } catch (error) {
        console.error('Error fetching habits:', error);
      }
    };
    fetchHabits();
  }, [user])

  return (
    <>
      <div className='Complete-streak' style={{ overflowY: 'auto' }}>
        <div className='Habit-list'>
          <h1> Completed Habits  </h1>
        </div>
        {
          user ?
            <HabitCard
            streakData={streakData}
            setStreakData={setStreakData}
            /> :
            <h2>Please login first</h2>
        }
      </div >
    </>
  )
}

export default Completed;
