import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";;
import React, { useState, useContext } from 'react'
import { useEffect } from 'react';
import { AuthContext } from "@/Context/AuthContext";
import Frequency from '@/Components/AddHabit/Frequency';
import axiosInstance from '@/api/axiosInstance';
import toast from 'react-hot-toast';
import './AddHabit.css'

function formatDate(dateStr) {
  if (dateStr) {
    const date = new Date(dateStr);
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
    const day = String(date.getUTCDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
  return null; // Return null if the date is null
}

const notify = (type, message) => {
  if (type === 'success') {
    toast.success(message);
  }
  if (type === 'error') {
    toast.error(message);
  }
}

function AddHabit() {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(null);
  // console.log(startDate);
  const onChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
    setFormObject((prev) => ({
      ...prev,
      TargetDuration: formatDate(end)
    }))
  };

  const { user } = useContext(AuthContext);
  const priorityLabels = ["Low", "Medium", "High", "Critical"];
  const [habits, setHabits] = useState([]);
  const [minDate, setMinDate] = useState("");
  const [formObject, setFormObject] = useState({
    HabitName: '',
    Category: '',
    Frequency: 'Daily',
    TargetDuration: '',
    Priority: 0,
  });
  const [isOpen, setIsOpen] = useState(false);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    // console.log(name, value);
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

    const udpatedHabit = {
      ...formObject,
      Priority: priorityLabels[formObject.Priority],
      userId: user.id,
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
    // console.log(udpatedHabit);
    // return
    if (formObject.Frequency === 'Daily') {
      udpatedHabit.TotalDaysCompleted = 0;
      udpatedHabit.CalendarData = {}
    } else if (formObject.Frequency === 'Weekly') {
      udpatedHabit.CalendarData = [
        {
          start: "",
          end: "",
          status: "",
        }
      ],
        udpatedHabit.StreakRecord.LastDayForWeek = lastDay.toString();
      udpatedHabit.TotalWeeksCompleted = 0;
    } else {
      return;
    }
    // console.log(udpatedHabit);
    // return;
    try {
      const response = await axiosInstance.post(`/habit/add_habit`, udpatedHabit);
      // console.log(response);
      if (response) {
        notify('success', response.data.message);
      }
    } catch (error) {
      notify('error', 'Error Saving habit');
      console.error('Error:', error);
    } finally {
      // console.log('finally');
      // Reset input fields
      setStartDate(new Date())
      setEndDate(null);
      setFormObject((prev) => {
        return { ...prev, HabitName: '', Priority: 0, TargetDuration: '', Category: '', Frequency: 'Daily' }
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
      <div className="bg-gray-50/0 dark:bg-gray-800/50 outline -outline-offset-1 outline-gray-900/5 dark:outline-gray-700/10 sm:rounded-xl md:col-span-2">
        <div className="px-4 py-4 sm:p-8 grid max-w-4xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 md:col-span-2">
          <div className="sm:col-span-3">
            <label htmlFor="My-Habit" className="block text-sm/6 font-medium">
              My Habit
            </label>
            <div className="mt-2">
              <input
                id="My-Habit"
                name="HabitName"
                type="text"
                value={formObject.HabitName}
                onChange={(e) => handleFormChange(e)}
                placeholder='Your Habit'
                className="block w-full rounded-md bg-gray-900/5 px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-amber-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-gray-600 sm:text-sm/6 dark:bg-white/5  dark:outline-white/10 dark:placeholder:text-[#925e0a] dark:focus:outline-amber-500"
              />
            </div>
          </div>

          <Frequency
            setMinDate={setMinDate}
            setFormObject={setFormObject}
            formObject={formObject}
            setStartDate={setStartDate}
          />

          <div className="sm:col-span-6">
            <label htmlFor="target-duration" className="block text-sm/6 font-medium mb-2">
              Target Duration
            </label>
            <div className="">
              <DatePicker
                id="target-duration"
                selected={startDate}
                onChange={onChange}
                startDate={startDate}
                endDate={endDate}
                selectsRange
                inline
                monthsShown={2}                // ✅ Show 2 months side by side
                minDate={minDate}           // ✅ Disable all dates before today
                dateFormat="dd MMM yyyy"       // (optional) Clean date display format
                className="react-datepicker-custom bg-transparent"
              />
            </div>
            {/* <div className="mt-2">
              <input
                id="target-duration"
                type="date"
                name='TargetDuration'
                value={formObject.TargetDuration}
                onChange={(e) => handleFormChange(e)}
                min={minDate}
              />
            </div> */}
          </div>

          {/* <div className="sm:col-span-3">
            <label htmlFor="Category" className="block text-sm/6 font-medium ">
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
          </div> */}
          <div className="sm:col-span-3">
            <label htmlFor="Priority-Level" className="block text-sm font-medium mb-1">
              Priority Level
            </label>

            <input
              type="range"
              name="Priority"
              min="0"
              max="3"
              step="1"
              value={formObject.Priority}
              onChange={(e) => handleFormChange(e)}
              className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-gray-300 dark:bg-gray-700 
               accent-black dark:accent-amber-400"
            />

            <p className="priority-text mt-2 text-sm font-medium">
              {priorityLabels[formObject.Priority]}
            </p>
          </div>

        </div>
        <div className="flex items-center justify-end gap-x-6 border-t border-gray-900/10 dark:border-white/10 px-4 py-4 sm:px-8">
          <button type="button" className="text-sm/6 font-semibold">
            Reset
          </button>
          <button
            type="submit"
            onClick={handleAddHabit}
            className="rounded-md text-gray-100 dark:text-amber-600 bg-amber-700/95 dark:bg-amber-500/20  px-3.5 py-2.5 text-sm font-semibold  hover:bg-amber-700/95  dark:hover:bg-amber-500/30">
            Add
          </button>
        </div>
      </div>
    </>
  )
}

export default AddHabit