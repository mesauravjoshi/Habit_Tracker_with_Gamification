import { useContext } from 'react'
import { AuthContext } from "@/Context/AuthContext";
import { StreaXPContext } from '@/Context/Strea&XPContext'
import './TotalStreak&XP.css'

function TotalStreakAndXP({ heading, setShowFilter }) {
  const { totalStreaXP } = useContext(StreaXPContext);
  const { user } = useContext(AuthContext);

  totalStreaXP ? totalStreaXP.totalStreak : 0
  return (
    <>
      <div className="TotalStreakAndXP md:flex md:items-center md:justify-between my-2 ">
        <div className="">
          <h2 className="text-2xl/7 font-bold sm:truncate sm:text-3xl sm:tracking-tight">
            {heading}
          </h2>
        </div>

        <button
          onClick={() => setShowFilter(prev => !prev)}
          className="flex items-center gap-2 px-2.5 py-1.5 font-semibold rounded-full cursor-pointer border-1 border-gray-900 dark:border-amber-400">
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

        {
          user &&
          <div className="flex flex-col gap-y-2 md:mt-0 md:ml-4">
            <h3 >🔥Total Streak: {totalStreaXP ? totalStreaXP.totalStreak : 0} </h3>
            <h3 >🎯 XP Points: {totalStreaXP ? totalStreaXP.totalxPPoints : 0}  </h3>
          </div>
        }
      </div>

      {
        // user &&
        // <div className='display-streak-XPPoints'>
        //     <h3 >🔥Total Streak: {totalStreaXP ? totalStreaXP.totalStreak : 0} </h3>
        //     <h3 >🎯 XP Points: {totalStreaXP ? totalStreaXP.totalxPPoints : 0}  </h3>
        // </div>
      }
    </>
  )
}

export default TotalStreakAndXP