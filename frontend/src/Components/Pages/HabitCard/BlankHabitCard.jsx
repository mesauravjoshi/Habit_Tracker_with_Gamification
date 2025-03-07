import React from "react";
import "./BlankHabitCard.css";

const BlankHabitCard = () => {

  const box = [1, 2, 3];
  return (
    <div>
      {
        box.map((box, index) => {
          return (
            <div key={index} className="BlankHabitCard-Container">
              <div className="Habit-Card-loading loading">
                <div className="loading-title"></div>
                <div className="loading-streak"></div>
                <div className="loading-options"></div>
                <div className="loading-button"></div>
                <div className="loading-days"></div>
                <div className="loading-progress"></div>
                <div className="loading-total-days"></div>
              </div>
            </div>
          )
        })
      }
    </div>
  );
};

export default BlankHabitCard;