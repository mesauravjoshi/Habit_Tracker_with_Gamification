import { useEffect, useState, useRef, useContext } from 'react';
import HabitCard from '../HabitCard/HabitCard';
import BlankHabitCard from '../HabitCard/BlankHabitCard';
import { url } from '../../../URL/Url';
import './Streak.css';
import { AuthContext } from '../../Context/AuthContext';
import { ArchiveContext } from '../../Context/ArchiveContext';
import { StreaXPContext } from '../../Context/Strea&XPContext';
import TotalStreakAndXP from '../TotalStreak&XP/TotalStreak&XP';
import Filter from './Filter';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'

function Streak() {
  const authContext = useContext(AuthContext);
  const { totalStreaXP } = useContext(StreaXPContext);
  const { user, setUser, token, setToken } = useContext(AuthContext);
  const { archiveHabits } = useContext(ArchiveContext);
  const [habitData, setHabitData] = useState([]);
  const [updatedStreakData, setUpdatedStreakData] = useState([]);
  const [selectedFrequencies, setSelectedFrequencies] = useState([]);
  const [selectedBadges, setSelectedBadges] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState([]);

  const [loading, setLoading] = useState(true);

  const [handleViewOption, setHandleViewOption] = useState(false);
  const [selectedMenuCard, setSelectedMenuCard] = useState(null);

  const [showFilter, setShowFilter] = useState(false);

  const menuRef = useRef(null);

  if (!authContext) {
    console.log("AuthContext is not yet available.");
    return null;
  }

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

        if (data.error) {
          if (data.error.name === 'TokenExpiredError') {
            console.log("Token has expired. Logging out...");
            localStorage.removeItem("habit token");
            setUser(null);
            setToken("");
            setLoading(false);
            return;
          }
          console.log("Error from API:", data.error);
          setLoading(false);
          return;
        }

        if (!Array.isArray(data)) {
          console.log("Unexpected response format", data);
          setLoading(false);
          return;
        }

        const edit = data.filter(habit => !archiveHabits.includes(habit._id));

        setHabitData(edit.reverse());
        setUpdatedStreakData(edit);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching habits:', error);
        setLoading(false);
      }
    };

    fetchHabits();

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
  }, [user, archiveHabits, totalStreaXP]);

  return (
    <>
      <div className='strek-container'>
        <div className='Habit-list'>
          <button
            onClick={() => setShowFilter(prev => !prev)}
            className="flex items-center gap-2 px-3 py-2 font-semibold rounded-full cursor-pointer border-1 
            border-gray-900 dark:border-amber-400 dark:border-red-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="currentColor"
              className="transition-transform duration-300 group-hover:rotate-180"
            >
              <path d="M400-240v-80h160v80H400ZM240-440v-80h480v80H240ZM120-640v-80h720v80H120Z" />
            </svg>
            Filters
          </button>


          <TotalStreakAndXP heading={'Habit list'} />
        </div>

        {
          showFilter &&
          <Filter showFilter={showFilter} setShowFilter={setShowFilter} setHabitData={setHabitData} updatedStreakData={updatedStreakData}
            selectedFrequencies={selectedFrequencies}
            setSelectedFrequencies={setSelectedFrequencies}
            selectedBadges={selectedBadges}
            setSelectedBadges={setSelectedBadges}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory} />
        }

        {
          loading ?
            <BlankHabitCard />
            : user ?
              <div>
                {
                  habitData.length > 0 ?
                    < HabitCard
                      habitData={habitData}
                      setHabitData={setHabitData}
                    /> : <h2>No habit added yet ...</h2>
                }
              </div>
              : <p> Please login .........</p>
        }
      </div>
    </>
  );
}

export default Streak;
