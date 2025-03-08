import React, { useState } from 'react';
import './Frequency.css'

function Frequency({ selectedFrequency, setSelectedFrequency, setMinDate }) {

  const handleFrequencyChange = (event) => {
    if (event.target.name === "Frequency") {
      const today = new Date();
      if (event.target.value === "Weekly") {
        today.setDate(today.getDate() + 7);
        setMinDate((today).toISOString().split("T")[0]);
      } else if (event.target.value === "Daily"){
        setMinDate((today).toISOString().split("T")[0]);
      }
      setSelectedFrequency(event.target.value);
    }
  };

  return (
    <div id="borderr" className="Frequency" onChange={handleFrequencyChange}>
      <h2>Frequency</h2>
      <div className="custom-toggle">
        <input type="radio" id="Daily" name="Frequency" value="Daily" checked={selectedFrequency === "Daily"}
          onChange={handleFrequencyChange} />
        <label htmlFor="Daily" className="option">Days</label>

        <input type="radio" id="Weekly" name="Frequency" value="Weekly" checked={selectedFrequency === "Weekly"}
          onChange={handleFrequencyChange} />
        <label htmlFor="Weekly" className="option">Weeks</label>

        <span className="Frequency-slider"></span>
      </div>
    </div>
  );
}

export default Frequency;