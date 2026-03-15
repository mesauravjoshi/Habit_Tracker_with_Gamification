import React, { useState, useContext } from "react";
import { NavLink, Link } from "react-router-dom";
import { StreaXPContext } from "@/Context/Strea&XPContext";
import { SunIcon, MoonIcon } from "@/assets/Icons/SliderIcon";
import { useTheme } from "@/Context/ThemeProvider";
import ProfileDropDown from "@/Components/ProfileDropDown";
import LogOutPopUp from "@/Components/Modals/LogOutModal";
import { AuthContext } from "@/Context/AuthContext";

const sampleBadges = ["🥇 Gold", "🥈 Silver", "🔥 Elite Streaker", "🌟 Master"];

const Hero = () => {
  const [isLogOutPopUpOpen, setIsLogOutPopUpOpen] = useState(false);
  const { totalStreaXP } = useContext(StreaXPContext);
  const { theme, toggleTheme } = useTheme();
  const { user } = useContext(AuthContext);

  return (
    <>
      {/* NAVBAR */}
      <div className="sticky top-0 z-50 flex h-16 items-center border-b border-black/10 dark:border-white/10 backdrop-blur-xl bg-white/70 dark:bg-[#111827]/70 px-6">
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between">

          <Link to="/home" className="text-lg font-bold tracking-tight">
            <span className="bg-gradient-to-r from-rose-500 to-amber-500 bg-clip-text text-transparent">
              HabitQuest
            </span>
          </Link>

          <div className="flex items-center gap-4">

            <p
              onClick={toggleTheme}
              className="p-2 rounded-xl hover:scale-105 transition-all cursor-pointer"
            >
              {theme === "dark" ? (
                <MoonIcon className="size-5" />
              ) : (
                <SunIcon className="size-5" />
              )}
            </p>

            {user ? (
              <ProfileDropDown setIsLogOutPopUpOpen={setIsLogOutPopUpOpen} />
            ) : (
              <Link
                to="/auth#login"
                className="px-4 py-2 rounded-xl border border-black/10 dark:border-white/10 backdrop-blur hover:scale-105 transition-all"
              >
                Login
              </Link>
            )}

          </div>
        </div>
      </div>

      {/* HERO */}
      <section className="relative overflow-hidden bg-[#f9fafb] dark:bg-[#111827] ">

        {/* RADIAL GLOW */}
        <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-rose-500/30 blur-3xl rounded-full" />
        <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-amber-500/30 blur-3xl rounded-full" />

        <div className="max-w-7xl mx-auto px-6 py-24 text-center relative z-10">

          {/* BADGE */}
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full border border-black/10 dark:border-white/10 backdrop-blur bg-white/40 dark:bg-white/5 text-sm tracking-tight shadow-xl">
            {/* <span>✨ AI Powered</span> */}
            <span className="text-gray-900 dark:text-gray-300">🚀 Build discipline with streaks & XP</span>
            <span className="text-rose-500">Beta</span>
          </div>

          {/* HEADING */}
          <h1 className="mt-6 text-4xl sm:text-6xl font-bold tracking-tight leading-tight">

            <span className="bg-gradient-to-r from-rose-500 to-amber-500 bg-clip-text text-transparent">
              Build Better Habits
            </span>

            <br />

            <span className="text-gray-900 dark:text-gray-300">
              Like a Pro.
            </span>

          </h1>

          {/* DESCRIPTION */}
          <p className="mt-6 max-w-2xl mx-auto text-lg text-black/70 dark:text-white/70">
            Track habits, earn XP, unlock badges, and stay consistent with a modern
            productivity system designed like a premium AI SaaS product.
          </p>

          {/* BUTTONS */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">

            <NavLink to="/habit">
              <button className="px-8 py-3 rounded-2xl font-medium shadow-2xl bg-gradient-to-r from-rose-500 to-amber-500 text-white hover:scale-105 transition-all duration-300">
                Get Started
              </button>
            </NavLink>

            <NavLink to="/badges">
              <button className="px-8 py-3 rounded-2xl border-1 border-gray-300 dark:border-white/10 backdrop-blur bg-white/40 dark:bg-white/5 hover:scale-105 transition-all duration-300">
                View Badges
              </button>
            </NavLink>

          </div>

        </div>

        {user && (
          <DashboardSummary
            totalStreaXP={totalStreaXP}
            sampleBadges={sampleBadges}
          />
        )}

      </section>

      {isLogOutPopUpOpen && (
        <LogOutPopUp setIsLogOutPopUpOpen={setIsLogOutPopUpOpen} />
      )}
    </>
  );
};

export default Hero;

const StatCard = ({ icon, title, value, change, subtitle, children }) => {
  return (
    <div className="relative rounded-2xl border-1 border-black/10 dark:border-gray-600 backdrop-blur bg-white/50 dark:bg-white/5 shadow-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:border-rose-400/40 p-6 overflow-hidden">

      {/* glow */}
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-r from-rose-500/20 to-amber-500/20 blur-3xl rounded-full" />

      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">

          <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-rose-500 to-amber-500 flex items-center justify-center text-white text-lg shadow-lg">
            {icon}
          </div>

          <div>
            <p className="text-xs text-black/60 dark:text-white/60">
              {title}
            </p>

            <p className="text-3xl font-semibold tracking-tight mt-1 bg-gradient-to-r from-rose-500 to-amber-500 bg-clip-text text-transparent">
              {value}
            </p>
          </div>

        </div>

        {change && (
          <span className="text-xs font-semibold text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-amber-500">
            {change}
          </span>
        )}
      </div>

      {subtitle && (
        <p className="text-xs text-black/60 dark:text-white/60 mb-3">
          {subtitle}
        </p>
      )}

      {children}
    </div>
  );
};

const DashboardSummary = ({ totalStreaXP, sampleBadges }) => {
  return (
    <section className="bg-[#f9fafb] dark:bg-[#111827]">

      <div className="max-w-7xl mx-auto px-6 py-6">

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

          {/* Total Streak */}
          <StatCard
            icon="🔥"
            title="Total Streak"
            value={`${totalStreaXP ? totalStreaXP.totalStreak : 0} Days`}
            change="+12%"
            subtitle="Keep going daily"
          />

          {/* Total XP */}
          <StatCard
            icon="⚡"
            title="Total XP"
            value={totalStreaXP ? totalStreaXP.totalxPPoints : 0}
            change="+8%"
            subtitle="Experience points earned"
          />

          {/* Badges */}
          <StatCard
            icon="🏆"
            title="Badges"
            value={sampleBadges?.length || 0}
            subtitle="Your achievements"
          >
            <div className="flex gap-2 flex-wrap mb-4">
              {sampleBadges.slice(0, 3).map((b, i) => (
                <span
                  key={i}
                  className="px-3 py-1 rounded-full text-xs backdrop-blur bg-gray-200 dark:bg-white/5"
                >
                  {b}
                </span>
              ))}
            </div>

            <NavLink to="/badges">
              <button className="px-4 py-2 rounded-xl border-1 border-black/10 dark:border-gray-600 transition-all duration-300 hover:scale-105 hover:border-rose-400/40">
                View All
              </button>
            </NavLink>
          </StatCard>

          {/* Extra stat for modern grid balance */}
          <StatCard
            icon="🚀"
            title="Progress"
            value="92%"
            change="+3%"
            subtitle="Monthly growth"
          />

        </div>

      </div>

    </section>
  );
};