import React, { useEffect, useState, useContext } from 'react';
import { url } from '../../../URL/Url';
import { AuthContext } from '../../Context/AuthContext';
import Silver from '../../../assets/Icons/Silver';
import Gold from '../../../assets/Icons/gold.svg';
import './Badges.css'
import TotalStreakAndXP from '../TotalStreak&XP/TotalStreak&XP';

function Badge() {
  const { user, loading, token } = useContext(AuthContext); // Access user from context
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
    } else if (badgeName == '🏆 Gold Badge') {
      return '200'
    } else {
      return '500'
    }
  }

  useEffect(() => {
    const fetchBadges = async () => {
      if (!token || user === null) {
        console.log("No token found, user is not logged in");
        return;
      }
      try {
        const response = await fetch(`${url}/habit/habits`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}` // Include JWT token
          }
        });
        const data = await response.json();
        setAllBadges(data.filter(item => (item.BadgeRecord.Badge != '')));
      } catch (error) {
        console.error('Error fetching habits:', error);
      }
    }
    fetchBadges();
  }, [user])

  // if (loading) return <p>Loading...</p>;
  // if (!user) return <p>Please log in to view your badges.</p>;

  return (
    <>
      <div className='Badge'>
        <div className='Habit-list'>
          <h1> Badges </h1>
          <TotalStreakAndXP />
        </div>
        {
          user ?
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
            </div> :

            <p>Please login first </p>
        }
      </div>
    </>
  )
}

export default Badge