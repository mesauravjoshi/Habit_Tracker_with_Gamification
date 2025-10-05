import { useEffect, useState, useContext } from 'react';
import HabitCard from '../HabitCard/HabitCard';
import BlankHabitCard from '../HabitCard/BlankHabitCard';
import { url } from '../../../URL/Url';
import { AuthContext } from '../../../Context/AuthContext';
import { ArchiveContext } from '../../../Context/ArchiveContext';
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
      {/* <div className='Habit-list'> */}
      {/* <h1> Archived Habits </h1> */}
      {/* </div> */}
      <TotalStreakAndXP heading={'Archived Habits'} />

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


const NoAArchive = () => {
  return (
    <div className="text-center">
      <p className="text-base font-semibold text-indigo-600">404</p>
      <h1 className="mt-4 text-5xl font-semibold tracking-tight text-balance text-gray-900 sm:text-7xl">
        Page not found
      </h1>
      <p className="mt-6 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8">
        Sorry, we couldn’t find the page you’re looking for.
      </p>
      <div className="mt-10 flex items-center justify-center gap-x-6">
        <a
          href="#"
          className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Go back home
        </a>
        <a href="#" className="text-sm font-semibold text-gray-900">
          Contact support <span aria-hidden="true">&rarr;</span>
        </a>
      </div>
    </div>
  )
}