import React, { useState, useContext } from "react";
import { NavLink } from "react-router-dom";
import "./Hero.css";
import { StreaXPContext } from '@/Context/Strea&XPContext'
import { SunIcon, MoonIcon } from "@/Components/Slider/SliderIcon";
import { useTheme } from "@/Context/ThemeProvider";
import { Link } from "react-router-dom";
import ProfileDropDown from "@/Components/ProfileDropDown";
import LogOutPopUp from "@/Components/Nav/LogOutPopUp";
import { AuthContext } from "@/Context/AuthContext";

const Hero = () => {
  const [isLogOutPopUpOpen, setIsLogOutPopUpOpen] = useState(false);
  const { totalStreaXP } = useContext(StreaXPContext);
  const sampleBadges = ["🥇 Gold", "🥈 Silver", "🔥 Elite Streaker", "🌟 Master"];
  const { theme, toggleTheme } = useTheme();
  const { user } = useContext(AuthContext);

  return (
    <>
      <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-gray-50 px-4 shadow-xs sm:gap-x-6 sm:px-6 lg:px-8 dark:border-white/10 dark:bg-gray-900">
        <Link to={'/home'}>
          <div className="flex h-16 shrink-0 items-center gap-x-2">
            <span className="text-lg text-rose-500 font-bold">
              HabitQuest
            </span>
          </div>
        </Link>

        {/* Separator */}
        <div aria-hidden="true" className="h-6 w-px bg-gray-900/10 lg:hidden" />

        <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
          <div className="grid flex-1 grid-cols-1">

          </div>
          <div className="flex items-center gap-x-2 lg:gap-x-6">

            <button type="button" className="text-gray-400 hover:text-gray-500"
              onClick={toggleTheme}>
              <span className="sr-only">View notifications</span>
              {theme === "dark" ?
                <MoonIcon aria-hidden="true" className="size-6" />
                :
                <SunIcon aria-hidden="true" className="size-6" />
              }
            </button>

            {/* Separator */}
            <div aria-hidden="true" className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-900/10" />

            {/* Profile dropdown */}
            {
              user ?
                <ProfileDropDown
                  setIsLogOutPopUpOpen={setIsLogOutPopUpOpen}
                /> :
                <div>
                  <Link to={'/auth#login'}>
                    Login
                  </Link>
                </div>
            }
          </div>
        </div>
      </div>
      <div className="mx-16 sm:mx-8">
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
      </div>
      {
        isLogOutPopUpOpen &&
        <LogOutPopUp setIsLogOutPopUpOpen={setIsLogOutPopUpOpen} />
      }
    </>
  );
};

export default Hero;