import { useState } from 'react';
import './filte.css'

const frequencies = ["Daily", "Weekly"];
const badges = [
  '🥈 Silver Badge',
  '🏆 Gold Badge',
  '⚜️ Elite Badge',
];

function Filter({
  setHabitData,
  updatedStreakData,
}) {
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [selectedBadges, setSelectedBadges] = useState([]);
  const [selectedFrequencies, setSelectedFrequencies] = useState([]);

  const handleFilterHabit = () => {

    const copy_inside = [...updatedStreakData];

    if (selectedFrequencies.length === 0 && selectedBadges.length === 0 && selectedCategory.length === 0) {
      return
    } else {
      if (selectedFrequencies.length > 0 && selectedBadges.length > 0 && selectedCategory.length > 0) {
        console.log('both');
        setHabitData(copy_inside.filter(habit =>
          selectedFrequencies.includes(habit.Frequency) &&
          selectedBadges.includes(habit.BadgeRecord.Badge))) &&
          selectedCategory.includes(habit.Category)
      } else if (selectedFrequencies.length > 0) {
        console.log('Frequency');
        setHabitData(copy_inside.filter(habit => selectedFrequencies.includes(habit.Frequency)));
      } else if (selectedBadges.length > 0) {
        console.log('Badge');
        setHabitData(copy_inside.filter(habit => selectedBadges.includes(habit.BadgeRecord.Badge)));
      } else if (selectedCategory.length > 0) {
        console.log('Category');
        setHabitData(copy_inside.filter(habit => selectedCategory.includes(habit.Category)));
      }
    }
  };

  const handleFilterReset = () => {
    setSelectedFrequencies([]);
    setSelectedBadges([]);
    setSelectedCategory([]);
  }

  const handleFrequencyChange = (event) => {
    const { value, checked } = event.target;

    setSelectedFrequencies(prev =>
      checked ? [...prev, value] : prev.filter(f => f !== value)
    );
  };

  const handleBadgeChange = (event) => {
    const { value, checked } = event.target;

    setSelectedBadges(prev =>
      checked ? [...prev, value] : prev.filter(b => b !== value)
    );
  };

  const categories = [
    "Health & Fitness 🏋️‍♂️",
    "Productivity & Work 📑",
    "Mindfulness & Mental Health 🧘‍♂️",
    "Diet & Nutrition 🥗",
    "Personal Growth 📖",
    "Social & Relationships 💬",
    "Finance & Budgeting ",
    "Hobbies & Creativity 🎨 ",
    "Self - Care & Well - being 🛁",
    // "Custom ✏️"
  ]

  const handleCategoryChange = (event) => {
    const { value, checked } = event.target;
    setSelectedCategory(prev =>
      checked ? [...prev, value] : prev.filter(b => b !== value)
    );
  };

  const handleRemoveSelctedCat = (indexToRemove) => {
    setSelectedCategory(prev => prev.filter((_, index) => index !== indexToRemove));
  };

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredCategories, setFilteredCategories] = useState(categories);

  const filterCategorySearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    if (query.length > 0) {
      const searchResults = categories.filter(cat => cat.toLowerCase().includes(query));
      setFilteredCategories(searchResults);
    } else {
      setFilteredCategories(categories);
    }
  };

  return (
    <>
      <div className="flex gap-3 justify-between my-4 p-3 rounded-md border-1 border-amber-500">

        {/* Frequency */}
        <div className="flex flex-col">
          <h4>Frequency</h4>
          {frequencies.map((frequency) => (
            <label key={frequency} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                value={frequency}
                checked={selectedFrequencies.includes(frequency)}
                onChange={handleFrequencyChange}
                className="custom-checkbox"
              />
              <span className="text-sm">{frequency}</span>
            </label>
          ))}
        </div>

        {/* Badge */}
        <div className="flex flex-col">
          <h4>Badge</h4>
          <div className='flex flex-col'>

            {badges.map((badge) => (
              <label key={badge} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  value={badge}
                  checked={selectedBadges.includes(badge)}
                  onChange={handleBadgeChange}
                  className="custom-checkbox"
                />
                <span className="text-sm">{badge}</span>
              </label>
            ))}
            
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <button
            className='rounded-md px-2 py-2 text-sm font-semibold text-amber-100 dark:text-grey-900 shadow-xs bg-amber-600'
            onClick={() => { handleFilterHabit(); }}
          > Apply </button>
          <button
            className='rounded-md px-2 py-2 text-sm border-1 border-amber-600 font-semibold text-amber-900  dark:text-amber-600 shadow-xs'
            onClick={() => handleFilterReset()}
          >Reset</button>
        </div>

      </div >
    </>
  );
}

export default Filter;
