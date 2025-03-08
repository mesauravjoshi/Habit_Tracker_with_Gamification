import React, { useState, useContext } from 'react'
import './Habit.css';
import { useEffect } from 'react';
import { url } from '../../../URL/Url';
import { AuthContext } from "../../Context/AuthContext";
import Category from './Category';
import Frequency from './Frequency';

function Habit() {
  const { user, token } = useContext(AuthContext);
  const priorityLabels = ["Low", "Medium", "High", "Critical"];
  const [habits, setHabits] = useState([]);
  const [habit, setHabit] = useState('');
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedFrequency, setSelectedFrequency] = useState("");
  const [targetDuration, setTargetDuration] = useState("");
  const [minDate, setMinDate] = useState("");
  const [priority, setPriority] = useState(0);

  // Get today's date in YYYY-MM-DD format
  const getTodayDate = () => {
    const today = new Date();
    setMinDate(today.toISOString().split("T")[0]);
    console.log( typeof today.toISOString().split("T")[0]);
    // return today.toISOString().split("T")[0]; // Extract YYYY-MM-DD
  };

  const handleAddHabit = async () => {
    const lastDay = new Date();
    lastDay.setDate(lastDay.getDate() + 6);
    lastDay.setHours(0, 0, 0, 0);

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (habit.trim() === '' || targetDuration === '' || selectedFrequency === '') {
      alert("All field required !")
    } else {
      // const user_id = user._id
      const newHabit = {
        userId: user._id,// ✅ Attach user ID
        HabitName: habit,
        Category: selectedCategory,
        Frequency: selectedFrequency,
        Priority: priorityLabels[priority],
        TargetDuration: targetDuration,
        StartedDate: today.toString(),
        StreakRecord: {
          LastUpdate: "",
          TotalStreak: 0,
          XPPoints: 0
        },
        BadgeRecord: {
          AchievedOn: "",
          Badge: "",
          StreakDuration: ""
        },
        IsConmpleted: false,
      };
      // console.log(newHabit);

      if (selectedFrequency === 'Daily') {
        newHabit.TotalDaysCompleted = 0;
        newHabit.CalendarData = {}
      } else if (selectedFrequency === 'Weekly') {
        newHabit.CalendarData = [
          {
            start: "",
            end: "",
            status: "",
          }
        ],
          newHabit.StreakRecord.LastDayForWeek = lastDay.toString();
        newHabit.TotalWeeksCompleted = 0;
      } else {
        console.log('nothing is selected');
        return;
      }

      try {
        const response = await fetch(`${url}/habit/add_habit`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',  // Make sure the server understands the data format
            "Authorization": `Bearer ${token}` // Include JWT token
          },
          body: JSON.stringify(newHabit),  // Send data as JSON
        });

        if (response.ok) {
          const result = await response.json();
          // console.log(result);
        } else {
          const errorResponse = await response.json();
          console.error('Error:', errorResponse);
        }
      } catch (error) {
        console.error('Error:', error);
      }

      // Reset input fields
      setHabit('');
      setSelectedCategory('');
      setSelectedFrequency('');
      setTargetDuration('');
      setPriority(0);
    }
  };

  useEffect(() => {
    if (habits.length > 0) {
      localStorage.setItem('Habit Track', JSON.stringify(habits));
    }
  }, [habits]);

  useEffect(() => {
    const today = new Date();
    setMinDate(today.toISOString().split("T")[0]);
    const savedHabitData = localStorage.getItem('Habit Track');
    if (savedHabitData) {
      setHabits(JSON.parse(savedHabitData)); // Parse the data and set it as initial state
    }
  }, []);

  return (
    <>
      <div className='habbit'>
        {/* 1. Add-Habit */}
        <div id="borderr" className="Add-Habit">
          <h2>Add Yoor Habbit </h2>
          <input type="text" placeholder='Habit name...'
            value={habit}
            onChange={(e) => setHabit(e.target.value)}
          />
        </div>

        {/* 2.  Frequency */}
        <Frequency selectedFrequency={selectedFrequency} setSelectedFrequency={setSelectedFrequency}  setMinDate={setMinDate}
         />

        {/* 3. Target Duration */}
        <div id="borderr" className="Target-Duration">
          <h2>Target Duration</h2>
          <input
            type="date"
            value={targetDuration}
            onChange={(e) => setTargetDuration(e.target.value)}
            min={minDate} // Restrict selection to dates after today
          />
          <div className="call">
          </div>
        </div>

        {/* 4. Category */}
        <Category selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />

        {/* 6.  Priority Level */}
        <div id="borderr" className="Priority-Level">
          <h2>Priority Level</h2>
          <input
            type="range"
            min="0"
            max="3"
            step="1"
            value={priority}
            onChange={(e) => setPriority(Number(e.target.value))}
            className="slider"
          />
          <p className="priority-text">{priorityLabels[priority]}</p>
        </div>

        <div className="Add-Habit-Button">
          <button onClick={handleAddHabit}>Add Habit</button>
        </div>
      </div>
    </>
  )
}

export default Habit