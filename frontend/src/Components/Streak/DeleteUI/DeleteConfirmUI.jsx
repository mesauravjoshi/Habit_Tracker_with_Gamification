import React, { useContext } from "react";
import "./DeleteConfirmUI.css";
import { AuthContext } from "@/Context/AuthContext";
import { StreaXPContext } from '@/Context/Strea&XPContext';
import axiosInstance from "@/api/axiosInstance";
import toast from 'react-hot-toast';

const notify = (type, message) => {
  if (type === 'success') {
    toast.success(message);
  }
  if (type === 'error') {
    toast.error(message);
  }
}

function DeleteConfirmUI({ setDisplayDelUI, streakID, habitData, setHabitData }) {
  const { fetchStreaXPData } = useContext(StreaXPContext);
  const { token } = useContext(AuthContext); // Access user from context

  const handleCanelDelete = () => {
    setDisplayDelUI(false);
  }

  const handleDeleteHabit = async (streakID) => {
    // console.log('clicked', streakID);
    //     const token = localStorage.getItem('habit token');

    try {
      console.log(streakID);
      // return
      const response = await axiosInstance.delete(`/habit/habitDelete/${streakID}`);
      // console.log(response);
      // if (!response.ok) {
      //   throw new Error(error);
      // }
      fetchStreaXPData();
      setHabitData(habitData.filter((habit) => habit._id !== streakID));
      setDisplayDelUI(false); // Close the confirmation UI
      notify('success', response.data.message)
      // console.log('Habit deleted successfully:', data);
    } catch (error) {
      notify('error','Error deleing habit')
      console.error('Error deleting habits:', error);
    }
  }

  return (
    <div className="overlay">
      <div className="DeleteConfirmUI">
        <h3>⚠️ Are you sure?</h3>
        <h3>"Deleting this habit will remove all progress and XP. This action cannot be undone."</h3>
        <div className="deleteConfrim-footer">
          <button onClick={() => handleCanelDelete()}>Cancel</button>
          <button onClick={() => handleDeleteHabit(streakID)}>Delete</button>
        </div>
      </div>
    </div>
  );
}

export default DeleteConfirmUI;
