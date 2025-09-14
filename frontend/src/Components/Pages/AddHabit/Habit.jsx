import React, { useState, useContext } from 'react'
import './Habit.css';
import { useEffect } from 'react';
import { url } from '../../../URL/Url';
import { AuthContext } from "../../Context/AuthContext";
import Category from './Category';
import Frequency from './Frequency';
import { categories } from './Category'
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  TransitionChild,
} from '@headlessui/react'

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
  const [isOpen, setIsOpen] = useState(false);

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

  const handleSelect = (category) => {
    setFormObject((prev) => { return { ...prev, 'Category': category } });
    // setFormObject(category);
    // console.log(category);
    setIsOpen(false);
  };

  const handleAddHabit = async () => {
    const lastDay = new Date();
    lastDay.setDate(lastDay.getDate() + 6);
    lastDay.setHours(0, 0, 0, 0);

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    console.log(formObject);

    if (formObject.HabitName.trim() === '' || !formObject.TargetDuration || !formObject.Frequency === '') {
      alert("All field required !");
      return
    }

    const newHabit = {
      ...formObject,
      Priority: priorityLabels[formObject.Priority],
      userId: user._id,
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
    // return
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
      return;
    }

    try {
      const response = await fetch(`${url}/habit/add_habit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(newHabit),
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
        return { ...prev, HabitName: '', Priority: 0, TargetDuration: '', Category: '', Frequency: '' }
      });
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
      <div className='m-8 bg-[#292931] outline -outline-offset-1 outline-white/1 sm:rounded-xl p-4'>
        <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 md:col-span-2 mb-4">
          <div className="sm:col-span-3">
            <label htmlFor="My-Habit" className="block text-sm/6 font-medium text-amber-400">
              My Habit
            </label>
            <div className="mt-2">
              <input
                id="My-Habit"
                name="HabitName"
                type="text"
                value={formObject.HabitName}
                onChange={(e) => handleFormChange(e)}
                className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
              // className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-amber-400 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-amber-500 sm:text-sm/6"
              />
            </div>
          </div>
          <div className="sm:col-span-3">
            <label htmlFor="last-name" className="block text-sm/6 font-medium text-amber-400">
              Frequency
            </label>
            <Frequency setMinDate={setMinDate} setFormObject={setFormObject} formObject=
            {formObject} />
          </div>

          <div className="sm:col-span-4">
            <label htmlFor="target-duration" className="block text-sm/6 font-medium text-amber-400">
              Target Duration
            </label>
            <div className="mt-2">
              <input
                id="target-duration"
                type="date" name='TargetDuration'
                value={formObject.TargetDuration}
                onChange={(e) => handleFormChange(e)}
                min={minDate}
              />
            </div>
          </div>

          <div className="sm:col-span-3">
            <label htmlFor="Category" className="block text-sm/6 font-medium text-amber-400">
              Category
            </label>
            <div className={`custom-select ${isOpen ? "open" : ""}`} onClick={() => setIsOpen(!isOpen)}>
              <span>{formObject.Category || "Select a category"}</span>
              <div className="arrow"></div>
            </div>
            {isOpen && (
              <div className="dropdown">
                {categories.map((category, index) => (
                  <div
                    key={index}
                    className={`dropdown-item ${formObject.Category === category ? "selected" : ""}`}
                    onClick={() => handleSelect(category)}
                  >
                    {category}
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="sm:col-span-3">
            <label htmlFor="Priority-Level" className="block text-sm/6 font-medium text-amber-400">
              Priority Level
            </label>
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

        </div>
        <div className="flex items-center justify-end gap-x-6 border-t border-white/10 px-4 py-4 sm:px-8">
          <button type="button" className="text-sm/6 font-semibold text-white">
            Reset
          </button>
          <button
            type="submit"
            onClick={handleAddHabit}
            className="rounded-md bg-amber-500/20 px-3.5 py-2.5 text-sm font-semibold text-amber-400 hover:bg-amber-500/30"          >
            Add
          </button>
        </div>
      </div>
    </>
  )
}

export default Habit