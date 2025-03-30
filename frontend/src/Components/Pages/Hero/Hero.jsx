import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import "./Hero.css"; // Import the CSS file
import { StreaXPContext } from '../../Context/Strea&XPContext'

const Hero = () => {
  const { totalStreaXP } = useContext(StreaXPContext);
  const sampleBadges = ["🥇 Gold", "🥈 Silver", "🔥 Elite Streaker", "🌟 Master"];

  return (
    <div>
      <>

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