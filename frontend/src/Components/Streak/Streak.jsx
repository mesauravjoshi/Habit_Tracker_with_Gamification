import { useEffect, useState, useRef, useContext } from 'react';
import HabitCard from '../../Components/HabitCard/HabitCard';
import BlankHabitCard from '../../Components/HabitCard/BlankHabitCard';
import './Streak.css';
import { AuthContext } from "@/Context/AuthContext";
import { ArchiveContext } from '@/Context/ArchiveContext';
import { StreaXPContext } from '@/Context/Strea&XPContext';
import TotalStreakAndXP from '@/Components/TotalStreak&XP/TotalStreak&XP';
import Filter from '@/Components/Streak/Filter';
import axiosInstance from "@/api/axiosInstance";

function Streak() {
  const authContext = useContext(AuthContext);
  const { totalStreaXP } = useContext(StreaXPContext);
  const { user, setUser, token, setToken } = useContext(AuthContext);
  const { archiveHabits } = useContext(ArchiveContext);
  const [habitData, setHabitData] = useState([]);
  const [updatedStreakData, setUpdatedStreakData] = useState([]);
  // const [selectedFrequencies, setSelectedFrequencies] = useState([]);
  // const [selectedBadges, setSelectedBadges] = useState([]);
  // const [selectedCategory, setSelectedCategory] = useState([]);
  
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
        const response = await axiosInstance.get("/habit/habits");
        // console.log(response.data);
        const data = response.data
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
          <TotalStreakAndXP
            heading={'Habit list'}
            setShowFilter={setShowFilter}
          />
        </div>

        {
          showFilter &&
          <Filter
            showFilter={showFilter}
            setShowFilter={setShowFilter}
            setHabitData={setHabitData}
            updatedStreakData={updatedStreakData}
          // selectedFrequencies={selectedFrequencies}
          // setSelectedFrequencies={setSelectedFrequencies}
          // selectedBadges={selectedBadges}
          // setSelectedBadges={setSelectedBadges}
          // selectedCategory={selectedCategory}
          // setSelectedCategory={setSelectedCategory}
          />
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
