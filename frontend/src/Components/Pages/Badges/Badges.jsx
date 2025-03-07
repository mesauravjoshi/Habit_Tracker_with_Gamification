import React, { useEffect, useState, useContext } from 'react';
import { url } from '../../../URL/Url';
import { AuthContext } from '../../Context/AuthContext';
import Silver from '../../../assets/Icons/Silver';
import Gold from '../../../assets/Icons/gold.svg';
import './Badges.css';
import TotalStreakAndXP from '../TotalStreak&XP/TotalStreak&XP';
import BlankHabitCard from '../HabitCard/BlankHabitCard';
import BlankBaadge from './BlackBaadge';

function Badge() {
  const { user, token } = useContext(AuthContext);
  const [allBadges, setAllBadges] = useState([]);
  const [loading, setLoading] = useState(true);

  const displayBadgeIcon = (badgeName) => {
    if (badgeName === '🥈 Silver Badge') {
      return (
        <div className="icon-Image">
          <Silver />
        </div>
      );
    } else if (badgeName === '🏆 Gold Badge') {
      return (
        <div>
          <img src={Gold} alt="Gold Badge" />
        </div>
      );
    } else {
      return (
        <div className="icon-Image">
          <span className="material-symbols-outlined">local_fire_department</span>
        </div>
      );
    }
  };

  const plusPointCalculate = (badgeName) => {
    if (badgeName === '🥈 Silver Badge') {
      return '50';
    } else if (badgeName === '🏆 Gold Badge') {
      return '200';
    } else {
      return '500';
    }
  };

  useEffect(() => {
    const fetchBadges = async () => {
      if (!token || user === null) {
        console.log('No token found, user is not logged in');
        setLoading(false);
        return;
      }
      try {
        const response = await fetch(`${url}/habit/habits`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        setAllBadges(data.filter((item) => item.BadgeRecord.Badge !== ''));
      } catch (error) {
        console.error('Error fetching habits:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchBadges();
  }, [user]);

  return (
    <div className="Badge">
      <div className="Habit-list">
        <h1>Badges</h1>
        <TotalStreakAndXP />
      </div>
      {user ? (
        loading ? (
          <div className="Badge-container">
            {Array(2).fill(null).map((_, index) => (
              <BlankBaadge key={index} />
            ))}
          </div>
        ) : (
          <div className="Badge-container">
            {allBadges.length > 0 ? (
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
                      {displayBadgeIcon(item.BadgeRecord.Badge)}
                      <h3>{item.BadgeRecord.Badge.slice(2)}</h3>
                    </div>
                    <span className="badge-Frequency">({item.Frequency.toUpperCase()})</span>
                    <div className="badge-details">
                      <p>Habit: {item.HabitName}</p>
                      <p>Earned on: {item.BadgeRecord.AchievedOn.slice(3, 15)}</p>
                      <p>
                        Streak: {item.BadgeRecord.StreakDuration}{' '}
                        {item.Frequency === 'Daily' ? 'Days' : 'Weeks'}
                      </p>
                    </div>
                    <div className="badge-footer">
                      <span className="plus-text">+{plusPointCalculate(item.BadgeRecord.Badge)}</span>
                      <span className="XP-text">
                        XP <br /> Points
                      </span>
                    </div>
                  </div>
                );
              })
            ) : (
              <p>No Badge earned yet...</p>
            )}
          </div>
        )
      ) : (
        <p>Please login first</p>
      )}
    </div>
  );
}

export default Badge;
