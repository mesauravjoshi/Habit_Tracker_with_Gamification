import DatePicker from "react-datepicker";
import React, { useState, useContext } from 'react'
import { useEffect } from 'react';
import { AuthContext } from "@/Context/AuthContext";
import Frequency from '@/Components/AddHabit/Frequency';
import axiosInstance from '@/api/axiosInstance';
import toast from 'react-hot-toast';
import './AddHabit.css'
import "react-datepicker/dist/react-datepicker.css";;
import { useForm } from "react-hook-form"

const priorityLabels = ["Low", "Medium", "High", "Critical"];

function formatDate(dateStr) {
  if (dateStr) {
    const date = new Date(dateStr);
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
    const day = String(date.getUTCDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
  return null;
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
  const {
    register,
    handleSubmit,
    control,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      HabitName: "",
      Priority: 0,
      // TargetDuration: [new Date(), null],
    },
  });

  const { user } = useContext(AuthContext);
  const [minDate, setMinDate] = useState(new Date());

  const [monthsToShow, setMonthsToShow] = useState(3);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(null);
  const [targetDuration, setTargetDuration] = useState('');
  const [errorTargetDuration, setErrorTargetDuration] = useState(false);

  const onChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
    // setTargetDuration(formatDate(end)); // set date to this formate if throw any error 
    setTargetDuration(end.toISOString().split("T")[0]); 
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setMonthsToShow(1);
      } else if (window.innerWidth < 1100) {
        setMonthsToShow(2);
      } else {
        setMonthsToShow(3);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const onSubmit = async (data) => {
    const lastDay = new Date();
    lastDay.setDate(lastDay.getDate() + 6);
    lastDay.setHours(0, 0, 0, 0);

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (!targetDuration) {
      setErrorTargetDuration(true);
      return
    }
    setErrorTargetDuration(false);
    
    console.log('joshi', {
      ...data,
      Priority: priorityLabels[data.Priority],
      TargetDuration: targetDuration
    });
    // return
    const udpatedHabit = {
      ...data,
      Priority: priorityLabels[data.Priority],
      TargetDuration: targetDuration,
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
    if (data.Frequency === 'Daily') {
      udpatedHabit.TotalDaysCompleted = 0;
      udpatedHabit.CalendarData = {}
    } else if (data.Frequency === 'Weekly') {
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
    }
  };

  return (
    <>
      <div className="bg-gray-50/0 dark:bg-gray-800/50 outline -outline-offset-1 outline-gray-900/5 dark:outline-gray-700/10 sm:rounded-xl md:col-span-2">
        <form onSubmit={handleSubmit(onSubmit)}>
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
                  {...register("HabitName", { required: "Habit name is required" })}
                  placeholder='Your Habit'
                  className="block w-full rounded-md bg-gray-900/5 px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-amber-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-gray-600 sm:text-sm/6 dark:bg-white/5  dark:outline-white/10 dark:placeholder:text-[#925e0a] dark:focus:outline-amber-500"
                />
                {errors.HabitName && (
                  <p className="text-sm text-red-500 mt-1">{errors.HabitName.message}</p>
                )}
              </div>
            </div>

            <Frequency
              control={control}
              setStartDate={setStartDate}
              setMinDate={setMinDate}
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
                  monthsShown={monthsToShow}
                  minDate={minDate}           // ✅ Disable all dates before today
                  dateFormat="dd MMM yyyy"       // (optional) Clean date display format
                  className="react-datepicker-custom bg-transparent"
                />
              </div>
              {errorTargetDuration && (
                <p className="text-sm text-red-500 mt-1">{'Select a date'}</p>
              )}
            </div>

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
                {...register("Priority")}
                className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-gray-300 dark:bg-gray-700 
               accent-black dark:accent-amber-400"
              />
              <p className="priority-text mt-2 text-sm font-medium">
                {["Low", "Medium", "High", "Critical"][watch("Priority")]}
              </p>
            </div>

          </div>
          <div className="flex items-center justify-end gap-x-6 border-t border-gray-900/10 dark:border-white/10 px-4 py-4 sm:px-8">
            <button type="button" className="text-sm/6 font-semibold">
              Reset
            </button>
            <button
              type="submit"
              // onClick={handleAddHabit}
              className="rounded-md text-gray-100 dark:text-amber-600 bg-amber-700/95 dark:bg-amber-500/20  px-3.5 py-2.5 text-sm font-semibold  hover:bg-amber-700/95  dark:hover:bg-amber-500/30">
              Add
            </button>
          </div>
        </form>
      </div>
    </>
  )
}

export default AddHabit