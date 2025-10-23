import React from "react";
import { Controller } from "react-hook-form";

const memoryOptions = [
  { name: "Daily" },
  { name: "Weekly" },
];

export default function Frequency({ control, setStartDate, setMinDate }) {
  return (
    <div className="flex flex-col gap-2 sm:col-span-3">
      <label htmlFor="Frequency" className="block text-sm font-medium">
        Frequency
      </label>

      <Controller
        name="Frequency"
        control={control}
        defaultValue="Daily"
        render={({ field: { onChange, value } }) => (
          <div className="flex gap-3 text-[12px]">
            {memoryOptions.map((option) => {
              const isActive = value === option.name;
              return (
                <label
                  key={option.name}
                  htmlFor={option.name}
                  className={`group relative flex items-center justify-center rounded-md border-1 px-2.5 py-2 cursor-pointer transition-all border-gray-500/35 dark:border-amber-500 
                ${isActive ? "bg-gray-500/30 dark:bg-amber-500/20 text-gray-900 dark:text-amber-500" : ""}`}
                >
                  <input
                    id={option.name}
                    type="radio"
                    value={option.name}
                    checked={isActive}
                    onChange={(e) => {
                      const newValue = e.target.value;
                      onChange(newValue);

                      // ✅ Update start date based on frequency
                      const today = new Date();
                      if (newValue === "Weekly") {
                        today.setDate(today.getDate() + 7);
                        setMinDate(today.toISOString().split("T")[0]);
                        setStartDate(today);
                      } else {
                        setMinDate(today.toISOString().split("T")[0]);
                        setStartDate(today);
                      }
                    }}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                  <span className="font-medium uppercase pointer-events-none">
                    {option.name}
                  </span>
                </label>
              );
            })}
          </div>
        )}
      />
    </div>
  );
}