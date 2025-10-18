import React from 'react';

function Frequency({ setMinDate, setFormObject, formObject }) {
  const memoryOptions = [
    { name: 'Daily' },
    { name: 'Weekly' },
  ]

  const handleChange = (e) => {
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
      <div className="flex flex-col gap-2">
        <div htmlFor="My-Habit" className="block text-sm/6 font-medium">
          Frequency
        </div>
        <div className="flex gap-3 text-[12px]">
          {memoryOptions.map((option) => {
            const isActive = formObject.Frequency === option.name;
            return (
              <label
                key={option.name}
                htmlFor={option.name}
                className={`group relative flex items-center justify-center rounded-md border-1 px-2.5 py-2 cursor-pointer transition-all border-gray-500/35 dark:border-amber-500 
                ${isActive ? "bg-gray-500/30 dark:bg-amber-500/20 text-gray-900 dark:text-amber-500" : ""}`}
              >
                <input
                  id={option.name}
                  value={option.name}
                  name={'Frequency'}
                  type="radio"
                  checked={formObject.Frequency === option.name}
                  onChange={(e) => handleChange(e)}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
                <span className="font-medium  uppercase pointer-events-none">
                  {option.name}
                </span>
              </label>
            );
          })}
        </div>

      </div>
    </>
  );
}

export default Frequency;