import React, { useState } from 'react';

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
    <>
      <div className="flex gap-6">
        <div htmlFor="My-Habit" className="block text-sm/6 font-medium">
          Frequency
        </div>
        {/* Daily */}
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name="frequency"
            value="Daily"
            checked={formObject.Frequency === "Daily"}
            onChange={(e) =>
              setFormObject({ ...formObject, Frequency: e.target.value })
            }
            className="h-4 w-4 text-amber-600 focus:ring-amber-500 border-gray-300"
          />
          <span className="text-gray-800">Daily</span>
        </label>

        {/* Weekly */}
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name="frequency"
            value="Weekly"
            checked={formObject.Frequency === "Weekly"}
            onChange={(e) =>
              setFormObject({ ...formObject, Frequency: e.target.value })
            }
            className="h-4 w-4 text-amber-600 focus:ring-amber-500 border-gray-300"
          />
          <span className="text-gray-800">Weekly</span>
        </label>
      </div>
    </>
    // <div id="borderr" className="Frequency" onChange={handleFrequencyChange}>
    //   <div className="flex flex-col items-center justify-center text-center text-[1.1rem]">
    //     <div className="relative flex w-[160px] h-[50px] bg-[#22232e] rounded-full p-1 shadow-md">
    //       <input
    //         type="radio"
    //         id="Daily"
    //         name="Frequency"
    //         value="Daily"
    //         checked={formObject.Frequency === "Daily"}
    //         onChange={handleFrequencyChange}
    //         className="hidden peer/daily"
    //       />
    //       <label
    //         htmlFor="Daily"
    //         className="flex-1 text-center leading-[42px] text-[16px] font-bold cursor-pointer transition-colors duration-300 text-[#e8e2d99e] peer-checked/daily:text-[#22232e]"
    //       >
    //         Days
    //       </label>

    //       <input
    //         type="radio"
    //         id="Weekly"
    //         name="Frequency"
    //         value="Weekly"
    //         checked={formObject.Frequency === "Weekly"}
    //         onChange={handleFrequencyChange}
    //         className="hidden peer/weekly"
    //       />
    //       <label
    //         htmlFor="Weekly"
    //         className="flex-1 text-center leading-[42px] text-[16px] font-bold cursor-pointer transition-colors duration-300 text-[#e8e2d99e] peer-checked/weekly:text-[#22232e]"
    //       >
    //         Weeks
    //       </label>

    //       <span
    //         className={`absolute top-[5px] w-[75px] h-[40px] rounded-full bg-gradient-to-br from-[#ee9e2f] to-[#c99955] transition-all duration-300 ${formObject.Frequency === "Daily" ? "left-[5px]" : "left-[80px]"
    //           }`}
    //       />
    //     </div>
    //   </div>
    // </div>
  );
}

export default Frequency;