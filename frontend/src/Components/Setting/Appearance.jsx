import { useTheme } from "@/Context/ThemeProvider";
import { useState, useEffect, useRef } from "react";

export default function Appearance() {

  return (
    <div className="flex flex-col items-start p-6 rounded-lg shadow-md space-y-4">
      <h2 className="font-semibold">
        Change Theme
      </h2>
      <p className="text-sm">
        Select your preferred theme for a personalized browsing experience,
      </p>

      <CustomSelect
        options={["Light", "Dark"]}
        defaultValue="Light"
      // onChange={(value) => console.log("Selected:", value)}
      />
    </div>
  );
}

const CustomSelect = ({ options = ["ight", "Dark"], defaultValue = "Light", onChange }) => {
  const [selected, setSelected] = useState(defaultValue);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { toggleTheme } = useTheme();

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelection = (item) => {
    setSelected(item);
    setIsOpen(false);
    toggleTheme();
  };

  return (
    <div className="relative w-40 text-sm" ref={dropdownRef}>
      <button
        className="w-full px-3 py-2 border rounded-lg dark:border-amber-700 flex justify-between items-center shadow-sm hover:bg-gray-50 dark:hover:bg-zinc-800 transition"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {selected}
        <span className="">▼</span>
      </button>

      {isOpen && (
        <ul className="absolute w-full mt-1 border bg-gray-50 dark:bg-gray-900 dark:border-gray-700 rounded-lg shadow-lg transition-all overflow-hidden">
          {options.map((item, index) => (
            <li
              key={index}
              className={`px-3 py-2 cursor-pointer hover:bg-zinc-200 dark:hover:bg-zinc-800 transition ${selected === item ? "bg-zinc-200 dark:bg-zinc-800 text-gray-800 dark:text-yellow-600" : ""}`}
              onClick={() => handleSelection(item)}
            >
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
