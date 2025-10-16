import React, { useState, useContext } from 'react'
import { useEffect } from 'react';
import { AuthContext } from "@/Context/AuthContext";
import Category from '@/Components/AddHabit/Category';
import Frequency from '@/Components/AddHabit/Frequency';
import axiosInstance from '@/api/axiosInstance';
import toast from 'react-hot-toast';

const notify = (type, message) => {
  if (type === 'success') {
    toast.success(message);
  }
  if (type === 'error') {
    toast.error(message);
  }
}
function AddHabit() {
  // const { showToast } = useToast();
  const { user, token } = useContext(AuthContext);
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
      console.log(response);
      if (response) {
        notify('success', response.data.message);
      }
    } catch (error) {
      notify('error', 'Error Saving habit');
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
      <div className="bg-gray-50/0 dark:bg-gray-800/50 outline -outline-offset-1 outline-gray-900/5 dark:outline-gray-700/10 sm:rounded-xl md:col-span-2">
        <div className="px-4 py-6 sm:p-8 grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 md:col-span-2 mb-4">
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
                className="block w-full rounded-md bg-gray-900/5 dark:bg-white/5 px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-amber-900/5 dark:outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-amber-500 sm:text-sm/6"
              />
            </div>
          </div>
          {/* <div className="sm:col-span-3">
            <label htmlFor="last-name" className="block text-sm/6 font-medium ">
              Frequency
            </label>
            <div className="group relative inline-flex w-11 shrink-0 rounded-full bg-white/5 p-0.5 inset-ring inset-ring-white/10 outline-offset-2 outline-indigo-500 transition-colors duration-200 ease-in-out has-checked:bg-indigo-500 has-focus-visible:outline-2">
              <span className="size-5 rounded-full bg-white shadow-xs ring-1 ring-gray-900/5 transition-transform duration-200 ease-in-out group-has-checked:translate-x-5" />
              <input
                name="setting"
                type="checkbox"
                aria-label="Use setting"
                className="absolute inset-0 appearance-none focus:outline-hidden"
              />
            </div>
          </div> */}
          <Frequency
            setMinDate={setMinDate}
            setFormObject={setFormObject}
            formObject={formObject}
          />

          <div className="sm:col-span-4">
            <label htmlFor="target-duration" className="block text-sm/6 font-medium ">
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
            <label htmlFor="Priority-Level" className="block text-sm/6 font-medium ">
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