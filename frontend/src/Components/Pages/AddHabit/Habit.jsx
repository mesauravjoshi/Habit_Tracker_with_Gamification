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
  const [minDate, setMinDate] = useState("");
  const [formObject, setFormObject] = useState({
    HabitName: '',
    Category: '',
    selectedFrequency: '',
    TargetDuration: '',
    Priority: 0,
  });

  // Get today's date in YYYY-MM-DD format
  const getTodayDate = () => {
    const today = new Date();
    setMinDate(today.toISOString().split("T")[0]);
    console.log(typeof today.toISOString().split("T")[0]);
    // return today.toISOString().split("T")[0]; // Extract YYYY-MM-DD
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormObject((prev) => {
      if (e.target.name === 'priority') return { ...prev, [name]: Number(value) }
      else return { ...prev, [name]: value }
    })
  }

  const handleAddHabit = async () => {
    const lastDay = new Date();
    lastDay.setDate(lastDay.getDate() + 6);
    lastDay.setHours(0, 0, 0, 0);

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (formObject.HabitName.trim() === '' || formObject.TargetDuration === '' || formObject.Frequency === '') {  
      alert("All field required !")
    } else {
      // const user_id = user._id
      // setFormObject((prev) => {
      //   // console.log(prev);
      //   return { ...prev, 'priority': priorityLabels[prev.priority] }
      // })
      const newHabit = {
        ...formObject,
        Priority: priorityLabels[formObject.Priority],
        userId: user._id,// ✅ Attach user ID
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

      if (formObject.Frequency === 'Daily') {
        newHabit.TotalDaysCompleted = 0;
        newHabit.CalendarData = {}
      } else if (formObject.Frequency === 'Weekly') {
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
      } finally {
        console.log('finally');
        // Reset input fields
        setFormObject((prev) => {
          return { ...prev, HabitName: '', Priority: 0, TargetDuration: '', Category: '' ,Frequency: ''}
        });
      }
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
            value={formObject.HabitName} name='HabitName'
            onChange={(e) => handleFormChange(e)}
          />
        </div>

        {/* 2.  Frequency */}
        <Frequency setMinDate={setMinDate} setFormObject={setFormObject} formObject={formObject}
        />

        {/* 3. Target Duration */}
        <div id="borderr" className="Target-Duration">
          <h2>Target Duration</h2>
          <input
            type="date" name='TargetDuration'
            value={formObject.TargetDuration}
            onChange={(e) => handleFormChange(e)}
            min={minDate} // Restrict selection to dates after today
          />
          <div className="call">
          </div>
        </div>

        {/* 4. Category */}
        <Category setFormObject={setFormObject} formObject={formObject} />

        {/* 6.  Priority Level */}
        <div id="borderr" className="Priority-Level">
          <h2>Priority Level</h2>
          <input
            type="range" name='Priority'
            min="0"
            max="3"
            step="1"
            value={formObject.Priority}
            onChange={(e) => handleFormChange(e)}
            className="slider"
          />
          <p className="priority-text">{priorityLabels[formObject.Priority]}</p>
        </div>

        <div className="Add-Habit-Button">
          <button onClick={handleAddHabit}>Add Habit</button>
        </div>
      </div>
    </>
  )
}

export default Habit