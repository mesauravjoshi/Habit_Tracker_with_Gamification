import React, { useState } from 'react'
import './Habit.css';
import { useEffect } from 'react';

function Habit() {
  const priorityLabels = ["Low", "Medium", "High", "Critical"];
  // Initial state to hold the form data
  // const [habitData , setHabitData] = useState({});
  // State to hold the data from local storage
  const [habits, setHabits] = useState([]);
  const [habit, setHabit] = useState('');
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedFrequency, setSelectedFrequency] = useState("");
  const [targetDuration, setTargetDuration] = useState("");
  const [priority, setPriority] = useState(0);

  // Get today's date in YYYY-MM-DD format
  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split("T")[0]; // Extract YYYY-MM-DD
  };

  const handleFrequencyChange = (event) => {
    if (event.target.name === "Frequency") {
      setSelectedFrequency(event.target.value);
    }
  };

  const handleAddHabit = () => {
    const lastDay = new Date();
    lastDay.setDate(lastDay.getDate() + 6);
    lastDay.setHours(0, 0, 0, 0);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const newHabit = {
      Habit: habit,
      Category: selectedCategory,
      Frequency: selectedFrequency,
      Priority: priorityLabels[priority],
      TargetDuration: targetDuration,
      StartedDate: today.toString(),
      StreakRecord: {
        LastUpdate: "",
        TotalStreak: 0
      }
    };

    if (selectedFrequency === 'Daily') {
      newHabit.TotalDaysCompleted = 0;
    } else if (selectedFrequency === 'Weekly') {
      newHabit.StreakRecord.LastDayForWeek = lastDay.toString();
      newHabit.TotalWeeksCompleted = 0;
    } else {
      console.log('nothing is selected');
      return;  // Exit if no valid frequency is selected
    }

    const newHabits = [...habits, newHabit];
    setHabits(newHabits);

    // Reset input fields
    setHabit('');
    setSelectedCategory('');
    setSelectedFrequency('');
    setTargetDuration('');
    setPriority(0);
  };

  useEffect(() => {
    if (habits.length > 0) {
      localStorage.setItem('Habit Track', JSON.stringify(habits));
    }
  }, [habits]); // This runs whenever habitData changes

  useEffect(() => {
    const savedHabitData = localStorage.getItem('Habit Track');
    if (savedHabitData) {
      setHabits(JSON.parse(savedHabitData)); // Parse the data and set it as initial state
    }
  }, []);

  return (
    <>
      <div className='habbit'>
        {/* 1. Add-Habit */}
        <div id='borderr' className="Add-Habit">
          <h2>Add Yoor Habbit </h2>
          <input type="text"
            value={habit}
            onChange={(e) => setHabit(e.target.value)}
          />
        </div>

        {/* 2. Category */}
        <div id='borderr' className="Category">
          <h2>Category</h2>
          <select
            onChange={(e) => setSelectedCategory(e.target.value)}
            value={selectedCategory}>
            <option > e.g.,Exercise, Coding, Meditation</option>
            <option value="Coding"> Coding</option>
            <option value="Reading"> Reading</option>
            <option value="Workout"> Workout</option>
          </select>
        </div>

        {/* 3. Target Duration */}
        <div id="borderr" className="Target-Duration">
          <h2>Target Duration</h2>
          {/* <UseCalander/> */}
          <input
            type="date"
            value={targetDuration}
            onChange={(e) => setTargetDuration(e.target.value)}
            min={getTodayDate()} // Restrict selection to dates after today
          />
        </div>

        {/* 4.  Frequency */}
        <div id="borderr" className="Frequency" onChange={handleFrequencyChange}>
          <h2>Frequency</h2>
          <input type="radio" id="Daily" name="Frequency" value="Daily" checked={selectedFrequency === "Daily"} onChange={handleFrequencyChange} />
          <label htmlFor="Daily">Daily</label>
          <br />

          <input type="radio" id="Weekly" name="Frequency" value="Weekly" checked={selectedFrequency === "Weekly"} onChange={handleFrequencyChange} />
          <label htmlFor="Weekly">Weekly</label>
          <br />

          <input type="radio" id="Custom" name="Frequency" value="Custom" checked={selectedFrequency === "Custom"} onChange={handleFrequencyChange} />
          <label htmlFor="Custom">Custom</label>
        </div>

        {/* 5.  Reminder Time */}
        {/* <div id='borderr' className="Reminder-Time">
      <h2>Reminder Time</h2>
    </div> */}

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