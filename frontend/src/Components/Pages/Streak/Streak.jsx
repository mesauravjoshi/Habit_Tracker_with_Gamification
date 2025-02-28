import { useEffect, useState, useRef, useContext } from 'react';
import HabitCard from '../HabitCard/HabitCard'
import { url } from '../../../URL/Url';
import './Streak.css'
import { AuthContext } from '../../Context/AuthContext';
import { ArchiveContext } from '../../Context/ArchiveContext';

function Streak() {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    console.log("AuthContext is not yet available.");
    return null; // or return a loading indicator
  }

  const { user, token } = useContext(AuthContext); // Access user from context
  const { archiveHabits, fetchArchivePData } = useContext(ArchiveContext);
  const [streakData, setStreakData] = useState([]);
  const [updatedStreakData, setUpdatedStreakData] = useState([]);
  const [habitListCategory, setHabitListCategory] = useState('');

  const [handleViewOption, setHandleViewOption] = useState(false);
  const [selectedMenuCard, setSelectedMenuCard] = useState(null);

  const menuRef = useRef(null); // Reference for the menu
  if (!authContext) {
    console.log("AuthContext is not yet available.");
    return null; // or return a loading indicator
  }

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
        const edit = data.filter(habit => !archiveHabits.includes(habit._id));

        setStreakData(edit.reverse());
        // console.log(streakData);
        setUpdatedStreakData(edit);
      } catch (error) {
        console.error('Error fetching habits:', error);
      }
    };
    fetchHabits();
    const handleClickOutside = (event) => {

      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setHandleViewOption(false);
        setSelectedMenuCard(null);
        // console.log('handleClickOutside');
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [user, archiveHabits])

  const handleHabitListCategory = (val) => {
    setHabitListCategory(val);
    const copy_inside = [...updatedStreakData];

    if (val === "Not Completed") {
      setStreakData(copy_inside.filter(habit => (habit.IsCompleted == false)));
    } else if (val === "Daily") {
      setStreakData(copy_inside.filter(habit => (habit.Frequency == 'Daily')));
    } else if (val === "Weekly") {
      setStreakData(copy_inside.filter(habit => (habit.Frequency == "Weekly")));
    } else if (val === "Silver Badge") {
      setStreakData(copy_inside.filter(habit => (habit.BadgeRecord.Badge == "🥈 Silver Badge")));
    } else if (val === "Gold Badge") {
      setStreakData(copy_inside.filter(habit => (habit.BadgeRecord.Badge == "🏆 Gold Badge")));
    } else {
      setStreakData(copy_inside);
    }
  }

  const totalStreak = Array.isArray(updatedStreakData)
    ? updatedStreakData.reduce((acc, habit) => acc + habit.StreakRecord.TotalStreak, 0)
    : 0;

  const xPPoints = Array.isArray(updatedStreakData)
    ? updatedStreakData.reduce((acc, habit) => acc + habit.StreakRecord.XPPoints, 0)
    : 0;

  return (
    <>
      <div className='strek-container'>
        <div className='Habit-list'>
          <h1> Habit list  </h1>
          <div className="filter-habit">
            <select
              onChange={(e) => handleHabitListCategory(e.target.value)}
              value={habitListCategory}
            >
              <option >All</option>
              <option value="Not Completed">Not Completed</option>
              <option value="Daily">Daily</option>
              <option value="Weekly">Weekly</option>
              <option value="Silver Badge">Silver Badge</option>
              <option value="Gold Badge">Gold Badge</option>
            </select>
          </div>
          <div className='display-streak-XPPoints'>
            <h3 >🔥Total Streak: {totalStreak}</h3>
            <h3 >🎯 XP Points: {xPPoints} </h3>
          </div>
        </div>
        {
          streakData.length > 0 &&
          < HabitCard
            streakData={streakData}
            setStreakData={setStreakData}
          />
        }
      </div>
    </>
  )
}

export default Streak;
