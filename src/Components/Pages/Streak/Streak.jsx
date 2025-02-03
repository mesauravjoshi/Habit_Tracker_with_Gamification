import { useEffect, useState } from 'react';
import Nav from '../../Nav/Nav';
import Slider from '../../Slider/Slider';
import './Streak.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import StreakUpdate from './StreakUpdate';

function Streak() {
  const [streakData, setStreakData] = useState({});
  const [totalStreak, setTotalStreak] = useState(0);
  const [streakName, setStreakName] = useState('');
  const [streakDayLeft, setStreakDayLeft] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  // console.log(streakDayLeft);

  useEffect(() => {
    const getHabit_from_localStorage = localStorage.getItem('Habit Track')
    const habitJSON_data = JSON.parse(getHabit_from_localStorage)

    if (habitJSON_data) {
      setStreakName(habitJSON_data.Habit);
      setStreakData(habitJSON_data);
      setTotalStreak(habitJSON_data['Total Streak'])
      // Date complete 
      const targetDate = new Date(habitJSON_data['Target Duration']);
      const currentDate = new Date();
      const timeDifference = targetDate - currentDate;

      // If target date is in the future, calculate the number of days left
      if (timeDifference > 0) {
        const daysLeft = Math.ceil(timeDifference / (1000 * 3600 * 24)); // Convert milliseconds to days
        setStreakDayLeft(String(daysLeft))
        // console.log(`Number of days left: ${daysLeft}`);
      } else {
        console.log("Target Duration has passed or is today.");
      }
    }
    if (habitJSON_data['Target Duration']) {
    }
  }, [])

  useEffect(() => {
    if (Object.keys(streakData).length > 0) {
      localStorage.setItem('Habit Track', JSON.stringify(streakData));
    }
  }, [streakData]); // This runs whenever streakData changes

  const handleUpdate = () => {
    if (isChecked) {
      console.log("Clicked after check mark");
      setIsShowToday_Done(true)
      setTotalStreak((prev) => prev + 1)
      setStreakData((prev) => ({
        ...prev,
        'Total Streak': totalStreak + 1
      }))
    }
  };
  // console.log(streakData);

  return (
    <>
      <Slider />
      <Nav />
      <div>
        <div className="Streak">
          <h1>Habits List  &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; Total strek - {totalStreak}</h1>
          <div className="Habit-Card">
            <h3>{streakName} </h3>
            <p>
              🔥 Streak: {totalStreak} Days
            </p>
            <StreakUpdate />
            <p>
              Number of days left: {streakDayLeft}
            </p>
            <p>📊 Progress: [██████░░░░░░] 60%</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default Streak
