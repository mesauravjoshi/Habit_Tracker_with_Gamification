import React, { useState } from 'react';
import './Frequency.css'

function Frequency({ setMinDate, setFormObject, formObject }) {

  const handleFrequencyChange = (e) => {
    const { name, value } = e.target;

    if (name === "Frequency") {
      const today = new Date();
      if (value === "Weekly") {
        today.setDate(today.getDate() + 7);
        setMinDate((today).toISOString().split("T")[0]);
      } else if (value === "Daily") {
        setMinDate((today).toISOString().split("T")[0]);
      }
      // setSelectedFrequency(event.target.value);
      setFormObject((prev) => {
        return { ...prev, 'Frequency': value }
      })
    }
  };

  return (
    <div id="borderr" className="Frequency" onChange={handleFrequencyChange}>
      <div className="custom-toggle">
        <input type="radio" id="Daily" name="Frequency" value="Daily" checked={formObject.Frequency === "Daily"}
          onChange={handleFrequencyChange} />
        <label htmlFor="Daily" className="option">Days</label>

        <input type="radio" id="Weekly" name="Frequency" value="Weekly" checked={formObject.Frequency === "Weekly"}
          onChange={handleFrequencyChange} />
        <label htmlFor="Weekly" className="option">Weeks</label>

        <span className="Frequency-slider"></span>
      </div>
    </div>
  );
}

export default Frequency;