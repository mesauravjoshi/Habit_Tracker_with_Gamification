import { useState, useEffect } from "react";
import './StreakUpdate.css'

function StreakUpdate() {
  const [habitData, setHabitData] = useState(null);
  const [isChecked, setIsChecked] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  useEffect(() => {
    // Fetch habit data from localStorage
    const storedData = localStorage.getItem("Habit Track");
    const lastUpdated = localStorage.getItem("LastUpdatedDate");
    const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD format

    if (storedData) {
      setHabitData(JSON.parse(storedData));
    }

    // If the streak was updated today, disable the checkbox and keep it checked
    if (lastUpdated === today) {
      setIsChecked(true);
      setIsDisabled(true);
    }
  }, []);

  const handleUpdate = () => {
    if (!habitData) return;

    const today = new Date().toISOString().split("T")[0];
    const lastUpdated = localStorage.getItem("LastUpdatedDate");

    if (lastUpdated === today) {
      alert("Streak already updated today!");
      return;
    }

    if (isChecked) {
      const updatedData = {
        ...habitData,
        "Total Streak": (habitData["Total Streak"] || 0) + 1
      };

      setHabitData(updatedData);
      localStorage.setItem("Habit Track", JSON.stringify(updatedData));
      localStorage.setItem("LastUpdatedDate", today);

      // Lock the checkbox after updating
      setIsChecked(true);
      setIsDisabled(true);
      alert("Streak updated!");
    }
  };

  return (
    <div className="StreakUpdate">
      {/* <p>Streak: {habitData?.["Total Streak"]}</p> */}

      <label className="checkbox-container">
        <input
          type="checkbox"
          checked={isChecked}
          disabled={isDisabled}
          onChange={(e) => setIsChecked(e.target.checked)}
        />
        <span>Mark as Done</span>
      </label>

      <button className="StreakUpdate-button" onClick={handleUpdate} disabled={isDisabled}>Update</button>
    </div>
  );
}

export default StreakUpdate;
