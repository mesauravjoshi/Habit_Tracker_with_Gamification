import React from "react";
import { url } from '../../../URL/Url';
import "./DeleteConfirmUI.css";

function DeleteConfirmUI({ setDisplayDelUI,streakID, setStreakData ,streakData }) {

  const handleCanelDelete = () => {
    setDisplayDelUI(false);
  }

  const handleDeleteHabit = async (streakID) => {
    console.log('clicked',streakID);
    try {
      const response = await fetch(`${url}/habitDelete/${streakID}`,{
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to fetch habits');
      }
      const data = await response.json();
      setStreakData(streakData.filter((habit) => habit._id !== streakID));
      setDisplayDelUI(false); // Close the confirmation UI
      // console.log('Habit deleted successfully:', data);
    } catch (error) {
      console.error('Error fetching habits:', error);
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
