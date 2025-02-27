import React, { useContext } from "react";
import { url } from '../../../URL/Url';
import "./DeleteConfirmUI.css";
import { AuthContext } from '../../Context/AuthContext';

function DeleteConfirmUI({ setDisplayDelUI, streakID, setStreakData, streakData }) {
  const { user, token } = useContext(AuthContext); // Access user from context
  console.log(token);

  const handleCanelDelete = () => {
    setDisplayDelUI(false);
  }

  const handleDeleteHabit = async (streakID) => {
    console.log('clicked', streakID);
    //     const token = localStorage.getItem('habit token');
    // console.log(token);

    try {
      const response = await fetch(`${url}/habit/habitDelete/${streakID}`, {
        method: 'DELETE',
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}` // Include JWT token
        }
      });
      // if (!response.ok) {
      //   throw new Error(error);
      // }
      const data = await response.json();
      setStreakData(streakData.filter((habit) => habit._id !== streakID));
      setDisplayDelUI(false); // Close the confirmation UI
      console.log('Habit deleted successfully:', data);
    } catch (error) {
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
