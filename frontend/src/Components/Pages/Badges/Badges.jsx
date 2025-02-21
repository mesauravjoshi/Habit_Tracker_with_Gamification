import React, { useEffect, useState } from 'react';
import { url } from '../../../URL/Url';
import Silver from '../../../assets/Icons/Silver'; // Adjust the path based on your folder structure
import Gold from '../../../assets/Icons/gold.svg'; // Adjust the path based on your folder structure
import './Badges.css'

function Badge() {
  const [allBadges, setAllBadges] = useState([]);

  const displayBadgeIcon = (badgeName) => {
    if (badgeName == '🥈 Silver Badge') {
      return <div className="icon-Image">
        <Silver />
      </div>
    } else if (badgeName == '🏆 Gold Badge') {
      return <div>
        <img src={Gold} alt="" />
      </div>
    } else {
      return <div className="icon-Image">
        <span className="material-symbols-outlined">
          local_fire_department
        </span>
      </div>
    }
  }

  const plusPointCalculate = (badgeName) => {
    if (badgeName == '🥈 Silver Badge') {
      return '50'
    } else if (badgeName == '🏆 Gold Badge'){
      return '200'
    } else {
      return '500'
    }
  }

  useEffect(() => {
    const fetchBadges = async () => {
      try {
        const response = await fetch(`${url}/habits`);
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
            allBadges.map((item, index) => {
              let badgeCardType = '';
              if (item.BadgeRecord.Badge === '🥈 Silver Badge') {
                badgeCardType = 'silver-card';
              } else if (item.BadgeRecord.Badge === '🏆 Gold Badge') {
                badgeCardType = 'gold-card';
              } else {
                badgeCardType = 'elite-card';
              }
              return (
                <div key={index} className={`Badge-card ${badgeCardType}`}>
                  <div className="badge-header">
                    {
                      displayBadgeIcon(item.BadgeRecord.Badge)
                    }
                    <h3>{(item.BadgeRecord.Badge).slice(2)} </h3>
                  </div>
                  <span className='badge-Frequency'>({(item.Frequency).toUpperCase()})</span>
                  {/* <hr /> */}
                  <div className="badge-details">
                    <p> Habit: {item.HabitName} </p>
                    <p>Earned on: {(item.BadgeRecord.AchievedOn).slice(3, 15)} </p>
                    <p>Streak: {item.BadgeRecord.StreakDuration} {item.Frequency === 'Daily' ? 'Days' : 'Weeks'} </p>
                  </div>
                  <div className="badge-footer">
                    <span className='plus-text' >+{plusPointCalculate(item.BadgeRecord.Badge)}</span>
                    <span className='XP-text'>XP <br /> Points</span>
                  </div>
                </div>
              );
            })
          }
        </div>

      </div>
    </>
  )
}

export default Badge