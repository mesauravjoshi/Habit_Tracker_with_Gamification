import React, { useEffect, useState } from 'react';
import Silver from '../../../assets/Icons/Silver'; // Adjust the path based on your folder structure
import Gold from './gold.svg'; // Adjust the path based on your folder structure

import './Badges.css'

function Badge() {
  const [allBadges, setAllBadges] = useState([]);

  useEffect(() => {
    const fetchBadges = async () => {
      try {
        const response = await fetch('http://localhost:3000/habits');
        if (!response.ok) {
          throw new Error('Failed to fetch habits');
        }
        const data = await response.json();
        setAllBadges(data.filter(item => (item.BadgeRecord.Badge != '')));
      } catch (error) {
        console.error('Error fetching habits:', error);
      }
    }
    fetchBadges();
  }, [])
  console.log(allBadges);

  return (
    <>
      <div className='Badge'>
        <center>
          <h2>Badge</h2>
        </center>
        <div className='Badge-container'>
          {
            allBadges.map((item, index) => (
              <div key={index} className={`Badge-card ${item.BadgeRecord.Badge === '🥈 Silver Badge' ? 'silver-card' : 'gold-card'}  `}>
                <div className="badge-header">
                  {/* <Silver /> */}
                  <img src={Gold} alt="" />
                  {/* <span className="material-symbols-outlined">
                    local_police
                  </span> */}
                  <h3>{(item.BadgeRecord.Badge).slice(2)} </h3>
                </div>
                <span>({item.Frequency} )</span>
                {/* <hr /> */}
                <div className="badge-details">
                  <p> Habit: {item.HabitName} </p>
                  <p>Achieved on: {(item.BadgeRecord.AchievedOn).slice(3, 15)} </p>
                  <p>Streak: {item.BadgeRecord.StreakDuration} {item.Frequency === 'Daily' ? 'Days' : 'Weeks'} </p>
                  <p>XP Earned: +{item.BadgeRecord.StreakDuration === 7 ? '50' : '100'} </p>
                </div>
              </div>
            ))
          }
        </div>

      </div>
    </>
  )
}

export default Badge