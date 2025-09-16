import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import "./Hero.css";
import { StreaXPContext } from '../../Context/Strea&XPContext'
import { useTheme } from "../../Context/ThemeProvider";

const Hero = () => {
  const { totalStreaXP } = useContext(StreaXPContext);
  const sampleBadges = ["🥇 Gold", "🥈 Silver", "🔥 Elite Streaker", "🌟 Master"];
  const { theme, toggleTheme } = useTheme();

  return (
    <div>
      <>
        <div className="!bg-white dark:!bg-gray-800 rounded-lg px-6 py-8 shadow-xl">
          <p>Hello world 🌍</p>
        </div>
        <nav className="flex justify-between items-center p-4 bg-white dark:bg-gray-900 shadow">
          <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">
            My App
          </h1>
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
          >
            {theme === "dark" ? 'SUN' : 'MOON'}
          </button>
        </nav>

        <div className="bg-white-100 dark:bg-gray-800 rounded-lg px-6 py-8 ring shadow-xl ring-gray-900/5">
          <div>
            <span className="inline-flex items-center justify-center rounded-md bg-indigo-500 p-2 shadow-lg">
              <svg className="h-6 w-6 stroke-white" >
              </svg>
            </span>
          </div>
          <h3 className="text-gray-900 dark:text-white mt-5 text-base font-medium tracking-tight ">Writes upside-down</h3>
          <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm ">
            The Zero Gravity Pen can be used to write in any orientation, including upside-down. It even works in outer space.
          </p>
        </div>

        <section className="hero">
          <h1>Build Better Habits, One Streak at a Time! 🚀</h1>
          <p>Track your progress, earn XP, and stay motivated with HabitQuest.</p>
          <NavLink to="/habit" className="">
            <button className="cta-btn">Get Started</button>
          </NavLink>
        </section>

        <section className="dashboard-summary">
          <div className="summary-card">
            <h3>🔥 Total Streak</h3>
            <p>{totalStreaXP ? totalStreaXP.totalStreak : 0}  Days</p>
          </div>

          <div className="summary-card">
            <h3>🎯 Total XP</h3>
            <p>{totalStreaXP ? totalStreaXP.totalxPPoints : 0} Points</p>
          </div>

          <div className="summary-card badges-card">
            <h3>🏅 Badges Earned</h3>
            <div className="badges-container">
              {sampleBadges.slice(0, 3).map((badge, index) => (
                <span key={index} className="badge">{badge}</span>
              ))}
            </div>
            <NavLink to="/badges" className="">
              <button className="view-all-btn">View All</button>
            </NavLink>
          </div>
        </section>
      </>
    </div>
  );
};

export default Hero;